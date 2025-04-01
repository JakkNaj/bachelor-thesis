import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "@/components/Calendar";

export type TDateTimePickerProps = {
	value?: string;
	onChange?: (date: string) => void;
	placeholder?: string;
	error?: string;
	className?: string;
};

export const DatePicker = ({ value, onChange, placeholder = "Select date", error, className }: TDateTimePickerProps) => {
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(value ? new Date(value) : undefined);

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			setSelectedDate(date);
			onChange?.(date.toISOString().split("T")[0]);
			setShowCalendar(false);
		}
	};

	const toggleCalendar = () => {
		setShowCalendar(!showCalendar);
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<View className={className}>
			<TouchableOpacity onPress={toggleCalendar} activeOpacity={0.7}>
				<View
					className={`
					h-14
					w-full
					px-4
					text-lg
					rounded-lg
					border
					border-slate-200
					bg-white
					flex-row
					items-center
					justify-start
					${error ? "border-red-300" : ""}
					${className}
				`}
				>
					<Text
						className={`self-center text-lg ${selectedDate ? "text-slate-900" : "text-slate-500"}`}
						style={{ lineHeight: 18 }}
					>
						{selectedDate ? formatDate(selectedDate) : placeholder}
					</Text>
				</View>
				{error && <Text className="mt-2 text-base text-red-500">{error}</Text>}
			</TouchableOpacity>

			{showCalendar && <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} />}
		</View>
	);
};
