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

  if (!fileId) return <p className="text-slate-500 dark:text-slate-400">Select a file to start summarizing.</p>;

  if (loading) {
    return (
      <div className="space-y-4 py-12">
        {/* Shimmer skeleton loading */}
        <div className="bg-white dark:bg-[#131627] rounded-3xl p-6 border border-gray-100 dark:border-white/[0.06]">
          <div className="h-5 w-32 rounded-xl bg-gray-100 dark:bg-white/5 shimmer mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded-xl bg-gray-100 dark:bg-white/5 shimmer" />
            <div className="h-4 w-5/6 rounded-xl bg-gray-100 dark:bg-white/5 shimmer" />
            <div className="h-4 w-4/6 rounded-xl bg-gray-100 dark:bg-white/5 shimmer" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#131627] rounded-3xl p-6 border border-gray-100 dark:border-white/[0.06]">
          <div className="h-5 w-40 rounded-xl bg-gray-100 dark:bg-white/5 shimmer mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded-xl bg-gray-100 dark:bg-white/5 shimmer" />
            <div className="h-4 w-full rounded-xl bg-gray-100 dark:bg-white/5 shimmer" />
            <div className="h-4 w-3/4 rounded-xl bg-gray-100 dark:bg-white/5 shimmer" />
            <div className="h-4 w-5/6 rounded-xl bg-gray-100 dark:bg-white/5 shimmer" />
          </div>
        </div>
        <p className="text-center text-sm text-brand-400 animate-pulse font-medium">
          ✦ Analyzing document with AI...
        </p>
      </div>
    );
  }

  if (error) return (
    <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-2 border border-red-200 dark:border-red-500/20">
      <span>⚠️ {error}</span>
      <button onClick={generateSummary} className="underline font-semibold hover:text-red-700 dark:hover:text-red-300">Retry</button>
    </div>
  );

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <BookOpen className="text-brand-400" /> Smart Summary
        </h2>
        <button
          onClick={generateSummary}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-400 transition-colors"
        >
          <RefreshCw size={16} /> Regenerate
        </button>
      </div>

      {/* Short Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group bg-white dark:bg-[#1A1D35] p-6 rounded-3xl border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all"
      >
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => copyToClipboard(data.summaryShort, 'short')}
            className="p-2 bg-gray-50 dark:bg-white/5 rounded-full shadow-sm hover:bg-brand-50 dark:hover:bg-brand-400/10 text-slate-500 hover:text-brand-400 transition-colors"
          >
            {copied === 'short' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>

        <h3 className="font-semibold text-brand-600 dark:text-brand-300 mb-3 flex items-center gap-2">
          <Sparkles size={18} /> Overview
        </h3>

        <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
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
        className="relative group bg-white dark:bg-[#131627] p-6 rounded-3xl border border-gray-100 dark:border-white/[0.06] shadow-card"
      >
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => copyToClipboard(data.summaryLong, 'long')}
            className="p-2 bg-gray-50 dark:bg-white/5 rounded-full shadow-sm hover:bg-brand-50 dark:hover:bg-brand-400/10 text-slate-500 hover:text-brand-400 transition-colors"
          >
            {copied === 'long' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>

        <h3 className="font-semibold text-accent-teal dark:text-accent-teal mb-4 flex items-center gap-2">
          <Quote size={18} /> Detailed Analysis
        </h3>

        <div className="prose prose-brand dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
          <ReactMarkdown>{data.summaryLong}</ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
}
