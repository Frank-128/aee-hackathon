import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ---------------- FIX LEAFLET ICON ---------------- */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------------- DATA ---------------- */
const userLocation: LatLngExpression = [18.5204, 73.8567];

const farmers = [
  {
    id: "f1",
    name: "Ramesh Patel",
    village: "Kothrud",
    position: [18.5074, 73.8077] as LatLngExpression,
    distanceKm: 2.3,
  },
  {
    id: "f2",
    name: "Suresh Yadav",
    village: "Baner",
    position: [18.559, 73.7868] as LatLngExpression,
    distanceKm: 4.8,
  },
];

export default function FarmerNearbyFarmers() {
  const navigate = useNavigate();

  return (
    <ResponsiveLayout title="Nearby Farmers">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Nearby Farmers</h1>
          <p className="text-muted-foreground">
            Farmers around you available for collaboration
          </p>
        </div>

        {/* MAP */}
        <Card>
          <CardContent className="p-0 h-[60vh] min-h-[420px] rounded-xl overflow-hidden">
            <MapContainer
              center={userLocation}
              zoom={12}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* USER LOCATION */}
              <Marker position={userLocation}>
                <Popup>You are here</Popup>
              </Marker>

              {/* FARMERS */}
              {farmers.map((f) => (
                <Marker key={f.id} position={f.position}>
                  <Popup>
                    <div className="space-y-2">
                      <p className="font-bold">{f.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {f.village} • {f.distanceKm} km away
                      </p>

                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          navigate(`/farmer/nearby-farmers/${f.id}`)
                        }
                      >
                        View Profile
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}
