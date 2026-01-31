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

