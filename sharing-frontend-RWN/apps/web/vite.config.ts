import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import reactNativeWeb from 'vite-plugin-react-native-web';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		reactNativeWeb(),
		compression({
			algorithm: 'gzip',
			exclude: [/\.(br)$/, /\.(gz)$/],
			deleteOriginalAssets: false,
		}),
		visualizer({
			open: true,
			gzipSize: true,
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
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendor': ['react', 'react-dom', 'react-native-web'],
					'router-vendor': ['react-router-dom'],
					'query-vendor': ['@tanstack/react-query'],
					'state-vendor': ['zustand'],
				},
			},
		},
		minify: 'terser',
		sourcemap: false,
		target: 'esnext',
		chunkSizeWarningLimit: 1000,
	},
	server: {
		headers: {
			Link: [
				'<https://fonts.googleapis.com>; rel=preconnect',
				'<https://fonts.gstatic.com>; rel=preconnect',
			],
		},
		open: true,
		cors: true,
	},
	preview: {
		headers: {
			Link: [
				'<https://fonts.googleapis.com>; rel=preconnect',
				'<https://fonts.gstatic.com>; rel=preconnect',
			],
		},
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	},
});
