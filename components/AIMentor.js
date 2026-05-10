import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMentorConversation, getPostQuizReaction } from '../utils/mentorPersona';
import { speakInsight, stopSpeaking, isSpeaking } from '../utils/voiceMentor';
import {
  Sparkles, X, Volume2, Square, RefreshCw,
  MessageCircle, ChevronDown
} from 'lucide-react';

/**
 * Floating AI Mentor — Persistent across dashboard pages.
 * 
 * A breathing floating button (bottom-right) that opens a conversational
 * panel with adaptive, human-like mentor messages.
 */
export default function AIMentor() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [voiceLang, setVoiceLang] = useState('en');
  const [speakingIdx, setSpeakingIdx] = useState(-1);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const panelRef = useRef(null);

  // Only show on dashboard routes
  const isDashboard = router.pathname.startsWith('/dashboard');

  // Generate messages on open
  useEffect(() => {
    if (isDashboard && open && messages.length === 0) {
      setMessages(generateMentorConversation());
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
          const newMsg = { text: reaction.text, category: 'quiz_reaction', emotion: reaction.emotion, priority: 11 };
          setMessages(prev => [newMsg, ...prev.slice(0, 3)]);
          setHasNew(true);
          // Auto-open mentor panel after quiz
          setTimeout(() => setOpen(true), 800);
        }
      }
    };
    window.addEventListener('saarthi-activity', handler);
    return () => window.removeEventListener('saarthi-activity', handler);
  }, [isDashboard]);

  // Clear "new" indicator when opened
  useEffect(() => {
    if (open) setHasNew(false);
  }, [open]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    stopSpeaking();
    setSpeakingIdx(-1);
    setTimeout(() => {
      setMessages(generateMentorConversation());
      setRefreshing(false);
    }, 400);
  }, []);

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

  // Early return AFTER all hooks to satisfy Rules of Hooks
  if (!isDashboard) return null;

  const emotionColor = (emotion) => {
    switch (emotion) {
      case 'celebrate': return 'mentor-msg-celebrate';
      case 'nudge': return 'mentor-msg-nudge';
      case 'empathize': return 'mentor-msg-empathize';
      default: return 'mentor-msg-default';
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
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
        {hasNew && !open && (
          <span className="mentor-float-badge" />
        )}
      </motion.button>

      {/* Conversational Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mentor-panel"
          >
            {/* Panel Header */}
            <div className="mentor-panel-header">
              <div className="flex items-center gap-2.5">
                <div className="mentor-avatar">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="mentor-panel-title">Saarthi Mentor</h3>
                  <p className="mentor-panel-subtitle">
                    <span className="mentor-live-dot" />
                    Adaptive • Personal
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Language Toggle */}
                <div className="lang-toggle">
                  <button className={voiceLang === 'en' ? 'active' : ''} onClick={() => setVoiceLang('en')}>EN</button>
                  <button className={voiceLang === 'hi' ? 'active' : ''} onClick={() => setVoiceLang('hi')}>हि</button>
                </div>
                {/* Refresh */}
                <button
                  onClick={handleRefresh}
                  className="mentor-refresh-btn"
                  title="New insights"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="mentor-messages">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={`${msg.category}-${i}`}
                    initial={{ opacity: 0, y: 10, x: -5 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ delay: i * 0.1 }}
                    className={`mentor-message ${emotionColor(msg.emotion)}`}
                  >
                    <p className="mentor-message-text">{msg.text}</p>
                    <button
                      onClick={() => handleSpeak(msg.text, i)}
                      className={`mentor-msg-voice ${speakingIdx === i ? 'speaking' : ''}`}
                      title={speakingIdx === i ? 'Stop' : 'Listen'}
                    >
                      {speakingIdx === i
                        ? <Square className="w-2.5 h-2.5" />
                        : <Volume2 className="w-3 h-3" />
                      }
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {messages.length === 0 && (
                <div className="mentor-empty">
                  <Sparkles className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                  <p>Take a quiz or upload material to get personalized insights.</p>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="mentor-panel-footer">
              <MessageCircle className="w-3 h-3" />
              <span>Insights adapt to your activity</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
