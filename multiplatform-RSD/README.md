# Multiplatform RSD Application

This is a multiplatform application built with Expo and React Strict DOM (RSD), designed to run seamlessly on both web and mobile platforms. The application follows the recommended setup from the [React Strict DOM documentation](https://facebook.github.io/react-strict-dom/learn/setup/).

## About React Strict DOM

React Strict DOM (RSD) is a JavaScript library that enables rendering React web interfaces on React Native. It provides:

- A subset of React DOM and Web APIs that work on both web and native platforms
- Strict HTML elements with modern web attributes
- Built-in CSS styling system with optimized atomic CSS extraction
- Support for imperative DOM and Web APIs on native platforms

## Project Structure

```
├── api/                    # API configuration and generated code
│   ├── generated/         # Auto-generated API client code
│   ├── openapi.json      # OpenAPI specification
│   └── orval.config.ts   # Orval configuration
├── app/                   # Expo Router app directory
│   ├── (auth)/           # Authentication routes
│   └── (app)/            # Main application routes
├── components/            # Reusable UI components
├── lib/                   # Utility functions and store
├── assets/               # Static assets (images, icons, fonts)
└── types/                # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate API client:
   ```bash
   npm run generate-api
   ```

3. Start the backend server:
   not in this folder, separate project

4. Start the development server:
   ```bash
   npm start
   ```


## Development Options

You can run the app on:
- Web browser
- iOS simulator
- Android emulator
- Physical device using Expo Go
  (if so, then the url in apiClient has to be changed to the ip address of device you started backend service on)


## Key Features

- **Cross-platform**: Runs on both web and mobile platforms
- **Type-safe**: Built with TypeScript
- **Modern UI**: Uses React Strict DOM for consistent UI across platforms
- **API Integration**: Auto-generated API client using Orval
- **Form Handling**: Uses React Hook Form with Yup validation
- **State Management**: Implements React Query for server state

## Technology Stack

- [Expo](https://expo.dev) - React Native development platform
- [React Strict DOM](https://facebook.github.io/react-strict-dom/learn/) - Cross-platform UI library
- [React Query](https://tanstack.com/query/latest) - Server state management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Yup](https://github.com/jquense/yup) - Schema validation
- [Orval](https://orval.dev/) - API client generation
