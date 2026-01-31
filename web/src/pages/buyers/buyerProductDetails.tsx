import { useParams, useNavigate } from "react-router-dom";
import { MapPin, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";

export function MarketProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TEMP: same product list (later API)
  const products = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      farmer: "Rajesh Kumar",
      distance: "2.4 km away",
      price: "₹65 – 72",
      unit: "PER KG",
      image:
        "https://images.unsplash.com/photo-1604909052743-94e838986d24",
      tag: "Verified AI Quality",
      quantity: "500 kg avail.",
      quality: "A+ Export Quality",
      description:
        "High-grade basmati rice suitable for retail and export markets."
    },
    // other products...
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
      description:
        "High-grade basmati rice suitable for retail and export markets."
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
      description:
        "High-grade basmati rice suitable for retail and export markets."
    },
  ];

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  return (
    <ResponsiveLayout title="Product Info">
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-3xl"
        />

        <div className="mt-6 space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {product.farmer} •{" "}
            <span className="text-emerald-600">{product.distance}</span>
            </p>

            {product.tag && (
            <Badge className="bg-emerald-100 text-emerald-700">
                {product.tag}
            </Badge>
            )}

            <p className="text-lg font-bold text-emerald-600">
            {product.price} <span className="text-xs">{product.unit}</span>
            </p>

            <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 p-3 rounded-xl">
                <p className="text-xs text-muted-foreground">Quantity</p>
                <p className="font-bold">{product.quantity}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl">
                <p className="text-xs text-muted-foreground">Quality</p>
                <p className="font-bold">{product.quality}</p>
            </div>
            </div>

            <p className="text-sm text-muted-foreground">
            {product.description}
            </p>

            <div className="flex gap-3 pt-4">
            <Button className="flex-1 py-5 rounded-xl">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
            </Button>

            <Button
                variant="outline"
                className="flex-1 py-5 rounded-xl"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
            </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
