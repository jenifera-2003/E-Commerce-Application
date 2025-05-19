/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bangers: ['"Bangers"', 'cursive'],
      },
      colors: {
        brand: {
          DEFAULT: "#1f1f1f",
          light: "#f9f9f9",
          accent: "#e0c18d",
        },
      },
      transitionProperty: {
        scale: "transform",
      },
      animation: {
        fade: "fadeIn 1s ease-in-out",
        "ping-once": "pingOnce 0.4s ease-in-out",
        zoomIn: "zoomIn 0.5s ease-out forwards", // Added zoomIn animation
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pingOnce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
        zoomIn: { // Added keyframes for zoomIn
          "0%": {
            transform: "scale(0)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
      },
      boxShadow: {
        comic: "6px 6px 0px #facc15", // Tailwind yellow-400
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
