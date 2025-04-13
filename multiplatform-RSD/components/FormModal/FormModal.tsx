import { Trip, TripInput } from '@/api/generated/schemas';
import { CrossIcon } from '@/assets/icons/CrossIcon/CrossIcon';
import { Modal, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { TripForm } from '@/components/TripForm';
import { colors } from '@/assets/colors/colors';

type TTripFormModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onSubmit: (data: TripInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
	initialData?: Trip;
};

export const FormModal = ({
	isVisible,
	onClose,
	onSubmit,
	isSubmitting,
	submitError,
	initialData,
}: TTripFormModalProps) => {
	return (
		<Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
			<SafeAreaView style={styles.container}>
				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.title}>Create New Trip</Text>
						<TouchableOpacity onPress={onClose}>
							<CrossIcon size={24} color={colors.slate[400]} />
						</TouchableOpacity>
					</View>

					<View style={styles.formContainer}>
						<TripForm
							onSubmit={onSubmit}
							isSubmitting={isSubmitting}
							submitError={submitError}
							initialData={initialData}
						/>
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
