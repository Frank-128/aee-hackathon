import api from './api';

export interface AIInsight {
    type: 'weather' | 'market' | 'crop';
    title: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
    description: string;
    confidence: number;
}

export interface CropPrediction {
    cropName: string;
    confidence: number;
    suitable: boolean;
    reason: string;
}

export interface YieldPrediction {
    cropId: string;
    expectedYield: number;
    unit: string;
    params: any;
}

export const aiService = {
    // Get daily insights for the dashboard (Weather, Best Crop, etc.)
    getDashboardInsights: async () => {
        const response = await api.get<{ data: AIInsight[] }>('/predictions/insights');
        return response.data;
    },

    // Predict yield for a specific crop/land
    predictYield: async (data: { cropId: string; area: number; soilType?: string }) => {
        const response = await api.post<{ data: YieldPrediction }>('/predictions/yield', data);
        return response.data;
    },

    // Get crop recommendations based on location/season
    getBestCropRecommendations: async (location: string) => {
        const response = await api.post<{ data: CropPrediction[] }>('/predictions/crop-recommendations', { location });
        return response.data;
    },

    // Get price forecast
    getPriceForecast: async (cropName: string) => {
        const response = await api.post<{ data: { forecast: any[], trend: string } }>('/predictions/price-forecast', { cropName });
        return response.data;
    }
};
