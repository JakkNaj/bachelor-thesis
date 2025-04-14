import { css, html } from "react-strict-dom"
import { DetailHeaderSection } from "./sections/DetailHeaderSection"
import { useLocalSearchParams } from "expo-router";
import { useGetApiTripsId } from "@/api/generated/trips/trips";
import { Platform } from "react-native";
import { TripActivitiesSection } from "./sections/TripActivitiesSection";

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
        <html.div style={Platform.OS === 'web' ? webStyles.outerWrapper : defaultStyles.outerWrapper}>
            <html.div style={Platform.OS === 'web' ? webStyles.innerWrapper : defaultStyles.innerWrapper}>
                <DetailHeaderSection trip={trip} />
                <TripActivitiesSection tripId={trip.id} tripDates={{ startDate: trip.startDate, endDate: trip.endDate }} activities={trip.activities || []} />
            </html.div>
        </html.div>
    )
}

const webStyles = css.create({
    outerWrapper: {
        minHeight: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    innerWrapper: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "1536px",
        width: "100%",
        alignSelf: "center",
    }
});

const defaultStyles = css.create({
    outerWrapper: {
        minHeight: "100vh",
        backgroundColor: "white",
    },
    innerWrapper: {
        maxWidth: "1536px",
        padding: "1rem",
        gap: "1rem",
    },
});