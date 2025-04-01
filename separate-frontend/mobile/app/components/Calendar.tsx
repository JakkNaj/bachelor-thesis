import { View, Text, TouchableOpacity } from "react-native";
import * as React from "react";
import { ChevronLeftIcon } from "../assets/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../assets/icons/ChevronRightIcon";

type TCalendarProps = {
	mode?: "single" | "range" | "multiple";
	selected?: Date | Date[] | { from: Date; to: Date };
	onSelect?: (date: Date | undefined) => void;
	disabled?: boolean;
	initialFocus?: boolean;
};

export const Calendar = ({ mode = "single", selected, onSelect, disabled = false, initialFocus }: TCalendarProps) => {
	const [currentMonth, setCurrentMonth] = React.useState(() => {
		if (selected instanceof Date) {
			return selected;
		}
		return new Date();
	});

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (year: number, month: number) => {
		return new Date(year, month, 1).getDay();
	};

	const handlePreviousMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
	};

	const handleNextMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
	};

	const handleDateSelect = (date: Date) => {
		if (!disabled && onSelect) {
			onSelect(date);
		}
	};

	const isSelected = (date: Date) => {
		if (!selected) return false;
		if (selected instanceof Date) {
			return date.toDateString() === selected.toDateString();
		}
		return false;
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	const renderCalendarGrid = () => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const firstDayOfMonth = getFirstDayOfMonth(year, month);

		const weeks: Date[][] = [];
		let currentWeek: Date[] = [];

		// Add days from previous month
		const prevMonth = month - 1;
		const daysInPrevMonth = getDaysInMonth(year, prevMonth);
		for (let i = 0; i < firstDayOfMonth; i++) {
			currentWeek.push(new Date(year, prevMonth, daysInPrevMonth - firstDayOfMonth + i + 1));
		}

		// Add days from current month
		for (let day = 1; day <= daysInMonth; day++) {
			currentWeek.push(new Date(year, month, day));

			if (currentWeek.length === 7) {
				weeks.push(currentWeek);
				currentWeek = [];
			}
		}

		// Add days from next month if needed
		if (currentWeek.length > 0) {
			const nextMonth = month + 1;
			let nextMonthDay = 1;
			while (currentWeek.length < 7) {
				currentWeek.push(new Date(year, nextMonth, nextMonthDay++));
			}
			weeks.push(currentWeek);
		}

		return weeks.map((week, weekIndex) => (
			<View key={weekIndex} className="flex-row justify-center">
				{week.map((date) => {
					const isOutsideMonth = date.getMonth() !== month;
					return renderDay(date, isOutsideMonth);
				})}
			</View>
		));
	};

	const renderDay = (date: Date, isOutsideMonth: boolean) => {
		const dayStyle = [
			"w-[40px] h-[40px] items-center justify-center",
			isSelected(date) && "bg-blue-600 rounded-lg",
			isToday(date) && !isSelected(date) && "bg-slate-100 rounded-lg",
			disabled && "opacity-50",
		]
			.filter(Boolean)
			.join(" ");

		const textStyle = ["text-base", isSelected(date) ? "text-white font-semibold" : "text-black", isOutsideMonth && "text-slate-300"]
			.filter(Boolean)
			.join(" ");

		return (
			<TouchableOpacity
				key={date.toISOString()}
				onPress={() => handleDateSelect(date)}
				disabled={disabled || isOutsideMonth}
				activeOpacity={0.7}
				className={dayStyle}
			>
				<Text className={textStyle}>{date.getDate()}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View className="w-fit bg-white rounded-lg self-center px-2 pb-4">
			<View className="flex-row items-center justify-between py-4 px-2">
				<TouchableOpacity onPress={handlePreviousMonth} className="p-2" activeOpacity={0.7}>
					<ChevronLeftIcon size={24} color="#000000" />
				</TouchableOpacity>
				<Text className="text-lg font-semibold text-black">
					{currentMonth.toLocaleDateString("en-US", {
						month: "long",
						year: "numeric",
					})}
				</Text>
				<TouchableOpacity onPress={handleNextMonth} className="p-2" activeOpacity={0.7}>
					<ChevronRightIcon size={24} color="#000000" />
				</TouchableOpacity>
			</View>

			<View className="flex-row">
				{weekDays.map((day) => (
					<View key={day} className="w-[40px] h-[40px] items-center justify-center">
						<Text className="text-sm text-slate-400">{day}</Text>
					</View>
				))}
			</View>

			{renderCalendarGrid()}
		</View>
	);
};
