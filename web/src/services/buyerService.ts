import api from './api';
import {
    BuyerProfile,
    Demand,
    FarmerProduct,
    Negotiation,
    ApiResponse
} from '@/types';

export const buyerService = {
    getProfile: async () => {
        const response = await api.get<ApiResponse<BuyerProfile>>('/buyers/profile');
        return response.data;
    },

    updateProfile: async (data: Partial<BuyerProfile>) => {
        const response = await api.put<ApiResponse<BuyerProfile>>('/buyers/profile', data);
        return response.data;
    },

    postDemand: async (data: Omit<Demand, '_id' | 'buyerId' | 'createdAt'>) => {
        const response = await api.post<ApiResponse<Demand>>('/buyers/demand', data);
        return response.data;
    },

    getDemands: async () => {
        const response = await api.get<ApiResponse<Demand[]>>('/buyers/demands');
        return response.data;
    },

    getFarmerListings: async () => {
        const response = await api.get<ApiResponse<FarmerProduct[]>>('/buyers/farmer-listings');
        return response.data;
    },

    negotiate: async (data: Omit<Negotiation, '_id' | 'createdAt'>) => {
        const response = await api.post<ApiResponse<Negotiation>>('/buyers/negotiate', data);
        return response.data;
    }
};

