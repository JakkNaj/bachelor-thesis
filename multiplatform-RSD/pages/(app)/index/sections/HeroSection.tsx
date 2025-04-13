import { colors } from "@/assets/colors/colors";
import { CrossIcon } from "@/assets/icons/CrossIcon/CrossIcon";
import { Button } from "@/components/Button";
import { useState } from "react";
import { css, html } from "react-strict-dom"

export const HeroSection = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    const toggleHeroVisibility = () => {
        setIsHeroVisible(!isHeroVisible);
    };
    
    return (
        isHeroVisible && (
            <html.div style={styles.heroContainer}>
                <html.div style={styles.heroContent}>
                    <html.h1>Build your travel plans with ease!</html.h1>
                    <html.p style={styles.heroDescription}>
                        Accessible and customizable trip planning system. Free.
                        <html.br />
                        Made by travelers, for travelers.
                    </html.p>
                    <Button 
                        title="Get Started" 
                        onPress={() => {}} 
                        style={styles.heroButton}
                    />
                </html.div>
                <html.div 
                    style={styles.closeButton} 
                    onClick={toggleHeroVisibility}
                >
                    <CrossIcon size={24} color={colors.gray[600]} />
                </html.div>
            </html.div>
        )
    )
}

const styles = css.create({
    heroContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
	},
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
    heroDescription: {
        fontSize: "1rem",
    },
	heroButton: {
		marginBottom: "0.5rem",
		marginTop: "0.5rem",
	},
})