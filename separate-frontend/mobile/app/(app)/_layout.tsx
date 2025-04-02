import { useEffect } from "react";
import { Stack, useRouter, usePathname } from "expo-router";
import { authStorage } from "@/lib/auth/auth-storage";
import { Avatar } from "@/components/Avatar";
import { useGetApiUsersProfile } from "@/api/generated/users/users";
import { TouchableOpacity, View, Text } from "react-native";
import { LogoIcon } from "@/assets/icons/LogoIcon";

export default function AppLayout() {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();

	useEffect(() => {
		const checkAuth = async () => {
			const token = await authStorage.getToken();
			if (!token) {
				router.replace("/(auth)/login" as any);
			}
		};

		checkAuth();
	}, []);

	const handleLogout = async () => {
		await authStorage.removeToken();
		await authStorage.removeUser();
		router.replace("/(auth)/login" as any);
	};

	return (
		<Stack
			screenOptions={{
				headerRight: () => (
					<TouchableOpacity onPress={() => router.push("/profile")} className="mr-4">
						<Avatar name={userProfile?.name || "Unknown"} size="sm" />
					</TouchableOpacity>
				),
				headerBackTitle: "Back",
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "",
					headerLeft: () => (
						<View className="flex-row items-center ml-4">
							<LogoIcon size={24} />
							<Text className="text-xl font-bold ml-2">TripPlanner</Text>
						</View>
					),
				}}
			/>
			<Stack.Screen
				name="trips/[id]"
				options={{
					title: "Trip Details",
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					title: "Profile",
				}}
			/>
		</Stack>
	);
}
