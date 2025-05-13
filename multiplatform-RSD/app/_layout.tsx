import '../stylex.css';
import '@expo/metro-runtime';
import { Stack } from "expo-router";
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { html, css } from 'react-strict-dom';
import { AuthProvider } from '@/lib/store/auth-context';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const styles = css.create({
	container: {
		flex: 1,
	},
});


export default function RootLayout() {
	useEffect(() => {
		if (Platform.OS === 'web') {
			const link = document.createElement('link');
			link.rel = 'preconnect';
			link.href = 'https://fonts.gstatic.com';
			link.crossOrigin = 'anonymous';
			document.head.appendChild(link);
		}
	}, []);
	
	const renderContent = () => {
		return (
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<html.div style={styles.container}>
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen name="(app)" />
						</Stack>
					</html.div>
				</AuthProvider>
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
