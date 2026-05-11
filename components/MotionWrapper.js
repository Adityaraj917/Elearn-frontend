import { motion, AnimatePresence } from 'framer-motion';

export default function MotionWrapper({ children, keyProp }) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={keyProp}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="min-h-[70vh]"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
