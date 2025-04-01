import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "@/components/Calendar";
import DateTimePickerRN from "@react-native-community/datetimepicker";

type TDateTimePickerProps = {
	date?: string;
	time?: string;
	onDateChange?: (date: string) => void;
	onTimeChange?: (time: string) => void;
	error?: {
		date?: string;
		time?: string;
	};
	placeholder?: {
		date?: string;
		time?: string;
	};
};

const formatTimeForDisplay = (time: string) => {
	const date = new Date(`2000-01-01T${time}:00`);
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const DateTimePicker = ({
	date,
	time,
	onDateChange,
	onTimeChange,
	error,
	placeholder = { date: "Select date", time: "Select time" },
}: TDateTimePickerProps) => {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(date ? new Date(date) : undefined);

	const handleDateSelect = (newDate: Date | undefined) => {
		if (newDate) {
			if (time) {
				const [hours, minutes] = time.split(":");
				newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
			}
			setSelectedDate(newDate);
			const year = newDate.getFullYear();
			const month = String(newDate.getMonth() + 1).padStart(2, "0");
			const day = String(newDate.getDate()).padStart(2, "0");
			onDateChange?.(`${year}-${month}-${day}`);
		}
	};

	const handleTimeChange = (_: any, selectedTime?: Date) => {
		if (selectedTime && onTimeChange) {
			if (selectedDate) {
				selectedTime.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
			}
			const hours = selectedTime.getHours().toString().padStart(2, "0");
			const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
			onTimeChange(`${hours}:${minutes}`);
		}
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<View className="w-full">
			<View className="space-y-2">
				<View className="flex-row gap-4">
					<TouchableOpacity
						onPress={() => {
							setShowDatePicker(!showDatePicker);
							setShowTimePicker(false);
						}}
						className="flex-1"
						activeOpacity={0.7}
					>
						<View
							className={`
								h-14
								w-full
								px-4
								text-lg
								rounded-lg
								border
								${error?.date || error?.time ? "border-red-300" : "border-slate-200"}
								flex-row
								items-center
								justify-start
							`}
						>
							<Text
								className={`self-center text-lg ${selectedDate ? "text-slate-900" : "text-slate-500"}`}
								style={{ lineHeight: 18 }}
							>
								{selectedDate ? formatDate(selectedDate) : placeholder.date}
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							setShowTimePicker(!showTimePicker);
							setShowDatePicker(false);
						}}
						className="flex-1"
						activeOpacity={0.7}
					>
						<View
							className={`
								h-14
								w-full
								px-4
								text-lg
								rounded-lg
								border
								${error?.date || error?.time ? "border-red-300" : "border-slate-200"}
								flex-row
								items-center
								justify-start
							`}
						>
							<Text className={`text-lg ${time ? "text-slate-900" : "text-slate-500"}`}>
								{time ? formatTimeForDisplay(time) : placeholder.time}
							</Text>
						</View>
					</TouchableOpacity>
				</View>

				{(error?.date || error?.time) && <Text className="text-base text-red-500">{error.date || error.time}</Text>}

				{showDatePicker && (
					<View className="mt-2 bg-white rounded-lg border border-slate-200">
						<Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} />
					</View>
				)}

				{showTimePicker && (
					<View className="mt-2 bg-white rounded-lg border border-slate-200">
						<DateTimePickerRN
							value={time ? new Date(`2000-01-01T${time}:00`) : new Date()}
							mode="time"
							display="spinner"
							onChange={handleTimeChange}
							style={{ height: 180 }}
						/>
					</View>
				)}
			</View>
		</View>
	);
};
