import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
	return (
		<View className="flex-1 bg-orange-500">
			<Stack
				screenOptions={{
					headerShown: false,
					animation: "none",
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
