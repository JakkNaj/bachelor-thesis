import { Redirect } from "expo-router";
import Head from 'expo-router/head';
import { View, Text } from 'react-native';

export default function Page() {
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
