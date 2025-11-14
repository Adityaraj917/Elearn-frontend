import { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

export default function DocChat({ fileId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const send = async () => {
    if (!message.trim() || !fileId) return;
    const userMsg = { role: 'user', text: message };
    setMessages((m) => [...m, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      const res = await api.post('/api/chat', {
        fileId,
        message: userMsg.text,
      });

      const aiMsg = { role: 'ai', text: res.data.reply };
      setMessages((m) => [...m, aiMsg]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'ai', text: 'Error: Could not get reply' }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="card p-5 h-[70vh] flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">AI Chat</h2>
        <button className="btn btn-outline" onClick={() => setMessages([])}>
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-xl max-w-[75%] ${msg.role === 'user'
                ? 'bg-blue-600 text-white ml-auto'
                : 'bg-slate-200 dark:bg-slate-700'
              }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 max-w-[60%]">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="input flex-1"
          placeholder="Ask about the document..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="btn btn-primary" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
