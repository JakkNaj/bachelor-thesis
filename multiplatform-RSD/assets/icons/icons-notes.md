# SVG Icons Implementation in Multiplatform RSD Project

## Problem
- React Strict DOM (RSD) doesn't directly support SVG elements in its HTML namespace
- We need to render SVG icons on both web and mobile platforms
- We want to avoid using react-native-web and stick with react-strict-dom

## Solution
We implemented a platform-specific approach for SVG rendering:

1. **Web Platform**:
   - Use standard HTML SVG elements (`<svg>`, `<g>`, `<path>`)
   - These elements are natively supported in web browsers
   - No special wrapper needed

2. **Mobile Platform**:
   - Use react-native-svg components (`<Svg>`, `<G>`, `<Path>`)
   - Wrap these components in an `html.div` container from react-strict-dom
   - This allows the SVG to render properly in the React Native environment

## Implementation
- Created platform-specific versions of the LogoIcon component
- Used Platform.OS to conditionally render the appropriate implementation
- Maintained the same props interface for both implementations
- Installed react-native-svg for mobile rendering

## Dependencies
- react-native-svg: For rendering SVG on mobile platforms
- react-strict-dom: For cross-platform UI components

## Notes
- When using react-native-svg with Expo, ensure compatibility by using the correct version
- Since we're not using react-native-web (which normally provides Node.js polyfills like 'buffer'), we need to manually polyfill these modules:
  - Create a metro.config.js file in the project root with:
    ```javascript
    const { getDefaultConfig } = require('expo/metro-config');
    
    const config = getDefaultConfig(__dirname);
    
    // Add this to handle the buffer polyfill
    config.resolver.extraNodeModules = {
      ...config.resolver.extraNodeModules,
      buffer: require.resolve('buffer/'),
    };
    
    module.exports = config;
    ```
  - Install the buffer package: `npm install buffer`
  - This polyfill is necessary because react-native-svg expects Node.js modules that aren't available in React Native by default 