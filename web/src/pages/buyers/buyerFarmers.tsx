import { useState } from "react";

import {
  Search,
  MapPin,
  Star,
  MessageCircle,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/* ============ FIND FARMERS ============ */

type Farmer = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  products: number;
  specialties: string[];
};

/* ============ FIND FARMERS ============ */
import { buyerService } from "@/services/buyerService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function BuyerFarmers() {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const res = await buyerService.getFarmerListings();
      const products = res.data || [];

      // Group by farmer
      const farmerMap = new Map();

      products.forEach((p: any) => {
        const farmerId = p.farmer?._id || p.farmer;
        if (!farmerId) return;

        if (!farmerMap.has(farmerId)) {
          farmerMap.set(farmerId, {
            id: farmerId,
            name: p.farmerName || p.farmer?.name || "Unknown Farmer",
            location: p.farmer?.city || "India", // Mock location if missing
            rating: 4.5, // Mock
            reviews: Math.floor(Math.random() * 50) + 1, // Mock
            products: 0,
            specialties: new Set()
          });
        }

        const entry = farmerMap.get(farmerId);
        entry.products += 1;
        entry.specialties.add(p.cropName || p.name);
      });

      const farmerList = Array.from(farmerMap.values()).map(f => ({
        ...f,
        specialties: Array.from(f.specialties).slice(0, 3) // Top 3
      }));
      setFarmers(farmerList);
    } catch (e) {
      console.error("Failed farmers fetch");
    }
  };

  const filteredFarmers = farmers.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ResponsiveLayout title="Find Farmers">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search farmers..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
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

                <Button
                  className="w-full"
                  onClick={() => {
                    // Assuming farmer.id matches backend ID style or mapping
                    navigate("/buyer/messages", { state: { farmerId: farmer.id, farmerName: farmer.name } });
                  }}
                >
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

