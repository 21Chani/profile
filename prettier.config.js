/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
	printWidth: 120,
	jsxSingleQuote: false,
	endOfLine: "lf",
	semi: false,
	useTabs: true,
	htmlWhitespaceSensitivity: "ignore",
	bracketSameLine: false,
	bracketSpacing: true,
	tabWidth: 2,
}

export default config
