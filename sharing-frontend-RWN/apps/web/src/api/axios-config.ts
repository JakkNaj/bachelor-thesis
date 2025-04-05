import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:4000';
const AUTH_TOKEN_KEY = 'auth_token';

// Configure axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Token interceptor
axios.interceptors.request.use(
	config => {
		const token = Cookies.get(AUTH_TOKEN_KEY);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error)
);

// Response interceptor (401 redirect)
axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			Cookies.remove(AUTH_TOKEN_KEY);
			const currentPath = window.location.pathname;
			if (currentPath !== '/login') {
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

export { axios };
