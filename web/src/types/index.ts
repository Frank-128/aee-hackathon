// ==================== API Response Wrapper ====================
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    message?: string;
}

// ==================== User & Auth ====================
export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    avatar?: string;
    city?: string;
    state?: string;
    createdAt?: string;
}

export interface Address {
    street?: string;
    city: string;
    state: string;
    pincode?: string;
    country?: string;
}

// ==================== Farmer Types ====================
export interface FarmerProfile {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    address?: Address;
    city?: string;
    state?: string;
    trustScore?: number;
    isAvailable?: boolean;
    createdAt?: string;
    totalLand?: number;
    crops?: Crop[];
}

export interface Land {
    _id: string;
    size: number;
    unit: string;
    location: string;
    soilType?: string;
    crops?: Crop[];
}

export type CropStatus = 'planted' | 'growing' | 'harvested' | 'sold';

export interface Crop {
    _id: string;
    name: string;
    category: string;
    variety?: string;
    sowingDate?: string;
    harvestDate?: string;
    area: number; // in acres/hectares
    expectedYield: number;
    actualYield?: number;
    status: CropStatus;
    pricePerUnit?: number;
    unit?: string;
}

export interface FarmerProduct extends Crop {
    farmerId: string;
    farmerName?: string;
    location?: string;
}

// ==================== Buyer Types ====================
export interface BuyerProfile {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    address?: Address;
    city?: string;
    state?: string;
    businessName?: string;
    businessType?: string;
    createdAt?: string;
}

export interface Demand {
    _id: string;
    buyerId: string;
    cropName: string;
    quantity: number;
    unit: string;
    maxPrice?: number;
    deliveryLocation?: string;
    requiredBy?: string;
    status: 'active' | 'fulfilled' | 'cancelled';
    createdAt: string;
}

// ==================== Deal & Order Types ====================
export type DealStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export interface Deal {
    _id: string;
    farmerId: string;
    buyerId: string;
    cropId?: string;
    cropName: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
    totalPrice: number;
    status: DealStatus;
    createdAt: string;
    updatedAt?: string;
    deliveryDate?: string;
    farmerName?: string;
    buyerName?: string;
}

export interface Order extends Deal {
    orderNumber?: string;
    paymentStatus?: 'pending' | 'paid' | 'failed';
    deliveryStatus?: 'pending' | 'in_transit' | 'delivered';
}

// ==================== Review Types ====================
export interface Review {
    _id: string;
    farmerId: string;
    buyerId: string;
    rating: number; // 1-5
    comment?: string;
    createdAt: string;
    buyerName?: string;
    farmerName?: string;
}

export interface TrustScore {
    farmerId: string;
    score: number;
    totalReviews: number;
    averageRating: number;
}

// ==================== Market & AI Types ====================
export interface MarketSnapshot {
    _id: string;
    cropName: string;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
    demand: number;
    supply: number;
    timestamp: string;
    region?: string;
}

export interface DemandSupply {
    cropName: string;
    demand: number;
    supply: number;
    unit: string;
    timestamp?: string;
}

export interface PriceTrend {
    cropName: string;
    date: string;
    price: number;
    volume?: number;
}

export interface YieldPrediction {
    cropId: string;
    cropName: string;
    predictedYield: number;
    confidence: number;
    factors?: {
        weather?: number;
        soilQuality?: number;
        historicalData?: number;
    };
}

export interface RecommendedPrice {
    cropId: string;
    cropName: string;
    recommendedPrice: number;
    minPrice: number;
    maxPrice: number;
    marketAverage: number;
    confidence: number;
}

// ==================== Admin Types ====================
export interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    status: 'active' | 'suspended' | 'pending';
    createdAt: string;
    lastLogin?: string;
}

export interface AdminAnalytics {
    totalUsers: number;
    totalFarmers: number;
    totalBuyers: number;
    totalDeals: number;
    totalRevenue: number;
    activeDeals: number;
    completedDeals: number;
}

// ==================== Negotiation Types ====================
export interface Negotiation {
    _id: string;
    dealId?: string;
    farmerId: string;
    buyerId: string;
    cropName: string;
    quantity: number;
    proposedPrice: number;
    status: 'pending' | 'accepted' | 'rejected' | 'counter';
    createdAt: string;
}
