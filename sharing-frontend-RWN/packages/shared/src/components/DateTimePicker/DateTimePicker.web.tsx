// packages/shared/src/components/DateTimePicker.web.tsx
import { Text, View } from 'react-native';
import { colors, fontSizes, radius, spacing } from '../../theme';
import { createStyles } from '../../utils/createStyles';
import { TDateTimePickerProps } from './DateTimePicker.types';

export const DateTimePicker = ({
	date,
	time,
	onDateChange,
	onTimeChange,
	error,
	placeholder = { date: 'Select date', time: 'Select time' },
}: TDateTimePickerProps) => {
	const styles = useStyles();

	const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;

		const [datePart, timePart] = rawValue.split('T');

		if (onDateChange) {
			onDateChange(datePart);
		}
		if (onTimeChange) {
			onTimeChange(timePart);
		}
	};

	const getCurrentDateTime = () => {
		if (!date) return '';
		const timeValue = time || '00:00';
		return `${date}T${timeValue}`;
	};

	return (
		<View style={styles.container}>
			<input
				type="datetime-local"
				value={getCurrentDateTime()}
				onChange={handleDateTimeChange}
				style={styles.input}
				placeholder={`${placeholder.date} ${placeholder.time}`}
			/>
			{(error?.date || error?.time) && (
				<Text style={styles.errorText}>{error.date || error.time}</Text>
			)}
		</View>
	);
};

const useStyles = () => {
	return createStyles(theme => ({
		container: {
			marginBottom: spacing[4],
		},
		input: {
			padding: 12,
			fontSize: fontSizes.sm,
			borderRadius: radius.lg,
			border: `1px solid ${colors.slate[200]}`,
			backgroundColor: 'white',
			'&[aria-invalid="true"]': {
				borderColor: colors.red[300],
			},
		},
		errorText: {
			marginTop: spacing[2],
			fontSize: fontSizes.base,
			color: theme.colors.red[500],
		},
	}));
};

export default DateTimePicker;
