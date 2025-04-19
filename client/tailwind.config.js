/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "#AAAAAA",
        background: "#FFFFFF",
        foreground: "#000000",
        primary: {
          DEFAULT: "#007BFF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#6C757D",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#FF0000",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#6C757D",
        },
        accent: {
          DEFAULT: "#F8F9FA",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        input: "#E9ECEF",
        ring: "#007BFF"
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
} 