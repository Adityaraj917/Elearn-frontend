/**
 * Career Predictor — Probabilistic Career Matching Engine
 * Calculates fit scores for each career based on student profile data.
 * Runs entirely on client using studentMemory data.
 */

import { getMemory } from './studentMemory';
import physicsCareerData from '../data/careerData';

const PERSONALITY_CAREER_MAP = {
  Analytical: ['physicist', 'astrophysicist', 'quantum_computing', 'data_scientist', 'quant_analyst', 'nuclear_physicist', 'geophysicist'],
  Creative: ['game_developer', 'vfx_artist', 'science_journalist', 'robotics_engineer'],
  Leader: ['ias_officer', 'nda_officer', 'iaf_officer', 'navy_officer', 'ips_officer', 'aerospace_engineer'],
  Helper: ['medical_physicist', 'professor', 'biophysicist', 'meteorologist'],
  Explorer: ['astrophysicist', 'geophysicist', 'isro_scientist', 'oceanographer', 'coast_guard'],
  Builder: ['mechanical_engineer', 'civil_engineer', 'electrical_engineer', 'robotics_engineer', 'renewable_energy'],
};

const SUBJECT_CAREER_MAP = {
  Physics: ['physicist', 'astrophysicist', 'mechanical_engineer', 'aerospace_engineer', 'isro_scientist', 'nda_officer', 'iaf_officer'],
  Mathematics: ['data_scientist', 'quant_analyst', 'quantum_computing', 'software_developer', 'electrical_engineer'],
  'Computer Science': ['software_developer', 'data_scientist', 'game_developer', 'quantum_computing', 'robotics_engineer'],
  Biology: ['medical_physicist', 'biophysicist'],
  Chemistry: ['nuclear_physicist', 'forensic_scientist', 'nanotechnologist'],
};

function calculateSubjectOverlap(studentStrengths, careerSubjects) {
  if (!studentStrengths?.length || !careerSubjects?.length) return 0;
  const normalizedStrengths = studentStrengths.map(s => s.toLowerCase());
  const matches = careerSubjects.filter(subj =>
    normalizedStrengths.some(str => str.includes(subj.toLowerCase().slice(0, 4)))
  );
  return Math.round((matches.length / careerSubjects.length) * 100);
}

function calculatePersonalityFit(personalityType, careerId) {
  if (!personalityType) return 50;
  const matchedCareers = PERSONALITY_CAREER_MAP[personalityType] || [];
  return matchedCareers.includes(careerId) ? 85 : 40;
}

function calculateGoalAlignment(careerGoal, careerTitle) {
  if (!careerGoal) return 50;
  const goal = careerGoal.toLowerCase();
  const title = careerTitle.toLowerCase();
  if (title.includes(goal) || goal.includes(title.split(' ')[0])) return 95;
  const keywords = goal.split(/\s+/);
  const matches = keywords.filter(k => title.includes(k));
  return matches.length > 0 ? 60 + matches.length * 10 : 30;
}

function calculateQuizFit(quizHistory, careerSubjects) {
  if (!quizHistory?.length) return 50;
  const relevant = quizHistory.filter(q =>
    careerSubjects.some(s => s.toLowerCase().includes(q.subject?.toLowerCase()?.slice(0, 4) || ''))
  );
  if (relevant.length === 0) return 50;
  const avg = relevant.reduce((a, q) => a + (q.percentage || 0), 0) / relevant.length;
  return Math.min(100, Math.round(avg));
}

/**
 * Calculate fit score for a single career
 */
export function calculateCareerFit(career) {
  const mem = getMemory();
  const subjectScore = calculateSubjectOverlap(mem.strengths, career.requiredSubjects);
  const personalityScore = calculatePersonalityFit(mem.personalityType, career.id);
  const goalScore = calculateGoalAlignment(mem.careerGoal || mem.dreamCareer, career.title);
  const quizScore = calculateQuizFit(mem.quizHistory, career.requiredSubjects);

  // Weighted average
  const fitScore = Math.round(
    subjectScore * 0.3 +
    personalityScore * 0.2 +
    goalScore * 0.25 +
    quizScore * 0.25
  );

  const gaps = [];
  if (subjectScore < 50) gaps.push('Strengthen required subjects');
  if (quizScore < 50) gaps.push('Improve quiz performance in related topics');

  let alignment = 'Low';
  if (fitScore >= 75) alignment = 'Strong';
  else if (fitScore >= 50) alignment = 'Moderate';

  return { fitScore: Math.min(100, Math.max(10, fitScore)), alignment, gaps, subjectScore, personalityScore, goalScore, quizScore };
}

/**
 * Get top N career matches sorted by fit score
 */
export function getTopCareerMatches(n = 5) {
  const careers = physicsCareerData.careers.map(career => ({
    ...career,
    ...calculateCareerFit(career),
  }));
  careers.sort((a, b) => b.fitScore - a.fitScore);
  return careers.slice(0, n);
}

/**
 * Get all careers with fit scores
 */
export function getAllCareersWithFit() {
  return physicsCareerData.careers.map(career => ({
    ...career,
    ...calculateCareerFit(career),
  })).sort((a, b) => b.fitScore - a.fitScore);
}
