import { Activity } from '../api/generated/schemas';
import { Button } from './Button';
import { formatDateRange } from '@/lib/utils/dateUtils';
import { EyeIcon } from '@/assets/icons/EyeIcon/EyeIcon';
import { colors } from '@/assets/colors/colors';
import { css, html } from 'react-strict-dom';
import { Platform } from 'react-native';

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
		<html.div style={styles.container()}>
			<html.div style={styles.header}>
				<html.h3 style={styles.title()}>{title}</html.h3>
				<html.span style={styles.dateText()}>{formatDateRange(startDate, endDate)}</html.span>
			</html.div>

			{description && <html.p style={styles.description()}>{description}</html.p>}

			<html.div style={styles.footer}>
				<html.div>
					{displayedActivities.length > 0 ? (
						<html.div style={styles.activitiesList}>
							{displayedActivities.map(activity => (
								<html.div key={activity.id} style={styles.activityItem}>
									<html.div style={[styles.dot, styles.activeDot()]} />
									<html.span style={styles.activityText()}>{activity.title}</html.span>
								</html.div>
							))}
							{hasMoreActivities && (
								<html.div style={styles.activityItem}>
									<html.div style={[styles.dot, styles.inactiveDot()]} />
									<html.span style={styles.moreText()}>...and much more</html.span>
								</html.div>
							)}
						</html.div>
					) : (
						<html.p style={styles.noActivitiesText()}>No activities added yet.</html.p>
					)}
				</html.div>
				<Button
					title="View Trip"
					onPress={() => onPressDetail(id)}
					icon={<EyeIcon size={16} color={colors.slate[900]} />}
					variant="secondary"
                    style={styles.footerButton}
				/>
			</html.div>
		</html.div>
	);
};

const styles = css.create({
	container: () => ({
		display: 'flex',
		flexDirection: 'column',
		borderWidth: '0.0625rem',
		borderStyle: 'solid',
		borderColor: colors.slate[200],
		padding: '1rem',
		borderRadius: '0.5rem',
		backgroundColor: colors.white,
	}),
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: '0.5rem',
		gap: '0.4rem',
		flexWrap: 'wrap',
	},
	title: () => ({
		fontSize: '1.25rem',
		fontWeight: '600',
		color: colors.slate[900],
		flex: '1 1 auto',
		margin: '0',
	}),
	dateText: () => ({
		fontSize: '1rem',
		color: colors.slate[900],
		marginBottom: '0.25rem',
	}),
	description: () => ({
		fontSize: '1rem',
		color: colors.slate[500],
		marginBottom: '0.5rem',
		margin: '0',
	}),
	footer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
    footerButton: {
        paddingBottom: '0',
        alignSelf: 'flex-end',
    },
	activitiesList: {
		paddingBottom: '0.25rem',
		paddingTop: '0.5rem',
	},
	activityItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	dot: {
		height: '0.375rem',
		width: '0.375rem',
		borderRadius: '9999px',
		marginRight: '0.5rem',
	},
	activeDot: () => ({
		backgroundColor: colors.slate[700],
	}),
	inactiveDot: () => ({
		backgroundColor: colors.slate[500],
	}),
	activityText: () => ({
		fontSize: '1rem',
		color: colors.slate[700],
	}),
	moreText: () => ({
		fontSize: '1rem',
		color: colors.slate[500],
	}),
	noActivitiesText: () => ({
		fontSize: '1rem',
		color: colors.slate[500],
		margin: '0',
	}),
});
