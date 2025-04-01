import * as yup from "yup";
import { ActivityInput, ActivityInputType } from "@/api/generated/schemas";

export type TActivityFormData = {
	title: string;
	description?: string;
	startTime: string;
	endTime?: string;
	type: ActivityInputType;
};

export const createActivitySchema = (tripStartDate: string, tripEndDate: string) => {
	return yup.object({
		title: yup.string().required("Title is required"),
		description: yup.string(),
		startTime: yup
			.string()
			.required("Start time is required")
			.test("is-within-trip-dates", "Activity must be within trip dates", (value) => {
				if (!value) return false;
				const activityStart = new Date(value).getTime();
				const tripStart = new Date(tripStartDate).getTime();
				const tripEnd = new Date(tripEndDate).getTime();
				return activityStart >= tripStart && activityStart <= tripEnd;
			}),
		endTime: yup
			.string()
			.test("is-after-start", "End time must be after start time", function (value) {
				if (!value) return true;
				const startTime = this.parent.startTime;
				if (!startTime) return true;

				const startDate = new Date(startTime).getTime();
				const endDate = new Date(value).getTime();

				return endDate > startDate;
			})
			.test("is-within-trip-dates", "Activity must end within trip dates", function (value) {
				if (!value) return true;
				const activityEnd = new Date(value).getTime();
				const tripEnd = new Date(tripEndDate).getTime();
				return activityEnd <= tripEnd;
			}),
		type: yup.string().required("Activity type is required"),
	}) as yup.ObjectSchema<TActivityFormData>;
};

export const transformFormDataToActivityInput = (data: TActivityFormData): ActivityInput => {
	return {
		title: data.title,
		description: data.description,
		startTime: data.startTime,
		endTime: data.endTime,
		type: data.type,
	};
};
