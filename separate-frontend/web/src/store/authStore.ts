import { create } from "zustand";
import { UserResponse } from "../api/generated/schemas";
import { customInstance } from "../api/mutator/custom-instance";

export enum EAuthStatus {
	AUTHENTICATED = "authenticated",
	UNAUTHENTICATED = "unauthenticated",
	LOADING = "loading",
}

type TAuthStore = {
	status: EAuthStatus;
	user: UserResponse | null;
	setAuth: (user: UserResponse) => void;
	clearAuth: () => void;
	logout: () => Promise<void>;
	checkAuth: () => void;
};

export const useAuthStore = create<TAuthStore>((set) => ({
	status: EAuthStatus.LOADING,
	user: null,

	setAuth: (user) => {
		set({
			status: EAuthStatus.AUTHENTICATED,
			user,
		});
	},

	clearAuth: () => {
		set({
			status: EAuthStatus.UNAUTHENTICATED,
			user: null,
		});
	},

	logout: async () => {
		try {
			await customInstance({
				url: "/api/auth/logout",
				method: "POST",
			});
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			set({
				status: EAuthStatus.UNAUTHENTICATED,
				user: null,
			});
		}
	},

	checkAuth: () => {
		customInstance<UserResponse>({
			url: "/api/users/profile",
			method: "GET",
		})
			.then((user) => {
				set({
					status: EAuthStatus.AUTHENTICATED,
					user,
				});
			})
			.catch(() => {
				set({
					status: EAuthStatus.UNAUTHENTICATED,
					user: null,
				});
			});
	},
}));
