import formidable from 'formidable';
import fs from 'fs';
import pdf from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing file:', err);
      return res.status(500).json({ error: 'Error parsing file' });
    }

    const file = files.file?.[0] || files.file; // Handle both single and array (formidable v3+)
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const dataBuffer = fs.readFileSync(file.filepath || file.path); // Handle different formidable versions
      
      const data = await pdf(dataBuffer);
      
      // Clean text: remove extra spaces and symbols
      let cleanedText = data.text
        .replace(/\s+/g, ' ')
        .trim();

      // Limit text size to 15000 characters
      const finalOptionsText = cleanedText.slice(0, 15000);

      console.log('Extracted text length:', finalOptionsText.length);

      return res.status(200).json({
        success: true,
        textLength: finalOptionsText.length
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      return res.status(500).json({ error: 'Error processing PDF' });
    }
  });
}
