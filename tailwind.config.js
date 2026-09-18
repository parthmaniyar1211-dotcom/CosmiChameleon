/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: '#030305',
          900: '#06070a',
          850: '#0a0b10',
          800: '#0f1118',
          700: '#161822',
          600: '#1f2230',
          500: '#2e3346',
        },
        surface: {
          glass: 'rgba(15, 17, 24, 0.65)',
          'glass-elevated': 'rgba(22, 24, 34, 0.8)',
          'glass-border': 'rgba(255, 255, 255, 0.08)',
          'glass-border-hover': 'rgba(255, 255, 255, 0.2)',
        },
        accent: {
          cyan: '#38bdf8',
          violet: '#818cf8',
          emerald: '#34d399',
          amber: '#fbbf24',
        }
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
