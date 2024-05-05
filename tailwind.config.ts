import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
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
    },
  },
  plugins: [],
} satisfies Config;
