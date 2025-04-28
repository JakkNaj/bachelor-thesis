import { Redirect } from "expo-router";
import Head from 'expo-router/head';
import { View, Text, Platform } from 'react-native';

export default function Page() {
	if (Platform.OS === 'web') {
		return (
			<>
				<Head>
					<title>Home - Multiplatform RNW</title>
					<meta name="description" content="Welcome to our cross-platform application" />
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
