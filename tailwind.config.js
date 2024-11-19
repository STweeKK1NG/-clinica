/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e08081',
        secondary: '#09a1ad',
        dark: '#1d1d1b',
      },
    },
  },
  plugins: [],
};