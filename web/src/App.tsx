import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

// farmer imports
import FarmerDashboard from "./pages/farmer/farmerDashboard";
import FarmerProducts from "./pages/farmer/farmerProducts";
import NearByFarmers from "./pages/farmer/nearbyFarmers";
import NearbyFarmerProfile from "./pages/farmer/nearbyFarmerDetail";
import FarmerInsights from "./pages/farmer/farmerMarketInsights";
import FarmerProfile from "./pages/farmer/farmerProfile";
import {
  FarmerHelp,
  FarmerDelivery,
  FarmerEarnings,
  FarmerFarmProfile,
  FarmerLearn,
  FarmerInventory, FarmerNotifications,
  FarmerWeather,
} from "./pages/farmer/farmerPages"
import FarmerMessages from "./pages/common/Messages";
import FarmerOrderDetails from "./pages/farmer/farmerOrderDetail";
import { FarmerOrders } from "./pages/farmer/farmerOrders";



// consumer imports
import { BuyerDashboard } from "./pages/buyers/buyerDashboard";
import { BuyerFarmers } from "./pages/buyers/buyerFarmers";
import BuyerInvoices from "./pages/buyers/buyerInvoice";
import { BuyerOrders, BuyerTracking, BuyerWishlist } from "./pages/buyers/buyerOrder";
import { BuyerReviews } from "./pages/buyers/buyerReviews";

import BuyerProfile from "./pages/buyers/buyerProfile";
import BuyerInvoice from "./pages/buyers/buyerInvoice"
import BuyerMessages from "./pages/buyers/buyerMessages"
import { BuyerMarket } from "./pages/buyers/buyerMarket"
import { MarketProductDetails } from "./pages/buyers/buyerProductDetails"

// admin imports
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Farmer Routes */}
          <Route path="/farmer/dashboard" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerDashboard /></ProtectedRoute>} />
          <Route path="/farmer/products" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerProducts /></ProtectedRoute>} />
          <Route path="/farmer/orders/:orderId" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerOrderDetails /></ProtectedRoute>} />
          <Route path="/farmer/earnings" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerEarnings /></ProtectedRoute>} />
          <Route path="/farmer/nearby-farmers" element={<ProtectedRoute allowedRoles={['farmer']}><NearByFarmers /></ProtectedRoute>} />
          <Route path="/farmer/nearby-farmers/:id" element={<ProtectedRoute allowedRoles={['farmer']}><NearbyFarmerProfile /></ProtectedRoute>} />
          <Route path="/farmer/inventory" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerInventory /></ProtectedRoute>} />
          <Route path="/farmer/delivery" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerDelivery /></ProtectedRoute>} />
          <Route path="/farmer/orders" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerOrders /></ProtectedRoute>} />
          <Route path="/farmer/insights" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerInsights /></ProtectedRoute>} />
          <Route path="/farmer/weather" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerWeather /></ProtectedRoute>} />
          <Route path="/farmer/learn" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerLearn /></ProtectedRoute>} />
          <Route path="/farmer/notifications" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerNotifications /></ProtectedRoute>} />
          <Route path="/farmer/messages" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerMessages /></ProtectedRoute>} />
          <Route path="/farmer/help" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerHelp /></ProtectedRoute>} />
          <Route path="/farmer/profile" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerProfile /></ProtectedRoute>} />

          {/* Buyer Routes */}
          <Route path="/buyer/dashboard" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/buyer/market" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerMarket /></ProtectedRoute>} />
          <Route path="/buyer/product/:id" element={<ProtectedRoute allowedRoles={['buyer']}><MarketProductDetails /></ProtectedRoute>} />
          <Route path="/buyer/orders" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerOrders /></ProtectedRoute>} />
          <Route path="/buyer/messages" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerMessages /></ProtectedRoute>} />
          <Route path="/buyer/wishlist" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerWishlist /></ProtectedRoute>} />
          <Route path="/buyer/invoices" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerInvoice /></ProtectedRoute>} />
          <Route path="/buyer/payments" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerInvoice /></ProtectedRoute>} />
          <Route path="/buyer/tracking" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerTracking /></ProtectedRoute>} />
          <Route path="/buyer/reviews" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerReviews /></ProtectedRoute>} />
          <Route path="/buyer/farmers" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerFarmers /></ProtectedRoute>} />
          <Route path="/buyer/profile" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerProfile /></ProtectedRoute>} />


          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/farmers" element={<ProtectedRoute allowedRoles={['admin']}><AdminFarmers /></ProtectedRoute>} />
          <Route path="/admin/buyers" element={<ProtectedRoute allowedRoles={['admin']}><AdminBuyers /></ProtectedRoute>} />
          <Route path="/admin/verifications" element={<ProtectedRoute allowedRoles={['admin']}><AdminVerifications /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['admin']}><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/listings" element={<ProtectedRoute allowedRoles={['admin']}><AdminListings /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['admin']}><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={['admin']}><AdminPayments /></ProtectedRoute>} />
          <Route path="/admin/invoices" element={<ProtectedRoute allowedRoles={['admin']}><AdminInvoices /></ProtectedRoute>} />
          <Route path="/admin/disputes" element={<ProtectedRoute allowedRoles={['admin']}><AdminDisputes /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
          <Route path="/test" element={<div>TEST PAGE</div>} />

        </Routes>

      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

