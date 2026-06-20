import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Netflix-mirror inspired palette
        brand: {
          DEFAULT: "#E50914",
          50: "#ffe5e7",
          400: "#ff3b46",
          500: "#E50914",
          600: "#c1070f",
          700: "#9b0810",
        },
        ink: {
          950: "#08080a",
          900: "#0b0b0f",
          800: "#121218",
          700: "#1a1a22",
          600: "#23232e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(229,9,20,0.55)",
        "glow-sm": "0 0 24px -6px rgba(229,9,20,0.5)",
        card: "0 24px 60px -20px rgba(0,0,0,0.8)",
        "inner-glass": "inset 0 1px 0 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #ff3b46 0%, #E50914 45%, #9b0810 100%)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(229,9,20,0.28) 0%, rgba(229,9,20,0) 70%)",
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
