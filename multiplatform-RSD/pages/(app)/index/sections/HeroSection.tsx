import { colors } from "@/assets/colors/colors";
import { CrossIcon } from "@/assets/icons/CrossIcon/CrossIcon";
import { Button } from "@/components/Button";
import { FormModal } from "@/components/FormModal/FormModal";
import { TripForm } from "@/components/TripForm";
import { useTripActions } from "@/hooks/useTripActions";
import { TripInput } from "@/api/generated/schemas";
import { useState } from "react";
import { Platform } from "react-native";
import { css, html } from "react-strict-dom"

export const HeroSection = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { createTrip, isCreating, createError } = useTripActions();

    const toggleHeroVisibility = () => {
        setIsHeroVisible(!isHeroVisible);
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
    
    return (
        isHeroVisible && (
            <html.div style={styles.heroContainer()}>
                <html.div style={styles.heroContent}>
                    <html.h1 style={[styles.heroTitle(), Platform.OS === 'web' && webStyles.heroTitle()]}>Build your travel plans with ease!</html.h1>
                    <html.p style={styles.heroDescription}>
                        Accessible and customizable trip planning system. Free.
                        <html.br />
                        Made by travelers, for travelers.
                    </html.p>
                    <Button 
                        title="Get Started" 
                        onPress={handleOpenModal}
                        style={styles.heroButton}
                    />
                </html.div>
                <html.div 
                    style={styles.closeButton} 
                    onClick={toggleHeroVisibility}
                >
                    <CrossIcon size={24} color={colors.gray[600]} />
                </html.div>

                <FormModal
                    isVisible={isModalVisible}
                    onClose={handleCloseModal}
                    title="Create New Trip"
                >
                    <TripForm 
                        onSubmit={handleSubmitTrip}
                        isSubmitting={isCreating}
                        submitError={createError as Error | null}
                    />
                </FormModal>
            </html.div>
        )
    )
}

const styles = css.create({
    heroContainer: () => ({
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingBottom: "0.5rem",
        borderBottomWidth: '1px',
        borderBottomColor: colors.slate[200],
        borderBottomStyle: 'solid',
    }),
    heroContent: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: "0.5rem",
    },
    closeButton: {
        cursor: "pointer",
        alignSelf: "flex-start",
        padding: "0.2rem",
    },
    heroTitle: () => ({
        fontSize: "1.6rem",
        fontWeight: 700,
        color: colors.slate[900],
        margin: 0,
    }),
    heroDescription: {
        fontSize: "1rem",
    },
	heroButton: {
		marginBottom: "0.5rem",
		marginTop: "0.5rem",
	},
})

const webStyles = css.create({
    heroTitle: () => ({
        fontSize: "2rem",
        fontWeight: 700,
        color: colors.slate[900],
        margin: 0,
    }),
})