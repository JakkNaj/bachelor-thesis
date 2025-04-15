import { Stack } from "expo-router";
import { Platform } from "react-native";
import { css, html } from "react-strict-dom";

export default function AuthLayout() {
    return (
        <html.div style={[styles.container, Platform.OS === 'web' && webStyles.container]}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'none',
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{ headerShown: false }} />
            </Stack>
        </html.div>
    )
}

const webStyles = css.create({
    container: {
        maxWidth: "448px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
    }
})

const styles = css.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
    }
})