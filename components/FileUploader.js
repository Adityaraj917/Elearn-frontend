import { useState } from 'react';
import api from '../utils/api';

const allowed = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
];

export default function FileUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const onSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!allowed.includes(f.type) && !/\.(pdf|docx|pptx|txt)$/i.test(f.name)) {
      setStatus('error');
      setMessage('Unsupported file type. Allowed: PDF, DOCX, PPTX, TXT');
      return;
    }

    setFile(f);
    setStatus(null);
    setMessage('');
  };

  const upload = async () => {
    if (!file) return;

    setProgress(5);
    setMessage('Uploading...');

    try {
      const form = new FormData();
      form.append('file', file);

      const res = await api.post('/api/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const pct = Math.round((evt.loaded * 100) / evt.total);
            setProgress(Math.min(95, pct));
          }
        }
      });

      setProgress(100);
      setStatus('success');
      setMessage('File uploaded successfully!');
      onUploaded?.(res.data);

    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage("Upload failed. Backend unreachable.");
    }
  };

  return (
    <div className="card p-6">
      <input type="file" className="input" onChange={onSelect} />

      {file && (
        <p className="mt-2 text-sm">Selected: {file.name}</p>
      )}

      <button onClick={upload} className="btn btn-primary mt-4" disabled={!file}>
        Upload
      </button>

      {message && (
        <p className={`mt-2 text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <div className="progress mt-2">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
