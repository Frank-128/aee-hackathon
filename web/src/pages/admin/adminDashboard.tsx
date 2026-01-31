import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  ShoppingBag,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  AlertCircle,
  Package,
  FileText,
  Scale,
  Filter,
  Download,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  UserX,
  Shield,
  Star,
  Truck,
  CreditCard,
  Activity,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/adminService";
import { toast } from "@/hooks/use-toast";

/* ============ ADMIN DASHBOARD ============ */
export function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalBuyers: 0,
    activeListings: 0,
    totalOrders: 0,
    revenue: 0,
    pendingVerifications: 0,
    activeDisputes: 0,
    successRate: 0,
  });

  React.useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminService.getAnalytics();
      const data = response.data;
      if (data) {
        setStats({
          totalFarmers: data.totalFarmers || 0,
          totalBuyers: data.totalBuyers || 0,
          activeListings: 0, // Not in API yet
          totalOrders: data.totalDeals || 0,
          revenue: data.totalRevenue || 0,
          pendingVerifications: 0,
          activeDisputes: 0,
          successRate: 98,
        });
      }
    } catch (error) {
      console.error("Failed to load admin stats", error);
      toast({ title: "Error", description: "Failed to load dashboard stats", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const quickStats = [
    {
      label: "Total Revenue",
      value: `₹${(stats.revenue / 10000000).toFixed(1)}Cr`,
      change: "+12.5%",
      trend: "up",
      color: "bg-emerald-50",
      icon: DollarSign,
      iconColor: "text-emerald-600",
    },
    {
      label: "Active Users",
      value: stats.totalFarmers + stats.totalBuyers,
      change: "+8.2%",
      trend: "up",
      color: "bg-blue-50",
      icon: Users,
      iconColor: "text-blue-600",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: "+15.3%",
      trend: "up",
      color: "bg-purple-50",
      icon: ShoppingBag,
      iconColor: "text-purple-600",
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      change: "+2.1%",
      trend: "up",
      color: "bg-amber-50",
      icon: TrendingUp,
      iconColor: "text-amber-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "order",
      title: "New bulk order placed",
      description: "500kg Basmati Rice by Kumar Traders",
      time: "5 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "verification",
      title: "Farmer verification pending",
      description: "Rajesh Kumar from Punjab",
      time: "12 minutes ago",
      status: "pending",
    },
    {
      id: 3,
      type: "dispute",
      title: "Dispute raised",
      description: "Quality issue reported by buyer",
      time: "1 hour ago",
      status: "warning",
    },
    {
      id: 4,
      type: "payment",
      title: "Payment processed",
      description: "₹45,000 to Green Valley Farms",
      time: "2 hours ago",
      status: "success",
    },
  ];

  const pendingActions = [
    {
      id: 1,
      title: "Pending Verifications",
      count: stats.pendingVerifications,
      action: "Review",
      route: "/admin/verifications",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      title: "Active Disputes",
      count: stats.activeDisputes,
      action: "Resolve",
      route: "/admin/disputes",
      color: "bg-red-100 text-red-700",
    },
    {
      id: 3,
      title: "Pending Payments",
      count: 23,
      action: "Process",
      route: "/admin/payments",
      color: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <ResponsiveLayout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="card-hover overflow-hidden">
              <CardContent className={`p-6 ${stat.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm font-semibold text-emerald-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Actions */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => navigate(action.route)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{action.title}</p>
                    <Badge className={action.color}>{action.count}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {action.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Recent Activity
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 border border-border rounded-lg"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.status === "success"
                    ? "bg-emerald-100"
                    : activity.status === "warning"
                      ? "bg-amber-100"
                      : "bg-blue-100"
                    }`}
                >
                  {activity.status === "success" ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : activity.status === "warning" ? (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => navigate("/admin/analytics")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm">Analytics</span>
          </Button>
          <Button
            onClick={() => navigate("/admin/farmers")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <Users className="w-6 h-6" />
            <span className="text-sm">Farmers</span>
          </Button>
          <Button
            onClick={() => navigate("/admin/orders")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-sm">Orders</span>
          </Button>
          <Button
            onClick={() => navigate("/admin/payments")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-sm">Payments</span>
          </Button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ ADMIN ANALYTICS ============ */
export function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("7d");

  /*
  const analyticsData = {
     ...
  };
  */

  const [analyticsData, setAnalyticsData] = useState({
    revenue: {
      total: 0,
      growth: 12.5, // Mock
      chartData: [
        { day: "Mon", value: 520000 },
        { day: "Tue", value: 680000 },
        { day: "Wed", value: 590000 },
        { day: "Thu", value: 750000 },
        { day: "Fri", value: 820000 },
        { day: "Sat", value: 710000 },
        { day: "Sun", value: 640000 },
      ],
    },
    orders: {
      total: 0,
      completed: 0,
      pending: 0,
      cancelled: 0,
    },
    userGrowth: {
      farmers: { total: 0, newThisWeek: 45 },
      buyers: { total: 0, newThisWeek: 32 },
    },
    topProducts: [
      { name: "Basmati Rice", quantity: "12,500 kg", revenue: 8540000 },
      { name: "Wheat", quantity: "45,000 kg", revenue: 7890000 },
      { name: "Tomatoes", quantity: "8,900 kg", revenue: 4560000 },
      { name: "Onions", quantity: "15,600 kg", revenue: 3890000 },
    ],
    regionalData: [
      { region: "Punjab", orders: 2340, revenue: 12450000 },
      { region: "Haryana", orders: 1890, revenue: 9870000 },
      { region: "Uttar Pradesh", orders: 1670, revenue: 8560000 },
      { region: "Maharashtra", orders: 1450, revenue: 7340000 },
    ],
  });

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await adminService.getAnalytics();
        const data = response.data;
        if (data) {
          setAnalyticsData(prev => ({
            ...prev,
            revenue: { ...prev.revenue, total: data.totalRevenue || 0 },
            orders: {
              total: data.totalDeals || 0,
              completed: data.completedDeals || 0,
              pending: data.activeDeals || 0, // Assuming active matches pending roughly
              cancelled: 0 // Mock
            },
            userGrowth: {
              farmers: { ...prev.userGrowth.farmers, total: data.totalFarmers || 0 },
              buyers: { ...prev.userGrowth.buyers, total: data.totalBuyers || 0 }
            }
          }));
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <ResponsiveLayout title="Analytics">
      <div className="space-y-8">
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {["24h", "7d", "30d", "90d"].map((range) => (
            <Badge
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Badge>
          ))}
        </div>

        {/* Revenue Chart */}
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">
                  ₹{(analyticsData.revenue.total / 10000000).toFixed(1)}Cr
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  +{analyticsData.revenue.growth}% from last week
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {analyticsData.revenue.chartData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted rounded-t-lg relative group cursor-pointer">
                    <div
                      className="w-full bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600"
                      style={{
                        height: `${(data.value / 900000) * 100}%`,
                        minHeight: "40px",
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ₹{(data.value / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {data.day}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-3xl font-bold">{analyticsData.orders.total.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-bold text-emerald-600">
                {analyticsData.orders.completed.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-600">
                {analyticsData.orders.pending}
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-red-50">
              <p className="text-sm text-muted-foreground mb-1">Cancelled</p>
              <p className="text-3xl font-bold text-red-600">
                {analyticsData.orders.cancelled}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">
                      ₹{(product.revenue / 100000).toFixed(1)}L
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.regionalData.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold">{region.region}</p>
                      <p className="text-sm text-muted-foreground">
                        {region.orders} orders
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-emerald-600">
                    ₹{(region.revenue / 100000).toFixed(1)}L
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ ADMIN FARMERS ============ */
export function AdminFarmers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  /*
  const farmers = [
    ...
  ];
  */

  const [farmers, setFarmers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await adminService.getUsers();
      const users = response.data || [];
      const farmerList = users.filter((u: any) => u.role?.toUpperCase() === 'FARMER').map((u: any) => ({
        id: u._id,
        name: u.name,
        location: u.city ? `${u.city}, ${u.state || ''}` : "Unknown Location",
        phone: u.phone || "N/A",
        email: u.email,
        status: u.status || "active",
        rating: 0, // Mock for now
        totalListings: 0, // Mock
        totalSales: 0, // Mock
        joinedDate: new Date(u.createdAt).toLocaleDateString(),
        crops: [], // Mock
      }));
      setFarmers(farmerList);
    } catch (error) {
      console.error("Failed to fetch farmers", error);
      toast({ title: "Error", description: "Failed to load farmers", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Farmers Management">
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "verified", "pending", "suspended"].map((status) => (
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
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Total Farmers</p>
              <p className="text-3xl font-bold">{farmers.length}</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Active</p>
              <p className="text-3xl font-bold text-emerald-600">
                {farmers.filter(f => f.status === 'active' || f.status === 'verified').length}
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-600">
                {farmers.filter(f => f.status === 'pending').length}
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-red-50">
              <p className="text-sm text-muted-foreground mb-1">Suspended</p>
              <p className="text-3xl font-bold text-red-600">
                {farmers.filter(f => f.status === 'suspended').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Farmers List */}
        <div className="space-y-4">
          {farmers.map((farmer) => (
            <Card key={farmer.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-xl">
                      {farmer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{farmer.name}</h3>
                        {farmer.status === "verified" && (
                          <UserCheck className="w-5 h-5 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {farmer.location}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {farmer.phone}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {farmer.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      farmer.status === "verified"
                        ? "status-success"
                        : farmer.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }
                  >
                    {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    {farmer.rating > 0 ? (
                      <p className="font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {farmer.rating}
                      </p>
                    ) : (
                      <p className="font-semibold">N/A</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Listings</p>
                    <p className="font-semibold">{farmer.totalListings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="font-semibold text-emerald-600">
                      ₹{(farmer.totalSales / 100000).toFixed(1)}L
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-semibold">{farmer.joinedDate}</p>
                  </div>
                </div>

                {farmer.crops.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Crops:</p>
                    <div className="flex flex-wrap gap-2">
                      {farmer.crops.map((crop) => (
                        <Badge key={crop} variant="outline">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  {farmer.status === "pending" && (
                    <Button size="sm" className="gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Verify
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="gap-2 text-red-600">
                    <XCircle className="w-4 h-4" />
                    Suspend
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

/* ============ ADMIN BUYERS ============ */
export function AdminBuyers() {
  const [searchTerm, setSearchTerm] = useState("");

  /*
  const buyers = [
    ...
  ];
  */

  const [buyers, setBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const response = await adminService.getUsers();
      const users = response.data || [];
      const buyerList = users.filter((u: any) => u.role?.toUpperCase() === 'BUYER').map((u: any) => ({
        id: u._id,
        name: u.name,
        type: "Business", // Mock
        location: u.city ? `${u.city}` : "Unknown",
        phone: u.phone || "N/A",
        email: u.email,
        status: u.status || "active",
        totalOrders: 0, // Mock
        totalSpent: 0, // Mock
        joinedDate: new Date(u.createdAt).toLocaleDateString(),
      }));
      setBuyers(buyerList);
    } catch (error) {
      console.error("Failed to fetch buyers", error);
      toast({ title: "Error", description: "Failed to load buyers", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Buyers Management">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search buyers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Total Buyers</p>
              <p className="text-3xl font-bold">{buyers.length}</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Active</p>
              <p className="text-3xl font-bold text-emerald-600">
                {buyers.filter(b => b.status === 'active').length}
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-purple-50">
              <p className="text-sm text-muted-foreground mb-1">Inactive</p>
              <p className="text-3xl font-bold text-purple-600">
                {buyers.filter(b => b.status !== 'active').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Buyers List */}
        <div className="space-y-4">
          {buyers.map((buyer) => (
            <Card key={buyer.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xl">
                      {buyer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{buyer.name}</h3>
                      <Badge variant="outline" className="mb-2">
                        {buyer.type}
                      </Badge>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {buyer.location}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {buyer.phone}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {buyer.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge className="status-success">{buyer.status}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="font-semibold">{buyer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="font-semibold text-emerald-600">
                      ₹{(buyer.totalSpent / 100000).toFixed(1)}L
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-semibold">{buyer.joinedDate}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Order History
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

/* ============ ADMIN VERIFICATIONS ============ */
export function AdminVerifications() {
  /*
  const verifications = [
    // Mock data removed
  ];
  */

  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response = await adminService.getUsers();
      const users = response.data || [];
      const pendingUsers = users.filter((u: any) => u.status === 'pending');
      const verificationList = pendingUsers.map((u: any) => ({
        id: u._id,
        farmerName: u.name,
        location: u.city ? `${u.city}, ${u.state || ''}` : "Unknown Location",
        phone: u.phone || "N/A",
        email: u.email,
        submittedDate: new Date(u.createdAt).toLocaleDateString(),
        documents: {
          aadhar: "uploaded", // Mock
          landDocs: "uploaded", // Mock
          bankDetails: "uploaded", // Mock
        },
        landArea: "N/A", // Mock or add to schema
        cropTypes: [], // Mock or add to schema
        status: "pending",
        role: u.role
      }));
      setVerifications(verificationList);
    } catch (error) {
      console.error("Failed to fetch verifications", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Farmer Verifications">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-600">34</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Approved Today</p>
              <p className="text-3xl font-bold text-emerald-600">12</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-red-50">
              <p className="text-sm text-muted-foreground mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-600">5</p>
            </CardContent>
          </Card>
        </div>

        {/* Verifications List */}
        <div className="space-y-4">
          {verifications.map((verification) => (
            <Card key={verification.id} className="card-hover border-2 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{verification.farmerName}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {verification.location}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {verification.phone}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {verification.email}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">
                    Pending Review
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="font-semibold">{verification.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Land Area</p>
                    <p className="font-semibold">{verification.landArea}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Crops</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {verification.cropTypes.map((crop) => (
                        <Badge key={crop} variant="outline" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-3">Documents Status:</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Aadhar Card</p>
                        {verification.documents.aadhar === "uploaded" && (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <Badge className="status-success text-xs">Uploaded</Badge>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Land Documents</p>
                        {verification.documents.landDocs === "uploaded" ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-600" />
                        )}
                      </div>
                      <Badge
                        className={
                          verification.documents.landDocs === "uploaded"
                            ? "status-success text-xs"
                            : "bg-amber-100 text-amber-700 text-xs"
                        }
                      >
                        {verification.documents.landDocs === "uploaded"
                          ? "Uploaded"
                          : "Pending"}
                      </Badge>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Bank Details</p>
                        {verification.documents.bankDetails === "uploaded" && (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <Badge className="status-success text-xs">Uploaded</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="gap-2 bg-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-red-600">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View Documents
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

/* ============ ADMIN PRODUCTS ============ */
export function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  /*
  const products = [
    // Mock data removed
  ];
  */

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await adminService.getCrops();
      const crops = response.data || [];
      const productList = crops.map((crop: any) => ({
        id: crop._id,
        name: crop.name,
        category: crop.category,
        farmer: crop.farmer?.name || "Unknown",
        quantity: `${crop.quantity} ${crop.unit}`,
        price: crop.pricePerUnit,
        unit: crop.unit,
        status: crop.quantity > 0 ? "active" : "out-of-stock", // Simple logic for now
        rating: 0, // Mock
        sales: 0, // Mock
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Products Management">
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Total Products</p>
              <p className="text-3xl font-bold">1,456</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Active</p>
              <p className="text-3xl font-bold text-emerald-600">1,389</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-600">45</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-red-50">
              <p className="text-sm text-muted-foreground mb-1">Out of Stock</p>
              <p className="text-3xl font-bold text-red-600">22</p>
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Package className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {product.farmer}
                      </p>
                      <Badge variant="outline" className="mt-1">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    className={
                      product.status === "active"
                        ? "status-success"
                        : "bg-amber-100 text-amber-700"
                    }
                  >
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-semibold text-emerald-600">
                      ₹{product.price.toLocaleString()}/{product.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-semibold">{product.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    {product.rating > 0 ? (
                      <p className="font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                      </p>
                    ) : (
                      <p className="font-semibold">N/A</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sales</p>
                    <p className="font-semibold">{product.sales}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  {product.status === "pending" && (
                    <Button size="sm" className="gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="gap-2 text-red-600">
                    <Trash2 className="w-4 h-4" />
                    Delete
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

/* ============ ADMIN LISTINGS ============ */
export function AdminListings() {
  return (
    <ResponsiveLayout title="Listings Management">
      <div className="space-y-6">
        <Card className="card-hover">
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-xl font-semibold mb-2">Listings Management</p>
            <p className="text-muted-foreground">
              Manage all product listings from farmers
            </p>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ ADMIN ORDERS ============ */
export function AdminOrders() {
  const [filterStatus, setFilterStatus] = useState("all");

  /*
  const orders = [
    // Mock data removed
  ];
  */

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await adminService.getDeals();
      const deals = response.data || [];
      const orderList = deals.map((deal: any) => ({
        id: `ORD-${deal._id.slice(-4).toUpperCase()}`,
        buyer: deal.buyer?.name || "Unknown Buyer",
        farmer: deal.seller?.name || "Unknown Farmer",
        product: deal.crop?.name || "Unknown Product",
        quantity: `${deal.quantity} ${deal.unit || 'units'}`,
        amount: deal.totalAmount,
        status: deal.status.toLowerCase(), // active, completed, cancelled -> match badge logic
        date: new Date(deal.createdAt).toLocaleDateString(),
        paymentStatus: deal.status === 'DELIVERED' ? "completed" : "pending", // Simplified logic
      }));
      setOrders(orderList);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <ResponsiveLayout title="Orders Management">
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "processing", "in-transit", "delivered", "cancelled"].map(
            (status) => (
              <Badge
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            )
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-3xl font-bold">8,934</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Processing</p>
              <p className="text-3xl font-bold text-amber-600">389</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">In Transit</p>
              <p className="text-3xl font-bold text-blue-600">156</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Delivered</p>
              <p className="text-3xl font-bold text-emerald-600">8,311</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge
                    className={
                      order.status === "delivered"
                        ? "status-success"
                        : order.status === "in-transit"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                    }
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Buyer</p>
                    <p className="font-semibold">{order.buyer}</p>
                  </div>
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
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">
                      ₹{order.amount.toLocaleString()}
                    </p>
                    <Badge
                      className={
                        order.paymentStatus === "completed"
                          ? "status-success"
                          : "bg-amber-100 text-amber-700"
                      }
                    >
                      Payment{" "}
                      {order.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Truck className="w-4 h-4" />
                      Track
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ ADMIN PAYMENTS ============ */
export function AdminPayments() {
  /*
  const payments = [
    // Mock data removed
  ];
  */

  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await adminService.getDeals();
      const deals = response.data || [];
      // Filter only delivered/paid deals or show all with status
      const paymentList = deals.map((deal: any) => ({
        id: `PAY-${deal._id.slice(-4).toUpperCase()}`,
        orderId: `ORD-${deal._id.slice(-4).toUpperCase()}`,
        farmer: deal.seller?.name || "Unknown",
        buyer: deal.buyer?.name || "Unknown",
        amount: deal.totalAmount,
        status: deal.status === 'DELIVERED' ? "completed" : "pending",
        method: "Online", // Mock
        date: new Date(deal.createdAt).toLocaleDateString(),
        time: new Date(deal.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
      setPayments(paymentList);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Payments Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Total Processed</p>
              <p className="text-3xl font-bold text-emerald-600">
                ₹{(45670000 / 10000000).toFixed(1)}Cr
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-3xl font-bold text-blue-600">8,467</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-600">23</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-red-50">
              <p className="text-sm text-muted-foreground mb-1">Failed</p>
              <p className="text-3xl font-bold text-red-600">12</p>
            </CardContent>
          </Card>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{payment.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Order: {payment.orderId}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {payment.date} at {payment.time}
                    </p>
                  </div>
                  <Badge
                    className={
                      payment.status === "completed"
                        ? "status-success"
                        : payment.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">From (Buyer)</p>
                    <p className="font-semibold">{payment.buyer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">To (Farmer)</p>
                    <p className="font-semibold">{payment.farmer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Method</p>
                    <p className="font-semibold">{payment.method}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-emerald-600">
                    ₹{payment.amount.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Receipt
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ ADMIN INVOICES ============ */
export function AdminInvoices() {
  /*
  const invoices = [
    // Mock data removed
  ];
  */

  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await adminService.getDeals();
      const deals = response.data || [];
      const invoiceList = deals.map((deal: any) => ({
        id: `INV-${new Date().getFullYear()}-${deal._id.slice(-4).toUpperCase()}`,
        orderId: `ORD-${deal._id.slice(-4).toUpperCase()}`,
        buyer: deal.buyer?.name || "Unknown",
        amount: deal.totalAmount,
        tax: deal.totalAmount * 0.05,
        total: deal.totalAmount * 1.05,
        status: deal.status === 'DELIVERED' ? "paid" : "pending",
        issueDate: new Date(deal.createdAt).toLocaleDateString(),
        dueDate: new Date(new Date(deal.createdAt).setDate(new Date(deal.createdAt).getDate() + 30)).toLocaleDateString(),
      }));
      setInvoices(invoiceList);
    } catch (error) {
      console.error("Failed to fetch invoices", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Invoices Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Total Invoiced</p>
              <p className="text-3xl font-bold text-emerald-600">
                ₹{(48900000 / 10000000).toFixed(1)}Cr
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Paid</p>
              <p className="text-3xl font-bold text-blue-600">8,456</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-600">34</p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices List */}
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{invoice.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Order: {invoice.orderId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Buyer: {invoice.buyer}
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <p className="font-semibold">{invoice.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-semibold">{invoice.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-semibold">
                      ₹{invoice.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tax (5%)</p>
                    <p className="font-semibold">₹{invoice.tax.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      ₹{invoice.total.toLocaleString()}
                    </p>
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ ADMIN DISPUTES ============ */
export function AdminDisputes() {
  const disputes = [
    {
      id: "DIS-001",
      orderId: "ORD-8920",
      raisedBy: "Kumar Traders",
      against: "Rajesh Kumar",
      reason: "Quality Issue",
      description: "Received rice with moisture content higher than specified",
      amount: 172500,
      status: "under-review",
      raisedDate: "2024-01-28",
      priority: "high",
    },
    {
      id: "DIS-002",
      orderId: "ORD-8915",
      raisedBy: "Raj Sharma",
      against: "Suresh Patel",
      reason: "Quantity Mismatch",
      description: "Ordered 250kg but received only 230kg of tomatoes",
      amount: 6000,
      status: "under-review",
      raisedDate: "2024-01-29",
      priority: "medium",
    },
  ];

  return (
    <ResponsiveLayout title="Disputes Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 bg-amber-50">
              <p className="text-sm text-muted-foreground mb-1">Active Disputes</p>
              <p className="text-3xl font-bold text-amber-600">8</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-red-50">
              <p className="text-sm text-muted-foreground mb-1">High Priority</p>
              <p className="text-3xl font-bold text-red-600">3</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-emerald-50">
              <p className="text-sm text-muted-foreground mb-1">Resolved</p>
              <p className="text-3xl font-bold text-emerald-600">142</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 bg-blue-50">
              <p className="text-sm text-muted-foreground mb-1">Resolution Rate</p>
              <p className="text-3xl font-bold text-blue-600">94.7%</p>
            </CardContent>
          </Card>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {disputes.map((dispute) => (
            <Card
              key={dispute.id}
              className="card-hover border-2"
              style={{
                borderColor:
                  dispute.priority === "high"
                    ? "rgb(239 68 68)"
                    : dispute.priority === "medium"
                      ? "rgb(245 158 11)"
                      : "rgb(59 130 246)",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{dispute.id}</h3>
                      <Badge
                        className={
                          dispute.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : dispute.priority === "medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                        }
                      >
                        {dispute.priority.charAt(0).toUpperCase() +
                          dispute.priority.slice(1)}{" "}
                        Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Order: {dispute.orderId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Raised on: {dispute.raisedDate}
                    </p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">Under Review</Badge>
                </div>

                <div className="p-4 bg-muted rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-1">{dispute.reason}</p>
                  <p className="text-sm text-muted-foreground">
                    {dispute.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Raised By</p>
                    <p className="font-semibold">{dispute.raisedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Against</p>
                    <p className="font-semibold">{dispute.against}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Disputed Amount</p>
                    <p className="font-semibold text-red-600">
                      ₹{dispute.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="gap-2 bg-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    Resolve in Favor of Buyer
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Scale className="w-4 h-4" />
                    Resolve in Favor of Farmer
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
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