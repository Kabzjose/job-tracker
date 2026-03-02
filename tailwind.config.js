export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: "#0f172a",
          DEFAULT: "#1e293b",
          light: "#334155",
        },
        amber: {
          DEFAULT: "#f59e0b",
          dark: "#d97706",
        }
      }
    },
  },
  plugins: [],
}