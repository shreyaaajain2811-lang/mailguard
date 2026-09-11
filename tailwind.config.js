/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0a0e17",
          panel: "#0f1420",
          panel2: "#131a29",
          border: "#1f2937",
          borderLight: "#26314a",
        },
        accent: {
          blue: "#2f7bff",
          blueLight: "#5b9bff",
          violet: "#8b5cf6",
        },
        severity: {
          critical: "#ef4444",
          high: "#f87171",
          medium: "#f59e0b",
          low: "#facc15",
          safe: "#22c55e",
          info: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(0,0,0,0.4)",
        elevated: "0 8px 24px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
