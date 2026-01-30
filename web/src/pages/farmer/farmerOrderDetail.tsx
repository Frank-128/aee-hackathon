import { useParams, useNavigate } from "react-router-dom";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, User, MessageCircle } from "lucide-react";

export default function FarmerOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orders = [
    {
      id: "ORD-9021",
      date: "2024-01-15",
      status: "in-transit",
      buyer: "FreshMart Exports",
      product: "Basmati Rice",
      quantity: "500 kg",
      pricePerKg: 69,
      total: 34500,
      deliveryPartner: "AgriTrans Logistics",
      expectedDelivery: "2024-01-18",
    },
    {
      id: "ORD-9020",
      date: "2024-01-14",
      status: "processing",
      buyer: "Local Wholesaler",
      product: "Tomatoes",
      quantity: "600 kg",
      pricePerKg: 24,
      total: 14400,
      deliveryPartner: "Local Pickup",
      expectedDelivery: "2024-01-16",
    },
  ];

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <ResponsiveLayout title="Order Not Found" showBack>
        <p className="text-muted-foreground">
          This order does not exist or was removed.
        </p>
      </ResponsiveLayout>
    );
  }


  return (
    <ResponsiveLayout title={`Order ${order.id}`} showBack>
      <div className="space-y-6">

        {/* Order Summary */}
        <Card>
          <CardContent className="flex items-center justify-between py-5">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{order.date}</p>
            </div>

            <Badge variant="outline" className="capitalize">
              {order.status}
            </Badge>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold text-primary">₹{order.total}</p>
            </div>
          </CardContent>
        </Card>

        {/* Buyer Details */}
        <Card>
          <CardContent className="space-y-3 py-5">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="w-4 h-4" /> Buyer Details
            </h3>
            <p className="text-sm">{order.buyer}</p>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                navigate(`/farmer/messages?orderId=${order.id}`)
              }
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Message Buyer
            </Button>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card>
          <CardContent className="space-y-4 py-5">
            <h3 className="font-semibold flex items-center gap-2">
              <Package className="w-4 h-4" /> Product Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Product</p>
                <p className="font-medium">{order.product}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Quantity</p>
                <p className="font-medium">{order.quantity}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Price / kg</p>
                <p className="font-medium">₹{order.pricePerKg}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">₹{order.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Details */}
        <Card>
          <CardContent className="space-y-3 py-5">
            <h3 className="font-semibold flex items-center gap-2">
              <Truck className="w-4 h-4" /> Delivery Information
            </h3>

            <p className="text-sm">
              <span className="text-muted-foreground">Partner:</span>{" "}
              {order.deliveryPartner}
            </p>

            <p className="text-sm">
              <span className="text-muted-foreground">Expected Delivery:</span>{" "}
              {order.expectedDelivery}
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="default">Update Status</Button>
          <Button variant="outline">Download Invoice</Button>
        </div>

      </div>
    </ResponsiveLayout>
  );
}
