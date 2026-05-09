import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { generateInsights, generateMentorInsights } from "../../utils/insightEngine";
import { getMemory } from "../../utils/studentMemory";
import {
  ArrowLeft, TrendingUp, Target, Award, Brain, BarChart3, 
  ChevronRight, Sparkles, AlertTriangle, CheckCircle, Flame,
  Clock, Lightbulb, Zap, Activity
} from "lucide-react";

export default function Insights() {
  const router = useRouter();
  const [insights, setInsights] = useState(null);
  const [memory, setMemory] = useState(null);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    try {
      setInsights(generateInsights());
      setMemory(getMemory());
      const results = JSON.parse(localStorage.getItem("saarthi_test_results") || "[]");
      setTestResults(results);
    } catch(e) {}
  }, []);

  const quizStats = insights?.quizStats || {};
  const streak = insights?.streak || 0;
  const studyTiming = insights?.studyTiming || {};
  const consistency = insights?.consistency || {};
  const weakTopics = insights?.weakTopics || [];
  const recommendations = insights?.recommendations || [];
  const mentorMessage = insights?.mentorMessage || '';
  const mentorInsights = insights?.mentorInsights || [];
  const productivityPatterns = insights?.productivityPatterns || [];

  const totalTests = quizStats.totalTests || testResults.length || 0;

  // Score trend from test results
  const scoreTrend = testResults.map((r, i) => ({
    index: i + 1,
    score: r.percentage || Math.round((r.score / r.total) * 100),
    subject: r.subject || "General",
    date: r.date ? new Date(r.date).toLocaleDateString() : `Test ${i + 1}`
  }));

  return (
    <div className="min-h-screen page-bg">
      <Head>
        <title>Insights & Analytics | Saarthi</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-[10%] right-[20%] w-[400px] h-[400px] rounded-full orb-indigo blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        <button onClick={() => router.push("/dashboard")} className="btn-ghost flex items-center gap-2 mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📊</span>
          <h1 className="text-3xl font-bold heading-section">Your Insights</h1>
        </div>
        <p className="text-secondary-themed mb-8">Track your progress, identify patterns, and get actionable recommendations.</p>

        {totalTests === 0 && testResults.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <BarChart3 className="w-12 h-12 text-muted-themed mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Data Yet</h3>
            <p className="text-secondary-themed mb-6">Take your first skill assessment to see insights here.</p>
            <button onClick={() => router.push("/dashboard/skill-test")} className="btn-primary">
              Take Skill Test
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* AI Mentor Insight */}
            {mentorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mentor-card glass-card p-5 border-l-4 border-l-indigo-500"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-indigo-400 font-semibold mb-1 tracking-wide">SAARTHI AI MENTOR</p>
                    <p className="text-secondary-themed leading-relaxed">{mentorMessage}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Mentor Insights Cards */}
            {mentorInsights.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-semibold text-muted-themed tracking-wide uppercase">AI Mentor Insights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mentorInsights.map((insight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="mentor-card glass-card p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                        <div>
                          <p className={`text-xs font-bold mb-1 text-${insight.color}-400`}>{insight.title}</p>
                          <p className="text-sm text-secondary-themed leading-relaxed">{insight.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Brain className="w-5 h-5" />, value: totalTests, label: "Tests Taken", color: "text-indigo-400" },
                { icon: <TrendingUp className="w-5 h-5" />, value: `${quizStats.avgScore || 0}%`, label: "Average Score", color: "text-cyan-400" },
                { icon: <Flame className="w-5 h-5" />, value: streak > 0 ? `${streak} 🔥` : '0', label: "Day Streak", color: "text-orange-400" },
                { icon: <Zap className="w-5 h-5" />, value: `${consistency.score || 0}%`, label: "Consistency", color: "text-emerald-400" },
              ].map((stat, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-5"
                >
                  <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-themed">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Score Trend */}
            {scoreTrend.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" /> Score Trend
                  {quizStats.trend && quizStats.trend !== 'none' && (
                    <span className={`badge text-xs ${quizStats.trend === 'improving' ? 'badge-success' : quizStats.trend === 'declining' ? 'badge-danger' : 'badge-primary'}`}>
                      {quizStats.trend === 'improving' ? '📈 Improving' : quizStats.trend === 'declining' ? '📉 Needs Work' : '➡️ Stable'}
                    </span>
                  )}
                </h3>
                <div className="flex items-end gap-2 h-40">
                  {scoreTrend.map((s, i) => (
                    <motion.div key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${s.score}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex-1 relative group cursor-pointer"
                    >
                      <div className="absolute inset-x-0 bottom-0 rounded-t-lg bg-gradient-to-t from-indigo-600 to-cyan-500 transition-all group-hover:from-indigo-500 group-hover:to-cyan-400"
                        style={{ height: `${s.score}%` }} />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10" style={{ background: 'rgba(var(--bg-card), 0.9)', border: '1px solid rgba(var(--border-color), 0.3)' }}>
                        {s.score}% • {s.subject}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  {scoreTrend.map((s, i) => (
                    <div key={i} className="flex-1 text-center text-xs text-muted-themed truncate">{s.date}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Productivity Patterns + Study Timing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" /> Study Pattern
                </h3>
                {studyTiming.preferred && studyTiming.preferred !== 'Not enough data' && (
                  <div className="mb-4">
                    <span className="badge badge-primary text-sm">{studyTiming.preferred}</span>
                  </div>
                )}
                <p className="text-secondary-themed text-sm">{consistency.label || 'Keep studying to see patterns!'}</p>
                {consistency.activeDays && (
                  <p className="text-muted-themed text-xs mt-2">Active {consistency.activeDays} of {consistency.totalDays} days</p>
                )}
                {/* Productivity patterns */}
                {productivityPatterns.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {productivityPatterns.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-secondary-themed p-2 rounded-lg" style={{ background: 'rgba(var(--bg-card), 0.3)' }}>
                        <span>{p.icon}</span>
                        <span>{p.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Weak Topics */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5" /> Focus Areas
                </h3>
                {weakTopics.length > 0 ? (
                  <div className="space-y-2">
                    {weakTopics.map((w, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'rgba(var(--bg-card), 0.3)' }}>
                        <span className="text-sm text-secondary-themed">{w.topic}</span>
                        <span className="text-xs text-amber-400">{w.frequency}x weak</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-themed text-sm">Take more tests to identify focus areas.</p>
                )}
              </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-400">
                  <Lightbulb className="w-5 h-5" /> Smart Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(var(--bg-card), 0.3)' }}>
                      <span className="text-lg flex-shrink-0">{rec.icon}</span>
                      <span className="text-sm text-secondary-themed">{rec.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test History */}
            {testResults.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4">Test History</h3>
                <div className="space-y-3">
                  {testResults.slice().reverse().slice(0, 10).map((result, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(var(--bg-card), 0.3)' }}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          (result.percentage || 0) >= 70 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {result.percentage || Math.round((result.score / result.total) * 100)}%
                        </div>
                        <div>
                          <div className="font-medium text-sm">{result.subject || "General"} — {result.difficulty || "Medium"}</div>
                          <div className="text-xs text-muted-themed">{result.date ? new Date(result.date).toLocaleString() : "Unknown date"}</div>
                        </div>
                      </div>
                      <span className="text-sm text-secondary-themed">{result.score}/{result.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <button onClick={() => router.push("/dashboard/skill-test")} className="btn-primary">
                Take Another Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
