import { useEffect, useState } from "react";
import {
  Plus,
  Wheat,
  Sprout,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/* ---------------- TYPES ---------------- */

type Product = {
  id: string;
  crop: "wheat" | "rice";
  quantity: number;
  priceMin: number;
  priceMax: number;
};

/* ---------------- CROPS ---------------- */

const crops = [
  { id: "wheat", name: "Wheat", local: "Kanak", icon: Wheat },
  { id: "rice", name: "Rice", local: "Chawal", icon: Sprout },
];

export default function FarmerProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  /* -------- ADD FORM STATE -------- */
  const [crop, setCrop] = useState<"wheat" | "rice">("wheat");
  const [quantity, setQuantity] = useState("");

  const aiPriceMin = 2100;
  const aiPriceMax = 2350;

  /* -------- LOAD PRODUCTS -------- */
  useEffect(() => {
    const stored = localStorage.getItem("farmer_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  /* -------- ADD PRODUCT -------- */
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      crop,
      quantity: Number(quantity),
      priceMin: aiPriceMin,
      priceMax: aiPriceMax,
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("farmer_products", JSON.stringify(updated));

    // reset form
    setQuantity("");
    setCrop("wheat");
    setShowAddForm(false);
  };

  /* -------- DELETE PRODUCT -------- */
  const handleDeleteProduct = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("farmer_products", JSON.stringify(updated));
  };

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
                      onClick={() => setCrop(c.id as "wheat" | "rice")}
                      className={`p-4 rounded-xl border transition ${
                        crop === c.id
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

              {/* STEP 2 */}
              <section>
                <p className="font-semibold mb-2">Quantity (quintals)</p>
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
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!quantity}
                  onClick={handleAddProduct}
                  className="flex items-center gap-2"
                >
                  List Product
                  <ArrowRight className="w-4 h-4" />
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
                  <Card key={p.id}>
                    <CardContent className="p-5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {p.crop === "wheat" ? (
                          <Wheat className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <Sprout className="w-6 h-6 text-emerald-600" />
                        )}
                        <div>
                          <p className="font-bold capitalize">{p.crop}</p>
                          <p className="text-sm text-muted-foreground">
                            {p.quantity} quintals
                          </p>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <p className="font-semibold">
                          ₹{p.priceMin} – ₹{p.priceMax}
                        </p>
                        <Badge className="bg-emerald-100 text-emerald-700">
                          Active
                        </Badge>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => handleDeleteProduct(p.id)}
                        >
                          Delete
                        </Button>
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


