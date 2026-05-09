import axios from "axios";

// Always point to the Express backend (port 4000) where real Gemini AI lives.
// The Next.js API routes (pages/api/*) are only used for Firestore logging.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000",
  timeout: 120000, // 2 min timeout for AI calls
});

export default api;
