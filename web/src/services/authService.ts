import api from './api';
import { UserRole, User, ApiResponse } from '@/types';

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse extends User {
    token: string;
    refreshToken?: string;
}


export const authService = {
    register: async (data: RegisterData) => {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
        return response.data.data;
    },

    login: async (data: LoginData) => {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
        return response.data.data;
    },



    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        }
    },

    getCurrentUser: async () => {
        const response = await api.get<ApiResponse<User>>('/auth/me');
        return response.data;
    },
};

