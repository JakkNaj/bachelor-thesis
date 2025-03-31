export const formatDate = (date: string) => {
	try {
		return new Date(date).toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	} catch (error) {
		return "Invalid date";
	}
};

export const formatTime = (time: string) => {
	return new Date(time).toLocaleString("en-GB", {
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	});
};

export const formatDateForInput = (date: string) => {
	const d = new Date(date);
	const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
	return localDate.toISOString().slice(0, 16);
};

export const formatDateTimeForActivityCard = (startTime: string, endTime?: string) => {
	if (!endTime) {
		return `${formatTime(startTime)} ${formatDate(startTime)}`;
	}

	const isSameDay = new Date(startTime).toDateString() === new Date(endTime).toDateString();

	if (isSameDay) {
		return `${formatTime(startTime)} - ${formatTime(endTime)} ${formatDate(startTime)}`;
	}

	return `${formatTime(startTime)} ${formatDate(startTime)} - ${formatTime(endTime)} ${formatDate(endTime)}`;
};

export const formatDateRange = (startDate: string, endDate: string) => {
	try {
		const start = formatDate(startDate);
		const end = formatDate(endDate);
		return `${start} - ${end}`;
	} catch (error) {
		return "Invalid date range";
	}
};
