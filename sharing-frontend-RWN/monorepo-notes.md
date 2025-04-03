# Monorepo Setup Guide - React Native + React Web with Shared Components

## Project Structure
```
/
├── apps/
│   ├── mobile/      # Expo React Native app
│   └── web/         # Vite React web app
├── packages/
│   └── shared/      # Shared components and utilities
└── package.json     # Root workspace configuration
```

## Key Configuration Files

### 1. Root package.json
- `workspaces`: Defines which directories are part of the monorepo
- `scripts`: Commands to run apps and build packages
- Essential for Yarn workspace functionality

### 2. Shared Package Configuration
- `package.json`:
  - `main`: CommonJS entry point
  - `module`: ES modules entry point
  - `types`: TypeScript declarations
  - `files`: Specifies which files to include in the package
  - Uses `tsup` for building (supports both CJS and ESM)

- `tsconfig.json`:
  - `declaration`: true (generates .d.ts files)
  - `outDir`: "dist" (output directory)
  - `jsx`: "react-jsx" (for React components)
  - `moduleResolution`: "node" (for proper module resolution)

### 3. App Configurations
- Web (Vite):
  - Alias configuration for `react-native` → `react-native-web`
  - Proper module resolution for shared package
- Mobile (Expo):
  - Standard Expo configuration
  - Workspace dependency on shared package

## How It Works

### 1. Shared Components
- Components are written using React Native primitives
- `react-native-web` provides web compatibility
- Example: Button component uses `Pressable`, `View`, `Text` from react-native

### 2. Import System
- Apps import from shared package: `import { Button } from '@monorepo/shared'`
- Yarn workspaces handle the local package resolution
- TypeScript ensures type safety across the monorepo

### 3. Build Process
1. Shared package is built using tsup
2. Generates both CJS and ESM formats
3. Creates TypeScript declarations
4. Outputs to `dist` directory

## Key Points to Remember

1. Version Alignment
- Keep React and React Native versions in sync across packages
- Use peerDependencies for shared packages
- Match TypeScript versions

2. Build Configuration
- Shared package needs proper TypeScript configuration
- tsup handles both CJS and ESM formats
- Clean builds are important (use --clean flag)

3. Development Workflow
- Build shared package first: `yarn build:shared`
- Start apps: `yarn web` or `yarn mobile`
- Changes to shared package require rebuild

4. Common Issues
- Version mismatches between packages
- TypeScript configuration conflicts
- Build cache issues (use --clean when needed)

## Best Practices

1. Component Design
- Use React Native primitives for maximum compatibility
- Keep web-specific code minimal
- Use StyleSheet for consistent styling

2. Package Management
- Use workspace:* for local dependencies
- Keep peerDependencies up to date
- Regular dependency updates

3. Development
- Build shared package after changes
- Test components in both environments
- Use TypeScript for type safety
