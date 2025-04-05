import { Pressable, Text, View } from 'react-native';
import { createStyles } from '../utils/createStyles';
import { components, fontSizes, fontWeights, radius } from '../theme';

type TButtonProps = {
	onPress: () => void;
	title: string;
	variant?: 'primary' | 'secondary' | 'danger';
};

type TButtonStyles = {
	button: object;
	primary: object;
	secondary: object;
	danger: object;
	text: object;
};

export const Button = ({ onPress, title, variant = 'primary' }: TButtonProps) => {
	const styles = useStyles(variant);

	return (
		<Pressable onPress={onPress}>
			<View style={[styles.button, styles[variant]]}>
				<Text style={styles.text}>{title}</Text>
			</View>
		</Pressable>
	);
};

const useStyles = (variant: TButtonProps['variant']) => {
	return createStyles<TButtonStyles>(theme => ({
		button: {
			paddingVertical: components.button.paddingY,
			paddingHorizontal: components.button.paddingX,
			borderRadius: radius.lg,
			alignItems: 'center',
			justifyContent: 'center',
		},
		primary: {
			backgroundColor: theme.colors.slate[900],
		},
		secondary: {
			backgroundColor: 'white',
			borderWidth: 1,
			borderColor: theme.colors.slate[300],
		},
		danger: {
			backgroundColor: 'white',
			borderWidth: 1,
			borderColor: theme.colors.red[500],
		},
		text: {
			color: variant === 'primary' ? 'white' : theme.colors.slate[900],
			fontSize: fontSizes.base,
			fontWeight: fontWeights.medium,
		},
	}));
};
