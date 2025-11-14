import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function SummarizerView({ fileId, length = 'short', tone = 'student' }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showLong, setShowLong] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fileId) return;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.post('/api/summarize', {
          fileId,
          options: { length, tone },
        });

        setData(res.data);
      } catch (e) {
        setError('Failed to summarize');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [fileId, length, tone]);

  const copy = async () => {
    const text = `${data.summaryShort}\n\n${data.summaryLong}`;
    await navigator.clipboard.writeText(text);
  };

  const download = () => {
    const blob = new Blob(
      [
        `Key Points:\n- ${data.keyPoints.join('\n- ')}\n\nShort Summary:\n${data.summaryShort
        }\n\nDetailed Summary:\n${data.summaryLong}`,
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="card p-6 shimmer h-24" />
        <div className="card p-6 shimmer h-32" />
      </div>
    );
  }

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-3">Key Points</h3>
        <ul className="list-disc pl-6 space-y-1">
          {data.keyPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-2">Short Summary</h3>
        <p className="text-slate-700">{data.summaryShort}</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Detailed Summary</h3>
          <button
            className="btn btn-outline"
            onClick={() => setShowLong((s) => !s)}
          >
            {showLong ? 'Hide' : 'Show'}
          </button>
        </div>
        {showLong && (
          <p className="text-slate-700 mt-3 whitespace-pre-line">
            {data.summaryLong}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={copy}>
          Copy
        </button>
        <button className="btn btn-secondary" onClick={download}>
          Download .txt
        </button>
      </div>
    </div>
  );
}
