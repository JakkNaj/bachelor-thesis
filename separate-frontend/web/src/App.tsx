import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainLayout } from "./layouts/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { TripDetails } from "./pages/TripDetails";
import { NotFound } from "./pages/NotFound";

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
						{/* Public routes */}
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						{/* Protected routes */}
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

						{/* 404 route - public */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</MainLayout>
			</BrowserRouter>
		</QueryClientProvider>
	);
};
