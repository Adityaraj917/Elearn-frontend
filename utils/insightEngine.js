/**
 * Behavior Insight Engine
 * 
 * Client-side analytics that generates adaptive insights from student memory.
 * No API calls needed — everything computed from localStorage data.
 * 
 * Day 2: Added mentor insights, project recommendations, productivity patterns,
 *         and richer contextual mentor messages.
 */

import { getMemory, getStudyStreak, getStudyHeatmap } from './studentMemory';

// ── Main insight generator ────────────────────────────
export function generateInsights() {
  const mem = getMemory();
  const streak = getStudyStreak();
  const heatmap = getStudyHeatmap();
  const quizzes = mem.quizHistory || [];
  const activities = mem.recentActivity || [];
  const sessions = mem.sessionDates || [];

  return {
    streak,
    heatmap,
    quizStats: computeQuizStats(quizzes),
    studyTiming: detectStudyTiming(activities, heatmap),
    consistency: computeConsistency(sessions),
    weakTopics: detectWeakTopics(quizzes),
    mostStudied: computeMostStudiedSubjects(quizzes, mem),
    productivityPatterns: detectProductivityPatterns(heatmap, quizzes, activities),
    recommendations: generateRecommendations(mem, quizzes, streak),
    mentorMessage: generateMentorMessage(mem, quizzes, streak, heatmap),
    mentorInsights: generateMentorInsights(mem, quizzes, streak, heatmap, activities),
    projectRecommendations: generateProjectRecommendations(mem),
  };
}

// ── Quiz statistics ───────────────────────────────────
function computeQuizStats(quizzes) {
  if (quizzes.length === 0) {
    return { totalTests: 0, avgScore: 0, trend: 'none', bestSubject: null, improvementRate: 0 };
  }

  const avgScore = Math.round(quizzes.reduce((a, q) => a + (q.percentage || 0), 0) / quizzes.length);

  // Trend: compare first half vs second half
  let trend = 'stable';
  if (quizzes.length >= 3) {
    const mid = Math.floor(quizzes.length / 2);
    const recentAvg = quizzes.slice(0, mid).reduce((a, q) => a + (q.percentage || 0), 0) / mid;
    const olderAvg = quizzes.slice(mid).reduce((a, q) => a + (q.percentage || 0), 0) / (quizzes.length - mid);
    if (recentAvg > olderAvg + 5) trend = 'improving';
    else if (recentAvg < olderAvg - 5) trend = 'declining';
  }

  // Best subject
  const subjectScores = {};
  const subjectCounts = {};
  quizzes.forEach(q => {
    const s = q.subject || 'General';
    subjectScores[s] = (subjectScores[s] || 0) + (q.percentage || 0);
    subjectCounts[s] = (subjectCounts[s] || 0) + 1;
  });
  let bestSubject = null;
  let bestAvg = 0;
  Object.keys(subjectScores).forEach(s => {
    const avg = subjectScores[s] / subjectCounts[s];
    if (avg > bestAvg) { bestAvg = avg; bestSubject = s; }
  });

  // Worst subject
  let worstSubject = null;
  let worstAvg = 100;
  Object.keys(subjectScores).forEach(s => {
    const avg = subjectScores[s] / subjectCounts[s];
    if (avg < worstAvg) { worstAvg = avg; worstSubject = s; }
  });

  // Improvement rate (last quiz vs first quiz)
  const improvementRate = quizzes.length >= 2
    ? (quizzes[0].percentage || 0) - (quizzes[quizzes.length - 1].percentage || 0)
    : 0;

  return {
    totalTests: quizzes.length,
    avgScore,
    trend,
    bestSubject,
    bestAvgScore: Math.round(bestAvg),
    worstSubject,
    worstAvgScore: Math.round(worstAvg),
    improvementRate,
    subjectCounts,
  };
}

// ── Study timing detection ────────────────────────────
function detectStudyTiming(activities, heatmap) {
  if (activities.length === 0 && !heatmap?.peakHour) return { preferred: 'Not enough data', distribution: {} };

  const buckets = { morning: 0, afternoon: 0, evening: 0, night: 0 };

  activities.forEach(a => {
    if (!a.timestamp) return;
    const hour = new Date(a.timestamp).getHours();
    if (hour >= 5 && hour < 12) buckets.morning++;
    else if (hour >= 12 && hour < 17) buckets.afternoon++;
    else if (hour >= 17 && hour < 21) buckets.evening++;
    else buckets.night++;
  });

  // Also factor in heatmap data
  if (heatmap?.hourDist) {
    Object.entries(heatmap.hourDist).forEach(([h, count]) => {
      const hour = parseInt(h);
      if (hour >= 5 && hour < 12) buckets.morning += count;
      else if (hour >= 12 && hour < 17) buckets.afternoon += count;
      else if (hour >= 17 && hour < 21) buckets.evening += count;
      else buckets.night += count;
    });
  }

  const preferred = Object.entries(buckets).sort((a, b) => b[1] - a[1])[0][0];

  const labels = { morning: '🌅 Morning Learner', afternoon: '☀️ Afternoon Learner', evening: '🌆 Evening Learner', night: '🌙 Night Owl' };

  return { preferred: labels[preferred] || preferred, distribution: buckets, peakPeriod: preferred };
}

// ── Consistency score ─────────────────────────────────
function computeConsistency(sessionDates) {
  if (sessionDates.length <= 1) return { score: 0, label: 'Just getting started' };

  const sorted = sessionDates.sort();
  const totalDays = Math.max(1,
    Math.ceil((new Date(sorted[sorted.length - 1]) - new Date(sorted[0])) / (1000 * 60 * 60 * 24)) + 1
  );

  const uniqueDays = new Set(sorted).size;
  const ratio = Math.round((uniqueDays / totalDays) * 100);

  let label = 'Needs more consistency';
  if (ratio >= 80) label = 'Excellent consistency! 🔥';
  else if (ratio >= 60) label = 'Good consistency 👍';
  else if (ratio >= 40) label = 'Building a habit 📈';

  return { score: ratio, label, activeDays: uniqueDays, totalDays };
}

// ── Weak topic detection ──────────────────────────────
function detectWeakTopics(quizzes) {
  const topicScores = {};
  const topicCounts = {};

  quizzes.forEach(q => {
    (q.weakTopics || []).forEach(t => {
      topicScores[t] = (topicScores[t] || 0) + 1;
    });
    (q.strongTopics || []).forEach(t => {
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
  });

  // Topics that appear in weak more than strong
  return Object.entries(topicScores)
    .filter(([topic, count]) => count > (topicCounts[topic] || 0))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic, count]) => ({ topic, frequency: count }));
}

// ── Most studied subjects ─────────────────────────────
function computeMostStudiedSubjects(quizzes, mem) {
  const subjectFreq = {};
  
  quizzes.forEach(q => {
    const s = q.subject || 'General';
    subjectFreq[s] = (subjectFreq[s] || 0) + 1;
  });
  
  (mem.uploadedSubjects || []).forEach(s => {
    subjectFreq[s] = (subjectFreq[s] || 0) + 2; // Uploads weigh more
  });
  
  return Object.entries(subjectFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([subject, count]) => ({ subject, activity: count }));
}

// ── Productivity patterns ─────────────────────────────
function detectProductivityPatterns(heatmap, quizzes, activities) {
  const patterns = [];
  
  if (heatmap?.peakHour !== null && heatmap?.peakHour !== undefined) {
    const h = heatmap.peakHour;
    const timeLabel = h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 21 ? 'evening' : 'late night';
    patterns.push({ type: 'peak_time', label: `Most active during ${timeLabel} hours`, icon: '⏰' });
  }
  
  if (heatmap?.peakDay) {
    patterns.push({ type: 'peak_day', label: `${heatmap.peakDay} is your most active study day`, icon: '📅' });
  }
  
  // Quiz performance by time of day
  if (quizzes.length >= 3) {
    const earlyQuizzes = quizzes.filter(q => {
      const h = new Date(q.date).getHours();
      return h >= 5 && h < 14;
    });
    const lateQuizzes = quizzes.filter(q => {
      const h = new Date(q.date).getHours();
      return h >= 17;
    });
    
    if (earlyQuizzes.length >= 2 && lateQuizzes.length >= 2) {
      const earlyAvg = earlyQuizzes.reduce((a, q) => a + (q.percentage || 0), 0) / earlyQuizzes.length;
      const lateAvg = lateQuizzes.reduce((a, q) => a + (q.percentage || 0), 0) / lateQuizzes.length;
      
      if (lateAvg > earlyAvg + 10) {
        patterns.push({ type: 'evening_better', label: 'Evening sessions show better quiz scores', icon: '🌙' });
      } else if (earlyAvg > lateAvg + 10) {
        patterns.push({ type: 'morning_better', label: 'Morning study sessions yield better results', icon: '🌅' });
      }
    }
  }
  
  // Activity burst detection
  if (activities.length >= 3) {
    const last3Days = activities.filter(a => {
      const diff = Date.now() - new Date(a.timestamp).getTime();
      return diff < 3 * 24 * 60 * 60 * 1000;
    });
    if (last3Days.length >= 5) {
      patterns.push({ type: 'active_burst', label: 'High activity in the last 3 days — momentum is building!', icon: '🚀' });
    }
  }
  
  return patterns;
}

// ── Adaptive recommendations ──────────────────────────
function generateRecommendations(mem, quizzes, streak) {
  const recs = [];

  // Streak-based
  if (streak === 0) {
    recs.push({ icon: '🔥', text: 'Start your study streak today! Even 15 minutes counts.' });
  } else if (streak >= 7) {
    recs.push({ icon: '🏆', text: `Amazing ${streak}-day streak! You're building a powerful habit.` });
  } else if (streak >= 3) {
    recs.push({ icon: '💪', text: `${streak}-day streak! Keep the momentum going.` });
  }

  // Quiz-based
  if (quizzes.length === 0) {
    recs.push({ icon: '📝', text: 'Take your first quiz to unlock personalized insights.' });
  } else {
    const recent = quizzes[0];
    if (recent && recent.percentage < 50) {
      recs.push({ icon: '📖', text: `Review ${recent.subject || 'your recent topic'} — your last score was ${recent.percentage}%. A focused revision session could make a big difference.` });
    }
    if (recent && recent.percentage >= 80) {
      recs.push({ icon: '⭐', text: `Great score in ${recent.subject || 'your last quiz'}! Try a harder difficulty to challenge yourself.` });
    }
  }

  // Weak subjects
  if (mem.weakSubjects?.length > 0) {
    recs.push({ icon: '🎯', text: `Focus on: ${mem.weakSubjects.slice(0, 2).join(', ')}. Upload notes or take a skill test in these areas.` });
  }

  // Upload suggestion
  if ((mem.uploadedSubjects || []).length === 0) {
    recs.push({ icon: '📄', text: 'Upload your study material to unlock AI-powered summaries and quizzes.' });
  }

  // Career hint
  if (mem.careerGoal) {
    recs.push({ icon: '🚀', text: `Explore the ${mem.careerGoal} career path to understand what skills you need.` });
  }

  return recs.slice(0, 4); // Max 4 recommendations
}

// ── AI Mentor Insights (Day 2) ────────────────────────
// Generates 2-3 highly contextual, data-driven insight cards
export function generateMentorInsights(mem, quizzes, streak, heatmap, activities) {
  // Allow calling without arguments (will fetch from memory)
  if (!mem) {
    mem = getMemory();
    quizzes = mem.quizHistory || [];
    streak = getStudyStreak();
    heatmap = getStudyHeatmap();
    activities = mem.recentActivity || [];
  }

  const insights = [];
  const quizStats = computeQuizStats(quizzes);

  // 1. Learning style insight (quiz vs reading)
  const quizCount = activities.filter(a => a.type === 'quiz_complete' || a.type === 'skill_test_complete').length;
  const uploadCount = activities.filter(a => a.type === 'pdf_upload').length;
  if (quizCount >= 2 && uploadCount >= 1) {
    if (quizCount > uploadCount * 2) {
      insights.push({
        icon: '🧪',
        title: 'Quiz-Based Learner',
        text: 'You retain concepts better through quizzes than long reading sessions. Keep testing yourself!',
        color: 'indigo',
      });
    } else if (uploadCount >= quizCount) {
      insights.push({
        icon: '📚',
        title: 'Deep Reader',
        text: 'You engage deeply with study material. Try more quizzes to reinforce what you read.',
        color: 'cyan',
      });
    }
  }

  // 2. Best subject improvement
  if (quizStats.bestSubject && quizStats.totalTests >= 2) {
    insights.push({
      icon: '📈',
      title: `Strong in ${quizStats.bestSubject}`,
      text: `Your strongest performance is in ${quizStats.bestSubject} with ${quizStats.bestAvgScore}% average. This aligns well with your goals.`,
      color: 'emerald',
    });
  }

  // 3. Study timing insight
  if (heatmap?.peakHour !== null && heatmap?.peakHour !== undefined) {
    const h = heatmap.peakHour;
    const timeLabel = h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 21 ? 'evening' : 'late night';
    const emoji = h < 12 ? '🌅' : h < 17 ? '☀️' : h < 21 ? '🌆' : '🌙';
    insights.push({
      icon: emoji,
      title: `${timeLabel.charAt(0).toUpperCase() + timeLabel.slice(1)} Learner`,
      text: `Your ${timeLabel} sessions appear most productive. Schedule challenging topics during this window.`,
      color: 'purple',
    });
  }

  // 4. Streak milestone
  if (streak >= 5) {
    insights.push({
      icon: '🔥',
      title: `${streak}-Day Streak`,
      text: `Consistency is your superpower right now. Research shows habits solidify around 21 days — you're ${Math.min(streak, 21)}/21 there.`,
      color: 'orange',
    });
  }

  // 5. Weak area recurring
  if (mem.weakSubjects?.length > 0 && quizzes.length >= 3) {
    const weakest = mem.weakSubjects[0];
    insights.push({
      icon: '🎯',
      title: `Focus: ${weakest}`,
      text: `${weakest} keeps appearing in your weak areas. A short targeted revision could improve retention significantly.`,
      color: 'amber',
    });
  }

  // 6. Trend insight
  if (quizStats.trend === 'improving' && quizStats.improvementRate > 0) {
    insights.push({
      icon: '🚀',
      title: 'Upward Trajectory',
      text: `Your scores have improved by ${quizStats.improvementRate}% since you started. Keep this momentum going!`,
      color: 'emerald',
    });
  } else if (quizStats.trend === 'declining' && quizStats.totalTests >= 3) {
    insights.push({
      icon: '💡',
      title: 'Course Correction',
      text: 'Recent scores show a dip. Consider revisiting fundamentals before tackling harder problems.',
      color: 'amber',
    });
  }

  // Return max 3 insights, prioritized
  return insights.slice(0, 3);
}

// ── Project Recommendations (Day 3 Enhanced) ──────────
export function generateProjectRecommendations(mem) {
  if (!mem) mem = getMemory();
  
  const interests = mem.interests || [];
  const careerGoal = mem.careerGoal || '';
  const strengths = mem.strengths || [];
  const favoriteSubject = mem.favoriteSubject || '';
  const uploadedSubjects = mem.uploadedSubjects || [];
  const quizzes = mem.quizHistory || [];
  
  // Subject-based project ideas
  const projectBank = {
    'Physics': [
      { title: 'Physics Simulation Lab', desc: 'Build interactive simulations for Newton\'s Laws and projectile motion', difficulty: 'Intermediate', tools: 'Python, Pygame', icon: '⚡' },
      { title: 'Smart Energy Monitor', desc: 'Track and visualize electricity usage patterns at home', difficulty: 'Beginner', tools: 'Arduino, Sensors', icon: '🔋' },
    ],
    'Mathematics': [
      { title: 'Math Visualizer', desc: 'Create animated graphs that explain calculus concepts visually', difficulty: 'Intermediate', tools: 'JavaScript, D3.js', icon: '📊' },
      { title: 'Equation Solver Bot', desc: 'Build a chatbot that solves and explains math step-by-step', difficulty: 'Beginner', tools: 'Python, Streamlit', icon: '🤖' },
    ],
    'Computer Science': [
      { title: 'AI Flashcard Generator', desc: 'Auto-generate study flashcards from your notes using AI', difficulty: 'Intermediate', tools: 'React, Gemini API', icon: '🃏' },
      { title: 'Quiz Analytics Dashboard', desc: 'Visualize your learning patterns and predict optimal study times', difficulty: 'Beginner', tools: 'HTML, Chart.js', icon: '📈' },
    ],
    'Chemistry': [
      { title: 'Molecule 3D Viewer', desc: 'Interactive 3D molecular structure visualizer for organic chemistry', difficulty: 'Intermediate', tools: 'Three.js, WebGL', icon: '🧬' },
      { title: 'Periodic Table Explorer', desc: 'Build a dynamic periodic table with element properties and trends', difficulty: 'Beginner', tools: 'HTML, CSS, JS', icon: '⚗️' },
    ],
    'Biology': [
      { title: 'Ecosystem Simulator', desc: 'Simulate predator-prey dynamics in a virtual ecosystem', difficulty: 'Intermediate', tools: 'Python, Matplotlib', icon: '🌿' },
      { title: 'Body Systems Guide', desc: 'Interactive human body explorer with organ system breakdowns', difficulty: 'Beginner', tools: 'HTML, SVG, JS', icon: '🫀' },
    ],
  };
  
  // Universal projects
  const universalProjects = [
    { title: 'AI Study Planner', desc: 'Personal study scheduler that adapts to your productivity patterns', difficulty: 'Intermediate', tools: 'React, AI API', icon: '📅' },
    { title: 'Resume Builder', desc: 'Smart resume generator that highlights your strengths and projects', difficulty: 'Beginner', tools: 'HTML, CSS, JS', icon: '📄' },
    { title: 'Habit Tracker App', desc: 'Track daily study habits and visualize your consistency streaks', difficulty: 'Beginner', tools: 'React, localStorage', icon: '✅' },
  ];
  
  const projects = [];
  const relevantSubjects = [favoriteSubject, ...interests, ...uploadedSubjects].filter(Boolean);
  const addedTitles = new Set();
  
  relevantSubjects.forEach(subject => {
    const subjectProjects = projectBank[subject] || [];
    subjectProjects.forEach(p => {
      if (!addedTitles.has(p.title)) {
        projects.push({ ...p, subject, whyItFits: generateProjectFitReason(p, subject, mem), learningPath: `Start learning ${p.tools.split(',')[0].trim()}` });
        addedTitles.add(p.title);
      }
    });
  });
  
  // Career-aligned projects
  if (careerGoal) {
    const careerLower = careerGoal.toLowerCase();
    if ((careerLower.includes('engineer') || careerLower.includes('tech')) && !addedTitles.has('AI Flashcard Generator')) {
      const p = projectBank['Computer Science'][0];
      projects.push({ ...p, subject: 'Tech', whyItFits: `Aligns with your ${careerGoal} ambitions and builds real tech skills.`, learningPath: 'Start learning React' });
    }
    if ((careerLower.includes('doctor') || careerLower.includes('medical')) && !addedTitles.has('Body Systems Guide')) {
      const p = (projectBank['Biology'] || [])[1];
      if (p) projects.push({ ...p, subject: 'Medical', whyItFits: `Builds foundational anatomy knowledge critical for ${careerGoal}.`, learningPath: 'Start learning HTML & SVG' });
    }
  }
  
  // Fill with universal projects if needed
  universalProjects.forEach(p => {
    if (projects.length < 4 && !addedTitles.has(p.title)) {
      projects.push({ ...p, subject: 'General', whyItFits: generateProjectFitReason(p, 'General', mem), learningPath: `Start learning ${p.tools.split(',')[0].trim()}` });
      addedTitles.add(p.title);
    }
  });
  
  return projects.slice(0, 4);
}

// ── Generate personalized "Why this project fits you" (Day 3) ──
function generateProjectFitReason(project, subject, mem) {
  const careerGoal = mem.careerGoal || '';
  const favoriteSubject = mem.favoriteSubject || '';
  const strengths = mem.strengths || [];
  
  // Career-connected
  if (careerGoal && subject !== 'General') {
    return `Fits your growing interest in ${subject} and builds skills relevant to ${careerGoal}.`;
  }
  // Subject passion
  if (subject === favoriteSubject) {
    return `Matches your passion for ${favoriteSubject} and turns concepts into hands-on skills.`;
  }
  // Strength-connected
  if (strengths.length > 0) {
    return `Leverages your strength in ${strengths[0]} with practical, portfolio-worthy output.`;
  }
  // Uploaded content
  if ((mem.uploadedSubjects || []).includes(subject)) {
    return `Connects to topics you've been studying recently for deeper understanding.`;
  }
  // Generic but warm
  return `Builds real-world skills and creates something you can showcase in your portfolio.`;
}

// ══════════════════════════════════════════════════════
// DAY 3: ADAPTIVE WOW INSIGHT — Demo Emotional Centerpiece
// ══════════════════════════════════════════════════════

/**
 * Generates a memorable, concise adaptive mentor insight.
 * Called after quiz completion, PDF upload, or on dashboard.
 * Returns { title, insight, suggestions[] }
 */
export function generateAdaptiveWowInsight(context = {}) {
  const mem = getMemory();
  const quizzes = mem.quizHistory || [];
  const streak = getStudyStreak();
  const heatmap = getStudyHeatmap();
  const activities = mem.recentActivity || [];
  const uploadCount = activities.filter(a => a.type === 'pdf_upload').length;
  const quizCount = activities.filter(a => a.type === 'quiz_complete' || a.type === 'skill_test_complete').length;
  
  const parts = [];
  const suggestions = [];
  
  // 1. Quiz performance pattern
  if (quizzes.length >= 2) {
    const recent = quizzes[0];
    const previous = quizzes.find(q => q.subject === recent.subject && q !== recent);
    if (previous) {
      const diff = recent.percentage - previous.percentage;
      if (diff > 0) {
        parts.push(`You improved by ${diff}% in ${recent.subject} compared to your previous attempt.`);
      } else if (diff < -10) {
        parts.push(`Your ${recent.subject} score dipped ${Math.abs(diff)}% — this often happens when tackling harder concepts.`);
      }
    }
    
    // Conceptual vs numerical detection (from weak/strong topics)
    const weakTopics = quizzes.slice(0, 3).flatMap(q => q.weakTopics || []);
    const strongTopics = quizzes.slice(0, 3).flatMap(q => q.strongTopics || []);
    if (weakTopics.length > 0 && strongTopics.length > 0) {
      const hasNumerical = weakTopics.some(t => t.toLowerCase().includes('numer') || t.toLowerCase().includes('calcul') || t.toLowerCase().includes('problem'));
      const hasConceptual = strongTopics.some(t => t.toLowerCase().includes('concept') || t.toLowerCase().includes('theor') || t.toLowerCase().includes('defin'));
      if (hasConceptual && hasNumerical) {
        parts.push('You perform better in conceptual questions than numerical ones — a common pattern that targeted practice can fix quickly.');
      }
    }
  }
  
  // 2. Learning style detection
  if (quizCount >= 2 && uploadCount >= 1) {
    if (quizCount > uploadCount * 2) {
      parts.push('Your retention appears stronger through active quizzing than passive reading.');
    } else if (uploadCount >= quizCount) {
      parts.push('You engage deeply with reading material — adding quick quizzes after each chapter could boost retention by 40%.');
    }
  }
  
  // 3. Study timing insight
  if (heatmap?.peakHour !== null && heatmap?.peakHour !== undefined) {
    const h = heatmap.peakHour;
    const timeLabel = h < 12 ? 'morning' : h < 17 ? 'afternoon' : h < 21 ? 'evening' : 'late night';
    suggestions.push(`Schedule challenging topics during your ${timeLabel} peak — your data shows highest engagement then.`);
  }
  
  // 4. Weak area focus
  if (mem.weakSubjects?.length > 0) {
    const weakest = mem.weakSubjects[0];
    suggestions.push(`A short targeted revision of ${weakest} tomorrow could significantly improve your next score.`);
  }
  
  // 5. Career connection
  if (mem.careerGoal && quizzes.length > 0) {
    const bestSubject = computeQuizStats(quizzes).bestSubject;
    if (bestSubject) {
      suggestions.push(`Your ${bestSubject} performance is building strong foundations for ${mem.careerGoal}.`);
    }
  }
  
  // 6. Streak motivation
  if (streak >= 3) {
    suggestions.push(`${streak}-day streak! Consistency compounds — keep this pace and you'll see measurable gains within 2 weeks.`);
  }
  
  // Build final insight
  if (parts.length === 0 && quizzes.length === 0) {
    return {
      title: 'Start Your Journey',
      insight: `Welcome${mem.name ? `, ${mem.name}` : ''}! Take your first quiz or upload study material, and I'll start building personalized insights about your learning patterns.`,
      suggestions: ['Upload a chapter to generate your first AI summary', 'Take a skill test to discover your strengths'],
    };
  }
  
  if (parts.length === 0) {
    parts.push(`You've completed ${quizzes.length} quiz${quizzes.length > 1 ? 'zes' : ''} with an average of ${computeQuizStats(quizzes).avgScore}%.`);
  }
  
  return {
    title: 'Adaptive Learning Insight',
    insight: parts.join('\n\n'),
    suggestions: suggestions.slice(0, 3),
  };
}

// ══════════════════════════════════════════════════════
// DAY 3: CAREER INSIGHT CARDS — Personalized Career Intelligence
// ══════════════════════════════════════════════════════

/**
 * Generates 2-3 AI Career Insight cards based on student data.
 * No API call — purely data-driven from memory.
 */
export function generateCareerInsightCards(mem) {
  if (!mem) mem = getMemory();
  const quizzes = mem.quizHistory || [];
  const cards = [];
  const quizStats = computeQuizStats(quizzes);
  
  // 1. Quiz performance → career alignment
  if (quizStats.bestSubject && quizStats.totalTests >= 2) {
    const careerMap = {
      'Physics': ['Engineering', 'Aerospace', 'Research'],
      'Mathematics': ['Data Science', 'Finance', 'Engineering'],
      'Computer Science': ['Software Engineering', 'AI/ML', 'Product Development'],
      'Biology': ['Medicine', 'Biotechnology', 'Research'],
      'Chemistry': ['Pharmaceutical Science', 'Chemical Engineering', 'Research'],
    };
    const careers = careerMap[quizStats.bestSubject] || ['Research', 'Teaching'];
    cards.push({
      icon: '📊',
      title: 'Performance-Based Fit',
      text: `Your analytical quiz performance in ${quizStats.bestSubject} (${quizStats.bestAvgScore}% avg) suggests strong potential in ${careers.slice(0, 2).join(' or ')}.`,
      color: 'indigo',
    });
  }
  
  // 2. Learning style → career style
  const activities = mem.recentActivity || [];
  const quizCount = activities.filter(a => a.type === 'quiz_complete' || a.type === 'skill_test_complete').length;
  const uploadCount = activities.filter(a => a.type === 'pdf_upload').length;
  if (quizCount + uploadCount >= 3) {
    if (quizCount > uploadCount) {
      cards.push({
        icon: '🧪',
        title: 'Learning Style Match',
        text: 'Your project-oriented, test-driven learning style aligns well with engineering and product development roles.',
        color: 'cyan',
      });
    } else {
      cards.push({
        icon: '📚',
        title: 'Learning Style Match',
        text: 'Your deep reading and analytical approach suits research, academic, and strategic planning careers.',
        color: 'purple',
      });
    }
  }
  
  // 3. Consistency → career environment
  const streak = getStudyStreak();
  if (streak >= 3 || (mem.sessionDates || []).length >= 5) {
    cards.push({
      icon: '🎯',
      title: 'Work Style Insight',
      text: `Your consistency pattern (${streak > 0 ? streak + '-day streak' : (mem.sessionDates || []).length + ' active sessions'}) favors structured, progress-oriented environments like tech companies and research labs.`,
      color: 'emerald',
    });
  }
  
  // 4. Subject interest breadth
  const uploadedSubjects = mem.uploadedSubjects || [];
  if (uploadedSubjects.length >= 2) {
    cards.push({
      icon: '🌐',
      title: 'Interdisciplinary Potential',
      text: `Your uploads span ${uploadedSubjects.slice(0, 3).join(', ')} — this cross-domain curiosity is ideal for emerging fields like AI, biotech, or sustainable engineering.`,
      color: 'amber',
    });
  }
  
  // 5. Career goal alignment
  if (mem.careerGoal && quizStats.bestSubject) {
    const goalLower = mem.careerGoal.toLowerCase();
    const aligned = quizStats.bestSubject.toLowerCase();
    const isAligned = goalLower.includes(aligned.slice(0, 4)) || 
      (goalLower.includes('engineer') && ['Physics', 'Mathematics', 'Computer Science'].includes(quizStats.bestSubject)) ||
      (goalLower.includes('doctor') && quizStats.bestSubject === 'Biology');
    if (isAligned) {
      cards.push({
        icon: '✅',
        title: 'Goal Alignment',
        text: `Your strongest subject (${quizStats.bestSubject}) directly supports your dream of becoming a ${mem.careerGoal}. You're on the right track.`,
        color: 'emerald',
      });
    }
  }
  
  return cards.slice(0, 3);
}

// ── AI Mentor message (enhanced Day 2) ────────────────
function generateMentorMessage(mem, quizzes, streak, heatmap) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const name = mem.name || 'there';

  if (!mem.onboardingCompleted) {
    return `${greeting}! Complete your profile to get personalized guidance tailored just for you.`;
  }

  // Build a pool of possible messages, pick the most relevant
  const messages = [];

  // Streak + high performance combo
  if (streak >= 5 && quizzes.length > 0) {
    const avgScore = Math.round(quizzes.slice(0, 5).reduce((a, q) => a + (q.percentage || 0), 0) / Math.min(quizzes.length, 5));
    if (avgScore >= 70) {
      messages.push(`${greeting}, ${name}! 🔥 ${streak}-day streak and ${avgScore}% average — that's serious dedication. ${mem.careerGoal ? `This consistency is exactly what ${mem.careerGoal} demands.` : "Keep pushing!"}`);
    }
  }

  // Recent improvement in specific subject
  if (quizzes.length >= 2) {
    const recent = quizzes[0];
    const previous = quizzes.find(q => q.subject === recent.subject && q !== recent);
    if (previous && recent.percentage > previous.percentage) {
      const jump = recent.percentage - previous.percentage;
      messages.push(`${greeting}, ${name}! You've improved ${jump}% in ${recent.subject} since your last attempt. A short revision session today could strengthen that retention further.`);
    }
  }

  // Recent high score celebration
  if (quizzes.length > 0 && quizzes[0].percentage >= 80) {
    const recent = quizzes[0];
    messages.push(`${greeting}, ${name}! That ${recent.percentage}% in ${recent.subject} shows real understanding. Ready to challenge yourself with the next level?`);
  }

  // Recent low score encouragement
  if (quizzes.length > 0 && quizzes[0].percentage < 50) {
    const recent = quizzes[0];
    messages.push(`${greeting}, ${name}! ${recent.subject} was tough last time, but every expert started exactly where you are. A focused 20-minute review could shift things.`);
  }

  // Career goal motivation
  if (mem.careerGoal && quizzes.length > 0) {
    const favSubj = mem.favoriteSubject || mem.strengths?.[0];
    if (favSubj) {
      messages.push(`${greeting}, ${name}! Your growing strength in ${favSubj} is building a solid foundation for ${mem.careerGoal}. Keep connecting what you learn to real-world applications.`);
    }
  }

  // Study timing awareness
  if (heatmap?.peakHour !== null && heatmap?.peakHour !== undefined) {
    const h = heatmap.peakHour;
    const isInPeak = Math.abs(hour - h) <= 2;
    if (isInPeak) {
      messages.push(`${greeting}, ${name}! This is your peak study window based on your patterns. Make the most of this focused time!`);
    }
  }

  // New user welcome
  if (quizzes.length === 0) {
    messages.push(`${greeting}, ${name}! I'm your AI mentor — I learn as you learn. Start with a quiz or upload study material, and I'll adapt to help you improve faster.`);
  }

  // Default with stats
  if (quizzes.length > 0) {
    const avgScore = Math.round(quizzes.reduce((a, q) => a + (q.percentage || 0), 0) / quizzes.length);
    messages.push(`${greeting}, ${name}! You've completed ${quizzes.length} quiz${quizzes.length > 1 ? 'zes' : ''} with an ${avgScore}% average${streak > 0 ? ` and a ${streak}-day streak` : ''}. Let's keep building on that.`);
  }

  // Pick most relevant (first available from priority list)
  return messages[0] || `${greeting}, ${name}! Ready to make today count?`;
}
