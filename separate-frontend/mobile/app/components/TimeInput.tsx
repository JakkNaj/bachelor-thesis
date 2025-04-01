import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type TTimeInputProps = {
	error?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	placeholder?: string;
};

const formatTimeForDisplay = (time: string) => {
	const date = new Date(time);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatTimeForInput = (date: Date) => {
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
};

export const TimeInput = ({ error, value, onChangeText, placeholder = "Select time" }: TTimeInputProps) => {
	const [showPicker, setShowPicker] = useState(false);
	const currentDate = value ? new Date(`2000-01-01T${value}:00`) : new Date();

	const handleTimeChange = (_: any, date?: Date) => {
		if (date && onChangeText) {
			onChangeText(formatTimeForInput(date));
		}
		if (Platform.OS === "android") {
			setShowPicker(false);
		}
	};

	return (
		<View className="w-full mb-4">
			<TouchableOpacity
				onPress={() => setShowPicker(true)}
				className="h-14 w-full px-4 text-lg rounded-lg border border-slate-200 bg-white justify-center"
			>
				<Text className={`text-lg ${value ? "text-slate-900" : "text-slate-400"}`}>
					{value ? formatTimeForDisplay(`2000-01-01T${value}:00`) : placeholder}
				</Text>
			</TouchableOpacity>
			{error && <Text className="mt-2 text-base text-red-500">{error}</Text>}

			{Platform.OS === "ios" ? (
				<Modal visible={showPicker} transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
					<Pressable className="flex-1 justify-center items-center bg-black/50" onPress={() => setShowPicker(false)}>
						<Pressable>
							<View className="bg-white rounded-lg border border-slate-200 p-4 mx-4">
								<DateTimePicker
									value={currentDate}
									mode="time"
									display="spinner"
									onChange={handleTimeChange}
									style={{ width: 300, height: 180 }}
								/>
							</View>
						</Pressable>
					</Pressable>
				</Modal>
			) : (
				showPicker && (
					<DateTimePicker value={currentDate} mode="time" is24Hour={true} display="default" onChange={handleTimeChange} />
				)
			)}
		</View>
	);
};
