import { View, Text, ScrollView } from "react-native";
import { ActivityInput, ActivityInputType } from "@/api/generated/schemas";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { DateTimePicker } from "@/components/DateTimePicker";
import { Select } from "@/components/Select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createActivitySchema, TActivityFormData, transformFormDataToActivityInput } from "@/types/activityFormSchema";
import { formatDateForInput, formatTime, formatDate } from "@/lib/utils/dateUtils";

type TActivityFormProps = {
	initialData?: ActivityInput;
	onSubmit: (data: ActivityInput) => void;
	isSubmitting: boolean;
	submitError?: Error | null;
	tripStartDate: string;
	tripEndDate: string;
};

const activityTypeOptions = [
	{ label: "Transport", value: ActivityInputType.TRANSPORT },
	{ label: "Flight", value: ActivityInputType.FLIGHT },
	{ label: "Accommodation", value: ActivityInputType.ACCOMMODATION },
	{ label: "Food", value: ActivityInputType.FOOD },
	{ label: "Reminder", value: ActivityInputType.REMINDER },
	{ label: "Other", value: ActivityInputType.OTHER },
];

export const ActivityForm = ({ initialData, onSubmit, isSubmitting, submitError, tripStartDate, tripEndDate }: TActivityFormProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TActivityFormData>({
		resolver: yupResolver(createActivitySchema(tripStartDate, tripEndDate)),
		defaultValues: {
			title: initialData?.title ?? "",
			description: initialData?.description ?? "",
			startTime: initialData?.startTime ? formatDateForInput(initialData.startTime) : "",
			endTime: initialData?.endTime ? formatDateForInput(initialData.endTime) : "",
			type: initialData?.type ?? ActivityInputType.OTHER,
		},
		context: {
			tripStartDate,
			tripEndDate,
		},
	});

	const getErrorMessage = (error: unknown) => {
		if (!error) return null;

		if (typeof error === "object" && error !== null) {
			const apiError = error as { response?: { data?: { message: string } } };

			if (apiError.response?.data?.message) {
				return apiError.response.data.message;
			}
		}

		return error instanceof Error ? error.message : "An unexpected error occurred";
	};

	const onFormSubmit = (data: TActivityFormData) => {
		onSubmit(transformFormDataToActivityInput(data));
	};

	return (
		<ScrollView>
			<View className="flex flex-col gap-6">
				{submitError && (
					<View className="p-3 bg-red-50 rounded-lg">
						<Text className="text-lg text-red-500">{getErrorMessage(submitError)}</Text>
					</View>
				)}

				<View className="flex flex-col gap-4">
					<View>
						<Text className="text-lg font-medium text-slate-700 mb-1">Activity Title*</Text>
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

					<View>
						<Text className="text-lg font-medium text-slate-700 mb-1">Activity Type*</Text>
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
								/>
							)}
						/>
					</View>

					<View className="flex flex-col gap-4">
						<View>
							<Text className="text-base text-slate-600 mb-1">
								Trip start: {formatTime(tripStartDate)} {formatDate(tripStartDate)}
							</Text>
							<Text className="text-lg font-medium text-slate-700 mb-1">Start Date and Time*</Text>
							<Controller
								control={control}
								name="startTime"
								render={({ field: { onChange, value } }) => {
									const [date, time] = value ? value.split("T") : ["", ""];
									return (
										<DateTimePicker
											date={date}
											time={time}
											onDateChange={(newDate) => {
												const currentTime = time || "00:00";
												onChange(`${newDate}T${currentTime}`);
											}}
											onTimeChange={(newTime) => {
												const currentDate = date || new Date().toISOString().split("T")[0];
												onChange(`${currentDate}T${newTime}`);
											}}
											error={{
												date: errors.startTime?.message,
												time: errors.startTime?.message,
											}}
											placeholder={{
												date: "Start date",
												time: "Start time",
											}}
										/>
									);
								}}
							/>
						</View>

						<View>
							<Text className="text-base text-slate-600 mb-1">
								Trip end: {formatTime(tripEndDate)} {formatDate(tripEndDate)}
							</Text>
							<Text className="text-lg font-medium text-slate-700 mb-1">End Date and Time*</Text>
							<Controller
								control={control}
								name="endTime"
								render={({ field: { onChange, value } }) => {
									const [date, time] = value ? value.split("T") : ["", ""];
									return (
										<DateTimePicker
											date={date}
											time={time}
											onDateChange={(newDate) => onChange(`${newDate}T${time || "00:00"}`)}
											onTimeChange={(newTime) => onChange(`${date}T${newTime}`)}
											error={{
												date: errors.endTime?.message,
												time: errors.endTime?.message,
											}}
											placeholder={{
												date: "End date",
												time: "End time",
											}}
										/>
									);
								}}
							/>
						</View>
					</View>

					<View>
						<Text className="text-lg font-medium text-slate-700 mb-1">Description</Text>
						<Controller
							control={control}
							name="description"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Enter activity description"
									value={value ?? ""}
									onChangeText={onChange}
									multiline
									numberOfLines={2}
								/>
							)}
						/>
					</View>
				</View>

				<View className="flex-row justify-end">
					<Button onPress={handleSubmit(onFormSubmit)} variant="primary" fullWidth disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : initialData ? "Update Activity" : "Create Activity"}
					</Button>
				</View>
			</View>
		</ScrollView>
	);
};
