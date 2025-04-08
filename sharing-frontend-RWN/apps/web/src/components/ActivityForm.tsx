import { yupResolver } from '@hookform/resolvers/yup';
import { ActivityInput, ActivityInputType } from '@monorepo/shared/src/api/generated/schemas';
import { DateTimePicker, Select } from '@monorepo/shared/src/components';
import { Button } from '@monorepo/shared/src/components/Button';
import { Input } from '@monorepo/shared/src/components/Input';
import { colors, fontSizes, fontWeights, radius, spacing } from '@monorepo/shared/src/theme';
import { formatDate, formatDateForInput, formatTime } from '@monorepo/shared/src/utils/dateUtils';
import {
	createActivitySchema,
	TActivityFormData,
	transformFormDataToActivityInput,
} from '@monorepo/shared/src/yup';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

type TActivityFormProps = {
	initialData?: TActivityFormData;
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
		mode: 'onChange',
		defaultValues: initialData
			? {
					title: initialData.title,
					description: initialData.description,
					startTime: formatDateForInput(initialData.startTime),
					endTime: initialData.endTime ? formatDateForInput(initialData.endTime) : undefined,
					type: initialData.type,
				}
			: {
					startTime: formatDateForInput(tripStartDate),
					type: ActivityInputType.OTHER,
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

	const onSubmitForm = (data: TActivityFormData) => {
		onSubmit(transformFormDataToActivityInput(data));
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitForm)}>
			{submitError && <ErrorMessage>{getErrorMessage(submitError)}</ErrorMessage>}

			<FormContent>
				<FormGroup>
					<Label htmlFor="title">Activity Title*</Label>
					<Controller
						control={control}
						name="title"
						render={({ field: { onChange, value } }) => (
							<Input
								id="title"
								type="text"
								placeholder="Enter activity title"
								value={value || ''}
								onChange={onChange}
								error={errors.title?.message}
							/>
						)}
					/>
				</FormGroup>

				<FormGroup>
					<Label htmlFor="type">Activity Type*</Label>
					<Controller
						control={control}
						name="type"
						render={({ field: { onChange, value } }) => (
							<Select
								id="type"
								value={value || ''}
								onValueChange={onChange}
								items={activityTypeOptions}
								placeholder="Select activity type"
								error={errors.type?.message}
							/>
						)}
					/>
				</FormGroup>

				<TripDatesInfo>
					Trip dates: {formatDate(tripStartDate) + ' ' + formatTime(tripStartDate)} -{' '}
					{formatDate(tripEndDate) + ' ' + formatTime(tripEndDate)}
				</TripDatesInfo>

				<DateContainer>
					<FormGroup>
						<Label>Start Date and Time*</Label>
						<Controller
							control={control}
							name="startTime"
							render={({ field }) => {
								const [date, time] = field.value?.split('T') || ['', ''];
								return (
									<DateTimePicker
										date={date}
										time={time}
										onDateChange={newDate => {
											const currentTime = time || '00:00';
											field.onChange(`${newDate}T${currentTime}`);
										}}
										onTimeChange={newTime => {
											const currentDate = date || '';
											if (!currentDate) return;
											field.onChange(`${currentDate}T${newTime}`);
										}}
										error={
											errors.startTime?.message ? { date: errors.startTime.message } : undefined
										}
										placeholder={{ date: 'Start date', time: 'Start time' }}
									/>
								);
							}}
						/>
					</FormGroup>

					<FormGroup>
						<Label>End Date and Time (Optional)</Label>
						<Controller
							control={control}
							name="endTime"
							render={({ field }) => {
								const [date, time] = field.value?.split('T') || ['', ''];
								return (
									<DateTimePicker
										date={date}
										time={time}
										onDateChange={newDate => {
											const currentTime = time || '00:00';
											field.onChange(`${newDate}T${currentTime}`);
										}}
										onTimeChange={newTime => {
											const currentDate = date || '';
											if (!currentDate) return;
											field.onChange(`${currentDate}T${newTime}`);
										}}
										error={errors.endTime?.message ? { date: errors.endTime.message } : undefined}
										placeholder={{ date: 'End date', time: 'End time' }}
									/>
								);
							}}
						/>
					</FormGroup>
				</DateContainer>

				<FormGroup>
					<Label htmlFor="description">Description</Label>
					<Controller
						control={control}
						name="description"
						render={({ field: { onChange, value } }) => (
							<Input
								id="description"
								multiline
								placeholder="Enter activity description"
								value={value || ''}
								onChange={onChange}
								error={errors.description?.message}
							/>
						)}
					/>
				</FormGroup>
			</FormContent>

			<ButtonContainer>
				<Button variant="primary" disabled={isSubmitting} onPress={handleSubmit(onSubmitForm)}>
					{isSubmitting ? 'Saving...' : initialData ? 'Update Activity' : 'Create Activity'}
				</Button>
			</ButtonContainer>
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${spacing[6]}px;
`;

const FormContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${spacing[4]}px;
`;

const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	display: block;
	font-size: ${fontSizes.sm}px;
	font-weight: ${fontWeights.medium};
	color: ${colors.slate[700]};
	margin-bottom: ${spacing[1]}px;
`;

const TripDatesInfo = styled.div`
	font-size: ${fontSizes.xs}px;
	color: ${colors.slate[500]};
	margin-bottom: ${spacing[1]}px;
`;

const DateContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: ${spacing[4]}px;
`;

const ErrorMessage = styled.div`
	padding: ${spacing[3]}px;
	font-size: ${fontSizes.sm}px;
	color: ${colors.red[500]};
	background-color: ${colors.red[50]};
	border-radius: ${radius.lg}px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: ${spacing[4]}px;
`;
