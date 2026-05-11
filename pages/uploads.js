import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUploader from '../components/FileUploader';
import AgentPanel from '../components/AgentPanel';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { CheckCircle, FileText } from 'lucide-react';

export default function Uploads() {
  const [lastUpload, setLastUpload] = useState(null);
  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark bg-mesh">
      <Head>
        <title>Upload Documents | Saarthi eLearn</title>
      </Head>
      <Header />
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-2 block">
              Documents
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Upload Your Files
            </h1>
            <div className="gradient-accent-line" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white dark:bg-[#131627] rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-white/[0.06] shadow-card">
                <FileUploader onUploaded={setLastUpload} />
              </div>

              {lastUpload && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#1A1D35] rounded-2xl p-5 border border-green-200 dark:border-green-500/20 shadow-card"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="font-display font-semibold text-slate-800 dark:text-white">Upload Complete</span>
                  </div>
                  <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>File: <span className="text-slate-800 dark:text-slate-200 font-medium">{lastUpload.fileName}</span></span>
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-medium">{lastUpload.message}</div>
                  </div>
                </motion.div>
              )}
            </div>
            <div className="md:col-span-1">
              <AgentPanel floating={false} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
