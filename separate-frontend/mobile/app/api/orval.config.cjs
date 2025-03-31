module.exports = {
    tripPlanner: {
      input: {
        target: './openapi.json',
        validation: false,
      },
      output: {
        mode: 'tags-split',
        target: './generated',
        schemas: './generated/schemas',
        client: 'react-query',
        override: {
          mutator: {
            path: './mutator/custom-instance.ts',
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
    },
  };