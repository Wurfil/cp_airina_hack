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
        primary: '#4289f5',
        secondary: '#eaebed',
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
