import { yupResolver } from '@hookform/resolvers/yup';
import { Trip, TripInput } from '@monorepo/shared/src/api/generated/schemas';
import { DateTimePicker } from '@monorepo/shared/src/components';
import { Button } from '@monorepo/shared/src/components/Button';
import { Input } from '@monorepo/shared/src/components/Input';
import { colors, fontSizes, fontWeights, radius, spacing } from '@monorepo/shared/src/theme';
import { formatDateForInput } from '@monorepo/shared/src/utils/dateUtils';
import {
	TTripFormData,
	transformFormDataToTripInput,
	tripFormSchema,
} from '@monorepo/shared/src/yup';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

type TTripFormProps = {
	initialData?: Trip;
	onSubmit: (data: TripInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
};

export const TripForm = ({ initialData, onSubmit, isSubmitting, submitError }: TTripFormProps) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TTripFormData>({
		resolver: yupResolver(tripFormSchema),
		defaultValues: initialData
			? {
					title: initialData.title,
					description: initialData.description,
					startDate: formatDateForInput(initialData.startDate),
					endDate: formatDateForInput(initialData.endDate),
				}
			: {
					title: '',
					description: '',
					startDate: '',
					endDate: '',
				},
	});

	const onSubmitForm = (data: TTripFormData) => {
		onSubmit(transformFormDataToTripInput(data));
	};

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

	return (
		<Form onSubmit={handleSubmit(onSubmitForm)}>
			{submitError && <ErrorMessage>{getErrorMessage(submitError)}</ErrorMessage>}

			<FormContent>
				<FormGroup>
					<Label htmlFor="title">Trip Title*</Label>
					<Controller
						control={control}
						name="title"
						render={({ field: { onChange, value } }) => (
							<Input
								id="title"
								type="text"
								placeholder="Enter trip title"
								value={value}
								onChange={onChange}
								error={errors.title?.message}
							/>
						)}
					/>
				</FormGroup>

				<DateContainer>
					<FormGroup>
						<Label>Start Date*</Label>
						<Controller
							control={control}
							name="startDate"
							render={({ field }) => (
								<DateTimePicker
									date={field.value?.split('T')[0] || ''}
									time={field.value?.split('T')[1] || ''}
									onDateChange={newDate => {
										const currentTime =
											field.value?.split('T')[1] ||
											new Date().toLocaleTimeString('en-GB', {
												hour: '2-digit',
												minute: '2-digit',
												hour12: false,
											});
										field.onChange(`${newDate}T${currentTime}`);
									}}
									onTimeChange={newTime => {
										const currentDate = field.value?.split('T')[0] || '';
										if (!currentDate) return;
										field.onChange(`${currentDate}T${newTime}`);
									}}
									error={errors.startDate?.message ? { date: errors.startDate.message } : undefined}
								/>
							)}
						/>
					</FormGroup>

					<FormGroup>
						<Label>End Date*</Label>
						<Controller
							control={control}
							name="endDate"
							render={({ field }) => (
								<DateTimePicker
									date={field.value?.split('T')[0] || ''}
									time={field.value?.split('T')[1] || ''}
									onDateChange={newDate => {
										const currentTime = field.value?.split('T')[1] || '00:00';
										field.onChange(`${newDate}T${currentTime}`);
									}}
									onTimeChange={newTime => {
										const currentDate = field.value?.split('T')[0] || '';
										if (!currentDate) return;
										field.onChange(`${currentDate}T${newTime}`);
									}}
									error={errors.endDate?.message ? { date: errors.endDate.message } : undefined}
								/>
							)}
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
								placeholder="Enter trip description"
								value={value}
								onChange={onChange}
								error={errors.description?.message}
							/>
						)}
					/>
				</FormGroup>
			</FormContent>

			<ButtonContainer>
				<Button variant="primary" disabled={isSubmitting} onPress={handleSubmit(onSubmitForm)}>
					{isSubmitting ? 'Saving...' : initialData ? 'Update Trip' : 'Create Trip'}
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

const DateContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: ${spacing[4]}px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const ErrorMessage = styled.div`
	padding: ${spacing[3]};
	font-size: ${fontSizes.sm}px;
	color: ${colors.red[500]};
	background-color: ${colors.red[50]};
	border-radius: ${radius.lg};
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: ${spacing[4]}px;
`;
