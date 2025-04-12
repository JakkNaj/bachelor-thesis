import { Stack } from "expo-router";
import { css, html } from "react-strict-dom";

export default function AuthLayout() {
    return (
        <html.div style={styles.container}>
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

const styles = css.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})