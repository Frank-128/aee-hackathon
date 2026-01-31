import api from './api';
import { AdminUser, AdminAnalytics, ApiResponse } from '@/types';

export const adminService = {
    getUsers: async () => {
        const response = await api.get<ApiResponse<AdminUser[]>>('/admin/users');
        return response.data;
    },

    getAnalytics: async () => {
        const response = await api.get<ApiResponse<AdminAnalytics>>('/admin/analytics/overview');
        return response.data;
    },

    getDeals: async () => {
        const response = await api.get<ApiResponse<any[]>>('/admin/deals');
        return response.data;
    },

    getCrops: async () => {
        const response = await api.get<ApiResponse<any[]>>('/admin/crops');
        return response.data;
    }
};
