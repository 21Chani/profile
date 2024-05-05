import { JetBrains_Mono } from "next/font/google";
import font from "next/font/local";

export const jaro_font = font({
  src: [
    {
      path: "../../public/fonts/jaro/regular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-jaro",
});

export const jetbrains_font = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});
