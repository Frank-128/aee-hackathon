import { useState } from "react";

import {
  Search,
  Filter,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/* ============ MARKET EXPLORE ============ */

type Product = {
  id: number;
  name: string;
  farmer: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  quantity: string;
  distance: string;
  category: string;
};

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
