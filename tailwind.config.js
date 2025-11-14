export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff6b6b",
        secondary: "#ff8e8e",
      },
      animation: {
        shine: "shine 3s infinite",
        fadeInUp: "fadeInUp 0.8s forwards",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        shine: {
          "100%": { left: "100%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
