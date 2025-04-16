import { Trip, TripInput } from "@/api/generated/schemas";
import { formatDateRange } from "@/lib/utils/dateUtils";
import { colors } from "@/assets/colors/colors";
import { TripContextMenu } from "@/components/TripContextMenu/TripContextMenu";
import { useTripActions } from "@/hooks/useTripActions";
import { Alert, Platform, View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { BackIcon } from "@/assets/icons/BackIcon";

type TDetailHeaderSectionProps = {
    trip: Trip;
    onEditClick: () => void;
};

export const DetailHeaderSection = ({ 
    trip,
    onEditClick,
}: TDetailHeaderSectionProps) => {
    const router = useRouter();
    const { deleteTrip, isDeleting } = useTripActions({ tripId: trip.id });

    const handleDelete = () => {
        if (Platform.OS === 'web') {
            if (window.confirm("Are you sure you want to delete this trip and all of its activities? This action cannot be undone.")) {
                deleteTrip(() => {
                    router.navigate("/");
                });
            }
        } else {
            Alert.alert(
                "Delete Trip",
                "Are you sure you want to delete this trip and all of its activities? This action cannot be undone.",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: () => {
                            deleteTrip(() => {
                                router.navigate("/");
                            });
                        },
                        style: "destructive"
                    }
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.navigationRow}>
                {Platform.OS === 'web' &&
                    <Pressable 
                        style={[styles.backContainer, styles.backContainerWeb]} 
                        onPress={() => router.navigate("/")}
                    >
                        <BackIcon color={colors.slate[600]}/>
                        <Text style={styles.backText}>Back to Home</Text>
                    </Pressable>
                }
                {Platform.OS === 'web' && (
                    <TripContextMenu 
                        onEdit={onEditClick}
                        onDelete={handleDelete}
                        isDeleting={isDeleting}
                    />
                )}
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.tripDetails}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{trip.title}</Text>
                        <Text style={styles.dateText}>
                            {formatDateRange(trip.startDate, trip.endDate)}
                        </Text>
                        {trip.description && (
                            <Text style={styles.description}>{trip.description}</Text>
                        )}
                    </View>
                </View>
                {Platform.OS !== 'web' && (
                    <View style={styles.mobileContextMenu}>
                        <TripContextMenu 
                            onEdit={onEditClick}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        borderBottomWidth: 2,
        borderBottomColor: colors.slate[200],
        borderStyle: 'dotted',
    },
    navigationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        paddingBottom: Platform.OS === 'web' ? 8 : 0,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    tripDetails: {
        flexDirection: 'column',
        gap: 8,
        zIndex: 0,
        flex: 1,
    },
    titleContainer: {
        gap: 8,
        paddingVertical: Platform.OS === 'web' ? 20 : 0,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.slate[900],
    },
    dateText: {
        fontSize: 18,
        fontWeight: '300',
        color: colors.slate[600],
    },
    description: {
        fontSize: 15,
        fontWeight: '200',
        color: colors.slate[600],
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    backContainerWeb: {
        cursor: 'pointer',
    },
    backText: {
        fontSize: 16,
        color: colors.slate[600],
    },
    mobileContextMenu: {
        marginTop: 20,
        height: "100%",
        alignSelf: 'flex-end',
    },
});