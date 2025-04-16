import { useGetApiTrips } from "@/api/generated/trips/trips"
import PlusIcon from "@/assets/icons/PlusIcon"
import { Button } from "@/components/Button"
import { TripFilters } from "@/components/TripFilters"
import { ETripFilter } from "@/types/ETripFilter"
import { useMemo, useState } from "react"
import { Platform, View, Text, StyleSheet } from "react-native"
import { colors } from "@/assets/colors/colors"
import { TripListSection } from "./TripListSection"
import { router } from "expo-router"
import { useWindowDimensions } from "@/hooks/useWindowDimensions"

type TTripsSection = {
    onCreateTripClick: () => void;
};

export const TripsSection = ({ onCreateTripClick }: TTripsSection) => {
    const [activeFilter, setActiveFilter] = useState<ETripFilter>(ETripFilter.ALL);
    const { data: trips, isLoading } = useGetApiTrips();
    const { width } = useWindowDimensions();
    
    const isMobileView = width < 768;

    const handleTripDetail = (id: number) => {
        router.navigate(`/trips/${id}`);
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
        <View style={[styles.sectionContainer, Platform.OS === 'web' && styles.sectionContainerWeb]}>
            <View style={[
                styles.tripContainer, 
                Platform.OS === 'web' && styles.tripContainerWeb,
                Platform.OS === 'web' && isMobileView && styles.tripContainerMobileWeb
            ]}>
                {Platform.OS === 'web' ? (
                    <>
                        {!isMobileView && <View style={styles.buttonSpacerWeb} />}
                        <Text style={[
                            styles.tripTitle, 
                            styles.tripTitleWeb,
                            isMobileView && styles.tripTitleMobileWeb
                        ]}>
                            Your Trips
                        </Text>
                        <Button 
                            title="Create a new trip"
                            onPress={onCreateTripClick} 
                        />
                    </>
                ) : (
                    <>
                        <Text style={styles.tripTitle}>
                            Your Trips
                        </Text>
                        <Button 
                            title="Create a new trip"
                            onPress={onCreateTripClick} 
                            icon={<PlusIcon color="white" size={20}/>}
                        />
                    </>
                )}
            </View>
            <TripFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <TripListSection 
                isLoading={isLoading} 
                filteredTrips={filteredTrips} 
                handleTripDetail={handleTripDetail}
                onCreateTripClick={onCreateTripClick}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // Base styles for both platforms
    sectionContainer: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 8,
    },
    tripContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        flexShrink: 0,
    },
    tripTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.slate[900],
        minWidth: '50%',
    },

    // Web-specific styles
    sectionContainerWeb: {
        alignItems: 'center',
    },
    tripContainerWeb: {
        width: '100%',
        maxWidth: 980,
        marginBottom: 0,
        position: 'relative',
    },
    buttonSpacerWeb: {
        width: 155, // Approximate width of the button to maintain center alignment
    },
    tripTitleWeb: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        flex: 1,
    },

    // Modified and new web-specific styles
    tripContainerMobileWeb: {
        justifyContent: 'space-between',
    },
    tripTitleMobileWeb: {
        textAlign: 'left',
        flex: 0,
        fontSize: 28,
        fontWeight: '600',
    }
});