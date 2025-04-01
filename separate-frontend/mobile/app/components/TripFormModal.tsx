import { Modal, View, Text, TouchableOpacity } from "react-native";
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
		<Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
			<View className="flex-1 mt-20 bg-white rounded-t-2xl">
				<View className="flex-row justify-between items-center p-4 border-b border-slate-200">
					<Text className="text-2xl font-semibold">Create New Trip</Text>
					<TouchableOpacity onPress={onClose}>
						<CrossIcon size={24} color="#64748b" />
					</TouchableOpacity>
				</View>

				<View className="flex-1 p-4">
					<TripForm onSubmit={onSubmit} isSubmitting={isSubmitting} submitError={submitError} initialData={initialData} />
				</View>
			</View>
		</Modal>
	);
};
