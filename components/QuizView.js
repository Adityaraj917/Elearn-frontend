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
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Trophy className="text-yellow-500" /> Generate Quiz
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="font-semibold block mb-2 text-gray-700">Difficulty</label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy (Beginner)</option>
              <option value="medium">Medium (Standard)</option>
              <option value="hard">Hard (Advanced)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2 text-gray-700">
              Number of Questions
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
            >
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
              <option value="15">15 Questions</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateQuiz}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-95 flex justify-center items-center gap-2"
        >
          Generate Quiz
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        <RefreshCw className="w-10 h-10 animate-spin text-purple-600 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-600">Generating your personalized quiz...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Score Header */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-2">Quiz Completed!</h2>
          <p className="text-xl text-green-700">
            You scored <span className="font-extrabold text-4xl mx-2">{score} / {quiz.questions.length}</span>
          </p>
          <button
            onClick={generateQuiz}
            className="mt-4 text-green-700 hover:text-green-900 font-semibold underline"
          >
            Take Another Quiz
          </button>
        </motion.div>
      )}

      {/* Questions List */}
      <div className="space-y-8">
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
                  "p-6 rounded-2xl border transition-all duration-300",
                  {
                    "bg-white border-gray-200 shadow-sm": !submitted,
                    "bg-green-50 border-green-300 shadow-md": submitted && isCorrect,
                    "bg-red-50 border-red-300 shadow-md": submitted && isWrong,
                    "bg-gray-50 border-gray-300": submitted && !isAnswered
                  }
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-800 flex-1">
                    <span className="text-purple-600 mr-2">#{index + 1}</span>
                    {q.question}
                  </h3>
                  {submitted && isCorrect && <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0" />}
                  {submitted && isWrong && <XCircle className="text-red-500 w-6 h-6 flex-shrink-0" />}
                </div>

                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const isSelected = answers[q.id] === i;
                    const isCorrectOption = q.correctIndex === i;

                    let optionClass = "border-gray-200 hover:bg-purple-50 hover:border-purple-300";

                    if (isSelected) {
                      optionClass = "bg-purple-100 border-purple-500 ring-1 ring-purple-500";
                    }

                    if (submitted) {
                      if (isCorrectOption) {
                        optionClass = "bg-green-100 border-green-600 ring-1 ring-green-600 text-green-900 font-medium";
                      } else if (isSelected && !isCorrectOption) {
                        optionClass = "bg-red-100 border-red-500 text-red-900";
                      } else {
                        optionClass = "opacity-50 grayscale";
                      }
                    }

                    return (
                      <div
                        key={i}
                        onClick={() => handleOptionSelect(q.id, i)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${optionClass}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${isSelected || (submitted && isCorrectOption)
                            ? "bg-white border-transparent text-black"
                            : "bg-gray-100 text-gray-500"
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
                    className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100"
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
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < quiz.questions.length}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white text-lg font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            Submit Quiz
          </button>
          {Object.keys(answers).length < quiz.questions.length && (
            <p className="text-sm text-gray-500 mt-2">
              Answer all questions to submit
            </p>
          )}
        </div>
      )}
    </div>
  );
}
