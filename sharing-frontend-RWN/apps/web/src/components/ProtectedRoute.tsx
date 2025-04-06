import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { EAuthStatus, useAuthStore } from '../store/authStore';

type TProtectedRouteProps = {
	children: ReactNode;
};

export const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
	const { status, checkAuth } = useAuthStore();
	const location = useLocation();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (status === EAuthStatus.LOADING) {
		return <div>Loading...</div>;
	}

	if (status === EAuthStatus.UNAUTHENTICATED) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};
