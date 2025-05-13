import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import './globals.css';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { TripDetails } from './pages/TripDetails';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<MainLayout>
					<Routes>
						<Route path="/login" element={<Login />} />

						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/trips/:tripId"
							element={
								<ProtectedRoute>
									<TripDetails />
								</ProtectedRoute>
							}
						/>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</MainLayout>
			</BrowserRouter>
		</QueryClientProvider>
	);
};
