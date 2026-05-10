// Proxy quiz requests to the Express backend (real Gemini AI)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || (process.env.NODE_ENV === "production" ? "https://elearn-backend-rnfr.onrender.com" : "http://localhost:4000");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const response = await fetch(`${BACKEND_URL}/api/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Quiz proxy error:", error);
    return res.status(502).json({ error: "Failed to connect to AI backend. Make sure Express server is running on port 4000." });
  }
}
