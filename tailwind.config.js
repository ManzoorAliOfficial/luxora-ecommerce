/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF8F5',
        cream: '#FAF8F5',
        champagne: '#EDE8E0',
        luxury: '#1A1A1A',
        muted: '#6B6B6B',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E5D29A',
          dark: '#B39640',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'gold': '0 4px 16px rgba(201, 168, 76, 0.2)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        scroll: 'scroll 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-25%)' },
        },
      },
    },
  },
  plugins: [],
}