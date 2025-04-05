import { defineConfig } from 'orval';

export default defineConfig({
	api: {
		input: {
			target: '../../packages/shared/src/api/openapi.json',
		},
		output: {
			mode: 'tags-split',
			target: './src/api/generated',
			client: 'react-query',
			override: {
				mutator: {
					path: './src/api/custom-instance.ts',
					name: 'customInstance',
				},
			},
		},
	},
});
