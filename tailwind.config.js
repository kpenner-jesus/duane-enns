/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fdf8f0",
        terracotta: "#c4622d",
        "terracotta-dark": "#a85225",
        forest: "#2d4a2d",
        "forest-light": "#3d6a3d",
        ink: "#1a1a14",
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
