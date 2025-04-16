import { useLocalSearchParams } from "expo-router";
import { useGetApiTripsId } from "@/api/generated/trips/trips";
import { DetailHeaderSection } from "./sections/DetailHeaderSection"
import { TripActivitiesSection } from "./sections/TripActivitiesSection";
import { Platform, View, Text, StyleSheet } from "react-native";
import { FormModal } from "@/components/FormModal/FormModal";
import { useState } from "react";
import { TripForm } from "@/components/TripForm";
import { ActivityForm } from "@/components/ActivityForm";
import { ActivityInput, TripInput } from "@/api/generated/schemas";
import { useTripActions } from "@/hooks/useTripActions";
import { useActivityActions } from "@/hooks/useActivityActions";

type TModalState = {
    isVisible: boolean;
    type: 'editTrip' | 'addActivity' | null;
};

export const TripDetail = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data: trip, isLoading } = useGetApiTripsId(parseInt(id));
	const [modalState, setModalState] = useState<TModalState>({
		isVisible: false,
		type: null,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<Error | null>(null);

	const { updateTrip, isUpdating: isUpdatingTrip, updateError: updateTripError } = useTripActions({ 
		tripId: parseInt(id)
	});
	const { createActivity, isCreating: isCreatingActivity, createError: createActivityError } = useActivityActions({ 
		tripId: parseInt(id)
	});

	const handleOpenModal = (type: TModalState['type']) => {
		setModalState({ isVisible: true, type });
		setSubmitError(null);
	};

	const handleCloseModal = () => {
		setModalState({ isVisible: false, type: null });
		setSubmitError(null);
	};

	const handleUpdateTrip = async (data: TripInput) => {
		setIsSubmitting(true);
		setSubmitError(null);
		try {
			await updateTrip(data, () => {
				handleCloseModal();
			});
		} catch (error) {
			setSubmitError(error instanceof Error ? error : new Error('Failed to update trip'));
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCreateActivity = async (data: ActivityInput) => {
		setIsSubmitting(true);
		setSubmitError(null);
		try {
			await createActivity(data, () => {
				handleCloseModal();
			});
		} catch (error) {
			setSubmitError(error instanceof Error ? error : new Error('Failed to create activity'));
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (!trip) {
		return (
			<View>
				<Text>Trip not found</Text>
			</View>
		);
	}

	const renderModalContent = () => {
		switch (modalState.type) {
			case 'editTrip':
				return (
					<TripForm
						initialData={trip}
						onSubmit={handleUpdateTrip}
						isSubmitting={isSubmitting || isUpdatingTrip}
						submitError={submitError as Error || updateTripError as Error || undefined}
					/>
				);
			case 'addActivity':
				return (
					<ActivityForm
						onSubmit={handleCreateActivity}
						isSubmitting={isSubmitting || isCreatingActivity}
						submitError={submitError as Error || createActivityError as Error || undefined}
						tripStartDate={trip.startDate}
						tripEndDate={trip.endDate}
					/>
				);
			default:
				return null;
		}
	};

	const getModalTitle = () => {
		switch (modalState.type) {
			case 'editTrip':
				return 'Edit Trip';
			case 'addActivity':
				return 'Add New Activity';
			default:
				return '';
		}
	};

	return (
		<View style={styles.container}>
			<DetailHeaderSection 
				trip={trip} 
				onEditClick={() => handleOpenModal('editTrip')}
			/>
			<TripActivitiesSection 
				tripId={trip.id} 
				tripDates={{ 
					startDate: trip.startDate, 
					endDate: trip.endDate 
				}} 
				activities={trip.activities || []} 
				onAddActivityClick={() => handleOpenModal('addActivity')}
			/>
			<FormModal
				isVisible={modalState.isVisible}
				onClose={handleCloseModal}
				title={getModalTitle()}
			>
				{renderModalContent()}
			</FormModal>
		</View>
	)
}

export default TripDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
