import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF", // White
        foreground: "#1C1C1E", // Dark Gray for text
        accent: "#007AFF", // Apple Blue
        "apple-blue": "#007AFF",
        "apple-green": "#34C759",
        "apple-orange": "#FF9500",
        "apple-red": "#FF3B30",
        "apple-yellow": "#FFCC00",
        "gray-light": "#E5E5EA",
        "gray-mid": "#8E8E93",
        "gray-dark2": "#3A3A3C",
        "gray-dark": "#1C1C1E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
