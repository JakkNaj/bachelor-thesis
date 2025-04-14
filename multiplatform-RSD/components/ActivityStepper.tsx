import { useState } from 'react';
import { Activity, ActivityInput, ActivityInputType } from '../api/generated/schemas';
import { useActivityActions } from '@/hooks/useActivityActions';
import { formatDateTimeForActivityCard } from '@/lib/utils/dateUtils';
import { colors } from '@/assets/colors/colors';
import { css, html } from 'react-strict-dom';
import { ActivityForm } from '@/components/ActivityForm';
import { Stepper } from '@/components/Stepper/Stepper';
import { Alert, Platform } from 'react-native';
import { ActivityContextMenu } from '@/components/ActivityContextMenu/ActivityContextMenu';
import { FormModal } from '@/components/FormModal/FormModal';

type TActivityStepperProps = {
	activities: Activity[];
	tripId: number;
	tripDates: {
		startDate: string;
		endDate: string;
	};
};

const transformActivityToInput = (activity: Activity): ActivityInput => {
	return {
		title: activity.title,
		description: activity.description,
		startTime: activity.startTime,
		endTime: activity.endTime,
		type: activity.type as ActivityInputType,
	};
};

export const ActivityStepper = ({
	activities,
	tripId,
	tripDates,
}: TActivityStepperProps) => {
	const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { updateActivity, deleteActivity, isUpdating, isDeleting, updateError } =
		useActivityActions({
			tripId,
			activityId: editingActivity?.id,
		});

	const handleUpdateActivity = (data: ActivityInput) => {
		if (!editingActivity) return;
		updateActivity(data, () => {
			setEditingActivity(null);
			setIsModalVisible(false);
		});
	};

	const handleOpenModal = (activity: Activity) => {
		setEditingActivity(activity);
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setEditingActivity(null);
		setIsModalVisible(false);
	};

	const handleDeleteActivity = (activity: Activity) => {
		if (Platform.OS === 'web') {
			if (window.confirm("Are you sure you want to delete this activity? This action cannot be undone.")) {
				deleteActivity(activity.id);
			}
		} else {
			Alert.alert(
				"Delete Activity",
				"Are you sure you want to delete this activity? This action cannot be undone.",
				[
					{
						text: "Cancel",
						style: "cancel"
					},
					{
						text: "Delete",
						onPress: () => {
							deleteActivity(activity.id);
						},
						style: "destructive"
					}
				]
			);
		}
	};

	const sortedActivities = activities.sort(
		(a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
	);

	return (
		<html.div style={[styles.container, Platform.OS === 'web' && webStyles.container]}>
			{/* Activities list */}
			<html.div style={[styles.activitiesList, Platform.OS === 'web' && webStyles.activitiesList]}>
				{sortedActivities.map((activity, index) => (
					<Stepper
						key={activity.id}
						index={index}
						isFirst={index === 0}
						isLast={index === sortedActivities.length - 1}
					>
						<html.div style={styles.activityContent()}>
							<html.div style={styles.activityHeader}>
								<html.div style={styles.contentContainer}>
									<html.h3 style={styles.title()}>{activity.title}</html.h3>
									<html.span style={styles.timestamp()}>
										{formatDateTimeForActivityCard(activity.startTime, activity.endTime)}
									</html.span>
									{activity.description && (
										<html.p style={styles.description()}>{activity.description}</html.p>
									)}
								</html.div>
								<ActivityContextMenu
									onEdit={() => handleOpenModal(activity)}
									onDelete={() => handleDeleteActivity(activity)}
									isDeleting={isDeleting && editingActivity?.id === activity.id}
								/>
							</html.div>
						</html.div>
					</Stepper>
				))}
			</html.div>
			
			{/* Edit Activity Form Modal */}
			<FormModal
				isVisible={isModalVisible}
				onClose={handleCloseModal}
				title="Edit Activity"
			>
				{editingActivity && (
					<ActivityForm
						initialData={transformActivityToInput(editingActivity)}
						onSubmit={handleUpdateActivity}
						isSubmitting={isUpdating}
						submitError={updateError as Error | null}
						tripStartDate={tripDates.startDate}
						tripEndDate={tripDates.endDate}
					/>
				)}
			</FormModal>
		</html.div>
	);
};

const styles = css.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	activitiesList: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	activityContent: () => ({
		flex: 1,
		minWidth: '12rem',
		borderRadius: '0.5rem',
		borderWidth: '0.0625rem',
		borderStyle: 'solid',
		borderColor: colors.slate[200],
		padding: '1rem',
		marginTop: '0.25rem',
	}),
	activityHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	contentContainer: {
		flex: 1,
	},
	title: () => ({
		fontWeight: '600',
		fontSize: '1.125rem',
		color: colors.slate[900],
		margin: 0,
	}),
	timestamp: () => ({
		color: colors.slate[600],
		fontSize: '0.875rem',
		marginTop: '0.25rem',
		display: 'block',
	}),
	description: () => ({
		color: colors.slate[700],
		marginTop: '0.5rem',
		margin: 0,
	}),
});

const webStyles = css.create({
	container: {
		width: '100%',
	},
	activitiesList: {
		width: '100%',
	},
});
