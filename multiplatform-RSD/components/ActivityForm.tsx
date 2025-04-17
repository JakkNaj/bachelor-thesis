import { yupResolver } from '@hookform/resolvers/yup';
import { css, html } from 'react-strict-dom';
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
import { colors } from '@/assets/colors/colors';
import { Platform, KeyboardAvoidingView, ScrollView, StyleSheet as RNStyleSheet } from 'react-native';

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
		<html.div style={styles.container}>
			{submitError && (
				<html.div style={styles.errorContainer()}>
					<html.span style={styles.errorText()}>{getErrorMessage(submitError)}</html.span>
				</html.div>
			)}

			<html.div style={styles.formSection}>
				<html.div style={styles.fieldContainer}>
					<html.span style={styles.label()}>Activity Title*</html.span>
					<Controller
						control={control}
						name="title"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Enter activity title"
								value={value}
								onChange={onChange}
								error={errors.title?.message}
							/>
						)}
					/>
				</html.div>

				<html.div style={styles.fieldContainer}>
					<html.span style={styles.label()}>Activity Type*</html.span>
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
				</html.div>

				<html.div style={styles.dateTimeContainer}>
					<html.div style={styles.fieldContainer}>
						<html.span style={styles.infoText()}>
							Trip start: {formatTime(tripStartDate)} {formatDate(tripStartDate)}
						</html.span>
						<html.span style={styles.label()}>Start Date and Time*</html.span>
						<Controller
							control={control}
							name="startTime"
							render={({ field: { onChange, value } }) => {
								return (
									<DateTimePicker
										value={value}
										onChange={(newValue) => {
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
								);
							}}
						/>
					</html.div>

					<html.div style={styles.fieldContainer}>
						<html.span style={styles.infoText()}>
							Trip end: {formatTime(tripEndDate)} {formatDate(tripEndDate)}
						</html.span>
						<html.span style={styles.label()}>End Date and Time</html.span>
						<Controller
							control={control}
							name="endTime"
							render={({ field: { onChange, value } }) => {
								const [date, time] = value ? value.split('T') : ['', ''];
								return (
									<DateTimePicker
										value={value}
										onChange={(newValue) => {
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
								);
							}}
						/>
					</html.div>
				</html.div>

				<html.div style={styles.fieldContainer}>
					<html.span style={styles.label()}>Description</html.span>
					<Controller
						control={control}
						name="description"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Enter activity description"
								value={value ?? ''}
								onChange={onChange}
								multiline
							/>
						)}
					/>
				</html.div>
			</html.div>

			<Button
				onPress={handleSubmit(onFormSubmit)}
				variant="primary"
				fullWidth
				disabled={isSubmitting}
				title={isSubmitting ? 'Saving...' : initialData ? 'Update Activity' : 'Create Activity'}
			/>
		</html.div>
	);

	if (Platform.OS === 'web') {
		return renderContent();
	}

	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={nativeStyles.keyboardAvoidingView}
		>
			<ScrollView 
				contentContainerStyle={nativeStyles.scrollViewContent}
				keyboardShouldPersistTaps="handled"
			>
				{renderContent()}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const nativeStyles = RNStyleSheet.create({
	keyboardAvoidingView: {
		flex: 1,
	},
	scrollViewContent: {
		flexGrow: 1,
	},
});

const styles = css.create({
	container: {
		flexDirection: 'column',
		gap: '1.5rem',
	},
	errorContainer: () => ({
		padding: '0.75rem',
		backgroundColor: colors.red[50],
		borderRadius: '0.5rem',
	}),
	errorText: () => ({
		fontSize: '1.125rem',
		color: colors.red[500],
	}),
	formSection: {
		flexDirection: 'column',
		gap: '1rem',
	},
	fieldContainer: {
		gap: '0.25rem',
		display: "flex",
		flexDirection: "column",
	},
	label: () => ({
		fontSize: '1.125rem',
		fontWeight: '500',
		color: colors.slate[700],
	}),
	infoText: () => ({
		fontSize: '1rem',
		color: colors.slate[600],
	}),
	dateTimeContainer: {
		flexDirection: 'column',
		gap: '1rem',
		marginTop: "1rem",
	},
});