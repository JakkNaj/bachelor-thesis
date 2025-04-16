import { View, StyleSheet } from "react-native";
import { HeroSection } from "./sections/HeroSection";
import { TripsSection } from "./sections/TripsSection";
import { FormModal } from "@/components/FormModal/FormModal";
import { TripForm } from "@/components/TripForm";
import { useState } from "react";
import { useTripActions } from "@/hooks/useTripActions";
import { TripInput } from "@/api/generated/schemas";

type TModalState = {
	isVisible: boolean;
	source: 'hero' | 'trips' | null;
};

export const Home = () => {
	const [modalState, setModalState] = useState<TModalState>({
		isVisible: false,
		source: null,
	});
	const { createTrip, isCreating, createError } = useTripActions();

	const handleOpenModal = (source: TModalState['source']) => {
		setModalState({ isVisible: true, source });
	};

	const handleCloseModal = () => {
		setModalState({ isVisible: false, source: null });
	};

	const handleCreateTrip = async (data: TripInput) => {
		createTrip(data, () => {
			handleCloseModal();
		});
	};

	return (
		<View style={styles.container}>
			<HeroSection onCreateTripClick={() => handleOpenModal('hero')} />
			<TripsSection onCreateTripClick={() => handleOpenModal('trips')} />
			<FormModal
				isVisible={modalState.isVisible}
				onClose={handleCloseModal}
				title="Create New Trip"
			>
				<TripForm 
					onSubmit={handleCreateTrip}
					isSubmitting={isCreating}
					submitError={createError as Error || undefined}
				/>
			</FormModal>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
});
