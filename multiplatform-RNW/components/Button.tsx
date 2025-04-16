import { ReactNode } from 'react';
import { Pressable, Text, TouchableOpacityProps, View, StyleSheet } from 'react-native';
import { colors } from '../assets/colors/colors';

type TButtonProps = {
	title?: string;
	variant?: 'primary' | 'secondary' | 'danger';
	isLoading?: boolean;
	loadingText?: string;
	fullWidth?: boolean;
	icon?: ReactNode;
	outlined?: boolean;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	onPress: () => void;
} & Omit<TouchableOpacityProps, 'onPress'>;

export const Button = ({
	title,
	variant = 'primary',
	isLoading = false,
	loadingText,
	fullWidth = false,
	icon,
	outlined = false,
	disabled,
	type = 'button',
	onPress,
	...props
}: TButtonProps) => {
	const styles = useButtonStyles(variant, outlined);

	return (
		<Pressable onPress={onPress} disabled={isLoading || disabled} {...props}>
			<View style={[styles.button, fullWidth && styles.fullWidth, disabled && styles.disabled]}>
				<View style={styles.buttonContent}>
					{icon && <View style={styles.iconContainer}>{icon}</View>}
					<Text style={[styles.text, disabled && styles.disabledText]}>
						{isLoading ? loadingText || 'Loading...' : title}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

const useButtonStyles = (variant: TButtonProps['variant'], outlined: boolean) => {
	const getBackgroundColor = () => {
		if (outlined) return colors.white;

		switch (variant) {
			case 'primary':
				return colors.slate[900];
			case 'secondary':
				return colors.white;
			case 'danger':
				return colors.white;
			default:
				return colors.slate[900];
		}
	};

	const getTextColor = () => {
		if (outlined) {
			if (variant === 'danger') return colors.red[600];
			return colors.slate[900];
		}

		switch (variant) {
			case 'primary':
				return colors.white;
			case 'secondary':
				return colors.slate[900];
			case 'danger':
				return colors.red[600];
			default:
				return colors.white;
		}
	};

	const getBorderProperties = () => {
		if (!outlined) return {};

		if (variant === 'danger') {
			return {
				borderWidth: 1,
				borderColor: colors.red[500],
			};
		}

		return {
			borderWidth: 1,
			borderColor: colors.slate[300],
		};
	};

	return StyleSheet.create({
		button: {
			paddingVertical: 8,
			paddingHorizontal: 16,
			borderRadius: 8,
			backgroundColor: getBackgroundColor(),
			alignSelf: 'flex-start',
			...getBorderProperties(),
		},
		buttonContent: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},
		text: {
			fontSize: 14,
			fontWeight: '500',
			color: getTextColor(),
			textAlign: 'center',
		},
		fullWidth: {
			width: '100%',
			alignSelf: 'stretch',
		},
		disabled: {
			opacity: 0.5,
		},
		disabledText: {
			opacity: 0.5,
		},
		iconContainer: {
			marginRight: 8,
		},
	});
};
