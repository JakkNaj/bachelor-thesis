import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { authStorage } from "@/lib/auth/auth-storage";
import { useGetApiUsersProfile } from "@/api/generated/users/users";

export const Profile = () => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();

	const handleLogout = async () => {
		await authStorage.removeToken();
		await authStorage.removeUser();
		router.replace("/(auth)/login" as any);
	};

	return (
		<View className="flex-1 bg-white p-4 gap-4">
			<Text className="text-4xl font-bold mb-8">Settings</Text>
			<Text>Name: {userProfile?.name}</Text>
			<Text>Email: {userProfile?.email}</Text>
			<Button variant="danger" outlined fullWidth onPress={handleLogout} className="mt-4">
				Logout
			</Button>
		</View>
	);
};

export default Profile;
