import { yupResolver } from '@hookform/resolvers/yup';
import { TripInput } from '@/api/generated/schemas';
import { Button } from '@/components/Button';
import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker';
import { Input } from '@/components/Input';
import { formatDateForInput } from '@/lib/utils/dateUtils';
import {
	transformFormDataToTripInput,
	tripFormSchema,
	TTripFormData,
} from '@/types/TripFormSchema';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/assets/colors/colors';

type TTripFormProps = {
	initialData?: TripInput;
	onSubmit: (data: TripInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
};

export const TripForm = ({ initialData, onSubmit, isSubmitting, submitError }: TTripFormProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TTripFormData>({
		resolver: yupResolver(tripFormSchema),
		defaultValues: {
			title: initialData?.title ?? '',
			description: initialData?.description ?? '',
			startDate: initialData?.startDate ? formatDateForInput(initialData.startDate) : '',
			endDate: initialData?.endDate ? formatDateForInput(initialData.endDate) : '',
		},
	});

	const getErrorMessage = (error: unknown) => {
		if (!error) return null;

		if (typeof error === 'object' && error !== null) {
			const apiError = error as {
				response?: { data?: { message: string; invalidActivities?: Array<{ title: string }> } };
			};

			if (apiError.response?.data) {
				const { message, invalidActivities } = apiError.response.data;

				if (invalidActivities?.length) {
					const activities = invalidActivities.map(a => a.title).join(', ');
					return `${message}. Affected activities: ${activities}`;
				}

				return message;
			}
		}

		return error instanceof Error ? error.message : 'An unexpected error occurred';
	};

	const onFormSubmit = (data: TTripFormData) => {
		onSubmit(transformFormDataToTripInput(data));
	};

	const renderContent = () => (
		<View style={styles.container}>
			{submitError && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{getErrorMessage(submitError)}</Text>
				</View>
			)}

			<View style={styles.formSection}>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Trip Title*</Text>
					<Controller
						control={control}
						name="title"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Enter trip title"
								value={value}
								onChangeText={onChange}
								error={errors.title?.message}
							/>
						)}
					/>
				</View>

				<View style={styles.dateTimeContainer}>
					<View style={styles.fieldContainer}>
						<Text style={styles.label}>Start Date and Time*</Text>
						<Controller
							control={control}
							name="startDate"
							render={({ field: { onChange, value } }) => (
								<DateTimePicker
									value={value}
									onChange={onChange}
									error={{
										date: errors.startDate?.message,
										time: errors.startDate?.message,
									}}
									placeholder={{
										date: 'Start date',
										time: 'Start time',
									}}
								/>
							)}
						/>
					</View>

					<View style={styles.fieldContainer}>
						<Text style={styles.label}>End Date and Time*</Text>
						<Controller
							control={control}
							name="endDate"
							render={({ field: { onChange, value } }) => (
								<DateTimePicker
									value={value}
									onChange={onChange}
									error={{
										date: errors.endDate?.message,
										time: errors.endDate?.message,
									}}
									placeholder={{
										date: 'End date',
										time: 'End time',
									}}
								/>
							)}
						/>
					</View>
				</View>

				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Description</Text>
					<Controller
						control={control}
						name="description"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Enter trip description"
								value={value ?? ''}
								onChangeText={onChange}
								multiline
								numberOfLines={2}
							/>
						)}
					/>
				</View>
			</View>

			<View style={styles.submitContainer}>
				<Button
					onPress={handleSubmit(onFormSubmit)}
					variant="primary"
					fullWidth
					disabled={isSubmitting}
					title={isSubmitting ? 'Saving...' : initialData ? 'Update Trip' : 'Create Trip'}
				/>
			</View>
		</View>
	);

	if (Platform.OS === 'web') {
		return renderContent();
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.keyboardAvoidingView}
		>
			<ScrollView
				contentContainerStyle={styles.scrollViewContent}
				keyboardShouldPersistTaps="handled"
			>
				{renderContent()}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	keyboardAvoidingView: {
		flex: 1,
	},
	scrollViewContent: {
		flexGrow: 1,
	},
	container: {
		flexDirection: 'column',
	},
	errorContainer: {
		padding: 12,
		backgroundColor: colors.red[50],
		borderRadius: 16,
	},
	errorText: {
		fontSize: 18,
		color: colors.red[500],
	},
	formSection: {
		flexDirection: 'column',
		gap: 16,
	},
	fieldContainer: {
		gap: 4,
	},
	label: {
		fontSize: 18,
		fontWeight: '500',
		color: colors.slate[700],
	},
	dateTimeContainer: {
		flexDirection: 'column',
		gap: 16,
	},
	submitContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});
