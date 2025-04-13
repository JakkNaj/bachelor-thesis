import * as yup from "yup";
import { TripInput } from "../api/generated/schemas";

export type TTripFormData = {
	title: string;
	description?: string;
	startDate: string; // ISO string format: "YYYY-MM-DDTHH:mm"
	endDate: string; // ISO string format: "YYYY-MM-DDTHH:mm"
};

const isValidDateTime = (value: string | undefined): boolean => {
	if (!value) return false;
	const [date, time] = value.split("T");
	return Boolean(date && time && !isNaN(new Date(value).getTime()));
};

export const tripFormSchema = yup.object({
	title: yup.string().required("Title is required"),
	description: yup.string(),
	startDate: yup
		.string()
		.required("Start date and time are required")
		.test("is-valid-datetime", "Invalid date and time format", isValidDateTime),
	endDate: yup
		.string()
		.required("End date and time are required")
		.test("is-valid-datetime", "Invalid date and time format", isValidDateTime)
		.test("is-after-start-date", "End date and time must be after start date and time", function (endDate) {
			const { startDate } = this.parent;
			if (!startDate || !endDate || !isValidDateTime(startDate) || !isValidDateTime(endDate)) return true;
			return new Date(endDate) > new Date(startDate);
		}),
}) as yup.ObjectSchema<TTripFormData>;

export const transformFormDataToTripInput = (data: TTripFormData): TripInput => ({
	title: data.title,
	description: data.description,
	startDate: data.startDate,
	endDate: data.endDate,
});
