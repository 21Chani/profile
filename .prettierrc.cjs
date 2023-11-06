/** @type {import("prettier").Config} */
const config = {
	plugins: [require.resolve("prettier-plugin-organize-imports"), require.resolve("prettier-plugin-tailwindcss")],
	useTabs: true,
	printWidth: 120,
	trailingComma: "none",
	bracketSameLine: false,
	semi: true,
	quoteProps: "consistent",
	tabWidth: 1,
	singleQuote: false,
	endOfLine: "auto"
};

module.exports = config;
