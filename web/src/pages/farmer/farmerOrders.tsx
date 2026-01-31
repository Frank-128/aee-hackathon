import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dealService } from "@/services/dealService";
import { Deal, DealStatus } from "@/types";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function FarmerOrders() {
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<"all" | DealStatus>("all");
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const response = await dealService.getMyDeals();
      const dealsData = response.data as Deal[];
      setDeals(dealsData);
    } catch (error: any) {
      console.error("Failed to load deals:", error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredDeals =
    filterStatus === "all"
      ? deals
      : deals.filter((d) => d.status === filterStatus);

  const getStatusColor = (status: DealStatus) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "active":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <ResponsiveLayout title="Orders">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout title="Orders">
      <div className="space-y-6">

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "active", "completed", "cancelled"] as const).map(
            (status) => (
              <Badge
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterStatus(status)}
              >
                {status.toUpperCase()}
              </Badge>
            )
          )}
        </div>

        {/* Orders List */}
        {filteredDeals.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <p className="text-lg mb-2">No orders found</p>
              <p className="text-sm">
                {filterStatus === "all"
                  ? "You don't have any orders yet."
                  : `No ${filterStatus} orders found.`}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <Card key={deal._id} className="card-hover">
                <CardContent className="p-6">

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold">Order #{deal._id.slice(-6).toUpperCase()}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(deal.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Badge className={getStatusColor(deal.status)}>
                      {deal.status}
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-border mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Buyer</p>
                      <p className="font-semibold">{deal.buyerName || "Buyer"}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Product</p>
                      <p className="font-semibold">{deal.cropName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-semibold">
                        {deal.quantity} {deal.unit}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        ₹{deal.totalPrice.toLocaleString()}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/farmer/orders/${deal._id}`)
                      }
                    >
                      View Details
                    </Button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ResponsiveLayout>
  );
}
