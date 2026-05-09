import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (typeof window !== "undefined") localStorage.removeItem("saarthi_mode");
        if (userDoc.exists() && userDoc.data().onboardingData) {
          router.push("/dashboard");
        } else {
          router.push("/onboarding");
        }
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { email: user.email, createdAt: new Date(), mode: "login", onboardingData: null });
        if (typeof window !== "undefined") localStorage.removeItem("saarthi_mode");
        router.push("/onboarding");
      }
    } catch (err) {
      console.error(err);
      const msg = err.message?.includes("invalid-credential") ? "Invalid email or password" 
        : err.message?.includes("email-already") ? "Email already in use" 
        : err.message?.includes("weak-password") ? "Password must be at least 6 characters"
        : err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen page-bg flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <Head>
        <title>{isLogin ? "Login" : "Sign Up"} | Saarthi</title>
      </Head>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-[15%] left-[15%] w-[400px] h-[400px] rounded-full orb-indigo blur-[80px]" />
        <div className="animated-orb-2 absolute bottom-[15%] right-[15%] w-[350px] h-[350px] rounded-full orb-cyan blur-[80px]" />
      </div>

      {/* Theme toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link href="/mode" className="btn-ghost flex items-center gap-2 mb-6 text-sm inline-flex">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              {isLogin ? <LogIn className="w-7 h-7 text-white" /> : <UserPlus className="w-7 h-7 text-white" />}
            </div>
            <h2 className="text-2xl font-bold">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-secondary-themed text-sm mt-1">
              {isLogin ? "Sign in to continue your journey" : "Start your personalized career journey"}
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-themed mb-1.5">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-dark" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-themed mb-1.5">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input-dark" placeholder="••••••••" minLength={6} />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Please wait...</>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-secondary-themed text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="text-indigo-400 hover:underline font-medium">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
