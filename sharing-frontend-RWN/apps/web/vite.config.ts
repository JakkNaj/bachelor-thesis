import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'react-native': 'react-native-web',
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			mainFields: ['module', 'main'],
			resolveExtensions: ['.web.js', '.js', '.ts', '.tsx'],
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
