import { useState } from "react";
import api from "../utils/api";

export default function QuizView({ fileId }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  // NEW: Difficulty + Number of Questions
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(10);

  async function generateQuiz() {
    if (!fileId) return;

    setLoading(true);
    setQuiz(null);

    try {
      const res = await api.post("/quiz", {
        fileId,
        difficulty,
        numQuestions: Number(numQuestions),
      });

      setQuiz(res.data);
    } catch (err) {
      console.error("Quiz Error:", err);
    }

    setLoading(false);
  }

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="flex gap-6 mb-6 items-center">
        <div>
          <label className="font-semibold block mb-1">Difficulty</label>
          <select
            className="border p-2 rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-1">
            Number of Questions
          </label>
          <select
            className="border p-2 rounded"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>

        <button
          onClick={generateQuiz}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {/* Quiz Output */}
      {quiz && quiz.questions && (
        <div className="space-y-6">
          {quiz.questions.map((q, index) => (
            <div
              key={q.id}
              className="p-4 border rounded-xl bg-gray-50 shadow-sm"
            >
              <h3 className="font-bold text-lg mb-2">
                {index + 1}. {q.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className="p-3 border rounded-md cursor-pointer bg-white hover:bg-blue-50 transition"
                  >
                    <span className="font-semibold mr-2">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </div>
                ))}
              </div>

              {/* Explanation (Optional) */}
              {q.explanation && (
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {!quiz && !loading && (
        <p className="text-gray-500 text-center mt-10">
          Click <strong>Generate Quiz</strong> to create questions.
        </p>
      )}
    </div>
  );
}
