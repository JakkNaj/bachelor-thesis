import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { authStorage } from "@/lib/auth/auth-storage";

const BASE_URL = "http://localhost:4000";

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
	const instance = axios.create({
		baseURL: BASE_URL,
		headers: {
			"Content-Type": "application/json",
		},
	});

	instance.interceptors.request.use(
		async (config) => {
			const token = await authStorage.getToken();
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);

	instance.interceptors.response.use(
		(response) => response.data,
		(error: AxiosError) => Promise.reject(error)
	);

	return instance(config) as Promise<T>;
};
