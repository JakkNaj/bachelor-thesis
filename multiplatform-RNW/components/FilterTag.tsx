import { colors } from '@/assets/colors/colors';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type TFilterTagProps = {
	children: React.ReactNode;
	isActive?: boolean;
	onPress: () => void;
};

export const FilterTag = ({ children, isActive = false, onPress }: TFilterTagProps) => {
	const styles = useStyles(isActive);

	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Text style={styles.text}>{children}</Text>
		</TouchableOpacity>
	);
};

const useStyles = (isActive: boolean) => {
	return StyleSheet.create({
		button: {
			paddingHorizontal: 12,
			paddingVertical: 8,
			borderRadius: 6,
			backgroundColor: isActive ? colors.slate[100] : 'transparent',
		},
		text: {
			fontSize: 16,
			color: isActive ? colors.slate[900] : colors.slate[600],
			fontWeight: isActive ? '500' : '400',
		},
	});
};
