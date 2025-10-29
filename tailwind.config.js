/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "cyber-blue": "#00d9ff",
        "neon-purple": "#ff006e",
        "matrix-green": "#ffd60a",
        "dark-bg": "#0a0e27",
        "card-bg": "#1a1f3a",
        "slot-bg": "#151a33",
      },
      animation: {
        "match-pulse": "match-pulse 0.6s ease-in-out",
        shake: "shake 0.5s ease-in-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        "match-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px rgba(0, 217, 255, 0.5), 0 0 10px rgba(255, 0, 110, 0.3)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(0, 217, 255, 0.8), 0 0 30px rgba(255, 0, 110, 0.5)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
