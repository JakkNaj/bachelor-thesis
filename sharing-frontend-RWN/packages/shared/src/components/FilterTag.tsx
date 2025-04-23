import { Text, TouchableOpacity } from 'react-native';
import { fontSizes, fontWeights, radius, spacing } from '../theme';
import { createStyles } from '../utils/createStyles';

type TFilterTagProps = {
	children: React.ReactNode;
	isActive?: boolean;
	onPress: () => void;
};

type TFilterTagStyles = {
	button: object;
	text: object;
};

export const FilterTag = ({ children, isActive = false, onPress }: TFilterTagProps) => {
	const styles = useStyles(isActive);

	return (
		<TouchableOpacity onPress={onPress} style={styles.button} accessibilityRole="button" accessibilityLabel={children as string}>
			<Text style={styles.text}>{children}</Text>
		</TouchableOpacity>
	);
};

const useStyles = (isActive: boolean) => {
	return createStyles<TFilterTagStyles>(theme => ({
		button: {
			paddingHorizontal: spacing[3],
			paddingVertical: spacing[2],
			borderRadius: radius.md,
			backgroundColor: isActive ? theme.colors.slate[100] : 'transparent',
		},
		text: {
			fontSize: fontSizes.sm,
			color: isActive ? theme.colors.slate[900] : theme.colors.slate[600],
			fontWeight: isActive ? fontWeights.medium : fontWeights.normal,
		},
	}));
};
