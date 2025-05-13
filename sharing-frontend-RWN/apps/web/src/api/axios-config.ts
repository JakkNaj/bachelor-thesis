import axios from 'axios';

const API_URL = 'http://localhost:4000';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
	response => {
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
