/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        chakraPetch: ["var(--font-chakra-petch)", "sans-serif"],
      },
      colors: {
        "wenode-yellow": "#FFD200",
        "wenode-yellow-hover": "#EAB308",
        "text-secondary": "#787878",
        "ecosystem-card-bg": "#0d0d0d",
        "ecosystem-ui-border": "#2B2B2B",
        "lottie-icon-bg": "#0d0d0d",
        "lottie-icon-border": "#404040",
        "feature-text-muted": "#808080",
        "header-bg": "#0A0A0A",
        "header-border": "#474747",
        "card1-border": "#2C2C2C",
        "card-interactive-border": "#313131",
        "card-overlay-default": "rgba(0,0,0,0.6)",
        "card-overlay-hover": "rgba(0,0,0,0.8)",
        "arrow-bg-default": "#1a1a1a",
        "main-page-text-light": "#D4D4D4",
      },
      zIndex: {
        1000: "1000",
        99: "99",
        100: "100",
      },

      letterSpacing: {
        "em-008": "0.08em",
      },
      lineHeight: {
        "1_4": "1.4",
      },
    },
  },
  plugins: [],
};
