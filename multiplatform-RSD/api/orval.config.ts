import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: './openapi.json',
    },
    output: {
      target: './generated',
      schemas: './generated/schemas',
      mode: 'tags-split',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './apiClient.ts',
          name: 'apiClient',
        },
      },
    },
  },
});
