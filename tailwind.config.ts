import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1440px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        volt: {
          clay: "#c46a41",
          stone: "#8d8f88",
          carbon: "#111111",
          fog: "#f4f4f1"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Arial Black", "Impact", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(0, 0, 0, 0.12)",
        lift: "0 18px 50px rgba(0, 0, 0, 0.18)"
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)"
          }
        },
        ripple: {
          "0%": {
            transform: "scale(0)",
            opacity: "0.36"
          },
          "100%": {
            transform: "scale(4)",
            opacity: "0"
          }
        }
      },
      animation: {
        shimmer: "shimmer 1.8s infinite",
        ripple: "ripple 600ms ease-out"
      }
    }
  },
  plugins: [animate]
};

export default config;
