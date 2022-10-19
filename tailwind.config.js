/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-bg": "#edf2f6",
        "main-dark-bg": "#000",
        "secondary-dark-bg": "#111114",
        "light-gray": "#F7F7F7",
        "half-transparent": "#f2f6fc",
        "blue-bg": "#216fed",
      },
      colors: {
        "main-color": "#0c1119",
        "secondary-color": "#96a0af",
        "dark-gray": "#737b8b",
        "dark-color": "#333e4b",
      },
    },
  },
  plugins: [
    // require("tailwind-scrollbar-hide"),
    // require("flowbite/plugin"),
    // require("@tailwindcss/line-clamp"),
  ],
};
