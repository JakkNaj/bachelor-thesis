import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	plugins: [
		react(),
		visualizer({
			open: true,
			gzipSize: true,
			brotliSize: true,
			filename: "dist/stats.html",
		}),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: function manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				
					return null;
				},
			},
		},
	},
	server: {
		headers: {
			Link: ["<https://fonts.googleapis.com>; rel=preconnect", "<https://fonts.gstatic.com>; rel=preconnect"],
		},
	},
});
