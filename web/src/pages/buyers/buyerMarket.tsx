import { useState } from "react";
import {
  Search,
  Star,
  MapPin,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function BuyerMarket() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const categories = ["all", "vegetables", "fruits", "grains"];

  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      farmer: "Rajesh Kumar",
      distance: "2.4 km away",
      price: "₹65 – 72",
      unit: "PER KG",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1604909052743-94e838986d24",
      tag: "Verified AI Quality",
      quantity: "500 kg avail.",
      quality: "A+ Export Quality",
    },
    {
      id: 2,
      name: "Organic Red Tomatoes",
      farmer: "Sunita Devi",
      distance: "5.1 km away",
      price: "₹22 – 28",
      unit: "PER KG",
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1582284540020-8acbe03f4924",
      quantity: "1,200 kg avail.",
      quality: "Fresh Harvest",
    },
    {
      id: 3,
      name: "Ratnagiri Alphonso",
      farmer: "Gopal Rao",
      distance: "12 km away",
      price: "₹450 – 600",
      unit: "PER DOZEN",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1591073113125-e46713c829ed",
      tag: "Seasonal Special",
    },
  ];

  return (
    <ResponsiveLayout title="Market">
      {/* Mobile container */}
      <div className="
        mx-auto
        max-w-[430px]
        sm:max-w-[640px]
        md:max-w-[900px]
        lg:max-w-[1200px]
        px-4
        pb-24
        space-y-6
      ">
        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search crops, farmers..."
            className="pl-11 py-3 rounded-2xl"
          />
        </div>

        {/* CATEGORIES */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {categories.map((c) => (
            <Button
              key={c}
              variant={category === c ? "default" : "outline"}
              className="rounded-full px-5 whitespace-nowrap"
              onClick={() => setCategory(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </Button>
          ))}
        </div>

        {/* RESULTS */}
        <p className="text-xs font-bold text-muted-foreground uppercase">
          Top Results
        </p>

        {/* PRODUCTS */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

          {products.map((p) => (
            <Card className="rounded-3xl overflow-hidden border shadow-sm flex flex-col">
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-48 sm:h-52 lg:h-56 w-full object-cover"
                />
              </div>

              <CardContent className="p-4 flex flex-col h-full">
                {/* TOP CONTENT */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {p.farmer} • <span className="text-emerald-600">{p.distance}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-emerald-600 text-lg">{p.price}</p>
                      <p className="text-[10px] text-muted-foreground">{p.unit}</p>
                    </div>
                  </div>

                  {(p.quantity || p.quality) && (
                    <div className="grid grid-cols-2 gap-2">
                      {p.quantity && (
                        <div className="bg-emerald-50 p-2 rounded-xl text-xs">
                          <p className="text-muted-foreground font-semibold">Quantity</p>
                          <p className="font-bold">{p.quantity}</p>
                        </div>
                      )}
                      {p.quality && (
                        <div className="bg-orange-50 p-2 rounded-xl text-xs">
                          <p className="text-muted-foreground font-semibold">Quality</p>
                          <p className="font-bold">{p.quality}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* BUTTON ALWAYS AT BOTTOM */}
                <Button
                  className="w-full rounded-2xl py-5 text-base mt-auto"
                  onClick={() => navigate(`/buyer/product/${p.id}`)}>
                  View Details
                </Button>

              </CardContent>
            </Card>

          ))}
        </div>
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-xl overflow-hidden">

            {/* IMAGE */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-56 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedProduct.farmer} •{" "}
                    <span className="text-emerald-600">
                      {selectedProduct.distance}
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-600">
                    {selectedProduct.price}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedProduct.unit}
                  </p>
                </div>
              </div>

              {/* TAGS */}
              {selectedProduct.tag && (
                <Badge className="bg-emerald-100 text-emerald-700">
                  {selectedProduct.tag}
                </Badge>
              )}

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-3">
                {selectedProduct.quantity && (
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <p className="text-xs text-muted-foreground font-semibold">
                      Quantity
                    </p>
                    <p className="font-bold">{selectedProduct.quantity}</p>
                  </div>
                )}
                {selectedProduct.quality && (
                  <div className="bg-orange-50 p-3 rounded-xl">
                    <p className="text-xs text-muted-foreground font-semibold">
                      Quality
                    </p>
                    <p className="font-bold">{selectedProduct.quality}</p>
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 rounded-xl py-5">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 rounded-xl py-5"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </ResponsiveLayout>
  );
}
