import { useState } from "react";

import {
  Star,
  Heart,
  X,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ================= DELIVERY TRACKING ================= */

type Delivery = {
  id: string;
  product: string;
  farmer: string;
  status: "in-transit" | "delivered";
  currentLocation: string;
  destination: string;
  expectedDelivery: string;
  lastUpdate: string;
};

/* ============ DELIVERY TRACKING ============ */
export function BuyerTracking() {
  const activeDeliveries = [
    {
      id: "ORD-5020",
      product: "Organic Tomatoes",
      farmer: "Green Valley Farms",
      status: "in-transit",
      currentLocation: "Panipat",
      destination: "New Delhi",
      expectedDelivery: "2024-01-17",
      lastUpdate: "2 hours ago",
    },
  ];

  return (
    <ResponsiveLayout title="Delivery Tracking">
      <div className="space-y-6">
        {activeDeliveries.map((delivery) => (
          <Card key={delivery.id} className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{delivery.id}</span>
                <Badge className="bg-blue-100 text-blue-700">In Transit</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Info */}
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Product</p>
                <p className="font-semibold">{delivery.product}</p>
                <p className="text-sm text-muted-foreground">From {delivery.farmer}</p>
              </div>

              {/* Tracking Steps */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
                    <div className="w-1 h-12 bg-emerald-200"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Order Confirmed</p>
                    <p className="text-xs text-muted-foreground">Jan 14</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
                    <div className="w-1 h-12 bg-emerald-200"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Dispatched</p>
                    <p className="text-xs text-muted-foreground">Jan 15</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
                    <div className="w-1 h-12 bg-gray-200"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">In Transit - {delivery.currentLocation}</p>
                    <p className="text-xs text-muted-foreground">{delivery.lastUpdate}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Delivery to {delivery.destination}</p>
                    <p className="text-xs text-muted-foreground">Expected: {delivery.expectedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ResponsiveLayout>
  );
}

/* ============ BUYER ORDERS ============ */
export function BuyerOrders() {
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");

  const orders = [
    {
      id: "ORD-5021",
      farmer: "Kumar Farm Estate",
      product: "Basmati Rice",
      quantity: "50kg",
      total: 17250,
      status: "delivered",
      date: "2024-01-15",
    },
    {
      id: "ORD-5020",
      farmer: "Green Valley Farms",
      product: "Tomatoes",
      quantity: "25kg",
      total: 6000,
      status: "in-transit",
      date: "2024-01-14",
    },
    {
      id: "ORD-5019",
      farmer: "Punjab Harvest",
      product: "Wheat",
      quantity: "100 quintals",
      total: 21500,
      status: "processing",
      date: "2024-01-13",
    },
  ];

  return (
    <ResponsiveLayout title="My Orders">
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex gap-2">
          {(["all", "pending", "completed"] as const).map((status) => (
            <Badge
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge className={
                    order.status === "delivered" ? "status-success" :
                    order.status === "in-transit" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Farmer</p>
                    <p className="font-semibold">{order.farmer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="font-semibold">{order.product}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-semibold">{order.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-emerald-600">₹{order.total.toLocaleString()}</p>
                  <Button variant="outline" size="sm">Track Order</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ WISHLIST ============ */
export function BuyerWishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      farmer: "Kumar Farm Estate",
      price: 3450,
      unit: "kg",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Organic Wheat",
      farmer: "Punjab Harvest",
      price: 2150,
      unit: "quintal",
      rating: 4.7,
    },
  ];

  return (
    <ResponsiveLayout title="Wishlist">
      <div className="space-y-6">
        {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.farmer}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{item.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">₹{item.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">/{item.unit}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">Add to Cart</Button>
                    <Button variant="outline" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No items in wishlist</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ResponsiveLayout>
  );
}