import { useState, useEffect } from "react";
import {
  Search,
  Star,
  MapPin,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { buyerService } from "@/services/buyerService";
import { toast } from "@/hooks/use-toast";

export function BuyerMarket() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", "vegetables", "fruits", "grains"];

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      setLoading(true);
      const response = await buyerService.getFarmerListings();
      const listingsData = response.data;
      if (listingsData && Array.isArray(listingsData)) {
        setListings(listingsData);
      }
    } catch (error: any) {
      console.error("Failed to load farmer listings:", error);
      toast({
        title: "Error",
        description: "Failed to load farmer listings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = searchQuery === "" ||
      listing.cropName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.farmerName?.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filtering would require crop type info from backend
    return matchesSearch;
  });

  if (loading) {
    return (
      <ResponsiveLayout title="Market">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      </ResponsiveLayout>
    );
  }

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {filteredListings.length} Results
        </p>

        {/* PRODUCTS */}
        {filteredListings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <p className="text-lg mb-2">No listings found</p>
              <p className="text-sm">
                {searchQuery ? "Try adjusting your search" : "No farmer listings available at the moment"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          ">

            {filteredListings.map((listing) => (
              <Card key={listing._id} className="rounded-3xl overflow-hidden border shadow-sm flex flex-col">
                <div className="relative">
                  <div className="h-48 sm:h-52 lg:h-56 w-full bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center">
                    <span className="text-6xl">🌾</span>
                  </div>
                </div>

                <CardContent className="p-4 flex flex-col h-full">
                  {/* TOP CONTENT */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{listing.cropName}</h3>
                        <p className="text-xs text-muted-foreground">
                          {listing.farmerName || "Farmer"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-emerald-600 text-lg">
                          ₹{listing.pricePerUnit}
                        </p>
                        <p className="text-[10px] text-muted-foreground">PER {listing.unit?.toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-emerald-50 p-2 rounded-xl text-xs">
                        <p className="text-muted-foreground font-semibold">Quantity</p>
                        <p className="font-bold">{listing.quantity} {listing.unit}</p>
                      </div>
                      {listing.expectedYield && (
                        <div className="bg-orange-50 p-2 rounded-xl text-xs">
                          <p className="text-muted-foreground font-semibold">Yield</p>
                          <p className="font-bold">{listing.expectedYield} {listing.unit}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BUTTON ALWAYS AT BOTTOM */}
                  <Button
                    className="w-full rounded-2xl py-5 text-base mt-auto"
                    onClick={() => setSelectedProduct(listing)}>
                    View Details
                  </Button>

                </CardContent>
              </Card>

            ))}
          </div>
        )}
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-xl overflow-hidden">

            {/* IMAGE */}
            <div className="h-56 w-full bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center">
              <span className="text-8xl">🌾</span>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedProduct.cropName}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedProduct.farmerName || "Farmer"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-600">
                    ₹{selectedProduct.pricePerUnit}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PER {selectedProduct.unit?.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 p-3 rounded-xl">
                  <p className="text-xs text-muted-foreground font-semibold">
                    Quantity
                  </p>
                  <p className="font-bold">{selectedProduct.quantity} {selectedProduct.unit}</p>
                </div>
                {selectedProduct.expectedYield && (
                  <div className="bg-orange-50 p-3 rounded-xl">
                    <p className="text-xs text-muted-foreground font-semibold">
                      Expected Yield
                    </p>
                    <p className="font-bold">{selectedProduct.expectedYield} {selectedProduct.unit}</p>
                  </div>
                )}
              </div>

              {selectedProduct.area && (
                <div className="bg-blue-50 p-3 rounded-xl">
                  <p className="text-xs text-muted-foreground font-semibold">
                    Farm Area
                  </p>
                  <p className="font-bold">{selectedProduct.area} acres</p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 rounded-xl py-5">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Place Order
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
