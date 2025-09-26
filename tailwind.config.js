/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-blue': '#00d4ff',
        'space-green': '#00ff88',
        'space-purple': '#8b5cf6',
        'space-gray': {
          300: '#cbd5e1',
          400: '#94a3b8',
        },
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(180deg, #030410 0%, #000814 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.4)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.4)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
};


