/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryText: "#063b31",
        primaryBackground: "#f0aa6e",
      }
    },
  },
  plugins: [],
}