/** @type {import('tailwindcss').Config} */
export default {
	content: ["src/**/*.{ts,tsx}", "./index.html"],
	theme: {
		extend: {
			colors: {
				"light-blue": "#9FCBFE",
				"amethyst": "#8728FF",
				"pastel-blue": {
					100: "#5478B1",
					200: "#233249",
					300: "#1F3250"
				}
			},
			boxShadow: {
				"up-sm": "0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
			}
		}
	},
	plugins: []
};
