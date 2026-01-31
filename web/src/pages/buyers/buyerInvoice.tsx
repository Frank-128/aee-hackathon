import { useState } from "react";

import {
  Eye,
  Download,
  CreditCard,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ============ BUYER INVOICES ============ */

type InvoiceItem = {
  name: string;
  quantity: string;
  price: number;
  total: number;
};

type Invoice = {
  id: string;
  orderId: string;
  farmer: string;
  date: string;
  dueDate: string;
  amount: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue";
  items: InvoiceItem[];
};

/* ============ BUYER INVOICES ============ */
export default function BuyerInvoices() {
  const [filterStatus, setFilterStatus] = useState("all");

  const invoices = [
    {
      id: "INV-2024-5021",
      orderId: "ORD-5021",
      farmer: "Kumar Farm Estate",
      date: "2024-01-30",
      dueDate: "2024-02-14",
      amount: 17250,
      tax: 863,
      total: 18113,
      status: "paid",
      items: [
        { name: "Premium Basmati Rice", quantity: "50kg", price: 345, total: 17250 },
      ],
    },
    {
      id: "INV-2024-5020",
      orderId: "ORD-5020",
      farmer: "Green Valley Farms",
      date: "2024-01-29",
      dueDate: "2024-02-13",
      amount: 6000,
      tax: 300,
      total: 6300,
      status: "paid",
      items: [
        { name: "Organic Tomatoes", quantity: "25kg", price: 240, total: 6000 },
      ],
    },
    {
      id: "INV-2024-5019",
      orderId: "ORD-5019",
      farmer: "Punjab Harvest",
      date: "2024-01-28",
      dueDate: "2024-02-12",
      amount: 21500,
      tax: 1075,
      total: 22575,
      status: "pending",
      items: [
        { name: "Fresh Wheat", quantity: "100 quintals", price: 2150, total: 21500 },
      ],
    },
  ];

  const filteredInvoices =
    filterStatus === "all"
      ? invoices
      : invoices.filter((inv) => inv.status === filterStatus);

  return (
    <ResponsiveLayout title="Invoices">
      <div className="space-y-6">
        {/* Filter Badges */}
        <div className="flex gap-2">
          {["all", "paid", "pending", "overdue"].map((status) => (
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
              <p className="text-3xl font-bold text-emerald-600">₹24.4K</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-600">₹22.6K</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Total Invoices</p>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices List */}
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{invoice.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Order: {invoice.orderId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Farmer: {invoice.farmer}
                    </p>
                  </div>
                  <Badge
                    className={
                      invoice.status === "paid"
                        ? "status-success"
                        : "bg-amber-100 text-amber-700"
                    }
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </div>

                <div className="border-t border-b border-border py-4 mb-4">
                  {invoice.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between mb-2">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-semibold">₹{item.total.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{invoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span>₹{invoice.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                    <span>Total</span>
                    <span className="text-emerald-600">
                      ₹{invoice.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Issue Date</p>
                    <p className="font-semibold">{invoice.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-semibold">{invoice.dueDate}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  {invoice.status === "pending" && (
                    <Button size="sm" className="gap-2 ml-auto">
                      <CreditCard className="w-4 h-4" />
                      Pay Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}