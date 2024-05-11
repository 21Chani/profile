/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
	printWidth: 120,
	jsxSingleQuote: false,
	semi: false,
	useTabs: true,
	htmlWhitespaceSensitivity: "ignore",
	bracketSameLine: true,
	bracketSpacing: true,
}

export default config
