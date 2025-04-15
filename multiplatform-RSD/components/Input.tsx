import { forwardRef } from 'react';
import { Platform } from 'react-native';
import { css, html } from 'react-strict-dom';
import { colors } from '@/assets/colors/colors';

type TInputProps = {
	error?: string;
	multiline?: boolean;
	secureTextEntry?: boolean;
	onChange?: (e: any) => void;
	value?: string;
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
	placeholder?: string;
    style?: Record<string, string | number>;
};

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, TInputProps>(
	({ error, multiline, secureTextEntry, style, onChange, value, type = 'text', placeholder, ...props }, ref) => {
		const handleChange = (e: any) => {
			onChange?.(e);
		};

		const InputComponent = multiline ? html.textarea : html.input;

		const inputStyles = [
			styles.input(),
			multiline && styles.multilineInput,
			error && styles.errorInput(),
			style
		].filter(Boolean) as Record<string, string | number>[];

		return (
			<html.div style={styles.container}>
				<InputComponent
					ref={ref as any}
					style={inputStyles}
					type={!multiline ? (secureTextEntry ? 'password' : type) : undefined}
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
					{...props}
				/>
				{error && <html.p style={styles.errorText()}>{error}</html.p>}
			</html.div>
		);
	}
);

export default Input;

const styles = css.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '1rem',
	},
	input: () => ({
		display: 'flex',
		paddingLeft: '1rem',
		paddingRight: '1rem',
		paddingTop: '0.75rem',
		paddingBottom: '0.75rem',
		fontSize: '1rem',
		borderRadius: '0.5rem',
		borderWidth: '0.0625rem',
		borderStyle: 'solid',
		borderColor: colors.slate[200],
		backgroundColor: 'white',
		'::placeholder': {
			color: colors.slate[400],
		},
	}),
	multilineInput: {
		minHeight: '4.5rem',
		paddingTop: '0.75rem',
	},
	errorInput: () => ({
		borderColor: colors.red[300],
	}),
	errorText: () => ({
		marginTop: '0.5rem',
		fontSize: '1rem',
		color: colors.red[500],
		margin: '0',
	}),
});
