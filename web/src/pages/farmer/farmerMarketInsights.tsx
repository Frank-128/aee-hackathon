import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Store,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ================= MOCK DATA ================= */

const marketPrices = [
  {
    crop: "Tomato",
    unit: "per quintal",
    price: 3450,
    oldPrice: 3100,
    trend: "+12%",
    confidence: 90,
  },
];

const nearbyMarkets = [
  {
    name: "Azadpur Mandi",
    distance: "12 km",
    demand: "High",
    price: 3510,
    profit: "+₹60",
  },
  {
    name: "Okhla Market",
    distance: "25 km",
    demand: "Stable",
    price: 3420,
    profit: "-₹30",
  },
];

/* ================= PAGE ================= */

export default function FarmerInsights() {
  return (
    <ResponsiveLayout title="Market Insights">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= CURRENT PRICE ================= */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Current Market Price
                </p>
                <h2 className="text-2xl font-bold">
                  Tomato{" "}
                  <span className="text-muted-foreground text-base font-medium">
                    (per quintal)
                  </span>
                </h2>
              </div>

              <Badge className="bg-emerald-100 text-emerald-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>

            <div className="flex items-end gap-3">
              <p className="text-4xl font-extrabold text-emerald-600">
                ₹3,450
              </p>
              <p className="text-lg text-muted-foreground line-through">
                ₹3,100
              </p>
            </div>

            <div className="flex items-center gap-4 bg-muted/40 p-4 rounded-xl">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-600 flex items-center justify-center font-bold text-sm">
                90%
              </div>
              <div>
                <p className="font-semibold">
                  High Confidence AI Prediction
                </p>
                <p className="text-xs text-muted-foreground">
                  Based on 5 years of seasonal data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= PRICE TREND ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Price Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 rounded-xl border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">
              📈 Price trend chart (past vs forecast)
            </div>
          </CardContent>
        </Card>

        {/* ================= AI RECOMMENDATION ================= */}
        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 font-bold">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              Best Selling Window
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Prices are predicted to peak in{" "}
              <span className="font-bold underline">mid-May</span>.
              Consider holding your stock for 3 more weeks to maximize profit.
            </p>
            <div className="text-xs opacity-80">
              Many farmers in your area are also waiting.
            </div>
          </CardContent>
        </Card>

        {/* ================= NEARBY MARKETS ================= */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby Markets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nearbyMarkets.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between p-4 border border-border rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Store className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.distance} • {m.demand} demand
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-emerald-600">
                    ₹{m.price}
                  </p>
                  <p
                    className={`text-xs font-bold ${
                      m.profit.startsWith("+")
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {m.profit}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </ResponsiveLayout>
  );
}
