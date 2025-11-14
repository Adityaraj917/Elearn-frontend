# Saarthi — eLearn (Frontend)

A complete Next.js (JavaScript) frontend for Saarthi — eLearn with Tailwind CSS, Axios, and fully mocked API routes. Works locally now; swap the mock APIs later with a real backend.

## Features
- Notes Summarizer with key points, short and detailed views
- Quiz Generator with MCQs, reveal answers, mark for review, export JSON/CSV
- Document Uploads (PDF, DOCX, PPTX, TXT) with progress, validation, and mock scanned-PDF detection
- Agentic AI panel simulating multi-step workflows with delays
- Responsive, modern Tailwind UI with cards, badges, and shimmer effects

## Tech
- Next.js (pages router, JavaScript)
- Tailwind CSS
- Axios

## Getting Started
1. Install dependencies
```bash
npm install
```

2. Run the dev server
```bash
npm run dev
```
Then open http://localhost:3000

## Project Structure
```
/saarthi-elearn-frontend
  /components
    Header.js
    Footer.js
    FileUploader.js
    AgentPanel.js
    SummarizerView.js
    QuizView.js
  /pages
    _app.js
    index.js
    elearn.js
    uploads.js
    /api
      upload.js
      summarize.js
      quiz.js
  /public
    logo.png
  package.json
  tailwind.config.js
  postcss.config.js
  globals.css
  .env.local.example
  README.md
```

## Mock API Notes
All API routes are mocked in `/pages/api` and simulate 1s latency.
- `POST /api/upload`
  - Accepts multipart form-data (but not actually parsed)
  - Simulated rejection if the filename includes `scan`/`handwritten`
  - Returns `{ fileId, fileName, textExtracted, message }`
- `POST /api/summarize`
  - Body: `{ length: 'short'|'detailed', tone: 'academic'|'student' }`
  - Returns `{ keyPoints[], summaryShort, summaryLong }`
- `POST /api/quiz`
  - Body: `{ difficulty: 'easy'|'medium'|'hard', count: number }`
  - Returns `{ questions: [...] }`

## Switching to a Real Backend Later
- Update Axios base URL using an environment variable.
- Example: create `.env.local` with
```
NEXT_PUBLIC_API_BASE=https://your-backend.example.com
```
- Then change API calls to:
```js
const api = process.env.NEXT_PUBLIC_API_BASE || '';
axios.post(`${api}/api/summarize`, payload);
```
- Remove or replace the Next.js API routes as needed.

## Build & Start (Production)
```bash
npm run build
npm start
```

## Exporting a ZIP
- In VS Code, right-click the `saarthi-elearn-frontend` folder and choose "Compress" or "Export to ZIP".

## License
MIT
