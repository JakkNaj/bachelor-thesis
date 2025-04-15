# Trip Planner Web App

A web application for planning trips and managing activities built with React, TypeScript, and React Native Web for cross-platform compatibility.

## Features

- User authentication with JWT tokens
- Create, read, update, and delete trips
- Add, edit, and remove activities for each trip
- Secure API communication with bearer token authentication
- Form validation using Yup
- State management with Zustand
- Routing with React Router
- Cross-platform compatibility using React Native Web

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **React Native Web**: Cross-platform compatibility
- **React Query**: Data fetching and caching
- **Orval**: API client generation from OpenAPI spec
- **React Router**: Routing
- **Zustand**: State management
- **Yup**: Form validation
- **Axios**: HTTP client
- **Styled Components**: Styling
- **Vite**: Build tool and development server

## Project Structure

```
src/
  ├── api/
  │   ├── generated/       # Generated API clients and types from shared package
  │   └── mutator/         # Custom Axios instance
  ├── components/          # Reusable components
  ├── hooks/               # Custom hooks
  ├── layouts/             # Layout components
  ├── pages/               # Page components
  ├── store/               # Zustand stores
  ├── types/               # Type definitions
  ├── utils/               # Utility functions
  ├── App.tsx              # Main application component
  └── main.tsx             # Application entry point
```

## Monorepo Structure

This application is part of a monorepo and uses code from the shared package:

```
monorepo/
  ├── packages/
  │   └── shared/          # Shared code, types, and API clients
  └── apps/
      ├── web/             # This web application
      └── mobile/          # React Native mobile application
```

The shared package contains:

- API client generation and types
- Common components
- Shared utilities and hooks
- Authentication logic

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Generate API clients (from root directory):

```bash
yarn generate-api
```

4. Start the development server:

```bash
yarn web
```

The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

### API Communication

The application uses a custom Axios instance for API communication that:

- Sets the base URL for all API requests
- Adds authentication tokens to requests
- Handles 401 unauthorized responses
- Manages token storage in cookies

### Authentication

The application uses JWT tokens for authentication. Tokens are stored in cookies for security and automatically added to API requests via the Axios interceptor.

## Troubleshooting

1. If you encounter build issues:

   - Make sure you've run `yarn generate-api` from the root directory
   - Check if all dependencies are properly installed
   - Clear Vite cache by removing `node_modules/.vite`

2. For API-related issues:
   - Verify that the API client is properly generated in the shared package
   - Check if the API endpoints are correctly configured
   - Ensure authentication tokens are properly set

## License

MIT
