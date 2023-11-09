/** @type {import('tailwindcss').Config} */
import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
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
					"100%": { transform: "scale(12)" }
				},
				"appear-from-bottom": {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" }
				},
				"disappear-to-bottom": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(10px)" }
				}
			},
			animation: {
				"expand-size": "expand-size 0.25s ease-in-out forwards",
				"appear-from-bottom": "appear-from-bottom 0.4s ease-in-out forwards",
				"disappear-to-bottom": "disappear-to-bottom 0.4s ease-in-out forwards"
			}
		}
	},
	plugins: [
		plugin(function ({ addVariant, matchComponents, theme }) {
			addVariant("reveal-open", "&[data-open=true] ");
			addVariant("reveal-closed", "&[data-open=false]");
			addVariant("group-reveal-open", ".group[data-open=true] &");

			matchComponents({ "animation-delay": (v) => ({ animationDelay: v }) }, { values: theme("transitionDelay") });
		})
	]
} as Config;
