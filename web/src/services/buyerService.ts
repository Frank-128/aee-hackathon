import api from './api';
import {
    BuyerProfile,
    Demand,
    FarmerProduct,
    Negotiation,
    ApiResponse
} from '@/types';

export const buyerService = {
    getProfile() {
        return api.get<ApiResponse<BuyerProfile>>("/buyer/profile");
    },

    updateProfile(payload: BuyerProfile) {
        return api.put<ApiResponse<BuyerProfile>>("/buyer/profile", payload);
    },

    postDemand: async (data: Omit<Demand, '_id' | 'buyerId' | 'createdAt'>) => {
        const response = await api.post<ApiResponse<Demand>>('/buyers/demand', data);
        return response.data;
    },

    getDemands: async () => {
        const response = await api.get<ApiResponse<Demand[]>>('/buyers/demands');
        return response.data;
    },

    deleteDemand: async (demandId: string) => {
        const response = await api.delete<ApiResponse<void>>(`/buyers/demand/${demandId}`);
        return response.data;
    },

    updateDemand: async (demandId: string, data: Partial<Demand>) => {
        const response = await api.put<ApiResponse<Demand>>(`/buyers/demand/${demandId}`, data);
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

