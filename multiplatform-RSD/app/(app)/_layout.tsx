import { useGetApiUsersProfile } from '@/api/generated/users/users';
import { LogoIcon } from '@/assets/icons/LogoIcon/LogoIcon';
import { Avatar } from '@/components/Avatar';
import { authService } from '@/lib/store/auth-service';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { html, css } from 'react-strict-dom';

export const AppLayout = () => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();

	useEffect(() => {
		const checkAuth = async () => {
            if (Platform.OS === 'web') {
                return;
            }
			const token = await authService.getToken();
			if (!token) {
				router.replace('/(auth)/login' as any);
			}
		};

		checkAuth();
	}, []);

	return (
		<html.div style={styles.layoutContainer}>
			<Stack
			screenOptions={{
				headerRight: () => (
					<html.div
					 style={[styles.avatarContainer, Platform.OS === 'web' && webStyles.avatarContainer]}
					 onClick={() => router.navigate('/profile')}>
						<Avatar name={userProfile?.name ?? 'Unknown'} size="sm" />
					</html.div>
				),
				}}
			>
				<Stack.Screen
					name="index"
					options={{
						title: '',
						headerLeft: () => (
							<html.div
							 style={[styles.headerContainer, Platform.OS === 'web' && webStyles.headerContainer]}
							 onClick={() => router.navigate('/')}>
								<LogoIcon size={32} />
								<html.h2 style={Platform.OS === 'web' && webStyles.h2}>TripPlanner</html.h2>
							</html.div>
						),
					}}
				/>
				<Stack.Screen
					name="trips/[id]"
					options={{
						title: Platform.OS === 'web' ? ' - trip details' : 'Trip Details',
						headerLeft: Platform.OS === 'web' ? () => (
							<html.div
							 style={[styles.headerContainer, webStyles.headerContainer]}
							 onClick={() => router.navigate('/')}>
								<LogoIcon size={32} />
								<html.h2>TripPlanner</html.h2>
							</html.div>
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
		</html.div>
	);
}

export default AppLayout;

const styles = css.create({
	layoutContainer: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		backgroundColor: 'white',
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '0.5rem',
		paddingBottom: '0.5rem',
	},
	avatarContainer: {
		paddingBottom: '0.5rem',
	},
});

const webStyles = css.create({
	headerContainer: {
		paddingBottom: 0,
		paddingLeft: '1rem',
		cursor: 'pointer',
	},
	avatarContainer: {
		paddingRight: '1rem',
		paddingBottom: '0',
	},
	h2: {
		cursor: 'pointer',
		fontSize: '1.125rem',
		fontWeight: 500,
	},
});
