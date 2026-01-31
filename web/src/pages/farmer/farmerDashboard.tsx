import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { farmerService } from "@/services/farmerService";
import { marketService } from "@/services/marketService";
import { dealService } from "@/services/dealService";
import { aiService } from "@/services/aiService";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Clock,
  MapPin,
  TrendingUp,
  FileText,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { ActionCard } from "@/components/common/ActionCard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Search,
  TrendingDown,
  Percent,
  IndianRupee,
  Filter,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------- MOCK BANK DATA (TEMP) ---------------- */

export default function CustomerDashboard() {
  // 🔒 ALL HOOKS FIRST — NO EXCEPTIONS
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [recommendedPrices, setRecommendedPrices] = useState<any[]>([]);
  const [buyerDemands, setBuyerDemands] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch market price trends
        const trendsResponse = await marketService.getPriceTrends();
        const trendsData = trendsResponse.data;
        if (trendsData && Array.isArray(trendsData)) {
          setRecommendedPrices(trendsData);
        }

        // Fetch buyer demands
        const demandsResponse = await farmerService.getBuyerDemands();
        const demandsData = demandsResponse.data;
        if (demandsData && Array.isArray(demandsData)) {
          setBuyerDemands(demandsData);
        }

        // Fetch deals/orders
        const dealsResponse = await dealService.getMyDeals();
        const dealsData = dealsResponse.data;
        if (dealsData && Array.isArray(dealsData)) {
          setDeals(dealsData);
        }

        // Fetch AI insights
        const insightsResponse = await aiService.getDashboardInsights();
        const insightsData = insightsResponse.data;
        if (insightsData && Array.isArray(insightsData)) {
          setAiInsights(insightsData);
        }

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Don't show error toast here - just log it
        // User can still see the dashboard with empty states
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const resolvedUser = user;

  // ✅ THEN conditional rendering
  if (authLoading || isLoading) {
    return (
      <ResponsiveLayout title="Dashboard">
        <div className="flex justify-center py-20">
          <div className="flex flex-col items-center gap-2">
            <span className="animate-spin text-4xl">⌛</span>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </ResponsiveLayout>
    );
  }

  if (!resolvedUser) {
    return (
      <ResponsiveLayout title="Dashboard">
        <div className="flex flex-col items-center py-20 gap-3">
          <p>You are not logged in</p>
          <Button onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout title="Dashboard">
      <div className="space-y-8">

        {/* ================= GREETING ================= */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-600 flex items-center gap-1 font-medium">
              {new Date().getHours() < 12 ? '☀️ Good Morning' :
                new Date().getHours() < 17 ? '🌤️ Good Afternoon' :
                  '🌙 Good Evening'}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              Namaste, {resolvedUser.name.split(' ')[0]}
            </h1>
            {resolvedUser.city && (
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {resolvedUser.city}{resolvedUser.state && `, ${resolvedUser.state}`}
              </p>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/farmer/profile')}
              className="gap-1"
            >
              View Profile
            </Button>
          </div>
        </div>

        {/* ================= WEATHER / HIGHLIGHT ================= */}
        {/* ================= WEATHER / HIGHLIGHT ================= */}
        {aiInsights.length > 0 ? (
          <Card className="bg-gradient-to-br from-emerald-600 to-lime-500 text-white border-0 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm opacity-90 font-medium">{aiInsights[0].title}</p>
                <h3 className="text-3xl font-bold mt-1">
                  {aiInsights[0].value} <span className="text-lg font-normal opacity-90">{aiInsights[0].trend === 'up' ? 'Rising' : aiInsights[0].trend === 'down' ? 'Falling' : 'Stable'}</span>
                </h3>
                <Badge className="mt-3 bg-white/20 text-white border-white/30 hover:bg-white/30">
                  🌾 AI Insight
                </Badge>
                <p className="text-xs opacity-75 mt-2">
                  {aiInsights[0].description}
                </p>
              </div>
              <span className="text-6xl md:text-7xl">
                {aiInsights[0].type === 'weather' ? '🌤️' : '📈'}
              </span>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-emerald-600 to-lime-500 text-white border-0 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm opacity-90 font-medium">Weather & Insights</p>
                <h3 className="text-3xl font-bold mt-1">
                  Loading...
                </h3>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ================= AI RATES (Market Trends) ================= */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Today's Market Rates</h2>
              <p className="text-sm text-muted-foreground">AI-powered price recommendations</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/farmer/insights')}
              className="gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {recommendedPrices.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">No market data available</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check back later for updated price trends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {recommendedPrices.slice(0, 6).map((item: any, idx) => (
                <Card
                  key={item.crop || item.id || idx}
                  className="min-w-[160px] shrink-0 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.crop || item.commodity || 'Unknown Crop'}
                      </p>
                      {(item.trend === 'up' || item.isUp) ? (
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xl font-bold">₹{item.price || item.modal_price || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">per quintal</p>
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${item.trend === 'up' || item.isUp
                          ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                          : "text-red-600 border-red-200 bg-red-50"
                          }`}
                      >
                        {item.trendValue || (item.isUp ? '+2.4%' : '-1.2%')}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ================= BUYER INTERESTS ================= */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Buyer Demands</h2>
              <p className="text-sm text-muted-foreground">Active purchase requests</p>
            </div>
            {buyerDemands.length > 0 && (
              <Badge className="bg-emerald-600 hover:bg-emerald-700">
                {buyerDemands.length} Active
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            {buyerDemands.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">No buyer demands yet</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        New purchase requests will appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              buyerDemands.slice(0, 5).map((demand: any, idx) => (
                <Card key={demand._id || idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-lg">{demand.cropName}</h4>
                          <Badge variant="outline" className="text-xs">
                            {demand.status || 'Active'}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <span className="font-medium">Quantity:</span> {demand.quantity} {demand.unit || "units"}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <span className="font-medium">Price:</span> ₹{demand.maxPrice || "Negotiable"}
                          </p>
                          {demand.deliveryLocation && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {demand.deliveryLocation}
                            </p>
                          )}
                          {demand.requiredBy && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Required by: {new Date(demand.requiredBy).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="gap-1">
                            Accept Deal
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            Negotiate
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {demand.createdAt ? new Date(demand.createdAt).toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ActionCard
              icon={ArrowUpRight}
              title="Sell Crop"
              description="List produce"
              to="/farmer/products" // Updated path
            />
            <ActionCard
              icon={TrendingUp}
              title="Soil Analysis"
              description="AI insights"
              to="/farmer/insights" // Updated path suggestion
            />
            <ActionCard
              icon={Clock}
              title="My Orders"
              description="Track status"
              to="/farmer/orders"
            />
            <ActionCard
              icon={FileText}
              title="Profile"
              description="Update details"
              to="/farmer/profile"
            />
          </div>
        </section>

      </div>
    </ResponsiveLayout>
  );
}
