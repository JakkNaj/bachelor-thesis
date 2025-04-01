import { Modal, View, Pressable, SafeAreaView } from "react-native";
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
				<View className="flex-1 px-4">
					<View className="flex-row justify-between items-center h-14">
						<View className="w-14" />
						<View>
							<Pressable onPress={onClose} className="p-2">
								<CrossIcon size={24} color="#0f172a" />
							</Pressable>
						</View>
					</View>

					<ActivityForm
						initialData={initialData}
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
						submitError={submitError}
						tripStartDate={tripStartDate}
						tripEndDate={tripEndDate}
					/>
				</View>
			</SafeAreaView>
		</Modal>
	);
};
