import api from './api';
import { YieldPrediction, ApiResponse } from '@/types';

export const predictionService = {
    predictYield: async (data: { cropId: string; area: number; soilType?: string }) => {
        const response = await api.post<ApiResponse<YieldPrediction>>('/predictions/yield', data);
        return response.data;
    }
};
