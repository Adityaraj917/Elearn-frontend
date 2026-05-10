import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Sparkles, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { initMemoryFromOnboarding, addActivity } from "../utils/studentMemory";
import ThemeToggle from "../components/ThemeToggle";

import { API_URL } from "../utils/api";

/* ═══════════════════════════════════════════
   FIXED PERSONALIZATION QUESTIONS
   5 focused questions — no filler, no repetition
   ═══════════════════════════════════════════ */
const fixedQuestions = [
  {
    id: "name",
    question: "Hey there! What should we call you? 👋",
    type: "text",
    placeholder: "Type your name...",
    topic: "identity",
  },
  {
    id: "class",
    question: "Which class are you studying in?",
    options: [
      { label: "Class 1–3", emoji: "🌱", sub: "Young Explorer" },
      { label: "Class 4–5", emoji: "🌿", sub: "Growing Mind" },
      { label: "Class 6–8", emoji: "🌳", sub: "Knowledge Builder" },
      { label: "Class 9–10", emoji: "🎯", sub: "Exam Champion" },
    ],
    topic: "class_level",
  },
  {
    id: "favorite_subject",
    question: "What subject excites you the most?",
    options: [
      { label: "Physics", emoji: "⚛️" },
      { label: "Mathematics", emoji: "🔢" },
      { label: "Biology", emoji: "🧬" },
      { label: "Chemistry", emoji: "🧪" },
      { label: "Computer Science", emoji: "💻" },
      { label: "Arts & Literature", emoji: "🎨" },
      { label: "Social Studies", emoji: "🌍" },
      { label: "Sports", emoji: "🏅" },
    ],
    topic: "subject_interest",
  },
  {
    id: "dream_career",
    question: "What does your dream future look like? ✨",
    options: [
      { label: "Invent amazing things", emoji: "🔧", sub: "Engineer / Inventor" },
      { label: "Help people stay healthy", emoji: "🏥", sub: "Doctor / Health" },
      { label: "Build the next big app", emoji: "💻", sub: "Tech / Startup" },
      { label: "Teach & inspire others", emoji: "📚", sub: "Teacher / Mentor" },
      { label: "Explore space & nature", emoji: "🌌", sub: "Scientist / Explorer" },
      { label: "Create art & stories", emoji: "🎨", sub: "Artist / Writer" },
      { label: "Lead & manage teams", emoji: "👑", sub: "Leader / Business" },
      { label: "I'm still figuring it out", emoji: "🤔", sub: "That's totally fine!" },
    ],
    topic: "career_aspiration",
  },
  {
    id: "learning_style",
    question: "How do you learn best?",
    options: [
      { label: "Watch & learn", emoji: "📺", sub: "Videos, demos, visual aids" },
      { label: "Read & note down", emoji: "📖", sub: "Books, articles, notes" },
      { label: "Do & practice", emoji: "🛠️", sub: "Hands-on, experiments" },
      { label: "Discuss & debate", emoji: "💬", sub: "Group learning, talking it out" },
    ],
    topic: "learning_preference",
  },
];

const TOTAL_STEPS = 6; // 5 fixed + 1 AI adaptive

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [allQuestions, setAllQuestions] = useState(fixedQuestions);
  const [saving, setSaving] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [profileInsight, setProfileInsight] = useState("");
  const [buildingProfile, setBuildingProfile] = useState(false);
  const [profileResult, setProfileResult] = useState(null);

  useEffect(() => { setIsClient(true); }, []);

  /* ── Fetch ONE AI-adaptive question (question 6) ── */
  const fetchAdaptiveQuestion = async (updatedAnswers) => {
    setLoadingNext(true);
    try {
      const topicsCovered = fixedQuestions.map(q => q.topic);
      const res = await fetch(`${API_URL}/api/onboarding/next-question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previousAnswers: updatedAnswers,
          questionNumber: 6,
          topicsCovered,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.insight) setProfileInsight(data.insight);
        return {
          id: data.id || "adaptive_6",
          question: data.question,
          options: data.options ? data.options.map(o =>
            typeof o === "string" ? { label: o, emoji: "✦" } : o
          ) : [
            { label: "Logical puzzles", emoji: "🧩" },
            { label: "Creative projects", emoji: "🎭" },
            { label: "Physical challenges", emoji: "🏃" },
            { label: "Helping others", emoji: "🤝" },
          ],
          topic: "ai_adaptive",
        };
      }
    } catch (err) {
      console.error("Failed to fetch adaptive question:", err);
    }
    setLoadingNext(false);
    // Fallback
    return {
      id: "adaptive_6",
      question: "What kind of challenges excite you most?",
      options: [
        { label: "Logical puzzles", emoji: "🧩" },
        { label: "Creative projects", emoji: "🎭" },
        { label: "Physical challenges", emoji: "🏃" },
        { label: "Helping others", emoji: "🤝" },
      ],
      topic: "challenge_type",
    };
  };

  /* ── Handle option/text selection ── */
  const handleSelect = async (option) => {
    const currentQ = allQuestions[currentStep];
    const value = typeof option === "object" ? option.label : option;
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    const nextStep = currentStep + 1;

    // After fixed questions (step 4 → step 5), fetch adaptive
    if (nextStep === fixedQuestions.length && allQuestions.length === fixedQuestions.length) {
      const adaptiveQ = await fetchAdaptiveQuestion(newAnswers);
      setAllQuestions(prev => [...prev, adaptiveQ]);
      setLoadingNext(false);
      setTimeout(() => setCurrentStep(nextStep), 250);
      return;
    }

    // If there's a next question in queue
    if (nextStep < allQuestions.length) {
      setTimeout(() => setCurrentStep(nextStep), 250);
      return;
    }

    // Done — save and redirect
    await saveAndRedirect(newAnswers);
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleSelect(textInput.trim());
      setTextInput("");
    }
  };

  /* ── Profile building animation + save ── */
  const saveAndRedirect = async (finalAnswers) => {
    setSaving(true);
    setBuildingProfile(true);

    try {
      // Get AI profile analysis
      let profileAnalysis = null;
      try {
        const res = await fetch(`${API_URL}/api/onboarding/analyze-profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: finalAnswers }),
        });
        if (res.ok) {
          profileAnalysis = await res.json();
          setProfileResult(profileAnalysis);
        }
      } catch(e) { console.error("Profile analysis failed:", e); }

      // Wait for animation
      await new Promise(r => setTimeout(r, 2500));

      const mode = typeof window !== "undefined" ? localStorage.getItem("saarthi_mode") : null;

      const onboardingData = {
        ...finalAnswers,
        profileAnalysis: profileAnalysis || null,
        completedAt: new Date().toISOString(),
      };

      // Initialize student memory for adaptive AI
      initMemoryFromOnboarding(finalAnswers, profileAnalysis);
      addActivity("onboarding_complete", "Profile created");

      if (mode === "guest") {
        localStorage.setItem("saarthi_profile", JSON.stringify(onboardingData));
        router.push("/dashboard");
      } else {
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, "users", user.uid), { onboardingData }, { merge: true });
        } else {
          localStorage.setItem("saarthi_profile", JSON.stringify(onboardingData));
        }
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error saving profile", error);
      router.push("/dashboard");
    }
  };

  if (!isClient) return null;

  const currentQ = allQuestions[currentStep];
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen page-bg flex flex-col justify-center items-center px-4 overflow-hidden py-12 relative">
      <Head>
        <title>Let&apos;s personalize your experience | Saarthi</title>
      </Head>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full orb-indigo blur-[80px]" />
        <div className="animated-orb-2 absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full orb-purple blur-[80px]" />
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl px-4 md:px-0 relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-themed font-medium">Setting up your experience</span>
            <span className="text-sm text-indigo-400 font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(var(--border-color), 0.3)' }}>
            <motion.div 
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #06b6d4)" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Profile Insight (shows after AI question is loaded) */}
        {profileInsight && currentStep >= fixedQuestions.length && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              color: '#818cf8',
            }}
          >
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            {profileInsight}
          </motion.div>
        )}

        <div className="relative min-h-[450px]">
          <AnimatePresence mode="wait">
            {saving ? (
              /* ── Profile Building Animation ── */
              <motion.div
                key="saving"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
              >
                {buildingProfile && !profileResult && (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mb-6"
                    />
                    <h2 className="text-2xl font-bold gradient-text mb-2">
                      Analyzing your profile...
                    </h2>
                    <p className="text-secondary-themed">Understanding your unique learning DNA</p>
                  </>
                )}
                {profileResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold gradient-text mb-3">Profile Ready!</h2>
                    <p className="text-secondary-themed mb-6">{profileResult.summary || "Your personalized dashboard is ready."}</p>
                    
                    {/* Show strengths/personality */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <span className="badge badge-primary">{profileResult.personalityType || "Explorer"}</span>
                      {(profileResult.strengths || []).slice(0, 3).map((s, i) => (
                        <span key={i} className="badge badge-success">{s}</span>
                      ))}
                    </div>

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="h-1 rounded-full mx-auto mt-4"
                      style={{ background: "linear-gradient(90deg, #6366f1, #06b6d4)" }}
                    />
                    <p className="text-xs text-muted-themed mt-3">Redirecting to your dashboard...</p>
                  </motion.div>
                )}
              </motion.div>
            ) : loadingNext ? (
              /* ── Loading adaptive question ── */
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center"
              >
                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
                <p className="text-secondary-themed">Personalizing your next question...</p>
              </motion.div>
            ) : (
              /* ── Question Card ── */
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col w-full"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="inline-block text-indigo-400 font-bold mb-3 tracking-wider text-sm uppercase"
                >
                  Step {currentStep + 1} of {TOTAL_STEPS}
                </motion.span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-10 leading-tight">
                  {currentQ.question}
                </h2>

                {currentQ.type === "text" ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                      placeholder={currentQ.placeholder || "Type here..."}
                      className="input-dark text-lg py-4"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleTextSubmit}
                      disabled={!textInput.trim()}
                      className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                ) : (
                  <div className={`grid gap-3 ${
                    currentQ.options.length <= 4
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
                  }`}>
                    {currentQ.options.map((option, idx) => {
                      const opt = typeof option === "string" ? { label: option, emoji: "✦" } : option;
                      return (
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          key={idx}
                          onClick={() => handleSelect(opt)}
                          className="glass-card px-5 py-4 text-left transition-all duration-200 group"
                        >
                          <span className="text-2xl mb-2 block">{opt.emoji}</span>
                          <span className="font-semibold block group-hover:text-indigo-400 transition-colors">
                            {opt.label}
                          </span>
                          {opt.sub && (
                            <span className="text-xs text-muted-themed block mt-1">{opt.sub}</span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
