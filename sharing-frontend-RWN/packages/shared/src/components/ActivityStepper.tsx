import { useState } from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import { Activity, ActivityInput, ActivityInputType } from '../api/generated/schemas';
import { CrossIcon } from '../assets/icons/CrossIcon';
import { DotsIcon } from '../assets/icons/DotsIcon';
import { PencilIcon } from '../assets/icons/PencilIcon';
import { useActivityActions } from '../hooks/useActivityActions';
import { colors, spacing } from '../theme';
import { createStyles } from '../utils/createStyles';
import { formatDateTimeForActivityCard } from '../utils/dateUtils';

type TActivityStepperProps = {
	activities: Activity[];
	tripId: number;
	tripDates: {
		startDate: string;
		endDate: string;
	};
	/**
	 * Render prop for the activity form.
	 * This allows platform-specific implementations (modal on mobile, side panel on web)
	 */
	renderActivityForm: (props: {
		isVisible: boolean;
		onClose: () => void;
		initialData?: ActivityInput;
		onSubmit: (data: ActivityInput) => void;
		isSubmitting?: boolean;
		submitError?: Error | null;
		tripStartDate: string;
		tripEndDate: string;
	}) => React.ReactNode;
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

type TMenuState = {
	isVisible: boolean;
	activity: Activity | null;
	position: {
		top: number;
		right: number;
	};
};

export const ActivityStepper = ({
	activities,
	tripId,
	tripDates,
	renderActivityForm,
}: TActivityStepperProps) => {
	const styles = useStyles();
	const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
	const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null);
	const [menuState, setMenuState] = useState<TMenuState>({
		isVisible: false,
		activity: null,
		position: { top: 0, right: 0 },
	});

	const { updateActivity, deleteActivity, isUpdating, isDeleting, updateError } =
		useActivityActions({
			tripId,
			activityId: editingActivity?.id || deletingActivity?.id,
		});

	const handleUpdateActivity = (data: ActivityInput) => {
		if (!editingActivity) return;
		updateActivity(data, () => setEditingActivity(null));
	};

	const handleDelete = (activity: Activity) => {
		Alert.alert(
			'Delete Activity',
			'Are you sure you want to delete this activity? This action cannot be undone.',
			[
				{
					text: 'Cancel',
					style: 'cancel',
					onPress: () => setDeletingActivity(null),
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => {
						deleteActivity(activity.id, () => setDeletingActivity(null));
					},
				},
			]
		);
	};

	const handleOpenMenu = (activity: Activity, event: any) => {
		const { pageY, pageX } = event.nativeEvent;
		setMenuState({
			isVisible: true,
			activity,
			position: { top: pageY, right: pageX },
		});
	};

	const handleEdit = (activity: Activity) => {
		setMenuState(prev => ({ ...prev, isVisible: false }));
		setEditingActivity(activity);
	};

	const sortedActivities = activities.sort(
		(a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
	);

	return (
		<View>
			{/* Activities list */}
			<View>
				{sortedActivities.map((activity, index) => (
					<View
						key={activity.id}
						style={[
							styles.activityContainer,
							{ paddingBottom: index !== sortedActivities.length - 1 ? spacing[8] : 0 },
						]}
					>
						<View style={styles.lineContainer}>
							{index !== 0 && <View style={styles.topLine} />}
							{index !== sortedActivities.length - 1 && <View style={styles.bottomLine} />}
							<View style={styles.numberCircle}>
								<Text style={styles.numberText}>{index + 1}</Text>
							</View>
						</View>

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
								<Pressable onPress={e => handleOpenMenu(activity, e)} style={styles.menuButton}>
									<DotsIcon size={14} color={colors.slate[900]} />
								</Pressable>
							</View>
						</View>
					</View>
				))}
			</View>
			{/* Context Menu Modal */}
			<Modal
				visible={menuState.isVisible}
				transparent
				animationType="none"
				onRequestClose={() => setMenuState(prev => ({ ...prev, isVisible: false }))}
			>
				<Pressable
					style={styles.container}
					onPress={() => setMenuState(prev => ({ ...prev, isVisible: false }))}
				>
					<View
						style={[
							styles.menuContainer,
							{
								top: menuState.position.top - 20,
								right: 20,
								opacity: menuState.isVisible ? 1 : 0,
							},
						]}
					>
						<Pressable
							style={styles.menuOption}
							onPress={() => {
								setMenuState(prev => ({ ...prev, isVisible: false }));
								requestAnimationFrame(() => {
									menuState.activity && handleEdit(menuState.activity);
								});
							}}
						>
							<PencilIcon size={16} color={colors.slate[900]} />
							<Text style={styles.menuOptionText}>Edit</Text>
						</Pressable>
						<Pressable
							style={styles.menuOptionDelete}
							onPress={() => {
								setMenuState(prev => ({ ...prev, isVisible: false }));
								requestAnimationFrame(() => {
									if (menuState.activity) {
										setDeletingActivity(menuState.activity);
										handleDelete(menuState.activity);
									}
								});
							}}
						>
							<CrossIcon size={16} color={colors.red[500]} />
							<Text style={styles.menuOptionTextDelete}>Delete</Text>
						</Pressable>
					</View>
				</Pressable>
			</Modal>
			{/* Edit Activity Form */}
			{renderActivityForm({
				isVisible: !!editingActivity,
				onClose: () => setEditingActivity(null),
				initialData: editingActivity ? transformActivityToInput(editingActivity) : undefined,
				onSubmit: handleUpdateActivity,
				isSubmitting: isUpdating,
				submitError: updateError as Error | null,
				tripStartDate: tripDates.startDate,
				tripEndDate: tripDates.endDate,
			})}
		</View>
	);
};

const useStyles = () => {
	return createStyles(theme => ({
		container: {
			flex: 1,
		},
		activityContainer: {
			flexDirection: 'row',
			gap: theme.spacing[4],
			position: 'relative',
		},
		lineContainer: {
			width: theme.spacing[8],
			alignItems: 'center',
		},
		topLine: {
			position: 'absolute',
			width: 2,
			height: theme.spacing[6],
			backgroundColor: theme.colors.slate[300],
		},
		bottomLine: {
			position: 'absolute',
			top: theme.spacing[8],
			bottom: -32,
			width: 2,
			backgroundColor: theme.colors.slate[300],
		},
		numberCircle: {
			height: theme.spacing[8],
			width: theme.spacing[8],
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.radius.full,
			marginTop: theme.spacing[2],
			borderWidth: 1,
			borderColor: theme.colors.slate[300],
			backgroundColor: theme.colors.white,
			zIndex: 10,
		},
		numberText: {
			color: theme.colors.slate[900],
		},
		activityContent: {
			flex: 1,
			minWidth: 192,
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			borderColor: theme.colors.slate[200],
			padding: theme.spacing[4],
		},
		activityHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
		},
		contentContainer: {
			flex: 1,
		},
		title: {
			fontWeight: '600',
			fontSize: theme.fontSizes.lg,
			color: theme.colors.slate[900],
		},
		timestamp: {
			color: theme.colors.slate[600],
			fontSize: theme.fontSizes.sm,
			marginTop: theme.spacing[1],
		},
		description: {
			color: theme.colors.slate[700],
			marginTop: theme.spacing[2],
		},
		menuButton: {
			padding: theme.spacing[2],
			marginRight: -theme.spacing[2],
			marginTop: -theme.spacing[2],
		},
		menuContainer: {
			position: 'absolute',
			backgroundColor: theme.colors.white,
			borderRadius: theme.radius.lg,
			shadowColor: theme.colors.slate[900],
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			borderWidth: 1,
			borderColor: theme.colors.slate[200],
		},
		menuOption: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: theme.spacing[4],
			paddingVertical: theme.spacing[3],
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.slate[200],
		},
		menuOptionText: {
			marginLeft: theme.spacing[2],
			color: theme.colors.slate[900],
		},
		menuOptionDelete: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: theme.spacing[4],
			paddingVertical: theme.spacing[3],
		},
		menuOptionTextDelete: {
			marginLeft: theme.spacing[2],
			color: theme.colors.red[500],
		},
	}));
};
