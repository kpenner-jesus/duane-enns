/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#002349",
        "navy-light": "#003366",
        "navy-dark": "#001a36",
        gold: "#c5a46d",
        "gold-light": "#d4b87e",
        "gold-dark": "#a88a55",
        cream: "#f8f6f2",
        ink: "#1a1a2e",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        funnel: ["Playfair Display", "Georgia", "serif"],
        "funnel-body": ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
