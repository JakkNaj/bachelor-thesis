import { useRouter } from 'expo-router';
import { css, html } from 'react-strict-dom';
import { useAuth } from '@/lib/store/auth-context';
import { useGetApiUsersProfile } from '@/api/generated/users/users';
import { Button } from '@/components/Button';
import { ScreenWrapper } from '@/pages/(app)/layout/ScreenWrapper';
import { Platform } from 'react-native';
import { useState } from 'react';

export const Profile = () => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();
	const { signOut } = useAuth();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await signOut();
			router.navigate('/(auth)/login');
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<ScreenWrapper>
			<html.div style={Platform.OS === 'web' ? webStyles.container : {}}>
				<html.h1 style={styles.title}>Settings</html.h1>
				<html.div style={styles.infoContainer}>
					<html.div style={styles.infoRow}>
						<html.span style={styles.label}>Name:</html.span>
						<html.span style={styles.value}>{userProfile?.name}</html.span>
					</html.div>
					<html.div style={styles.infoRow}>
						<html.span style={styles.label}>Email:</html.span>
						<html.span style={styles.value}>{userProfile?.email}</html.span>
					</html.div>
				</html.div>
				<Button
					title={isLoggingOut ? "Logging out..." : "Logout"}
					onPress={handleLogout}
					variant="danger"
					outlined
					fullWidth
					disabled={isLoggingOut}
				/>
			</html.div>
		</ScreenWrapper>
	);
};

const styles = css.create({
	title: {
		fontSize: '2.25rem',
		fontWeight: '700',
		marginBottom: '2rem',
		color: '#0f172a',
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		marginBottom: '1rem',
	},
	infoRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: '0.5rem',
	},
	label: {
		fontSize: '1.125rem',
		color: '#334155',
		fontWeight: '500',
	},
	value: {
		fontSize: '1.125rem',
		color: '#0f172a',
	},
});

const webStyles = css.create({
	container: {
		padding: '1rem',
	},
});

export default Profile;
