import { LogoIcon } from '@/assets/icons/LogoIcon/LogoIcon';
import authStorage from '@/lib/store/auth-storage';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { html } from 'react-strict-dom';

export default function AppLayout() {
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
            if (Platform.OS === 'web') {
                return;
            }
			const token = await authStorage.getToken();
			if (!token) {
				router.replace('/(auth)/login' as any);
			}
		};

		checkAuth();
	}, []);

	return (
		<Stack
			screenOptions={{
				headerShown: Platform.OS !== 'web',
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: '',
					headerLeft: () => (
						<html.div>
							<LogoIcon size={24} />
							<html.h2>TripPlanner</html.h2>
						</html.div>
					),
				}}
			/>
			<Stack.Screen
				name="trips/[id]"
				options={{
					title: 'Trip Details',
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					title: 'Profile',
				}}
			/>
		</Stack>
	);
}


