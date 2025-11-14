import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { BookOpen, Home, Layers, Info, Mail } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur">
      <div className="container-wide flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 rounded-lg p-0.5 bg-gradient-to-tr from-primary-600 via-accent-purple to-accent-teal shadow-md">
            <div className="h-full w-full rounded-md bg-white/90 dark:bg-slate-800/80 flex items-center justify-center text-primary-700 dark:text-primary-300 font-extrabold">S</div>
          </div>
          <span className="text-lg font-semibold tracking-tight group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">Saarthi</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/" className="btn btn-outline flex items-center gap-2"><Home size={16}/> Home</Link>
          <Link href="/about" className="btn btn-outline flex items-center gap-2"><Info size={16}/> About</Link>
          <Link href="/features" className="btn btn-outline flex items-center gap-2"><Layers size={16}/> Features</Link>
          <Link href="/elearn" className="btn btn-outline flex items-center gap-2"><BookOpen size={16}/> eLearn</Link>
          <Link href="/contact" className="btn btn-outline flex items-center gap-2"><Mail size={16}/> Contact</Link>
          <div className="ml-2"><ThemeToggle /></div>
        </nav>
      </div>
    </header>
  );
}
