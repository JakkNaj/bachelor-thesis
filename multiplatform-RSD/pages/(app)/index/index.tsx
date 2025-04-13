import { html, css } from "react-strict-dom";
import { Platform } from "react-native";
import { HeroSection } from "./sections/HeroSection";
import { TripsSection } from "./sections/TripsSection";

export const Home = () => {
	return (
        <html.div style={Platform.OS === 'web' ? webStyles.outerWrapper : defaultStyles.outerWrapper}>
            <html.div style={Platform.OS === 'web' ? webStyles.innerWrapper : defaultStyles.innerWrapper}>
                <HeroSection />
                <TripsSection />
            </html.div>
        </html.div>
	);
}

export default Home;

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