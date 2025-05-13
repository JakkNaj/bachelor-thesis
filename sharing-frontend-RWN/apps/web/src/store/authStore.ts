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
		set({
			status: EAuthStatus.LOADING,
		});

		getApiUsersProfile()
			.then(response => {
				set({
					status: EAuthStatus.AUTHENTICATED,
					user: response.data,
				});
			})
			.catch(error => {
				console.error('Auth check error:', error);
				set({
					status: EAuthStatus.UNAUTHENTICATED,
					user: null,
				});
			});
	},
}));
