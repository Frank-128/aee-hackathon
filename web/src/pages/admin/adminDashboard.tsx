import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Search,
  Edit,
  Trash2,
  Eye,
  Ban,
  MapPin,
  FileText,
  CreditCard,
  Megaphone,
} from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/* ============ ADMIN DASHBOARD ============ */
export function AdminDashboard() {
  const stats = {
    totalFarmers: 1250,
    totalBuyers: 5420,
    totalOrders: 24830,
    totalRevenue: 12450000,
    monthlyGrowth: 23.5,
  };

  const statCards = [
    {
      label: "Total Farmers",
      value: stats.totalFarmers,
      icon: "👨‍🌾",
      color: "bg-emerald-50",
    },
    {
      label: "Total Buyers",
      value: stats.totalBuyers,
      icon: "👥",
      color: "bg-blue-50",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: "📦",
      color: "bg-amber-50",
    },
    {
      label: "Total Revenue",
      value: `₹${(stats.totalRevenue / 100000).toFixed(0)}L`,
      icon: "💰",
      color: "bg-green-50",
    },
  ];

  const recentActivities = [
    { id: 1, type: "order", message: "New order ORD-9021 placed", time: "5 mins ago" },
    { id: 2, type: "user", message: "New farmer registered: Green Valley Farms", time: "15 mins ago" },
    { id: 3, type: "alert", message: "Payment dispute reported for ORD-9019", time: "1 hour ago" },
    { id: 4, type: "order", message: "Order ORD-9018 completed and delivered", time: "2 hours ago" },
  ];

  const pendingApprovals = [
    { id: 1, farmer: "New Harvest Co.", type: "New Farmer Registration", status: "pending" },
    { id: 2, product: "Organic Basmati", farmer: "Kumar Farm", type: "New Product Listing", status: "pending" },
  ];

  return (
    <ResponsiveLayout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="card-hover">
              <CardContent className={`p-6 ${stat.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    +{stats.monthlyGrowth}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">
                  {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activities & Pending Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="card-hover lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-3 border border-border rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-3 border border-amber-200 bg-amber-50 rounded-lg">
                    <p className="text-sm font-semibold">{item.type}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.farmer || item.product}
                    </p>
                    <Button size="sm" className="w-full mt-2">Review</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="text-sm">Manage Users</span>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
            <Package className="w-6 h-6" />
            <span className="text-sm">Products</span>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <span className="text-sm">Orders</span>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm">Analytics</span>
          </Button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ ANALYTICS ============ */
export function AdminAnalytics() {
  const analyticsMetrics = [
    { label: "Conversion Rate", value: "3.2%", change: "+0.5%" },
    { label: "Avg Order Value", value: "₹4,250", change: "+8%" },
    { label: "Customer Retention", value: "78%", change: "+2%" },
    { label: "Payment Success Rate", value: "99.2%", change: "+0.1%" },
  ];

  return (
    <ResponsiveLayout title="Analytics">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsMetrics.map((metric) => (
            <Card key={metric.label} className="card-hover">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                <p className="text-3xl font-bold mb-2">{metric.value}</p>
                <p className="text-xs text-emerald-600 font-semibold">{metric.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Platform Growth (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization would go here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ FARMERS MANAGEMENT ============ */
export function AdminFarmers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "pending" | "suspended">("all");

  const farmers = [
    {
      id: 1,
      name: "Kumar Farm Estate",
      location: "Punjab",
      status: "active",
      productsCount: 15,
      ordersCount: 240,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Green Valley Farms",
      location: "Haryana",
      status: "active",
      productsCount: 22,
      ordersCount: 185,
      rating: 4.6,
    },
    {
      id: 3,
      name: "New Harvest Co.",
      location: "Punjab",
      status: "pending",
      productsCount: 5,
      ordersCount: 12,
      rating: 4.3,
    },
  ];

  return (
    <ResponsiveLayout title="Manage Farmers">
      <div className="space-y-6">
        {/* Search & Filter */}
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2">
          {(["all", "active", "pending", "suspended"] as const).map((status) => (
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

        {/* Farmers Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Name</th>
                    <th className="text-left p-4 font-semibold text-sm">Location</th>
                    <th className="text-left p-4 font-semibold text-sm">Products</th>
                    <th className="text-left p-4 font-semibold text-sm">Orders</th>
                    <th className="text-left p-4 font-semibold text-sm">Rating</th>
                    <th className="text-left p-4 font-semibold text-sm">Status</th>
                    <th className="text-left p-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {farmers.map((farmer) => (
                    <tr key={farmer.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4">{farmer.name}</td>
                      <td className="p-4 text-muted-foreground">{farmer.location}</td>
                      <td className="p-4">{farmer.productsCount}</td>
                      <td className="p-4">{farmer.ordersCount}</td>
                      <td className="p-4">⭐ {farmer.rating}</td>
                      <td className="p-4">
                        <Badge className={
                          farmer.status === "active" ? "status-success" :
                          farmer.status === "pending" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }>
                          {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ BUYERS MANAGEMENT ============ */
export function AdminBuyers() {
  const buyers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      joinedDate: "2024-01-10",
      orders: 12,
      spent: 145000,
      status: "active",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@example.com",
      joinedDate: "2024-01-05",
      orders: 8,
      spent: 95000,
      status: "active",
    },
  ];

  return (
    <ResponsiveLayout title="Manage Buyers">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search buyers..." className="pl-10" />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Name</th>
                    <th className="text-left p-4 font-semibold text-sm">Email</th>
                    <th className="text-left p-4 font-semibold text-sm">Orders</th>
                    <th className="text-left p-4 font-semibold text-sm">Total Spent</th>
                    <th className="text-left p-4 font-semibold text-sm">Joined</th>
                    <th className="text-left p-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buyers.map((buyer) => (
                    <tr key={buyer.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-semibold">{buyer.name}</td>
                      <td className="p-4 text-muted-foreground text-sm">{buyer.email}</td>
                      <td className="p-4">{buyer.orders}</td>
                      <td className="p-4">₹{buyer.spent.toLocaleString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{buyer.joinedDate}</td>
                      <td className="p-4 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ PRODUCTS MANAGEMENT ============ */
export function AdminProducts() {
  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      farmer: "Kumar Farm Estate",
      quantity: 500,
      status: "active",
      price: 3450,
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farms",
      quantity: 1200,
      status: "active",
      price: 24,
    },
    {
      id: 3,
      name: "Fresh Wheat",
      farmer: "Punjab Harvest",
      quantity: 800,
      status: "active",
      price: 2150,
    },
  ];

  return (
    <ResponsiveLayout title="Products">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Product Name</th>
                    <th className="text-left p-4 font-semibold text-sm">Farmer</th>
                    <th className="text-left p-4 font-semibold text-sm">Quantity</th>
                    <th className="text-left p-4 font-semibold text-sm">Price</th>
                    <th className="text-left p-4 font-semibold text-sm">Status</th>
                    <th className="text-left p-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-semibold">{product.name}</td>
                      <td className="p-4 text-muted-foreground text-sm">{product.farmer}</td>
                      <td className="p-4">{product.quantity}</td>
                      <td className="p-4">₹{product.price.toLocaleString()}</td>
                      <td className="p-4">
                        <Badge className="status-success">{product.status}</Badge>
                      </td>
                      <td className="p-4 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ LISTINGS APPROVAL ============ */
export function AdminListings() {
  const pendingListings = [
    {
      id: 1,
      farmer: "New Harvest Co.",
      product: "Organic Wheat",
      quantity: 500,
      price: 2300,
      submittedDate: "2024-01-15",
    },
    {
      id: 2,
      farmer: "Kumar Farm Estate",
      product: "Premium Rice",
      quantity: 1000,
      price: 3600,
      submittedDate: "2024-01-14",
    },
  ];

  return (
    <ResponsiveLayout title="Listings Approval">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approval</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingListings.map((listing) => (
              <div key={listing.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{listing.product}</p>
                    <p className="text-sm text-muted-foreground">{listing.farmer}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{listing.submittedDate}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 border-y border-border mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Quantity</p>
                    <p className="font-semibold">{listing.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-semibold">₹{listing.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button className="flex-1" variant="destructive">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ ORDERS MANAGEMENT ============ */
export function AdminOrders() {
  const orders = [
    {
      id: "ORD-9021",
      buyer: "Rajesh Kumar",
      farmer: "Kumar Farm Estate",
      amount: 34500,
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "ORD-9020",
      buyer: "Priya Singh",
      farmer: "Green Valley Farms",
      amount: 14400,
      status: "processing",
      date: "2024-01-14",
    },
  ];

  return (
    <ResponsiveLayout title="Orders">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Order ID</th>
                    <th className="text-left p-4 font-semibold text-sm">Buyer</th>
                    <th className="text-left p-4 font-semibold text-sm">Farmer</th>
                    <th className="text-left p-4 font-semibold text-sm">Amount</th>
                    <th className="text-left p-4 font-semibold text-sm">Status</th>
                    <th className="text-left p-4 font-semibold text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-semibold">{order.id}</td>
                      <td className="p-4">{order.buyer}</td>
                      <td className="p-4">{order.farmer}</td>
                      <td className="p-4">₹{order.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <Badge className={order.status === "completed" ? "status-success" : "bg-amber-100 text-amber-700"}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ PAYMENTS ============ */
export function AdminPayments() {
  const payments = [
    {
      id: 1,
      orderId: "ORD-9021",
      amount: 34500,
      status: "completed",
      method: "Bank Transfer",
      date: "2024-01-15",
    },
    {
      id: 2,
      orderId: "ORD-9020",
      amount: 14400,
      status: "pending",
      method: "UPI",
      date: "2024-01-14",
    },
  ];

  return (
    <ResponsiveLayout title="Payments">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Order ID</th>
                    <th className="text-left p-4 font-semibold text-sm">Amount</th>
                    <th className="text-left p-4 font-semibold text-sm">Method</th>
                    <th className="text-left p-4 font-semibold text-sm">Status</th>
                    <th className="text-left p-4 font-semibold text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-semibold">{payment.orderId}</td>
                      <td className="p-4">₹{payment.amount.toLocaleString()}</td>
                      <td className="p-4">{payment.method}</td>
                      <td className="p-4">
                        <Badge className={payment.status === "completed" ? "status-success" : "bg-amber-100 text-amber-700"}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ INVOICES ============ */
export function AdminInvoices() {
  const invoices = [
    {
      id: "INV-2024-001",
      orderId: "ORD-9021",
      amount: 34500,
      date: "2024-01-15",
      status: "sent",
    },
    {
      id: "INV-2024-002",
      orderId: "ORD-9020",
      amount: 14400,
      date: "2024-01-14",
      status: "draft",
    },
  ];

  return (
    <ResponsiveLayout title="Invoices">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Invoice ID</th>
                    <th className="text-left p-4 font-semibold text-sm">Order ID</th>
                    <th className="text-left p-4 font-semibold text-sm">Amount</th>
                    <th className="text-left p-4 font-semibold text-sm">Date</th>
                    <th className="text-left p-4 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-semibold">{invoice.id}</td>
                      <td className="p-4">{invoice.orderId}</td>
                      <td className="p-4">₹{invoice.amount.toLocaleString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{invoice.date}</td>
                      <td className="p-4">
                        <Badge className={invoice.status === "sent" ? "status-success" : "bg-gray-100 text-gray-700"}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ DISPUTES ============ */
export function AdminDisputes() {
  const disputes = [
    {
      id: "DIS-001",
      orderId: "ORD-9019",
      buyer: "Rajesh Kumar",
      farmer: "Kumar Farm Estate",
      issue: "Quality complaint",
      status: "open",
      date: "2024-01-13",
    },
    {
      id: "DIS-002",
      orderId: "ORD-9018",
      buyer: "Priya Singh",
      farmer: "Green Valley Farms",
      issue: "Late delivery",
      status: "resolved",
      date: "2024-01-10",
    },
  ];

  return (
    <ResponsiveLayout title="Disputes">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Dispute ID</th>
                    <th className="text-left p-4 font-semibold text-sm">Order ID</th>
                    <th className="text-left p-4 font-semibold text-sm">Issue</th>
                    <th className="text-left p-4 font-semibold text-sm">Status</th>
                    <th className="text-left p-4 font-semibold text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {disputes.map((dispute) => (
                    <tr key={dispute.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-semibold">{dispute.id}</td>
                      <td className="p-4">{dispute.orderId}</td>
                      <td className="p-4">{dispute.issue}</td>
                      <td className="p-4">
                        <Badge className={dispute.status === "resolved" ? "status-success" : "bg-red-100 text-red-700"}>
                          {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{dispute.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ VERIFICATIONS ============ */
export function AdminVerifications() {
  const pendingVerifications = [
    {
      id: 1,
      type: "Farmer",
      name: "New Harvest Co.",
      email: "newharvest@example.com",
      submittedDate: "2024-01-15",
      documents: "Land document, ID proof",
    },
    {
      id: 2,
      type: "Buyer",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      submittedDate: "2024-01-14",
      documents: "ID proof, Address proof",
    },
  ];

  return (
    <ResponsiveLayout title="User Verification">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingVerifications.map((verification) => (
              <div key={verification.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge className="mb-2">{verification.type}</Badge>
                    <p className="font-semibold">{verification.name}</p>
                    <p className="text-sm text-muted-foreground">{verification.email}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{verification.submittedDate}</p>
                </div>

                <div className="py-3 border-y border-border mb-3">
                  <p className="text-sm text-muted-foreground mb-1">Documents</p>
                  <p className="text-sm">{verification.documents}</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button className="flex-1" variant="destructive">
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}