# Platform-Specific Component Sharing in a Monorepo

This guide explains how to structure and configure platform-specific components in a monorepo setup with shared components between web and mobile (iOS/Android) applications.

## Core Architecture

### 1. Shared Package Structure

```
shared/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx         # Shared types and interfaces
│   │   │   ├── Button.web.tsx     # Web implementation
│   │   │   ├── Button.ios.tsx     # iOS implementation
│   │   │   └── Button.android.tsx # Android implementation
│   │   └── TextInput/
│   └── ...
```

### 2. Component Implementation Strategy

**Button.tsx** (Shared types)

```typescript
export interface ButtonProps {
	label: string;
	onPress: () => void;
	variant?: 'primary' | 'secondary';
}
```

**Button.web.tsx** (Web Implementation)

```typescript
import { ButtonProps } from './Button';

export const Button = ({ label, onPress, variant = 'primary' }: ButtonProps) => {
  return <button onClick={onPress}>{label}</button>;
};
```

**Button.ios.tsx** / **Button.android.tsx** (Native Implementations)

```typescript
import { ButtonProps } from './Button';
import { Pressable, Text } from 'react-native';

export const Button = ({ label, onPress, variant = 'primary' }: ButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
};
```

## Configuration

### 1. Web App (Vite) Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactNativeWeb from 'vite-plugin-react-native-web';

export default defineConfig({
	plugins: [react(), reactNativeWeb()],
	resolve: {
		alias: {
			'react-native': 'react-native-web',
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			mainFields: ['module', 'main'],
			resolveExtensions: ['.web.tsx', '.tsx', '.web.ts', '.ts', '.web.js', '.js', '.json'],
		},
	},
});
```

### 2. Mobile App (Expo)

No special configuration is needed for the mobile app as Expo automatically handles the platform-specific file extensions (.ios.tsx and .android.tsx) during the build process.

## Usage

### 1. Importing Components

```typescript
// The same import works for both web and mobile
import { Button } from '@shared/components/Button';
```

The platform-specific resolution happens automatically:

- Web app will use `Button.web.tsx`
- iOS app will use `Button.ios.tsx`
- Android app will use `Button.android.tsx`

### 2. Development Workflow

1. Create the base component file with shared types and interfaces
2. Implement platform-specific versions with the appropriate extensions
3. Import the component normally - the build system handles the rest

## Best Practices

1. **Keep Platform-Specific Code Minimal**

   - Extract shared logic into common utilities
   - Only implement platform-specific UI and behavior differences

2. **Type Safety**

   - Use a shared types file to ensure consistency across platforms
   - Leverage TypeScript to catch platform-specific implementation issues

3. **Testing**

   - Test each platform-specific implementation separately
   - Use platform-specific test utilities when needed

4. **Styling**
   - Use platform-agnostic style properties when possible
   - Create platform-specific style utilities for complex cases

## Common Pitfalls

1. **Missing Platform Implementation**

   - Always implement all platform versions or provide fallbacks
   - Use TypeScript to ensure consistent implementations

2. **Platform-Specific Dependencies**

   - Keep platform-specific dependencies in their respective apps
   - Use dependency injection or abstract factories for platform services

3. **Inconsistent APIs**
   - Maintain consistent prop interfaces across platforms
   - Document any unavoidable platform-specific differences

## Example: Platform-Specific Styling

```typescript
// shared/src/styles/typography.ts
import { Platform } from 'react-native';

export const typography = {
	heading: {
		fontSize: Platform.select({
			web: 24,
			ios: 22,
			android: 22,
		}),
		// Other shared styles...
	},
};
```

This approach allows for:

- Static code sharing between platforms
- Type-safe component implementations
- Automatic platform-specific file resolution
- Clean separation of concerns
- Easy maintenance and updates
