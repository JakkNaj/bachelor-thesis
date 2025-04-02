import * as yup from "yup";
import { TripInput } from "../api/generated/schemas";

export type TTripFormData = {
	title: string;
	description?: string;
	startDate: string;
	endDate: string;
};

export const tripFormSchema = yup.object({
	title: yup.string().required("Title is required"),
	description: yup.string(),
	startDate: yup.string().required("Start date is required"),
	endDate: yup
		.string()
		.required("End date is required")
		.test("is-after-start-date", "End date must be after start date", function (endDate) {
			const { startDate } = this.parent;
			if (!startDate || !endDate) return true;
			return new Date(endDate) >= new Date(startDate);
		}),
}) as yup.ObjectSchema<TTripFormData>;

export const transformFormDataToTripInput = (data: TTripFormData): TripInput => ({
	title: data.title,
	description: data.description,
	startDate: data.startDate,
	endDate: data.endDate,
});
