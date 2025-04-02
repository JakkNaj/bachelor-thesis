import { Modal, View, Text, Pressable, SafeAreaView } from "react-native";
import { ActivityInput } from "@/api/generated/schemas";
import { ActivityForm } from "./ActivityForm";
import { CrossIcon } from "@/../assets/icons/CrossIcon";

type TActivityFormModalProps = {
	isVisible: boolean;
	onClose: () => void;
	initialData?: ActivityInput;
	onSubmit: (data: ActivityInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
	tripStartDate: string;
	tripEndDate: string;
};

export const ActivityFormModal = ({
	isVisible,
	onClose,
	initialData,
	onSubmit,
	isSubmitting,
	submitError,
	tripStartDate,
	tripEndDate,
}: TActivityFormModalProps) => {
	const handleSubmit = async (data: ActivityInput) => {
		onSubmit(data);
		if (!submitError) {
			onClose();
		}
	};

	return (
		<Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
			<SafeAreaView className="flex-1 bg-white">
				<View className="flex-1">
					<View className="flex-row justify-between items-center p-4">
						<Text className="text-2xl font-semibold">Create New Activity</Text>
						<Pressable onPress={onClose}>
							<CrossIcon size={24} color="#64748b" />
						</Pressable>
					</View>

					<View className="flex-1 p-4">
						<ActivityForm
							initialData={initialData}
							onSubmit={handleSubmit}
							isSubmitting={isSubmitting}
							submitError={submitError}
							tripStartDate={tripStartDate}
							tripEndDate={tripEndDate}
						/>
					</View>
				</View>
			</SafeAreaView>
		</Modal>
	);
};
