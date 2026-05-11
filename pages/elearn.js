import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Brain, MessageSquare, Upload, Sparkles, Menu, X } from 'lucide-react';
import Link from 'next/link';
import FileUploader from '../components/FileUploader';
import SummarizerView from '../components/SummarizerView';
import QuizView from '../components/QuizView';
import DocChat from '../components/DocChat';
import ThemeToggle from '../components/ThemeToggle';
import Head from 'next/head';

const tabs = [
  { id: 'upload', label: 'Upload', icon: Upload },
  { id: 'summary', label: 'Summarize', icon: FileText },
  { id: 'quiz', label: 'Quiz', icon: Brain },
  { id: 'chat', label: 'AI Chat', icon: MessageSquare },
];

export default function ElearnPage() {
  const [fileInfo, setFileInfo] = useState(null);
  const [mode, setMode] = useState('upload');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>eLearn | Saarthi AI Learning Platform</title>
      </Head>

      <div className="min-h-screen bg-surface-light dark:bg-surface-dark bg-mesh">
        {/* ─── Sidebar ─── */}
        <aside className={`elearn-sidebar ${sidebarOpen ? 'open' : ''}`}>
          {/* Brand */}
          <div className="p-5 border-b border-gray-200/50 dark:border-white/[0.06]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-accent-teal flex items-center justify-center shadow-glow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg bg-gradient-to-r from-brand-400 to-accent-teal bg-clip-text text-transparent">
                Saarthi
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-3 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = mode === tab.id;
              const isDisabled = tab.id !== 'upload' && !fileInfo;

              return (
                <button
                  key={tab.id}
                  onClick={() => { if (!isDisabled) { setMode(tab.id); setSidebarOpen(false); } }}
                  disabled={isDisabled}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'bg-brand-400/10 text-brand-400 border-l-2 border-brand-400'
                      : isDisabled
                      ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute right-3 w-1.5 h-1.5 rounded-full bg-brand-400"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200/50 dark:border-white/[0.06]">
            <ThemeToggle />
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="elearn-content relative z-10">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-white/[0.06] bg-white/80 dark:bg-[#0B0D17]/80 backdrop-blur-xl sticky top-0 z-30">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-display font-bold bg-gradient-to-r from-brand-400 to-accent-teal bg-clip-text text-transparent">
              Saarthi eLearn
            </span>
            <ThemeToggle />
          </div>

          {/* Content Area */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Page Header */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-2 block">
                {tabs.find(t => t.id === mode)?.label || 'eLearn'}
              </span>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {mode === 'upload' && 'Upload Your Document'}
                {mode === 'summary' && 'Smart Summary'}
                {mode === 'quiz' && 'Generate Quiz'}
                {mode === 'chat' && 'AI Document Chat'}
              </h1>
              <div className="gradient-accent-line" />
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {mode === 'upload' && (
                  <div className="bg-white dark:bg-[#131627] rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-white/[0.06] shadow-card">
                    <FileUploader onUploaded={(data) => { setFileInfo(data); setMode('summary'); }} />
                  </div>
                )}

                {mode === 'summary' && fileInfo && (
                  <SummarizerView fileId={fileInfo.fileId} />
                )}

                {mode === 'quiz' && fileInfo && (
                  <QuizView fileId={fileInfo.fileId} />
                )}

                {mode === 'chat' && fileInfo && (
                  <DocChat fileId={fileInfo.fileId} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
