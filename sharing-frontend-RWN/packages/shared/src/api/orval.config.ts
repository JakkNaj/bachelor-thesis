import { defineConfig } from 'orval';

export default defineConfig({
	api: {
		output: {
			mode: 'tags-split',
			target: './generated',
			schemas: './generated/schemas',
			client: 'react-query',
			mock: false,
		},
		input: {
			target: './openapi.json',
		},
	},
});
