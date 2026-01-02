import { useState, useRef, useEffect } from 'react';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Trash2, StopCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function DocChat({ fileId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I can help you understand this document. Ask me anything!' }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const send = async () => {
    if (!message.trim() || !fileId || loading) return;
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
      setMessages((m) => [...m, { role: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
    }

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-[75vh] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100">Saarthi AI</h3>
            <p className="text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <button
          onClick={() => setMessages([])}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 dark:bg-slate-800/50">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-700 text-purple-600 border border-gray-200 dark:border-slate-600'
                }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Bubble */}
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-600 rounded-tl-none'
                }`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 text-purple-600 border border-gray-200 flex items-center justify-center shadow-md">
              <Bot size={16} />
            </div>
            <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-2xl rounded-tl-none p-4 flex items-center gap-2 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-100 dark:bg-slate-900 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-slate-950 transition-all font-medium"
            placeholder="Ask a question about your document..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && send()}
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading || !message.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center w-14"
          >
            {loading ? <StopCircle size={20} className="animate-pulse" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          Saarthi AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
