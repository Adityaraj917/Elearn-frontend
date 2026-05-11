import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-pro ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-accent-teal flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-display font-bold bg-gradient-to-r from-brand-400 to-accent-teal bg-clip-text text-transparent">
            Saarthi — eLearn
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <ThemeToggle />
          <Link href="/" className="nav-link-pro">Home</Link>
          <Link href="/elearn" className="nav-link-pro">eLearn</Link>
          <Link href="/uploads" className="nav-link-pro">Uploads</Link>
        </nav>
      </div>
    </header>
  );
}
