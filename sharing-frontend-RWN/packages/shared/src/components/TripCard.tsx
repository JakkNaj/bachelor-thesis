import { Text, View } from 'react-native';
import { Activity } from '../api/generated/schemas';
import { EyeIcon } from '../assets/icons/EyeIcon';
import { colors, fontSizes, fontWeights, radius, spacing } from '../theme';
import { createStyles } from '../utils/createStyles';
import { formatDateRange } from '../utils/dateUtils';
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

type TTripCardStyles = {
	container: object;
	header: object;
	title: object;
	dateText: object;
	description: object;
	footer: object;
	activitiesList: object;
	activityItem: object;
	dot: object;
	activeDot: object;
	inactiveDot: object;
	activityText: object;
	moreText: object;
	noActivitiesText: object;
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
	const styles = useStyles();

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
				>
					View Trip
				</Button>
			</View>
		</View>
	);
};

const useStyles = () => {
	return createStyles<TTripCardStyles>(theme => ({
		container: {
			flex: 1,
			width: '100%',
			borderWidth: 1,
			borderColor: theme.colors.slate[200],
			padding: spacing[4],
			borderRadius: radius.lg,
			backgroundColor: colors.white,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
			marginBottom: spacing[2],
			gap: spacing[4],
		},
		title: {
			fontSize: fontSizes.xl,
			fontWeight: fontWeights.semibold,
			color: theme.colors.slate[900],
			flex: 1,
		},
		dateText: {
			fontSize: fontSizes.base,
			color: theme.colors.slate[900],
			marginBottom: spacing[1],
		},
		description: {
			fontSize: fontSizes.base,
			color: theme.colors.slate[500],
			marginBottom: spacing[2],
		},
		footer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
		},
		activitiesList: {
			paddingLeft: spacing[4],
			paddingBottom: spacing[1],
			paddingTop: spacing[2],
		},
		activityItem: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		dot: {
			height: 6,
			width: 6,
			borderRadius: radius.full,
			marginRight: spacing[2],
		},
		activeDot: {
			backgroundColor: theme.colors.slate[700],
		},
		inactiveDot: {
			backgroundColor: theme.colors.slate[500],
		},
		activityText: {
			fontSize: fontSizes.base,
			color: theme.colors.slate[700],
		},
		moreText: {
			fontSize: fontSizes.base,
			color: theme.colors.slate[500],
		},
		noActivitiesText: {
			fontSize: fontSizes.base,
			color: theme.colors.slate[500],
		},
	}));
};
