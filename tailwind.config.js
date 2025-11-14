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
      fontFamily: {
        sans: ["Raleway", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.1em",
        "ultra-wide": "0.15em",
      },
      colors: {
        "cyber-blue": "#00d9ff",
        "neon-purple": "#ff006e",
        "matrix-green": "#ffd60a",
        "neon-mint": "#00ff9f",
        "hot-pink": "#ff3366",
        "dark-bg": "#0a0e27",
        "dark-bg-deep": "#050814",
        "card-bg": "#1a1f3a",
        "slot-bg": "#151a33",
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(0, 217, 255, 0.5)",
        "glow-primary-intense":
          "0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 217, 255, 0.4)",
        "glow-accent": "0 0 20px rgba(255, 0, 110, 0.5)",
        "glow-accent-intense":
          "0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(255, 0, 110, 0.4)",
        "glow-highlight": "0 0 40px rgba(255, 214, 10, 0.4)",
        "glow-success":
          "0 0 25px rgba(0, 255, 159, 0.6), 0 0 50px rgba(0, 255, 159, 0.3)",
        "glow-error":
          "0 0 25px rgba(255, 51, 102, 0.6), 0 0 50px rgba(255, 51, 102, 0.3)",
        "glow-card": "inset 0 0 20px rgba(0, 217, 255, 0.3)",
        "glow-card-hover":
          "0 0 25px rgba(0, 217, 255, 0.6), 0 0 50px rgba(0, 217, 255, 0.3), inset 0 0 20px rgba(0, 217, 255, 0.2)",
      },
      animation: {
        "match-pulse": "match-pulse 0.6s ease-in-out",
        shake: "shake 0.5s ease-in-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "grid-move": "grid-move 20s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        "particle-float": "particle-float 3s ease-out forwards",
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
        "grid-move": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(50px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "particle-float": {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100px) scale(0)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
