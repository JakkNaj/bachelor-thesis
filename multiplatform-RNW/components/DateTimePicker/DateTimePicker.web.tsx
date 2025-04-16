// packages/shared/src/components/DateTimePicker.web.tsx
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TDateTimePickerProps } from './DateTimePicker.types';
import { colors } from '@/assets/colors/colors';

export const DateTimePicker = ({
	value,
	onChange,
	error,
	placeholder = { date: 'Select date', time: 'Select time' },
}: TDateTimePickerProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		onChange?.(newValue);
	};

	return (
		<View style={styles.container}>
			<input
				type="datetime-local"
				value={value || ''}
				onChange={handleChange}
				style={{
					...styles.input,
					...(error?.date || error?.time ? styles.inputError : {}),
					color: value ? colors.slate[900] : colors.slate[400],
				} as any}
				placeholder={`${placeholder.date} ${placeholder.time}`}
			/>
			{(error?.date || error?.time) && (
				<Text style={styles.errorText}>{error.date || error.time}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginBottom: 16,
	},
	input: {
		height: 38,
		paddingLeft: 12,
		paddingRight: 12,
		fontSize: 14,
		borderRadius: 8,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.slate[200],
		backgroundColor: colors.white,
		outlineStyle: 'none',
		appearance: 'none',
		cursor: 'pointer',
		'&::WebkitCalenda': {
			cursor: 'pointer',
		},
	} as any,
	inputError: {
		borderColor: colors.red[300],
	},
	errorText: {
		marginTop: 8,
		fontSize: 14,
		color: colors.red[500],
	},
});

export default DateTimePicker;
