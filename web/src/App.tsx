import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

// farmer imports
import FarmerDashboard from "./pages/farmer/farmerDashboard";
import FarmerProducts from "./pages/farmer/farmerProducts"; 
import NearByFarmers from "./pages/farmer/nearbyFarmers"
import NearbyFarmerProfile from "./pages/farmer/nearbyFarmerDetail";

import { 
  FarmerHelp,
  FarmerDelivery,
  FarmerEarnings,
  FarmerFarmProfile,
  FarmerInsights,
  FarmerLearn,
  FarmerInventory,FarmerNotifications,
  FarmerWeather,
 } from "./pages/farmer/farmerPages"
 import FarmerMessages from "./pages/farmer/farmerMessages"; 
 import FarmerOrderDetails from "./pages/farmer/farmerOrderDetail";
 import {FarmerOrders} from "./pages/farmer/farmerOrders";



// consumer imports
import { 
  BuyerDashboard,
  BuyerFarmers,
  BuyerMarket,
  BuyerOrders,
  BuyerReviews,
  BuyerTracking,
  BuyerWishlist
} from "./pages/buyers/buyerDashboard";

// farmer imports
import { 
  AdminAnalytics, 
  AdminBuyers,
  AdminDisputes,
  AdminFarmers,
  AdminInvoices,
  AdminListings,
  AdminDashboard,
  AdminOrders,
  AdminPayments,
  AdminProducts,
  AdminVerifications
} from "./pages/admin/adminDashboard";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      {/* 🚫 NO BrowserRouter HERE */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Farmer Routes */}
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/products" element={<FarmerProducts />} />
        <Route path="/farmer/orders/:orderId" element={<FarmerOrderDetails />} />

        <Route path="/farmer/earnings" element={<FarmerEarnings />} />
        <Route path="/farmer/nearby-farmers" element={<NearByFarmers />} />
        <Route path="/farmer/nearby-farmers/:id" element={<NearbyFarmerProfile />} />

        <Route path="/farmer/inventory" element={<FarmerInventory />} />
        <Route path="/farmer/delivery" element={<FarmerDelivery />} />
        <Route path="/farmer/orders" element={<FarmerOrders />} />
        <Route path="/farmer/insights" element={<FarmerInsights />} />
        <Route path="/farmer/weather" element={<FarmerWeather />} />
        <Route path="/farmer/learn" element={<FarmerLearn />} />
        <Route path="/farmer/notifications" element={<FarmerNotifications />} />
        <Route path="/farmer/messages" element={<FarmerMessages />} />
        <Route path="/farmer/help" element={<FarmerHelp />} />

        {/* Buyer Routes */}
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/market" element={<BuyerMarket />} />
        <Route path="/buyer/orders" element={<BuyerOrders />} />
        <Route path="/buyer/messages" element={<BuyerDashboard />} />
        <Route path="/buyer/wishlist" element={<BuyerWishlist />} />
        <Route path="/buyer/invoices" element={<BuyerDashboard />} />
        <Route path="/buyer/tracking" element={<BuyerTracking />} />
        <Route path="/buyer/reviews" element={<BuyerReviews />} />
        <Route path="/buyer/farmers" element={<BuyerFarmers />} />
        <Route path="/buyer/profile" element={<BuyerFarmers />} />
        

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/farmers" element={<AdminFarmers />} />
        <Route path="/admin/buyers" element={<AdminBuyers />} />
        <Route path="/admin/verifications" element={<AdminVerifications />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/listings" element={<AdminListings />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/invoices" element={<AdminInvoices />} />
        <Route path="/admin/disputes" element={<AdminDisputes />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
