import { yupResolver } from '@hookform/resolvers/yup';
import {
	createActivitySchema,
	TActivityFormData,
	transformFormDataToActivityInput,
} from '@/types/ActivityFormSchema';
import { ActivityInput, ActivityInputType } from '@/api/generated/schemas';
import { Button } from '@/components/Button';
import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select/Select';
import { formatDate, formatDateForInput, formatTime } from '@/lib/utils/dateUtils';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, StyleSheet } from 'react-native';
import { colors } from '@/assets/colors/colors';

type TActivityFormProps = {
	initialData?: ActivityInput;
	onSubmit: (data: ActivityInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
	tripStartDate: string;
	tripEndDate: string;
};

const activityTypeOptions = [
	{ label: 'Transport', value: ActivityInputType.TRANSPORT },
	{ label: 'Flight', value: ActivityInputType.FLIGHT },
	{ label: 'Accommodation', value: ActivityInputType.ACCOMMODATION },
	{ label: 'Food', value: ActivityInputType.FOOD },
	{ label: 'Reminder', value: ActivityInputType.REMINDER },
	{ label: 'Other', value: ActivityInputType.OTHER },
];

export const ActivityForm = ({
	initialData,
	onSubmit,
	isSubmitting,
	submitError,
	tripStartDate,
	tripEndDate,
}: TActivityFormProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TActivityFormData>({
		resolver: yupResolver(createActivitySchema(tripStartDate, tripEndDate)),
		defaultValues: {
			title: initialData?.title ?? '',
			description: initialData?.description ?? '',
			startTime: initialData?.startTime
				? formatDateForInput(initialData.startTime)
				: formatDateForInput(tripStartDate),
			endTime: initialData?.endTime
				? formatDateForInput(initialData.endTime)
				: undefined,
			type: initialData?.type ?? ActivityInputType.OTHER,
		},
		context: {
			tripStartDate,
			tripEndDate,
		},
	});

	const getErrorMessage = (error: unknown) => {
		if (!error) return null;

		if (typeof error === 'object' && error !== null) {
			const apiError = error as { response?: { data?: { message: string } } };

			if (apiError.response?.data?.message) {
				return apiError.response.data.message;
			}
		}

		return error instanceof Error ? error.message : 'An unexpected error occurred';
	};

	const onFormSubmit = (data: TActivityFormData) => {
		onSubmit(transformFormDataToActivityInput(data));
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
					<Text style={styles.label}>Activity Title*</Text>
					<Controller
						control={control}
						name="title"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Enter activity title"
								value={value}
								onChangeText={onChange}
								error={errors.title?.message}
							/>
						)}
					/>
				</View>

				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Activity Type*</Text>
					<Controller
						control={control}
						name="type"
						render={({ field: { onChange, value } }) => (
							<Select
								value={value}
								onValueChange={onChange}
								items={activityTypeOptions}
								placeholder="Select activity type"
								error={errors.type?.message}
								closeOnSelect={false}
							/>
						)}
					/>
				</View>

				<View style={styles.dateTimeContainer}>
					<View style={styles.fieldContainer}>
						<Text style={styles.infoText}>
							Trip start: {formatTime(tripStartDate)} {formatDate(tripStartDate)}
						</Text>
						<Text style={styles.label}>Start Date and Time*</Text>
						<Controller
							control={control}
							name="startTime"
							render={({ field: { onChange, value } }) => (
								<DateTimePicker
									value={value}
									onChange={(newValue: string) => {
										onChange(newValue);
									}}
									error={{
										date: errors.startTime?.message,
										time: errors.startTime?.message,
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
						<Text style={styles.infoText}>
							Trip end: {formatTime(tripEndDate)} {formatDate(tripEndDate)}
						</Text>
						<Text style={styles.label}>End Date and Time</Text>
						<Controller
							control={control}
							name="endTime"
							render={({ field: { onChange, value } }) => (
								<DateTimePicker
									value={value}
									onChange={(newValue: string) => {
										onChange(newValue);
									}}
									error={{
										date: errors.endTime?.message,
										time: errors.endTime?.message,
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
								placeholder="Enter activity description"
								value={value ?? ''}
								onChangeText={onChange}
								multiline
								numberOfLines={2}
							/>
						)}
					/>
				</View>
			</View>

			<Button
				onPress={handleSubmit(onFormSubmit)}
				variant="primary"
				fullWidth
				disabled={isSubmitting}
				title={isSubmitting ? 'Saving...' : initialData ? 'Update Activity' : 'Create Activity'}
			/>
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
				contentContainerStyle={styles.scrollContent}
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
	container: {
		flexDirection: 'column',
		gap: 24,
	},
	errorContainer: {
		padding: 12,
		backgroundColor: colors.red[50],
		borderRadius: 8,
	},
	errorText: {
		fontSize: 14,
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
		fontSize: 16,
		fontWeight: '500',
		color: colors.slate[700],
	},
	infoText: {
		fontSize: 14,
		color: colors.slate[600],
	},
	dateTimeContainer: {
		flexDirection: 'column',
		gap: 16,
		marginTop: 16,
	},
	scrollContent: {
		flexGrow: 1,
	},
});
