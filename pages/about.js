import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <PageLayout motionKey="about">
      <section className="container-wide py-12">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="max-w-3xl">
          <h1 className="text-3xl font-bold">About Saarthi</h1>
          <p className="prose-base mt-3">
            SAARTHI is a modern learning companion. We help students summarize notes, generate quizzes, and study smarter. Our vision is to make high-quality, AI-assisted learning accessible to everyone.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold">Mission</h3>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">Reduce study friction and boost retention through AI-powered tools.</p>
            </div>
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold">Values</h3>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">Student-first, privacy-respecting, and relentlessly improving.</p>
            </div>
          </div>
        </motion.div>
      </section>
    </PageLayout>
  );
}
