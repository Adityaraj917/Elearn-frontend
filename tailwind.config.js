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
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#EEF0FF',
          100: '#DDE1FF',
          200: '#B3BBFF',
          300: '#8B93FF',
          400: '#6C63FF',
          500: '#5B54E8',
          600: '#4F46E5',
          700: '#3D37B5',
          800: '#2D2A85',
          900: '#1E1B5E',
        },
        accent: {
          teal: '#00C9A7',
          coral: '#FF6B6B',
          gold: '#FFD93D',
          purple: '#8B5CF6',
          blue: '#3B82F6',
        },
        surface: {
          dark: '#0B0D17',
          'dark-card': '#131627',
          'dark-elevated': '#1A1D35',
          light: '#F7F8FC',
          'light-card': '#FFFFFF',
          'light-elevated': '#F0F1F8',
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(108, 99, 255, 0.15)',
        'glow-md': '0 0 30px rgba(108, 99, 255, 0.2)',
        'glow-lg': '0 0 50px rgba(108, 99, 255, 0.25)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'elevated': '0 12px 48px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6C63FF, #00C9A7)',
        'gradient-warm': 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
        'gradient-cool': 'linear-gradient(135deg, #6C63FF, #3B82F6)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(108, 99, 255, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0, 201, 167, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.06) 0px, transparent 50%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      animation: {
        'shine': 'shine 2s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'counter': 'counter 1.5s ease-out forwards',
      },
      keyframes: {
        shine: {
          '0%': { left: '-75%' },
          '100%': { left: '125%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '50%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0.7' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
