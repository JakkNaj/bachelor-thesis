import DateTimePickerRN from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Calendar } from './Calendar';
import { colors } from '@/assets/colors/colors';

const formatTimeForDisplay = (time: string) => {
	const date = new Date(`2000-01-01T${time}:00`);
	return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export type TDateTimePickerProps = {
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

export const SplitDateTimePicker = ({
	date,
	time,
	onDateChange,
	onTimeChange,
	error,
	placeholder = { date: 'Select date', time: 'Select time' },
}: TDateTimePickerProps) => {
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		date ? new Date(date) : undefined
	);

	useEffect(() => {
		if (date) {
			const newDate = new Date(date);
			if (time) {
				const [hours, minutes] = time.split(':');
				newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
			}
			setSelectedDate(newDate);
		}
	}, [date, time]);

	const handleDateSelect = (newDate: Date | undefined) => {
		if (newDate) {
			if (time) {
				const [hours, minutes] = time.split(':');
				newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
			}
			setSelectedDate(newDate);
			const year = newDate.getFullYear();
			const month = String(newDate.getMonth() + 1).padStart(2, '0');
			const day = String(newDate.getDate()).padStart(2, '0');
			onDateChange?.(`${year}-${month}-${day}`);
		}
	};

	const handleTimeChange = (_: any, selectedTime?: Date) => {
		if (selectedTime && onTimeChange) {
			if (selectedDate) {
				selectedTime.setFullYear(
					selectedDate.getFullYear(),
					selectedDate.getMonth(),
					selectedDate.getDate()
				);
			}
			const hours = selectedTime.getHours().toString().padStart(2, '0');
			const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
			onTimeChange(`${hours}:${minutes}`);
		}
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.row}>
					<TouchableOpacity
						onPress={() => {
							setShowDatePicker(!showDatePicker);
							setShowTimePicker(false);
						}}
						style={styles.flex1}
						activeOpacity={0.7}
					>
						<View style={[styles.input, error?.date && styles.inputError]}>
							<Text style={[styles.inputText, !selectedDate && styles.inputTextPlaceholder]}>
								{selectedDate ? formatDate(selectedDate) : placeholder.date}
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							setShowTimePicker(!showTimePicker);
							setShowDatePicker(false);
						}}
						style={styles.flex1}
						activeOpacity={0.7}
					>
						<View style={[styles.input, error?.time && styles.inputError]}>
							<Text style={[styles.inputText, !time && styles.inputTextPlaceholder]}>
								{time ? formatTimeForDisplay(time) : placeholder.time}
							</Text>
						</View>
					</TouchableOpacity>
				</View>

				{error?.date && <Text style={styles.errorText}>{error.date}</Text>}
				{error?.time && <Text style={styles.errorText}>{error.time}</Text>}

				{showDatePicker && (
					<View style={styles.pickerContainer}>
						<Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} />
					</View>
				)}

				{showTimePicker && (
					<View style={styles.pickerContainer}>
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

// STYLESHEET API v RN can be used only because the DateTimePicker will be rendered only on mobile (native)
const styles = StyleSheet.create({
	container: {
		marginBottom: 16, // 1rem
	},
	content: {
		gap: 8
	},
	row: {
		flexDirection: 'row',
		gap: 16
	},
	flex1: {
		flex: 1
	},
	input: {
		height: 48,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.slate[200],
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white'
	},
	inputError: {
		borderColor: colors.red[300]
	},
	inputText: {
		fontSize: 16,
		color: colors.slate[900],
		lineHeight: 16,
		alignSelf: 'center'
	},
	inputTextPlaceholder: {
		color: colors.slate[400]
	},
	errorText: {
		marginTop: 4, // 0.5rem
		fontSize: 16, // 1rem
		color: colors.red[500],
		margin: 0
	},
	pickerContainer: {
		marginTop: 8,
		backgroundColor: colors.white,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.slate[200]
	}
});

export default SplitDateTimePicker;
