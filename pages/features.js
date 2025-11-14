import PageLayout from '../components/PageLayout';
import FeatureCard from '../components/FeatureCard';
import { BookOpen, Layers, Sparkles, FileText, SlidersHorizontal, Bot } from 'lucide-react';

export default function FeaturesPage() {
  const items = [
    { icon: BookOpen, title: 'eLearn Summarizer', description: 'Summarize notes with key points and detailed context.', comingSoon: false },
    { icon: Layers, title: 'Quiz Generator', description: 'Generate MCQs with reveal answers and exports.', comingSoon: false },
    { icon: FileText, title: 'Flashcards', description: 'Turn notes into smart flashcards.', comingSoon: true },
    { icon: SlidersHorizontal, title: 'Study Planner', description: 'Plan and track sessions with reminders.', comingSoon: true },
    { icon: Bot, title: 'Study Copilot', description: 'Chat with your notes for guidance.', comingSoon: true },
    { icon: Sparkles, title: 'Smart Insights', description: 'Topics to focus on, auto-recaps, more.', comingSoon: true },
  ];

  return (
    <PageLayout motionKey="features">
      <section className="container-wide py-12">
        <h1 className="text-3xl font-bold">Features</h1>
        <p className="prose-base mt-2">Here’s what we offer today and what’s coming soon.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {items.map((it, i) => (
            <FeatureCard key={i} icon={it.icon} title={it.title} description={it.description} comingSoon={it.comingSoon} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
