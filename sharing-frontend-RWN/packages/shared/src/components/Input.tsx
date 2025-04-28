import { forwardRef } from 'react';
import { Platform, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fontSizes, radius } from '../theme';
import { createStyles } from '../utils/createStyles';

type TInputProps = {
	error?: string;
	multiline?: boolean;
	secureTextEntry?: boolean;
	onChange?: (e: any) => void;
	value?: string;
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
} & TextInputProps;

export const Input = forwardRef<TextInput, TInputProps>(
	({ error, multiline, secureTextEntry, style, onChange, value, type = 'text', ...props }, ref) => {
		const styles = useStyles(error, multiline);

		const handleChange = (e: any) => {
			if (onChange) {
				if (Platform.OS === 'web') {
					onChange(e);
				} else {
					onChange({
						target: {
							value: e,
						},
					});
				}
			}
		};

		const getInputProps = () => {
			const baseProps = {
				...props,
				secureTextEntry: secureTextEntry || type === 'password',
			};

			if (Platform.OS === 'web') {
				return {
					...baseProps,
					type,
				};
			}

			switch (type) {
				case 'email':
					return {
						...baseProps,
						keyboardType: 'email-address' as const,
						autoCapitalize: 'none' as const,
						autoComplete: 'email' as const,
					};
				case 'number':
					return {
						...baseProps,
						keyboardType: 'numeric' as const,
					};
				case 'tel':
					return {
						...baseProps,
						keyboardType: 'phone-pad' as const,
						autoComplete: 'tel' as const,
					};
				case 'date':
					return {
						...baseProps,
						keyboardType: 'numeric' as const,
					};
				default:
					return baseProps;
			}
		};

		return (
			<View style={styles.container}>
				<TextInput
					ref={ref}
					style={[styles.input, style]}
					placeholderTextColor={colors.slate[400]}
					multiline={multiline}
					onChangeText={Platform.OS === 'web' ? undefined : handleChange}
					onChange={Platform.OS === 'web' ? handleChange : undefined}
					value={value}
					{...getInputProps()}
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
			</View>
		);
	}
);

const useStyles = (error?: string, multiline?: boolean) => {
	return createStyles(theme => {
		const getInputHeight = () => {
			if (multiline) return { minHeight: 72 };
			return { height: Platform.OS === 'web' ? ('auto' as any) : 56 };
		};

		const getTextAlign = () => {
			if (multiline) return { textAlignVertical: 'top' };
			return Platform.select({
				ios: {},
				android: { textAlignVertical: 'center' },
			});
		};

		const getPaddingVertical = () => {
			if (Platform.OS === 'web') return '12px';
			return Platform.select({ ios: 16, android: 8 });
		};

		return {
			container: {
				width: '100%',
				marginBottom: 16,
			},
			input: {
				width: '100%',
				paddingHorizontal: Platform.OS === 'web' ? ('16px' as any) : 16,
				paddingVertical: getPaddingVertical() as any,
				fontSize: Platform.OS === 'web' ? (fontSizes.sm as any) : (fontSizes.lg as any),
				borderRadius: radius.lg,
				borderWidth: 1,
				borderColor: error ? theme.colors.red[300] : theme.colors.slate[200],
				backgroundColor: 'white',
				...getInputHeight(),
				...getTextAlign(),
			} as any,
			errorText: {
				marginTop: 8,
				fontSize: fontSizes.base as any,
				color: theme.colors.red[500],
			},
		};
	});
};
