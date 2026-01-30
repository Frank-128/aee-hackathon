import {
  MapPin,
  Star,
  MessageCircle,
  Phone,
  Package,
  ShieldCheck,
  TrendingUp,
  Clock,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function FarmerProfile() {
  return (
    <ResponsiveLayout title="Farmer Profile">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ================= HERO / IDENTITY ================= */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-green-500" />

          <CardContent className="pt-0 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">

              {/* Avatar + Name */}
              <div className="flex items-end gap-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-600 text-white text-2xl">
                    R
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold">Ramesh Patel</h2>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Available for Orders
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Kothrud, Pune • Joined 2021
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold">4.6</span>
                <span className="text-sm text-muted-foreground">
                  (38 trades)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Message
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            View Products
          </Button>
        </div>

        {/* ================= PRODUCTS SNAPSHOT ================= */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Currently Selling</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold">Wheat</p>
                  <p className="text-sm text-muted-foreground">
                    120 quintals available
                  </p>
                </div>
                <p className="font-semibold text-emerald-600">
                  ₹2,100 – ₹2,300
                </p>
              </div>

              <div className="p-4 border rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold">Rice</p>
                  <p className="text-sm text-muted-foreground">
                    60 quintals available
                  </p>
                </div>
                <p className="font-semibold text-emerald-600">
                  ₹3,200 – ₹3,450
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= TRUST METRICS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5 text-center space-y-1">
              <TrendingUp className="w-5 h-5 mx-auto text-emerald-600" />
              <p className="text-xl font-bold">92%</p>
              <p className="text-xs text-muted-foreground">
                On-time Delivery
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 text-center space-y-1">
              <Package className="w-5 h-5 mx-auto text-emerald-600" />
              <p className="text-xl font-bold">38</p>
              <p className="text-xs text-muted-foreground">
                Completed Deals
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 text-center space-y-1">
              <Clock className="w-5 h-5 mx-auto text-emerald-600" />
              <p className="text-sm font-bold">Active 2h ago</p>
              <p className="text-xs text-muted-foreground">
                Last Seen
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ================= RELIABILITY SIGNALS ================= */}
        <Card>
          <CardContent className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-emerald-600">92%</p>
              <p className="text-xs text-muted-foreground">Repeat Buyers</p>
            </div>
            <div>
              <p className="text-xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">Cancelled Orders</p>
            </div>
            <div>
              <p className="text-xl font-bold">1</p>
              <p className="text-xs text-muted-foreground">Disputes</p>
            </div>
            <div>
              <p className="text-xl font-bold">4 yrs</p>
              <p className="text-xs text-muted-foreground">Active Seller</p>
            </div>
          </CardContent>
        </Card>

        {/* ================= REVIEWS ================= */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Buyer Reviews</h3>

            <div className="space-y-3">
              <div className="p-4 border rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold">Rajesh Kumar</p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4" /> 5.0
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Timely delivery and excellent wheat quality. Would buy again.
                </p>
              </div>

              <div className="p-4 border rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold">Anita Deshmukh</p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4" /> 4.5
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Good pricing and cooperative farmer. Smooth transaction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= ABOUT ================= */}
        <Card>
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold text-lg">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experienced wheat farmer with bulk storage capacity and shared
              transport options. Regularly supplies to nearby mandis and
              collaborates with farmers to reduce logistics cost.
            </p>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">Bulk Supply</Badge>
              <Badge variant="outline">Shared Transport</Badge>
              <Badge variant="outline">Storage Available</Badge>
            </div>
          </CardContent>
        </Card>

      </div>
    </ResponsiveLayout>
  );
}
