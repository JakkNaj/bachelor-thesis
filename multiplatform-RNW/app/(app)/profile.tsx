import { useRouter } from 'expo-router';
import { authService } from '../../lib/store/auth-service';
import { useGetApiUsersProfile } from '@/api/generated/users/users';
import { Button } from '@/components/Button';
import { ScreenWrapper } from '@/pages/(app)/layout/ScreenWrapper';
import { Platform, StyleSheet, View, Text } from 'react-native';

export const Profile = () => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();

	const handleLogout = async () => {
		await authService.removeAuth();
		router.replace('/(auth)/login' as any);
	};

	return (
		<ScreenWrapper>
			<View style={Platform.OS === 'web' ? webStyles.container : {}}>
				<Text style={styles.title}>Settings</Text>
				<View style={styles.infoContainer}>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Name:</Text>
						<Text style={styles.value}>{userProfile?.name}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.label}>Email:</Text>
						<Text style={styles.value}>{userProfile?.email}</Text>
					</View>
				</View>
				<Button
					title="Logout"
					onPress={handleLogout}
					variant="danger"
					outlined
					fullWidth
				/>
			</View>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: '700',
		marginBottom: 32,
		color: '#0f172a',
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		marginBottom: 16,
	},
	infoRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	label: {
		fontSize: 18,
		color: '#334155',
		fontWeight: '500',
	},
	value: {
		fontSize: 18,
		color: '#0f172a',
	},
});

const webStyles = StyleSheet.create({
	container: {
		padding: 16,
	},
});

export default Profile;
