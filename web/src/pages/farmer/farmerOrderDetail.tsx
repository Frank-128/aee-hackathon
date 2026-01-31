import { useParams, useNavigate } from "react-router-dom";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, User, MessageCircle, Loader2 } from "lucide-react";
import { dealService } from "@/services/dealService";
import { useState, useEffect } from "react";

export default function FarmerOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await dealService.getMyDeals();
      const deals = response.data;
      const found = deals.find((d: any) => d._id === orderId);
      if (found) {
        setOrder(found);
      }
    } catch (e) {
      console.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ResponsiveLayout title="Order Details" showBack>
        <div className="flex justify-center p-8"><Loader2 className="animate-spin text-emerald-600" /></div>
      </ResponsiveLayout>
    )
  }

  if (!order) {
    return (
      <ResponsiveLayout title="Order Not Found" showBack>
        <p className="text-muted-foreground">
          This order does not exist or was removed.
        </p>
      </ResponsiveLayout>
    );
  }

  const buyerName = order.buyer?.name || order.buyerName || "Buyer";
  const buyerId = order.buyer?._id || order.buyer;

  return (
    <ResponsiveLayout title={`Order #${order._id.slice(-6).toUpperCase()}`} showBack>
      <div className="space-y-6">

        {/* Order Summary */}
        <Card>
          <CardContent className="flex items-center justify-between py-5">
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <Badge variant="outline" className="capitalize">
              {order.status}
            </Badge>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold text-primary">₹{order.totalAmount?.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Buyer Details */}
        <Card>
          <CardContent className="space-y-3 py-5">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="w-4 h-4" /> Buyer Details
            </h3>
            <p className="text-sm font-bold text-lg">{buyerName}</p>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                // Pass buyer info to messages
                navigate("/farmer/messages", { state: { farmerId: buyerId, farmerName: buyerName } }) // Reusing farmer message logic (might need adjustment if messages handles 'buyer' role specifically, but for now passing as target)
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
                <p className="font-medium">{order.cropName || order.crop?.name}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Quantity</p>
                <p className="font-medium">{order.quantity} {order.unit}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Price / Unit</p>
                <p className="font-medium">₹{order.pricePerUnit}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">₹{order.totalAmount?.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Details - Mock for now if not in deal */}
        <Card>
          <CardContent className="space-y-3 py-5">
            <h3 className="font-semibold flex items-center gap-2">
              <Truck className="w-4 h-4" /> Delivery Information
            </h3>

            <p className="text-sm">
              <span className="text-muted-foreground">Partner:</span>{" "}
              {order.deliveryPartner || "Standard Delivery"}
            </p>

            <p className="text-sm">
              <span className="text-muted-foreground">Expected Delivery:</span>{" "}
              {order.expectedDelivery || "3-5 Business Days"}
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
