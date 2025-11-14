import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, description, comingSoon = false }) {
  const Icon = icon;
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="card p-5 bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200/60 dark:border-slate-700/60"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-primary-600 via-accent-purple to-accent-teal text-white flex items-center justify-center shadow-soft">
          {Icon && <Icon size={20} />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            {comingSoon && <span className="badge">Coming Soon</span>}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
