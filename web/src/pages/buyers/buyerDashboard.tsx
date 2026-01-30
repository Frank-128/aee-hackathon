import React from "react";
import SupplyHeatmap from "@/components/common/SupplyHeatmap";
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

/* ============ BUYER DASHBOARD ============ */
export function BuyerDashboard() {
  const navigate = useNavigate();

  /* ---------- DATA ---------- */

  const marketPrices = [
    { name: "Tomato (Hybrid)", price: "₹24/kg", change: "+12%", up: true, emoji: "🍅" },
    { name: "Wheat (Sonalika)", price: "₹2,150/q", change: "-4%", up: false, emoji: "🌾" },
    { name: "Onion", price: "₹18/kg", change: "+6%", up: true, emoji: "🧅" },
  ];

  const smartPicks = [
    {
      name: "Fresh Potato (Organic)",
      info: "500kg available • 12km away",
      price: "₹16.50/kg",
      action: "Buy Now",
    },
    {
      name: "Sweet Corn (Grade A)",
      info: "2 Tons • Expected price drop",
      price: "₹22.00/kg",
      action: "Pre-book",
    },
  ];

  const activeOrder = {
    id: "ORD-9021",
    status: "In-transit from Sangli",
    progress: "85% Processed",
    eta: "Today 6:30 PM",
  };

  return (
    <ResponsiveLayout title="Home">
      <div className="space-y-10">

        {/* ===== GREETING ===== */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Namaste 👋</p>
            <h2 className="text-xl font-semibold">Rajesh</h2>
            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs">
              <MapPin className="w-3 h-3" />
              Nashik Mandi, MH
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
            {marketPrices.map((item) => (
              <Card
                key={item.name}
                className="rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <CardContent className="p-4 space-y-2">
                  <div className="text-2xl">{item.emoji}</div>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                  <p className="text-xl font-bold">{item.price}</p>

                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${item.up
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.up ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {item.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ===== SUPPLY HEATMAP ===== */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Supply Heatmap</h3>
              <div className="flex gap-2">
                <Badge variant="outline">High</Badge>
                <Badge variant="outline">Low</Badge>
              </div>
            </div>

            {/* ===== SUPPLY HEATMAP ===== */}
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Supply Heatmap</h3>
                  <div className="flex gap-2">
                    <Badge className="bg-red-100 text-red-700">High</Badge>
                    <Badge className="bg-green-100 text-green-700">Low</Badge>
                  </div>
                </div>

                {/* MAP CONTAINER */}
                <div className="relative h-[420px] rounded-xl overflow-hidden border">
                  <SupplyHeatmap />

                  {/* Overlay Info */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm font-medium">
                      High supply detected in Satara region
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-white/90 backdrop-blur"
                      onClick={() => navigate("/buyer/logistics")}
                    >
                      Find Trucks
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </CardContent>
        </Card>

        {/* ===== SMART PICKS ===== */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Smart Picks</h3>
            <Badge className="bg-emerald-100 text-emerald-700">AI</Badge>
          </div>

          <div className="space-y-4">
            {smartPicks.map((pick) => (
              <Card
                key={pick.name}
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
        <section>
          <h3 className="text-lg font-semibold mb-4">Active Order</h3>
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
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
              <p className="text-sm font-medium">{activeOrder.eta}</p>
            </CardContent>
          </Card>
        </section>

        {/* ===== VOICE ACTION BUTTON ===== */}
        <div className="fixed bottom-20 right-6 z-50">
          <Button
            size="icon"
            className="rounded-full h-14 w-14 shadow-xl bg-emerald-600 hover:bg-emerald-700"
          >
            <Mic className="w-6 h-6 text-white" />
          </Button>
        </div>

      </div>
    </ResponsiveLayout>
  );
}
