import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Sparkles, Zap, Brain, Rocket } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <PageLayout motionKey="home">
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container-wide relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-4 mx-auto border border-purple-200 dark:border-purple-800">
              <Sparkles size={16} /> New: AI Quiz Generator
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight tight-line-height">
              <span className="block text-slate-800 dark:text-white">Master Your Studies</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
                With Saarthi AI
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Upload notes and instantly get <span className="font-semibold text-purple-600 dark:text-purple-400">Summaries</span>, <span className="font-semibold text-blue-600 dark:text-blue-400">Quizzes</span>, and <span className="font-semibold text-pink-600 dark:text-pink-400">Interactive Chat</span>. The ultimate AI study companion.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mt-8">
              <Link href="/elearn" className="group btn bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                Get Started <Rocket size={20} className="group-hover:rotate-12 transition-transform" />
              </Link>
              <Link href="/features" className="btn bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-bold shadow-sm hover:shadow-md transition-all">
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container-wide py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to excel</h2>
          <p className="text-slate-600 dark:text-slate-400">Powerful tools designed for the modern student.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={BookOpen}
            title="Smart Summarizer"
            description="Condense 100-page PDFs into key insights and detailed bullet points in seconds."
            color="purple"
          />
          <FeatureCard
            icon={Zap}
            title="Instant Quizzes"
            description="Test your knowledge with AI-generated MCQs. Track your score and learn from mistakes."
            color="blue"
          />
          <FeatureCard
            icon={Brain}
            title="AI Tutor Chat"
            description="Ask questions about your documents in Hindi, English, or Hinglish. It's like having a 24/7 tutor."
            color="pink"
          />
        </div>
      </section>

      <section className="container-wide py-12 mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to upgrade your learning?</h2>
            <p className="text-purple-100 text-lg mb-8">Join thousands of students using Saarthi to study smarter, not harder.</p>
            <Link href="/elearn" className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-50 transition-colors">
              Try Saarthi for Free
            </Link>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
      </section>
    </PageLayout>
  );
}
