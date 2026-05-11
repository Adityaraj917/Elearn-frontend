import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader, Zap, FileText, Brain, Settings } from 'lucide-react';

const stepIcons = {
  0: <Settings className="w-4 h-4" />,
  1: <FileText className="w-4 h-4" />,
  2: <Brain className="w-4 h-4" />,
  3: <Check className="w-4 h-4" />,
};

const stepColors = {
  0: 'text-accent-teal',
  1: 'text-brand-400',
  2: 'text-accent-purple',
  3: 'text-green-400',
};

export default function AgentPanel({ floating = true }) {
  const router = useRouter();
  const [mode, setMode] = useState('summarize'); // summarize | quiz
  const [summaryLength, setSummaryLength] = useState('short');
  const [tone, setTone] = useState('student');
  const [difficulty, setDifficulty] = useState('medium');
  const [count, setCount] = useState(10);
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);

  const simulate = async () => {
    setRunning(true);
    const seq = [
      `${mode === 'summarize' ? 'Validating document' : 'Preparing quiz engine'}`,
      'Extracting text',
      `${mode === 'summarize' ? 'Creating summary' : 'Generating questions'}`,
      'Finalizing output'
    ];
    setSteps([]);
    for (let i = 0; i < seq.length; i++) {
      setSteps((s) => [...s, seq[i]]);
      await new Promise((r) => setTimeout(r, 700));
    }
    if (mode === 'summarize') {
      router.push({ pathname: '/elearn', query: { tab: 'summary', length: summaryLength, tone } });
    } else {
      router.push({ pathname: '/elearn', query: { tab: 'quiz', difficulty, count } });
    }
    setRunning(false);
  };

  const content = (
    <div className="terminal-panel rounded-3xl overflow-hidden">
      {/* macOS-style top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 dark:border-white/[0.06] bg-gray-50 dark:bg-[#0B0D17]">
        <div className="flex items-center gap-2">
          <span className="terminal-dot" style={{ background: '#FF5F57' }} />
          <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
          <span className="terminal-dot" style={{ background: '#28C840' }} />
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Saarthi Agent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-medium">live</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Mode Toggle */}
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              mode === 'summarize'
                ? 'bg-brand-400/10 text-brand-400 border border-brand-400/30'
                : 'text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/[0.04] border border-transparent'
            }`}
            onClick={() => setMode('summarize')}
          >
            Summarize
          </button>
          <button
            className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              mode === 'quiz'
                ? 'bg-accent-teal/10 text-accent-teal border border-accent-teal/30'
                : 'text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/[0.04] border border-transparent'
            }`}
            onClick={() => setMode('quiz')}
          >
            Generate Quiz
          </button>
        </div>

        {/* Options */}
        {mode === 'summarize' ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">Summary length</label>
              <select className="w-full bg-white dark:bg-[#0F1120] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-white focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-colors" value={summaryLength} onChange={e=>setSummaryLength(e.target.value)}>
                <option value="short">Short</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">Tone</label>
              <select className="w-full bg-white dark:bg-[#0F1120] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-white focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-colors" value={tone} onChange={e=>setTone(e.target.value)}>
                <option value="academic">Academic</option>
                <option value="student">Student-friendly</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">Difficulty</label>
              <select className="w-full bg-white dark:bg-[#0F1120] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-white focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-colors" value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">Questions (5–20)</label>
              <input type="number" min="5" max="20" className="w-full bg-white dark:bg-[#0F1120] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-white focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-colors" value={count} onChange={e=>setCount(Number(e.target.value))} />
            </div>
          </div>
        )}

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-brand-400 to-accent-teal text-white font-semibold py-3 rounded-2xl shadow-glow-sm hover:shadow-glow-md transition-all duration-300 text-sm"
          onClick={simulate}
          disabled={running}
        >
          {running ? 'Working…' : 'Generate'}
        </motion.button>

        {/* Steps */}
        <div className="max-h-48 overflow-y-auto space-y-2 scrollbar-hide">
          <AnimatePresence>
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 text-xs py-1.5 ${
                  i === steps.length - 1 && running
                    ? 'text-brand-300 border-l-2 border-brand-400 pl-3'
                    : 'text-slate-400 dark:text-slate-500 pl-3'
                }`}
              >
                <span className={stepColors[i] || 'text-slate-400'}>
                  {i < steps.length - 1 || !running
                    ? <Check className="w-3.5 h-3.5 text-green-400" />
                    : stepIcons[i]
                  }
                </span>
                <span className="text-slate-600 dark:text-slate-300">{s}</span>
                <span className="text-slate-400 dark:text-slate-600 ml-auto text-[10px]">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {running && (
            <div className="flex items-center gap-2 pl-3 pt-1">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full thinking-dot" />
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full thinking-dot" />
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full thinking-dot" />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-500">thinking...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!floating) return content;
  return (
    <div className="fixed right-4 bottom-4 w-80 z-30">{content}</div>
  );
}
