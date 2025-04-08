# SVG Sharing Between React Native and Web

## Setup:

1. Shared Package:

   - Uses react-native-svg for SVG components
   - Import syntax: import { G, Path, Svg } from 'react-native-svg'
   - Dependencies needed in package.json:
     - "react-native": "0.76.9"
     - "react-native-svg": "^15.11.2"

2. Web App Configuration:
   - Uses react-native-web for React Native compatibility
   - Vite config needs only one alias:
     ```
     resolve: {
       alias: {
         'react-native': 'react-native-web'
       }
     }
     ```

## How It Works:

1. In React Native:

   - Components use native SVG implementation directly from react-native-svg

2. In Web:
   - react-native-web provides automatic compatibility layer for SVG components
   - No need for explicit SVG package aliasing
   - SVG components are automatically converted to HTML SVG elements

## Common Pitfalls:

1. DON'T add explicit alias for react-native-svg:

   ```
   // This will break SVG imports:
   alias: {
     'react-native-svg': 'react-native-web'
   }
   ```

2. **Keep imports consistent:**

   - Always import from 'react-native-svg'
   - Let react-native-web handle the web implementation

3. **Complex svgs**
   - when react-native-web compatibility layer is not enough, use alias react-native-svg-web
   - react-native-svg-web is the drop in replacement package from authors of react-native-web
   ```
   // For complex svgs:
   alias: {
     'react-native-svg': 'react-native-svg-web'
   }
   ```

## Best Practices:

1. Use only the react-native to react-native-web alias
2. Keep SVG component imports from react-native-svg
3. Let react-native-web's built-in compatibility layer handle SVG components
4. Don't try to manually alias SVG packages unless specifically needed

This setup ensures SVG components work seamlessly across both platforms while maintaining a single source of truth in the shared package.
