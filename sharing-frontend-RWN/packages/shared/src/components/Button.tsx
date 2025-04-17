import { ReactNode } from 'react';
import { Pressable, Text, TouchableOpacityProps, View } from 'react-native';
import { components, fontSizes, fontWeights, radius } from '../theme';
import { createStyles } from '../utils/createStyles';

type TButtonProps = {
	children: ReactNode;
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

type TButtonStyles = {
	button: object;
	buttonContent: object;
	text: object;
	fullWidth: object;
	disabled: object;
	disabledText: object;
	iconContainer: object;
};

export const Button = ({
	children,
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
	const styles = useStyles(variant, outlined);

	return (
		<Pressable onPress={onPress} disabled={isLoading || disabled} {...props}>
			<View style={[styles.button, fullWidth && styles.fullWidth, disabled && styles.disabled]}>
				<View style={styles.buttonContent}>
					{icon && <View style={styles.iconContainer}>{icon}</View>}
					<Text style={[styles.text, disabled && styles.disabledText]}>
						{isLoading ? loadingText || 'Loading...' : children}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

const useStyles = (variant: TButtonProps['variant'], outlined: boolean) => {
	return createStyles<TButtonStyles>(theme => {
		const getBackgroundColor = () => {
			if (outlined) return 'white';

			switch (variant) {
				case 'primary':
					return theme.colors.slate[900];
				case 'secondary':
					return 'white';
				case 'danger':
					return 'white';
				default:
					return theme.colors.slate[900];
			}
		};

		const getTextColor = () => {
			if (outlined) {
				if (variant === 'danger') return theme.colors.red[600];
				return theme.colors.slate[900];
			}

			switch (variant) {
				case 'primary':
					return 'white';
				case 'secondary':
					return theme.colors.slate[900];
				case 'danger':
					return theme.colors.red[600];
				default:
					return 'white';
			}
		};

		const getBorderProperties = () => {
			if (!outlined) return {};

			if (variant === 'danger') {
				return {
					borderWidth: 1,
					borderColor: theme.colors.red[500],
				};
			}

			return {
				borderWidth: 1,
				borderColor: theme.colors.slate[300],
			};
		};

		return {
			button: {
				paddingVertical: components.button.paddingY,
				paddingHorizontal: components.button.paddingX,
				borderRadius: radius.lg,
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
				fontSize: fontSizes.sm,
				fontWeight: fontWeights.medium,
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
		};
	});
};
