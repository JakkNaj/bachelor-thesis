import { Redirect } from "expo-router";
import { View, Text, Platform } from "react-native";
import Head from 'expo-router/head';

export default function Index() {
	if (Platform.OS === 'web') {
		return (
			<>
				<Head>
					<title>Home - Multiplatform RNW</title>
					<meta name="description" content="Welcome to our cross-platform application" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
				</Head>
				<View>
					<Text>Welcome to the home page</Text>
				</View>
				<Redirect href="/(auth)/login" />;
			</>
		);
	}
	return <Redirect href="/(auth)/login" />;
}
