import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FarmerOrders() {
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "processing" | "in-transit" | "completed"
  >("all");

  const orders = [
    {
      id: "ORD-9021",
      buyer: "FreshMart Exports",
      product: "Basmati Rice",
      quantity: 500,
      unit: "kg",
      amount: 34500,
      status: "in-transit",
      date: "2024-01-15",
    },
    {
      id: "ORD-9020",
      buyer: "Local Wholesaler",
      product: "Tomatoes",
      quantity: 600,
      unit: "kg",
      amount: 14400,
      status: "processing",
      date: "2024-01-14",
    },
    {
      id: "ORD-9019",
      buyer: "AgriLogistics",
      product: "Wheat",
      quantity: 800,
      unit: "quintal",
      amount: 17200,
      status: "completed",
      date: "2024-01-13",
    },
  ];

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <ResponsiveLayout title="Orders">
      <div className="space-y-6">

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "processing", "in-transit", "completed"] as const).map(
            (status) => (
              <Badge
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterStatus(status)}
              >
                {status.replace("-", " ").toUpperCase()}
              </Badge>
            )
          )}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="card-hover">
              <CardContent className="p-6">

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.date}
                    </p>
                  </div>

                  <Badge
                    className={
                      order.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.status === "in-transit"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  >
                    {order.status.replace("-", " ")}
                  </Badge>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Buyer</p>
                    <p className="font-semibold">{order.buyer}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Product</p>
                    <p className="font-semibold">{order.product}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-semibold">
                      {order.quantity} {order.unit}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-emerald-600">
                    ₹{order.amount.toLocaleString()}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`/farmer/orders/${order.id}`)
                    }
                  >
                    View Details
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
