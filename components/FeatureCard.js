import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, description, comingSoon = false }) {
  const Icon = icon;
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-[#131627] rounded-3xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300 group"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-400 to-accent-teal text-white flex items-center justify-center shadow-lg">
          {Icon && <Icon size={20} />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-slate-800 dark:text-white group-hover:text-brand-400 transition-colors">{title}</h3>
            {comingSoon && <span className="badge badge-primary">Coming Soon</span>}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
