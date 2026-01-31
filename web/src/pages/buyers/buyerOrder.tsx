import { useState, useEffect } from "react";

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
import { dealService } from "@/services/dealService";
import { toast } from "@/hooks/use-toast";

type Delivery = {
  id: string;
  product: string;
  farmer: string;
  status: string; // "in-transit" | "delivered" or others
  currentLocation: string;
  destination: string;
  expectedDelivery: string;
  lastUpdate: string;
};

/* ============ DELIVERY TRACKING ============ */
export function BuyerTracking() {
  const [activeDeliveries, setActiveDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await dealService.getMyDeals();
      const deals = res.data || [];
      // Filter active
      const activeDefaults = ['accepted', 'shipped', 'in-transit', 'pending'];
      const active = deals.filter((d: any) => activeDefaults.includes(d.status));

      const formatted = active.map((d: any) => ({
        id: `ORD-${d._id.slice(-4).toUpperCase()}`,
        product: d.cropName || d.crop?.name,
        farmer: d.farmerName || "Farmer",
        status: d.status === 'completed' ? 'delivered' : 'in-transit',
        currentLocation: "Processing Center", // Mock
        destination: "Your Location", // Mock
        expectedDelivery: new Date(new Date(d.createdAt).setDate(new Date(d.createdAt).getDate() + 5)).toLocaleDateString(),
        lastUpdate: "Today"
      }));
      setActiveDeliveries(formatted);
    } catch (e) {
      console.error("Failed to fetch tracking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Delivery Tracking">
      <div className="space-y-6">
        {activeDeliveries.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No active deliveries at the moment.
            </CardContent>
          </Card>
        ) : (
          activeDeliveries.map((delivery) => (
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
                  {(() => {
                    const getStepIndex = (status: string) => {
                      switch (status) {
                        case 'CREATED': return 0;
                        case 'CONFIRMED': return 1;
                        case 'IN_TRANSIT': return 2;
                        case 'DELIVERED': return 3;
                        case 'CANCELLED': return -1;
                        default: return 0;
                      }
                    };
                    const currentStep = getStepIndex(delivery.status);

                    return (
                      <>
                        <TrackingStep
                          title="Order Placed"
                          subtitle={new Date(new Date().setDate(new Date().getDate() - 2)).toLocaleDateString()} // Mock date
                          active={currentStep >= 0}
                        />
                        <TrackingStep
                          title="Confirmed"
                          subtitle="Order accepted by farmer"
                          active={currentStep >= 1}
                        />
                        <TrackingStep
                          title="In Transit"
                          subtitle={delivery.status === 'IN_TRANSIT' ? "On the way" : "Pending"}
                          active={currentStep >= 2}
                        />
                        <TrackingStep
                          title="Delivered"
                          subtitle={`Expected: ${delivery.expectedDelivery}`}
                          active={currentStep >= 3}
                        />
                      </>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          )))}
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
          className={`w-4 h-4 rounded-full ${active ? "bg-emerald-600" : "bg-gray-300"
            }`}
        />
        <div
          className={`w-1 h-12 ${active ? "bg-emerald-200" : "bg-gray-200"
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

  /*
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
    ...
  ];
  */

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await dealService.getMyDeals();
      const data = response.data || [];
      const formatted = Array.isArray(data) ? data.map((deal: any) => ({
        id: deal._id,
        farmer: deal.seller?.name || deal.farmerName || "Unknown Farmer",
        product: deal.crop?.name || deal.cropName || "Product", // Handle populated crop object
        quantity: `${deal.quantity} ${deal.unit || 'units'}`,
        total: deal.totalAmount || 0,
        status: deal.status, // pending, active, completed, cancelled
        date: new Date(deal.createdAt).toLocaleDateString(),
      })) : [];
      setOrders(formatted);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast({ title: "Error", description: "Failed to load orders", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "completed") return o.status === "completed" || o.status === "delivered";
    return o.status !== "completed" && o.status !== "delivered";
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
                {order.status === 'CREATED' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm("Are you sure you want to cancel this order?")) {
                        try {
                          await dealService.cancelDeal(order.id);
                          toast({ title: "Order Cancelled", description: "Your order has been cancelled." });
                          fetchOrders(); // Refresh list
                        } catch (err) {
                          toast({ title: "Error", description: "Failed to cancel order", variant: "destructive" });
                        }
                      }
                    }}
                  >
                    Cancel
                  </Button>
                )}
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
