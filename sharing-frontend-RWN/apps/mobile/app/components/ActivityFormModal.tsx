import { ActivityInput } from '@monorepo/shared/src/api/generated/schemas';
import { CrossIcon } from '@monorepo/shared/src/assets/icons/CrossIcon';
import { colors } from '@monorepo/shared/src/theme';
import { createStyles } from '@monorepo/shared/src/utils/createStyles';
import { Modal, Pressable, SafeAreaView, Text, View } from 'react-native';
import { ActivityForm } from './ActivityForm';

type TActivityFormModalProps = {
	isVisible: boolean;
	onClose: () => void;
	initialData?: ActivityInput;
	onSubmit: (data: ActivityInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
	tripStartDate: string;
	tripEndDate: string;
};

export const ActivityFormModal = ({
	isVisible,
	onClose,
	initialData,
	onSubmit,
	isSubmitting,
	submitError,
	tripStartDate,
	tripEndDate,
}: TActivityFormModalProps) => {
	const styles = useStyles();

	const handleSubmit = async (data: ActivityInput) => {
		onSubmit(data);
		if (!submitError) {
			onClose();
		}
	};

	return (
		<Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
			<SafeAreaView style={styles.container}>
				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.title}>Create New Activity</Text>
						<Pressable onPress={onClose}>
							<CrossIcon size={24} color={colors.slate[500]} />
						</Pressable>
					</View>

					<View style={styles.formContainer}>
						<ActivityForm
							initialData={initialData}
							onSubmit={handleSubmit}
							isSubmitting={isSubmitting}
							submitError={submitError}
							tripStartDate={tripStartDate}
							tripEndDate={tripEndDate}
						/>
					</View>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

const useStyles = () => {
	return createStyles(theme => ({
		container: {
			flex: 1,
			backgroundColor: theme.colors.white,
		},
		content: {
			flex: 1,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: theme.spacing[4],
		},
		title: {
			fontSize: theme.fontSizes['2xl'],
			fontWeight: '600',
			color: theme.colors.slate[900],
		},
		formContainer: {
			flex: 1,
			padding: theme.spacing[4],
		},
	}));
};

export default ActivityFormModal;
