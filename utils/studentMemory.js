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
  
  // Behavioral tracking (Phase 2)
  loginCount: 0,
  loginDates: [],           // ISO dates of each login
  goalAlignmentHistory: [], // { date, score, analysis }
  lastSkillTestDate: null,
  skillTestRequired: false,
  behaviorProfile: {
    consistency: 0,         // 0-100
    focusAlignment: 0,      // 0-100
    effortTrend: 'stable',  // 'increasing' | 'stable' | 'decreasing'
    daysTracked: 0,
  },
  
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

// ── Track Login (called on dashboard load) ────────────
export function trackLogin() {
  const mem = getMemory();
  const today = new Date().toISOString().split('T')[0];
  const loginDates = mem.loginDates || [];
  
  // Only count once per day
  if (loginDates[loginDates.length - 1] === today) return mem;
  
  const newLoginDates = [...loginDates, today].slice(-60);
  const loginCount = (mem.loginCount || 0) + 1;
  
  // Check if skill test is required (2nd login + no recent test)
  const needsTest = loginCount >= 2 && !mem.lastSkillTestDate;
  
  // Calculate goal alignment
  const alignment = calculateGoalAlignment(mem);
  const history = [...(mem.goalAlignmentHistory || []), { date: today, score: alignment.score, analysis: alignment.label }].slice(-30);
  
  // Calculate behavior profile
  const behaviorProfile = calculateBehaviorProfile(mem, newLoginDates, history);
  
  return updateMemory({
    loginCount,
    loginDates: newLoginDates,
    skillTestRequired: needsTest,
    goalAlignmentHistory: history,
    behaviorProfile,
  });
}

// ── Goal Alignment Calculator ─────────────────────────
export function calculateGoalAlignment(mem) {
  if (!mem) mem = getMemory();
  const goal = mem.careerGoal || mem.dreamCareer || '';
  if (!goal) return { score: 50, label: 'No goal set' };
  
  let score = 30; // base
  
  // Quiz activity in last 5 days?
  const fiveDaysAgo = Date.now() - 5 * 86400000;
  const recentQuizzes = (mem.quizHistory || []).filter(q => new Date(q.date).getTime() > fiveDaysAgo);
  if (recentQuizzes.length > 0) score += 15;
  if (recentQuizzes.length >= 3) score += 10;
  
  // Quiz performance
  const avgScore = recentQuizzes.length > 0
    ? recentQuizzes.reduce((a, q) => a + (q.percentage || 0), 0) / recentQuizzes.length
    : 0;
  if (avgScore >= 70) score += 15;
  else if (avgScore >= 50) score += 8;
  
  // Studying relevant subject?
  const favSubject = (mem.favoriteSubject || '').toLowerCase();
  const recentSubjects = recentQuizzes.map(q => (q.subject || '').toLowerCase());
  if (favSubject && recentSubjects.includes(favSubject)) score += 10;
  
  // Streak bonus
  const streak = getStudyStreak();
  if (streak >= 3) score += 10;
  else if (streak >= 1) score += 5;
  
  // Uploaded material recently?
  const recentUploads = (mem.recentActivity || []).filter(
    a => a.type === 'pdf_upload' && new Date(a.timestamp).getTime() > fiveDaysAgo
  );
  if (recentUploads.length > 0) score += 5;
  
  score = Math.min(100, Math.max(0, score));
  
  let label = 'Off Track';
  if (score >= 75) label = 'On Track';
  else if (score >= 50) label = 'Needs Focus';
  else if (score >= 30) label = 'Drifting';
  
  return { score, label };
}

// ── Behavior Profile Calculator ───────────────────────
function calculateBehaviorProfile(mem, loginDates, alignmentHistory) {
  const daysTracked = loginDates.length;
  
  // Consistency: how many of last 7 days had logins?
  const last7 = new Date();
  let activeDays = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(last7);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    if (loginDates.includes(ds)) activeDays++;
  }
  const consistency = Math.round((activeDays / 7) * 100);
  
  // Focus alignment: average of last 5 alignment scores
  const recent5 = (alignmentHistory || []).slice(-5);
  const focusAlignment = recent5.length > 0
    ? Math.round(recent5.reduce((a, h) => a + h.score, 0) / recent5.length)
    : 0;
  
  // Effort trend: compare last 3 scores vs previous 3
  let effortTrend = 'stable';
  if (recent5.length >= 4) {
    const recent = recent5.slice(-2).reduce((a, h) => a + h.score, 0) / 2;
    const earlier = recent5.slice(0, 2).reduce((a, h) => a + h.score, 0) / 2;
    if (recent > earlier + 5) effortTrend = 'increasing';
    else if (recent < earlier - 5) effortTrend = 'decreasing';
  }
  
  return { consistency, focusAlignment, effortTrend, daysTracked };
}

// ── Should Force Skill Test? ──────────────────────────
export function shouldForceSkillTest() {
  const mem = getMemory();
  // Force on 2nd+ login if never taken a skill test
  if ((mem.loginCount || 0) >= 2 && !mem.lastSkillTestDate) return true;
  // Also force if it's been more than 5 days since last test
  if (mem.lastSkillTestDate) {
    const daysSince = (Date.now() - new Date(mem.lastSkillTestDate).getTime()) / 86400000;
    if (daysSince >= 5 && (mem.loginCount || 0) >= 2) return true;
  }
  return false;
}

// ── Mark Skill Test Completed ─────────────────────────
export function markSkillTestCompleted() {
  return updateMemory({
    lastSkillTestDate: new Date().toISOString(),
    skillTestRequired: false,
  });
}
