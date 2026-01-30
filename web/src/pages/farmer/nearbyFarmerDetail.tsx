import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Truck } from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* TEMP MOCK DATA */
const farmers = [
  {
    id: "f1",
    name: "Ramesh Patel",
    village: "Kothrud",
    distanceKm: 2.3,
    crop: "Wheat",
    quantity: "Bulk",
    about:
      "Experienced wheat farmer with bulk storage and shared transport availability.",
  },
  {
    id: "f2",
    name: "Suresh Yadav",
    village: "Baner",
    distanceKm: 4.8,
    crop: "Wheat",
    quantity: "Bulk",
    about:
      "Focuses on quality produce and logistics collaboration.",
  },
];

export default function NearbyFarmerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const farmer = farmers.find((f) => f.id === id);

  if (!farmer) {
    return (
      <ResponsiveLayout title="Farmer Not Found">
        <p className="text-center py-20 text-muted-foreground">
          Farmer not found.
        </p>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout title={farmer.name}>
      <div className="max-w-3xl mx-auto space-y-6">

        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Map
        </Button>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">{farmer.name}</h1>

            <p className="text-muted-foreground">
              {farmer.village} • {farmer.distanceKm} km away
            </p>

            <Badge className="bg-emerald-100 text-emerald-700">
              {farmer.crop} • {farmer.quantity}
            </Badge>

            <p className="text-sm text-muted-foreground">
              {farmer.about}
            </p>

            <div className="flex gap-3 pt-4">
              <Button>
                <MessageCircle className="w-4 h-4 mr-1" />
                Message Farmer
              </Button>
              <Button variant="outline">
                <Truck className="w-4 h-4 mr-1" />
                Share Transport
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </ResponsiveLayout>
  );
}
