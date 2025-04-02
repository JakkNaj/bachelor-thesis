import { useQueryClient } from "@tanstack/react-query";
import { useDeleteApiTripsId, usePostApiTrips, usePutApiTripsId } from "@/api/generated/trips/trips";
import { getGetApiTripsQueryKey, getGetApiTripsIdQueryKey } from "@/api/generated/trips/trips";
import { TripInput } from "@/api/generated/schemas";

type TUseTripActionsArgs = {
	tripId?: number;
};

export const useTripActions = ({ tripId }: TUseTripActionsArgs = {}) => {
	const queryClient = useQueryClient();

	const { mutate: createTrip, isPending: isCreating, error: createError } = usePostApiTrips();
	const { mutate: updateTrip, isPending: isUpdating, error: updateError } = usePutApiTripsId();
	const { mutate: deleteTrip, isPending: isDeleting } = useDeleteApiTripsId();

	const handleCreateTrip = (data: TripInput, onSuccess?: () => void) => {
		createTrip(
			{ data },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: getGetApiTripsQueryKey() });
					onSuccess?.();
				},
			}
		);
	};

	const handleUpdateTrip = (data: TripInput, onSuccess?: () => void) => {
		if (!tripId) return;

		updateTrip(
			{ id: tripId, data },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: getGetApiTripsQueryKey() });
					queryClient.invalidateQueries({ queryKey: getGetApiTripsIdQueryKey(tripId) });
					onSuccess?.();
				},
			}
		);
	};

	const handleDeleteTrip = (onSuccess?: () => void) => {
		if (!tripId) return;

		deleteTrip(
			{ id: tripId },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: getGetApiTripsQueryKey() });
					onSuccess?.();
				},
			}
		);
	};

	return {
		createTrip: handleCreateTrip,
		updateTrip: handleUpdateTrip,
		deleteTrip: handleDeleteTrip,
		isCreating,
		isUpdating,
		isDeleting,
		createError,
		updateError,
	};
};
