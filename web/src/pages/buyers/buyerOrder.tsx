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
  const activeDeliveries: Delivery[] = [
    {
      id: "ORD-5020",
      product: "Organic Tomatoes",
      farmer: "Green Valley Farms",
      status: "in-transit",
      currentLocation: "Panipat",
      destination: "New Delhi",
      expectedDelivery: "17 Jan 2024",
      lastUpdate: "2 hours ago",
    },
  ];

  return (
    <ResponsiveLayout title="Delivery Tracking">
      <div className="space-y-6">
        {activeDeliveries.map((delivery) => (
          <Card key={delivery.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{delivery.id}</span>
                <Badge
                  className={
                    delivery.status === "delivered"
                      ? "status-success"
                      : "bg-blue-100 text-blue-700"
                  }
                >
                  {delivery.status === "delivered"
                    ? "Delivered"
                    : "In Transit"}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="border-b pb-4">
                <p className="text-sm text-muted-foreground">Product</p>
                <p className="font-semibold">{delivery.product}</p>
                <p className="text-sm text-muted-foreground">
                  From {delivery.farmer}
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <TrackingStep
                  title="Order Confirmed"
                  subtitle="Jan 14"
                  active
                />
                <TrackingStep
                  title="Dispatched"
                  subtitle="Jan 15"
                  active
                />
                <TrackingStep
                  title={`In Transit - ${delivery.currentLocation}`}
                  subtitle={delivery.lastUpdate}
                  active
                />
                <TrackingStep
                  title={`Delivery to ${delivery.destination}`}
                  subtitle={`Expected: ${delivery.expectedDelivery}`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ResponsiveLayout>
  );
}

function TrackingStep({
  title,
  subtitle,
  active = false,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full ${
            active ? "bg-emerald-600" : "bg-gray-300"
          }`}
        />
        <div
          className={`w-1 h-12 ${
            active ? "bg-emerald-200" : "bg-gray-200"
          }`}
        />
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}



/* ============ BUYER ORDERS ============ */
export function BuyerOrders() {
  const [filterStatus, setFilterStatus] =
    useState<"all" | "pending" | "completed">("all");

  const orders = [
    {
      id: "ORD-5021",
      farmer: "Kumar Farm Estate",
      product: "Basmati Rice",
      quantity: "50kg",
      total: 17250,
      status: "delivered",
      date: "15 Jan 2024",
    },
    {
      id: "ORD-5020",
      farmer: "Green Valley Farms",
      product: "Tomatoes",
      quantity: "25kg",
      total: 6000,
      status: "in-transit",
      date: "14 Jan 2024",
    },
    {
      id: "ORD-5019",
      farmer: "Punjab Harvest",
      product: "Wheat",
      quantity: "100 quintals",
      total: 21500,
      status: "processing",
      date: "13 Jan 2024",
    },
  ];

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") return o.status === "delivered";
    return o.status !== "delivered";
  });

  return (
    <ResponsiveLayout title="My Orders">
      <div className="space-y-6">
        <div className="flex gap-2">
          {(["all", "pending", "completed"] as const).map((status) => (
            <Badge
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilterStatus(status)}
            >
              {status.toUpperCase()}
            </Badge>
          ))}
        </div>

        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Badge>
                  {order.status.replace("-", " ").toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 border-y py-4">
                <Info label="Farmer" value={order.farmer} />
                <Info label="Product" value={order.product} />
                <Info label="Quantity" value={order.quantity} />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-emerald-600">
                  ₹{order.total.toLocaleString()}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/buyer/tracking")}
                >
                  Track Order
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ResponsiveLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}


/* ============ WISHLIST ============ */
export function BuyerWishlist() {
  const [wishlistItems, setWishlistItems] = useState([
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
  ]);

  const removeItem = (id: number) => {
    setWishlistItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <ResponsiveLayout title="Wishlist">
      <div className="space-y-6">
        {wishlistItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Your wishlist is empty
              </p>
            </CardContent>
          </Card>
        ) : (
          wishlistItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.farmer}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{item.rating}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">
                      ₹{item.price}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      /{item.unit}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Add to Cart</Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </ResponsiveLayout>
  );
}
