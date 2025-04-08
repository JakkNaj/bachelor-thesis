import { yupResolver } from '@hookform/resolvers/yup';
import {
	transformFormDataToTripInput,
	tripFormSchema,
	TTripFormData,
} from '@monorepo/shared/dist/yup';
import { TripInput } from '@monorepo/shared/src/api/generated/schemas';
import { Button } from '@monorepo/shared/src/components/Button';
import { DateTimePicker } from '@monorepo/shared/src/components/DateTimePicker/DateTimePicker';
import { Input } from '@monorepo/shared/src/components/Input';
import { fontSizes, fontWeights, radius, spacing } from '@monorepo/shared/src/theme';
import { createStyles } from '@monorepo/shared/src/utils/createStyles';
import { formatDateForInput } from '@monorepo/shared/src/utils/dateUtils';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';

type TTripFormProps = {
	initialData?: TripInput;
	onSubmit: (data: TripInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
};

type TTripFormStyles = {
	container: object;
	errorContainer: object;
	errorText: object;
	formSection: object;
	fieldContainer: object;
	label: object;
	dateTimeContainer: object;
	submitContainer: object;
};

export const TripForm = ({ initialData, onSubmit, isSubmitting, submitError }: TTripFormProps) => {
	const styles = useStyles();
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

	return (
		<ScrollView>
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
								render={({ field: { onChange, value } }) => {
									const [date, time] = value ? value.split('T') : ['', ''];
									return (
										<DateTimePicker
											date={date}
											time={time}
											onDateChange={newDate => onChange(`${newDate}T${time || '00:00'}`)}
											onTimeChange={newTime => onChange(`${date}T${newTime}`)}
											error={{
												date: errors.startDate?.message,
												time: errors.startDate?.message,
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
							<Text style={styles.label}>End Date and Time*</Text>
							<Controller
								control={control}
								name="endDate"
								render={({ field: { onChange, value } }) => {
									const [date, time] = value ? value.split('T') : ['', ''];
									return (
										<DateTimePicker
											date={date}
											time={time}
											onDateChange={newDate => onChange(`${newDate}T${time || '00:00'}`)}
											onTimeChange={newTime => onChange(`${date}T${newTime}`)}
											error={{
												date: errors.endDate?.message,
												time: errors.endDate?.message,
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
					>
						{isSubmitting ? 'Saving...' : initialData ? 'Update Trip' : 'Create Trip'}
					</Button>
				</View>
			</View>
		</ScrollView>
	);
};

export default TripForm;
const useStyles = () => {
	return createStyles<TTripFormStyles>(theme => ({
		container: {
			flexDirection: 'column',
			gap: spacing[6],
		},
		errorContainer: {
			padding: spacing[3],
			backgroundColor: theme.colors.red[50],
			borderRadius: radius.lg,
		},
		errorText: {
			fontSize: fontSizes.lg,
			color: theme.colors.red[500],
		},
		formSection: {
			flexDirection: 'column',
			gap: spacing[4],
		},
		fieldContainer: {
			gap: spacing[1],
		},
		label: {
			fontSize: fontSizes.lg,
			fontWeight: fontWeights.medium,
			color: theme.colors.slate[700],
		},
		dateTimeContainer: {
			flexDirection: 'column',
			gap: spacing[4],
		},
		submitContainer: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
		},
	}));
};
