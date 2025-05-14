/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import tw_bevel from "tailwind-bevel"
import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"
import flattenColor from "tailwindcss/lib/util/flattenColorPalette"
import plugin from "tailwindcss/plugin"
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
						transform: "translateY(-10px) scale(0.8)",
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

						transform: "translateY(20px)",
					},
				},
				"scale-appear": {
					"0%": {
						transform: "scale(0.8)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
			},
			animation: {
				"fade-down": "fade-down 3s ease-out infinite",
				"scale-appear": "scale-appear 0.3s ease-out",
			},
		},
	},
	plugins: [
		tw_bevel,
		plugin(function ({ matchUtilities, addComponents, theme }) {
			addComponents({
				".content-empty": {
					content: "''",
				},
			})

			matchUtilities(
				{
					"stop-color": (val) => ({
						"stop-color": val,
					}),
				},
				{
					values: flattenColor(theme("colors")),
				},
			)

			matchUtilities(
				{
					"txt-orientation": (val) => ({
						"text-orientation": val,
					}),
				},
				{
					values: {
						sideways: "sideways",
						mixed: "mixed",
						upright: "upright",
						"sideways-right": "sideways-right",
						"use-glyph-orientation": "use-glyph-orientation",
					},
				},
			)

			matchUtilities(
				{
					writing: (val) => ({
						"writing-mode": val,
					}),
				},
				{
					values: {
						vertical: "vertical-rl",
						"vertical-lr": "vertical-lr",
						"horizontal-tb": "horizontal-tb",
						"sideways-rl": "sideways-rl",
						"sideways-lr": "sideways-lr",
					},
				},
			)

			// const newUtilities = {
			// 	".bevel-offset-[3px]": {
			// 		"--bevel-offset": "3px",
			// 	},
			// 	".bevel-offset-[6px]": {
			// 		"--bevel-offset": "6px",
			// 	},
			// 	".bevel-color-foreground": {
			// 		"--bevel-color": "var(--color-foreground)",
			// 	},
			// 	".bevel-gradient-to-br": {
			// 		"--bevel-gradient": "to bottom right",
			// 	},
			// }
		}),
	],
} satisfies Config
