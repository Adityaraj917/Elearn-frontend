import { db } from "../../firebase/config";
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  const { action, userId, data } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    switch (action) {
      case "activity":
        await addDoc(collection(db, "activity_logs"), {
          userId,
          type: data.type,
          timestamp: serverTimestamp(),
          metadata: data.metadata || {}
        });
        break;
      
      case "performance":
        await addDoc(collection(db, "performance"), {
          userId,
          quizId: data.quizId || `quiz_${Date.now()}`,
          score: data.score,
          totalQuestions: data.totalQuestions,
          weakTopics: data.weakTopics || [],
          strongTopics: data.strongTopics || [],
          timeTaken: data.timeTaken || 0,
          createdAt: serverTimestamp()
        });
        break;

      case "startSession":
        await setDoc(doc(db, "sessions", data.sessionId), {
          sessionId: data.sessionId,
          userId,
          startTime: serverTimestamp(),
        });
        break;

      case "endSession":
        await setDoc(doc(db, "sessions", data.sessionId), {
          endTime: serverTimestamp(),
          duration: data.duration
        }, { merge: true });
        break;

      default:
        return res.status(400).json({ error: "Invalid tracking action" });
    }
    
    return res.status(200).json({ success: true, action, userId });
  } catch (error) {
    console.error("Tracking error:", error);
    return res.status(500).json({ error: "Internal tracking error" });
  }
}
