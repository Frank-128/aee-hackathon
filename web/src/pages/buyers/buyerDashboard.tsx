import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  MessageCircle,
  MapPin,
  Star,
  Truck,
  FileText,
  AlertCircle,
  TrendingUp,
  Filter,
  X,
  Plus,
  Check,
} from "lucide-react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

/* ============ BUYER DASHBOARD ============ */
export function BuyerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = {
    recentPurchases: 12,
    totalSpent: 145000,
    savedItems: 8,
    activeOrders: 3,
  };

  const quickStats = [
    { label: "Total Spent", value: `₹${(stats.totalSpent / 1000).toFixed(0)}K`, color: "bg-emerald-50" },
    { label: "Orders Placed", value: stats.recentPurchases, color: "bg-blue-50" },
    { label: "Saved Items", value: stats.savedItems, color: "bg-pink-50" },
    { label: "Active Orders", value: stats.activeOrders, color: "bg-amber-50" },
  ];

  const recentOrders = [
    {
      id: "ORD-5021",
      farmer: "Kumar Farm Estate",
      product: "Premium Basmati Rice",
      quantity: "50kg",
      total: 17250,
      status: "delivered",
      date: "2024-01-15",
    },
    {
      id: "ORD-5020",
      farmer: "Green Valley Farms",
      product: "Organic Tomatoes",
      quantity: "25kg",
      total: 6000,
      status: "in-transit",
      date: "2024-01-14",
    },
  ];

  const featuredFarmers = [
    { id: 1, name: "Kumar Farm Estate", rating: 4.8, products: 15, reviews: 240 },
    { id: 2, name: "Green Valley Farms", rating: 4.6, products: 22, reviews: 185 },
    { id: 3, name: "Organic Harvest Co.", rating: 4.9, products: 18, reviews: 312 },
  ];

  return (
    <ResponsiveLayout title="Marketplace">
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search crops, farmers..."
            className="pl-10 h-12"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="card-hover">
              <CardContent className={`p-6 ${stat.color}`}>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-600" />
                Recent Orders
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/buyer/orders">View All</a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.farmer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{order.product} • {order.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">₹{order.total.toLocaleString()}</p>
                  <Badge className={
                    order.status === "delivered" ? "status-success" : "bg-blue-100 text-blue-700"
                  }>
                    {order.status === "delivered" ? "Delivered" : "In Transit"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Featured Farmers */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Featured Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredFarmers.map((farmer) => (
                <div key={farmer.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <p className="font-semibold mb-2">{farmer.name}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{farmer.rating}</span>
                      <span className="text-xs text-muted-foreground">({farmer.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{farmer.products} active products</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => navigate("/buyer/market")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <Search className="w-6 h-6" />
            <span className="text-sm">Explore Market</span>
          </Button>
          <Button
            onClick={() => navigate("/buyer/orders")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-sm">My Orders</span>
          </Button>
          <Button
            onClick={() => navigate("/buyer/wishlist")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <Heart className="w-6 h-6" />
            <span className="text-sm">Wishlist</span>
          </Button>
          <Button
            onClick={() => navigate("/buyer/farmers")}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-sm">Find Farmers</span>
          </Button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ MARKET EXPLORE ============ */
export function BuyerMarket() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "vegetables", "grains", "fruits", "dairy"];
  
  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      farmer: "Kumar Farm Estate",
      price: 3450,
      unit: "kg",
      rating: 4.8,
      reviews: 240,
      quantity: "500kg available",
      distance: "12 km",
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farms",
      price: 24,
      unit: "kg",
      rating: 4.6,
      reviews: 185,
      quantity: "1200kg available",
      distance: "5 km",
    },
    {
      id: 3,
      name: "Fresh Wheat",
      farmer: "Punjab Harvest",
      price: 2150,
      unit: "quintal",
      rating: 4.7,
      reviews: 92,
      quantity: "800 quintals",
      distance: "45 km",
    },
  ];

  return (
    <ResponsiveLayout title="Explore Market">
      <div className="space-y-6">
        {/* Search & Filter */}
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search crops..."
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

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="card-hover flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.farmer}</p>
                </div>

                <div className="space-y-3 mb-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/{product.unit}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  <p className="text-sm text-muted-foreground">{product.quantity}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {product.distance}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
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

/* ============ BUYER ORDERS ============ */
export function BuyerOrders() {
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");

  const orders = [
    {
      id: "ORD-5021",
      farmer: "Kumar Farm Estate",
      product: "Basmati Rice",
      quantity: "50kg",
      total: 17250,
      status: "delivered",
      date: "2024-01-15",
    },
    {
      id: "ORD-5020",
      farmer: "Green Valley Farms",
      product: "Tomatoes",
      quantity: "25kg",
      total: 6000,
      status: "in-transit",
      date: "2024-01-14",
    },
    {
      id: "ORD-5019",
      farmer: "Punjab Harvest",
      product: "Wheat",
      quantity: "100 quintals",
      total: 21500,
      status: "processing",
      date: "2024-01-13",
    },
  ];

  return (
    <ResponsiveLayout title="My Orders">
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex gap-2">
          {(["all", "pending", "completed"] as const).map((status) => (
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

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge className={
                    order.status === "delivered" ? "status-success" :
                    order.status === "in-transit" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-border mb-4">
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
                  <p className="text-2xl font-bold text-emerald-600">₹{order.total.toLocaleString()}</p>
                  <Button variant="outline" size="sm">Track Order</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}

/* ============ WISHLIST ============ */
export function BuyerWishlist() {
  const wishlistItems = [
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
  ];

  return (
    <ResponsiveLayout title="Wishlist">
      <div className="space-y-6">
        {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.farmer}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{item.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">₹{item.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">/{item.unit}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">Add to Cart</Button>
                    <Button variant="outline" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No items in wishlist</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ResponsiveLayout>
  );
}

/* ============ DELIVERY TRACKING ============ */
export function BuyerTracking() {
  const activeDeliveries = [
    {
      id: "ORD-5020",
      product: "Organic Tomatoes",
      farmer: "Green Valley Farms",
      status: "in-transit",
      currentLocation: "Panipat",
      destination: "New Delhi",
      expectedDelivery: "2024-01-17",
      lastUpdate: "2 hours ago",
    },
  ];

  return (
    <ResponsiveLayout title="Delivery Tracking">
      <div className="space-y-6">
        {activeDeliveries.map((delivery) => (
          <Card key={delivery.id} className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{delivery.id}</span>
                <Badge className="bg-blue-100 text-blue-700">In Transit</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Info */}
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Product</p>
                <p className="font-semibold">{delivery.product}</p>
                <p className="text-sm text-muted-foreground">From {delivery.farmer}</p>
              </div>

              {/* Tracking Steps */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
                    <div className="w-1 h-12 bg-emerald-200"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Order Confirmed</p>
                    <p className="text-xs text-muted-foreground">Jan 14</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
                    <div className="w-1 h-12 bg-emerald-200"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Dispatched</p>
                    <p className="text-xs text-muted-foreground">Jan 15</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
                    <div className="w-1 h-12 bg-gray-200"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">In Transit - {delivery.currentLocation}</p>
                    <p className="text-xs text-muted-foreground">{delivery.lastUpdate}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Delivery to {delivery.destination}</p>
                    <p className="text-xs text-muted-foreground">Expected: {delivery.expectedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ResponsiveLayout>
  );
}

/* ============ BUYER REVIEWS ============ */
export function BuyerReviews() {
  const reviews = [
    {
      id: 1,
      farmer: "Kumar Farm Estate",
      rating: 5,
      title: "Excellent Quality Rice",
      comment: "Premium quality basmati rice, fresh and well-packaged.",
      date: "2024-01-15",
    },
    {
      id: 2,
      farmer: "Green Valley Farms",
      rating: 4,
      title: "Good Tomatoes",
      comment: "Fresh tomatoes but delivery was slightly delayed.",
      date: "2024-01-10",
    },
  ];

  return (
    <ResponsiveLayout title="My Reviews">
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold">{review.farmer}</h3>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="font-semibold mb-2">{review.title}</p>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ResponsiveLayout>
  );
}

/* ============ FIND FARMERS ============ */
export function BuyerFarmers() {
  const farmers = [
    {
      id: 1,
      name: "Kumar Farm Estate",
      location: "Punjab",
      rating: 4.8,
      reviews: 240,
      products: 15,
      specialties: ["Rice", "Wheat", "Vegetables"],
    },
    {
      id: 2,
      name: "Green Valley Farms",
      location: "Haryana",
      rating: 4.6,
      reviews: 185,
      products: 22,
      specialties: ["Tomatoes", "Onions", "Potatoes"],
    },
    {
      id: 3,
      name: "Organic Harvest Co.",
      location: "Himachal Pradesh",
      rating: 4.9,
      reviews: 312,
      products: 18,
      specialties: ["Organic Vegetables", "Fruits"],
    },
  ];

  return (
    <ResponsiveLayout title="Find Farmers">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search farmers..." className="pl-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map((farmer) => (
            <Card key={farmer.id} className="card-hover">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">{farmer.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4" />
                  {farmer.location}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{farmer.rating}</span>
                  <span className="text-xs text-muted-foreground">({farmer.reviews} reviews)</span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{farmer.products} products</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">SPECIALTIES</p>
                  <div className="flex flex-wrap gap-1">
                    {farmer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ResponsiveLayout>
  );
}