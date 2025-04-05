import type { AuthResponse } from '@monorepo/shared/src/api/generated/schemas/authResponse';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginForm } from './components/LoginForm';
import { LogoutButton } from './components/LogoutButton';
import { TestTripsButton } from './components/TestTripsButton';
import authStorage from './lib/auth/auth-storage';
import './api/axios-config';


const queryClient = new QueryClient();

export default function App() {
	const handleLoginSuccess = (data: AuthResponse) => {
		console.log('Login successful:', data);
		// Save the token to SecureStore
		if (data.token) {
			authStorage.saveToken(data.token);
		}
	};

	return (
		<QueryClientProvider client={queryClient}>
			<View style={styles.container}>
				<Text style={styles.title}>Login</Text>
				<LoginForm onSuccess={handleLoginSuccess} />
				<TestTripsButton />
				<LogoutButton />
			</View>
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
});
