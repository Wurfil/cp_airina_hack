/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    './pages/**/*.{vue}',
    './components/**/*.{vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9525c2',
        secondary: '#f1f3f5',
      },
    },
    screens: {
      desktop: '1440px',
      laptop: '1000px',
      tablet: '640px',
      mobile: '320px',
    },
  },
  plugins: [],
};
