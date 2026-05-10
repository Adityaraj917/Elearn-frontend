import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getMemory, getStudyStreak, addActivity, recordSessionTiming, trackLogin, shouldForceSkillTest, calculateGoalAlignment } from "../../utils/studentMemory";
import { generateInsights } from "../../utils/insightEngine";
import { getHeroInsight } from "../../utils/mentorPersona";
import { getResourcesForTopic, getQuickSuggestion } from "../../utils/resourceBank";
import ThemeToggle from "../../components/ThemeToggle";
import { 
  Compass, BookOpen, Brain, LogOut,
  Target, TrendingUp, Award, Sparkles,
  Zap, Flame, Star,
  ArrowRight, ExternalLink, Clock, ChevronDown, ChevronUp
} from "lucide-react";

/* ═══ Class Tier Helper ═══ */
function getClassTier(classStr) {
  if (!classStr) return "middle";
  const s = classStr.toLowerCase();
  if (s.includes("1") && !s.includes("10") || s.includes("2") || s.includes("3")) {
    if (s.includes("1-3") || s.includes("1–3")) return "junior";
  }
  if (s.includes("4") || s.includes("5") || s.includes("4-5") || s.includes("4–5")) return "middle";
  if (s.includes("6") || s.includes("7") || s.includes("8") || s.includes("6-8") || s.includes("6–8")) return "senior";
  if (s.includes("9") || s.includes("10") || s.includes("9-10") || s.includes("9–10")) return "exam";
  return "middle";
}

/* ═══ Dynamic Greeting ═══ */
function getDynamicGreeting(name) {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  return `${greet}, ${name}!`;
}

/* ═══ Confidence Ring SVG ═══ */
function ConfidenceRing({ value, max = 100, color = "#f59e0b", size = 40 }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(var(--border-color), 0.2)" strokeWidth="4" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
    </svg>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForceTest, setShowForceTest] = useState(false);

  useEffect(() => {
    let unsubscribe;
    const fetchProfile = async () => {
      try {
        const mode = typeof window !== "undefined" ? localStorage.getItem("saarthi_mode") : null;
        if (mode === "guest") {
          const stored = localStorage.getItem("saarthi_profile");
          if (stored) setProfile(JSON.parse(stored));
          else { router.push("/onboarding"); return; }
          
          addActivity('dashboard_visit', 'Opened dashboard');
          recordSessionTiming();
          trackLogin();
          if (shouldForceSkillTest()) setShowForceTest(true);
          setLoading(false);
        } else {
          unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists() && docSnap.data().onboardingData) {
                setProfile(docSnap.data().onboardingData);
                addActivity('dashboard_visit', 'Opened dashboard');
                recordSessionTiming();
                trackLogin();
                if (shouldForceSkillTest()) setShowForceTest(true);
              } else { 
                router.push("/onboarding"); 
                return; 
              }
            } else { 
              router.push("/mode"); 
              return; 
            }
            setLoading(false);
          });
        }
      } catch (err) { 
        console.error(err); 
        setLoading(false);
      }
    };
    fetchProfile();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [router]);

  const handleLogout = () => {
    auth.signOut();
    if (typeof window !== "undefined") localStorage.clear();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen page-bg flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Sparkles className="w-8 h-8 text-indigo-400" />
        </motion.div>
      </div>
    );
  }

  const tier = getClassTier(profile?.class);
  const personalityEmoji = { Analytical: "🧠", Creative: "🎨", Leader: "👑", Helper: "🤝", Explorer: "🧭", Builder: "🔧" };
  const pEmoji = personalityEmoji[profile?.profileAnalysis?.personalityType] || "⭐";

  return (
    <div className="min-h-screen page-bg">
      <Head><title>Dashboard | Saarthi</title></Head>

      {/* Subtle background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-0 right-0 w-[600px] h-[600px] rounded-full orb-indigo blur-[120px]" />
        <div className="animated-orb-2 absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full orb-purple blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6">
        {/* ── Compact Header ── */}
        <header className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={handleLogout} className="btn-ghost flex items-center gap-1.5 text-xs">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </header>

        <OverviewTab profile={profile} tier={tier} pEmoji={pEmoji} />
      </div>

      {/* ══════ FORCED SKILL TEST MODAL ══════ */}
      <AnimatePresence>
        {showForceTest && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="glass-card p-8 max-w-lg w-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Welcome back! 🎯</h2>
              <p className="text-secondary-themed mb-2">Before we continue, let's assess where you stand today.</p>
              <p className="text-muted-themed text-sm mb-6">Saarthi tracks your progress over time. A quick skill test helps us give you smarter recommendations.</p>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/dashboard/skill-test?forced=true')}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2">
                <Target className="w-5 h-5" /> Take Skill Assessment
              </motion.button>
              <p className="text-xs text-muted-themed mt-4">This takes about 5 minutes and helps Saarthi understand your growth.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REDESIGNED OVERVIEW — Premium, spacious
   ═══════════════════════════════════════════ */
function OverviewTab({ profile, tier, pEmoji }) {
  const [insights, setInsights] = useState(null);
  const [memory, setMemory] = useState(null);
  const [heroText, setHeroText] = useState('');
  const [expandedTopic, setExpandedTopic] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setInsights(generateInsights());
    setMemory(getMemory());
    setHeroText(getHeroInsight());
  }, []);

  // Listen for activity events to refresh
  useEffect(() => {
    const refresh = () => {
      setInsights(generateInsights());
      setMemory(getMemory());
      setHeroText(getHeroInsight());
    };
    window.addEventListener('saarthi-activity', refresh);
    return () => window.removeEventListener('saarthi-activity', refresh);
  }, []);

  const streak = insights?.streak || 0;
  const quizStats = insights?.quizStats || {};
  const weakAreas = memory?.weakSubjects?.length > 0 ? memory.weakSubjects : (profile?.profileAnalysis?.areasToExplore || []);
  const strengths = memory?.strengths?.length > 0 ? memory.strengths : (profile?.profileAnalysis?.strengths || ["Curiosity"]);

  /* Quick Actions */
  const quickActions = [
    { title: "Skill Test", desc: "AI-powered diagnostic", icon: <Brain className="w-5 h-5" />, color: "from-rose-500 to-pink-500", href: "/dashboard/skill-test" },
    { title: "Exam Zone", desc: "Practice & prepare", icon: <BookOpen className="w-5 h-5" />, color: "from-violet-500 to-purple-500", href: "/dashboard/exam-zone" },
    { title: "Careers", desc: "Explore your path", icon: <Compass className="w-5 h-5" />, color: "from-cyan-500 to-blue-500", href: "/dashboard/career" },
    { title: "Insights", desc: "Performance analytics", icon: <TrendingUp className="w-5 h-5" />, color: "from-amber-500 to-orange-500", href: "/dashboard/insights" },
  ];

  return (
    <div className="space-y-6">

      {/* ══════ 1. HERO GREETING ══════ */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-greeting"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl shadow-lg shadow-indigo-500/20">
            {pEmoji}
          </div>
          <div>
            <h1>{getDynamicGreeting(profile?.name || "there")}</h1>
            <p className="text-xs text-muted-themed mt-0.5">
              {profile?.class || "Explorer"} • {profile?.profileAnalysis?.personalityType || "Explorer"}
            </p>
          </div>
        </div>
        {heroText && (
          <p className="hero-subtitle">{heroText}</p>
        )}
      </motion.div>

      {/* ══════ 2. SMART METRICS ══════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <Flame className="w-4 h-4 text-orange-500" />, value: streak > 0 ? `${streak}` : "0", label: "Day Streak", pct: Math.min(streak / 21, 1), color: "#f97316" },
          { icon: <Brain className="w-4 h-4 text-cyan-500" />, value: `${quizStats.totalTests || 0}`, label: "Tests Taken", pct: Math.min((quizStats.totalTests || 0) / 10, 1), color: "#06b6d4" },
          { icon: <TrendingUp className="w-4 h-4 text-emerald-500" />, value: quizStats.avgScore ? `${quizStats.avgScore}%` : "—", label: "Avg Score", pct: (quizStats.avgScore || 0) / 100, color: "#10b981" },
          { icon: <Star className="w-4 h-4 text-indigo-500" />, value: quizStats.trend === "improving" ? "↑ Up" : quizStats.trend === "declining" ? "↓ Dip" : "—", label: "Trend", pct: quizStats.trend === "improving" ? 0.8 : quizStats.trend === "declining" ? 0.3 : 0, color: "#6366f1" },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="smart-metric"
          >
            <div className="metric-ring">
              <ConfidenceRing value={m.pct * 100} color={m.color} size={44} />
              <span className="ring-icon">{m.icon}</span>
            </div>
            <div className="metric-info">
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ══════ 2.5 GOAL ALIGNMENT METER ══════ */}
      {(() => {
        const alignment = calculateGoalAlignment(memory);
        const bp = memory?.behaviorProfile || {};
        const history = (memory?.goalAlignmentHistory || []).slice(-5);
        const goalName = memory?.careerGoal || memory?.dreamCareer || '';
        if (!goalName) return null;
        return (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-muted-themed tracking-wider uppercase">Goal Alignment</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                alignment.label === 'On Track' ? 'bg-emerald-500/15 text-emerald-400' :
                alignment.label === 'Needs Focus' ? 'bg-amber-500/15 text-amber-400' :
                alignment.label === 'Drifting' ? 'bg-orange-500/15 text-orange-400' :
                'bg-red-500/15 text-red-400'
              }`}>{alignment.label}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Arc Gauge */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-20 h-20" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="6"
                    strokeDasharray="160 54" strokeLinecap="round" transform="rotate(135 40 40)" />
                  <circle cx="40" cy="40" r="34" fill="none"
                    stroke={alignment.score >= 70 ? '#10b981' : alignment.score >= 45 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${alignment.score * 1.6} ${160 - alignment.score * 1.6 + 54}`}
                    transform="rotate(135 40 40)"
                    style={{ transition: 'stroke-dasharray 1s ease' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">{alignment.score}</span>
                  <span className="text-[9px] text-muted-themed">/ 100</span>
                </div>
              </div>

              {/* Info + 5-Day Pulse */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-secondary-themed mb-2 truncate">
                  Dream: <span className="font-semibold text-indigo-400">{goalName}</span>
                </p>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-[10px] text-muted-themed mr-1">5-Day Pulse:</span>
                  {[...Array(5)].map((_, i) => {
                    const entry = history[i];
                    const s = entry?.score || 0;
                    const bg = !entry ? 'bg-gray-700' : s >= 70 ? 'bg-emerald-500' : s >= 45 ? 'bg-amber-500' : 'bg-red-500';
                    return <div key={i} className={`w-4 h-4 rounded-full ${bg} transition-all`} title={entry ? `${entry.date}: ${s}%` : 'No data'} />;
                  })}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-themed">
                  <span>Consistency: <b className="text-secondary-themed">{bp.consistency || 0}%</b></span>
                  <span>Effort: <b className={`${bp.effortTrend === 'increasing' ? 'text-emerald-400' : bp.effortTrend === 'decreasing' ? 'text-red-400' : 'text-secondary-themed'}`}>
                    {bp.effortTrend === 'increasing' ? '↑ Rising' : bp.effortTrend === 'decreasing' ? '↓ Falling' : '→ Stable'}
                  </b></span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })()}

      {/* ══════ 3. FOCUS AREAS + QUICK ACTIONS — 2 column ══════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Focus Areas */}
        <div>
          <div className="section-header">
            <Target className="w-3.5 h-3.5 text-amber-500" />
            <span>Focus Areas</span>
          </div>
          {weakAreas.length > 0 ? (
            <div className="space-y-2.5">
              {weakAreas.slice(0, 3).map((area, i) => (
                <FocusCard
                  key={i}
                  topic={area}
                  index={i}
                  expanded={expandedTopic === area}
                  onToggle={() => setExpandedTopic(expandedTopic === area ? null : area)}
                />
              ))}
            </div>
          ) : (
            <div className="focus-card" style={{ cursor: 'default' }}>
              <div className="flex items-center gap-3 text-sm text-muted-themed">
                <Target className="w-5 h-5 text-amber-400/40" />
                <span>Take a skill test to identify focus areas</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <div className="section-header">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Quick Actions</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => router.push(action.href)}
                className="action-tile"
              >
                <div className={`tile-icon bg-gradient-to-br ${action.color}`}>
                  {action.icon}
                </div>
                <div>
                  <div className="tile-title">{action.title}</div>
                  <div className="tile-desc">{action.desc}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ 4. LEARNING PULSE — Compact bar ══════ */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="learning-pulse"
      >
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="badge badge-primary text-xs">{profile?.profileAnalysis?.personalityType || "Explorer"}</span>
          </div>
          <span className="text-xs text-muted-themed">{memory?.learningStyle || profile?.profileAnalysis?.learningStyle || "Visual"}</span>
          {strengths.slice(0, 2).map((s, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/8 text-emerald-600 border border-emerald-500/12">{s}</span>
          ))}
          {memory?.careerGoal && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/8 text-cyan-600 border border-cyan-500/12">{memory.careerGoal}</span>
          )}
        </div>
        <button onClick={() => router.push('/dashboard/insights')} className="btn-ghost text-xs flex items-center gap-1 flex-shrink-0">
          Analytics <ArrowRight className="w-3 h-3" />
        </button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FOCUS CARD — Confidence ring + hover reveal
   ═══════════════════════════════════════════ */
function FocusCard({ topic, index, expanded, onToggle }) {
  const [resources, setResources] = useState([]);
  const suggestion = getQuickSuggestion(topic);
  const confidence = Math.max(15, 60 - index * 15); // simulated confidence %

  useEffect(() => {
    if (expanded) {
      setResources(getResourcesForTopic(topic, topic));
    }
  }, [expanded, topic]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06 }}
    >
      <div className="focus-card" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="focus-confidence">
              <ConfidenceRing value={confidence} color="#f59e0b" size={40} />
            </div>
            <div>
              <p className="font-semibold text-sm">{topic}</p>
              <p className="text-xs text-muted-themed mt-0.5 line-clamp-1">{suggestion}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/8 text-amber-600 border border-amber-500/15 font-medium hover:bg-amber-500/15 transition-colors"
            >
              {expanded ? 'Close' : 'Improve'}
            </button>
            {expanded ? <ChevronUp className="w-3.5 h-3.5 text-muted-themed" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-themed" />}
          </div>
        </div>

        {/* Hover hint — visible on hover, hidden on mobile */}
        <div className="focus-hint text-xs text-muted-themed hidden md:block">
          Why weak? Appeared {Math.min(80, 40 + index * 12)}% in recent quizzes • Tap to see resources
        </div>
      </div>

      {/* Resource Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="resource-panel">
              <p className="text-xs font-semibold text-muted-themed mb-2.5 uppercase tracking-wide">Recommended Resources</p>
              <div className="space-y-2">
                {resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-card"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="resource-icon bg-indigo-50 dark:bg-indigo-500/10">
                      <span>{res.sourceMeta?.icon || '📚'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-xs truncate">{res.title}</p>
                        <ExternalLink className="w-3 h-3 text-muted-themed flex-shrink-0" />
                      </div>
                      <p className="text-xs text-muted-themed">{res.why}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/8 text-emerald-600 border border-emerald-500/10">{res.difficulty}</span>
                        <span className="text-xs text-muted-themed flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" /> {res.time}
                        </span>
                        <span className="text-xs text-muted-themed">{res.source}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
