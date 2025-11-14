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
  const [status, setStatus] = useState(null); // success | error
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
    setStatus(null);
    setMessage('Starting upload...');
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('fileName', file.name);

      const res = await api.post('/api/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data', 'x-filename': file.name },
        onUploadProgress: (evt) => {
          if (!evt.total) return;
          const pct = Math.round((evt.loaded * 100) / evt.total);
          setProgress(Math.min(95, pct));
        },
      });

      setProgress(100);
      setStatus('success');
      setMessage(res.data?.message || 'File uploaded successfully');
      onUploaded?.(res.data);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Upload failed');
      setProgress(0);
    }
  };

  return (
    <div className="card p-6">
      <div className="mb-4">
        <input type="file" className="input" onChange={onSelect} accept=".pdf,.docx,.pptx,.txt" />
      </div>
      {file && (
        <div className="mb-3 text-sm text-slate-700">Selected: <span className="font-medium">{file.name}</span></div>
      )}
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={upload} disabled={!file}>Upload</button>
        {status === 'success' && (
          <a href="#next" className="btn btn-secondary" onClick={(e)=>e.preventDefault()}>Proceed to Summarizer or Quiz</a>
        )}
      </div>
      <div className="mt-4">
        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        {message && (
          <div className={`mt-2 text-sm ${status === 'error' ? 'text-red-600' : 'text-slate-700'}`}>{message}</div>
        )}
      </div>
    </div>
  );
}
