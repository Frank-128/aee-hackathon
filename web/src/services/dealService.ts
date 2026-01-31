import api from './api';
import { Deal, ApiResponse } from '@/types';

export const dealService = {
    getMyDeals: async () => {
        const response = await api.get<ApiResponse<Deal[]>>('/deals/my-deals');
        return response.data;
    },

    createDeal: async (data: Omit<Deal, '_id' | 'createdAt' | 'updatedAt'>) => {
        const response = await api.post<ApiResponse<Deal>>('/deals/create', data);
        return response.data;
    },

    confirmDeal: async (dealId: string) => {
        const response = await api.post<ApiResponse<Deal>>(`/deals/confirm/${dealId}`);
        return response.data;
    },

    cancelDeal: async (dealId: string) => {
        const response = await api.post<ApiResponse<Deal>>(`/deals/cancel/${dealId}`);
        return response.data;
    }
};
