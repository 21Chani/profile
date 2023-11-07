import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const srcDir = new URL("./src", import.meta.url).pathname;
const iconsDir = new URL("./src/icons", import.meta.url).pathname;
const publicDir = new URL("./public", import.meta.url).pathname;
const libDir = new URL("./src/lib", import.meta.url).pathname;
const componentsDir = new URL("./src/components", import.meta.url).pathname;
const interfaceDir = new URL("./src/components/interface", import.meta.url).pathname;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@src": srcDir,
			"@icons": iconsDir,
			"@public": publicDir,
			"@lib": libDir,
			"@components": componentsDir,
			"@interface": interfaceDir
		}
	}
});
