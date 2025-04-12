import '../stylex.css';
import '@expo/metro-runtime';
import { Stack } from "expo-router";
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(app)" />
			</Stack>
		</QueryClientProvider>
	);
}
