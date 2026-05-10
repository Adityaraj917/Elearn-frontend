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

// ── Voice Input (Speech Recognition) ──────────────────

let recognition = null;

/**
 * Check if voice input is supported in this browser.
 */
export function isListeningSupported() {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Start listening for voice input.
 * @param {Object} options
 * @param {Function} options.onResult — called with final transcript string
 * @param {Function} options.onInterim — called with interim transcript string (live)
 * @param {Function} options.onEnd — called when listening stops
 * @param {Function} options.onError — called with error
 * @param {'en-IN'|'hi-IN'} options.lang — recognition language
 * @returns {boolean} — whether listening started
 */
export function startListening({ onResult, onInterim, onEnd, onError, lang = 'en-IN' } = {}) {
  if (!isListeningSupported()) return false;

  // Stop any existing session
  stopListening();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = lang;
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    let interim = '';
    let final = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        final += transcript;
      } else {
        interim += transcript;
      }
    }
    if (interim && onInterim) onInterim(interim);
    if (final && onResult) onResult(final);
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  try {
    recognition.start();
    return true;
  } catch (e) {
    if (onError) onError(e.message);
    return false;
  }
}

/**
 * Stop listening for voice input.
 */
export function stopListening() {
  if (recognition) {
    try { recognition.stop(); } catch(e) {}
    recognition = null;
  }
}

/**
 * Check if currently listening.
 */
export function isListening() {
  return recognition !== null;
}
