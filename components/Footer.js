import Link from 'next/link';
import { Github, Twitter, Mail, Brain, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-12">
      {/* Gradient line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-50" />

      <div className="bg-slate-900 dark:bg-[#080A14] border-t border-gray-200/10 dark:border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            {/* Logo + tagline */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-accent-teal flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-white text-lg">Saarthi</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                Your AI-powered academic mentor for students in Class 1-10. Learn smarter, not harder.
              </p>
            </div>

            {/* Links */}
            <nav className="flex gap-8">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Platform</h4>
                <Link href="/elearn" className="block text-slate-500 hover:text-white transition-colors text-sm">eLearn</Link>
                <Link href="/uploads" className="block text-slate-500 hover:text-white transition-colors text-sm">Uploads</Link>
                <Link href="/welcome" className="block text-slate-500 hover:text-white transition-colors text-sm">Get Started</Link>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Company</h4>
                <Link href="/about" className="block text-slate-500 hover:text-white transition-colors text-sm">About</Link>
                <Link href="/contact" className="block text-slate-500 hover:text-white transition-colors text-sm">Contact</Link>
                <Link href="/privacy" className="block text-slate-500 hover:text-white transition-colors text-sm">Privacy</Link>
              </div>
            </nav>
          </div>

          {/* Bottom row */}
          <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} Saarthi — eLearn
            </p>
            <p className="text-slate-600 text-sm flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-accent-coral fill-accent-coral" /> by Saarthi team
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="GitHub" className="text-slate-600 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-slate-600 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <Link href="/contact" aria-label="Email" className="text-slate-600 hover:text-white transition-colors">
                <Mail size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
