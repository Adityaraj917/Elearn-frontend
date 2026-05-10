import axios from "axios";

// Smart environment switching:
// In production, it falls back to the Render URL if NEXT_PUBLIC_API_URL is missing.
// In development, it defaults to http://localhost:4000.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === "production" ? "https://elearn-backend-rnfr.onrender.com" : "http://localhost:4000");

// Always point to the Express backend (port 4000) where real Gemini AI lives.
// The Next.js API routes (pages/api/*) are only used for Firestore logging.
const api = axios.create({
  baseURL: API_URL,
  timeout: 120000, // 2 min timeout for AI calls
});

export default api;
