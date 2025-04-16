# Multiplatform React Native Web Application

This is a multiplatform application built with Expo and React Native Web, supporting iOS, Android, and Web platforms.

## Tech Stack

- **Framework**: Expo with React Native Web
- **Language**: TypeScript
- **API Integration**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Yup validation
- **Navigation**: Expo Router with file-based routing
- **API Generation**: Orval for type-safe API calls

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate API types and hooks:
   ```bash
   npm run generate-api
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   Or run platform-specific:
   ```bash
   npm run ios     # for iOS
   npm run android # for Android
   npm run web     # for Web
   ```

## Project Structure

- `/app` - Main application code with file-based routing
- `/api` - API integration and Orval configuration
- `/components` - Reusable UI components
- `/hooks` - Custom React hooks
- `/types` - TypeScript type definitions
- `/assets` - Static assets like images and fonts

