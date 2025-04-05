import type { AuthResponse } from '@monorepo/shared/src/api/generated/schemas/authResponse';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { LoginForm } from './components/LoginForm';
import { TestTripsButton } from './components/TestTripsButton';

const queryClient = new QueryClient();
const AUTH_TOKEN_KEY = 'auth_token';

export const App = () => {
	const handleLoginSuccess = (data: AuthResponse) => {
		console.log('Login successful:', data);
		
		if (data.token) {
			Cookies.set(AUTH_TOKEN_KEY, data.token);
		}
	};

	return (
		<QueryClientProvider client={queryClient}>
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4">
					<h1 className="text-2xl font-bold text-center pt-8 mb-4">Login</h1>
					<LoginForm onSuccess={handleLoginSuccess} />
					<TestTripsButton />
				</div>
			</div>
		</QueryClientProvider>
	);
};
