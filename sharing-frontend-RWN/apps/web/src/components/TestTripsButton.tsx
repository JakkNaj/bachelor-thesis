import { getApiTrips } from '@monorepo/shared/src/api/generated/travelPlannerAPI';
import { useState } from 'react';

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
		<div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
			<h3 className="text-lg font-medium text-gray-900 mb-2">Test Trips API</h3>
			<button
				onClick={handleFetchTrips}
				disabled={isLoading}
				className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
			>
				{isLoading ? 'Loading...' : 'Test Get Trips'}
			</button>
			{result && (
				<div
					className={`mt-2 text-sm ${result.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}
				>
					{result}
				</div>
			)}
		</div>
	);
};
