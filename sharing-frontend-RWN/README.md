# Sharing Frontend Monorepo

This monorepo contains a web application and a mobile application that share common code through a shared package. The project uses React Native Web for web compatibility and Expo for mobile development.

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- For mobile development:
  - Expo CLI (`npm install -g expo-cli`)
  - iOS Simulator (for Mac) or Android Studio (for Android development)

## Project Structure

```
sharing-frontend-RWN/
├── apps/
│   ├── web/          # React web application
│   └── mobile/       # React Native mobile application
└── packages/
    └── shared/       # Shared code between web and mobile
```

### More about the setup:
### More about the setup:
For detailed information about the monorepo setup, architecture, and best practices, please refer to our [Monorepo Setup Guide](./monorepo-notes.md).

## Getting Started


## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sharing-frontend-RWN
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Generate API types and client**
   ```bash
   yarn generate-api
   ```
   This will generate the API client and types in the shared package using Orval.

4. **Running the Backend Service**
   Make sure you have started backend service (not in this monorepo).

5. **Running the Web Application**
   ```bash
   yarn web
   ```
   This will start the web application on `http://localhost:5173`

6. **Running the Mobile Application**
   ```bash
   yarn mobile
   ```
   This will start the Expo development server. You can then:
   - Press `i` to open in iOS simulator
   - Press `a` to open in Android emulator
   - Scan the QR code with your phone to run on a physical device
    (**if so**, then you have to change the BASEURL in api/axios-config to your computer ip address, where you started backend service) 

## Development Workflow

### Shared Package
The shared package (`packages/shared`) contains code that is used by both web and mobile applications. It includes:
- API client and types (generated using Orval)
- Common components
- Shared utilities and hooks

### Web Application
The web application is built with:
- Vite
- React
- React Native Web
- React Query
- React Router
- Zustand for state management

### Mobile Application
The mobile application is built with:
- Expo
- React Native
- React Query
- Expo Router
- React Hook Form

## Available Scripts

### Root Directory
- `yarn web` - Start the web application
- `yarn mobile` - Start the mobile application
- `yarn generate-api` - Generate API client and types

### Web Application (`apps/web`)
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

### Mobile Application (`apps/mobile`)
- `yarn start` - Start Expo development server
- `yarn ios` - Start iOS simulator
- `yarn android` - Start Android emulator
- `yarn web` - Start web version


## License
MIT
