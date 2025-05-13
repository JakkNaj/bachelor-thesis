import { Activity } from "../api/generated/schemas";
import { formatDateTimeForActivityCard } from "../utils/dateUtils";
import { Button } from "./Button";
import { useState } from "react";
import { SidePanel } from "./SidePanel";
import { ActivityForm } from "./ActivityForm";
import { CrossIcon } from "../assets/icons/CrossIcon";
import { TActivityFormData } from "../types/activityFormSchema";
import { useActivityActions } from "../hooks/useActivityActions";

type TActivityStepperProps = {
	activities: Activity[];
	onActivityUpdated: () => void;
	tripDates: {
		startDate: string;
		endDate: string;
	};
	tripId: number;
};

export const ActivityStepper = ({ activities, onActivityUpdated, tripDates, tripId }: TActivityStepperProps) => {
	const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
	const [deletingActivityId, setDeletingActivityId] = useState<number | undefined>(undefined);

	const { updateActivity, isUpdating, updateError } = useActivityActions({
		tripId,
		activityId: editingActivity?.id,
	});

	const { deleteActivity, isDeleting } = useActivityActions({
		tripId,
	});

	const handleDelete = (activity: Activity) => {
		if (confirm("Are you sure you want to delete this activity? This action cannot be undone.")) {
			setDeletingActivityId(activity.id);

			deleteActivity(activity.id, () => {
				setDeletingActivityId(undefined);
				onActivityUpdated();
			});
		}
	};

	const handleUpdateActivity = (data: TActivityFormData) => {
		updateActivity(data, () => {
			setEditingActivity(null);
			onActivityUpdated();
		});
	};

	const sortedActivities = activities.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

	return (
		<div className="relative">
			<div className="relative">
				{sortedActivities.map((activity, index) => (
					<div
						key={activity.id}
						className={`
							flex gap-4 relative
							${index !== sortedActivities.length - 1 ? "pb-8" : ""}
							${index !== 0 ? "pt-0" : ""}
							before:absolute before:left-4 before:top-[32px] before:bottom-0 
							before:w-0.5 before:bg-slate-300
							after:absolute after:left-4 after:top-0 after:h-[24px]
							after:w-0.5 after:bg-slate-300
							first:after:hidden last:before:hidden
						`}
					>
						<div className="relative z-10">
							<div className="flex h-8 w-8 items-center justify-center rounded-full text-[#090909] mt-2 border border-slate-300 bg-white">
								{index + 1}
							</div>
						</div>

						<div className="flex-1 rounded-lg border border-slate-200 p-4">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-semibold text-lg leading-tight">{activity.title}</h3>
									<p className="text-slate-600 text-sm mt-1">
										{formatDateTimeForActivityCard(activity.startTime, activity.endTime)}
									</p>
									{activity.description && <p className="text-slate-700 mt-2">{activity.description}</p>}
								</div>
								<div className="flex flex-row gap-1">
									<Button variant="secondary" onClick={() => setEditingActivity(activity)}>
										Edit
									</Button>
									<Button
										variant="danger"
										onClick={() => handleDelete(activity)}
										disabled={isDeleting && deletingActivityId === activity.id}
										className="p-2 text-red-600 hover:text-red-700 disabled:opacity-50"
									>
										<CrossIcon className="w-5 h-5" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<SidePanel isOpen={!!editingActivity} onClose={() => setEditingActivity(null)}>
				{editingActivity && (
					<ActivityForm
						initialData={editingActivity as TActivityFormData}
						onSubmit={handleUpdateActivity}
						isSubmitting={isUpdating}
						submitError={updateError as Error}
						tripStartDate={tripDates.startDate}
						tripEndDate={tripDates.endDate}
					/>
				)}
			</SidePanel>
		</div>
	);
};
