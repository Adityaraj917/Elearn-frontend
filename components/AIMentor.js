import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMentorConversation, getPostQuizReaction } from '../utils/mentorPersona';
import { speakInsight, stopSpeaking, isSpeaking } from '../utils/voiceMentor';
import { startListening, stopListening, isListeningSupported } from '../utils/voiceMentor';
import { getMemoryContext } from '../utils/studentMemory';
import { API_URL } from '../utils/api';
import {
  Sparkles, X, Volume2, Square, RefreshCw,
  MessageCircle, ChevronDown, Send, Mic, MicOff,
  Compass, Brain, Target, TrendingUp, Loader2
} from 'lucide-react';

/**
 * AI Mentor — Full Interactive Chat + Voice Mode
 * Floating button (bottom-right) → opens conversational AI panel
 * with real Gemini responses, voice input/output, quick actions.
 */
export default function AIMentor() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [voiceLang, setVoiceLang] = useState('en');
  const [speakingIdx, setSpeakingIdx] = useState(-1);
  const [hasNew, setHasNew] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);

  const isDashboard = router.pathname.startsWith('/dashboard');

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  // Generate initial mentor insights on open
  useEffect(() => {
    if (isDashboard && open && messages.length === 0) {
      const insights = generateMentorConversation();
      const formatted = insights.map(m => ({
        role: 'mentor', text: m.text, emotion: m.emotion, category: m.category
      }));
      setMessages(formatted);
    }
  }, [open, isDashboard]);

  // Listen for post-quiz events
  useEffect(() => {
    if (!isDashboard) return;
    const handler = (e) => {
      const { subject, score, total } = e.detail || {};
      if (subject && score !== undefined && total) {
        const reaction = getPostQuizReaction(subject, score, total);
        if (reaction) {
          setMessages(prev => [
            ...prev,
            { role: 'mentor', text: reaction.text, emotion: reaction.emotion, category: 'quiz_reaction' }
          ]);
          setHasNew(true);
          setTimeout(() => setOpen(true), 800);
        }
      }
    };
    window.addEventListener('saarthi-activity', handler);
    return () => window.removeEventListener('saarthi-activity', handler);
  }, [isDashboard]);

  useEffect(() => { if (open) setHasNew(false); }, [open]);

  // Send message to Gemini
  const sendMessage = useCallback(async (text) => {
    if (!text?.trim()) return;
    const userMsg = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const memCtx = getMemoryContext();
      const history = messages.slice(-6).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          context: '',
          history,
          studentMemory: memCtx,
        }),
      });
      const data = await res.json();
      const reply = data.reply || data.response || 'I couldn\'t process that right now. Try again!';

      const mentorMsg = { role: 'mentor', text: reply, emotion: 'default' };
      setMessages(prev => [...prev, mentorMsg]);

      // Auto-speak in voice mode
      if (voiceMode) {
        speakInsight(reply, voiceLang);
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'mentor', text: 'Connection issue — please check your internet and try again.', emotion: 'empathize'
      }]);
    }
    setIsTyping(false);
  }, [messages, voiceMode, voiceLang]);

  // Handle voice input
  const toggleListening = useCallback(() => {
    if (listening) {
      stopListening();
      setListening(false);
      setInterimText('');
    } else {
      const started = startListening({
        lang: voiceLang === 'hi' ? 'hi-IN' : 'en-IN',
        onResult: (transcript) => {
          setListening(false);
          setInterimText('');
          sendMessage(transcript);
        },
        onInterim: (interim) => setInterimText(interim),
        onEnd: () => { setListening(false); setInterimText(''); },
        onError: () => { setListening(false); setInterimText(''); },
      });
      if (started) setListening(true);
    }
  }, [listening, voiceLang, sendMessage]);

  const handleSpeak = useCallback((text, idx) => {
    if (isSpeaking() && speakingIdx === idx) {
      stopSpeaking();
      setSpeakingIdx(-1);
    } else {
      stopSpeaking();
      speakInsight(text, voiceLang);
      setSpeakingIdx(idx);
      const check = setInterval(() => {
        if (!isSpeaking()) { setSpeakingIdx(-1); clearInterval(check); }
      }, 300);
    }
  }, [voiceLang, speakingIdx]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(chatInput);
    }
  };

  // Quick actions
  const quickActions = [
    { label: 'Career fit', icon: <Compass className="w-3 h-3" />, msg: 'Analyze my career alignment. Am I on track for my dream career? Give percentages and gaps.' },
    { label: 'Study plan', icon: <Target className="w-3 h-3" />, msg: 'Create a personalized 7-day study plan based on my weak areas and goals.' },
    { label: 'Weak areas', icon: <Brain className="w-3 h-3" />, msg: 'What are my weakest topics right now and how should I improve them?' },
    { label: 'Progress', icon: <TrendingUp className="w-3 h-3" />, msg: 'Analyze my recent performance trends and give me actionable insights.' },
  ];

  if (!isDashboard) return null;

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="mentor-float-btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Talk to AI Mentor"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {hasNew && !open && <span className="mentor-float-badge" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mentor-panel"
            style={{ height: '480px', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <div className="mentor-panel-header" style={{ flexShrink: 0 }}>
              <div className="flex items-center gap-2.5">
                <div className="mentor-avatar">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mentor-panel-title">Saarthi Mentor</h3>
                  <p className="mentor-panel-subtitle">
                    <span className="mentor-live-dot" />
                    {voiceMode ? 'Voice Mode Active' : 'Chat Mode'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Voice Mode Toggle */}
                <button
                  onClick={() => setVoiceMode(!voiceMode)}
                  className={`p-1.5 rounded-lg transition-all ${voiceMode ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
                  title={voiceMode ? 'Voice mode ON' : 'Voice mode OFF'}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                {/* Language Toggle */}
                <div className="lang-toggle">
                  <button className={voiceLang === 'en' ? 'active' : ''} onClick={() => setVoiceLang('en')}>EN</button>
                  <button className={voiceLang === 'hi' ? 'active' : ''} onClick={() => setVoiceLang('hi')}>हि</button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ flexShrink: 0, padding: '8px 16px 4px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
              {quickActions.map((qa, i) => (
                <button key={i} onClick={() => sendMessage(qa.msg)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all hover:bg-indigo-500/10 hover:text-indigo-400"
                  style={{ background: 'rgba(var(--bg-card), 0.5)', border: '1px solid rgba(var(--border-color), 0.3)', color: 'rgba(var(--text-secondary), 1)' }}>
                  {qa.icon} {qa.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="mentor-messages" style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  className={msg.role === 'user' ? 'mentor-message-user' : `mentor-message ${
                    msg.emotion === 'celebrate' ? 'mentor-msg-celebrate' :
                    msg.emotion === 'nudge' ? 'mentor-msg-nudge' :
                    msg.emotion === 'empathize' ? 'mentor-msg-empathize' : 'mentor-msg-default'
                  }`}
                  style={msg.role === 'user' ? {
                    marginLeft: 'auto', maxWidth: '85%', padding: '10px 14px',
                    borderRadius: '16px 16px 4px 16px', marginBottom: '8px',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.15))',
                    border: '1px solid rgba(99,102,241,0.25)',
                  } : { marginBottom: '8px' }}
                >
                  <p className="mentor-message-text" style={{ fontSize: '13px', lineHeight: '1.5' }}>{msg.text}</p>
                  {msg.role === 'mentor' && (
                    <button
                      onClick={() => handleSpeak(msg.text, i)}
                      className={`mentor-msg-voice ${speakingIdx === i ? 'speaking' : ''}`}
                      title={speakingIdx === i ? 'Stop' : 'Listen'}
                    >
                      {speakingIdx === i ? <Square className="w-2.5 h-2.5" /> : <Volume2 className="w-3 h-3" />}
                    </button>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mentor-message mentor-msg-default" style={{ marginBottom: '8px' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-muted-themed">Saarthi is thinking...</span>
                  </div>
                </motion.div>
              )}

              {/* Interim voice text */}
              {listening && interimText && (
                <div className="mentor-message-user" style={{
                  marginLeft: 'auto', maxWidth: '85%', padding: '10px 14px',
                  borderRadius: '16px 16px 4px 16px', marginBottom: '8px', opacity: 0.6,
                  background: 'rgba(99,102,241,0.1)', border: '1px dashed rgba(99,102,241,0.3)',
                }}>
                  <p style={{ fontSize: '13px', fontStyle: 'italic' }}>{interimText}...</p>
                </div>
              )}

              {messages.length === 0 && !isTyping && (
                <div className="mentor-empty">
                  <Sparkles className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                  <p>Ask me anything about your studies, career, or study plan!</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ flexShrink: 0, padding: '8px 12px 12px', borderTop: '1px solid rgba(var(--border-color), 0.2)' }}>
              <div className="flex items-center gap-2">
                {/* Mic button */}
                {isListeningSupported() && (
                  <button onClick={toggleListening}
                    className={`p-2.5 rounded-xl transition-all ${listening
                      ? 'bg-red-500/20 text-red-400 animate-pulse'
                      : 'text-gray-500 hover:text-indigo-400 hover:bg-indigo-500/10'
                    }`}
                    title={listening ? 'Stop listening' : 'Speak to Saarthi'}>
                    {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                )}
                {/* Text input */}
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={listening ? 'Listening...' : 'Ask Saarthi anything...'}
                  disabled={listening}
                  className="flex-1 text-sm py-2.5 px-3.5 rounded-xl outline-none transition-all"
                  style={{
                    background: 'rgba(var(--bg-card), 0.6)',
                    border: '1px solid rgba(var(--border-color), 0.3)',
                    color: 'var(--text-primary, #fff)',
                  }}
                />
                {/* Send button */}
                <button onClick={() => sendMessage(chatInput)} disabled={!chatInput.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all disabled:opacity-30">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {listening && (
                <p className="text-[10px] text-red-400 mt-1.5 text-center animate-pulse">
                  🎙️ Listening... speak now
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
