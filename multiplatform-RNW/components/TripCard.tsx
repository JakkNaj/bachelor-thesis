import { Text, View, StyleSheet } from 'react-native';
import { Activity } from '@/api/generated/schemas';
import { EyeIcon } from '@/assets/icons/EyeIcon';
import { colors } from '@/assets/colors/colors';
import { formatDateRange } from '@/lib/utils/dateUtils';
import { Button } from './Button';

type TTripCardProps = {
	id: number;
	title: string;
	description?: string;
	startDate: string;
	endDate: string;
	activities: Activity[];
	onPressDetail: (id: number) => void;
};

export const TripCard = ({
	id,
	title,
	description,
	startDate,
	endDate,
	activities,
	onPressDetail,
}: TTripCardProps) => {

	// Function to get two random activities
	const getRandomActivities = (activities: Activity[]) => {
		const shuffled = [...activities].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 2);
	};

	const displayedActivities = getRandomActivities(activities);
	const hasMoreActivities = activities.length > 2;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.dateText}>{formatDateRange(startDate, endDate)}</Text>
			</View>

			{description && <Text style={styles.description}>{description}</Text>}

			<View style={styles.footer}>
				<View>
					{displayedActivities.length > 0 ? (
						<View style={styles.activitiesList}>
							{displayedActivities.map(activity => (
								<View key={activity.id} style={styles.activityItem}>
									<View style={[styles.dot, styles.activeDot]} />
									<Text style={styles.activityText}>{activity.title}</Text>
								</View>
							))}
							{hasMoreActivities && (
								<View style={styles.activityItem}>
									<View style={[styles.dot, styles.inactiveDot]} />
									<Text style={styles.moreText}>...and much more</Text>
								</View>
							)}
						</View>
					) : (
						<Text style={styles.noActivitiesText}>No activities added yet.</Text>
					)}
				</View>
				<Button
					variant="secondary"
					onPress={() => onPressDetail(id)}
					icon={<EyeIcon size={16} color={colors.slate[900]} />}
					title="View Trip"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		borderWidth: 1,
		borderColor: colors.slate[200],
		padding: 16,
		borderRadius: 16,
		backgroundColor: colors.white,
	},
	header: {
		flexDirection: 'row',
		marginBottom: 8,
		gap: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: colors.slate[900],
	},
	dateText: {
		fontSize: 14,
		color: colors.slate[900],
		marginBottom: 4,
	},
	description: {
		fontSize: 14,
		color: colors.slate[500],
		marginBottom: 8,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	activitiesList: {
		paddingBottom: 4,
		paddingTop: 8,
	},
	activityItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	dot: {
		height: 6,
		width: 6,
		borderRadius: '50%',
		marginRight: 8,
	},
	activeDot: {
		backgroundColor: colors.slate[700],
	},
	inactiveDot: {
		backgroundColor: colors.slate[500],
	},
	activityText: {
		fontSize: 14,
		color: colors.slate[700],
	},
	moreText: {
		fontSize: 14,
		color: colors.slate[500],
	},
	noActivitiesText: {
		fontSize: 14,
		color: colors.slate[500],
	},
});
