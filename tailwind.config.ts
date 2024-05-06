import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tw_bevel from "tailwind-bevel";
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ["var(--font-jetbrains)"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
        jaro: ["var(--font-jaro)", ...fontFamily.sans],
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--color-background))",
          alt: "hsl(var(--color-background-secondary))",
        },
        foreground: {
          DEFAULT: "hsl(var(--color-foreground))",
          alt: "hsl(var(--color-foreground-alt))",
          alt2: "hsl(var(--color-foreground-alt2))",
        },
        border: {
          primary: "hsl(var(--color-border-primary))",
          secondary: "hsl(var(--color-border-secondary))",
        },
      },
      keyframes: {
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px) scale(0.95)",
          },

          "20%": {
            opacity: "1",
            transform: "translateY(0)",
          },

          "60%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",

            transform: "translateY(20px) scale(0.8)",
          },
        },
      },
      animation: {
        "fade-down": "fade-down 3s ease-out infinite",
      },
    },
  },
  plugins: [tw_bevel],
} satisfies Config;
