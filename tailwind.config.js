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
      boxShadow: {
        card: "0 1px 3px rgba(0,35,73,0.04), 0 8px 24px rgba(0,35,73,0.06)",
        "card-hover":
          "0 4px 12px rgba(0,35,73,0.06), 0 16px 40px rgba(0,35,73,0.10)",
        "btn-gold": "0 4px 16px rgba(197,164,109,0.30)",
        "btn-gold-hover": "0 8px 28px rgba(197,164,109,0.40)",
      },
      letterSpacing: {
        label: "0.12em",
      },
    },
  },
  plugins: [],
};
