import '../stylex.css';
import '@expo/metro-runtime';
import { Stack } from "expo-router";
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { html, css } from 'react-strict-dom';

const queryClient = new QueryClient();

const styles = css.create({
	container: {
		minHeight: '100vh',
		fontFamily: "'Geist', 'system-ui', sans-serif",
	},
});

const webStyles = css.create({
	container: {
		overflowY: 'auto',
	},
});

export default function RootLayout() {
	return (
		<html.div style={[styles.container, Platform.OS === 'web' && webStyles.container]}>
			<QueryClientProvider client={queryClient}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
					<Stack.Screen name="(app)" />
				</Stack>
			</QueryClientProvider>
		</html.div>
	);
}
