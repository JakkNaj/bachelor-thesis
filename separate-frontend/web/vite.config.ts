import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
	plugins: [
		react(),
		compression({
			algorithm: "gzip",
			exclude: [/\.(br)$/, /\.(gz)$/],
			deleteOriginalAssets: false,
		}),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					"react-vendor": ["react", "react-dom"],
					"form-vendor": ["react-hook-form", "@hookform/resolvers", "yup"],
					"router-vendor": ["react-router-dom"],
				},
			},
		},
		minify: "terser",
		sourcemap: false,
	},
	optimizeDeps: {
		include: ["react", "react-dom"],
	},
	server: {
		headers: {
			Link: ["<https://fonts.googleapis.com>; rel=preconnect", "<https://fonts.gstatic.com>; rel=preconnect"],
		},
	},
});
