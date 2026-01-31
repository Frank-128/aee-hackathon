import api from './api';
import { DemandSupply, PriceTrend, MarketSnapshot, ApiResponse } from '@/types';

export const marketService = {
    getLiveDemandSupply: async () => {
        const response = await api.get<ApiResponse<DemandSupply[]>>('/market/live-demand-supply');
        return response.data;
    },

    getPriceTrends: async () => {
        const response = await api.get<ApiResponse<PriceTrend[]>>('/market/price-trends');
        return response.data;
    },

    getMarketSnapshots: async () => {
        const response = await api.get<ApiResponse<MarketSnapshot[]>>('/market/market-snapshots');
        return response.data;
    }
};

