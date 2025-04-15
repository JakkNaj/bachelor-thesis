import { CrossIcon } from '@/assets/icons/CrossIcon/CrossIcon';
import { Modal, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '@/assets/colors/colors';

type TTripFormModalProps = {
	isVisible: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

export const FormModal = ({
	isVisible,
	onClose,
	title,
	children
}: TTripFormModalProps) => {
	return (
		<Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
			<SafeAreaView style={styles.container}>
				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.title}>{title}</Text>
						<TouchableOpacity onPress={onClose}>
							<CrossIcon size={24} color={colors.slate[400]} />
						</TouchableOpacity>
					</View>

					<View style={styles.formContainer}>
						{children}
					</View>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

export default FormModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	content: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16, 
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
	},
	formContainer: {
		flex: 1,
		padding: 16,
	},
});
