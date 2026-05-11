import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#1A1D35] hover:bg-[#232747] text-amber-400 border border-white/[0.06] shadow-glow-sm'
          : 'bg-brand-50 hover:bg-brand-100 text-brand-600 border border-brand-200'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Sun className="w-[18px] h-[18px]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Moon className="w-[18px] h-[18px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
