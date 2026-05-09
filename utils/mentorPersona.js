/**
 * Mentor Persona — Conversational AI Message Generator
 * 
 * Generates short, human-like mentor messages that reference real student data.
 * No API calls — purely computed from localStorage memory.
 * 
 * Each message: { text, category, emotion, priority }
 * Categories: greeting, performance, timing, streak, weakness, career, encouragement
 * Emotions: celebrate, nudge, motivate, empathize, observe
 */

import { getMemory, getStudyStreak, getStudyHeatmap } from './studentMemory';

/**
 * Generate 3-4 conversational mentor messages for the floating panel.
 * Messages are prioritized by relevance and freshness.
 */
export function generateMentorConversation() {
  const mem = getMemory();
  const streak = getStudyStreak();
  const heatmap = getStudyHeatmap();
  const quizzes = mem.quizHistory || [];
  const activities = mem.recentActivity || [];
  const name = mem.name || 'there';
  const hour = new Date().getHours();

  const messages = [];

  // 1. Adaptive greeting (always first)
  messages.push(buildGreeting(name, hour, streak, quizzes));

  // 2. Recent quiz performance reaction
  if (quizzes.length >= 1) {
    const quizMsg = buildQuizReaction(name, quizzes);
    if (quizMsg) messages.push(quizMsg);
  }

  // 3. Weak area nudge
  if (mem.weakSubjects?.length > 0) {
    messages.push(buildWeakAreaNudge(name, mem.weakSubjects, quizzes));
  }

  // 4. Study timing observation
  if (heatmap?.peakHour !== null && heatmap?.peakHour !== undefined) {
    const timingMsg = buildTimingInsight(name, heatmap, hour);
    if (timingMsg) messages.push(timingMsg);
  }

  // 5. Streak motivation
  if (streak >= 2) {
    messages.push(buildStreakMessage(name, streak));
  }

  // 6. Career connection
  if (mem.careerGoal && quizzes.length >= 1) {
    const careerMsg = buildCareerConnection(name, mem, quizzes);
    if (careerMsg) messages.push(careerMsg);
  }

  // 7. Learning style observation
  const styleMsg = buildLearningStyleNote(name, activities);
  if (styleMsg) messages.push(styleMsg);

  // 8. Encouragement fallback (if too few messages)
  if (messages.length < 3) {
    messages.push(buildEncouragement(name, quizzes, mem));
  }

  // Deduplicate by category and return top 4
  const seen = new Set();
  return messages
    .filter(m => {
      if (seen.has(m.category)) return false;
      seen.add(m.category);
      return true;
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 4);
}

/**
 * Generate a single adaptive sentence for the dashboard hero area.
 */
export function getHeroInsight() {
  const mem = getMemory();
  const quizzes = mem.quizHistory || [];
  const streak = getStudyStreak();
  const name = mem.name || 'there';

  if (quizzes.length === 0) {
    return `Take your first quiz and I'll start building your personalized learning map.`;
  }

  const recent = quizzes[0];
  const avgScore = Math.round(quizzes.reduce((a, q) => a + (q.percentage || 0), 0) / quizzes.length);

  if (recent.percentage >= 80) {
    return `Strong momentum — ${avgScore}% average across ${quizzes.length} test${quizzes.length > 1 ? 's' : ''}. ${streak > 0 ? `${streak}-day streak 🔥` : ''}`;
  }
  if (recent.percentage < 50 && mem.weakSubjects?.length > 0) {
    return `${mem.weakSubjects[0]} needs attention — a focused 15-min session could shift things.`;
  }
  return `${quizzes.length} test${quizzes.length > 1 ? 's' : ''} completed, ${avgScore}% average. ${streak > 0 ? `${streak}-day streak.` : 'Keep going.'}`;
}

/**
 * Generate a post-quiz reaction message (called after quiz completion).
 */
export function getPostQuizReaction(subject, score, total) {
  const mem = getMemory();
  const name = mem.name || 'there';
  const pct = Math.round((score / total) * 100);

  if (pct >= 90) {
    return { text: `Wow ${name}, ${pct}% in ${subject}! You're mastering this. Ready for a harder challenge?`, emotion: 'celebrate' };
  }
  if (pct >= 70) {
    return { text: `Nice work on ${subject}, ${name}! ${pct}% shows solid understanding. Let's sharpen the edges.`, emotion: 'motivate' };
  }
  if (pct >= 50) {
    return { text: `${subject} at ${pct}% — you've got the basics, ${name}. A targeted review tomorrow could push you past 70%.`, emotion: 'nudge' };
  }
  return { text: `${subject} was tough at ${pct}%, ${name}. Every expert started here — let's review the fundamentals together.`, emotion: 'empathize' };
}

// ── Internal Builders ─────────────────────────────────

function buildGreeting(name, hour, streak, quizzes) {
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  let text;

  if (quizzes.length === 0) {
    text = `${greet}, ${name}! I'm your AI mentor — let's start by discovering your strengths.`;
  } else if (streak >= 5) {
    text = `${greet}, ${name}! ${streak} days strong — that's the kind of consistency that builds real mastery.`;
  } else if (hour >= 17 && hour < 21) {
    text = `${greet}, ${name}! Evening sessions are great for consolidation. What shall we work on?`;
  } else {
    text = `${greet}, ${name}! Ready to pick up where you left off?`;
  }

  return { text, category: 'greeting', emotion: 'motivate', priority: 10 };
}

function buildQuizReaction(name, quizzes) {
  const recent = quizzes[0];
  if (!recent) return null;

  // Compare with previous attempt in same subject
  const previous = quizzes.find(q => q.subject === recent.subject && q !== recent);
  const timeSince = Date.now() - new Date(recent.date).getTime();
  const isRecent = timeSince < 2 * 60 * 60 * 1000; // within 2 hours

  let text;
  if (previous) {
    const diff = recent.percentage - previous.percentage;
    if (diff > 0) {
      text = `${isRecent ? 'Just now: ' : ''}Your ${recent.subject} score improved by ${diff}%${isRecent ? '!' : ' since last time.'} ${diff > 15 ? 'That\'s a significant jump!' : 'Steady progress.'}`;
    } else if (diff < -10) {
      text = `Your last ${recent.subject} quiz dipped ${Math.abs(diff)}% — this often happens with harder material. A quick revision could help.`;
    } else {
      text = `Consistent ${recent.percentage}% in ${recent.subject}. Try varying your practice difficulty to push higher.`;
    }
  } else {
    if (recent.percentage >= 75) {
      text = `${recent.percentage}% in ${recent.subject} — that's a strong start, ${name}!`;
    } else {
      text = `First ${recent.subject} test at ${recent.percentage}%. Now I know where to guide you.`;
    }
  }

  return { text, category: 'performance', emotion: recent.percentage >= 70 ? 'celebrate' : 'nudge', priority: 9 };
}

function buildWeakAreaNudge(name, weakSubjects, quizzes) {
  const weakest = weakSubjects[0];
  const templates = [
    `${weakest} keeps showing up in your weak areas. Even 10 minutes of focused practice tomorrow could make a real difference.`,
    `I've noticed ${weakest} is still a challenge. Want to try a targeted mini-quiz on just that topic?`,
    `${weakest} needs some attention, ${name}. The good news — it's one of the fastest areas to improve with practice.`,
  ];
  const text = templates[Math.floor(Date.now() / 60000) % templates.length]; // rotate based on time

  return { text, category: 'weakness', emotion: 'nudge', priority: 8 };
}

function buildTimingInsight(name, heatmap, currentHour) {
  const peak = heatmap.peakHour;
  const timeLabel = peak < 12 ? 'morning' : peak < 17 ? 'afternoon' : peak < 21 ? 'evening' : 'late night';
  const isInPeak = Math.abs(currentHour - peak) <= 2;

  let text;
  if (isInPeak) {
    text = `This is your peak study window — your data shows highest focus during ${timeLabel} hours. Make it count!`;
  } else {
    text = `Your best performance happens during ${timeLabel} sessions. Try scheduling tough topics then.`;
  }

  return { text, category: 'timing', emotion: 'observe', priority: 5 };
}

function buildStreakMessage(name, streak) {
  let text;
  if (streak >= 14) {
    text = `${streak}-day streak, ${name}! You've built a real habit. Research shows this kind of consistency leads to lasting mastery.`;
  } else if (streak >= 7) {
    text = `${streak} days in a row! You're past the hardest part — habits get easier from here.`;
  } else {
    text = `${streak}-day streak building! Keep showing up — momentum compounds.`;
  }

  return { text, category: 'streak', emotion: 'celebrate', priority: 6 };
}

function buildCareerConnection(name, mem, quizzes) {
  const recent = quizzes[0];
  if (!recent) return null;

  const text = `Your growing strength in ${recent.subject} is directly building foundations for ${mem.careerGoal}. Keep connecting what you learn to real-world applications.`;
  return { text, category: 'career', emotion: 'motivate', priority: 4 };
}

function buildLearningStyleNote(name, activities) {
  const quizCount = activities.filter(a => a.type === 'quiz_complete' || a.type === 'skill_test_complete').length;
  const uploadCount = activities.filter(a => a.type === 'pdf_upload').length;

  if (quizCount < 2 && uploadCount < 1) return null;

  let text;
  if (quizCount > uploadCount * 2) {
    text = `You learn best through active testing. Your quiz-based approach is very effective — keep challenging yourself.`;
  } else if (uploadCount >= quizCount && uploadCount >= 2) {
    text = `You're a deep reader — that's valuable. Adding quick quizzes after reading could boost your retention by 40%.`;
  } else {
    return null;
  }

  return { text, category: 'style', emotion: 'observe', priority: 3 };
}

function buildEncouragement(name, quizzes, mem) {
  if (quizzes.length === 0) {
    return {
      text: `Upload a chapter or take a skill test — I'll start mapping your unique learning patterns.`,
      category: 'encouragement', emotion: 'motivate', priority: 2
    };
  }

  const templates = [
    `Every session makes a difference, ${name}. Small consistent steps always beat marathon cramming.`,
    `You're building something real here, ${name}. Keep showing up and the results will compound.`,
    `Progress isn't always linear — but you're on the right track, ${name}.`,
  ];

  return {
    text: templates[Math.floor(Date.now() / 120000) % templates.length],
    category: 'encouragement', emotion: 'motivate', priority: 2
  };
}
