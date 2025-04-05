import { Trip, TripInput } from '@monorepo/shared/src/api/generated/schemas';
import { CrossIcon } from '@monorepo/shared/src/assets/icons/CrossIcon';
import { colors, fontSizes, fontWeights, spacing } from '@monorepo/shared/src/theme';
import { createStyles } from '@monorepo/shared/src/utils/createStyles';
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { TripForm } from './TripForm';

type TTripFormModalProps = {
	isVisible: boolean;
	onClose: () => void;
	onSubmit: (data: TripInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
	initialData?: Trip;
};

type TTripFormModalStyles = {
	container: object;
	content: object;
	header: object;
	title: object;
	formContainer: object;
};

export const TripFormModal = ({
	isVisible,
	onClose,
	onSubmit,
	isSubmitting,
	submitError,
	initialData,
}: TTripFormModalProps) => {
	const styles = useStyles();

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

const useStyles = () => {
	return createStyles<TTripFormModalStyles>(theme => ({
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
			padding: spacing[4],
		},
		title: {
			fontSize: fontSizes['2xl'],
			fontWeight: fontWeights.semibold,
		},
		formContainer: {
			flex: 1,
			padding: spacing[4],
		},
	}));
};
