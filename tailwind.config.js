/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandGreen: "#04544f", // custom color name
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Inter font as default
      },
    },
  },
  plugins: [],
};
