import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AppHeader } from "@/components/AppHeader";
import { authStorage } from "@/lib/auth/auth-storage";

export default function AppLayout() {
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			const token = await authStorage.getToken();
			if (!token) {
				router.replace("/(auth)/login" as any);
			}
		};

		checkAuth();
	}, []);

	return (
		<Stack
			screenOptions={{
				header: () => <AppHeader />,
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
