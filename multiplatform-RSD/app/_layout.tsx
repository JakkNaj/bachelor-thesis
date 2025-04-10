// Required for CSS to work on Expo Web
import '../stylex.css';
// Required for Fast Refresh to work on Expo Web
import '@expo/metro-runtime';
import { Stack } from "expo-router";

type TRootLayoutProps = {};

export const RootLayout = ({}: TRootLayoutProps): JSX.Element => {
  return <Stack />;
};

// Expo Router requires a default export
export default RootLayout;