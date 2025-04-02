module.exports = {
  tripPlanner: {
    input: {
      target: './src/api/openapi.json',
      validation: false,
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      schemas: './src/api/generated/schemas',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
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
        schemas: {
					input: {
						prefix: "T",
						suffix: "Input",
						operations: ["post", "put"],
					},
				},
      },
    },
  },
}; 