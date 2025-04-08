# Monorepo Setup Guide - React Native + React Web with Shared Components

## Project Structure

```
/
├── apps/
│   ├── mobile/      # Expo React Native app
│   └── web/         # Vite React web app
├── packages/
│   └── shared/      # Shared components and utilities
│       └── src/     # Source code for shared components
└── package.json     # Root workspace configuration
```

## Key Configuration Files

### 1. Root package.json

- `workspaces`: Defines which directories are part of the monorepo
- `scripts`: Commands to run apps
- Essential for Yarn workspace functionality

### 2. Shared Package Configuration

- `package.json`:

  - Contains dependencies and dev dependencies
  - No build configuration needed as we're importing directly from source

- `tsconfig.json`:
  - `jsx`: "react-jsx" (for React components)
  - `moduleResolution`: "node" (for proper module resolution)
  - Configured to support direct source imports

### 3. App Configurations

- Web (Vite):
  - Alias configuration for `react-native` → `react-native-web`
  - TypeScript path configuration for direct source imports
- Mobile (Expo):
  - Standard Expo configuration
  - TypeScript path configuration for direct source imports

## How It Works

### 1. Shared Components

- Components are written using React Native primitives
- `react-native-web` provides web compatibility
- Example: Button component uses `Pressable`, `View`, `Text` from react-native

### 2. Import System

- Apps import directly from shared package source: `import { Button } from '@monorepo/shared/src/components'`
- Yarn workspaces handle the local package resolution
- TypeScript ensures type safety across the monorepo

### 3. Development Process

- No build step required for shared package
- Direct source imports enable faster development
- TypeScript handles type checking across the monorepo

## Key Points to Remember

1. Version Alignment

- Keep React and React Native versions in sync across packages
- Use consistent TypeScript version across the monorepo
- Ensure compatible versions of shared dependencies

2. TypeScript Configuration

- Proper path aliases in tsconfig.json files
- Consistent TypeScript settings across packages
- Enable source file resolution between packages

3. Development Workflow

- Start apps directly: `yarn web` or `yarn mobile`
- Changes to shared package are immediately reflected
- No rebuild step necessary

4. Common Issues

- Version mismatches between packages
- TypeScript path resolution issues
- Module resolution conflicts

## Best Practices

1. Component Design

- Use React Native primitives for maximum compatibility
- Keep web-specific code minimal
- Use StyleSheet for consistent styling

2. Package Management

- Use workspace:\* for local dependencies
- Keep dependencies up to date
- Maintain consistent versions across packages

3. Development

- Leverage TypeScript for type safety
- Test components in both environments
- Use proper path aliases for clean imports
