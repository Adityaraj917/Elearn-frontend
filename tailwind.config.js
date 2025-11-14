/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        accent: {
          teal: '#14b8a6',
          purple: '#8b5cf6'
        }
      },
      boxShadow: {
        soft: '0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(20, 184, 166, 0.1)'
      }
    },
  },
  plugins: [],
};
