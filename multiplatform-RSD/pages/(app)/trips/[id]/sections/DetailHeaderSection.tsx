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
        <html.div style={styles.tripDetails}>
            <html.div style={styles.header}>
                <html.div style={styles.titleContainer}>
                    <html.h1 style={styles.title()}>{trip.title}</html.h1>
                    <html.p style={styles.dateText()}>
                        {formatDateRange(trip.startDate, trip.endDate)}
                    </html.p>
                </html.div>
                <TripContextMenu 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                />
            </html.div>
            {trip.description && (
                <html.p style={styles.description()}>{trip.description}</html.p>
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
    tripDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleContainer: {
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
        marginTop: '1rem',
        marginBottom: 0,
    }),
    description: () => ({
        fontSize: '1.125rem',
        color: colors.slate[600],
        margin: 0,
    }),
});