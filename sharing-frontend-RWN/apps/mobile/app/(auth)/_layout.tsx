import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function AuthLayout() {
	return (
		<View style={styles.container}>
			<Stack
				screenOptions={{
					headerShown: false,
					animation: 'none',
					gestureEnabled: false,
				}}
			>
				<Stack.Screen
					name="login"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="signup"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
