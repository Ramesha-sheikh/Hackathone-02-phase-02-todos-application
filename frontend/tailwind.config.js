/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          50: '#f0f0f0',
          100: '#e0e0e0',
          200: '#c0c0c0',
          300: '#a0a0a0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#2d2d2d',
          800: '#1f1f1f',
          900: '#121212',
        },
        premium: {
          gold: '#D4AF37',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
          black: '#0a0a0a',
          deepBlue: '#0f172a',
          charcoal: '#1e293b',
        },
        darkTheme: {
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9',
          primary: '#38bdf8',
          secondary: '#60a5fa',
        }
      },
      boxShadow: {
        'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}