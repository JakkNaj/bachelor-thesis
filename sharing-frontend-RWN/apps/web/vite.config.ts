import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import reactNativeWeb from 'vite-plugin-react-native-web';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		reactNativeWeb(),
		visualizer({
			open: true,
		}),
	],
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
		include: ['react', 'react-dom', 'react-native-web'],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: function manualChunks(id: string) {
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
			Link: [
				'<https://fonts.googleapis.com>; rel=preconnect',
				'<https://fonts.gstatic.com>; rel=preconnect',
			],
		},
	},
});
