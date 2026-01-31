import api from './api';
import { Review, TrustScore, ApiResponse } from '@/types';

export const reviewService = {
    submitReview: async (data: Omit<Review, '_id' | 'createdAt'>) => {
        const response = await api.post<ApiResponse<Review>>('/reviews', data);
        return response.data;
    },

    getFarmerReviews: async (farmerId: string) => {
        const response = await api.get<ApiResponse<Review[]>>(`/reviews/farmer/${farmerId}`);
        return response.data;
    },

    getTrustScore: async (farmerId: string) => {
        const response = await api.get<ApiResponse<TrustScore>>(`/reviews/trust-score/${farmerId}`);
        return response.data;
    }
};
