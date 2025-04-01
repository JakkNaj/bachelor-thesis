import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetApiTripsId, getGetApiTripsIdQueryKey } from "@/api/generated/trips/trips";
import { usePostApiActivitiesTripTripId } from "@/api/generated/activities/activities";
import { Button } from "@/components/Button";
import { formatDateRange } from "@/lib/utils/dateUtils";
import { useState, useEffect } from "react";
import { TripFormModal } from "@/components/TripFormModal";
import { useDeleteApiTripsId, usePutApiTripsId } from "@/api/generated/trips/trips";
import { TripInput, ActivityInput } from "@/api/generated/schemas";
import { PencilIcon } from "@/../assets/icons/PencilIcon";
import { PlusIcon } from "@/../assets/icons/PlusIcon";
import { BackIcon } from "@/../assets/icons/BackIcon";
import { DotsIcon } from "@/../assets/icons/DotsIcon";
import { CrossIcon } from "@/../assets/icons/CrossIcon";
import { ActivityStepper } from "@/components/ActivityStepper";
import { useQueryClient } from "@tanstack/react-query";
import { ActivityFormModal } from "@/components/ActivityFormModal";

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
	const queryClient = useQueryClient();
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [isAddActivityModalVisible, setIsAddActivityModalVisible] = useState(false);
	const [menuState, setMenuState] = useState<TMenuState>({
		isVisible: false,
		position: { top: 0, right: 0 },
	});

	const { data: trip, isLoading } = useGetApiTripsId(parseInt(id));
	const { mutate: updateTrip, isPending: isUpdating, error: updateError } = usePutApiTripsId();
	const { mutate: deleteTrip, isPending: isDeleting } = useDeleteApiTripsId();
	const { mutate: createActivity, isPending: isCreatingActivity, error: createActivityError } = usePostApiActivitiesTripTripId();

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
		updateTrip(
			{ id: parseInt(id), data },
			{
				onSuccess: () => {
					setIsEditModalVisible(false);
				},
			}
		);
	};

	const handleDeleteTrip = () => {
		Alert.alert(
			"Delete Trip",
			"Are you sure you want to delete this trip? This will permanently delete the trip and all its activities. This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: () => {
						deleteTrip(
							{ id: parseInt(id) },
							{
								onSuccess: () => {
									router.replace("/(app)");
								},
							}
						);
					},
				},
			]
		);
	};

	const handleActivityUpdated = () => {
		queryClient.invalidateQueries({ queryKey: getGetApiTripsIdQueryKey(parseInt(id)) });
	};

	const handleAddActivity = (data: ActivityInput) => {
		createActivity(
			{ tripId: parseInt(id), data },
			{
				onSuccess: () => {
					setIsAddActivityModalVisible(false);
					handleActivityUpdated();
				},
			}
		);
	};

	if (isLoading) {
		return (
			<View className="flex-1 bg-white p-4">
				<TouchableOpacity onPress={handleBackPress} className="mb-4 flex-row items-center gap-2">
					<BackIcon size={24} color="#e2e8f0" />
					<Text className="text-primary-600 text-lg">Back to Home</Text>
				</TouchableOpacity>
				<Text className="text-lg text-slate-500">Loading trip details...</Text>
			</View>
		);
	}

	if (!trip) {
		return (
			<View className="flex-1 bg-white p-4">
				<TouchableOpacity onPress={handleBackPress} className="mb-4 flex-row items-center gap-2">
					<BackIcon size={24} color="#e2e8f0" />
					<Text className="text-primary-600 text-lg">Back to Home</Text>
				</TouchableOpacity>
				<Text className="text-lg text-slate-500">Trip not found</Text>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-white">
			<View className="p-4 flex flex-col gap-6">
				{/* Header with Back Button */}
				<TouchableOpacity onPress={handleBackPress} className="flex-row items-center gap-2">
					<BackIcon size={24} color="#1e293b" />
					<Text className="text-primary-600 text-lg">Back to Home</Text>
				</TouchableOpacity>

				{/* Trip Details */}
				<View className="flex flex-col gap-2">
					<View className="flex-row justify-between items-start">
						<View className="flex-1">
							<Text className="text-4xl font-bold text-slate-900">{trip.title}</Text>
							<Text className="text-lg text-slate-600 mt-2">{formatDateRange(trip.startDate, trip.endDate)}</Text>
						</View>
						<Pressable onPress={handleOpenMenu} className="p-2 -mr-2 -mt-2">
							<DotsIcon size={16} color="#0f172a" />
						</Pressable>
					</View>
					{trip.description && <Text className="text-lg text-slate-600">{trip.description}</Text>}
				</View>

				{/* Activities Section */}
				<View className="flex flex-col gap-4">
					<View className="flex-row justify-between items-center">
						<Text className="text-2xl font-bold text-slate-900">Activities</Text>
						<Button
							variant="primary"
							icon={<PlusIcon size={16} color="#ffffff" />}
							onPress={() => setIsAddActivityModalVisible(true)}
						>
							Add Activity
						</Button>
					</View>

					{trip.activities?.length ? (
						<ActivityStepper
							activities={trip.activities}
							onActivityUpdated={handleActivityUpdated}
							tripDates={{ startDate: trip.startDate, endDate: trip.endDate }}
						/>
					) : (
						<View className="flex-1 items-center justify-center py-8">
							<Text className="text-lg text-slate-700 mb-4">No activities added yet.</Text>
							<Text className="text-base text-slate-600 mb-6">Start by adding your first activity.</Text>
							<Button variant="secondary" outlined className="self-center" onPress={() => setIsAddActivityModalVisible(true)}>
								Add your first activity
							</Button>
						</View>
					)}
				</View>
			</View>

			{/* Context Menu Modal */}
			<Modal
				visible={menuState.isVisible}
				transparent
				animationType="none"
				onRequestClose={() => setMenuState((prev) => ({ ...prev, isVisible: false }))}
			>
				<Pressable className="flex-1" onPress={() => setMenuState((prev) => ({ ...prev, isVisible: false }))}>
					<View
						className="absolute bg-white rounded-lg shadow-lg border border-slate-200"
						style={{
							top: menuState.position.top - 20,
							right: 20,
							opacity: menuState.isVisible ? 1 : 0,
						}}
					>
						<Pressable
							className="flex-row items-center px-4 py-3 border-b border-slate-200"
							onPress={() => {
								setMenuState((prev) => ({ ...prev, isVisible: false }));
								requestAnimationFrame(() => {
									setIsEditModalVisible(true);
								});
							}}
						>
							<PencilIcon size={16} color="#0f172a" />
							<Text className="ml-2 text-slate-900">Edit</Text>
						</Pressable>
						<Pressable
							className="flex-row items-center px-4 py-3"
							onPress={() => {
								setMenuState((prev) => ({ ...prev, isVisible: false }));
								requestAnimationFrame(() => {
									handleDeleteTrip();
								});
							}}
						>
							<CrossIcon size={16} color="#ef4444" />
							<Text className="ml-2 text-red-500">Delete</Text>
						</Pressable>
					</View>
				</Pressable>
			</Modal>

			{/* Edit Trip Modal */}
			<TripFormModal
				isVisible={isEditModalVisible}
				onClose={() => setIsEditModalVisible(false)}
				onSubmit={handleUpdateTrip}
				isSubmitting={isUpdating}
				submitError={updateError as Error | null}
				initialData={trip}
			/>

			{/* Add Activity Modal */}
			<ActivityFormModal
				isVisible={isAddActivityModalVisible}
				onClose={() => setIsAddActivityModalVisible(false)}
				onSubmit={handleAddActivity}
				isSubmitting={isCreatingActivity}
				submitError={createActivityError as Error | null}
				tripStartDate={trip.startDate}
				tripEndDate={trip.endDate}
			/>
		</ScrollView>
	);
};

export default TripDetail;
