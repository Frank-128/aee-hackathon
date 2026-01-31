import api from './api';
import { ApiResponse } from '@/types';

export interface Ticket {
    _id: string;
    userId: string;
    subject: string;
    description: string;
    category: 'Logistics' | 'Payment' | 'Technical' | 'Dispute';
    priority: 'Low' | 'Medium' | 'High';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    createdAt: string;
    responses?: { sender: string; message: string; timestamp: string }[];
}

export interface TransportQuote {
    distance: number;
    vehicleType: string;
    estimatedCost: number;
    provider: string;
}

export const supportService = {
    getTransportQuote: async (data: { pickup: string; dropoff: string; weight: number }) => {
        const response = await api.post<ApiResponse<TransportQuote>>('/support/transport/quote', data);
        return response.data;
    },

    bookTransport: async (quote: TransportQuote) => {
        const response = await api.post<ApiResponse<any>>('/support/transport/book', quote);
        return response.data;
    },

    getInsuranceQuote: async (data: { cropId: string; coverageAmount: number }) => {
        const response = await api.post<ApiResponse<any>>('/support/insurance/quote', data);
        return response.data;
    },

    activateInsurance: async (quoteId: string) => {
        const response = await api.post<ApiResponse<any>>('/support/insurance/activate', { quoteId });
        return response.data;
    }
};
