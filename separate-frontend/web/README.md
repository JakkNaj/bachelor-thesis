# Trip Planner App

A web application for planning trips and managing activities built with React, TypeScript, React Query, and Orval.

## Features

- User authentication with JWT tokens
- Create, read, update, and delete trips
- Add, edit, and remove activities for each trip
- Secure API communication with bearer token authentication
- Form validation using Yup
- State management with Zustand
- Routing with React Router

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **React Query**: Data fetching and caching
- **Orval**: API client generation from OpenAPI spec
- **React Router**: Routing
- **Zustand**: State management
- **Yup**: Form validation
- **Axios**: HTTP client
- **React Hook Form**: Form handling

## Project Structure

```
src/
  ├── api/
  │   ├── generated/       # Generated API clients and types
  │   ├── mutator/         # Custom Axios instance
  │   └── openapi.yaml     # OpenAPI specification
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

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Generate API clients:

```bash
npm run generate-api
```

4. Start the development server:

```bash
npm run dev
```

## API Documentation

The API is documented using OpenAPI specification in `src/api/openapi.yaml`. The application uses Orval to generate TypeScript clients and types from this specification.

## Authentication

The application uses JWT tokens for authentication. Tokens are stored in HTTP-only cookies for security.

## License

MIT
