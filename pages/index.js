import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Compass, Brain, Target, BookOpen, ChevronRight, Zap, Users, FileText } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const features = [
  { icon: <Compass className="w-6 h-6" />, title: "Career Explorer", desc: "Discover 20+ career paths from Physics with real-world data, roadmaps, and eligibility details.", gradient: "from-brand-400 to-accent-teal" },
  { icon: <Brain className="w-6 h-6" />, title: "AI-Powered Insights", desc: "Dynamic skill assessments that identify your strengths and weaknesses.", gradient: "from-accent-purple to-brand-400" },
  { icon: <Target className="w-6 h-6" />, title: "Personalized Guidance", desc: "Get career recommendations aligned to your unique learning style and goals.", gradient: "from-accent-coral to-accent-gold" },
  { icon: <BookOpen className="w-6 h-6" />, title: "Exam Zone", desc: "Upload study material, generate AI quizzes, get summaries, and chat with your documents.", gradient: "from-accent-teal to-brand-400" },
];

const stats = [
  { value: "10K+", label: "Students", icon: <Users className="w-5 h-5" /> },
  { value: "500+", label: "Notes Summarized", icon: <FileText className="w-5 h-5" /> },
  { value: "AI", label: "Powered Tests", icon: <Zap className="w-5 h-5" /> },
];

const floatingIcons = ["⚛️", "🔭", "🚀", "💡", "🧪", "📐", "🌌", "⚡"];

const stagger = {
  parent: { transition: { staggerChildren: 0.1 } },
  child: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen page-bg bg-mesh overflow-hidden">
      <Head>
        <title>Saarthi | Your AI Academic Career Guide</title>
        <meta name="description" content="Personalized career guidance for students in class 1-10. Explore career paths, take skill tests, and get AI-powered academic mentorship." />
      </Head>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Animated glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="animated-orb absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-brand-400/[0.06] dark:bg-brand-400/[0.08] blur-[120px]" />
        <div className="animated-orb-2 absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-accent-teal/[0.05] dark:bg-accent-teal/[0.07] blur-[100px]" />
        <div className="animated-orb-3 absolute bottom-[5%] left-[35%] w-[450px] h-[450px] rounded-full bg-accent-purple/[0.05] dark:bg-accent-purple/[0.07] blur-[110px]" />
      </div>

      {/* Floating emoji particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${5 + (i * 15) % 85}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger.parent}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          {/* Badge */}
          <motion.div
            variants={stagger.child}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ring-1 ring-brand-400/30 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300"
          >
            <Sparkles className="w-4 h-4" />
            ✦ AI-Powered Learning Platform
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={stagger.child}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white"
          >
            Your Future{" "}
            <span className="bg-gradient-to-r from-brand-400 to-accent-teal bg-clip-text text-transparent">
              Starts Here
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={stagger.child}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Saarthi is your personal AI academic mentor for students in Class 1-10.
            Explore career paths, discover your strengths, take skill assessments,
            and get a personalized roadmap to your dream career.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={stagger.child}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/welcome"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-400 to-accent-teal rounded-2xl font-bold text-lg text-white shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/welcome#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg border border-brand-400/40 text-brand-600 dark:text-brand-400 hover:bg-brand-400/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger.child}
            transition={{ duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-brand-400 to-accent-teal bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-brand-400/30 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Features Section ─── */}
      <section className="relative py-20 lg:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-2 block">
              Features
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-slate-900 dark:text-white">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-brand-400 to-accent-teal bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              From career exploration to exam preparation, Saarthi covers every aspect of your academic journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#131627] rounded-3xl p-8 border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-slate-800 dark:text-white group-hover:text-brand-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats / Social Proof Bar ─── */}
      <section className="relative py-16">
        <div className="bg-slate-900 dark:bg-[#1A1D35] border-y border-gray-200/10 dark:border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400/20 to-accent-teal/20 flex items-center justify-center text-brand-400 mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative py-20 lg:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#131627] rounded-3xl p-12 md:p-16 border border-gray-100 dark:border-white/[0.06] shadow-elevated relative overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent-teal/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-5xl mb-6">🎯</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-slate-900 dark:text-white">
                Ready to Discover Your Path?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg max-w-xl mx-auto leading-relaxed">
                Start with a quick assessment and let our AI build your personalized career guidance dashboard.
              </p>
              <Link
                href="/welcome"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-brand-400 to-accent-teal rounded-2xl font-bold text-lg text-white shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Your Journey
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative">
        {/* Gradient line at top */}
        <div className="h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-50" />
        <div className="bg-slate-900 dark:bg-[#080A14] border-t border-gray-200/10 dark:border-white/[0.06] py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-accent-teal flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-semibold text-white">Saarthi</span>
              <span className="text-slate-500 text-sm ml-2">— Your AI Academic Mentor</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 Saarthi. Built with ♥ by Saarthi team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}