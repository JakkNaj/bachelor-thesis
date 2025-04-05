import axios, { AxiosError } from 'axios';
import authStorage from '../lib/auth/auth-storage';

const BASE_URL = 'http://localhost:4000';

// Configure axios defaults
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Token interceptor
axios.interceptors.request.use(
	async config => {
		const token = await authStorage.getToken();
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			await authStorage.removeToken();
		}
		return Promise.reject(error);
	}
);

export { axios };
