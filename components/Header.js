import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-wide flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-lg bg-gradient-to-tr from-primary-600 via-accent-purple to-accent-teal p-0.5">
            <div className="h-full w-full rounded-md bg-white/90 flex items-center justify-center text-primary-700 font-extrabold">S</div>
          </div>
          <span className="text-lg font-semibold tracking-tight">Saarthi — eLearn</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/" className="btn btn-outline">Home</Link>
          <Link href="/elearn" className="btn btn-outline">eLearn</Link>
          <Link href="/uploads" className="btn btn-outline">Uploads</Link>
        </nav>
      </div>
    </header>
  );
}
