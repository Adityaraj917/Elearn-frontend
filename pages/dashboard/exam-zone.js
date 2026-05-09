import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../../firebase/config";
import { logActivity, savePerformance } from "../../utils/tracking";
import { recordQuizResult, recordUpload, getMemoryContext, addActivity, getMemory, recordSessionTiming } from "../../utils/studentMemory";
import { generateAdaptiveWowInsight } from "../../utils/insightEngine";
import ReactMarkdown from "react-markdown";
import { 
  ArrowLeft, Upload, FileText, MessageSquare, Brain, Sparkles,
  Send, Bot, User, CheckCircle, XCircle, Loader2, BookOpen,
  RefreshCw, ChevronRight, Clock, Trophy, X, AlertCircle
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function ExamZone() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upload");
  const [fileId, setFileId] = useState(null);
  const [fileName, setFileName] = useState("");
  const [docText, setDocText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const tabs = [
    { id: "upload", label: "Upload", icon: <Upload className="w-4 h-4" /> },
    { id: "summary", label: "Summary", icon: <BookOpen className="w-4 h-4" />, disabled: !fileId },
    { id: "quiz", label: "Quiz", icon: <Brain className="w-4 h-4" />, disabled: !fileId },
    { id: "chat", label: "AI Chat", icon: <MessageSquare className="w-4 h-4" />, disabled: !fileId },
  ];

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.fileId) {
        setFileId(data.fileId);
        setDocText(data.extractedTextSnippet || "");
        const uid = auth.currentUser?.uid || "guest";
        logActivity(uid, "pdf_upload", { fileName: file.name });
        recordUpload(file.name, 'Study Material');
        setActiveTab("summary");
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Failed to connect to server. Make sure backend is running on port 4000.");
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen page-bg">
      <Head>
        <title>Exam Zone | Saarthi</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-[5%] right-[10%] w-[400px] h-[400px] rounded-full orb-purple blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6">
        <button onClick={() => router.push("/dashboard")} className="btn-ghost flex items-center gap-2 mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📝</span>
          <h1 className="text-3xl font-bold">Exam Zone</h1>
        </div>
        <p className="text-secondary-themed mb-8">Upload your study material, generate summaries, take quizzes, and chat with AI about your documents.</p>

        {/* Document Status */}
        {fileId && (
          <div className="glass-card p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="font-medium">{fileName}</span>
                <span className="text-xs text-gray-500 ml-2">Ready</span>
              </div>
            </div>
            <button onClick={() => { setFileId(null); setFileName(""); setActiveTab("upload"); }} className="text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => !tab.disabled && setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/25"
                  : tab.disabled ? "text-muted-themed cursor-not-allowed" : "text-secondary-themed hover:bg-indigo-500/5"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {activeTab === "upload" && (
              <UploadSection uploading={uploading} uploadError={uploadError} onUpload={handleUpload} fileId={fileId} fileName={fileName} />
            )}
            {activeTab === "summary" && fileId && <SummarySection fileId={fileId} />}
            {activeTab === "quiz" && fileId && <QuizSection fileId={fileId} />}
            {activeTab === "chat" && fileId && <ChatSection fileId={fileId} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ===== UPLOAD SECTION =====
function UploadSection({ uploading, uploadError, onUpload, fileId, fileName }) {
  const fileRef = useRef(null);
  return (
    <div className="glass-card p-10 text-center">
      <input type="file" ref={fileRef} accept=".pdf,.docx,.pptx,.txt" onChange={onUpload} className="hidden" />
      
      {uploading ? (
        <div className="py-10">
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-secondary-themed">Uploading and extracting text...</p>
        </div>
      ) : (
        <>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-indigo-500/10 border-2 border-dashed border-indigo-500/30 flex items-center justify-center">
            <Upload className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Upload Study Material</h3>
          <p className="text-secondary-themed mb-6">Supports PDF, DOCX, PPTX, and TXT files up to 20MB</p>
          <button onClick={() => fileRef.current?.click()} className="btn-primary text-lg px-8 py-4">
            {fileId ? "Upload Another File" : "Choose File"}
          </button>
          
          {uploadError && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4" /> {uploadError}
            </div>
          )}
          
          {fileId && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
              ✅ {fileName} is ready. Switch to Summary, Quiz, or Chat tabs.
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ===== SUMMARY SECTION =====
function SummarySection({ fileId }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setSummary(data); }
    } catch (err) {
      setError("Failed to generate summary. Check backend connection.");
    }
    setLoading(false);
  };

  useEffect(() => { if (fileId && !summary) generateSummary(); }, [fileId]);

  if (loading) return (
    <div className="glass-card p-10 text-center">
      <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto mb-4" />
      <p className="text-secondary-themed">Analyzing document with AI...</p>
    </div>
  );

  if (error) return (
    <div className="glass-card p-8 text-center">
      <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
      <p className="text-red-300 mb-4">{error}</p>
      <button onClick={generateSummary} className="btn-primary">Retry</button>
    </div>
  );

  if (!summary) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-400" /> AI Summary</h2>
        <button onClick={generateSummary} className="btn-ghost text-sm flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Regenerate</button>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold text-indigo-300 mb-3">Quick Overview</h3>
        <p className="text-gray-300 leading-relaxed text-lg">{summary.summaryShort}</p>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold text-cyan-300 mb-3">Detailed Summary</h3>
        <div className="text-gray-300 leading-relaxed prose prose-invert max-w-none">
          <ReactMarkdown>{summary.summaryLong}</ReactMarkdown>
        </div>
      </div>

      {summary.keyPoints?.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="font-bold text-emerald-300 mb-3">Key Points</h3>
          <ul className="space-y-2">
            {summary.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ===== QUIZ SECTION =====
function QuizSection({ fileId }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");
  const [numQ, setNumQ] = useState(5);

  const generateQuiz = async () => {
    setLoading(true);
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
    setScore(0);
    try {
      const res = await fetch(`${API_URL}/api/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, options: { difficulty, numQuestions: numQ } }),
      });
      const data = await res.json();
      if (data.questions?.length > 0) setQuiz(data);
      else alert("Failed to generate quiz. Try again.");
    } catch (err) {
      alert("Failed to connect to backend.");
    }
    setLoading(false);
  };

  const handleAnswer = (qId, optIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = async () => {
    let s = 0;
    const weakTopics = [];
    const strongTopics = [];
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) { s++; strongTopics.push(q.question?.split(' ').slice(0, 3).join(' ')); }
      else { weakTopics.push(q.question?.split(' ').slice(0, 3).join(' ')); }
    });
    setScore(s);
    setSubmitted(true);
    const uid = auth.currentUser?.uid || "guest";
    await savePerformance(uid, {
      quizId: `quiz_${Date.now()}`, score: s, totalQuestions: quiz.questions.length,
      timeTaken: 0, weakTopics, strongTopics, source: "exam_zone"
    });
    recordQuizResult({ subject: 'Document Quiz', score: s, total: quiz.questions.length, weakTopics, strongTopics, source: 'exam_zone' });
    logActivity(uid, "quiz_complete", { score: s, total: quiz.questions.length });
  };

  // Config screen
  if (!quiz && !loading) return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Trophy className="text-amber-400" /> Generate Quiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-muted-themed mb-2">Difficulty</label>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
            className="input-dark">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-themed mb-2">Questions</label>
          <select value={numQ} onChange={e => setNumQ(Number(e.target.value))}
            className="input-dark">
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
          </select>
        </div>
      </div>
      <button onClick={generateQuiz} className="btn-primary w-full py-4 text-lg">Generate Quiz from Document</button>
    </div>
  );

  if (loading) return (
    <div className="glass-card p-10 text-center">
      <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto mb-4" />
      <p className="text-secondary-themed">Generating personalized quiz from your document...</p>
    </div>
  );

  const q = quiz.questions[currentQ];
  const isLast = currentQ === quiz.questions.length - 1;
  const allAnswered = Object.keys(answers).length === quiz.questions.length;

  // Results screen
  if (submitted) {
    const wowInsight = generateAdaptiveWowInsight();
    return (
      <div className="space-y-6">
        {/* Score Card */}
        <div className="glass-card p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-5xl font-black gradient-text mb-4">{score}/{quiz.questions.length}</p>
          <p className="text-gray-400">{score >= quiz.questions.length * 0.8 ? "Excellent work! 🎉" : score >= quiz.questions.length * 0.5 ? "Good effort! Keep practising." : "Don't worry, review and try again!"}</p>
        </div>

        {/* WOW Adaptive Insight — Day 3 Centerpiece */}
        {wowInsight && wowInsight.insight && (
          <div className="wow-card p-6">
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-indigo-400 font-bold mb-1.5 tracking-wider">ADAPTIVE LEARNING INSIGHT</p>
                <p className="text-secondary-themed leading-relaxed whitespace-pre-line">{wowInsight.insight}</p>
                {wowInsight.suggestions?.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {wowInsight.suggestions.map((s, i) => (
                      <div key={i} className="suggestion-pill text-secondary-themed">
                        <span className="text-amber-400 flex-shrink-0">💡</span>
                        <span className="text-sm">{s}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Question Review */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {quiz.questions.map((question, i) => {
            const isCorrect = answers[question.id] === question.correctIndex;
            return (
              <div key={i} className={`p-4 rounded-xl border ${isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-400 mt-0.5" />}
                  <span className="font-medium">{question.question}</span>
                </div>
                {!isCorrect && (
                  <p className="text-sm text-gray-400 ml-7">Correct: <span className="text-emerald-300">{question.options[question.correctIndex]}</span></p>
                )}
                {question.explanation && (
                  <p className="text-sm text-gray-500 ml-7 mt-1">{question.explanation}</p>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex gap-4 justify-center">
          <button onClick={generateQuiz} className="btn-primary">Take Another Quiz</button>
          <button onClick={() => window.location.href = '/dashboard'} className="btn-secondary flex items-center gap-2">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Quiz taking screen
  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentQ + 1} of {quiz.questions.length}</span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card p-8"
        >
          <h3 className="text-xl font-bold mb-6">{q.question}</h3>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = answers[q.id] === i;
              return (
                <button key={i} onClick={() => handleAnswer(q.id, i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/10 text-white"
                      : "border-gray-800 bg-gray-900/30 text-gray-300 hover:border-gray-600"
                  }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${
                    isSelected ? "bg-indigo-500 border-indigo-500 text-white" : "bg-gray-800 border-gray-700 text-gray-400"
                  }`}>{String.fromCharCode(65 + i)}</div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
          className="btn-ghost disabled:opacity-30">← Previous</button>
        {isLast && allAnswered ? (
          <button onClick={handleSubmit} className="btn-primary">Submit Quiz</button>
        ) : (
          <button onClick={() => setCurrentQ(Math.min(quiz.questions.length - 1, currentQ + 1))} disabled={isLast}
            className="btn-ghost disabled:opacity-30">Next →</button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex justify-center gap-1 mt-6">
        {quiz.questions.map((_, i) => (
          <button key={i} onClick={() => setCurrentQ(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentQ ? "bg-indigo-500 w-6" : answers[quiz.questions[i].id] !== undefined ? "bg-indigo-500/40" : "bg-gray-700"
            }`} />
        ))}
      </div>
    </div>
  );
}

// ===== CHAT SECTION =====
function ChatSection({ fileId }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Build mentor-style initial greeting
  const getMentorGreeting = () => {
    const mem = getMemory();
    const name = mem.name || '';
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    if (name && mem.favoriteSubject) {
      return `Good ${greet}, ${name}! I've gone through your document. Since you're strong in ${mem.favoriteSubject}, I'll connect concepts to what you already know. What would you like to explore first?`;
    }
    if (name) {
      return `Good ${greet}, ${name}! I've analyzed your document and I'm ready to help you understand it deeply. Ask me anything — I'll explain it the way that works best for you.`;
    }
    return `I've analyzed your document and I'm ready to dive in. Ask me anything — I'll break it down step by step. 📚`;
  };

  const [messages, setMessages] = useState([
    { role: "ai", text: getMentorGreeting() }
  ]);

  const send = async () => {
    if (!message.trim() || loading) return;
    const userMsg = { role: "user", text: message };
    setMessages(m => [...m, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const memContext = getMemoryContext();
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, message: userMsg.text, studentMemory: memContext }),
      });
      const data = await res.json();
      addActivity('chat_message', userMsg.text.slice(0, 50));
      recordSessionTiming();
      setMessages(m => [...m, { role: "ai", text: data.reply || data.error || "Let me try approaching that differently. Could you rephrase?" }]);
      const uid = auth.currentUser?.uid || "guest";
      logActivity(uid, "chat_message", { messageLength: userMsg.text.length });
    } catch (err) {
      setMessages(m => [...m, { role: "ai", text: "⚠️ Failed to connect. Check if backend is running." }]);
    }
    setLoading(false);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  return (
    <div className="glass-card overflow-hidden flex flex-col" style={{ height: "70vh" }}>
      {/* Header */}
      <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(var(--border-color), 0.2)' }}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold">Saarthi AI Mentor</h3>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === "user" ? "bg-indigo-600" : ""
            }`} style={msg.role !== "user" ? { background: 'rgba(var(--bg-card), 0.8)', border: '1px solid rgba(var(--border-color), 0.3)' } : {}}>
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-400" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === "user"
                ? "bg-indigo-600 text-white rounded-tr-sm"
                : "rounded-tl-sm"
            }`} style={msg.role !== "user" ? { background: 'rgba(var(--bg-card), 0.5)', border: '1px solid rgba(var(--border-color), 0.2)', color: 'rgb(var(--text-secondary))' } : {}}>
              <div className="prose prose-sm prose-invert max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(var(--bg-card), 0.8)', border: '1px solid rgba(var(--border-color), 0.3)' }}>
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="rounded-2xl rounded-tl-sm p-4 flex gap-1" style={{ background: 'rgba(var(--bg-card), 0.5)', border: '1px solid rgba(var(--border-color), 0.2)' }}>
              {[0, 1, 2].map(i => (
                <span key={i} className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4" style={{ borderTop: '1px solid rgba(var(--border-color), 0.2)' }}>
        <div className="flex gap-2">
          <input type="text" value={message} onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !loading && send()}
            placeholder="Ask about your document..."
            className="input-dark flex-1" disabled={loading} />
          <button onClick={send} disabled={loading || !message.trim()}
            className="btn-primary px-4 disabled:opacity-40">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
