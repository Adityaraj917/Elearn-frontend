import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Compass, Brain, Target, BookOpen, ChevronRight } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const features = [
  { icon: <Compass className="w-6 h-6" />, title: "Career Explorer", desc: "Discover 20+ career paths from Physics with real-world data, roadmaps, and eligibility details.", color: "from-cyan-500 to-blue-500" },
  { icon: <Brain className="w-6 h-6" />, title: "AI-Powered Insights", desc: "Dynamic skill assessments that identify your strengths and weaknesses.", color: "from-violet-500 to-purple-500" },
  { icon: <Target className="w-6 h-6" />, title: "Personalized Guidance", desc: "Get career recommendations aligned to your unique learning style and goals.", color: "from-rose-500 to-pink-500" },
  { icon: <BookOpen className="w-6 h-6" />, title: "Exam Zone", desc: "Upload study material, generate AI quizzes, get summaries, and chat with your documents.", color: "from-amber-500 to-orange-500" },
];

const floatingIcons = ["⚛️", "🔭", "🚀", "💡", "🧪", "📐", "🌌", "⚡"];

export default function LandingPage() {
  return (
    <div className="min-h-screen page-bg overflow-hidden">
      <Head>
        <title>Saarthi | Your AI Academic Career Guide</title>
        <meta name="description" content="Personalized career guidance for students in class 1-10. Explore career paths, take skill tests, and get AI-powered academic mentorship." />
      </Head>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="animated-orb absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full orb-indigo blur-[100px]" />
        <div className="animated-orb-2 absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full orb-cyan blur-[100px]" />
        <div className="animated-orb-3 absolute bottom-[10%] left-[40%] w-[450px] h-[450px] rounded-full orb-purple blur-[100px]" />
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              background: 'rgba(var(--glass-bg), var(--glass-opacity))',
              border: '1px solid rgba(var(--glow-color), 0.2)',
              color: '#818cf8',
            }}
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Academic Career Guide
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
            Your Future{" "}
            <span className="gradient-text">Starts Here</span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-secondary-themed max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Saarthi is your personal AI academic mentor for students in Class 1-10. 
            Explore career paths, discover your strengths, take skill assessments, 
            and get a personalized roadmap to your dream career.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/welcome" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-lg text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/welcome#features" 
              className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "20+", label: "Career Paths" },
              { value: "AI", label: "Powered Tests" },
              { value: "Free", label: "For Students" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-themed font-medium mt-1">{stat.label}</div>
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
            className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{ borderColor: 'rgba(var(--border-color), 0.5)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-secondary-themed max-w-2xl mx-auto text-lg">
              From career exploration to exam preparation, Saarthi covers every aspect of your academic journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                <p className="text-secondary-themed leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16"
          >
            <div className="text-5xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Discover Your Path?</h2>
            <p className="text-secondary-themed mb-8 text-lg max-w-xl mx-auto">
              Start with a quick assessment and let our AI build your personalized career guidance dashboard.
            </p>
            <Link 
              href="/welcome" 
              className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-lg text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Journey
              <ChevronRight className="w-5 h-5" />
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