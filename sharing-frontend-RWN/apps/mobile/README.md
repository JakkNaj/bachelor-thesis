# Trip Planner Mobile App

A React Native mobile application for planning trips and managing activities, built with Expo and sharing code with the web application through a monorepo structure.

## Features

- User authentication with JWT tokens
- Create, read, update, and delete trips
- Add, edit, and remove activities for each trip
- Secure API communication with bearer token authentication
- Form validation using Yup
- State management with React Query
- File-based routing with Expo Router
- Cross-platform compatibility (iOS, Android)

## Tech Stack

- **Expo**: React Native development platform
- **React Native**: Mobile UI framework
- **TypeScript**: Type safety
- **React Query**: Data fetching and caching
- **Orval**: API client generation from OpenAPI spec
- **Expo Router**: File-based routing
- **React Hook Form**: Form handling
- **Yup**: Form validation
- **Axios**: HTTP client
- **Expo Secure Store**: Secure token storage

## Project Structure

```
app/
  ├── (auth)/              # Authentication routes
  ├── (tabs)/              # Main tab navigation
  ├── modals/              # Modal screens
  ├── components/          # Reusable components
  ├── hooks/               # Custom hooks
  ├── utils/               # Utility functions
  └── _layout.tsx          # Root layout component
```

## Monorepo Structure

This application is part of a monorepo and uses code from the shared package:

```
monorepo/
  ├── packages/
  │   └── shared/          # Shared code, types, and API clients
  └── apps/
      ├── web/             # React web application
      └── mobile/          # This mobile application
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
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)

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
yarn mobile
```

### Running the App

After starting the development server, you can:

- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Scan the QR code with your phone to run on a physical device
  (**if so**, then you have to change the BASEURL in api/axios-config to your computer ip address, where you started backend service)

## Development

### Available Scripts

- `yarn start` - Start Expo development server
- `yarn ios` - Start iOS simulator
- `yarn android` - Start Android emulator
- `yarn lint` - Run ESLint

### API Communication

The application uses a custom Axios instance for API communication that:

- Sets the base URL for all API requests
- Adds authentication tokens to requests
- Handles 401 unauthorized responses
- Manages token storage in Expo Secure Store

### Authentication

The application uses JWT tokens for authentication. Tokens are stored securely using Expo Secure Store and automatically added to API requests via the Axios interceptor.

## Troubleshooting

1. If you encounter build issues:

   - Make sure you've run `yarn generate-api` from the root directory
   - Check if all dependencies are properly installed
   - Run `yarn reset-project` to clear Expo cache

2. For API-related issues:

   - Verify that the API client is properly generated in the shared package
   - Check if the API endpoints are correctly configured
   - Ensure authentication tokens are properly set

3. For Expo-specific issues:
   - Clear Expo cache with `expo start -c`
   - Make sure you have the latest Expo CLI installed
   - Check if your Expo SDK version is compatible with your React Native version

## License

MIT
