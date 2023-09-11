import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [ "'Poppins', sans-serif", ...defaultTheme.fontFamily.sans ],
      }
    },
  },
  plugins: [],
};
