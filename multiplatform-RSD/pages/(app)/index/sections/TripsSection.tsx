import { TripInput } from "@/api/generated/schemas"
import { useGetApiTrips } from "@/api/generated/trips/trips"
import PlusIcon from "@/assets/icons/PlusIcon/PlusIcon"
import { Button } from "@/components/Button"
import { TripFilters } from "@/components/TripFilters"
import { ETripFilter } from "@/types/ETripFilter"
import { useMemo, useState } from "react"
import { Platform } from "react-native"
import { css, html } from "react-strict-dom"
import { colors } from "@/assets/colors/colors"
import { TripsListSection } from "./TripsListSection"
import { FormModal } from "@/components/FormModal/FormModal"
import { useTripActions } from "@/hooks/useTripActions"
import { router } from "expo-router"
import { TripForm } from "@/components/TripForm"

export const TripsSection = () => {
    const [activeFilter, setActiveFilter] = useState<ETripFilter>(ETripFilter.ALL);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { data: trips, isLoading } = useGetApiTrips();
    const { createTrip, isCreating, createError } = useTripActions();

    const handleTripDetail = (id: number) => {
        router.navigate(`/trips/${id}`);
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmitTrip = async (data: TripInput) => {
        createTrip(data, () => {
            setIsModalVisible(false);
        });
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
                <html.h1 style={[styles.tripTitle, Platform.OS === 'web' && webStyles.tripsTitle()]}>Your Trips</html.h1>
                <Button 
                    title="Create a new trip"
                    onPress={handleOpenModal} 
                />
            </html.div>
            <TripFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <TripsListSection 
                isLoading={isLoading} 
                filteredTrips={filteredTrips} 
                handleTripDetail={handleTripDetail} 
            />
            
            <FormModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                title="Create New Trip"
                children={
                    <TripForm 
                        onSubmit={handleSubmitTrip}
                        isSubmitting={isCreating}
                        submitError={createError as Error | null}
                    />
                }
            />
            
        </html.div>
    );
};

export default TripsSection;

const styles = css.create({
    sectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginTop: '1rem',
    },
    tripContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        flexShrink: 0,
    },
    tripTitle: {
        fontSize: '1.8rem',
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
    },
    tripContainer: {
        width: '100%',
        maxWidth: '980px',
        marginBottom: 0,
    },
    tripsListContainer: {
        width: '100%',
        maxWidth: '980px',
    },
    tripsTitle: () => ({
        fontSize: '40px',
        fontWeight: '700',
        color: colors.slate[900],
        marginBottom: 0,
        paddingBottom: 0,
    }),
});