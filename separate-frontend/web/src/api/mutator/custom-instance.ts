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
		withCredentials: true, 
		...config,
	});

	instance.interceptors.response.use(
		(response) => response,
		(error: AxiosError) => {
			if (error.response?.status === 401) {
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
