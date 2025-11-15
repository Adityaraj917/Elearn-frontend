import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function SummarizerView({ fileId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fileId) return;

    const run = async () => {
      try {
        const res = await api.post('/api/summarize', { fileId });
        setData(res.data);
      } catch (e) {
        setError("Summarizer failed");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [fileId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h3>Key Points</h3>
        <ul>
          {data.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      <div className="card p-4">
        <h3>Short Summary</h3>
        <p>{data.summaryShort}</p>
      </div>

      <div className="card p-4">
        <h3>Detailed Summary</h3>
        <p>{data.summaryLong}</p>
      </div>
    </div>
  );
}
