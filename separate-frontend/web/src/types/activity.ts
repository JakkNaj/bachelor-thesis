export enum EActivityTypes {
	FLIGHT = "FLIGHT",
	TRANSPORT = "TRANSPORT",
	REMINDER = "REMINDER",
	ACCOMMODATION = "ACCOMMODATION",
	FOOD = "FOOD",
	OTHER = "OTHER",
}

export const ACTIVITY_TYPE_LABELS: Record<EActivityTypes, string> = {
	[EActivityTypes.FLIGHT]: "Flight",
	[EActivityTypes.TRANSPORT]: "Transport",
	[EActivityTypes.REMINDER]: "Reminder",
	[EActivityTypes.ACCOMMODATION]: "Accommodation",
	[EActivityTypes.FOOD]: "Food & Dining",
	[EActivityTypes.OTHER]: "Other",
};
