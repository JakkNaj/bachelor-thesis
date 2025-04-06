import { getApiTrips } from '@monorepo/shared/src/api/generated/travelPlannerAPI';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const TestTripsButton = () => {
	const [result, setResult] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);

	const handleFetchTrips = async () => {
		try {
			setIsLoading(true);
			setResult('Fetching trips...');

			const response = await getApiTrips();
			const trips = response.data;

			setResult(`Success! Found ${trips.length} trips`);
		} catch (err) {
			setResult(`Error: ${err instanceof Error ? err.message : String(err)}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Button
				title={isLoading ? 'Loading...' : 'Test Get Trips'}
				onPress={handleFetchTrips}
				disabled={isLoading}
			/>
			{result ? <Text style={styles.result}>{result}</Text> : null}
		</View>
	);
};

export default TestTripsButton;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		alignItems: 'center',
	},
	result: {
		marginTop: 10,
		padding: 10,
		backgroundColor: '#f0f0f0',
		borderRadius: 5,
		textAlign: 'center',
	},
});
