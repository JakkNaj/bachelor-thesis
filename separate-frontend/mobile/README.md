# Mobile Application

A React Native mobile application built with Expo, featuring a modern UI with Tailwind CSS styling.

## 🚀 Features

- Modern UI components with Tailwind CSS styling
- Type-safe development with TypeScript
- Form handling with React Hook Form and Yup validation
- API integration with Axios and React Query
- Calendar and date/time picking functionality
- Activity and Trip management
- Authentication system
- Responsive design with NativeWind

## 📱 Tech Stack

- **Framework**: React Native with Expo
- **Styling**: Tailwind CSS (NativeWind)
- **Type Safety**: TypeScript
- **State Management**: React Query
- **Form Handling**: React Hook Form + Yup
- **API Integration**: Axios + Orval
- **UI Components**: Custom components with Expo Vector Icons
- **Navigation**: Expo Router
- **Date/Time**: React Native Calendar Picker, DateTimePicker

## 🛠️ Prerequisites

- Node.js (LTS version)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

## 🚀 Getting Started

1. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

2. **Start the development server**

    ```bash
    npm start
    # or
    yarn start
    ```

3. **Run on specific platform**
    ```bash
    # For iOS
    npm run ios
    # For Android
    npm run android
    # For web
    npm run web
    ```

## 📁 Project Structure

```
app/
├── api/              # API configuration and generated types
├── assets/           # Static assets
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── types/           # TypeScript type definitions
├── (auth)/          # Authentication related screens
└── (app)/           # Main application screens
```

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android
- `npm run ios` - Start the app on iOS
- `npm run lint` - Run ESLint
- `npm run generate-api` - Generate API types using Orval


## 🔐 Authentication

The application includes a complete authentication system with secure storage using Expo Secure Store.

## 📱 Platform Support

- iOS
- Android

## 📝 License
MIT
