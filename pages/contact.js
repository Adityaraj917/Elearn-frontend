import PageLayout from '../components/PageLayout';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <PageLayout motionKey="contact">
      <section className="container-wide py-12">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="max-w-2xl">
          <h1 className="text-3xl font-bold">Contact & Support</h1>
          <p className="prose-base mt-2">Have a question or feedback? Send us a message. No backend required — this is a demo form.</p>

          <form className="mt-6 grid gap-4 card p-6">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input className="input mt-1" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="input mt-1" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea className="input mt-1 h-32" placeholder="How can we help?" />
            </div>
            <button type="button" className="btn btn-primary w-fit">Send</button>
          </form>
        </motion.div>
      </section>
    </PageLayout>
  );
}
