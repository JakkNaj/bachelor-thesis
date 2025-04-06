import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:4000";

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
	const source = axios.CancelToken.source();

	const instance = axios.create({
		baseURL: API_URL,
		cancelToken: source.token,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true, // Important: This allows cookies to be sent with cross-origin requests
		...config,
	});

	// Add response interceptor to handle errors
	instance.interceptors.response.use(
		(response) => response,
		(error: AxiosError) => {
			// Handle 401 Unauthorized errors
			if (error.response?.status === 401) {
				// Only redirect if not on login page
				const currentPath = window.location.pathname;
				if (currentPath !== "/login") {
					window.location.href = "/login";
				}
			}
			return Promise.reject(error);
		}
	);

	return instance(config)
		.then((response) => response.data)
		.catch((error: AxiosError) => {
			throw error;
		});
};
