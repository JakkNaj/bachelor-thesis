import { colors } from "@/assets/colors/colors";
import { CrossIcon } from "@/assets/icons/CrossIcon";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Platform, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type THeroSectionProps = {
    onCreateTripClick: () => void;
};

export const HeroSection = ({ onCreateTripClick }: THeroSectionProps) => {
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    const toggleHeroVisibility = () => {
        setIsHeroVisible(!isHeroVisible);
    };
    
    return (
        isHeroVisible && (
            <View style={styles.heroContainer}>
                <View style={styles.heroContent}>
                    <Text style={[
                        styles.heroTitle,
                        Platform.OS === 'web' && styles.heroTitleWeb
                    ]}>
                        Build your travel plans with ease!
                    </Text>
                    <Text style={styles.heroDescription}>
                        Accessible and customizable trip planning system. Free.
                        {'\n'}
                        Made by travelers, for travelers.
                    </Text>
                    <Button 
                        title="Get Started" 
                        onPress={onCreateTripClick}
                        style={styles.heroButton}
                    />
                </View>
                <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={toggleHeroVisibility}
                    activeOpacity={0.7}
                >
                    <CrossIcon size={24} color={colors.gray[600]} />
                </TouchableOpacity>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    heroContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: colors.slate[200],
        borderStyle: 'dotted',
    },
    heroContent: {
        flexDirection: "column",
        flex: 1,
        gap: 8,
    },
    closeButton: {
        alignSelf: "flex-start",
        padding: 3,
    },
    heroTitle: {
        fontSize: 25.6,
        fontWeight: '700',
        color: colors.slate[900],
        margin: 0,
    },
    heroTitleWeb: {
        fontSize: 32,
    },
    heroDescription: {
        fontSize: 16,
    },
    heroButton: {
        marginBottom: 8,
        marginTop: 8,
    },
});