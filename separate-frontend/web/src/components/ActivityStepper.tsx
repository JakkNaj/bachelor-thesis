import { Activity } from "../api/generated/schemas";
import { formatDateTimeForActivityCard } from "../utils/dateUtils";
import { Button } from "./Button";
import { useState } from "react";
import { SidePanel } from "./SidePanel";
import { ActivityForm } from "./ActivityForm";
import { usePutApiActivitiesId, useDeleteApiActivitiesId } from "../api/generated/activities/activities";
import { CrossIcon } from "../assets/icons/CrossIcon";
import { TActivityFormData } from "../types/activityFormSchema";

type TActivityStepperProps = {
	activities: Activity[];
	onActivityUpdated: () => void;
	tripDates: {
		startDate: string;
		endDate: string;
	};
};

export const ActivityStepper = ({ activities, onActivityUpdated, tripDates }: TActivityStepperProps) => {
	const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

	const {
		mutate: updateActivity,
		isPending: isUpdating,
		error: updateError,
	} = usePutApiActivitiesId({
		mutation: {
			onSuccess: () => {
				setEditingActivity(null);
				onActivityUpdated();
			},
		},
	});

	const { mutate: deleteActivity, isPending: isDeleting } = useDeleteApiActivitiesId({
		mutation: {
			onSuccess: () => {
				onActivityUpdated();
			},
		},
	});

	const handleDelete = (activity: Activity) => {
		if (confirm("Are you sure you want to delete this activity? This action cannot be undone.")) {
			deleteActivity({ id: activity.id });
		}
	};

	const sortedActivities = activities.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

	return (
		<div className="relative">
			{/* Activities list */}
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
						{/* Number circle */}
						<div className="relative z-10">
							<div className="flex h-8 w-8 items-center justify-center rounded-full text-[#090909] mt-2 border border-slate-300 bg-white">
								{index + 1}
							</div>
						</div>

						{/* Activity content */}
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
										disabled={isDeleting}
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
						onSubmit={(data) => updateActivity({ id: editingActivity.id, data })}
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
