import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { farmerService } from "@/services/farmerService";
import { supportService } from "@/services/supportService";
import { toast } from "@/hooks/use-toast";
import {
  Package,
  ShoppingCart,
  Wallet,
  Leaf,
  Layers,
  Truck,
  Sparkles,
  Cloud,
  BookOpen,
  Bell,
  MessageCircle,
  HelpCircle,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MapPin,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Send,
  Loader2,
} from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/* ============ PRODUCTS PAGE ============ */
export function FarmerProducts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "sold-out">("all");

  /* 
  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      category: "Grains",
      quantity: 500,
      unit: "kg",
      price: 3450,
      status: "active",
      orders: 12,
      rating: 4.8,
      image: "🌾",
    },
    ...
  ];
  */

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await farmerService.getCrops();
      // Ensure we handle the response correctly based on API structure
      const data = response.data || response;
      // Map API data to UI format if needed, or use directly if matches
      // Assumes API returns array of crops with similar fields
      const formatted = Array.isArray(data) ? data.map((crop: any) => ({
        id: crop._id,
        name: crop.name,
        category: crop.type || "General",
        quantity: crop.quantity,
        unit: crop.unit,
        price: crop.pricePerUnit,
        status: "active", // Default to active as API might not have status
        orders: 0, // Mock for now
        rating: 4.5, // Mock for now
        image: "🌾", // Mock image based on name later
      })) : [];
      setProducts(formatted);
    } catch (error) {
      console.error("Failed to fetch products", error);
      toast({ title: "Error", description: "Failed to load products", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await farmerService.deleteCrop(id);
      toast({ title: "Success", description: "Product deleted" });
      fetchProducts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <ResponsiveLayout title="My Products">
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => navigate("/farmer/products/new")} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(["all", "active", "sold-out"] as const).map((status) => (
            <Badge
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilterStatus(status)}
            >
              {status === "all" ? "All" : status === "active" ? "Active" : "Sold Out"}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="card-hover flex flex-col">
              <CardContent className="p-6 flex-1">
                <div className="text-4xl mb-4">{product.image}</div>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.category}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-emerald-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <Badge className={product.status === "active" ? "status-success" : "bg-gray-100 text-gray-700"}>
                    {product.status === "active" ? "Active" : "Sold Out"}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4 py-4 border-y border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available</span>
                    <span className="font-semibold">{product.quantity} {product.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Orders</span>
                    <span className="font-semibold">{product.orders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
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



/* ============ EARNINGS PAGE ============ */
import { dealService } from "@/services/dealService";

export function FarmerEarnings() {
  const [earningsData, setEarningsData] = useState({
    thisMonth: 0,
    lastMonth: 0,
    thisYear: 0,
    totalEarnings: 0,
  });
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await dealService.getMyDeals();
      const deals = res.data || [];

      // Filter for completed/sold deals
      const completedDeals = Array.isArray(deals) ? deals.filter((d: any) => d.status === 'completed' || d.status === 'accepted') : [];

      let total = 0;
      let thisMonth = 0;
      let lastMonth = 0; // Mock calculation logic for demo
      let thisYear = 0;
      const now = new Date();

      const txList = completedDeals.map((deal: any) => {
        const date = new Date(deal.createdAt);
        const amount = deal.totalPrice || deal.totalAmount || 0;
        total += amount;

        if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
          thisMonth += amount;
        }
        if (date.getFullYear() === now.getFullYear()) {
          thisYear += amount;
        }

        return {
          id: deal._id,
          date: date.toLocaleDateString(),
          description: `Sale: ${deal.cropName || deal.crop?.name}`,
          amount: amount,
          status: deal.status
        };
      });

      setEarningsData({
        thisMonth,
        lastMonth: thisMonth * 0.8, // Mock previous month for trend
        thisYear,
        totalEarnings: total
      });
      setTransactions(txList.reverse().slice(0, 10)); // Recent 10
    } catch (error) {
      console.error("Failed to fetch earnings", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Earnings">
      <div className="space-y-6">
        {/* Earnings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">This Month</p>
              <p className="text-3xl font-bold text-emerald-600">₹{(earningsData.thisMonth).toLocaleString()}</p>
              <p className="text-xs text-emerald-600 mt-2">↑ 12% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Last Month</p>
              <p className="text-3xl font-bold">₹{(earningsData.lastMonth).toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">This Year</p>
              <p className="text-3xl font-bold text-emerald-600">₹{(earningsData.thisYear).toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">All Time</p>
              <p className="text-3xl font-bold">₹{(earningsData.totalEarnings).toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loading ? <p>Loading transactions...</p> : transactions.length > 0 ? transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <p className={`font-bold text-emerald-600`}>
                    +₹{Math.abs(tx.amount).toLocaleString()}
                  </p>
                </div>
              )) : <p className="text-muted-foreground">No recent transactions</p>}
            </div>
          </CardContent>
        </Card>

        {/* Withdraw Button */}
        <Button className="w-full" size="lg">
          <Wallet className="w-4 h-4 mr-2" />
          Withdraw Earnings
        </Button>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ FARM PROFILE PAGE ============ */
export function FarmerFarmProfile() {
  /*
  const farmProfile = {
    name: "Kumar Farm Estate",
    ...
  };
  */

  const { user } = useAuth();
  const [farmData, setFarmData] = useState<any>({
    name: user?.name ? `${user.name}'s Farm` : "My Farm",
    location: user?.city ? `${user.city}, ${user.state || ""}` : "Location Not Set",
    area: 0,
    areaUnit: "acres",
    established: new Date().getFullYear().toString(),
    crops: [],
    certification: "Verified Farmer", // placeholder
    members: 1,
    description: "No description provided.",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [landRes, cropsRes] = await Promise.all([
          farmerService.getLand(),
          farmerService.getCrops()
        ]);

        const lands = landRes.data || [];
        const crops = cropsRes.data || [];

        const totalArea = Array.isArray(lands) ? lands.reduce((acc: number, land: any) => acc + (Number(land.area) || 0), 0) : 0;
        // distinct crops
        const distinctCrops = Array.isArray(crops) ? Array.from(new Set(crops.map((c: any) => c.name || c.cropName))) : [];

        setFarmData(prev => ({
          ...prev,
          name: user?.name ? `${user.name}'s Farm` : prev.name,
          location: user?.city ? `${user.city}, ${user.state || ''}` : (lands[0]?.location || prev.location),
          area: totalArea,
          crops: distinctCrops,
          // established: user.createdAt ... ?
        }));

      } catch (error) {
        console.error("Failed to fetch farm profile data", error);
        // toast ...
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  const farmProfile = farmData; // compatibility alias

  return (
    <ResponsiveLayout title="Farm Profile">
      <div className="space-y-6">
        <Card className="card-hover">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">{farmProfile.name}</h2>
                <p className="text-muted-foreground flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4" />
                  {farmProfile.location}
                </p>
              </div>
              <Badge className="status-success">{farmProfile.certification}</Badge>
            </div>

            <p className="text-muted-foreground mb-6">{farmProfile.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Farm Area</p>
                <p className="text-2xl font-bold">{farmProfile.area} {farmProfile.areaUnit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Established</p>
                <p className="text-2xl font-bold">{farmProfile.established}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Crops</p>
                <p className="text-xl font-bold">{farmProfile.crops.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Team Members</p>
                <p className="text-2xl font-bold">{farmProfile.members}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="section-title">Main Crops</h3>
              <div className="flex flex-wrap gap-2">
                {farmProfile.crops.map((crop) => (
                  <Badge key={crop} variant="outline" className="px-3 py-1">
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full mt-6" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ INVENTORY PAGE ============ */
export function FarmerInventory() {
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await farmerService.getCrops();
        const data = res.data || [];
        if (Array.isArray(data)) {
          const formatted = data.map((crop: any) => ({
            id: crop._id,
            item: crop.name,
            quantity: crop.quantity,
            unit: crop.unit,
            status: crop.quantity > 100 ? "In Stock" : crop.quantity > 0 ? "Low Stock" : "Out of Stock",
            reorderLevel: 50 // Mock
          }));
          setInventory(formatted);
        }
      } catch (e) {
        console.error("Failed inventory fetch");
      }
    }
    fetchInventory();
  }, []);

  return (
    <ResponsiveLayout title="Inventory">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventory.length > 0 ? inventory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold">{item.item}</p>
                    <p className="text-sm text-muted-foreground">Reorder at {item.reorderLevel} {item.unit}</p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="text-2xl font-bold">{item.quantity}</p>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                  </div>
                  <Badge className={
                    item.status === "In Stock" ? "status-success" :
                      item.status === "Low Stock" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                  }>
                    {item.status}
                  </Badge>
                </div>
              )) : <p className="text-muted-foreground text-center">No inventory items. Add crops to see them here.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ DELIVERY PAGE ============ */
export function FarmerDelivery() {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ pickup: "", dropoff: "", weight: 0 });
  const [activeDeliveries, setActiveDeliveries] = useState<any[]>([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await dealService.getMyDeals();
      const deals = res.data || [];
      // Filter for active deliveries (accepted, in-transit, etc.)
      // Assuming status 'accepted' implies processing/delivery started
      const active = Array.isArray(deals) ? deals.filter((d: any) => ['accepted', 'shipped', 'in-transit'].includes(d.status)) : [];

      const formatted = active.map((d: any) => ({
        id: d._id,
        order: `ORD-${d._id.slice(-4).toUpperCase()}`,
        status: d.status,
        location: d.buyerName || "Buyer Location", // Mock location if not in deal
        expected: new Date(new Date(d.createdAt).setDate(new Date(d.createdAt).getDate() + 7)).toLocaleDateString() // Mock ETA
      }));
      setActiveDeliveries(formatted);
    } catch (e) {
      console.error("Failed to fetch deliveries");
    }
  };

  const deliverySettings = {
    deliveryZone: "Pan-India",
    standardDelivery: "5-7 days",
    expressDelivery: "2-3 days",
    deliveryCharge: "Free",
    minOrderValue: 500,
  };

  const handleGetQuote = async () => {
    try {
      setLoading(true);
      const res = await supportService.getTransportQuote(formData);
      setQuote(res.data || res);
    } catch (error) {
      toast({ title: "Error", description: "Failed to get quote", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveLayout title="Delivery Settings">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(deliverySettings).map(([key, value]) => (
                <div key={key} className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </p>
                  <p className="font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-bold mb-4">Request Logistics Quote</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input placeholder="Pickup Location" value={formData.pickup} onChange={e => setFormData({ ...formData, pickup: e.target.value })} />
                <Input placeholder="Dropoff Location" value={formData.dropoff} onChange={e => setFormData({ ...formData, dropoff: e.target.value })} />
                <Input type="number" placeholder="Weight (kg)" value={formData.weight || ''} onChange={e => setFormData({ ...formData, weight: Number(e.target.value) })} />
              </div>
              <Button onClick={handleGetQuote} disabled={loading}>
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Truck className="w-4 h-4 mr-2" />}
                Get Rate
              </Button>

              {quote && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                  <p className="font-bold text-lg text-emerald-700">Estimated Cost: ₹{quote.estimatedCost}</p>
                  <p className="text-sm">Provider: {quote.provider} | Vehicle: {quote.vehicleType}</p>
                  <Button className="mt-2" variant="outline" size="sm" onClick={() => toast({ title: "Booked", description: "Transport booking request sent" })}>Book Now</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeDeliveries.length > 0 ? activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold">{delivery.order}</p>
                    <p className="text-sm text-muted-foreground">{delivery.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-700">{delivery.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Est. {delivery.expected}</p>
                  </div>
                </div>
              )) : <p className="text-muted-foreground text-center">No active deliveries</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ WEATHER ALERTS PAGE ============ */
export function FarmerWeather() {
  const weatherAlerts = [
    {
      id: 1,
      type: "Storm",
      title: "Heavy Rainfall Expected",
      description: "Monsoon alert for your region. Protect crops and ensure proper drainage.",
      severity: "high",
      date: "2024-01-15",
    },
    {
      id: 2,
      type: "Heatwave",
      title: "Temperature Alert",
      description: "High temperatures expected. Increase irrigation frequency.",
      severity: "medium",
      date: "2024-01-14",
    },
    {
      id: 3,
      type: "Frost",
      title: "Frost Warning",
      description: "Night temperatures dropping. Cover sensitive crops.",
      severity: "high",
      date: "2024-01-13",
    },
  ];

  return (
    <ResponsiveLayout title="Weather Alerts">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weatherAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${alert.severity === "high"
                    ? "border-l-red-600 bg-red-50"
                    : "border-l-amber-600 bg-amber-50"
                    }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold">{alert.title}</p>
                    <Badge className={alert.severity === "high" ? "bg-red-600" : "bg-amber-600"}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <p className="text-xs text-muted-foreground">{alert.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ LEARN PAGE ============ */
export function FarmerLearn() {
  const resources = [
    {
      id: 1,
      title: "Organic Farming Basics",
      category: "Agriculture",
      duration: "15 mins",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Advanced Irrigation Techniques",
      category: "Water Management",
      duration: "30 mins",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Crop Disease Management",
      category: "Plant Health",
      duration: "20 mins",
      level: "Intermediate",
    },
  ];

  return (
    <ResponsiveLayout title="Learning Center">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold">{resource.title}</p>
                    <p className="text-sm text-muted-foreground">{resource.category}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{resource.level}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{resource.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ NOTIFICATIONS PAGE ============ */
export function FarmerNotifications() {
  const notifications = [
    { id: 1, title: "New Order", message: "FreshMart placed an order for 500kg Rice", time: "2 mins ago", read: false },
    { id: 2, title: "Price Alert", message: "Wheat prices increased by 4%", time: "1 hour ago", read: false },
    { id: 3, title: "Delivery Update", message: "Order ORD-9020 dispatched", time: "3 hours ago", read: true },
  ];

  return (
    <ResponsiveLayout title="Notifications">
      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className={notif.read ? "" : "border-emerald-200 bg-emerald-50"}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold">{notif.title}</p>
                {!notif.read && <span className="w-2 h-2 bg-emerald-600 rounded-full mt-2" />}
              </div>
              <p className="text-sm text-muted-foreground">{notif.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ResponsiveLayout>
  );
}

/* ============ MESSAGES PAGE ============ */
export function FarmerMessages() {
  const conversations = [
    { id: 1, buyer: "Rajesh Kumar", lastMessage: "When can you deliver?", time: "2 mins ago", unread: true },
    { id: 2, buyer: "Priya Singh", lastMessage: "Order received, great quality!", time: "1 hour ago", unread: false },
    { id: 3, buyer: "AgriLogistics", lastMessage: "Ready for bulk purchase", time: "Yesterday", unread: false },
  ];

  return (
    <ResponsiveLayout title="Messages">
      <div className="space-y-4">
        {conversations.map((conv) => (
          <Card key={conv.id} className={conv.unread ? "border-emerald-200 bg-emerald-50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold">{conv.buyer}</p>
                {conv.unread && <span className="w-2 h-2 bg-emerald-600 rounded-full" />}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{conv.lastMessage}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{conv.time}</p>
                <Button size="sm" variant="outline">Reply</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ResponsiveLayout>
  );
}

/* ============ HELP PAGE ============ */
export function FarmerHelp() {
  const faqs = [
    {
      id: 1,
      question: "How do I list a new product?",
      answer: "Go to 'My Products' and click 'Add Product'. Fill in details like name, quantity, price, and description.",
    },
    {
      id: 2,
      question: "What's the commission rate?",
      answer: "We charge 5% commission on each successful sale.",
    },
    {
      id: 3,
      question: "How do I withdraw my earnings?",
      answer: "Go to Earnings page and click 'Withdraw Earnings'. Minimum withdrawal is ₹500.",
    },
  ];

  return (
    <ResponsiveLayout title="Help Center">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.id} className="group border border-border rounded-lg p-4">
                <summary className="cursor-pointer font-semibold flex items-center justify-between">
                  {faq.question}
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-3 text-sm">{faq.answer}</p>
              </details>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Contact our support team for assistance</p>
            <Button className="w-full" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}