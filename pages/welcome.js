import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Brain, Target, TrendingUp, BookOpen, Compass, Users, Shield, Zap } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const steps = [
  {
    icon: <Target className="w-7 h-7" />,
    title: "Personalize",
    desc: "Answer a few quick questions so Saarthi understands your learning style, interests, and dreams.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: "Learn Smart",
    desc: "Get AI-powered quizzes, summaries, and guidance tailored exactly to your class and goals.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Grow Daily",
    desc: "Track your progress, discover career paths, and watch your skills improve over time.",
    color: "from-rose-500 to-pink-500",
  },
];

const features = [
  { icon: <Compass className="w-5 h-5" />, title: "Career Explorer", desc: "Discover 20+ real career paths with roadmaps, salaries, and eligibility details." },
  { icon: <BookOpen className="w-5 h-5" />, title: "AI Exam Zone", desc: "Upload your notes, generate quizzes, get summaries, and chat with your documents." },
  { icon: <Brain className="w-5 h-5" />, title: "Skill Tests", desc: "NCERT-aligned assessments that identify your strengths and areas to improve." },
  { icon: <Sparkles className="w-5 h-5" />, title: "Smart Insights", desc: "Your AI mentor tracks your progress and gives personalized recommendations." },
];

const trustPoints = [
  { icon: <Shield className="w-5 h-5" />, text: "Free for all students" },
  { icon: <Users className="w-5 h-5" />, text: "Built for Class 1–10" },
  { icon: <Zap className="w-5 h-5" />, text: "Powered by AI" },
];

export default function Welcome() {
  return (
    <div className="min-h-screen page-bg overflow-hidden">
      <Head>
        <title>Meet Saarthi — Your AI Academic Mentor</title>
        <meta name="description" content="Saarthi is your personal AI academic mentor. Discover career paths, take smart quizzes, and get personalized guidance for Class 1-10 students." />
      </Head>

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="animated-orb absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full orb-indigo blur-[120px]" />
        <div className="animated-orb-2 absolute top-[50%] right-[5%] w-[400px] h-[400px] rounded-full orb-purple blur-[100px]" />
        <div className="animated-orb-3 absolute bottom-[5%] left-[30%] w-[450px] h-[450px] rounded-full orb-cyan blur-[100px]" />
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero — What is Saarthi */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6"
            style={{
              background: 'rgba(var(--glass-bg), var(--glass-opacity))',
              borderColor: 'rgba(var(--glow-color), 0.2)',
              color: '#818cf8'
            }}
          >
            AI-Powered Learning Companion
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
            Meet{" "}
            <span className="gradient-text">Saarthi</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-secondary-themed max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Saarthi is your personal AI academic mentor — designed for students in Class 1 to 10. 
            It learns who you are, adapts to how you study, and guides you toward 
            the career that's right for <em>you</em>.
          </motion.p>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {trustPoints.map((pt, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-secondary-themed">
                <span className="text-indigo-400">{pt.icon}</span>
                {pt.text}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/mode"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-lg text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started — It's Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: 'rgba(var(--border-color), 0.5)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works — 3 Steps */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How <span className="gradient-text">Saarthi</span> Works
            </h2>
            <p className="text-secondary-themed max-w-xl mx-auto text-lg">
              Three simple steps to unlock your personalized learning journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-8 text-center relative"
              >
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  {i + 1}
                </div>
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-5 mt-2`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-secondary-themed leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-secondary-themed max-w-xl mx-auto text-lg">
              Powered by AI, designed for real students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex items-start gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors">{f.title}</h3>
                  <p className="text-secondary-themed text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16"
          >
            <div className="text-5xl mb-6">🎓</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Meet Your AI Mentor?
            </h2>
            <p className="text-secondary-themed mb-8 text-lg max-w-xl mx-auto">
              Thousands of students are already discovering their strengths and building their future with Saarthi. Your turn.
            </p>
            <Link
              href="/mode"
              className="group inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-lg text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4" style={{ borderTop: '1px solid rgba(var(--border-color), 0.3)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="font-semibold">Saarthi</span>
          </div>
          <p className="text-muted-themed text-sm">© 2025 Saarthi. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
}
