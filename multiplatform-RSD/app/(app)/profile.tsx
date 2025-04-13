import { useRouter } from 'expo-router';
import { css, html } from 'react-strict-dom';
import { authService } from '../../lib/store/auth-service';
import { useGetApiUsersProfile } from '@/api/generated/users/users';
import { Button } from '@/components/Button';

export const Profile = () => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();

	const handleLogout = async () => {
		await authService.removeAuth();
		router.replace('/(auth)/login' as any);
	};

	return (
		<html.div style={styles.container}>
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
				title="Logout"
				onPress={handleLogout}
			/>
		</html.div>
	);
};

const styles = css.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		paddingTop: '1.5rem',
		paddingRight: '1.5rem',
		paddingBottom: '1.5rem',
		paddingLeft: '1.5rem',
	},
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

export default Profile;
