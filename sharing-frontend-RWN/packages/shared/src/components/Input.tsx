import { forwardRef } from 'react';
import { Platform, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fontSizes, radius } from '../theme';
import { createStyles } from '../utils/createStyles';

type TInputProps = {
	error?: string;
	multiline?: boolean;
} & TextInputProps;

export const Input = forwardRef<TextInput, TInputProps>(
	({ error, multiline, style, ...props }, ref) => {
		const styles = useStyles(error, multiline);

		return (
			<View style={styles.container}>
				<TextInput
					ref={ref}
					style={[styles.input, style]}
					placeholderTextColor={colors.slate[400]}
					multiline={multiline}
					{...props}
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
			</View>
		);
	}
);

type TInputStyles = {
	container: object;
	input: object;
	errorText: object;
};

const useStyles = (error?: string, multiline?: boolean) => {
	return createStyles<TInputStyles>(theme => {
		const getInputHeight = () => {
			if (multiline) return { minHeight: 72 };
			return { height: 56 }; // h-14 equivalent
		};

		const getTextAlign = () => {
			if (multiline) return { textAlignVertical: 'top' };
			return Platform.select({
				ios: {},
				android: { textAlignVertical: 'center' },
			});
		};

		return {
			container: {
				width: '100%',
				marginBottom: 16, // mb-4 equivalent
			},
			input: {
				width: '100%',
				paddingHorizontal: 16, // px-4 equivalent
				paddingVertical: Platform.select({ ios: 16, android: 8 }),
				fontSize: fontSizes.lg, // text-lg equivalent
				borderRadius: radius.lg, // rounded-lg equivalent
				borderWidth: 1,
				borderColor: error ? theme.colors.red[300] : theme.colors.slate[200],
				backgroundColor: 'white',
				...getInputHeight(),
				...getTextAlign(),
			},
			errorText: {
				marginTop: 8, // mt-2 equivalent
				fontSize: fontSizes.base, // text-base equivalent
				color: theme.colors.red[500], // text-red-500 equivalent
			},
		};
	});
};
