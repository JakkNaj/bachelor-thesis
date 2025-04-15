import { css, html } from "react-strict-dom"
import { DetailHeaderSection } from "./sections/DetailHeaderSection"
import { useLocalSearchParams } from "expo-router";
import { useGetApiTripsId } from "@/api/generated/trips/trips";
import { TripActivitiesSection } from "./sections/TripActivitiesSection";
import { Platform } from "react-native";

export const TripDetail = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { data: trip, isLoading } = useGetApiTripsId(parseInt(id));

    if (isLoading) {
        return <html.div>Loading...</html.div>;
    }

    if (!trip) {
        return <html.div>Trip not found</html.div>;
    }

    return (
        <html.div style={Platform.OS === 'web' ? webStyles.container : {}}>
            <DetailHeaderSection trip={trip} />
            <TripActivitiesSection tripId={trip.id} tripDates={{ startDate: trip.startDate, endDate: trip.endDate }} activities={trip.activities || []} />
        </html.div>
    )
}

export default TripDetail;

const webStyles = css.create({
    container: {
        padding: "1rem",
    }
})
