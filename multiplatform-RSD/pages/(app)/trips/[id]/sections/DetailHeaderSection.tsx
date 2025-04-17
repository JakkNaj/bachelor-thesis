import { Trip, TripInput } from "@/api/generated/schemas";
import { html, css } from "react-strict-dom";
import { formatDateRange } from "@/lib/utils/dateUtils";
import { colors } from "@/assets/colors/colors";
import { TripContextMenu } from "@/components/TripContextMenu/TripContextMenu";
import { useState } from "react";
import { FormModal } from "@/components/FormModal/FormModal";
import { TripForm } from "@/components/TripForm";
import { useTripActions } from "@/hooks/useTripActions";
import { Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { BackIcon } from "@/assets/icons/BackIcon/BackIcon";

type TDetailHeaderSectionProps = {
    trip: Trip;
};

export const DetailHeaderSection = ({ 
    trip,
}: TDetailHeaderSectionProps) => {
    const router = useRouter();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const { updateTrip, deleteTrip, isUpdating, isDeleting, updateError } = useTripActions({ tripId: trip.id });

    const handleEdit = () => {
        setIsEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalVisible(false);
    };

    const handleUpdateTrip = (data: TripInput) => {
        updateTrip(data, () => {
            handleCloseEditModal();
        });
    };

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
        <html.div style={styles.tripDetails()}>
            {Platform.OS === 'web' ? (
                <>
                    <html.div style={styles.topBar}>
                        <html.div style={styles.backContainer} onClick={() => router.navigate("/")}>
                            <BackIcon color={colors.slate[600]} />
                            <html.span style={styles.backText()}>Back to home</html.span>
                        </html.div>
                        <TripContextMenu 
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
                    </html.div>
                    <html.div style={styles.contentContainer}>
                        <html.h1 style={styles.title()}>{trip.title}</html.h1>
                        <html.p style={styles.dateText()}>
                            {formatDateRange(trip.startDate, trip.endDate)}
                        </html.p>
                        {trip.description && (
                            <html.p style={styles.description()}>{trip.description}</html.p>
                        )}
                    </html.div>
                </>
            ) : (
                <html.div style={styles.mobileContainer}>
                    <html.div style={styles.contentContainer}>
                        <html.h1 style={styles.title()}>{trip.title}</html.h1>
                        <html.p style={styles.dateText()}>
                            {formatDateRange(trip.startDate, trip.endDate)}
                        </html.p>
                        {trip.description && (
                            <html.p style={styles.description()}>{trip.description}</html.p>
                        )}
                    </html.div>
                    <html.div style={styles.mobileMenuContainer}>
                        <TripContextMenu 
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            isDeleting={isDeleting}
                        />
                    </html.div>
                </html.div>
            )}
            <FormModal
                isVisible={isEditModalVisible}
                onClose={handleCloseEditModal}
                title="Edit Trip"
            >
                <TripForm
                    initialData={trip}
                    onSubmit={handleUpdateTrip}
                    isSubmitting={isUpdating}
                    submitError={updateError as Error | null}
                />
            </FormModal>
        </html.div>
    );
};

const styles = css.create({
    tripDetails: () => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        paddingBottom: '1rem',
        borderBottomWidth: '1px',
        borderBottomColor: colors.slate[200],
        borderBottomStyle: 'solid',
    }),
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    mobileContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    mobileMenuContainer: {
        paddingTop: '0.25rem',
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1,
    },
    title: () => ({
        fontSize: '2rem',
        fontWeight: 700,
        color: colors.slate[900],
        margin: 0,
    }),
    dateText: () => ({
        fontSize: '1.125rem',
        color: colors.slate[600],
        marginBottom: 0,
    }),
    description: () => ({
        fontSize: '0.9375rem',
        fontWeight: 200,
        color: colors.slate[600],
    }),
    backContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
    },
    backText: () => ({
        fontSize: '1rem',
        color: colors.slate[600],
        margin: 0,
    }),
});