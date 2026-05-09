const isGuestMode = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("saarthi_mode") === "guest";
};

const getLocalData = (key) => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setLocalData = (key, data) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const getGuestId = () => {
  if (typeof window === "undefined") return "guest";
  let gid = localStorage.getItem("saarthi_guest_id");
  if (!gid) {
    gid = "guest_" + Date.now();
    localStorage.setItem("saarthi_guest_id", gid);
  }
  return gid;
};

export const logActivity = async (userId, type, metadata = {}) => {
  if (isGuestMode()) {
    const logs = getLocalData("activity_logs");
    logs.push({ userId: getGuestId(), type, metadata, timestamp: new Date().toISOString() });
    setLocalData("activity_logs", logs);
    console.log("[Guest] Activity logged locally:", type);
  } else {
    try {
      const res = await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "activity", userId, data: { type, metadata } })
      });
      const data = await res.json();
      console.log("[Login] Activity tracking API response:", data);
    } catch (err) {
      console.error("Failed to log activity via API:", err);
    }
  }
};

export const savePerformance = async (userId, performanceData) => {
  if (isGuestMode()) {
    const perfs = getLocalData("performance");
    perfs.push({ userId: getGuestId(), ...performanceData, createdAt: new Date().toISOString() });
    setLocalData("performance", perfs);
    console.log("[Guest] Performance saved locally.");
  } else {
    try {
      const res = await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "performance", userId, data: performanceData })
      });
      console.log("[Login] Performance API response:", await res.json());
    } catch (err) {
      console.error("Failed to save performance via API:", err);
    }
  }
};

export const startSession = async (userId) => {
  const sessionId = `sess_${Date.now()}`;
  
  if (isGuestMode()) {
    const sessions = getLocalData("sessions");
    sessions.push({ sessionId, userId: getGuestId(), startTime: new Date().toISOString() });
    setLocalData("sessions", sessions);
    console.log("[Guest] Session started locally:", sessionId);
  } else {
    try {
      await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "startSession", userId, data: { sessionId } })
      });
      console.log("[Login] Session started via API:", sessionId);
    } catch (err) {
      console.error("Failed to start session via API:", err);
    }
  }
  return sessionId;
};

export const endSession = async (userId, sessionId, durationObj) => {
  if (!sessionId) return;
  
  const endTime = new Date().toISOString();
  
  if (isGuestMode()) {
    const sessions = getLocalData("sessions");
    const idx = sessions.findIndex(s => s.sessionId === sessionId);
    if (idx > -1) {
      sessions[idx].endTime = endTime;
      sessions[idx].duration = durationObj.duration;
      setLocalData("sessions", sessions);
      console.log("[Guest] Session ended locally:", sessionId);
    }
  } else {
    try {
      // Use navigator.sendBeacon for reliable beforeunload delivery if needed, 
      // but fetch with keepalive is standard for modern browsers
      await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "endSession", userId, data: { sessionId, endTime, duration: durationObj.duration } }),
        keepalive: true
      });
      console.log("[Login] Session ended via API:", sessionId);
    } catch (err) {
      console.error("Failed to end session via API:", err);
    }
  }
};
