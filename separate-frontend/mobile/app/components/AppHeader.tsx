import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authStorage } from "@/lib/auth/auth-storage";
import { useGetApiUsersProfile } from "@/api/generated/users/users";
import { Avatar } from "@/components/Avatar";

type TAppHeaderProps = {
	onLogout?: () => void;
};

export const AppHeader = ({ onLogout }: TAppHeaderProps) => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();
	const insets = useSafeAreaInsets();

	const handleLogout = async () => {
		await authStorage.removeToken();
		await authStorage.removeUser();
		router.replace("/(auth)/login" as any);
		onLogout?.();
	};

	return (
		<View style={{ paddingTop: insets.top }} className="bg-white border-b border-slate-200">
			<View className="flex-row justify-between items-center px-4 py-3">
				<Text className="text-xl font-bold">TripPlanner</Text>
				<TouchableOpacity onPress={handleLogout}>
					<Avatar name={userProfile?.name || "Unknown"} size="sm" />
				</TouchableOpacity>
			</View>
		</View>
	);
};
