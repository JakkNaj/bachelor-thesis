import axios from 'axios';

const API_URL = 'http://localhost:4000';

// Configure axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
// Enable credentials to send cookies with requests
axios.defaults.withCredentials = true;

// Response interceptor (401 redirect)
axios.interceptors.response.use(
	response => {
		// If we get a successful response, just pass it through
		return response;
	},
	error => {
		if (error.response?.status === 401) {
			const currentPath = window.location.pathname;
			if (currentPath !== '/login') {
				window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
			}
		}
		return Promise.reject(error);
	}
);

export { axios };
