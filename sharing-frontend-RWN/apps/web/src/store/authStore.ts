import { postApiAuthLogout } from '@monorepo/shared/src/api/generated/auth/auth';
import { AuthResponse, UserResponse } from '@monorepo/shared/src/api/generated/schemas';
import { getApiUsersProfile } from '@monorepo/shared/src/api/generated/users/users';
import { create } from 'zustand';

export enum EAuthStatus {
	AUTHENTICATED = 'authenticated',
	UNAUTHENTICATED = 'unauthenticated',
	LOADING = 'loading',
}

type TAuthStore = {
	status: EAuthStatus;
	user: UserResponse | null;
	setAuth: (authResponse: AuthResponse) => void;
	clearAuth: () => void;
	logout: () => Promise<void>;
	checkAuth: () => void;
};

export const useAuthStore = create<TAuthStore>(set => ({
	status: EAuthStatus.LOADING,
	user: null,

	setAuth: (authResponse: AuthResponse) => {
		if (authResponse.user) {
			// Only update the auth state and user info
			// The token is handled by the server and axios interceptors
			set({
				status: EAuthStatus.AUTHENTICATED,
				user: authResponse.user,
			});
		} else {
			set({
				status: EAuthStatus.UNAUTHENTICATED,
				user: null,
			});
		}
	},

	clearAuth: () => {
		set({
			status: EAuthStatus.UNAUTHENTICATED,
			user: null,
		});
	},

	logout: async () => {
		try {
			await postApiAuthLogout();
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			set({
				status: EAuthStatus.UNAUTHENTICATED,
				user: null,
			});
		}
	},

	checkAuth: () => {
		// Set status to loading while checking
		set({
			status: EAuthStatus.LOADING,
		});

		// Verify authentication with the server
		getApiUsersProfile()
			.then(response => {
				// If the request succeeds, the user is authenticated
				set({
					status: EAuthStatus.AUTHENTICATED,
					user: response.data,
				});
			})
			.catch(error => {
				console.error('Auth check error:', error);
				// If the request fails, the user is not authenticated
				set({
					status: EAuthStatus.UNAUTHENTICATED,
					user: null,
				});
			});
	},
}));
