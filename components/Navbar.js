import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { Brain, Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/welcome', label: 'About' },
  { href: '/welcome#features', label: 'Features' },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-pro ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-accent-teal flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold bg-gradient-to-r from-brand-400 to-accent-teal bg-clip-text text-transparent">
              Saarthi
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-pro ${router.pathname === link.href ? 'text-brand-400' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/welcome"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-400 to-accent-teal rounded-xl font-semibold text-sm text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-gray-200/50 dark:border-white/[0.06]"
          >
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/welcome"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3 mt-2 bg-gradient-to-r from-brand-400 to-accent-teal rounded-xl font-semibold text-sm text-white"
              >
                Get Started Free
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
