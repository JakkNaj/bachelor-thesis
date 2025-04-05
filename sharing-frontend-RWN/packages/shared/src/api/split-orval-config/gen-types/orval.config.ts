import { defineConfig } from 'orval';

export default defineConfig({
	tripPlanner: {
		output: {
			target: '../generated',
			schemas: '../generated/schemas',
		},
		input: {
			target: '../openapi.json',
		},
	},
});
