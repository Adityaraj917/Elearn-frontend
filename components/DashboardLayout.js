import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebase/config";
import ThemeToggle from "./ThemeToggle";
import {
  BarChart3, Compass, BookOpen, Brain, TrendingUp,
  LogOut, Menu, X, Sparkles, ChevronRight
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: <BarChart3 className="w-5 h-5" /> },
  { id: "career", label: "Career Explorer", href: "/dashboard/career", icon: <Compass className="w-5 h-5" /> },
  { id: "exam-zone", label: "Exam Zone", href: "/dashboard/exam-zone", icon: <BookOpen className="w-5 h-5" /> },
  { id: "skill-test", label: "Skill Tests", href: "/dashboard/skill-test", icon: <Brain className="w-5 h-5" /> },
  { id: "insights", label: "Insights", href: "/dashboard/insights", icon: <TrendingUp className="w-5 h-5" /> },
];

export default function DashboardLayout({ children, pageTitle, pageDescription }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saarthi_profile");
      if (stored) setProfile(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    auth.signOut();
    if (typeof window !== "undefined") localStorage.clear();
    router.push("/");
  };

  const currentPath = router.pathname;

  return (
    <div className="min-h-screen page-bg">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-0 right-0 w-[500px] h-[500px] rounded-full orb-indigo blur-[120px]" />
        <div className="animated-orb-2 absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full orb-purple blur-[120px]" />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg heading-section" style={{ color: 'rgb(var(--text-primary))' }}>Saarthi</h1>
            <p className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>AI Learning Platform</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto md:hidden p-1">
            <X className="w-5 h-5" style={{ color: 'rgb(var(--text-muted))' }} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <p className="px-3 mb-2 text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgb(var(--text-dim))' }}>
            Main Menu
          </p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-link ${currentPath === item.href ? "active" : ""}`}
              >
                {item.icon}
                <span>{item.label}</span>
                {currentPath === item.href && (
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
              {profile?.name?.[0]?.toUpperCase() || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'rgb(var(--text-primary))' }}>
                {profile?.name || "Student"}
              </p>
              <p className="text-xs truncate" style={{ color: 'rgb(var(--text-muted))' }}>
                {profile?.class || "Explorer"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors" 
              style={{ color: 'rgb(var(--text-muted))' }}
              onMouseEnter={(e) => e.target.style.color = '#f87171'}
              onMouseLeave={(e) => e.target.style.color = 'rgb(var(--text-muted))'}
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-content relative z-10">
        {/* Top bar */}
        <header className="sticky top-0 z-20 px-6 py-4" style={{
          background: 'rgba(var(--bg-primary), 0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(var(--border-color), 0.15)'
        }}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
                <Menu className="w-5 h-5" />
              </button>
              <div>
                {pageTitle && (
                  <h2 className="text-xl font-bold heading-section" style={{ color: 'rgb(var(--text-primary))' }}>
                    {pageTitle}
                  </h2>
                )}
                {pageDescription && (
                  <p className="text-sm mt-0.5" style={{ color: 'rgb(var(--text-muted))' }}>
                    {pageDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
