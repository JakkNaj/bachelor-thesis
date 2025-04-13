import { css, html } from 'react-strict-dom';
import { colors } from '@/assets/colors/colors';
import { Platform } from 'react-native';

export type TDateTimePickerProps = {
	value?: string;
	onChange?: (value: string) => void;
	error?: {
		date?: string;
		time?: string;
	};
	placeholder?: {
		date: string;
		time: string;
	};
};

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
		<html.div style={[styles.container, Platform.OS === 'web' && webStyles.container]}>
			<html.input
				type="datetime-local"
				value={value || ''}
				onChange={handleChange}
				style={styles.input()}
				placeholder={`${placeholder.date} ${placeholder.time}`}
			/>
			{(error?.date || error?.time) && (
				<html.p style={styles.errorText()}>{error.date || error.time}</html.p>
			)}
		</html.div>
	);
};

const styles = css.create({
	container: {
		marginBottom: '1rem',
        display: 'flex',
	},
	input: () => ({
        flex: 1,
		padding: '0.75rem',
		fontSize: '0.875rem',
		borderRadius: '0.5rem',
		borderWidth: '0.0625rem',
		borderStyle: 'solid',
		borderColor: colors.slate[200],
		backgroundColor: 'white',
		'::placeholder': {
			color: colors.slate[400],
		},
	}),
	errorText: () => ({
		marginTop: '0.5rem',
		fontSize: '1rem',
		color: colors.red[500],
		margin: '0',
	}),
});

const webStyles = css.create({
	container: {
		width: '100%',
	},
});
