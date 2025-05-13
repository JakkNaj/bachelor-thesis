import axios, { AxiosError } from 'axios';
import authStorage from '../lib/auth/auth-storage';

const BASE_URL = 'http://localhost:4000';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

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

axios.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			await authStorage.removeToken();
		}
		return Promise.reject(error);
	}
);

export default axios;
