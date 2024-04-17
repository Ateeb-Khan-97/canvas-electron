import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'checkered': 'repeating-conic-gradient(theme(backgroundColor.zinc.600) 0% 25%, transparent 0% 50%)'
      },
      keyframes: {
        appear: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        popup: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        appear: 'appear 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        popup: 'popup 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
