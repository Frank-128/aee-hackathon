import api from './api';
import { ApiResponse } from '@/types';

// Defining types locally for now if not in global types
export interface InvestmentOpportunity {
    _id: string;
    title: string;
    description: string;
    farmerName: string;
    amountRequired: number;
    roi: number;
    duration: string; // e.g., "6 months"
    riskLevel: 'Low' | 'Medium' | 'High';
    status: 'Open' | 'Closed' | 'Fully Funded';
}

export const investmentService = {
    createProject: async (data: Omit<InvestmentOpportunity, '_id' | 'status'>) => {
        const response = await api.post<ApiResponse<InvestmentOpportunity>>('/investments/project', data);
        return response.data;
    },

    getOpportunities: async () => {
        const response = await api.get<ApiResponse<InvestmentOpportunity[]>>('/investments/projects');
        return response.data;
    },

    invest: async (projectId: string, amount: number) => {
        const response = await api.post<ApiResponse<any>>(`/investments/invest/${projectId}`, { amount });
        return response.data;
    },

    getRoiPrediction: async (projectId: string) => {
        const response = await api.get<ApiResponse<any>>(`/investments/roi-prediction/${projectId}`);
        return response.data;
    }
};
