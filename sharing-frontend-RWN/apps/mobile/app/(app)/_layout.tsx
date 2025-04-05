import { useGetApiUsersProfile } from '@monorepo/shared/src/api/generated/users/users';
import { LogoIcon } from '@monorepo/shared/src/assets/icons/LogoIcon';
import { Avatar } from '@monorepo/shared/src/components/Avatar';
import { colors, fontSizes, fontWeights, spacing } from '@monorepo/shared/src/theme';
import { createStyles } from '@monorepo/shared/src/utils/createStyles';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { authStorage } from '../lib/auth/auth-storage';

export default function AppLayout() {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();

	const styles = useStyles();

	useEffect(() => {
		const checkAuth = async () => {
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
				headerRight: () => (
					<TouchableOpacity
						onPress={() => router.push('profile' as any)}
						style={{ marginRight: spacing[4] }}
					>
						<Avatar name={userProfile?.data?.name || 'Unknown'} size="sm" />
					</TouchableOpacity>
				),
				headerBackTitle: 'Back',
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: '',
					headerLeft: () => (
						<View style={styles.headerLeft}>
							<LogoIcon size={24} />
							<Text style={styles.logoText}>TripPlanner</Text>
						</View>
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

type TAppLayoutStyles = {
	headerLeft: object;
	logoText: object;
};

const useStyles = () => {
	return createStyles<TAppLayoutStyles>(theme => ({
		headerLeft: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			marginLeft: spacing[4],
		},
		logoText: {
			fontSize: fontSizes.xl,
			fontWeight: fontWeights.bold,
			marginLeft: spacing[2],
			color: colors.slate[900],
		},
	}));
};
