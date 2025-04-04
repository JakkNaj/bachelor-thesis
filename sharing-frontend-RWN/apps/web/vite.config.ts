import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: "nativewind",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"react-native": "react-native-web",
		},
		extensions: [".web.js", ".web.jsx", ".web.ts", ".web.tsx", ".js", ".jsx", ".ts", ".tsx"],
		conditions: ["react-native", "web"],
	},
	optimizeDeps: {
		esbuildOptions: {
			mainFields: ["module", "main"],
			resolveExtensions: [".web.js", ".js", ".ts", ".tsx"],
		},
	},
});
