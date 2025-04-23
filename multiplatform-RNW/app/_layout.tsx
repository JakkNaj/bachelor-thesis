import { Stack } from "expo-router";
import { Platform, View, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { colors } from "@/assets/colors/colors";
import '../assets/styles/global.css';
import { AuthProvider } from "@/lib/store/auth-context";

const queryClient = new QueryClient();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		height: Platform.OS === 'web' ? '100vh' as unknown as number : '100%', // cannot use '100vh' in stylesheet
		width: '100%',
	},
});

export const RootLayout = () => {
	const renderContent = () => {
		return (
			<View style={styles.container}>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<Stack 
						screenOptions={{ 
							headerShown: false,
							contentStyle: {
								backgroundColor: colors.white,
							},
						}}
					>
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen name="(app)" />
						</Stack>
					</AuthProvider>
				</QueryClientProvider>
			</View>
		)
	}

	if (Platform.OS === 'web') {
		return (
			<div style={{ overflowY: 'auto', height: '100%' }}>
				{renderContent()}
			</div>
		)
	}

	return renderContent();
}

export default RootLayout;