import { ScreenWrapper } from "@/pages/(app)/layout/ScreenWrapper";
import { TripDetail } from "@/pages/(app)/trips/[id]/[id]";

export const Trip = () => {
	return (
		<ScreenWrapper>
			<TripDetail />
		</ScreenWrapper>
	);
};

export default Trip;