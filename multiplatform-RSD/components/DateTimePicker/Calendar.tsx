import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ChevronLeft } from '@/assets/icons/ChevronLeft/ChevronLeft';
import { ChevronRight } from '@/assets/icons/ChevronRight/ChevronRight';
import { colors } from '@/assets/colors/colors';

type TCalendarProps = {
	mode?: 'single' | 'range' | 'multiple';
	selected?: Date | Date[] | { from: Date; to: Date };
	onSelect?: (date: Date | undefined) => void;
	disabled?: boolean;
	initialFocus?: boolean;
};

export const Calendar = ({
	mode = 'single',
	selected,
	onSelect,
	disabled = false,
	initialFocus,
}: TCalendarProps) => {
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

	const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	const renderCalendarGrid = () => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const firstDayOfMonth = getFirstDayOfMonth(year, month);

		const weeks: Date[][] = [];
		let currentWeek: Date[] = [];

		const prevMonth = month - 1;
		const daysInPrevMonth = getDaysInMonth(year, prevMonth);
		for (let i = 0; i < firstDayOfMonth; i++) {
			currentWeek.push(new Date(year, prevMonth, daysInPrevMonth - firstDayOfMonth + i + 1));
		}

		for (let day = 1; day <= daysInMonth; day++) {
			currentWeek.push(new Date(year, month, day));

			if (currentWeek.length === 7) {
				weeks.push(currentWeek);
				currentWeek = [];
			}
		}

		if (currentWeek.length > 0) {
			const nextMonth = month + 1;
			let nextMonthDay = 1;
			while (currentWeek.length < 7) {
				currentWeek.push(new Date(year, nextMonth, nextMonthDay++));
			}
			weeks.push(currentWeek);
		}

		return weeks.map((week, weekIndex) => (
			<View key={weekIndex} style={styles.weekRow}>
				{week.map(date => {
					const isOutsideMonth = date.getMonth() !== month;
					return renderDay(date, isOutsideMonth);
				})}
			</View>
		));
	};

	const renderDay = (date: Date, isOutsideMonth: boolean) => {
		const buttonStyles = [
			styles.dayButton,
			isSelected(date) && styles.dayButtonSelected,
			isToday(date) && !isSelected(date) && styles.dayButtonToday,
			disabled && styles.dayButtonDisabled,
		].filter(Boolean);

		const textStyles = [
			styles.dayText,
			isSelected(date) && styles.dayTextSelected,
			isOutsideMonth && styles.dayTextOutsideMonth,
		].filter(Boolean);

		return (
			<TouchableOpacity
				key={date.toISOString()}
				onPress={() => handleDateSelect(date)}
				disabled={disabled || isOutsideMonth}
				activeOpacity={0.7}
				style={buttonStyles}
			>
				<Text style={textStyles}>{date.getDate()}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={handlePreviousMonth}
					style={styles.headerButton}
					activeOpacity={0.7}
				>
					<ChevronLeft size={24} color={colors.slate[900]} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>
					{currentMonth.toLocaleDateString('en-US', {
						month: 'long',
						year: 'numeric',
					})}
				</Text>
				<TouchableOpacity onPress={handleNextMonth} style={styles.headerButton} activeOpacity={0.7}>
					<ChevronRight size={24} color={colors.slate[900]} />
				</TouchableOpacity>
			</View>

			<View style={styles.weekRow}>
				{weekDays.map(day => (
					<View key={day} style={styles.dayButton}>
						<Text style={styles.weekDayLabel}>{day}</Text>
					</View>
				))}
			</View>

			{renderCalendarGrid()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		borderRadius: 16,
		alignSelf: 'center',
		paddingHorizontal: 8,
		paddingBottom: 16
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 16,
		paddingHorizontal: 8
	},
	headerButton: {
		padding: 8
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: colors.slate[900]
	},
	weekRow: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	weekDayLabel: {
		fontSize: 14,
		color: colors.slate[400]
	},
	dayButton: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	dayButtonSelected: {
		backgroundColor: colors.blue[600],
		borderRadius: 16
	},
	dayButtonToday: {
		backgroundColor: colors.slate[100],
		borderRadius: 16
	},
	dayButtonDisabled: {
		opacity: 0.5
	},
	dayText: {
		fontSize: 16,
		color: colors.slate[900]
	},
	dayTextSelected: {
		color: colors.white,
		fontWeight: '600'
	},
	dayTextOutsideMonth: {
		color: colors.slate[300]
	}
});

