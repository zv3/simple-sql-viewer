/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/*.{ts,vue}",
  ],

  darkMode: 'class',

  theme: {
    extend: {},
  },

  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
}
