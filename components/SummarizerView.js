import { useEffect, useState } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Copy, Check, Sparkles, RefreshCw, BookOpen, Quote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function SummarizerView({ fileId }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (fileId && !data) {
      generateSummary();
    }
  }, [fileId]);

  const generateSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(null);

      const res = await api.post('/api/summarize', { fileId });
      setData(res.data);
    } catch (e) {
      setError("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!fileId) return <p className="text-gray-500">Select a file to start summarizing.</p>;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600 animate-pulse" size={24} />
        </div>
        <p className="mt-4 text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
          Analyzing document with AI...
        </p>
      </div>
    );
  }

  if (error) return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
      <span>⚠️ {error}</span>
      <button onClick={generateSummary} className="underline font-semibold">Retry</button>
    </div>
  );

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <BookOpen className="text-purple-600" /> Smart Summary
        </h2>
        <button
          onClick={generateSummary}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors"
        >
          <RefreshCw size={16} /> Regenerate
        </button>
      </div>

      {/* Short Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl shadow-sm border border-purple-100 dark:border-slate-700 hover:shadow-md transition-all"
      >
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => copyToClipboard(data.summaryShort, 'short')}
            className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm hover:bg-purple-50 text-gray-500 hover:text-purple-600"
          >
            {copied === 'short' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>

        <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-3 flex items-center gap-2">
          <Sparkles size={18} /> Overview
        </h3>

        <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          <TypeAnimation
            sequence={[data.summaryShort, 1000]}
            wrapper="p"
            cursor={false}
            speed={70}
          />
        </div>
      </motion.div>

      {/* Detailed Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700"
      >
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => copyToClipboard(data.summaryLong, 'long')}
            className="p-2 bg-gray-50 dark:bg-slate-700 rounded-full shadow-sm hover:bg-blue-50 text-gray-500 hover:text-blue-600"
          >
            {copied === 'long' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>

        <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
          <Quote size={18} /> Detailed Analysis
        </h3>

        <div className="prose prose-purple dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <ReactMarkdown>{data.summaryLong}</ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
}
