import api from './api';
import {
    FarmerProfile,
    Crop,
    Land,
    RecommendedPrice,
    Demand,
    ApiResponse
} from '@/types';

export const farmerService = {
    getProfile: async () => {
        const response = await api.get<ApiResponse<FarmerProfile>>('/farmers/profile');
        return response.data;
    },

    updateProfile: async (data: Partial<FarmerProfile>) => {
        const response = await api.put<ApiResponse<FarmerProfile>>('/farmers/profile', data);
        return response.data;
    },

    addLand: async (data: Omit<Land, '_id'>) => {
        const response = await api.post<ApiResponse<Land>>('/farmers/land', data);
        return response.data;
    },

    addCrop: async (data: Omit<Crop, '_id'>) => {
        const response = await api.post<ApiResponse<Crop>>('/farmers/crop', data);
        return response.data;
    },

    getCrops: async () => {
        const response = await api.get<ApiResponse<Crop[]>>('/farmers/crops');
        return response.data;
    },

    deleteCrop: async (cropId: string) => {
        const response = await api.delete<ApiResponse<void>>(`/farmers/crop/${cropId}`);
        return response.data;
    },

    getBuyerDemands: async () => {
        const response = await api.get<ApiResponse<Demand[]>>('/farmers/buyer-demands');
        return response.data;
    },

    getRecommendedPrice: async (cropId: string) => {
        const response = await api.get<ApiResponse<RecommendedPrice>>(`/farmers/recommended-price/${cropId}`);
        return response.data;
    }
};

