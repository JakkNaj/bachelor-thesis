import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:4000';

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source();
  const token = Cookies.get('auth_token');
  
  const instance = axios.create({
    baseURL: API_URL,
    cancelToken: source.token,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...config,
  });

  // Add request interceptor to refresh token if needed
  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor to handle errors
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle 401 Unauthorized errors
      if (error.response?.status === 401) {
        // Clear token and redirect to login
        Cookies.remove('auth_token');
        window.location.href = '/login';
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