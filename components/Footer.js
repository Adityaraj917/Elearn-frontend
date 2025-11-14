import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur">
      <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
        <div>© {new Date().getFullYear()} Saarthi — eLearn</div>
        <nav className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="GitHub" className="hover:text-slate-900 dark:hover:text-white"><Github size={18} /></a>
          <a href="#" aria-label="Twitter" className="hover:text-slate-900 dark:hover:text-white"><Twitter size={18} /></a>
          <Link href="/contact" aria-label="Email" className="hover:text-slate-900 dark:hover:text-white"><Mail size={18} /></Link>
        </div>
      </div>
    </footer>
  );
}
