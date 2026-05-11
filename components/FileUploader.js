import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, XCircle, FileText, File } from 'lucide-react';
import api from '../utils/api';

const allowed = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
];

const fileTypeInfo = {
  'application/pdf': { label: 'PDF', color: 'text-accent-coral bg-accent-coral/10' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { label: 'DOCX', color: 'text-accent-blue bg-accent-blue/10' },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { label: 'PPTX', color: 'text-accent-gold bg-accent-gold/10' },
  'text/plain': { label: 'TXT', color: 'text-accent-teal bg-accent-teal/10' },
};

export default function FileUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (!allowed.includes(f.type) && !/\.(pdf|docx|pptx|txt)$/i.test(f.name)) {
      setStatus('error');
      setMessage('Unsupported file type. Allowed: PDF, DOCX, PPTX, TXT');
      return;
    }
    setFile(f);
    setStatus(null);
    setMessage('');
    setProgress(0);
  };

  const onSelect = (e) => handleFile(e.target.files?.[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
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

  const typeInfo = file ? (fileTypeInfo[file.type] || { label: 'FILE', color: 'text-slate-500 bg-slate-100 dark:bg-white/5' }) : null;

  return (
    <div className="space-y-5">
      {/* Dropzone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`dropzone p-10 text-center ${dragOver ? 'drag-over' : ''}`}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={onSelect} accept=".pdf,.docx,.pptx,.txt" />

        <motion.div
          animate={dragOver ? { scale: 1.1 } : { y: [0, -8, 0] }}
          transition={dragOver ? { duration: 0.2 } : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400/10 to-accent-teal/10 flex items-center justify-center mb-4"
        >
          <Upload className="w-7 h-7 text-brand-400" />
        </motion.div>

        <p className="font-display font-semibold text-lg text-slate-800 dark:text-white mb-1">
          Drop your file here
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          or <span className="text-brand-400 font-medium cursor-pointer">browse</span> to upload
        </p>

        {/* Accepted types */}
        <div className="flex gap-2 justify-center flex-wrap">
          {[
            { label: 'PDF', color: 'text-accent-coral' },
            { label: 'DOCX', color: 'text-accent-blue' },
            { label: 'PPTX', color: 'text-accent-gold' },
            { label: 'TXT', color: 'text-accent-teal' },
          ].map((t) => (
            <span key={t.label} className={`text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 ${t.color}`}>
              .{t.label.toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Selected File Card */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1A1D35] rounded-2xl p-4 border border-gray-100 dark:border-white/[0.06] flex items-center gap-4"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${typeInfo?.color}`}>
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-slate-800 dark:text-white truncate">{file.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(1)} KB • {typeInfo?.label}</p>
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-1 text-green-500">
              <CheckCircle className="w-5 h-5" />
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-1 text-red-500">
              <XCircle className="w-5 h-5" />
            </div>
          )}
        </motion.div>
      )}

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
          <div className="progress-gradient" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Status Message */}
      {message && (
        <p className={`text-sm font-medium ${
          status === 'error' ? 'text-red-500 dark:text-red-400' :
          status === 'success' ? 'text-green-500 dark:text-green-400' :
          'text-slate-500 dark:text-slate-400'
        }`}>
          {status === 'success' && '✓ '}{status === 'error' && '✕ '}{message}
        </p>
      )}

      {/* Upload Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={upload}
        disabled={!file || status === 'success'}
        className="w-full bg-gradient-to-r from-brand-400 to-accent-teal disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-2xl shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
      >
        {status === 'success' ? 'Uploaded ✓' : 'Upload Document'}
      </motion.button>
    </div>
  );
}
