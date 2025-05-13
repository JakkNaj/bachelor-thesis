import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { getGetApiTripsQueryKey, useGetApiTrips } from "@/api/generated/trips/trips";
import { TripCard } from "@/components/TripCard";
import { CrossIcon } from "@/assets/icons/CrossIcon";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import { Button } from "@/components/Button";
import { TripFilters } from "@/components/TripFilters";
import { ETripFilter } from "@/types/trips";
import { TripInput } from "@/api/generated/schemas";
import { TripFormModal } from "@/components/TripFormModal";
import { useTripActions } from "@/hooks/useTripActions";

export const AppIndex = () => {
	const { data: trips, isLoading } = useGetApiTrips();
	const { createTrip, isCreating, createError } = useTripActions();
	const [showHero, setShowHero] = useState(true);
	const [activeFilter, setActiveFilter] = useState<ETripFilter>(ETripFilter.ALL);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const filteredTrips = useMemo(() => {
		if (!trips) return [];
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		switch (activeFilter) {
			case ETripFilter.UPCOMING:
				return trips.filter((trip) => new Date(trip.startDate) >= today);
			case ETripFilter.PAST:
				return trips.filter((trip) => new Date(trip.startDate) < today);
			default:
				return trips;
		}
	}, [trips, activeFilter]);

	const handleCreateTrip = (data: TripInput) => {
		createTrip(data, () => setIsModalVisible(false));
	};

	return (
		<View className="flex-1 bg-white">
			<View className="bg-white">
				{showHero && (
					<View className="px-4 py-4">
						<View className="flex-row justify-between items-start">
							<View className="flex-1 mr-4 mb-2">
								<Text className="text-4xl font-bold mb-4">Build your travel plans with ease!</Text>
								<Text className="text-lg text-slate-600 mb-2">Accessible and customizable trip planning system. Free.</Text>
								<Text className="text-lg text-slate-600 mb-6">Made by travelers, for travelers.</Text>
								<Button variant="primary" onPress={() => setIsModalVisible(true)}>
									Get Started
								</Button>
							</View>
							<TouchableOpacity onPress={() => setShowHero(false)}>
								<CrossIcon size={24} color="#64748b" />
							</TouchableOpacity>
						</View>
					</View>
				)}

				<View className={`px-4 mb-4 ${!showHero ? "mt-6" : ""}`}>
					<View className="flex-row justify-between items-center">
						<Text className="text-4xl font-bold">Your Trips</Text>
						<Button variant="primary" icon={<PlusIcon size={16} color="#ffffff" />} onPress={() => setIsModalVisible(true)}>
							Create a new trip
						</Button>
					</View>
				</View>

				<TripFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
			</View>

			<ScrollView className="flex-1 px-4 pb-8 pt-2 bg-slate-50">
				<View className="gap-4">
					{isLoading ? (
						<View className="h-32 bg-slate-50 rounded-lg border border-slate-200 p-4">
							<Text className="text-slate-400">Loading trips...</Text>
						</View>
					) : !filteredTrips?.length ? (
						<View className="flex-1 items-center justify-center py-8">
							<Text className="text-lg text-slate-700 mb-4">No trips found for this filter.</Text>
							<Text className="text-base text-slate-600 mb-6">Try selecting a different filter or create a new trip.</Text>
							<Button variant="secondary" outlined className="self-center" onPress={() => setIsModalVisible(true)}>
								Create a new trip
							</Button>
						</View>
					) : (
						filteredTrips.map((trip) => (
							<TripCard
								key={trip.id}
								id={trip.id}
								title={trip.title}
								description={trip.description}
								startDate={trip.startDate}
								endDate={trip.endDate}
								activities={trip.activities || []}
							/>
						))
					)}
				</View>
			</ScrollView>

			<TripFormModal
				isVisible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onSubmit={handleCreateTrip}
				isSubmitting={isCreating}
				submitError={createError as Error | null}
			/>
		</View>
	);
};

export default AppIndex;
