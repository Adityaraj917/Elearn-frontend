import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Sparkles, Mail } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  return (
    <PageLayout motionKey="home">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="container-wide py-16 relative">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-accent-purple to-accent-teal">
              SAARTHI — Learn faster with AI
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Summarize notes, generate quizzes, and study smarter. A beautiful, modern learning companion.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/elearn" className="btn btn-primary hover-lift">Start eLearn</Link>
              <Link href="/features" className="btn btn-outline hover-lift">Explore Features</Link>
              <Link href="/contact" className="btn btn-outline hover-lift">Contact</Link>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <FeatureCard icon={BookOpen} title="Summarizer" description="Key points and detailed summaries for rapid revision." />
            <FeatureCard icon={Layers} title="Quiz Generator" description="MCQs with reveal answers, export JSON/CSV." />
            <FeatureCard icon={Sparkles} title="Agentic UI" description="Smooth step-by-step AI workflow with animations." />
          </div>
        </div>
      </section>

      <section className="container-wide py-12">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold">Why SAARTHI?</h2>
            <p className="prose-base mt-2">We built SAARTHI to help students save time and retain more. Upload your study material and let AI assist with concise summaries and practice quizzes.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold">Ready to try?</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Jump into the eLearn section to upload your notes and begin.</p>
            <Link href="/elearn" className="btn btn-primary mt-4 inline-flex items-center gap-2"><BookOpen size={16}/> Go to eLearn</Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
