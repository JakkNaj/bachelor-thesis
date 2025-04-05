import { defineConfig } from 'orval';

export default defineConfig({
	api: {
		output: {
			mode: 'tags-split',
			target: './app/api/generated',
			schemas: '@monorepo/shared/src/api/generated/schemas',
			client: 'react-query',
			mock: false,
			override: {
				mutator: {
					path: './app/lib/api/custom-instance.ts',
					name: 'customInstance',
				},
				query: {
					useQuery: true,
					useInfinite: true,
					useInfiniteQueryParam: 'page',
					options: {
						staleTime: 10000,
					},
				},
			},
		},
		input: {
			target: '../../packages/shared/src/api/openapi.json',
		},
	},
});
