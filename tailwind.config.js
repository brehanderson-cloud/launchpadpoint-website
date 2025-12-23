/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // V9 Indigo/Clean Color Palette
      colors: {
        primary: {
          navy: '#02182B',   // Main headers, nav
        },
        accent: {
          teal: '#008E97',   // Success, matching, highlights
          orange: '#F26D21', // Urgency, gaps, requirements
        },
        indigo: {
          text: '#4338CA',   // Deep links, guide text
          bg: '#EEF2FF',     // Subtle backgrounds
        },
        success: {
          green: '#22c55e',
          bg: '#f0fdf4',
        },
        bg: {
          body: '#F5F7FA',   // Main background
          surface: '#ffffff', // Cards, panels
        },
        border: {
          DEFAULT: '#E2E8F0', // Standard borders
        },
        text: {
          muted: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],    // UI Font
        serif: ['Georgia', 'serif'],      // Resume Preview Font
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0,0,0,0.05)',
        'panel': '0 20px 50px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
