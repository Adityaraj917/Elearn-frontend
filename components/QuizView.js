import { useState } from "react";
import api from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ChevronRight, Trophy, RefreshCw } from "lucide-react";
import classNames from "classnames";

export default function QuizView({ fileId }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  // Configuration
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);

  // Game State
  const [answers, setAnswers] = useState({}); // { qId: optionIndex }
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  async function generateQuiz() {
    if (!fileId) return;

    setLoading(true);
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);

    try {
      // FIX: Changed endpoint from /quiz to /api/quiz
      const res = await api.post("/api/quiz", {
        fileId,
        difficulty,
        numQuestions: Number(numQuestions),
      });

      setQuiz(res.data);
    } catch (err) {
      console.error("Quiz Error:", err);
      if (err.response && err.response.status === 404) {
        alert("API Endpoint not found. Please verify backend routes.");
      } else {
        alert("Failed to generate quiz. Please try again.");
      }
    }

    setLoading(false);
  }

  const handleOptionSelect = (qId, optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!quiz || !quiz.questions) return;

    let calculatedScore = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (!quiz && !loading) {
    return (
      <div className="bg-white dark:bg-[#131627] p-6 lg:p-8 rounded-3xl border border-gray-100 dark:border-white/[0.06] shadow-card">
        <h2 className="font-display text-2xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
          <Trophy className="text-accent-gold" /> Generate Quiz
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="font-semibold block mb-2 text-slate-700 dark:text-slate-300 text-sm">Difficulty</label>
            <select
              className="w-full bg-white dark:bg-[#0F1120] border border-gray-200 dark:border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-brand-400/20 focus:border-brand-400 text-slate-800 dark:text-white appearance-none px-4 py-3 transition-colors"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy (Beginner)</option>
              <option value="medium">Medium (Standard)</option>
              <option value="hard">Hard (Advanced)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2 text-slate-700 dark:text-slate-300 text-sm">
              Number of Questions
            </label>
            <select
              className="w-full bg-white dark:bg-[#0F1120] border border-gray-200 dark:border-white/10 p-3 rounded-xl focus:ring-2 focus:ring-brand-400/20 focus:border-brand-400 text-slate-800 dark:text-white appearance-none px-4 py-3 transition-colors"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
            >
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
              <option value="15">15 Questions</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={generateQuiz}
          className="w-full bg-gradient-to-r from-brand-400 to-accent-teal text-white font-semibold py-4 rounded-2xl shadow-glow-sm hover:shadow-glow-md transition-all duration-300 flex justify-center items-center gap-2"
        >
          Generate Quiz
        </motion.button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4 py-12">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white dark:bg-[#131627] rounded-3xl p-6 border border-gray-100 dark:border-white/[0.06]">
            <div className="h-5 w-48 rounded-xl bg-gray-100 dark:bg-white/5 shimmer mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((o) => (
                <div key={o} className="h-12 w-full rounded-xl bg-gray-100 dark:bg-white/5 shimmer" />
              ))}
            </div>
          </div>
        ))}
        <p className="text-center text-sm text-brand-400 animate-pulse font-medium">
          ✦ Generating your personalized quiz...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Score Header */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 border border-green-200 dark:border-green-500/20 rounded-3xl text-center"
        >
          <h2 className="text-3xl font-display font-bold text-green-800 dark:text-green-400 mb-2">Quiz Completed!</h2>
          <p className="text-xl text-green-700 dark:text-green-300">
            You scored <span className="font-extrabold text-4xl mx-2">{score} / {quiz.questions.length}</span>
          </p>
          <button
            onClick={generateQuiz}
            className="mt-4 text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 font-semibold underline"
          >
            Take Another Quiz
          </button>
        </motion.div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        <AnimatePresence>
          {quiz.questions.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCorrect = submitted && answers[q.id] === q.correctIndex;
            const isWrong = submitted && isAnswered && answers[q.id] !== q.correctIndex;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={classNames(
                  "p-6 rounded-3xl border transition-all duration-300",
                  {
                    "bg-white dark:bg-[#131627] border-gray-100 dark:border-white/[0.06] shadow-card": !submitted,
                    "bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/20": submitted && isCorrect,
                    "bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/20": submitted && isWrong,
                    "bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/[0.06]": submitted && !isAnswered
                  }
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white flex-1">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-accent-teal text-white text-xs font-bold mr-2">
                      {index + 1}
                    </span>
                    {q.question}
                  </h3>
                  {submitted && isCorrect && <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" />}
                  {submitted && isWrong && <XCircle className="text-red-500 w-6 h-6 flex-shrink-0" />}
                </div>

                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const isSelected = answers[q.id] === i;
                    const isCorrectOption = q.correctIndex === i;

                    let optionClass = "border-gray-200 dark:border-white/[0.08] hover:bg-brand-50 dark:hover:bg-brand-400/5 hover:border-brand-300 dark:hover:border-brand-400/30 text-slate-700 dark:text-slate-300";

                    if (isSelected && !submitted) {
                      optionClass = "bg-brand-50 dark:bg-brand-400/10 border-brand-400 ring-1 ring-brand-400 text-brand-700 dark:text-brand-300";
                    }

                    if (submitted) {
                      if (isCorrectOption) {
                        optionClass = "bg-green-50 dark:bg-green-500/10 border-green-400 dark:border-green-500/30 ring-1 ring-green-400 text-green-700 dark:text-green-400 font-medium";
                      } else if (isSelected && !isCorrectOption) {
                        optionClass = "bg-red-50 dark:bg-red-500/10 border-red-400 dark:border-red-500/30 text-red-700 dark:text-red-400";
                      } else {
                        optionClass = "opacity-40 border-gray-200 dark:border-white/[0.04] text-slate-500 dark:text-slate-500";
                      }
                    }

                    return (
                      <div
                        key={i}
                        onClick={() => handleOptionSelect(q.id, i)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-3 ${optionClass}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${isSelected || (submitted && isCorrectOption)
                            ? "bg-white border-transparent text-slate-800 dark:text-slate-900"
                            : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-slate-500 dark:text-slate-400"
                          }`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-4 bg-brand-50 dark:bg-brand-400/10 text-brand-700 dark:text-brand-300 rounded-xl text-sm border border-brand-200 dark:border-brand-400/20"
                  >
                    <strong>Explanation:</strong> {q.explanation}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!submitted && quiz.questions.length > 0 && (
        <div className="mt-8 text-center pb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < quiz.questions.length}
            className="bg-gradient-to-r from-brand-400 to-accent-teal disabled:opacity-40 disabled:cursor-not-allowed text-white text-lg font-bold px-10 py-4 rounded-2xl shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
          >
            Submit Quiz
          </motion.button>
          {Object.keys(answers).length < quiz.questions.length && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Answer all questions to submit
            </p>
          )}
        </div>
      )}
    </div>
  );
}
