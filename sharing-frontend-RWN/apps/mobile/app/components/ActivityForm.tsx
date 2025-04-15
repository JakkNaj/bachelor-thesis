import { yupResolver } from '@hookform/resolvers/yup';
import {
	createActivitySchema,
	TActivityFormData,
	transformFormDataToActivityInput,
} from '@monorepo/shared/src/yup';
import { ActivityInput, ActivityInputType } from '@monorepo/shared/src/api/generated/schemas';
import { Button } from '@monorepo/shared/src/components/Button';
import { DateTimePicker } from '@monorepo/shared/src/components/DateTimePicker/DateTimePicker';
import { Input } from '@monorepo/shared/src/components/Input';
import { Select } from '@monorepo/shared/src/components/Select/Select';
import { createStyles } from '@monorepo/shared/src/utils/createStyles';
import { formatDate, formatDateForInput, formatTime } from '@monorepo/shared/src/utils/dateUtils';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

type TActivityFormProps = {
	initialData?: ActivityInput;
	onSubmit: (data: ActivityInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
	tripStartDate: string;
	tripEndDate: string;
};

const useStyles = () => {
	return createStyles(theme => ({
		container: {
			flexDirection: 'column',
			gap: theme.spacing[6],
		},
		errorContainer: {
			padding: theme.spacing[3],
			backgroundColor: theme.colors.red[50],
			borderRadius: theme.radius.lg,
		},
		errorText: {
			fontSize: theme.fontSizes.lg,
			color: theme.colors.red[500],
		},
		formSection: {
			flexDirection: 'column',
			gap: theme.spacing[4],
		},
		fieldContainer: {
			marginBottom: 0,
		},
		label: {
			fontSize: theme.fontSizes.lg,
			fontWeight: '500',
			color: theme.colors.slate[700],
			marginBottom: theme.spacing[1],
		},
		infoText: {
			fontSize: theme.fontSizes.base,
			color: theme.colors.slate[600],
			marginBottom: theme.spacing[1],
		},
		dateTimeContainer: {
			flexDirection: 'column',
			gap: theme.spacing[4],
		},
		submitContainer: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
		},
		scrollContent: {
			flexGrow: 1,
		},
	}));
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
	const styles = useStyles();
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
				: formatDateForInput(tripEndDate),
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

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<ScrollView contentContainerStyle={styles.scrollContent}>
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
									render={({ field: { onChange, value } }) => {
										const [date, time] = value ? value.split('T') : ['', ''];
										return (
											<DateTimePicker
												date={date}
												time={time}
												onDateChange={newDate => {
													const currentTime = time || '00:00';
													onChange(`${newDate}T${currentTime}`);
												}}
												onTimeChange={newTime => {
													const currentDate = date || new Date().toISOString().split('T')[0];
													onChange(`${currentDate}T${newTime}`);
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
							</View>

							<View style={styles.fieldContainer}>
								<Text style={styles.infoText}>
									Trip end: {formatTime(tripEndDate)} {formatDate(tripEndDate)}
								</Text>
								<Text style={styles.label}>End Date and Time*</Text>
								<Controller
									control={control}
									name="endTime"
									render={({ field: { onChange, value } }) => {
										const [date, time] = value ? value.split('T') : ['', ''];
										return (
											<DateTimePicker
												date={date}
												time={time}
												onDateChange={newDate => onChange(`${newDate}T${time || '00:00'}`)}
												onTimeChange={newTime => onChange(`${date}T${newTime}`)}
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

					<View style={styles.submitContainer}>
						<Button
							onPress={handleSubmit(onFormSubmit)}
							variant="primary"
							fullWidth
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Saving...' : initialData ? 'Update Activity' : 'Create Activity'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ActivityForm;
