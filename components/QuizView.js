import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function QuizView({ fileId, difficulty = 'medium', count = 10 }) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [revealed, setRevealed] = useState({});
  const [marked, setMarked] = useState({});
  const [error, setError] = useState(null);

  const load = async () => {
    if (!fileId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/api/quiz', {
        fileId,
        options: { difficulty, numQuestions: count },
      });

      setQuestions(res.data.questions);
    } catch (e) {
      setError('Failed to generate quiz');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [fileId, difficulty, count]);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ questions }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const rows = [
      [
        'id',
        'question',
        'optionA',
        'optionB',
        'optionC',
        'optionD',
        'correctIndex',
        'explanation',
      ],
      ...questions.map((q) => [
        q.id,
        q.question,
        ...q.options,
        q.correctIndex,
        q.explanation,
      ]),
    ];
    const csv = rows
      .map((r) =>
        r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="card p-6 shimmer h-40" />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => (
        <div
          key={q.id}
          className={`card p-5 ${marked[q.id] ? 'ring-2 ring-accent-purple' : ''
            }`}
        >
          <div className="flex items-start justify-between">
            <h4 className="font-semibold">
              {idx + 1}. {q.question}
            </h4>
            <div className="flex gap-2">
              <button
                className="btn btn-outline"
                onClick={() =>
                  setMarked((m) => ({ ...m, [q.id]: !m[q.id] }))
                }
              >
                {marked[q.id] ? 'Unmark' : 'Mark for review'}
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  setRevealed((r) => ({ ...r, [q.id]: !r[q.id] }))
                }
              >
                {revealed[q.id] ? 'Hide answer' : 'Reveal answer'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {q.options.map((opt, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 ${revealed[q.id] && i === q.correctIndex
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200'
                  }`}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </div>
            ))}
          </div>

          {revealed[q.id] && (
            <p className="text-sm text-slate-700 mt-3">
              <span className="font-medium">Explanation:</span>{' '}
              {q.explanation}
            </p>
          )}
        </div>
      ))}

      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={load}>
          Regenerate quiz
        </button>
        <button className="btn btn-outline" onClick={exportJSON}>
          Export JSON
        </button>
        <button className="btn btn-outline" onClick={exportCSV}>
          Export CSV
        </button>
      </div>
    </div>
  );
}
