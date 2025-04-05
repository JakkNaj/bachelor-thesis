import { usePostApiAuthLogin } from '@monorepo/shared/src/api/generated/auth/auth';
import type { AuthResponse } from '@monorepo/shared/src/api/generated/schemas/authResponse';
import type { PostApiAuthLoginBody } from '@monorepo/shared/src/api/generated/schemas/postApiAuthLoginBody';
import {
	getGetApiTripsQueryKey,
	useGetApiTrips,
} from '@monorepo/shared/src/api/generated/trips/trips';
import { useState } from 'react';

type TLoginFormProps = {
	onSuccess?: (data: AuthResponse) => void;
};

export const LoginForm = ({ onSuccess }: TLoginFormProps) => {
	const [formData, setFormData] = useState<PostApiAuthLoginBody>({
		email: '',
		password: '',
	});

	const { mutate: login, error, isPending, data } = usePostApiAuthLogin();
	const {
		data: tripsData,
		error: tripsError,
		refetch: fetchTrips,
		isFetching: isFetchingTrips,
	} = useGetApiTrips({
		query: {
			enabled: false,
			queryKey: getGetApiTripsQueryKey(),
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(
			{ data: formData },
			{
				onSuccess: data => {
					onSuccess?.(data.data);
				},
			}
		);
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={formData.email}
						onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						required
					/>
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						type="password"
						id="password"
						value={formData.password}
						onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						required
					/>
				</div>

				{error && (
					<div className="text-red-500 text-sm">
						{(error as Error).message || 'An error occurred'}
					</div>
				)}

				{data && (
					<div className="text-green-500 text-sm">
						Logged in successfully as {data.data.user?.name}
					</div>
				)}

				<button
					type="submit"
					disabled={isPending}
					className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
				>
					{isPending ? 'Logging in...' : 'Login'}
				</button>
			</form>

			<div className="mt-6 pt-4 border-t border-gray-200">
				<h3 className="text-lg font-medium text-gray-900 mb-2">Test API Authorization</h3>
				<button
					onClick={() => fetchTrips()}
					disabled={isFetchingTrips || !data}
					className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
				>
					{isFetchingTrips ? 'Fetching trips...' : 'Test Fetch Trips'}
				</button>

				{tripsError && (
					<div className="mt-2 text-red-500 text-sm">
						Error fetching trips: {(tripsError as Error).message || 'Unknown error'}
					</div>
				)}

				{tripsData && (
					<div className="mt-2 text-green-500 text-sm">
						Successfully fetched {tripsData.data.length} trips
					</div>
				)}
			</div>
		</div>
	);
};
