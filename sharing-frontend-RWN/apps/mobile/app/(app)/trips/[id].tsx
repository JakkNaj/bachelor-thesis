import { ActivityInput, TripInput } from '@monorepo/shared/src/api/generated/schemas';
import { useGetApiTripsId } from '@monorepo/shared/src/api/generated/trips/trips';
import { BackIcon } from '@monorepo/shared/src/assets/icons/BackIcon';
import { CrossIcon } from '@monorepo/shared/src/assets/icons/CrossIcon';
import { DotsIcon } from '@monorepo/shared/src/assets/icons/DotsIcon';
import { PencilIcon } from '@monorepo/shared/src/assets/icons/PencilIcon';
import { PlusIcon } from '@monorepo/shared/src/assets/icons/PlusIcon';
import { ActivityStepper } from '@monorepo/shared/src/components/ActivityStepper';
import { Button } from '@monorepo/shared/src/components/Button';
import { useActivityActions } from '@monorepo/shared/src/hooks/useActivityActions';
import { useTripActions } from '@monorepo/shared/src/hooks/useTripActions';
import { colors } from '@monorepo/shared/src/theme';
import { createStyles } from '@monorepo/shared/src/utils/createStyles';
import { formatDateRange } from '@monorepo/shared/src/utils/dateUtils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ActivityFormModal } from '../../components/ActivityFormModal';
import { TripFormModal } from '../../components/TripFormModal';

type TMenuState = {
	isVisible: boolean;
	position: {
		top: number;
		right: number;
	};
};

export const TripDetail = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const styles = useStyles();
	const tripId = parseInt(id);

	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isAddActivityModalVisible, setIsAddActivityModalVisible] = useState(false);
	const [menuState, setMenuState] = useState<TMenuState>({
		isVisible: false,
		position: { top: 0, right: 0 },
	});

	const { data: trip, isLoading } = useGetApiTripsId(tripId);
	const { updateTrip, deleteTrip, isUpdating, isDeleting, updateError } = useTripActions({
		tripId,
	});
	const {
		createActivity,
		isCreating: isCreatingActivity,
		createError: createActivityError,
	} = useActivityActions({ tripId });

	const handleBackPress = () => {
		router.back();
	};

	const handleOpenMenu = (event: any) => {
		const { pageY, pageX } = event.nativeEvent;
		setMenuState({
			isVisible: true,
			position: { top: pageY, right: pageX },
		});
	};

	const handleUpdateTrip = (data: TripInput) => {
		updateTrip(data, () => setIsEditModalVisible(false));
	};

	const handleDeleteTrip = () => {
		Alert.alert(
			'Delete Trip',
			'Are you sure you want to delete this trip? This will permanently delete the trip and all its activities. This action cannot be undone.',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => {
						deleteTrip(() => router.back());
					},
				},
			]
		);
	};

	const handleAddActivity = (data: ActivityInput) => {
		createActivity(data, () => {
			setIsAddActivityModalVisible(false);
		});
	};

	if (isLoading) {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
					<BackIcon size={24} color={colors.slate[200]} />
					<Text style={styles.backButtonText}>Back to Home</Text>
				</TouchableOpacity>
				<Text style={styles.loadingText}>Loading trip details...</Text>
			</View>
		);
	}

	if (!trip) {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
					<BackIcon size={24} color={colors.slate[200]} />
					<Text style={styles.backButtonText}>Back to Home</Text>
				</TouchableOpacity>
				<Text style={styles.loadingText}>Trip not found</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.content}>
				<View style={styles.tripDetails}>
					<View style={styles.header}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>{trip.data.title}</Text>
							<Text style={styles.dateText}>
								{formatDateRange(trip.data.startDate, trip.data.endDate)}
							</Text>
						</View>
						<Pressable onPress={handleOpenMenu} style={styles.menuButton}>
							<DotsIcon size={16} color={colors.slate[900]} />
						</Pressable>
					</View>
					{trip.data.description && <Text style={styles.description}>{trip.data.description}</Text>}
				</View>

				<View style={styles.activitiesSection}>
					<View style={styles.activitiesHeader}>
						<Text style={styles.activitiesTitle}>Activities</Text>
						<Button
							variant="primary"
							icon={<PlusIcon size={16} color={colors.white} />}
							onPress={() => setIsAddActivityModalVisible(true)}
						>
							Add Activity
						</Button>
					</View>

					{trip.data.activities?.length ? (
						<ActivityStepper
							activities={trip.data.activities}
							tripId={tripId}
							tripDates={{ startDate: trip.data.startDate, endDate: trip.data.endDate }}
							renderActivityForm={props => (
								<ActivityFormModal
									isVisible={props.isVisible}
									onClose={props.onClose}
									initialData={props.initialData}
									onSubmit={props.onSubmit}
									isSubmitting={props.isSubmitting || false}
									submitError={props.submitError}
									tripStartDate={props.tripStartDate}
									tripEndDate={props.tripEndDate}
								/>
							)}
						/>
					) : (
						<View style={styles.emptyState}>
							<Text style={styles.emptyStateTitle}>No activities added yet.</Text>
							<Text style={styles.emptyStateText}>Start by adding your first activity.</Text>
							<Button
								variant="secondary"
								outlined
								onPress={() => setIsAddActivityModalVisible(true)}
							>
								Add your first activity
							</Button>
						</View>
					)}
				</View>
			</View>

			<Modal
				visible={menuState.isVisible}
				transparent
				animationType="none"
				onRequestClose={() => setMenuState(prev => ({ ...prev, isVisible: false }))}
			>
				<Pressable
					style={styles.menuOverlay}
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
									setIsEditModalVisible(true);
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
									handleDeleteTrip();
								});
							}}
						>
							<CrossIcon size={16} color={colors.red[500]} />
							<Text style={styles.menuOptionTextDelete}>Delete</Text>
						</Pressable>
					</View>
				</Pressable>
			</Modal>

			<TripFormModal
				isVisible={isEditModalVisible}
				onClose={() => setIsEditModalVisible(false)}
				onSubmit={handleUpdateTrip}
				isSubmitting={isUpdating}
				submitError={updateError as Error | null}
				initialData={trip.data}
			/>

			<ActivityFormModal
				isVisible={isAddActivityModalVisible}
				onClose={() => setIsAddActivityModalVisible(false)}
				onSubmit={handleAddActivity}
				isSubmitting={isCreatingActivity}
				submitError={createActivityError as Error | null}
				tripStartDate={trip.data.startDate}
				tripEndDate={trip.data.endDate}
			/>
		</ScrollView>
	);
};

export default TripDetail;

const useStyles = () => {
	return createStyles(theme => ({
		container: {
			flex: 1,
			backgroundColor: theme.colors.white,
		},
		scrollView: {
			flex: 1,
			backgroundColor: theme.colors.white,
			paddingTop: theme.spacing[2],
		},
		content: {
			padding: theme.spacing[4],
			gap: theme.spacing[6],
		},
		tripDetails: {
			gap: theme.spacing[2],
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
		},
		titleContainer: {
			flex: 1,
		},
		title: {
			fontSize: theme.fontSizes['4xl'],
			fontWeight: '700',
			color: theme.colors.slate[900],
		},
		dateText: {
			fontSize: theme.fontSizes.lg,
			color: theme.colors.slate[600],
			marginTop: theme.spacing[2],
		},
		description: {
			fontSize: theme.fontSizes.lg,
			color: theme.colors.slate[600],
		},
		menuButton: {
			padding: theme.spacing[2],
			marginRight: -theme.spacing[2],
			marginTop: -theme.spacing[2],
		},
		activitiesSection: {
			gap: theme.spacing[4],
		},
		activitiesHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		activitiesTitle: {
			fontSize: theme.fontSizes['2xl'],
			fontWeight: '700',
			color: theme.colors.slate[900],
		},
		emptyState: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: theme.spacing[8],
		},
		emptyStateTitle: {
			fontSize: theme.fontSizes.lg,
			color: theme.colors.slate[700],
			marginBottom: theme.spacing[4],
		},
		emptyStateText: {
			fontSize: theme.fontSizes.base,
			color: theme.colors.slate[600],
			marginBottom: theme.spacing[6],
		},
		menuOverlay: {
			flex: 1,
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
			width: 140,
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
		backButton: {
			marginBottom: theme.spacing[4],
			flexDirection: 'row',
			alignItems: 'center',
			gap: theme.spacing[2],
		},
		backButtonText: {
			fontSize: theme.fontSizes.lg,
			color: theme.colors.primary[600],
		},
		loadingText: {
			fontSize: theme.fontSizes.lg,
			color: theme.colors.slate[500],
		},
	}));
};
