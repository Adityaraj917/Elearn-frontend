import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import physicsCareerData from "../../data/careerData";
import { getMemory } from "../../utils/studentMemory";
import { generateCareerInsightCards } from "../../utils/insightEngine";
import { 
  ArrowLeft, ChevronRight, ChevronDown, ChevronUp, MapPin, AlertTriangle, 
  Star, Shield, GraduationCap, Trophy, BookOpen, Users, Sparkles, Search, X,
  Loader2, Lightbulb, Compass, ArrowRight
} from "lucide-react";

import { API_URL } from "../../utils/api";

export default function CareerExplorer() {
  const router = useRouter();
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [expandedSection, setExpandedSection] = useState("roadmap");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [aiCareers, setAiCareers] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [memory, setMemory] = useState(null);
  const [careerInsights, setCareerInsights] = useState([]);

  useEffect(() => {
    const mem = getMemory();
    setMemory(mem);
    setCareerInsights(generateCareerInsightCards(mem));
  }, []);

  // Fetch AI suggestions for non-Physics subjects
  const fetchAICareers = async (subject) => {
    setLoadingAI(true);
    try {
      const profile = JSON.parse(localStorage.getItem("saarthi_profile") || "{}");
      const res = await fetch(`${API_URL}/api/career/suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, studentProfile: profile }),
      });
      const data = await res.json();
      setAiCareers(data.careers || []);
    } catch (e) {
      setAiCareers([]);
    }
    setLoadingAI(false);
  };

  const handleSubjectChange = (subject) => {
    setActiveSubject(subject);
    setSearchQuery("");
    setSelectedCategory("all");
    if (subject !== 'Physics') {
      fetchAICareers(subject);
    }
  };

  const filteredCareers = physicsCareerData.careers.filter(c => {
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(physicsCareerData.careers.map(c => c.category))];

  if (selectedCareer) {
    return <CareerDetail career={selectedCareer} onBack={() => setSelectedCareer(null)} memory={memory} />;
  }

  return (
    <div className="min-h-screen page-bg">
      <Head>
        <title>Career Explorer | Saarthi</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-0 right-[20%] w-[500px] h-[500px] rounded-full orb-cyan blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => router.push("/dashboard")} className="btn-ghost flex items-center gap-2 mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        {/* Hero — Personalized */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧭</span>
            <h1 className="text-3xl md:text-4xl font-bold heading-section">Career Explorer</h1>
          </div>
          <p className="text-secondary-themed max-w-3xl">
            {memory?.careerGoal 
              ? `Exploring paths aligned with your dream of becoming a ${memory.careerGoal}. Your strengths and quiz performance shape these recommendations.`
              : physicsCareerData.description
            }
          </p>
        </div>

        {/* ══════ AI Career Insight Cards — Day 3 ══════ */}
        {careerInsights.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="section-label text-muted-themed">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Career Insights</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {careerInsights.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="career-insight-card glass-card p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{card.icon}</span>
                    <div>
                      <p className={`text-xs font-bold mb-1 text-${card.color}-400`}>{card.title}</p>
                      <p className="text-sm text-secondary-themed leading-relaxed">{card.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recommended for You — from memory */}
        {memory?.careerGoal && (
          <div className="glass-card p-5 border-l-4 border-l-indigo-500 mb-6">
            <div className="flex items-start gap-3">
              <Compass className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-indigo-400 font-semibold mb-1">RECOMMENDED FOR YOU</p>
                <p className="text-secondary-themed text-sm">Based on your profile, explore careers in <span className="font-semibold text-indigo-400">{memory.careerGoal}</span>. Your strengths in {(memory.strengths || []).slice(0, 2).join(' and ') || 'your subjects'} align well with this path.</p>
              </div>
            </div>
          </div>
        )}

        {/* Subject Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Physics', 'Mathematics', 'Computer Science', 'Biology', 'Chemistry'].map(subj => (
            <button key={subj} onClick={() => handleSubjectChange(subj)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeSubject === subj ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/25' : 'text-secondary-themed border border-themed hover:text-primary-themed'
              }`}
              style={activeSubject !== subj ? { background: 'rgba(var(--bg-card), 0.6)', borderColor: 'rgba(var(--border-color), 0.4)' } : {}}>
              {subj}
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        {activeSubject === 'Physics' && (
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-themed" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search career paths..."
                className="input-dark pl-11"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-500 hover:text-white" />
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === "all" ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30" : "text-secondary-themed border"
                }`}
                style={selectedCategory !== "all" ? { background: 'rgba(var(--bg-card), 0.5)', borderColor: 'rgba(var(--border-color), 0.4)' } : {}}>All</button>
              {uniqueCategories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30" : "text-secondary-themed border"
                  }`}
                  style={selectedCategory !== cat ? { background: 'rgba(var(--bg-card), 0.5)', borderColor: 'rgba(var(--border-color), 0.4)' } : {}}>{cat}</button>
              ))}
            </div>
          </div>
        )}

        {/* Career Grid */}
        {activeSubject === 'Physics' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCareers.map((career, i) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedCareer(career)}
                  className="glass-card p-6 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{career.icon}</span>
                    <span className="badge badge-primary text-xs">{career.category}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-300 transition-colors">{career.title}</h3>
                  <p className="text-sm text-secondary-themed mb-4 line-clamp-2">{career.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-themed">{career.salaryRange.entry} — {career.salaryRange.senior}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredCareers.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p className="text-lg">No careers found matching your search.</p>
              </div>
            )}
          </>
        ) : (
          /* AI-Generated Career Suggestions */
          <div>
            {loadingAI ? (
              <div className="glass-card p-12 text-center">
                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto mb-4" />
                <p className="text-secondary-themed">Generating {activeSubject} career suggestions with AI...</p>
              </div>
            ) : aiCareers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiCareers.map((career, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{career.icon || '💼'}</span>
                      <span className="badge badge-primary text-xs">{career.category || activeSubject}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{career.title}</h3>
                    <p className="text-sm text-secondary-themed mb-4">{career.shortDesc}</p>
                    {career.salaryRange && (
                      <div className="text-xs text-gray-500">
                        {career.salaryRange.entry} — {career.salaryRange.senior}
                      </div>
                    )}
                    <div className="mt-3">
                      <span className="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs">✨ AI Generated</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <p className="text-muted-themed">No AI-generated suggestions available. Try again.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== DETAILED CAREER VIEW =====
function CareerDetail({ career, onBack, memory }) {
  const [expandedSection, setExpandedSection] = useState("roadmap");

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? "" : id);
  };

  const sections = [
    { id: "roadmap", title: "Educational Roadmap", icon: <MapPin className="w-5 h-5" /> },
    { id: "exams", title: "Key Exams & Entries", icon: <GraduationCap className="w-5 h-5" /> },
    { id: "perks", title: "Perks & Benefits", icon: <Star className="w-5 h-5" /> },
    { id: "risks", title: "Risks & Challenges", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "impact", title: "Social Impact", icon: <Users className="w-5 h-5" /> },
    { id: "eligibility", title: "Eligibility & Requirements", icon: <Shield className="w-5 h-5" /> },
  ];

  // Check if student strengths match required subjects
  const studentStrengths = memory?.strengths || [];
  const matchingSubjects = (career.requiredSubjects || []).filter(s => 
    studentStrengths.some(str => str.toLowerCase().includes(s.toLowerCase().slice(0, 4)))
  );

  return (
    <div className="min-h-screen page-bg">
      <Head>
        <title>{career.title} | Career Explorer | Saarthi</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="animated-orb absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full orb-indigo blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        <button onClick={onBack} className="btn-ghost flex items-center gap-2 mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to All Careers
        </button>

        {/* Hero */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{career.icon}</span>
            <div className="flex-1">
              <span className="badge badge-primary mb-2">{career.category}</span>
              <h1 className="text-3xl font-bold mb-2">{career.title}</h1>
              <p className="text-secondary-themed">{career.shortDesc}</p>
            </div>
          </div>

          {/* Personalized fit note — Day 3 */}
          {memory?.careerGoal && (
            <div className="p-3 rounded-xl bg-indigo-500/8 border border-indigo-500/15 mb-4">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary-themed">
                  {matchingSubjects.length > 0 
                    ? `Your strengths in ${matchingSubjects.join(', ')} align well with this career. This path connects to your goal of becoming a ${memory.careerGoal}.`
                    : `Exploring diverse career options builds a broader perspective. Consider how ${career.title} could complement your ${memory.careerGoal} journey.`
                  }
                </p>
              </div>
            </div>
          )}

          {/* Salary Range */}
          <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-800/30 rounded-xl">
            {[
              { label: "Entry Level", value: career.salaryRange.entry, color: "text-cyan-400" },
              { label: "Mid Career", value: career.salaryRange.mid, color: "text-indigo-400" },
              { label: "Senior Level", value: career.salaryRange.senior, color: "text-emerald-400" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="glass-card p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">About This Career</h2>
          <p className="text-secondary-themed leading-relaxed">{career.description}</p>
          <h3 className="font-bold mt-4 mb-2 text-gray-200">A Day in the Life</h3>
          <p className="text-secondary-themed leading-relaxed">{career.dailyLife}</p>
        </div>

        {/* Required Subjects */}
        <div className="glass-card p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">Required Subjects</h2>
          <div className="flex flex-wrap gap-2">
            {career.requiredSubjects.map((s, i) => {
              const isStrength = studentStrengths.some(str => str.toLowerCase().includes(s.toLowerCase().slice(0, 4)));
              return (
                <span key={i} className={`badge ${isStrength ? 'badge-success' : 'badge-primary'}`}>
                  {s} {isStrength && '✓'}
                </span>
              );
            })}
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="glass-card overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-indigo-400">{section.icon}</span>
                  <span className="font-bold">{section.title}</span>
                </div>
                {expandedSection === section.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-gray-800/50 pt-4">
                      {section.id === "roadmap" && (
                        <div className="space-y-4">
                          {career.roadmap.map((step, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-sm font-bold">{step.step}</div>
                                {i < career.roadmap.length - 1 && <div className="w-0.5 flex-1 bg-gray-800 mt-2" />}
                              </div>
                              <div className="flex-1 pb-4">
                                <h4 className="font-bold text-indigo-300">{step.title}</h4>
                                <p className="text-gray-400 text-sm mt-1">{step.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === "exams" && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-300 mb-2">Key Exams</h4>
                          {career.keyExams.map((exam, i) => (
                            <div key={i} className="p-4 bg-gray-800/30 rounded-xl">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-cyan-300">{exam.name}</span>
                                <span className="badge badge-warning text-xs">{exam.difficulty}</span>
                              </div>
                              <p className="text-sm text-gray-400">{exam.description}</p>
                            </div>
                          ))}
                          {career.alternativeExams.length > 0 && (
                            <>
                              <h4 className="font-semibold text-gray-300 mt-4 mb-2">Alternative Entry Points</h4>
                              {career.alternativeExams.map((exam, i) => (
                                <div key={i} className="p-3 bg-gray-800/20 rounded-lg">
                                  <span className="font-medium text-gray-200">{exam.name}</span>
                                  <p className="text-sm text-gray-500">{exam.description}</p>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      )}

                      {section.id === "perks" && (
                        <ul className="space-y-2">
                          {career.perks.map((perk, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <Star className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{perk}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.id === "risks" && (
                        <ul className="space-y-2">
                          {career.risks.map((risk, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.id === "impact" && (
                        <p className="text-gray-300 leading-relaxed">{career.socialImpact}</p>
                      )}

                      {section.id === "eligibility" && (
                        <div className="space-y-3">
                          {Object.entries(career.eligibility).map(([key, value]) => (
                            <div key={key} className="flex items-start gap-3">
                              <span className="text-xs font-bold text-gray-500 uppercase w-32 flex-shrink-0 pt-0.5">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                              <span className="text-gray-300 text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
