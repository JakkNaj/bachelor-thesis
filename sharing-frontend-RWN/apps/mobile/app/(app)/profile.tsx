import { useGetApiUsersProfile } from '@monorepo/shared/src/api/generated/users/users';
import { Button } from '@monorepo/shared/src/components/Button';
import { colors, fontSizes, spacing } from '@monorepo/shared/src/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { authStorage } from '../lib/auth/auth-storage';

export const Profile = () => {
	const router = useRouter();
	const { data: userProfile } = useGetApiUsersProfile();

	const handleLogout = async () => {
		await authStorage.removeToken();
		await authStorage.removeUser();
		router.replace('/(auth)/login' as any);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings</Text>
			<View style={styles.infoContainer}>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Name:</Text>
					<Text style={styles.value}>{userProfile?.data?.name}</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.label}>Email:</Text>
					<Text style={styles.value}>{userProfile?.data?.email}</Text>
				</View>
			</View>
			<Button
				variant="danger"
				outlined
				fullWidth
				onPress={handleLogout}
				style={styles.logoutButton}
			>
				Logout
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		padding: spacing[4],
	},
	title: {
		fontSize: fontSizes['4xl'],
		fontWeight: '700',
		marginBottom: spacing[8],
		color: colors.slate[900],
	},
	infoContainer: {
		gap: spacing[4],
		marginBottom: spacing[4],
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing[2],
	},
	label: {
		fontSize: fontSizes.lg,
		color: colors.slate[700],
		fontWeight: '500',
	},
	value: {
		fontSize: fontSizes.lg,
		color: colors.slate[900],
	},
	logoutButton: {
		marginTop: spacing[4],
	},
});

export default Profile;
