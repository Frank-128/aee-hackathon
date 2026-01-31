import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  Truck,
  Star,
  CheckCircle,
  MapPin,
  Package,
  Clock,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ---------------- MOCK DATA (LATER API) ---------------- */

const farmers = [
  {
    id: "f1",
    name: "Ramesh Patel",
    village: "Kothrud",
    distanceKm: 2.3,
    crop: "Wheat",
    quantity: "Bulk",
    rating: 4.6,
    completedDeals: 38,
    joined: "2021",
    availability: "Available for collaboration",
    about:
      "Experienced wheat farmer with bulk storage capacity and shared transport options.",
    intents: ["Bulk Sell", "Shared Transport", "Storage Sharing"],
    lastActive: "2 hours ago",
    verified: true,
  },
  {
    id: "f2",
    name: "Suresh Yadav",
    village: "Baner",
    distanceKm: 4.8,
    crop: "Wheat",
    quantity: "Bulk",
    rating: 4.2,
    completedDeals: 21,
    joined: "2022",
    availability: "Harvesting phase",
    about:
      "Focuses on quality produce and timely delivery.",
    intents: ["Transport Pooling"],
    lastActive: "1 day ago",
    verified: true,
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
      <div className="max-w-4xl mx-auto space-y-6">

        {/* BACK */}
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Nearby Farmers
        </Button>

        {/* HEADER */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {farmer.name}
                  {farmer.verified && (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  )}
                </h1>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {farmer.village} • {farmer.distanceKm} km away
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">{farmer.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {farmer.completedDeals} completed deals
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-emerald-100 text-emerald-700">
                {farmer.crop} • {farmer.quantity}
              </Badge>
              <Badge variant="outline">Joined {farmer.joined}</Badge>
              <Badge variant="outline">{farmer.availability}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* ABOUT */}
        <Card>
          <CardContent className="p-6 space-y-2">
            <h3 className="font-semibold">About Farmer</h3>
            <p className="text-sm text-muted-foreground">
              {farmer.about}
            </p>
          </CardContent>
        </Card>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center space-y-1">
              <Package className="w-5 h-5 mx-auto text-emerald-600" />
              <p className="font-bold">{farmer.completedDeals}</p>
              <p className="text-xs text-muted-foreground">Trades</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center space-y-1">
              <Clock className="w-5 h-5 mx-auto text-emerald-600" />
              <p className="font-bold">{farmer.lastActive}</p>
              <p className="text-xs text-muted-foreground">Last Active</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center space-y-1">
              <Truck className="w-5 h-5 mx-auto text-emerald-600" />
              <p className="font-bold">{farmer.intents.length}</p>
              <p className="text-xs text-muted-foreground">Collabs</p>
            </CardContent>
          </Card>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <Button
            className="flex-1"
            onClick={() =>
              navigate(
                `/farmer/messages?to=${farmer.id}&name=${encodeURIComponent(
                  farmer.name
                )}`
              )
            }
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Message Farmer
          </Button>

          <Button variant="outline" className="flex-1">
            <Truck className="w-4 h-4 mr-1" />
            Propose Transport
          </Button>
        </div>
      </div>
    </ResponsiveLayout>
  );
}
