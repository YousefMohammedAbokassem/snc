/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'], // سيصبح الخط الافتراضي للموقع
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "1280px",
          "2xl": "1440px",
          "3xl": "1600px",
        },
      },
    },
  },
  plugins: [],
};