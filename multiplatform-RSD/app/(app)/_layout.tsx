import { useGetApiUsersProfile } from '@/api/generated/users/users';
import { LogoIcon } from '@/assets/icons/LogoIcon/LogoIcon';
import { AppHeader } from '@/components/AppHeader';
import { Avatar } from '@/components/Avatar';
import { useAuth } from '@/lib/store/auth-context';
import { Stack, useRouter, Redirect } from 'expo-router';
import { Platform } from 'react-native';
import { html, css } from 'react-strict-dom';

export const AppLayout = () => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();
	const { isAuthenticated, isLoading } = useAuth();

	// If still loading, don't render anything yet
	if (isLoading) {
		return null;
	}

	// If not authenticated, redirect to login
	if (!isAuthenticated) {
		return <Redirect href="/(auth)/login" />;
	}

	return (
		<html.div style={styles.layoutContainer}>
			<Stack
				screenOptions={{
					...(Platform.OS === 'web'
						? {
							header: () => (
								<AppHeader
									onLogoPress={() => router.navigate('/')}
									onAvatarPress={() => router.navigate('/profile')}
									userName={userProfile?.name}
								/>
							),
						}
						: {
							headerRight: () => (
								<html.button
									style={styles.avatarContainer}
									onClick={() => router.navigate('/profile')}
								>
									<Avatar name={userProfile?.name ?? 'Unknown'} size="sm" />
								</html.button>
							),
						}),
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
		borderWidth: '0',
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
