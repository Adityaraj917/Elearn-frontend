import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../../firebase/config";
import { savePerformance, logActivity } from "../../utils/tracking";
import { recordQuizResult, addActivity, getMemory } from "../../utils/studentMemory";
import { generateAdaptiveWowInsight } from "../../utils/insightEngine";
import {
  ArrowLeft, Brain, Loader2, CheckCircle, XCircle, Trophy,
  Sparkles, Target, TrendingUp, BookOpen, ChevronRight, Map, Calendar
} from "lucide-react";

import { API_URL } from "../../utils/api";

export default function SkillTest() {
  const router = useRouter();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  // Config
  const [subject, setSubject] = useState("Physics");
  const [difficulty, setDifficulty] = useState("medium");
  const [studentClass, setStudentClass] = useState("10");

  // Load profile
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saarthi_profile");
      if (stored) {
        const p = JSON.parse(stored);
        if (p.class) {
          const match = p.class.match(/\d+/);
          if (match) setStudentClass(match[0]);
        }
        if (p.favorite_subject) setSubject(p.favorite_subject);
      }
    } catch(e) {}
  }, []);

  // Build past performance context from localStorage
  const buildPastPerformance = () => {
    try {
      const mem = getMemory();
      const testResults = JSON.parse(localStorage.getItem("saarthi_test_results") || "[]");
      const subjectResults = testResults.filter(r => r.subject === subject);
      
      const weakTopics = [];
      const strongTopics = [];
      const recentScores = [];
      
      subjectResults.forEach(r => {
        if (r.weaknesses) weakTopics.push(...r.weaknesses);
        if (r.strengths) strongTopics.push(...r.strengths);
        if (r.percentage) recentScores.push(r.percentage);
      });
      
      // Also pull from memory
      if (mem.weakSubjects) weakTopics.push(...mem.weakSubjects);
      if (mem.strengths) strongTopics.push(...mem.strengths);
      
      const avgPercentage = recentScores.length > 0 
        ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
        : 'unknown';
      
      return {
        weakTopics: [...new Set(weakTopics)].slice(0, 8),
        strongTopics: [...new Set(strongTopics)].slice(0, 8),
        recentScores: recentScores.slice(-5),
        avgPercentage,
        totalTestsTaken: testResults.length,
      };
    } catch(e) {
      return {};
    }
  };

  const generateTest = async () => {
    setLoading(true);
    setTest(null);
    setAnswers({});
    setSubmitted(false);
    setEvaluation(null);
    setCurrentQ(0);

    try {
      const pastPerformance = buildPastPerformance();
      const res = await fetch(`${API_URL}/api/skill-test/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentClass, subject, difficulty, pastPerformance }),
      });
      const data = await res.json();
      if (data.questions?.length > 0) setTest(data);
      else alert("Failed to generate test. Try again.");
    } catch (err) {
      alert("Backend connection failed. Make sure server is running on port 4000.");
    }
    setLoading(false);
  };

  const handleAnswer = (qId, optIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    setEvaluating(true);

    const uid = auth.currentUser?.uid || "guest";
    let calculatedScore = 0;
    test.questions.forEach(q => { if (answers[q.id] === q.correctIndex) calculatedScore++; });

    try {
      const profile = JSON.parse(localStorage.getItem("saarthi_profile") || "{}");
      const mem = getMemory();
      const fullProfile = { ...profile, ...mem };

      const res = await fetch(`${API_URL}/api/skill-test/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: test.questions, answers, studentProfile: fullProfile }),
      });
      const evalData = await res.json();
      setEvaluation(evalData);

      await savePerformance(uid, {
        quizId: `skill_${Date.now()}`, score: evalData.score, totalQuestions: evalData.total,
        weakTopics: evalData.weaknesses || [], strongTopics: evalData.strengths || [],
        source: "skill_test", subject, difficulty
      });

      const prevResults = JSON.parse(localStorage.getItem("saarthi_test_results") || "[]");
      prevResults.push({ ...evalData, subject, difficulty, date: new Date().toISOString() });
      localStorage.setItem("saarthi_test_results", JSON.stringify(prevResults));

      logActivity(uid, "skill_test_complete", { subject, score: evalData.score, total: evalData.total });
      recordQuizResult({ subject, score: evalData.score, total: evalData.total, weakTopics: evalData.weaknesses || [], strongTopics: evalData.strengths || [], source: 'skill_test' });
      addActivity('skill_test_complete', `${subject}: ${evalData.score}/${evalData.total}`);
    } catch (err) {
      setEvaluation({ score: calculatedScore, total: test.questions.length, percentage: Math.round(calculatedScore / test.questions.length * 100),
        strengths: ["Attempted all questions"], weaknesses: ["Could not analyze — backend offline"],
        recommendations: ["Try again when backend is available"], roadmap: [], adaptiveSuggestions: [] });
    }
    setEvaluating(false);

    // Dispatch event so floating AI mentor reacts
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('saarthi-activity', {
        detail: { subject, score: evaluation?.score || calculatedScore, total: evaluation?.total || test.questions.length }
      }));
    }
  };

  // Config screen
  if (!test && !loading) return (
    <div className="min-h-screen page-bg">
      <Head><title>Skill Assessment | Saarthi</title></Head>
      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-[10%] left-[30%] w-[400px] h-[400px] rounded-full orb-purple blur-[80px]" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6">
        <button onClick={() => router.push("/dashboard")} className="btn-ghost flex items-center gap-2 mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🧠</span>
          <h1 className="text-3xl font-bold">Skill Assessment</h1>
        </div>
        <p className="text-secondary-themed mb-8">AI-powered diagnostic test that adapts to your strengths and weaknesses. Get a personalized learning roadmap.</p>

        <div className="glass-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-muted-themed mb-2">Your Class</label>
              <select value={studentClass} onChange={e => setStudentClass(e.target.value)} className="input-dark">
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={String(i+1)}>Class {i+1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-themed mb-2">Subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value)} className="input-dark">
                {["Physics", "Mathematics", "Chemistry", "Biology", "General Science", "English", "Hindi", "Social Science", "Computer Science"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-themed mb-2">Difficulty</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="input-dark">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <button onClick={generateTest} className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2">
            <Brain className="w-5 h-5" /> Start Diagnostic Assessment
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen page-bg flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
        <p className="text-secondary-themed">AI is crafting a personalized {subject} diagnostic test...</p>
        <p className="text-muted-themed text-sm mt-2">Analyzing your past performance to target weak areas</p>
      </div>
    </div>
  );

  // Results
  if (submitted) return (
    <div className="min-h-screen page-bg">
      <Head><title>Test Results | Saarthi</title></Head>
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        <button onClick={() => router.push("/dashboard")} className="btn-ghost flex items-center gap-2 mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        {evaluating ? (
          <div className="glass-card p-10 text-center">
            <Sparkles className="w-10 h-10 text-indigo-400 animate-pulse mx-auto mb-4" />
            <p className="text-secondary-themed">AI is deeply analyzing your performance...</p>
            <p className="text-muted-themed text-sm mt-2">Creating personalized roadmap and recommendations</p>
          </div>
        ) : evaluation ? (
          <div className="space-y-6">
            {/* WOW Adaptive Insight — Day 3 */}
            {(() => {
              const wowInsight = generateAdaptiveWowInsight();
              return wowInsight && wowInsight.insight ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="wow-card p-6"
                >
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
                </motion.div>
              ) : null;
            })()}

            {/* Score Card */}
            <div className="glass-card p-8 text-center">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{test.testTitle || "Skill Assessment"} Complete!</h2>
              <p className="text-5xl font-black gradient-text mb-2">{evaluation.score}/{evaluation.total}</p>
              <p className="text-secondary-themed">{evaluation.percentage}% • {evaluation.percentage >= 80 ? "Excellent! 🎉" : evaluation.percentage >= 60 ? "Good effort! 👍" : "Keep practising! 💪"}</p>
              {evaluation.overallAssessment && (
                <p className="text-secondary-themed mt-4 max-w-lg mx-auto leading-relaxed">{evaluation.overallAssessment}</p>
              )}
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-emerald-300">
                  <CheckCircle className="w-5 h-5" /> Strengths
                </h3>
                <ul className="space-y-2">
                  {(evaluation.strengths || []).map((s, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-emerald-400">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-amber-300">
                  <Target className="w-5 h-5" /> Needs Improvement
                </h3>
                <ul className="space-y-2">
                  {(evaluation.weaknesses || []).map((w, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-amber-400">•</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Personalized Roadmap */}
            {evaluation.roadmap?.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-cyan-300">
                  <Map className="w-5 h-5" /> Your Personalized 4-Week Roadmap
                </h3>
                <div className="space-y-4">
                  {evaluation.roadmap.map((week, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="relative pl-8 border-l-2 border-cyan-500/30"
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-2 border-gray-950" />
                      <div className="p-4 rounded-xl bg-gray-800/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span className="font-bold text-cyan-300">Week {week.week}</span>
                          <span className="text-sm text-gray-400">— {week.focus}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">🎯 Goal: {week.goal}</p>
                        <ul className="space-y-1">
                          {(week.tasks || []).map((task, j) => (
                            <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                              <ChevronRight className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" /> {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Adaptive Suggestions */}
            {evaluation.adaptiveSuggestions?.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-purple-300">
                  <Sparkles className="w-5 h-5" /> Personalized AI Insights
                </h3>
                <ul className="space-y-2">
                  {evaluation.adaptiveSuggestions.map((s, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                      <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {evaluation.recommendations?.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2 text-indigo-300">
                  <BookOpen className="w-5 h-5" /> Recommendations
                </h3>
                <ul className="space-y-2">
                  {evaluation.recommendations.map((r, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Test Strategy */}
            {evaluation.nextTestStrategy && (
              <div className="glass-card p-5 border-l-4 border-l-indigo-500">
                <p className="text-xs text-indigo-400 font-semibold mb-1">NEXT TEST STRATEGY</p>
                <p className="text-gray-300 text-sm">{evaluation.nextTestStrategy}</p>
              </div>
            )}

            {/* Question Review */}
            <div className="glass-card p-6">
              <h3 className="font-bold mb-4">Question Review</h3>
              <div className="space-y-3">
                {test.questions.map((q, i) => {
                  const isCorrect = answers[q.id] === q.correctIndex;
                  return (
                    <div key={i} className={`p-4 rounded-xl border ${isCorrect ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                      <div className="flex items-start gap-2">
                        {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-1" /> : <XCircle className="w-4 h-4 text-red-400 mt-1" />}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{q.question}</p>
                          {!isCorrect && <p className="text-xs text-gray-400 mt-1">Correct: <span className="text-emerald-300">{q.options[q.correctIndex]}</span></p>}
                          {q.explanation && <p className="text-xs text-gray-500 mt-1">{q.explanation}</p>}
                        </div>
                        <span className="badge badge-primary text-xs">{q.topic}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => { setTest(null); setSubmitted(false); setEvaluation(null); }} className="btn-primary">Take Another Test</button>
              <button onClick={() => router.push("/dashboard/insights")} className="btn-secondary flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> View Insights
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  // Test Taking
  const q = test.questions[currentQ];
  const isLast = currentQ === test.questions.length - 1;
  const allAnswered = Object.keys(answers).length === test.questions.length;

  return (
    <div className="min-h-screen page-bg">
      <Head><title>{test.testTitle || "Skill Test"} | Saarthi</title></Head>
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{test.testTitle}</span>
            <span>{currentQ + 1} / {test.questions.length}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${((currentQ + 1) / test.questions.length) * 100}%` }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8"
          >
            {q.topic && <span className="badge badge-primary text-xs mb-4">{q.topic}</span>}
            <h3 className="text-xl font-bold mb-6">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isSelected = answers[q.id] === i;
                return (
                  <button key={i} onClick={() => handleAnswer(q.id, i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                      isSelected ? "border-indigo-500 bg-indigo-500/10" : "border-gray-800 bg-gray-900/30 hover:border-gray-600"
                    }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isSelected ? "bg-indigo-500 text-white" : "bg-gray-800 text-gray-400"
                    }`}>{String.fromCharCode(65 + i)}</div>
                    <span className="text-gray-200">{opt}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
            className="btn-ghost disabled:opacity-30">← Previous</button>
          {isLast && allAnswered ? (
            <button onClick={handleSubmit} className="btn-primary">Submit Test</button>
          ) : (
            <button onClick={() => setCurrentQ(Math.min(test.questions.length - 1, currentQ + 1))} disabled={isLast}
              className="btn-ghost disabled:opacity-30">Next →</button>
          )}
        </div>

        <div className="flex justify-center gap-1 mt-6">
          {test.questions.map((_, i) => (
            <button key={i} onClick={() => setCurrentQ(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentQ ? "bg-indigo-500 w-6" : answers[test.questions[i].id] !== undefined ? "bg-indigo-500/40" : "bg-gray-700"
              }`} />
          ))}
        </div>
      </div>
    </div>
  );
}
