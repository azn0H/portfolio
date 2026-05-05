/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          dark: '#080C14',
          DEFAULT: '#0B1020',
          surface: '#0F172A',
          card: '#141E30',
          light: '#F8F9FF',
          'light-surface': '#EEEEF8',
          'light-card': '#FFFFFF',
        },
        accent: {
          cyan: '#22D3EE',
          indigo: '#818CF8',
          violet: '#A78BFA',
          emerald: '#34D399',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.15)',
        'glow-indigo': '0 0 30px rgba(129, 140, 248, 0.2)',
        'glow-violet': '0 0 30px rgba(167, 139, 250, 0.15)',
        'card': '0 4px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
