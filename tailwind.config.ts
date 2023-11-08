/** @type {import('tailwindcss').Config} */
import { Config } from "tailwindcss";
import { colors } from "./theme/colors";

export default {
	content: ["src/**/*.{ts,tsx}", "./index.html"],
	theme: {
		extend: {
			colors,
			boxShadow: {
				"up-sm": "0px 4x 8px 0px rgba(0, 0, 0, 1)",
				"inner-glass": "-11px 14px 46px -23px rgba(0, 163, 255, 0.19) inset"
			},
			keyframes: {
				"expand-size": {
					"0%": { transform: "scale(0)" },
					"100%": { transform: "scale(14)" }
				}
			},
			animation: {
				"expand-size": "expand-size 0.25s ease-in-out forwards"
			}
		}
	},
	plugins: []
} as Config;
