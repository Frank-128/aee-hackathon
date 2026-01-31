import { useEffect, useState } from "react";
import {
  Plus,
  Wheat,
  Sprout,
  Sparkles,
  ArrowRight,
  Trash2,
  Loader2,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { farmerService } from "@/services/farmerService";

/* ---------------- TYPES ---------------- */
// Local type matching backend response
interface ProductListing {
  _id: string;
  name: string;
  category: string;
  area: number;
  expectedYield: number;
  pricePerUnit?: number;
  unit?: string;
  status: string;
}

/* ---------------- CROPS ---------------- */

const crops = [
  { id: "wheat", name: "Wheat", local: "Kanak", icon: Wheat },
  { id: "rice", name: "Rice", local: "Chawal", icon: Sprout },
];

export default function FarmerProducts() {
  const [products, setProducts] = useState<ProductListing[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* -------- ADD FORM STATE -------- */
  const [cropName, setCropName] = useState<string>("wheat");
  const [quantity, setQuantity] = useState("");
  const [area, setArea] = useState("");

  // Static AI prices for now (can be enhanced later)
  const aiPriceMin = 2100;
  const aiPriceMax = 2350;

  /* -------- LOAD PRODUCTS -------- */
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await farmerService.getCrops();
      const cropsData = response.data as ProductListing[];
      setProducts(cropsData);
    } catch (error: any) {
      console.error("Failed to load crops:", error);
      toast({
        title: "Error",
        description: "Failed to load your products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* -------- ADD PRODUCT -------- */
  const handleAddProduct = async () => {
    if (!quantity || Number(quantity) <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    if (!area || Number(area) <= 0) {
      toast({
        title: "Invalid Area",
        description: "Please enter a valid area",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const response = await farmerService.addCrop({
        name: cropName,
        category: "grain",
        area: Number(area),
        expectedYield: Number(quantity),
        status: "active" as any,
        pricePerUnit: aiPriceMin,
        unit: "quintal",
      });

      const newCrop = response.data as ProductListing;
      setProducts([...products, newCrop]);

      toast({
        title: "Success",
        description: "Product listed successfully!",
      });

      // Reset form
      setQuantity("");
      setArea("");
      setCropName("wheat");
      setShowAddForm(false);
    } catch (error: any) {
      console.error("Failed to add crop:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  /* -------- DELETE PRODUCT -------- */
  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await farmerService.deleteCrop(id);
      setProducts(products.filter((p) => p._id !== id));

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error: any) {
      console.error("Failed to delete crop:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  /* -------- LOADING STATE -------- */
  if (loading) {
    return (
      <ResponsiveLayout title="My Products">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout title="My Products">
      <div className="space-y-6 max-w-3xl mx-auto">

        {/* ================= HEADER ACTION ================= */}
        {!showAddForm && (
          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </Button>
          </div>
        )}

        {/* ================= ADD PRODUCT FORM ================= */}
        {showAddForm && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-bold">Add New Listing</h2>

              {/* STEP 1 */}
              <section>
                <p className="font-semibold mb-3">What did you harvest?</p>
                <div className="grid grid-cols-2 gap-4">
                  {crops.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCropName(c.id)}
                      className={`p-4 rounded-xl border transition ${cropName === c.id
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-border hover:bg-muted"
                        }`}
                    >
                      <c.icon className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.local}
                      </p>
                    </button>
                  ))}
                </div>
              </section>

              {/* STEP 2 - Area */}
              <section>
                <p className="font-semibold mb-2">Area (acres)</p>
                <Input
                  type="number"
                  placeholder="00"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="text-xl font-bold"
                />
              </section>

              {/* STEP 3 - Quantity */}
              <section>
                <p className="font-semibold mb-2">Expected Yield (quintals)</p>
                <Input
                  type="number"
                  placeholder="00"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="text-xl font-bold"
                />
              </section>

              {/* AI PRICE */}
              <section>
                <Card className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      AI Price Recommendation
                    </div>
                    <p className="text-xl font-bold">
                      ₹{aiPriceMin} – ₹{aiPriceMax} / quintal
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setQuantity("");
                    setArea("");
                    setCropName("wheat");
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!quantity || !area || saving}
                  onClick={handleAddProduct}
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Listing...
                    </>
                  ) : (
                    <>
                      List Product
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ================= PRODUCT LIST ================= */}
        {!showAddForm && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                No products listed yet.
              </div>
            ) : (
              <div className="grid gap-4">
                {products.map((p) => (
                  <Card key={p._id}>
                    <CardContent className="p-5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {p.name?.toLowerCase() === "wheat" ? (
                          <Wheat className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <Sprout className="w-6 h-6 text-emerald-600" />
                        )}
                        <div>
                          <p className="font-bold capitalize">{p.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {p.expectedYield} quintals • {p.area} acres
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">
                            ₹{p.pricePerUnit || aiPriceMin} / {p.unit || "quintal"}
                          </p>
                          <Badge className="bg-emerald-100 text-emerald-700 mt-1">
                            {p.status}
                          </Badge>
                        </div>

                        {/* Delete icon */}
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          title="Delete product"
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </ResponsiveLayout>
  );
}
