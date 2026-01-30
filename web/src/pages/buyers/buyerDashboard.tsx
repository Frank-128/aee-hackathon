import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  MessageCircle,
  MapPin,
  Star,
  Truck,
  FileText,
  AlertCircle,
  TrendingUp,
  Filter,
  X,
  Plus,
  Check,
} from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/* ============ BUYER DASHBOARD ============ */
export function BuyerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = {
    recentPurchases: 12,
    totalSpent: 145000,
    savedItems: 8,
    activeOrders: 3,
  };

  const quickStats = [
    { label: "Total Spent", value: `₹${(stats.totalSpent / 1000).toFixed(0)}K`, color: "bg-emerald-50" },
    { label: "Orders Placed", value: stats.recentPurchases, color: "bg-blue-50" },
    { label: "Saved Items", value: stats.savedItems, color: "bg-pink-50" },
    { label: "Active Orders", value: stats.activeOrders, color: "bg-amber-50" },
  ];

  const recentOrders = [
    {
      id: "ORD-5021",
      farmer: "Kumar Farm Estate",
      product: "Premium Basmati Rice",
      quantity: "50kg",
      total: 17250,
      status: "delivered",
      date: "2024-01-15",
    },
    {
      id: "ORD-5020",
      farmer: "Green Valley Farms",
      product: "Organic Tomatoes",
      quantity: "25kg",
      total: 6000,
      status: "in-transit",
      date: "2024-01-14",
    },
  ];

  const featuredFarmers = [
    { id: 1, name: "Kumar Farm Estate", rating: 4.8, products: 15, reviews: 240 },
    { id: 2, name: "Green Valley Farms", rating: 4.6, products: 22, reviews: 185 },
    { id: 3, name: "Organic Harvest Co.", rating: 4.9, products: 18, reviews: 312 },
  ];

  return (
    <ResponsiveLayout title="Marketplace">
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search crops, farmers..."
            className="pl-10 h-12"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="card-hover">
              <CardContent className={`p-6 ${stat.color}`}>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                Recent Orders
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/buyer/orders">View All</a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.farmer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{order.product} • {order.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">₹{order.total.toLocaleString()}</p>
                  <Badge className={
                    order.status === "delivered" ? "status-success" : "bg-blue-100 text-blue-700"
                  }>
                    {order.status === "delivered" ? "Delivered" : "In Transit"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Featured Farmers */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Featured Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredFarmers.map((farmer) => (
                <div key={farmer.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <p className="font-semibold mb-2">{farmer.name}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{farmer.rating}</span>
                      <span className="text-xs text-muted-foreground">({farmer.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{farmer.products} active products</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => navigate("/buyer/market")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <Search className="w-6 h-6" />
            <span className="text-sm">Explore Market</span>
          </Button>
          <Button
            onClick={() => navigate("/buyer/orders")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-sm">My Orders</span>
          </Button>
          <Button
            onClick={() => navigate("/buyer/wishlist")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <Heart className="w-6 h-6" />
            <span className="text-sm">Wishlist</span>
          </Button>
          <Button
            onClick={() => navigate("/buyer/farmers")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-sm">Find Farmers</span>
          </Button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}







