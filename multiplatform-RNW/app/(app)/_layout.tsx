import { useGetApiUsersProfile } from '@/api/generated/users/users';
import { LogoIcon } from '@/assets/icons/LogoIcon';
import { Avatar } from '@/components/Avatar';
import { authService } from '@/lib/store/auth-service';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform, View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/assets/colors/colors';

export const AppLayout = () => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();

	useEffect(() => {
		const checkAuth = async () => {
            if (Platform.OS === 'web') {
                return;
                const user = await authService.getUser();
                if (!user) {
                    console.log('no user, please log in');
                    router.replace('/(auth)/login' as any);
                }
            }
			const token = await authService.getToken();
			if (!token) {
				router.replace('/(auth)/login' as any);
			}
		};

		checkAuth();
	}, []);

	return (
		<View style={styles.layoutContainer}>
			<Stack
			screenOptions={{
				headerRight: () => (
					<Pressable
					 style={[styles.avatarContainer, Platform.OS === 'web' && styles.webAvatarContainer]}
					 onPress={() => router.navigate('/profile')}>
						<Avatar name={userProfile?.name ?? 'Unknown'} size="sm" />
					</Pressable>
				),
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						title: '',
						headerLeft: () => (
							<Pressable
							 style={[styles.headerContainer, Platform.OS === 'web' && styles.webHeaderContainer]}
							 onPress={() => router.navigate('/')}>
								<LogoIcon size={32} />
								<Text style={[styles.headerTitle, Platform.OS === 'web' && styles.webHeaderTitle]}>
									TripPlanner
								</Text>
							</Pressable>
						),
					}}
				/>
				<Stack.Screen
					name="trips/[id]"
					options={{
						title: Platform.OS === 'web' ? ' - trip details' : 'Trip Details',
						headerLeft: Platform.OS === 'web' ? () => (
							<Pressable
							 style={[styles.headerContainer, styles.webHeaderContainer]}
							 onPress={() => router.navigate('/')}>
								<LogoIcon size={32} />
								<Text style={styles.headerTitle}>TripPlanner</Text>
							</Pressable>
						) : undefined
					}}
				/>
				<Stack.Screen
					name="profile"
					options={{
						title: 'Profile',
						headerRight: () => null,
					}}
				/>
			</Stack>
		</View>
	);
}

export default AppLayout;

const styles = StyleSheet.create({
	layoutContainer: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		backgroundColor: colors.white,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
		paddingBottom: 8,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: colors.slate[900],
	},
	avatarContainer: {
		paddingBottom: 8,
	},
	webHeaderContainer: {
		paddingBottom: 0,
		paddingLeft: 16,
	},
	webAvatarContainer: {
		paddingRight: 16,
		paddingBottom: 0,
	},
	webHeaderTitle: {
		cursor: 'pointer',
	},
});
