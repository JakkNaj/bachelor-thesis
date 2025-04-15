import '../stylex.css';
import '@expo/metro-runtime';
import { Stack } from "expo-router";
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { html, css } from 'react-strict-dom';

const queryClient = new QueryClient();

const styles = css.create({
	container: {
		flex: 1,
		fontFamily: "'Geist', 'system-ui', sans-serif",
	},
});


export default function RootLayout() {
	const renderContent = () => {
		return (
			<QueryClientProvider client={queryClient}>
				<html.div style={styles.container}>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen name="(app)" />
					</Stack>
				</html.div>
			</QueryClientProvider>
		)
	};

	if (Platform.OS === 'web') {
		return (
			<div style={{ overflowY: 'auto', height: '100%' }}>
				{renderContent()}
			</div>
		)
	}
	return (
		renderContent()
	);
}
