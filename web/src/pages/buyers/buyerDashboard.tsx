import React from "react";
// import SupplyHeatmap from "@/components/common/SupplyHeatmap"; // Temporarily disabled due to React hooks issue
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  Truck,
  Mic,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Add missing imports
import { marketService } from "@/services/marketService";
import { buyerService } from "@/services/buyerService";
import { dealService } from "@/services/dealService";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

/* ============ BUYER DASHBOARD ============ */
export function BuyerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user for greeting

  /* ---------- DATA ---------- */
  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const [smartPicks, setSmartPicks] = useState<any[]>([]);
  const [demands, setDemands] = useState<any[]>([]);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback data if API not ready
  // const activeOrderMock = { ... }; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch market price trends
        const pricesResponse = await marketService.getPriceTrends();
        const pricesData = pricesResponse.data;
        if (pricesData && Array.isArray(pricesData)) {
          setMarketPrices(pricesData.slice(0, 3)); // Show top 3
        }

        // Fetch buyer demands
        const demandsResponse = await buyerService.getDemands();
        const demandsData = demandsResponse.data;
        if (demandsData && Array.isArray(demandsData)) {
          setDemands(demandsData);
        }

        // Fetch farmer listings for smart picks
        const listingsResponse = await buyerService.getFarmerListings();
        const listingsData = listingsResponse.data;
        if (listingsData && Array.isArray(listingsData)) {
          const picks = listingsData.slice(0, 2).map((l: any) => ({
            name: l.cropName || "Unknown Crop",
            info: `${l.quantity} ${l.unit} available`,
            price: `₹${l.pricePerUnit}/${l.unit}`,
            action: "Buy Now"
          }));
          setSmartPicks(picks);
        }

        // Fetch active order
        const dealsResponse = await dealService.getMyDeals();
        const deals = dealsResponse.data || [];
        // Find most recent active deal
        const activeDefaults = ['CONFIRMED', 'IN_TRANSIT', 'CREATED'];
        const active = deals.find((d: any) => activeDefaults.includes(d.status));

        if (active) {
          setActiveOrder({
            id: `ORD-${active._id.slice(-4).toUpperCase()}`,
            status: active.status === 'CREATED' ? 'Processing' : active.status,
            progress: active.status === 'CREATED' ? 'Order Placed' : 'In Transit',
            eta: "2-3 days" // Mock ETA for now
          });
        }

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ResponsiveLayout title="Home">
      <div className="space-y-10">

        {/* ===== GREETING ===== */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Namaste 👋</p>
            <h2 className="text-xl font-semibold">{user?.name || "Buyer"}</h2>
            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs">
              <MapPin className="w-3 h-3" />
              {user?.city || "Unknown City"}, {user?.state}
            </div>
          </div>
          <Button size="icon" variant="outline" className="rounded-full">
            🌙
          </Button>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search crops, farmers, markets..."
            className="pl-11 h-12 rounded-xl shadow-sm"
          />
        </div>

        {/* ===== MARKET PRICES ===== */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Market Prices</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/buyer/market")}
              className="text-emerald-600"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {marketPrices.map((item, i) => (
              <Card
                key={i}
                className="rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-4 space-y-2">
                  <div className="text-2xl">{item.emoji || "📦"}</div>
                  <p className="text-sm text-muted-foreground">{item.name || item.crop}</p>
                  <p className="text-xl font-bold">{item.price}</p>

                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${item.up || (item.trend === 'up')
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {(item.up || item.trend === 'up') ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {item.change || item.trendValue || (item.trend === 'up' ? '+5%' : '-2%')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


        {/* ===== SMART PICKS ===== */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Smart Picks</h3>
            <Badge className="bg-emerald-100 text-emerald-700">AI</Badge>
          </div>

          <div className="space-y-4">
            {smartPicks.map((pick, i) => (
              <Card
                key={i}
                className="rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{pick.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pick.info}
                    </p>
                    <p className="mt-1 text-lg font-bold text-emerald-600">
                      {pick.price}
                    </p>
                  </div>
                  <Button className="rounded-full px-5">
                    {pick.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ===== ACTIVE ORDER ===== */}
        {activeOrder && (
          <section>
            <h3 className="text-lg font-semibold mb-4">Active Order</h3>
            <Card className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => navigate('/buyer/tracking')}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">#{activeOrder.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {activeOrder.status}
                  </p>
                  <Badge className="mt-2 bg-blue-100 text-blue-700">
                    {activeOrder.progress}
                  </Badge>
                </div>
                <p className="text-sm font-medium">ETA: {activeOrder.eta}</p>
              </CardContent>
            </Card>
          </section>
        )}


      </div>
    </ResponsiveLayout>
  );
}
