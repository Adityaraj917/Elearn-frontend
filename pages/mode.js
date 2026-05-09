import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { LogIn, UserCircle, Sparkles } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function ModeSelection() {
  const router = useRouter();

  const handleGuest = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("saarthi_mode", "guest");
    }
    router.push("/onboarding");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen page-bg flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <Head>
        <title>Choose Your Path | Saarthi</title>
      </Head>

      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full orb-indigo blur-[80px]" />
        <div className="animated-orb-2 absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full orb-purple blur-[80px]" />
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-card p-10 text-center relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        <h2 className="text-3xl font-bold gradient-text mb-3">Choose Your Path</h2>
        <p className="text-secondary-themed mb-8">Experience Saarthi as a guest or sign in to save your progress forever.</p>
        
        <div className="flex flex-col gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            className="w-full py-4 text-lg font-bold bg-indigo-600 hover:bg-indigo-500 transition-all rounded-2xl flex items-center justify-center gap-3 text-white shadow-lg shadow-indigo-500/25"
          >
            <LogIn className="w-5 h-5" />
            Login / Sign Up
          </motion.button>
          
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px" style={{ background: 'rgba(var(--border-color), 0.5)' }} />
            <span className="text-muted-themed font-medium text-sm tracking-wider">OR</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(var(--border-color), 0.5)' }} />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGuest}
            className="btn-secondary w-full py-4 text-lg font-bold rounded-2xl flex items-center justify-center gap-3"
          >
            <UserCircle className="w-5 h-5" />
            Continue as Guest
          </motion.button>
        </div>

        <p className="mt-6 text-xs text-muted-themed">
          Guest data is stored locally and will be cleared when you close the browser.
        </p>
      </motion.div>
    </div>
  );
}
