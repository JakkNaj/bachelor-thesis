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
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
    },
    innerWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignSelf: "center",
    }
});

const defaultStyles = css.create({
    outerWrapper: {
        backgroundColor: "white",
        flex: 1,
    },
    innerWrapper: {
        flex: 1,
        maxWidth: "1536px",
        display: "flex",
        flexDirection: "column",
    },
});