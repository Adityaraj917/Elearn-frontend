/**
 * Voice Mentor — Lightweight Speech Synthesis
 * 
 * Uses the browser's built-in Web Speech API to read mentor insights aloud.
 * No external libraries. Works on Chrome, Edge, Safari, Firefox.
 */

let currentUtterance = null;

/**
 * Speak a mentor insight text aloud.
 * @param {string} text - The text to speak
 * @param {'en'|'hi'} lang - Language code
 * @returns {boolean} - Whether speech started successfully
 */
export function speakInsight(text, lang = 'en') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;

  // Stop any currently playing speech
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Configure for a mentor-like, conversational tone
  utterance.rate = lang === 'hi' ? 0.9 : 0.95;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Select voice based on language
  const voices = window.speechSynthesis.getVoices();
  
  if (lang === 'hi') {
    const hindiVoice = voices.find(v => 
      v.lang.startsWith('hi') || v.lang.includes('hi-IN')
    );
    if (hindiVoice) {
      utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
    } else {
      // Fallback: speak English if Hindi not available
      utterance.lang = 'en-US';
      const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) ||
                      voices.find(v => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    }
  } else {
    utterance.lang = 'en-US';
    // Prefer a natural-sounding English voice
    const preferred = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Microsoft Zira'))
    ) || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}

/**
 * Stop any currently playing speech.
 */
export function stopSpeaking() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

/**
 * Check if speech is currently playing.
 * @returns {boolean}
 */
export function isSpeaking() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  return window.speechSynthesis.speaking;
}

/**
 * Check if Hindi voice is available on this device.
 * @returns {boolean}
 */
export function isHindiAvailable() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  const voices = window.speechSynthesis.getVoices();
  return voices.some(v => v.lang.startsWith('hi') || v.lang.includes('hi-IN'));
}

/**
 * Get available mentor voice languages.
 * @returns {Array<{code: string, label: string, available: boolean}>}
 */
export function getAvailableLanguages() {
  const langs = [
    { code: 'en', label: 'EN', available: true },
    { code: 'hi', label: 'हि', available: isHindiAvailable() },
  ];
  return langs;
}

/**
 * Register a callback for when speech ends.
 * @param {Function} callback
 */
export function onSpeechEnd(callback) {
  if (currentUtterance) {
    currentUtterance.onend = callback;
  }
}

/**
 * Preload voices (Chrome lazy-loads them).
 * Call this early in app lifecycle.
 */
export function preloadVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.getVoices();
  // Chrome fires voiceschanged event when voices are loaded
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
