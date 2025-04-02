import { ActivityInputType } from "../api/generated/schemas";

export const ACTIVITY_TYPE_LABELS: Record<ActivityInputType, string> = {
	[ActivityInputType.FLIGHT]: "Flight",
	[ActivityInputType.TRANSPORT]: "Transport",
	[ActivityInputType.REMINDER]: "Reminder",
	[ActivityInputType.ACCOMMODATION]: "Accommodation",
	[ActivityInputType.FOOD]: "Food & Dining",
	[ActivityInputType.OTHER]: "Other",
};
