import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import authStorage from '../lib/auth/auth-storage';

export const LogoutButton = () => {
	const handleLogout = async () => {
		try {
			// Clear token and user data from SecureStore
			await authStorage.removeToken();
			await authStorage.removeUser();
			console.log('Logged out successfully');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	return (
		<View style={styles.container}>
			<Button title="Logout" onPress={handleLogout} color="#EF4444" />
		</View>
	);
};

export default LogoutButton;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		alignItems: 'center',
	},
});
