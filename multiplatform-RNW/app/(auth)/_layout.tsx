import { Stack } from "expo-router";
import { Platform, View, StyleSheet } from "react-native";
import { colors } from "@/assets/colors/colors";

export default function AuthLayout() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        animation: 'none',
                        gestureEnabled: false,
                        contentStyle: {
                            backgroundColor: colors.white,
                        }
                    }}
                >
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="signup" options={{ headerShown: false }} />
                </Stack>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    content: {
        width: '100%',
        maxWidth: Platform.OS === 'web' ? 448 : '100%',
        flex: 1,
    },
});