import path from "node:path";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [svelte()],
	vite: {
		resolve: {
			alias: {
				"@swipe/kb": path.resolve("../../packages/kb/examples"),
			},
		},
	},
});
