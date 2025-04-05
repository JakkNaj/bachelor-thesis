import { useQueryClient } from "@tanstack/react-query";
import { ActivityInput } from "../api/generated/schemas";
import { usePostApiActivitiesTripTripId, usePutApiActivitiesId, useDeleteApiActivitiesId } from "../api/generated/activities/activities";
import { getGetApiTripsQueryKey, getGetApiTripsIdQueryKey } from "../api/generated/trips/trips";

type TUseActivityActionsArgs = {
	tripId: number;
	activityId?: number;
};

export const useActivityActions = ({ tripId, activityId }: TUseActivityActionsArgs) => {
	const queryClient = useQueryClient();

	const { mutate: createActivity, isPending: isCreating, error: createError } = usePostApiActivitiesTripTripId();
	const { mutate: updateActivity, isPending: isUpdating, error: updateError } = usePutApiActivitiesId();
	const { mutate: deleteActivityMutation, isPending: isDeleting } = useDeleteApiActivitiesId();

	const invalidateQueries = () => {
		queryClient.invalidateQueries({ queryKey: getGetApiTripsQueryKey() });
		queryClient.invalidateQueries({ queryKey: getGetApiTripsIdQueryKey(tripId) });
	};

	const handleCreateActivity = (data: ActivityInput, onSuccess?: () => void) => {
		createActivity(
			{ tripId, data },
			{
				onSuccess: () => {
					invalidateQueries();
					onSuccess?.();
				},
			}
		);
	};

	const handleUpdateActivity = (data: ActivityInput, onSuccess?: () => void) => {
		if (!activityId) return;

		updateActivity(
			{ id: activityId, data },
			{
				onSuccess: () => {
					invalidateQueries();
					onSuccess?.();
				},
			}
		);
	};

	const handleDeleteActivity = (id?: number, onSuccess?: () => void) => {
		const activityIdToDelete = id || activityId;

		if (!activityIdToDelete) {
			return;
		}

		deleteActivityMutation(
			{ id: activityIdToDelete },
			{
				onSuccess: () => {
					invalidateQueries();
					onSuccess?.();
				},
			}
		);
	};

	return {
		createActivity: handleCreateActivity,
		updateActivity: handleUpdateActivity,
		deleteActivity: handleDeleteActivity,
		isCreating,
		isUpdating,
		isDeleting,
		createError,
		updateError,
	};
};

export default useActivityActions;
