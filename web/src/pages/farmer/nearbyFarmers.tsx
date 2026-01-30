import { useState } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer as LeafletTileLayer,
  Marker as LeafletMarker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

import { Truck, Users, MessageCircle } from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ---------------- TYPE ESCAPE (REACT-LEAFLET FIX) ---------------- */
const MapContainer = LeafletMap as any;
const TileLayer = LeafletTileLayer as any;
const Marker = LeafletMarker as any;
const PopupLeaflet = Popup as any;

/* ---------------- USER LOCATION ---------------- */
const userLocation = {
  lat: 18.5204,
  lng: 73.8567,
};

/* ---------------- MOCK FARMERS ---------------- */
const farmers = [
  {
    id: "f1",
    name: "Ramesh Patel",
    village: "Kothrud",
    lat: 18.5074,
    lng: 73.8077,
    distanceKm: 2.3,
    crop: "Wheat",
    quantity: "Bulk",
  },
  {
    id: "f2",
    name: "Suresh Yadav",
    village: "Baner",
    lat: 18.559,
    lng: 73.7868,
    distanceKm: 4.8,
    crop: "Wheat",
    quantity: "Bulk",
  },
];

/* ---------------- FARMER ICON ---------------- */
const farmerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* ---------------- GOOGLE-STYLE USER DOT ---------------- */
const userDotIcon = L.divIcon({
  className: "",
  html: `
    <div class="user-location-dot">
      <span></span>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

/* ---------------- COMPONENT ---------------- */
export default function FarmerNearbyFarmers() {
  // ✅ CLICK-BASED popup state (NOT hover)
  const [activeFarmerId, setActiveFarmerId] = useState<string | null>(
    null
  );

  return (
    <ResponsiveLayout title="Nearby Farmers">
      <div className="space-y-6 max-w-6xl mx-auto">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Nearby Farmers</h1>
          <p className="text-muted-foreground">
            Farmers around you ready to collaborate
          </p>
        </div>

        {/* MAP */}
        <Card>
          <CardContent className="p-0 h-[65vh] min-h-[450px] rounded-2xl overflow-hidden">
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={12}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* USER LOCATION */}
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={userDotIcon}
              >
                <PopupLeaflet>You are here</PopupLeaflet>
              </Marker>

              {/* FARMER MARKERS */}
              {farmers.map((f) => (
                <Marker
                  key={f.id}
                  position={[f.lat, f.lng]}
                  icon={farmerIcon}
                  eventHandlers={{
                    click: () => setActiveFarmerId(f.id),
                  }}
                >
                  {activeFarmerId === f.id && (
                    <PopupLeaflet offset={[0, -20]}>
                      <div className="space-y-2 min-w-[200px]">
                        <p className="font-bold">{f.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {f.village} • {f.distanceKm} km away
                        </p>

                        <Badge className="bg-emerald-100 text-emerald-700">
                          {f.crop} • {f.quantity}
                        </Badge>

                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() =>
                            (window.location.href =
                              `/farmer/nearby-farmers/${f.id}`)
                          }
                        >
                          View Full Profile
                        </Button>
                      </div>
                    </PopupLeaflet>
                  )}
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        {/* FARMER LIST */}
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

        {/* USER DOT STYLES */}
        <style>{`
          .user-location-dot {
            position: relative;
            width: 14px;
            height: 14px;
            background: #1a73e8;
            border-radius: 50%;
            box-shadow: 0 0 0 4px rgba(26,115,232,0.25);
          }

          .user-location-dot span {
            position: absolute;
            inset: -10px;
            border-radius: 50%;
            background: rgba(26,115,232,0.25);
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% {
              transform: scale(0.5);
              opacity: 0.8;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
        `}</style>

      </div>
    </ResponsiveLayout>
  );
}
