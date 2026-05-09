/**
 * Student Memory Manager
 * 
 * Persistent shared memory that makes the AI feel like it "knows" the student.
 * Uses localStorage for MVP simplicity. Architecture ready for Firestore sync later.
 * 
 * Day 2: Added session timing tracking and study heatmap for adaptive insights.
 */

const MEMORY_KEY = 'saarthi_student_memory';

const DEFAULT_MEMORY = {
  // Identity
  name: '',
  studentClass: '',
  
  // Goals & interests
  careerGoal: '',
  interests: [],
  favoriteSubject: '',
  
  // Learning profile
  learningStyle: '',
  personalityType: '',
  strengths: [],
  weakSubjects: [],
  
  // Activity tracking
  uploadedSubjects: [],
  quizHistory: [],       // last 20 results: { subject, score, total, date, weakTopics }
  recentActivity: [],    // last 10 activities: { type, detail, timestamp }
  sessionDates: [],      // ISO date strings for streak calculation
  sessionTimings: [],    // last 30 activity hours: { hour, day, timestamp } for heatmap
  
  // Metadata
  onboardingCompleted: false,
  lastActiveAt: null,
  createdAt: null,
};

// ── Read ───────────────────────────────────────────────
export function getMemory() {
  if (typeof window === 'undefined') return { ...DEFAULT_MEMORY };
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    if (!raw) return { ...DEFAULT_MEMORY };
    return { ...DEFAULT_MEMORY, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_MEMORY };
  }
}

// ── Write (merge) ─────────────────────────────────────
export function updateMemory(partial) {
  if (typeof window === 'undefined') return;
  const current = getMemory();
  const merged = { ...current, ...partial, lastActiveAt: new Date().toISOString() };
  localStorage.setItem(MEMORY_KEY, JSON.stringify(merged));
  return merged;
}

// ── Initialize from onboarding ────────────────────────
export function initMemoryFromOnboarding(onboardingData, profileAnalysis) {
  const memory = {
    name: onboardingData.name || '',
    studentClass: onboardingData.class || '',
    favoriteSubject: onboardingData.favorite_subject || '',
    interests: [onboardingData.favorite_subject].filter(Boolean),
    learningStyle: profileAnalysis?.learningStyle || onboardingData.learning_style || '',
    personalityType: profileAnalysis?.personalityType || 'Explorer',
    strengths: profileAnalysis?.strengths || [],
    weakSubjects: profileAnalysis?.areasToExplore || [],
    careerGoal: onboardingData.dream_career || (profileAnalysis?.careerHints || [])[0] || '',
    dreamCareer: onboardingData.dream_career || '',
    onboardingCompleted: true,
    createdAt: new Date().toISOString(),
  };
  return updateMemory(memory);
}

// ── Record quiz/test result ───────────────────────────
export function recordQuizResult({ subject, score, total, weakTopics = [], strongTopics = [], source = 'quiz' }) {
  const mem = getMemory();
  
  const entry = {
    subject: subject || 'General',
    score,
    total,
    percentage: Math.round((score / total) * 100),
    weakTopics,
    strongTopics,
    source,
    date: new Date().toISOString(),
  };
  
  // Keep last 20
  const history = [entry, ...(mem.quizHistory || [])].slice(0, 20);
  
  // Update weak subjects from recent quiz results
  const allWeak = history.flatMap(q => q.weakTopics || []);
  const allStrong = history.flatMap(q => q.strongTopics || []);
  const weakFreq = countFrequency(allWeak);
  const strongFreq = countFrequency(allStrong);
  
  // Weak = appears in weak more than strong
  const weakSubjects = Object.keys(weakFreq)
    .filter(topic => (weakFreq[topic] || 0) > (strongFreq[topic] || 0))
    .slice(0, 5);
  
  const strengths = Object.keys(strongFreq)
    .filter(topic => (strongFreq[topic] || 0) >= (weakFreq[topic] || 0))
    .slice(0, 5);
  
  updateMemory({ quizHistory: history, weakSubjects, strengths });
  addActivity('quiz_complete', `${subject}: ${score}/${total} (${entry.percentage}%)`);
  recordSessionTiming();
  
  return entry;
}

// ── Record uploaded document ──────────────────────────
export function recordUpload(fileName, subject) {
  const mem = getMemory();
  const subjects = [...new Set([...(mem.uploadedSubjects || []), subject || 'General'])];
  updateMemory({ uploadedSubjects: subjects });
  addActivity('pdf_upload', fileName || 'Document');
  recordSessionTiming();
}

// ── Record activity ───────────────────────────────────
export function addActivity(type, detail) {
  const mem = getMemory();
  const entry = { type, detail, timestamp: new Date().toISOString() };
  const recent = [entry, ...(mem.recentActivity || [])].slice(0, 10);
  
  // Also record session date for streak
  const today = new Date().toISOString().split('T')[0];
  const dates = [...new Set([today, ...(mem.sessionDates || [])])].slice(0, 60);
  
  updateMemory({ recentActivity: recent, sessionDates: dates });
}

// ── Record session timing (hour of activity) ──────────
export function recordSessionTiming() {
  const mem = getMemory();
  const now = new Date();
  const entry = {
    hour: now.getHours(),
    day: now.toLocaleDateString('en-US', { weekday: 'short' }),
    timestamp: now.toISOString(),
  };
  const timings = [entry, ...(mem.sessionTimings || [])].slice(0, 50);
  updateMemory({ sessionTimings: timings });
}

// ── Study streak ──────────────────────────────────────
export function getStudyStreak() {
  const mem = getMemory();
  const dates = (mem.sessionDates || []).sort().reverse();
  if (dates.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < dates.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().split('T')[0];
    
    if (dates.includes(expectedStr)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// ── Study heatmap — which hours & days are most active ──
export function getStudyHeatmap() {
  const mem = getMemory();
  const timings = mem.sessionTimings || [];
  if (timings.length === 0) return { peakHour: null, peakDay: null, hourDist: {}, dayDist: {} };
  
  const hourDist = {};
  const dayDist = {};
  
  timings.forEach(t => {
    hourDist[t.hour] = (hourDist[t.hour] || 0) + 1;
    dayDist[t.day] = (dayDist[t.day] || 0) + 1;
  });
  
  const peakHour = Object.entries(hourDist).sort((a, b) => b[1] - a[1])[0]?.[0];
  const peakDay = Object.entries(dayDist).sort((a, b) => b[1] - a[1])[0]?.[0];
  
  return { peakHour: peakHour ? parseInt(peakHour) : null, peakDay, hourDist, dayDist };
}

// ── Generate context string for AI prompts ────────────
export function getMemoryContext() {
  const mem = getMemory();
  if (!mem.onboardingCompleted) return '';
  
  const parts = [];
  if (mem.name) parts.push(`Student Name: ${mem.name}`);
  if (mem.studentClass) parts.push(`Class: ${mem.studentClass}`);
  if (mem.careerGoal) parts.push(`Career Goal: ${mem.careerGoal}`);
  if (mem.favoriteSubject) parts.push(`Favorite Subject: ${mem.favoriteSubject}`);
  if (mem.learningStyle) parts.push(`Learning Style: ${mem.learningStyle}`);
  if (mem.personalityType) parts.push(`Personality: ${mem.personalityType}`);
  if (mem.strengths?.length) parts.push(`Strengths: ${mem.strengths.join(', ')}`);
  if (mem.weakSubjects?.length) parts.push(`Weak Areas: ${mem.weakSubjects.join(', ')}`);
  if (mem.interests?.length) parts.push(`Interests: ${mem.interests.join(', ')}`);
  if (mem.uploadedSubjects?.length) parts.push(`Subjects Studied: ${mem.uploadedSubjects.join(', ')}`);
  
  // Recent quiz performance summary
  const recent = (mem.quizHistory || []).slice(0, 5);
  if (recent.length > 0) {
    const avgScore = Math.round(recent.reduce((a, q) => a + q.percentage, 0) / recent.length);
    parts.push(`Recent Quiz Avg: ${avgScore}% (last ${recent.length} quizzes)`);
    
    const trend = recent.length >= 2
      ? recent[0].percentage > recent[1].percentage ? 'improving' : recent[0].percentage < recent[1].percentage ? 'declining' : 'stable'
      : 'just started';
    parts.push(`Performance Trend: ${trend}`);
  }
  
  const streak = getStudyStreak();
  if (streak > 0) parts.push(`Study Streak: ${streak} day${streak > 1 ? 's' : ''}`);
  
  // Study timing context
  const heatmap = getStudyHeatmap();
  if (heatmap.peakHour !== null) {
    const timeLabel = heatmap.peakHour < 12 ? 'morning' : heatmap.peakHour < 17 ? 'afternoon' : heatmap.peakHour < 21 ? 'evening' : 'late night';
    parts.push(`Most Active Study Time: ${timeLabel}`);
  }
  
  return parts.join('\n');
}

// ── Helpers ───────────────────────────────────────────
function countFrequency(arr) {
  const freq = {};
  arr.forEach(item => {
    if (item) freq[item] = (freq[item] || 0) + 1;
  });
  return freq;
}

// ── Last activity timestamp ───────────────────────────
export function getLastActivityTimestamp() {
  const mem = getMemory();
  const recent = (mem.recentActivity || [])[0];
  if (!recent?.timestamp) return null;
  const diff = Date.now() - new Date(recent.timestamp).getTime();
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

// ── Recent quiz delta (last vs previous) ──────────────
export function getRecentQuizDelta() {
  const mem = getMemory();
  const quizzes = mem.quizHistory || [];
  if (quizzes.length < 2) return null;
  const recent = quizzes[0];
  const previous = quizzes[1];
  return {
    subject: recent.subject,
    current: recent.percentage,
    previous: previous.percentage,
    delta: recent.percentage - previous.percentage,
    improved: recent.percentage > previous.percentage,
  };
}

// ── Clear (for logout) ────────────────────────────────
export function clearMemory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(MEMORY_KEY);
}
