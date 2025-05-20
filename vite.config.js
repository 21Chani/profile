import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { resolve } from "node:path"
import { defineConfig } from "vite"
import glsl from "vite-plugin-glsl"
import { nodePolyfills } from "vite-plugin-node-polyfills"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    nodePolyfills({ include: ["events"] }),
    tailwindcss(),
    viteReact(),
    glsl(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
