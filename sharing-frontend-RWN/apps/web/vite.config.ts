import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import reactNativeWeb from 'vite-plugin-react-native-web';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), reactNativeWeb()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'react-native': 'react-native-web',
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			mainFields: ['module', 'main'],
			resolveExtensions: ['.web.tsx', '.tsx', '.web.ts', '.ts', '.web.js', '.js', '.json'],
		},
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	},
});
