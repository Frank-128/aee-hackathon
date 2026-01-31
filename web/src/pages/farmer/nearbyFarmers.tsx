import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Truck, Users, MessageCircle } from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ---------------- FIX LEAFLET ICON BUG ---------------- */
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------------- USER LOCATION ---------------- */
const userLocation: [number, number] = [18.5204, 73.8567];

/* ---------------- MOCK FARMERS ---------------- */
const farmers = [
  {
    id: "f1",
    name: "Ramesh Patel",
    village: "Kothrud",
    position: [18.5074, 73.8077] as [number, number],
    distanceKm: 2.3,
    crop: "Wheat",
    quantity: "Bulk",
  },
  {
    id: "f2",
    name: "Suresh Yadav",
    village: "Baner",
    position: [18.559, 73.7868] as [number, number],
    distanceKm: 4.8,
    crop: "Wheat",
    quantity: "Bulk",
  },
];

export default function FarmerNearbyFarmers() {
  const [activeFarmerId, setActiveFarmerId] = useState<string | null>(null);

  return (
    <ResponsiveLayout title="Nearby Farmers">
      <div className="space-y-6 max-w-6xl mx-auto">

        <div>
          <h1 className="text-2xl font-bold">Nearby Farmers</h1>
          <p className="text-muted-foreground">
            Farmers around you ready to collaborate
          </p>
        </div>

        {/* MAP */}
        <Card>
          <CardContent className="p-0 h-[65vh] min-h-[450px] overflow-hidden rounded-xl">
            <MapContainer
              center={userLocation}
              zoom={12}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={userLocation}>
                <Popup>You are here</Popup>
              </Marker>

              {farmers.map((f) => (
                <Marker
                  key={f.id}
                  position={f.position}
                  eventHandlers={{
                    click: () => setActiveFarmerId(f.id),
                  }}
                >
                  <Popup>
                    <p className="font-bold">{f.name}</p>
                    <p className="text-sm">
                      {f.village} • {f.distanceKm} km
                    </p>
                    <Badge className="mt-2 bg-emerald-100 text-emerald-700">
                      {f.crop} • {f.quantity}
                    </Badge>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        {/* LIST */}
        <div className="grid gap-4">
          {farmers.map((f) => (
            <Card key={f.id}>
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{f.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {f.village} • {f.distanceKm} km away
                    </p>
                  </div>
                  <Users className="text-emerald-600" />
                </div>

                <Badge className="bg-emerald-100 text-emerald-700">
                  {f.crop} • {f.quantity}
                </Badge>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Truck className="w-4 h-4 mr-1" />
                    Share Transport
                  </Button>
                  <Button size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
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
