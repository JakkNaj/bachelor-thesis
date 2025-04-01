import { View, Text, ScrollView } from "react-native";
import { TripInput } from "@/api/generated/schemas";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { DateTimePicker } from "@/components/DateTimePicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TTripFormData, tripFormSchema, transformFormDataToTripInput } from "@/types/tripFormSchema";
import { formatDateForInput } from "@/lib/utils/dateUtils";

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
			title: initialData?.title ?? "",
			description: initialData?.description ?? "",
			startDate: initialData?.startDate ? formatDateForInput(initialData.startDate) : "",
			endDate: initialData?.endDate ? formatDateForInput(initialData.endDate) : "",
		},
	});

	const getErrorMessage = (error: unknown) => {
		if (!error) return null;

		if (typeof error === "object" && error !== null) {
			const apiError = error as { response?: { data?: { message: string; invalidActivities?: Array<{ title: string }> } } };

			if (apiError.response?.data) {
				const { message, invalidActivities } = apiError.response.data;

				if (invalidActivities?.length) {
					const activities = invalidActivities.map((a) => a.title).join(", ");
					return `${message}. Affected activities: ${activities}`;
				}

				return message;
			}
		}

		return error instanceof Error ? error.message : "An unexpected error occurred";
	};

	const onFormSubmit = (data: TTripFormData) => {
		onSubmit(transformFormDataToTripInput(data));
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
						<Text className="text-lg font-medium text-slate-700 mb-1">Trip Title*</Text>
						<Controller
							control={control}
							name="title"
							render={({ field: { onChange, value } }) => (
								<Input placeholder="Enter trip title" value={value} onChangeText={onChange} error={errors.title?.message} />
							)}
						/>
					</View>

					<View className="flex flex-col gap-4">
						<View>
							<Text className="text-lg font-medium text-slate-700 mb-1">Start Date and Time*</Text>
							<Controller
								control={control}
								name="startDate"
								render={({ field: { onChange, value } }) => {
									const [date, time] = value ? value.split("T") : ["", ""];
									return (
										<DateTimePicker
											date={date}
											time={time}
											onDateChange={(newDate) => onChange(`${newDate}T${time || "00:00"}`)}
											onTimeChange={(newTime) => onChange(`${date}T${newTime}`)}
											error={{
												date: errors.startDate?.message,
												time: errors.startDate?.message,
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
							<Text className="text-lg font-medium text-slate-700 mb-1">End Date and Time*</Text>
							<Controller
								control={control}
								name="endDate"
								render={({ field: { onChange, value } }) => {
									const [date, time] = value ? value.split("T") : ["", ""];
									return (
										<DateTimePicker
											date={date}
											time={time}
											onDateChange={(newDate) => onChange(`${newDate}T${time || "00:00"}`)}
											onTimeChange={(newTime) => onChange(`${date}T${newTime}`)}
											error={{
												date: errors.endDate?.message,
												time: errors.endDate?.message,
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
									placeholder="Enter trip description"
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
						{isSubmitting ? "Saving..." : initialData ? "Update Trip" : "Create Trip"}
					</Button>
				</View>
			</View>
		</ScrollView>
	);
};
