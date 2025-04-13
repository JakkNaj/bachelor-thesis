import { Trip } from "@/api/generated/schemas"
import { useGetApiTrips } from "@/api/generated/trips/trips"
import PlusIcon from "@/assets/icons/PlusIcon/PlusIcon"
import { Button } from "@/components/Button"
import { TripFilters } from "@/components/TripFilters"
import { ETripFilter } from "@/types/ETripFilter"
import { useMemo, useState } from "react"
import { Platform } from "react-native"
import { css, html } from "react-strict-dom"
import { TripCard } from "@/components/TripCard"
import { colors } from "@/assets/colors/colors"
import { TripsListSection } from "./TripsListSection"

export const TripsSection = () => {
    const [activeFilter, setActiveFilter] = useState<ETripFilter>(ETripFilter.ALL);
    const { data: trips, isLoading } = useGetApiTrips();

    const handleTripDetail = (id: number) => {
        // Handle trip detail navigation
    };

    const filteredTrips = useMemo(() => {
        if (!trips) return [];
        
        switch (activeFilter) {
            case ETripFilter.UPCOMING:
                return trips.filter(trip => new Date(trip.startDate) > new Date());
            case ETripFilter.PAST:
                return trips.filter(trip => new Date(trip.endDate) < new Date());
            default:
                return trips;
        }
    }, [trips, activeFilter]);

    return (
        <html.div style={[styles.sectionContainer, Platform.OS === 'web' && webStyles.sectionContainer]}>
            <html.div style={[styles.tripContainer, Platform.OS === 'web' && webStyles.tripContainer]}>
                {Platform.OS === 'web' && <html.div></html.div>}
                <html.h2 style={styles.tripTitle}>Your Trips</html.h2>
                <Button 
                    title="Create a new trip"
                    onPress={() => {}} 
                    icon={<PlusIcon color="white" size={20}/>}
                />
            </html.div>
            <TripFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <TripsListSection 
                isLoading={isLoading} 
                filteredTrips={filteredTrips} 
                handleTripDetail={handleTripDetail} 
            />
        </html.div>
    );
};

const styles = css.create({
    sectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    tripContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
    },
    tripTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
    },
    tripsListContainer: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    tripsList: {
        display: 'flex',
        flexDirection: 'column',
    },
    tripsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    },
    loadingText: () => ({
        fontSize: '1rem',
        color: colors.slate[500],
    }),
    emptyContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
    },
    emptyContainerButton: {
        alignSelf: 'center',
    },
    emptyTitle: () => ({
        fontSize: '1.25rem',
        fontWeight: '600',
        color: colors.slate[900],
        margin: '0',
    }),
    emptySubtitle: () => ({
        fontSize: '1rem',
        color: colors.slate[500],
        textAlign: 'center',
        margin: '0',
    }),
});

const webStyles = css.create({
    sectionContainer: {
        alignItems: 'center',
        padding: '1rem',
    },
    tripContainer: {
        width: '100%',
        maxWidth: '980px',
    },
    tripsListContainer: {
        width: '100%',
        maxWidth: '980px',
    },
});