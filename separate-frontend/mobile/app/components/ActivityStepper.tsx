import { View, Text, Alert, Modal, Pressable } from "react-native";
import { Activity, ActivityInput, ActivityInputType } from "@/api/generated/schemas";
import { formatDateTimeForActivityCard } from "@/lib/utils/dateUtils";
import { Button } from "./Button";
import { useState } from "react";
import { CrossIcon } from "@/../assets/icons/CrossIcon";
import { PencilIcon } from "@/../assets/icons/PencilIcon";
import { DotsIcon } from "@/../assets/icons/DotsIcon";
import { ActivityFormModal } from "./ActivityFormModal";
import { useActivityActions } from "@/hooks/useActivityActions";

type TActivityStepperProps = {
	activities: Activity[];
	tripId: number;
	tripDates: {
		startDate: string;
		endDate: string;
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

const transformActivityToInput = (activity: Activity): ActivityInput => {
	return {
		title: activity.title,
		description: activity.description,
		startTime: activity.startTime,
		endTime: activity.endTime,
		type: activity.type as ActivityInputType,
	};
};

export const ActivityStepper = ({ activities, tripId, tripDates }: TActivityStepperProps) => {
	const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
	const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null);
	const [menuState, setMenuState] = useState<TMenuState>({
		isVisible: false,
		activity: null,
		position: { top: 0, right: 0 },
	});

	const { updateActivity, deleteActivity, isUpdating, isDeleting, updateError } = useActivityActions({
		tripId,
		activityId: editingActivity?.id || deletingActivity?.id,
	});

	const handleUpdateActivity = (data: ActivityInput) => {
		if (!editingActivity) return;
		updateActivity(data, () => setEditingActivity(null));
	};

	const handleDelete = (activity: Activity) => {
		Alert.alert("Delete Activity", "Are you sure you want to delete this activity? This action cannot be undone.", [
			{
				text: "Cancel",
				style: "cancel",
				onPress: () => setDeletingActivity(null),
			},
			{
				text: "Delete",
				style: "destructive",
				onPress: () => {
					deleteActivity(() => setDeletingActivity(null));
				},
			},
		]);
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
		setMenuState((prev) => ({ ...prev, isVisible: false }));
		setEditingActivity(activity);
	};

	const sortedActivities = activities.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

	return (
		<View>
			{/* Activities list */}
			<View>
				{sortedActivities.map((activity, index) => (
					<View
						key={activity.id}
						className={`
							flex-row gap-4 relative
							${index !== sortedActivities.length - 1 ? "pb-8" : ""}
							${index !== 0 ? "pt-0" : ""}
						`}
					>
						{/* Line container */}
						<View className="w-8 items-center">
							{/* Top line (hidden for first item) */}
							{index !== 0 && <View className="absolute w-0.5 h-6 bg-slate-300" />}
							{/* Bottom line (hidden for last item) */}
							{index !== sortedActivities.length - 1 && <View className="absolute top-8 bottom-[-2rem] w-0.5 bg-slate-300" />}
							{/* Number circle */}
							<View className="h-8 w-8 items-center justify-center rounded-full mt-2 border border-slate-300 bg-white z-10">
								<Text className="text-[#090909]">{index + 1}</Text>
							</View>
						</View>

						{/* Activity content */}
						<View className="flex-1 min-w-[12rem] rounded-lg border border-slate-200 p-4">
							<View className="flex-row justify-between items-start">
								<View className="flex-1">
									<Text className="font-semibold text-lg">{activity.title}</Text>
									<Text className="text-slate-600 text-sm mt-1">
										{formatDateTimeForActivityCard(activity.startTime, activity.endTime)}
									</Text>
									{activity.description && <Text className="text-slate-700 mt-2">{activity.description}</Text>}
								</View>
								<Pressable onPress={(e) => handleOpenMenu(activity, e)} className="p-2 -mr-2 -mt-2">
									<DotsIcon size={14} color="#0f172a" />
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
									menuState.activity && handleEdit(menuState.activity);
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
									if (menuState.activity) {
										setDeletingActivity(menuState.activity);
										handleDelete(menuState.activity);
									}
								});
							}}
						>
							<CrossIcon size={16} color="#ef4444" />
							<Text className="ml-2 text-red-500">Delete</Text>
						</Pressable>
					</View>
				</Pressable>
			</Modal>

			{/* Edit Activity Modal */}
			<ActivityFormModal
				isVisible={!!editingActivity}
				onClose={() => setEditingActivity(null)}
				initialData={editingActivity ? transformActivityToInput(editingActivity) : undefined}
				onSubmit={handleUpdateActivity}
				isSubmitting={isUpdating}
				submitError={updateError as Error}
				tripStartDate={tripDates.startDate}
				tripEndDate={tripDates.endDate}
			/>
		</View>
	);
};
