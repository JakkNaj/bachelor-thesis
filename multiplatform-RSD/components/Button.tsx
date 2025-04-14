import { ReactNode } from 'react';
import { css, html } from 'react-strict-dom';
import { colors } from '../assets/colors/colors';
import { Platform } from 'react-native';

type TButtonProps = {
	title: string;
	variant?: 'primary' | 'secondary' | 'danger';
	isLoading?: boolean;
	loadingText?: string;
	fullWidth?: boolean;
	icon?: ReactNode;
	outlined?: boolean;
	disabled?: boolean;
	type?: 'button' | 'submit';
	style?: Record<string, string | number>;
	onPress: () => void;
};

export const Button = ({
	title,
	variant = 'primary',
	isLoading = false,
	loadingText,
	fullWidth = false,
	icon,
	outlined = false,
	disabled = false,
	type = 'button',
	style,
	onPress,
}: TButtonProps) => {
	const handleClick = () => {
		if (!disabled && !isLoading) {
			onPress();
		}
	};

	return (
		<html.button
			type={type}
			style={[
				styles.button(variant, outlined, fullWidth, disabled || isLoading, !!icon),
				Platform.OS === 'web' && webStyles.button(fullWidth),
				style,
			]}
			onClick={handleClick}
			disabled={disabled || isLoading}
		>
			{icon && (
				<html.div style={styles.iconContainer}>
					{icon}
				</html.div>
			)}
			<html.span style={styles.text(variant, outlined, disabled || isLoading)}>
				{isLoading ? loadingText || 'Loading...' : title}
			</html.span>
		</html.button>
	);
};

const styles = css.create({
	button: (variant: 'primary' | 'secondary' | 'danger', outlined: boolean, fullWidth: boolean, disabled: boolean, hasIcon: boolean) => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: '0.75rem',
		paddingRight: '1.5rem',
		paddingBottom: '0.75rem',
		paddingLeft: hasIcon ? '1rem' : '1.5rem',
		borderRadius: '0.5rem',
		backgroundColor: outlined 
			? colors.white 
			: variant === 'primary' 
				? colors.slate[900] 
				: variant === 'danger' 
					? colors.white 
					: colors.white,
		borderWidth: outlined ? '1px' : '0',
		borderStyle: 'solid',
		borderColor: variant === 'danger' && outlined ? colors.red[500] : colors.slate[300],
		alignSelf: fullWidth ? 'stretch' : 'flex-start',
		opacity: disabled ? '0.5' : '1',
		cursor: disabled ? 'not-allowed' : 'pointer',
	}),
	text: (variant: 'primary' | 'secondary' | 'danger', outlined: boolean, disabled: boolean) => ({
		fontSize: '1rem',
		fontWeight: '500',
		color: outlined 
			? variant === 'danger' 
				? colors.red[600] 
				: colors.slate[900] 
			: variant === 'primary' 
				? colors.white 
				: variant === 'danger' 
					? colors.red[600] 
					: colors.slate[900],
		opacity: disabled ? '0.5' : '1',
	}),
	iconContainer: {
		marginRight: '0.5rem',
	},
});

const webStyles = css.create({
	button: (fullWidth: boolean) => ({
		width: fullWidth ? '100%' : 'auto',
	}),
});
