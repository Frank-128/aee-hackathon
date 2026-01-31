import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable credentials for cookie-based auth if needed
});

// Add a request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle network errors
        if (!error.response) {
            toast({
                title: 'Network Error',
                description: 'Unable to connect to the server. Please check your internet connection.',
                variant: 'destructive',
            });
            return Promise.reject(error);
        }

        // Handle 401 Unauthorized
        if (error.response.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');

            // Only redirect if not already on login page
            if (window.location.pathname !== '/login') {
                toast({
                    title: 'Session Expired',
                    description: 'Please log in again.',
                    variant: 'destructive',
                });
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }

        // Handle other errors with backend message
        const errorMessage = error.response?.data?.error ||
            error.response?.data?.message ||
            'An unexpected error occurred';

        toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
        });

        return Promise.reject(error);
    }
);

export default api;

