import { forwardRef } from 'react';
import { Platform, Text, TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { colors } from '../assets/colors/colors';

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
		const styles = useInputStyles(error, multiline);

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

const useInputStyles = (error?: string, multiline?: boolean) => {
	const getInputHeight = () => {
		if (multiline) return { minHeight: 72 };
		if (Platform.OS === 'web') return { height: '100%' as const };
		return { height: 48 };
	};

	const getTextAlign = () => {
		if (multiline) return { textAlignVertical: 'top' };
		return Platform.select({
			ios: {},
			android: { textAlignVertical: 'center' },
		});
	};

	const getPaddingVertical = () => {
		if (Platform.OS === 'web') return 12;
		return Platform.select({ ios: 12, android: 8 });
	};

	return StyleSheet.create({
		container: {
			width: '100%',
			marginBottom: 16,
		},
		input: {
			width: '100%',
			paddingHorizontal: 12,
			paddingVertical: getPaddingVertical(),
			fontSize: 14,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: error ? colors.red[300] : colors.slate[200],
			backgroundColor: colors.white,
			...getInputHeight(),
			...getTextAlign(),
		},
		errorText: {
			marginTop: 8,
			fontSize: 14,
			color: colors.red[500],
		},
	});
};
