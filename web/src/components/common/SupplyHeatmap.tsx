import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* -------- SUPPLY DATA (INTENSITY BASED) -------- */
const supplyPoints = [
  { lat: 17.6805, lng: 74.0183, intensity: 90, name: "Satara" },
  { lat: 19.9975, lng: 73.7898, intensity: 70, name: "Nashik" },
  { lat: 18.5204, lng: 73.8567, intensity: 40, name: "Pune" },
  { lat: 16.7050, lng: 74.2433, intensity: 60, name: "Kolhapur" },
];

export default function SupplyHeatmap() {
  return (
    <MapContainer
      {...({
        center: [18.9068, 75.6741],
        zoom: 7,
        scrollWheelZoom: false,
      } as any)}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "1rem",
      }}
    >
      <TileLayer
        {...({
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        } as any)}
      />

      {supplyPoints.map((p) => (
        <CircleMarker
          key={p.name}
          center={[p.lat, p.lng]}
          radius={p.intensity / 2}
          pathOptions={{
            color: "red",
            fillColor:
              p.intensity > 80
                ? "#dc2626"
                : p.intensity > 60
                ? "#f97316"
                : "#22c55e",
            fillOpacity: 0.5,
          }}
        >
          <Popup>
            <strong>{p.name}</strong>
            <br />
            Supply Index: {p.intensity}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
