import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useGetApiTrips } from "@/api/generated/trips/trips";
import { TripCard } from "@/components/TripCard";
import { CrossIcon } from "@/../assets/icons/CrossIcon";

export const AppIndex = () => {
	const router = useRouter();
	const { data: trips, isLoading } = useGetApiTrips();
	const [showHero, setShowHero] = useState(true);

	return (
		<View className="flex-1 bg-white">
			{/* Hero Section */}
			<View className="bg-white">
				{showHero && (
					<View className="px-4 py-8">
						<View className="flex-row justify-between items-start">
							<View className="flex-1 mr-4">
								<Text className="text-4xl font-bold mb-4">Build your travel plans with ease!</Text>
								<Text className="text-lg text-slate-600 mb-2">Accessible and customizable trip planning system. Free.</Text>
								<Text className="text-lg text-slate-600 mb-6">Made by travelers, for travelers.</Text>
								<TouchableOpacity
									className="bg-slate-900 py-3 px-6 rounded-lg self-start"
									onPress={() => router.push("/(app)/trips/new" as any)}
								>
									<Text className="text-white font-medium text-base">Get Started</Text>
								</TouchableOpacity>
							</View>
							<CrossIcon size={20} color="#64748b" onPress={() => setShowHero(false)} />
						</View>
					</View>
				)}

				{/* Your Trips Header */}
				<View className={`px-4 mb-4 ${!showHero ? "mt-8" : ""}`}>
					<View className="flex-row justify-between items-center">
						<Text className="text-2xl font-bold">Your Trips</Text>
						<TouchableOpacity
							className="bg-slate-900 py-2 px-4 rounded-lg"
							onPress={() => router.push("/(app)/trips/new" as any)}
						>
							<Text className="text-white font-medium">Create a new trip</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			{/* Scrollable Trips List */}
			<ScrollView className="flex-1 px-4 pb-8">
				<View className="space-y-4">
					{isLoading ? (
						<View className="h-32 bg-slate-50 rounded-lg border border-slate-200 p-4">
							<Text className="text-slate-400">Loading trips...</Text>
						</View>
					) : !trips?.length ? (
						<View className="h-32 bg-slate-50 rounded-lg border border-slate-200 p-4">
							<Text className="text-slate-400">No trips yet</Text>
						</View>
					) : (
						trips.map((trip) => (
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
		</View>
	);
};

export default AppIndex;
