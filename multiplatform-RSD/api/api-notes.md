# API Setup Documentation

## Initial Problem
We encountered a cross-platform compatibility issue with API clients. Initially, we were using `Axios` as our HTTP client, but we faced limitations. We attempted to use Axios with its interceptors for request/response handling, but we encountered several challenges:

1. Axios, while being a powerful promise-based HTTP client, is designed for Node.js and browser environments, lacking native support for React Native mobile platforms
2. While Axios works in React Native Web (RNW) applications due to RNW's XMLHttpRequest polyfill, we specifically wanted to avoid RNW dependencies as our project aims to compare and provide an alternative to RNW-based solutions
3. We needed a solution that would work seamlessly across:
   - React Native (mobile)
   - Web browsers
   - Potential Node.js environments
   Without relying on platform-specific polyfills or adaptations

## Current Solution
We've implemented a platform-agnostic API setup using the native `fetch` API, which is:
- Built into modern JavaScript
- Available across all our target platforms (React Native, Web, Node.js)
- Doesn't require external dependencies
- Provides consistent behavior across platforms

## Architecture Overview

### 1. API Client Structure
- We use Orval for API code generation (`generate-api` script in package.json)
- The generated API code uses the native `fetch` API
- Type definitions are automatically generated from our API schema

### 2. Request/Response Flow
```typescript
// Example of how requests are handled:
const makeRequest = async <T>(
  url: string, 
  options: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
```

### 3. Benefits of Current Setup
- Zero dependencies for HTTP client
- Native performance
- Consistent behavior across platforms
- Built-in TypeScript support
- Smaller bundle size
- Better maintainability

### 4. API Generation
We use Orval (configured in api/orval.config.ts) to:
- Generate type-safe API clients
- Create request/response types
- Handle API versioning
- Generate React Query hooks

## Usage Example
```typescript
// Generated hook usage:
const { data, isLoading } = useGetUsers();

// Manual API call:
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
```

## Best Practices
1. Always use generated types for requests/responses
2. Utilize React Query for data fetching and caching
3. Handle errors consistently across the application
4. Use appropriate loading states
5. Implement proper error boundaries

## Future Considerations
- API versioning strategy
- Caching strategies
- Error handling improvements
- Performance monitoring
- Rate limiting handling
