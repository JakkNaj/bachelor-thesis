import { useState } from 'react';
import { Activity, ActivityInput, ActivityInputType } from '../api/generated/schemas';
import { useActivityActions } from '@/hooks/useActivityActions';
import { formatDateTimeForActivityCard } from '@/lib/utils/dateUtils';
import { colors } from '@/assets/colors/colors';
import { ActivityForm } from '@/components/ActivityForm';
import { Stepper } from '@/components/Stepper';
import { Alert, Platform, View, Text, StyleSheet } from 'react-native';
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
		<View style={[styles.container, Platform.OS === 'web' && webStyles.container]}>
			{/* Activities list */}
			<View style={[styles.activitiesList, Platform.OS === 'web' && webStyles.activitiesList]}>
				{sortedActivities.map((activity, index) => (
					<Stepper
						key={activity.id}
						index={index}
						isFirst={index === 0}
						isLast={index === sortedActivities.length - 1}
					>
						<View style={styles.activityContent}>
							<View style={styles.activityHeader}>
								<View style={styles.contentContainer}>
									<Text style={styles.title}>{activity.title}</Text>
									<Text style={styles.timestamp}>
										{formatDateTimeForActivityCard(activity.startTime, activity.endTime)}
									</Text>
									{activity.description && (
										<Text style={styles.description}>{activity.description}</Text>
									)}
								</View>
								<ActivityContextMenu
									onEdit={() => handleOpenModal(activity)}
									onDelete={() => handleDeleteActivity(activity)}
									isDeleting={isDeleting && editingActivity?.id === activity.id}
								/>
							</View>
						</View>
					</Stepper>
				))}
			</View>
			
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
		height: '100%',
	},
	activitiesList: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	activityContent: {
		flex: 1,
		minWidth: 192,
		borderRadius: 8,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.slate[200],
		padding: 16,
		marginTop: 4,
	},
	activityHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	contentContainer: {
		flex: 1,
	},
	title: {
		fontWeight: '600',
		fontSize: 18,
		color: colors.slate[900],
		margin: 0,
	},
	timestamp: {
		color: colors.slate[600],
		fontSize: 14,
		marginTop: 4,
	},
	description: {
		color: colors.slate[700],
		marginTop: 8,
	},
});

const webStyles = StyleSheet.create({
	container: {
		width: '100%',
        maxWidth: 980,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
	},
	activitiesList: {
		width: '100%',
	},
});
