import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Activity } from "@/api/generated/schemas/activity";
import { Button } from "@/components/Button";
import { formatDateRange } from "@/lib/utils/dateUtils";
import { EyeIcon } from "@/../assets/icons/EyeIcon";

type TTripCardProps = {
	id: number;
	title: string;
	description?: string;
	startDate: string;
	endDate: string;
	activities: Activity[];
};

export const TripCard = ({ id, title, description, startDate, endDate, activities }: TTripCardProps) => {
	const router = useRouter();

	// Function to get two random activities
	const getRandomActivities = (activities: Activity[]) => {
		const shuffled = [...activities].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 2);
	};

	const displayedActivities = getRandomActivities(activities);
	const hasMoreActivities = activities.length > 2;

	return (
		<View className="border border-slate-200 p-4 rounded-lg bg-white">
			<View className="flex-row justify-between items-start mb-2 gap-4">
				<Text className="font-semibold text-slate-900 text-xl flex-1">{title}</Text>
				<Text className="text-base text-slate-900 mb-1">{formatDateRange(startDate, endDate)}</Text>
			</View>

			{description && <Text className="text-base text-slate-500 mb-2">{description}</Text>}

			<View className="flex-row justify-between items-end">
				<View>
					{displayedActivities.length > 0 ? (
						<View className="pl-4">
							{displayedActivities.map((activity) => (
								<View key={activity.id} className="flex-row items-center">
									<View className="h-1.5 w-1.5 rounded-full bg-slate-700 mr-2" />
									<Text className="text-base text-slate-700">{activity.title}</Text>
								</View>
							))}
							{hasMoreActivities && (
								<View className="flex-row items-center">
									<View className="h-1.5 w-1.5 rounded-full bg-slate-500 mr-2" />
									<Text className="text-base text-slate-500">...and much more</Text>
								</View>
							)}
						</View>
					) : (
						<Text className="text-base text-slate-500">No activities added yet.</Text>
					)}
				</View>
				<Button
					className="self-end pb-0"
					variant="secondary"
					onPress={() => router.push(`/(app)/trips/${id}` as any)}
					icon={<EyeIcon size={16} color="#0f172a" />}
				>
					View Trip
				</Button>
			</View>
		</View>
	);
};
