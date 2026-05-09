import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getMemory, updateMemory, initMemoryFromOnboarding } from '../utils/studentMemory';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [mode, setMode] = useState(null); // 'guest' | 'login' | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedMode = localStorage.getItem('saarthi_mode');
    setMode(storedMode);

    if (storedMode === 'guest') {
      const storedProfile = localStorage.getItem('saarthi_profile');
      if (storedProfile) {
        try {
          const parsed = JSON.parse(storedProfile);
          setProfile(parsed);
          // Ensure memory is hydrated for guest
          const mem = getMemory();
          if (!mem.onboardingCompleted && parsed.profileAnalysis) {
            initMemoryFromOnboarding(parsed, parsed.profileAnalysis);
          }
        } catch(e) {}
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfile(data.onboardingData || null);
            // Hydrate memory from Firestore profile if needed
            const mem = getMemory();
            if (!mem.onboardingCompleted && data.onboardingData?.profileAnalysis) {
              initMemoryFromOnboarding(data.onboardingData, data.onboardingData.profileAnalysis);
            }
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    if (mode === 'guest' && typeof window !== 'undefined') {
      localStorage.setItem('saarthi_profile', JSON.stringify(newProfile));
    }
  };

  const getUserId = () => {
    if (user) return user.uid;
    if (typeof window !== 'undefined') {
      let gid = localStorage.getItem('saarthi_guest_id');
      if (!gid) {
        gid = 'guest_' + Date.now();
        localStorage.setItem('saarthi_guest_id', gid);
      }
      return gid;
    }
    return 'guest';
  };

  const isGuest = mode === 'guest';

  return (
    <AuthContext.Provider value={{ user, profile, mode, loading, isGuest, getUserId, updateProfile, setMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
