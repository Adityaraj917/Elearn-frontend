import { useState } from 'react';
import { useRouter } from 'next/router';

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
    <div className="card p-4 w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Agentic AI Panel</h3>
        <span className="badge">Mocked</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button className={`btn ${mode==='summarize' ? 'btn-primary' : 'btn-outline'}`} onClick={()=>setMode('summarize')}>Summarize Notes</button>
        <button className={`btn ${mode==='quiz' ? 'btn-secondary' : 'btn-outline'}`} onClick={()=>setMode('quiz')}>Generate Quiz</button>
      </div>

      {mode === 'summarize' ? (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Summary length</label>
            <select className="input mt-1" value={summaryLength} onChange={e=>setSummaryLength(e.target.value)}>
              <option value="short">Short</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Tone</label>
            <select className="input mt-1" value={tone} onChange={e=>setTone(e.target.value)}>
              <option value="academic">Academic</option>
              <option value="student">Student-friendly</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Difficulty</label>
            <select className="input mt-1" value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Number of questions (5–20)</label>
            <input type="number" min="5" max="20" className="input mt-1" value={count} onChange={e=>setCount(Number(e.target.value))} />
          </div>
        </div>
      )}

      <button className="btn btn-primary w-full mt-4" onClick={simulate} disabled={running}>
        {running ? 'Working…' : 'Generate'}
      </button>

      <div className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary-600 animate-pulse" />
            <span className="text-slate-700">{s}</span>
          </div>
        ))}
        {running && (
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-primary-400 via-accent-purple to-accent-teal shimmer" />
          </div>
        )}
      </div>
    </div>
  );

  if (!floating) return content;
  return (
    <div className="fixed right-4 bottom-4 w-80">{content}</div>
  );
}
