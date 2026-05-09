/**
 * Curated Learning Resource Bank
 * 
 * Handpicked resources for weak topic remediation.
 * Each resource includes: title, source, URL, difficulty, time estimate, reason.
 */

const RESOURCE_BANK = {
  Physics: {
    _default: [
      { title: 'Physics Concepts Explained', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/physics', difficulty: 'Beginner', time: '20 min', why: 'Visual explanations with practice exercises' },
      { title: 'Physics Notes & Problems', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/physics/', difficulty: 'Intermediate', time: '15 min', why: 'Concise theory with solved examples' },
    ],
    Mechanics: [
      { title: "Newton's Laws Made Simple", source: 'Khan Academy', url: 'https://www.khanacademy.org/science/physics/forces-newtons-laws', difficulty: 'Beginner', time: '15 min', why: 'Step-by-step visual breakdowns of forces and motion' },
      { title: 'Mechanics Problem Solving', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/mechanics/', difficulty: 'Intermediate', time: '20 min', why: 'Practice numerical problems with solutions' },
      { title: 'Physics - Mechanics Playlist', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=mechanics+physics+class+10+explained', difficulty: 'Beginner', time: '25 min', why: 'Engaging video explanations in Hindi/English' },
    ],
    Optics: [
      { title: 'Light & Optics Fundamentals', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/physics/geometric-optics', difficulty: 'Beginner', time: '20 min', why: 'Interactive ray diagrams and lens concepts' },
      { title: 'Optics Formulas & Problems', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/optics/', difficulty: 'Intermediate', time: '15 min', why: 'Quick formula reference with worked examples' },
    ],
    Electricity: [
      { title: 'Electric Circuits Explained', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/physics/circuits-topic', difficulty: 'Beginner', time: '20 min', why: 'Build intuition for current, voltage, and resistance' },
      { title: 'Electricity & Magnetism', source: 'W3Schools', url: 'https://www.w3schools.com/physics/physics_electric_circuits.php', difficulty: 'Beginner', time: '10 min', why: 'Simple, beginner-friendly explanations' },
    ],
    Thermodynamics: [
      { title: 'Heat & Temperature Basics', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/physics/thermodynamics', difficulty: 'Beginner', time: '20 min', why: 'Clear explanations of heat transfer concepts' },
      { title: 'Thermodynamics Problems', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/thermodynamics/', difficulty: 'Intermediate', time: '15 min', why: 'Numerical practice for exam preparation' },
    ],
  },

  Mathematics: {
    _default: [
      { title: 'Math Foundations', source: 'Khan Academy', url: 'https://www.khanacademy.org/math', difficulty: 'Beginner', time: '20 min', why: 'Structured learning path from basics to advanced' },
      { title: 'Math Tutorials', source: 'W3Schools', url: 'https://www.w3schools.com/math/', difficulty: 'Beginner', time: '10 min', why: 'Quick, interactive math references' },
    ],
    Algebra: [
      { title: 'Algebra Basics', source: 'Khan Academy', url: 'https://www.khanacademy.org/math/algebra', difficulty: 'Beginner', time: '20 min', why: 'Master equations and expressions step by step' },
      { title: 'Algebra Practice Problems', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/algebra/', difficulty: 'Intermediate', time: '15 min', why: 'Solve progressively harder problems' },
      { title: 'Algebra Tips & Tricks', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=algebra+tricks+for+students', difficulty: 'Beginner', time: '12 min', why: 'Shortcut methods for faster problem solving' },
    ],
    Geometry: [
      { title: 'Geometry Fundamentals', source: 'Khan Academy', url: 'https://www.khanacademy.org/math/geometry', difficulty: 'Beginner', time: '20 min', why: 'Visual proofs and interactive diagrams' },
      { title: 'Geometry Formulas', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/geometry/', difficulty: 'Intermediate', time: '10 min', why: 'Complete formula sheet with examples' },
    ],
    Calculus: [
      { title: 'Introduction to Calculus', source: 'Khan Academy', url: 'https://www.khanacademy.org/math/calculus-1', difficulty: 'Intermediate', time: '25 min', why: 'Gentle introduction to derivatives and integrals' },
      { title: 'Calculus for Beginners', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=calculus+basics+explained+simply', difficulty: 'Beginner', time: '20 min', why: 'Visual intuition before formal math' },
    ],
    Trigonometry: [
      { title: 'Trigonometry Basics', source: 'Khan Academy', url: 'https://www.khanacademy.org/math/trigonometry', difficulty: 'Beginner', time: '20 min', why: 'Unit circle and trig functions made visual' },
      { title: 'Trig Problem Solving', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/trigonometry/', difficulty: 'Intermediate', time: '15 min', why: 'Exam-style problems with step-by-step solutions' },
    ],
  },

  Chemistry: {
    _default: [
      { title: 'Chemistry Basics', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/chemistry', difficulty: 'Beginner', time: '20 min', why: 'Foundation concepts with visual models' },
      { title: 'Chemistry Notes', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/chemistry/', difficulty: 'Intermediate', time: '15 min', why: 'Quick revision with key formulas' },
    ],
    'Organic Chemistry': [
      { title: 'Organic Chemistry Intro', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/organic-chemistry', difficulty: 'Intermediate', time: '25 min', why: 'Molecular structures and reactions explained visually' },
      { title: 'Organic Reactions Guide', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/organic-chemistry/', difficulty: 'Intermediate', time: '20 min', why: 'Reaction mechanisms with practice' },
    ],
    'Chemical Bonding': [
      { title: 'Chemical Bonds Explained', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/chemistry/chemical-bonds', difficulty: 'Beginner', time: '15 min', why: 'Visual models of ionic and covalent bonds' },
    ],
  },

  Biology: {
    _default: [
      { title: 'Biology Foundations', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/biology', difficulty: 'Beginner', time: '20 min', why: 'Comprehensive biology learning path' },
      { title: 'Biology Quick Notes', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/biology/', difficulty: 'Beginner', time: '10 min', why: 'Concise notes for quick revision' },
    ],
    'Cell Biology': [
      { title: 'Cell Structure & Function', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/biology/structure-of-a-cell', difficulty: 'Beginner', time: '20 min', why: 'Interactive cell diagrams and functions' },
    ],
    Genetics: [
      { title: 'Genetics Made Simple', source: 'Khan Academy', url: 'https://www.khanacademy.org/science/biology/classical-genetics', difficulty: 'Intermediate', time: '25 min', why: 'Punnett squares and inheritance patterns' },
    ],
  },

  'Computer Science': {
    _default: [
      { title: 'CS Fundamentals', source: 'W3Schools', url: 'https://www.w3schools.com/', difficulty: 'Beginner', time: '15 min', why: 'Hands-on tutorials with live code editor' },
      { title: 'Programming Concepts', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/', difficulty: 'Intermediate', time: '20 min', why: 'In-depth explanations with code examples' },
    ],
    'Data Structures': [
      { title: 'Data Structures Tutorial', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-structures/', difficulty: 'Intermediate', time: '25 min', why: 'Visualizations and implementations' },
      { title: 'DSA Learning Path', source: 'W3Schools', url: 'https://www.w3schools.com/dsa/', difficulty: 'Beginner', time: '20 min', why: 'Step-by-step interactive DSA tutorial' },
    ],
    Programming: [
      { title: 'Python for Beginners', source: 'W3Schools', url: 'https://www.w3schools.com/python/', difficulty: 'Beginner', time: '15 min', why: 'Interactive Python exercises' },
      { title: 'JavaScript Basics', source: 'W3Schools', url: 'https://www.w3schools.com/js/', difficulty: 'Beginner', time: '15 min', why: 'Learn by coding in the browser' },
    ],
  },

  Music: {
    _default: [
      { title: 'Music Theory Basics', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=music+theory+basics+for+beginners', difficulty: 'Beginner', time: '15 min', why: 'Visual and auditory music theory fundamentals' },
      { title: 'Musictheory.net', source: 'Musictheory.net', url: 'https://www.musictheory.net/lessons', difficulty: 'Beginner', time: '20 min', why: 'Interactive lessons on notes, scales, and chords' },
    ],
    'Rhythm': [
      { title: 'Rhythm Training', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=rhythm+training+exercises+beginner', difficulty: 'Beginner', time: '10 min', why: 'Practice rhythm patterns with audio exercises' },
    ],
    'Instruments': [
      { title: 'Learn Guitar/Piano Basics', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=learn+instrument+basics+beginner', difficulty: 'Beginner', time: '20 min', why: 'Structured instrument tutorials for beginners' },
      { title: 'Simply Piano/Guitar', source: 'App', url: 'https://www.joytunes.com/', difficulty: 'Beginner', time: '15 min', why: 'Interactive app-based instrument learning' },
    ],
  },

  Art: {
    _default: [
      { title: 'Drawing Fundamentals', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=drawing+fundamentals+for+beginners', difficulty: 'Beginner', time: '20 min', why: 'Learn basic shapes, shading, and perspective' },
      { title: 'Canva Design School', source: 'Canva', url: 'https://www.canva.com/designschool/', difficulty: 'Beginner', time: '15 min', why: 'Free design tutorials and creative exercises' },
    ],
    'Digital Art': [
      { title: 'Digital Art for Beginners', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=digital+art+beginner+tutorial', difficulty: 'Beginner', time: '25 min', why: 'Get started with digital drawing tools' },
    ],
  },

  English: {
    _default: [
      { title: 'English Grammar', source: 'Khan Academy', url: 'https://www.khanacademy.org/humanities/grammar', difficulty: 'Beginner', time: '15 min', why: 'Structured grammar lessons with exercises' },
      { title: 'English Practice', source: 'W3Schools', url: 'https://www.w3schools.com/tags/', difficulty: 'Beginner', time: '10 min', why: 'Quick reference for reading comprehension' },
    ],
    'Grammar': [
      { title: 'Grammar Lessons', source: 'Khan Academy', url: 'https://www.khanacademy.org/humanities/grammar', difficulty: 'Beginner', time: '15 min', why: 'Parts of speech, sentences, and punctuation' },
    ],
  },

  Hindi: {
    _default: [
      { title: 'Hindi Grammar & Literature', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=hindi+grammar+class+10+explained', difficulty: 'Beginner', time: '20 min', why: 'Hindi vyakaran and sahitya video lessons' },
    ],
  },

  'Social Science': {
    _default: [
      { title: 'History & Civics', source: 'Khan Academy', url: 'https://www.khanacademy.org/humanities/world-history', difficulty: 'Beginner', time: '20 min', why: 'Engaging history lessons with timelines' },
      { title: 'Geography & Economics', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=social+science+class+10+geography', difficulty: 'Beginner', time: '15 min', why: 'Visual explanations of social science concepts' },
    ],
    'History': [
      { title: 'World History', source: 'Khan Academy', url: 'https://www.khanacademy.org/humanities/world-history', difficulty: 'Beginner', time: '25 min', why: 'Interactive timelines and historical analysis' },
    ],
  },

  'General Science': {
    _default: [
      { title: 'Science Fundamentals', source: 'Khan Academy', url: 'https://www.khanacademy.org/science', difficulty: 'Beginner', time: '20 min', why: 'Covers physics, chemistry, and biology basics' },
      { title: 'Science Experiments', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=science+experiments+for+students', difficulty: 'Beginner', time: '15 min', why: 'Hands-on experiment videos for visual learning' },
    ],
  },

  // Fallback for any unrecognized subject
  General: {
    _default: [
      { title: 'Study Skills & Techniques', source: 'Khan Academy', url: 'https://www.khanacademy.org/', difficulty: 'Beginner', time: '15 min', why: 'General study strategies and learning techniques' },
      { title: 'Practice & Learn', source: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/', difficulty: 'Beginner', time: '10 min', why: 'Wide range of topics and practice problems' },
    ],
  },
};

// Source icons/colors for display
const SOURCE_META = {
  'Khan Academy': { icon: '🎓', color: 'emerald' },
  'GeeksforGeeks': { icon: '💻', color: 'green' },
  'W3Schools': { icon: '🌐', color: 'blue' },
  'YouTube': { icon: '▶️', color: 'red' },
  'Musictheory.net': { icon: '🎵', color: 'purple' },
  'Canva': { icon: '🎨', color: 'cyan' },
  'App': { icon: '📱', color: 'indigo' },
};

/**
 * Get curated resources for a weak topic.
 * @param {string} topic - The weak topic/subject
 * @param {string} subject - The broader subject area (e.g., "Physics")
 * @returns {Array} - Array of resource objects
 */
export function getResourcesForTopic(topic, subject) {
  // Try exact topic match first
  const subjectBank = RESOURCE_BANK[subject] || RESOURCE_BANK[findClosestSubject(topic)] || RESOURCE_BANK.General;
  
  // Check for topic-specific resources
  const topicKey = Object.keys(subjectBank).find(key => 
    key !== '_default' && (
      key.toLowerCase().includes(topic.toLowerCase()) ||
      topic.toLowerCase().includes(key.toLowerCase())
    )
  );

  if (topicKey) {
    return subjectBank[topicKey].map(r => ({ ...r, sourceMeta: SOURCE_META[r.source] || { icon: '📚', color: 'indigo' } }));
  }

  // Fallback to subject defaults
  return (subjectBank._default || RESOURCE_BANK.General._default).map(r => ({ 
    ...r, 
    sourceMeta: SOURCE_META[r.source] || { icon: '📚', color: 'indigo' } 
  }));
}

/**
 * Try to find the closest matching subject for a given topic name.
 */
function findClosestSubject(topic) {
  const topicLower = topic.toLowerCase();
  const subjectKeywords = {
    Physics: ['physics', 'force', 'motion', 'energy', 'electric', 'magnet', 'optic', 'wave', 'thermo', 'mechanic', 'gravity'],
    Mathematics: ['math', 'algebra', 'geometry', 'calculus', 'trigon', 'equation', 'number', 'fraction', 'probability'],
    Chemistry: ['chemistry', 'chemical', 'atom', 'molecule', 'reaction', 'bond', 'organic', 'acid', 'element', 'periodic'],
    Biology: ['biology', 'cell', 'genetics', 'evolution', 'ecology', 'organism', 'plant', 'animal', 'dna', 'protein'],
    'Computer Science': ['computer', 'program', 'code', 'algorithm', 'data structure', 'software', 'web', 'python', 'java'],
    Music: ['music', 'song', 'rhythm', 'melody', 'instrument', 'guitar', 'piano', 'vocal', 'singing', 'raga', 'tabla'],
    Art: ['art', 'draw', 'paint', 'sketch', 'design', 'color', 'creative', 'illustration', 'sculpture'],
    English: ['english', 'grammar', 'vocabulary', 'essay', 'literature', 'comprehension', 'writing', 'poem'],
    Hindi: ['hindi', 'vyakaran', 'sahitya', 'nibandh', 'kavita'],
    'Social Science': ['history', 'geography', 'civics', 'economics', 'social', 'political', 'democratic'],
    'General Science': ['science', 'experiment', 'lab', 'hypothesis'],
  };

  for (const [subject, keywords] of Object.entries(subjectKeywords)) {
    if (keywords.some(kw => topicLower.includes(kw))) {
      return subject;
    }
  }
  return 'General';
}

/**
 * Get a quick improvement suggestion for a weak topic.
 * @param {string} topic
 * @returns {string}
 */
export function getQuickSuggestion(topic) {
  const topicLower = topic.toLowerCase();
  
  const suggestions = {
    mechanics: 'Practice free-body diagrams for 10 min daily',
    optics: 'Draw 5 ray diagrams from memory each day',
    electricity: 'Solve 3 circuit problems using Ohm\'s Law',
    algebra: 'Solve 5 equations of increasing difficulty daily',
    geometry: 'Practice one proof and 3 area/volume problems',
    calculus: 'Start with limit problems, then build to derivatives',
    trigonometry: 'Memorize the unit circle, then practice identities',
    organic: 'Map out 5 reaction mechanisms on paper',
    genetics: 'Draw Punnett squares for different trait combinations',
    programming: 'Code one small program daily for practice',
    music: 'Practice scales for 10 minutes daily to build muscle memory',
    rhythm: 'Clap along to songs and count beats to internalize rhythm',
    art: 'Sketch one object from observation daily for 15 minutes',
    draw: 'Practice basic shapes and shading techniques daily',
    grammar: 'Write 3 sentences daily focusing on different tenses',
    vocabulary: 'Learn 5 new words and use each in a sentence',
    history: 'Create a timeline of 5 key events from the chapter',
    geography: 'Label maps from memory and check your accuracy',
    hindi: 'Read one paragraph aloud and summarize in your own words',
  };

  for (const [key, suggestion] of Object.entries(suggestions)) {
    if (topicLower.includes(key)) return suggestion;
  }

  return `Review fundamentals and practice 3-5 problems daily`;
}

export { SOURCE_META };
