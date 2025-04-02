import { Modal, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { TripForm } from "./TripForm";
import { Trip, TripInput } from "@/api/generated/schemas";
import { CrossIcon } from "@/../assets/icons/CrossIcon";

type TTripFormModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onSubmit: (data: TripInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
	initialData?: Trip;
};

export const TripFormModal = ({ isVisible, onClose, onSubmit, isSubmitting, submitError, initialData }: TTripFormModalProps) => {
	return (
		<Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
			<SafeAreaView className="flex-1 bg-white">
				<View className="flex-1">
					<View className="flex-row justify-between items-center p-4">
						<Text className="text-2xl font-semibold">Create New Trip</Text>
						<TouchableOpacity onPress={onClose}>
							<CrossIcon size={24} color="#64748b" />
						</TouchableOpacity>
					</View>

					<View className="flex-1 p-4">
						<TripForm onSubmit={onSubmit} isSubmitting={isSubmitting} submitError={submitError} initialData={initialData} />
					</View>
				</View>
			</SafeAreaView>
		</Modal>
	);
};
