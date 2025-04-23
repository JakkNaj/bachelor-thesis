import DateTimePickerRN from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSizes, radius, spacing } from '../../theme';
import { createStyles } from '../../utils/createStyles';
import { Calendar } from '../Calendar';
import { TDateTimePickerProps } from './DateTimePicker.types';

const formatTimeForDisplay = (time: string) => {
	const date = new Date(`2000-01-01T${time}:00`);
	return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const DateTimePicker = ({
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
	const styles = useStyles();

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
						<View style={[styles.input, (error?.date || error?.time) && styles.inputError]}>
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
						<View style={[styles.input, (error?.date || error?.time) && styles.inputError]}>
							<Text style={[styles.inputText, !time && styles.inputTextPlaceholder]}>
								{time ? formatTimeForDisplay(time) : placeholder.time}
							</Text>
						</View>
					</TouchableOpacity>
				</View>

				{(error?.date || error?.time) && (
					<Text style={styles.errorText}>{error.date || error.time}</Text>
				)}

				{showDatePicker && (
					<View style={styles.pickerContainer}>
						<Calendar selected={selectedDate} onSelect={handleDateSelect} />
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

type TDateTimePickerStyles = {
	container: object;
	content: object;
	row: object;
	flex1: object;
	input: object;
	inputError: object;
	inputText: object;
	inputTextPlaceholder: object;
	errorText: object;
	pickerContainer: object;
};

const useStyles = () => {
	return createStyles<TDateTimePickerStyles>(theme => ({
		container: {
			width: '100%',
			backgroundColor: 'white',
		},
		content: {
			gap: spacing[2],
		},
		row: {
			flexDirection: 'row',
			gap: spacing[4],
		},
		flex1: {
			flex: 1,
		},
		input: {
			height: 56,
			width: '100%',
			paddingHorizontal: spacing[4],
			borderRadius: radius.lg,
			borderWidth: 1,
			borderColor: theme.colors.slate[200],
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-start',
		},
		inputError: {
			borderColor: theme.colors.red[300],
		},
		inputText: {
			fontSize: fontSizes.lg,
			color: theme.colors.slate[900],
			lineHeight: 18,
			alignSelf: 'center',
		},
		inputTextPlaceholder: {
			color: theme.colors.slate[500],
		},
		errorText: {
			fontSize: fontSizes.base,
			color: theme.colors.red[500],
		},
		pickerContainer: {
			marginTop: spacing[2],
			backgroundColor: colors.white,
			borderRadius: radius.lg,
			borderWidth: 1,
			borderColor: theme.colors.slate[200],
		},
	}));
};

export default DateTimePicker;
