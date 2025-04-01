import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

type TDateInputProps = {
	error?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	placeholder?: string;
	align?: "left" | "right";
};

const formatDateForDisplay = (dateString: string) => {
	const date = new Date(dateString);
	return date.toISOString().split("T")[0];
};

const CustomPrevious = () => (
	<TouchableOpacity className="p-2">
		<Text className="text-2xl text-slate-900">←</Text>
	</TouchableOpacity>
);

const CustomNext = () => (
	<TouchableOpacity className="p-2">
		<Text className="text-2xl text-slate-900">→</Text>
	</TouchableOpacity>
);

export const DateInput = ({ error, value, onChangeText, placeholder = "Select date", align = "left" }: TDateInputProps) => {
	const [showCalendar, setShowCalendar] = useState(false);

	const handleDateChange = (date: Date) => {
		if (date && onChangeText) {
			onChangeText(date.toISOString().split("T")[0]);
		}
		setShowCalendar(false);
	};

	return (
		<View className="w-full mb-4">
			<TouchableOpacity
				onPress={() => setShowCalendar(true)}
				className="h-14 w-full px-4 text-lg rounded-lg border border-slate-200 bg-white justify-center"
			>
				<Text className={`text-lg ${value ? "text-slate-900" : "text-slate-400"}`}>{value || placeholder}</Text>
			</TouchableOpacity>
			{error && <Text className="mt-2 text-base text-red-500">{error}</Text>}

			<Modal visible={showCalendar} transparent animationType="fade" onRequestClose={() => setShowCalendar(false)}>
				<Pressable className="flex-1 justify-center items-center bg-black/50" onPress={() => setShowCalendar(false)}>
					<Pressable>
						<View className="bg-white rounded-lg border border-slate-200 p-4 mx-4">
							<CalendarPicker
								onDateChange={handleDateChange}
								width={300}
								selectedStartDate={value ? new Date(value) : undefined}
								todayBackgroundColor="#e2e8f0"
								todayTextStyle={{
									color: "#000000",
								}}
								selectedDayColor="#0f172a"
								selectedDayTextColor="#ffffff"
								selectedDayStyle={{
									padding: 4,
									backgroundColor: "#0f172a",
									borderRadius: 16,
								}}
								textStyle={{
									fontSize: 14,
									fontWeight: "500",
								}}
							/>
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
};
