import { yupResolver } from '@hookform/resolvers/yup';
import { css, html } from 'react-strict-dom';
import {
	transformFormDataToTripInput,
	tripFormSchema,
	TTripFormData,
} from '@/types/TripFormSchema';
import { TripInput } from '@/api/generated/schemas';
import { Button } from '@/components/Button';
import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker';
import { Input } from '@/components/Input';
import { formatDateForInput } from '@/lib/utils/dateUtils';
import { Controller, useForm } from 'react-hook-form';
import { colors } from '@/assets/colors/colors';
import { Platform, KeyboardAvoidingView, ScrollView, StyleSheet as RNStyleSheet } from 'react-native';

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
		<html.div style={styles.container}>
			{submitError && (
				<html.div style={styles.errorContainer()}>
					<html.span style={styles.errorText()}>{getErrorMessage(submitError)}</html.span>
				</html.div>
			)}

			<html.div style={styles.formSection}>
				<html.div style={styles.fieldContainer}>
					<html.span style={styles.label()}>Trip Title*</html.span>
					<Controller
						control={control}
						name="title"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Enter trip title"
								value={value}
								onChange={onChange}
								error={errors.title?.message}
							/>
						)}
					/>
				</html.div>

				<html.div style={styles.dateTimeContainer}>
					<html.div style={styles.fieldContainer}>
						<html.span style={styles.label()}>Start Date and Time*</html.span>
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
					</html.div>

					<html.div style={styles.fieldContainer}>
						<html.span style={styles.label()}>End Date and Time*</html.span>
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
					</html.div>
				</html.div>

				<html.div style={styles.fieldContainer}>
					<html.span style={styles.label()}>Description</html.span>
					<Controller
						control={control}
						name="description"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Enter trip description"
								value={value ?? ''}
								onChange={onChange}
								multiline
							/>
						)}
					/>
				</html.div>
			</html.div>

			<html.div style={styles.submitContainer}>
				<Button
					onPress={handleSubmit(onFormSubmit)}
					variant="primary"
					fullWidth
					disabled={isSubmitting}
					title={isSubmitting ? 'Saving...' : initialData ? 'Update Trip' : 'Create Trip'}
				/>
			</html.div>
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
		gap: '1.5rem'
	},
	errorContainer: () => ({
		padding: '0.75rem',
		backgroundColor: colors.red[50],
		borderRadius: '1rem'
	}),
	errorText: () => ({
		fontSize: '1.125rem',
		color: colors.red[500]
	}),
	formSection: {
		flexDirection: 'column',
		gap: '1rem'
	},
	fieldContainer: {
		gap: '0.25rem'
	},
	label: () => ({
		fontSize: '1.125rem',
		fontWeight: '500',
		color: colors.slate[700]
	}),
	dateTimeContainer: {
		flexDirection: 'column',
		gap: '1rem'
	},
	submitContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}
});

export default TripForm;
