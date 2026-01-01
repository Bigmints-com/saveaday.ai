/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx,json}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0d1117",
        "surface-raise": "#161b22",
        accent: "#7ee787",
        "accent-emphasis": "#4cc3a7",
        brand: {
          teal: "#1BC3AD",
          blue: "#3a8bff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Mona Sans", "ui-sans-serif", "system-ui"],
        display: ["var(--font-sans)", "Mona Sans", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "beam-grid":
          "radial-gradient(circle at 20% 20%, rgba(27, 195, 173, 0.15), transparent 55%), radial-gradient(circle at 80% 0%, rgba(27, 195, 173, 0.1), transparent 45%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
