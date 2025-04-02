import { useState } from "react";
import { Activity, ActivityInput } from "../api/generated/schemas";
import { Button } from "./Button";
import { PlusIcon } from "../assets/icons/PlusIcon";
import { SidePanel } from "./SidePanel";
import { ActivityForm } from "./ActivityForm";
import { ActivityStepper } from "./ActivityStepper";
import { useActivityActions } from "../hooks/useActivityActions";

type TTripActivitiesProps = {
	tripId: number;
	activities: Activity[];
	tripStartDate: string;
	tripEndDate: string;
	onActivityAdded: () => void;
	onActivityUpdated: () => void;
};

export const TripActivities = ({
	tripId,
	activities,
	tripStartDate,
	tripEndDate,
	onActivityAdded,
	onActivityUpdated,
}: TTripActivitiesProps) => {
	const [isAddingActivity, setIsAddingActivity] = useState(false);
	const { createActivity, isCreating, createError } = useActivityActions({ tripId });

	const handleSubmit = (data: ActivityInput) => {
		createActivity(data, () => {
			setIsAddingActivity(false);
			onActivityAdded();
		});
	};

	return (
		<>
			<section className="mx-auto flex max-w-[1536px] flex-col justify-center items-center gap-[4px] pb-[10px] pt-[16px]">
				<div className="flex justify-between items-center w-full">
					<h2 className="text-2xl font-bold leading-tight tracking-tighter">Activities</h2>
					<Button variant="primary" icon={<PlusIcon className="w-4 h-4" />} onClick={() => setIsAddingActivity(true)}>
						Add Activity
					</Button>
				</div>
			</section>

			<section className="container py-2">
				<div className="mx-auto max-w-[980px]">
					{activities && activities.length > 0 ? (
						<ActivityStepper
							activities={activities}
							onActivityUpdated={onActivityUpdated}
							tripDates={{ startDate: tripStartDate, endDate: tripEndDate }}
							tripId={tripId}
						/>
					) : (
						<div className="text-center py-8 flex flex-col items-center gap-1">
							<p className="text-[rgb(9,9,11)] text-[18px] leading-[28px] font-[300]">No activities planned yet.</p>
							<p className="text-[rgb(9,9,11)] text-[18px] leading-[28px] font-[300] mt-2">
								Start by adding your first activity to this trip.
							</p>
							<Button variant="primary" className="mt-4" onClick={() => setIsAddingActivity(true)}>
								Add First Activity
							</Button>
						</div>
					)}
				</div>
			</section>

			<SidePanel isOpen={isAddingActivity} onClose={() => setIsAddingActivity(false)}>
				<h2 className="text-2xl font-bold mb-6">Add New Activity</h2>
				<ActivityForm
					onSubmit={handleSubmit}
					isSubmitting={isCreating}
					submitError={createError as Error}
					tripStartDate={tripStartDate}
					tripEndDate={tripEndDate}
				/>
			</SidePanel>
		</>
	);
};
