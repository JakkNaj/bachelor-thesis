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
- Modern UI with Tailwind CSS

## Tech Stack

- **React**: UI library (v19.0.0)
- **TypeScript**: Type safety (v5.7.2)
- **React Query**: Data fetching and caching (v5.67.2)
- **Orval**: API client generation from OpenAPI spec (v7.6.0)
- **React Router**: Routing (v7.3.0)
- **Zustand**: State management (v5.0.3)
- **Yup**: Form validation (v1.6.1)
- **Axios**: HTTP client (v1.8.2)
- **React Hook Form**: Form handling (v7.54.2)
- **Tailwind CSS**: Styling (v4.0.14)

## Project Structure

```
src/
  ├── api/
  │   ├── generated/       # Generated API clients and types
  │   ├── mutator/         # Custom Axios instance
  │   └── openapi.json     # OpenAPI specification
  ├── assets/             # Static assets
  ├── components/         # Reusable components
  ├── hooks/             # Custom hooks
  ├── layouts/           # Layout components
  ├── pages/             # Page components
  ├── store/             # Zustand stores
  ├── types/             # Type definitions
  ├── utils/             # Utility functions
  ├── App.tsx            # Main application component
  ├── globals.css        # Global styles
  └── main.tsx           # Application entry point
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
(make sure you already started backend server)
```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking
- `npm run generate-api` - Generate API clients from OpenAPI spec

## API Documentation

The API is documented using OpenAPI specification in `src/api/openapi.yaml`. The application uses Orval to generate TypeScript clients and types from this specification.

## Authentication

The application uses JWT tokens for authentication. Tokens are stored in HTTP-only cookies for security.

## License

MIT
