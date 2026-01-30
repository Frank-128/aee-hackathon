import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Clock,
  MapPin,
  TrendingUp,
  FileText,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { ActionCard } from "@/components/common/ActionCard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Search,
  TrendingDown,
  Percent,
  IndianRupee,
  Filter,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------- MOCK BANK DATA (TEMP) ---------------- */

const accounts = [
  {
    id: "acc-1",
    type: "Savings Account",
    balance: 84250,
    currency: "INR",
  },
];

const transactions = [
  { id: 1, status: "pending", amount: 2500 },
  { id: 2, status: "completed", amount: 12000 },
];

const interestRates = [
  { id: 1, name: "Savings Interest", rate: "4.0%" },
  { id: 2, name: "FD (1 Year)", rate: "6.75%" },
  { id: 3, name: "Personal Loan", rate: "10.5%" },
];

const allLoans = [
  { id: 1, bank: "State Bank of India", type: "Personal Loan", rate: "10.5%", max: "₹25,00,000", tenure: "60 months", trend: "down", featured: true },
  { id: 2, bank: "HDFC Bank", type: "Business Loan", rate: "11.25%", max: "₹50,00,000", tenure: "48 months", trend: "up", featured: false },
  { id: 3, bank: "ICICI Bank", type: "Micro Loan", rate: "12.0%", max: "₹5,00,000", tenure: "36 months", trend: "down", featured: true },
];

export default function CustomerDashboard() {
  // 🔒 ALL HOOKS FIRST — NO EXCEPTIONS
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<
    "all" | "personal" | "business" | "home"
  >("all");

  const resolvedUser = user;

  // ✅ THEN conditional rendering
  if (isLoading) {
    return (
      <ResponsiveLayout title="Dashboard">
        <div className="flex justify-center py-20">
          Loading dashboard…
        </div>
      </ResponsiveLayout>
    );
  }

  if (!resolvedUser) {
    return (
      <ResponsiveLayout title="Dashboard">
        <div className="flex flex-col items-center py-20 gap-3">
          <p>You are not logged in</p>
          <Button onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
      </ResponsiveLayout>
    );
  }

  return (
    <ResponsiveLayout title="Dashboard">
      <div className="space-y-8">

        {/* ================= GREETING ================= */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-600 flex items-center gap-1">
              ☀️ Good Morning
            </p>
            <h1 className="text-2xl font-bold">
              Namaste, {resolvedUser.name}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {resolvedUser?.city ?? "Unknown"}
            </Button>
          </div>
        </div>

        {/* ================= WEATHER / HIGHLIGHT ================= */}
        <Card className="bg-gradient-to-br from-emerald-600 to-lime-500 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Weather Today</p>
              <h3 className="text-3xl font-bold">
                28°C <span className="text-lg font-normal">Sunny</span>
              </h3>
              <Badge className="mt-2 bg-white/20 text-white">
                Best for Wheat Harvest
              </Badge>
            </div>
            <span className="text-6xl">🌤️</span>
          </CardContent>
        </Card>

        {/* ================= AI RATES ================= */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Today’s AI Rates</h2>
            <Button variant="ghost" size="sm">See All</Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              { crop: "Wheat", price: "₹2,125/qntl", trend: "+4.2%", up: true },
              { crop: "Tomato", price: "₹1,850/qntl", trend: "-1.5%", up: false },
              { crop: "Corn", price: "₹2,400/qntl", trend: "+2.8%", up: true },
            ].map((item) => (
              <Card
                key={item.crop}
                className="min-w-[150px] shrink-0"
              >
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    {item.crop}
                  </p>
                  <p className="text-lg font-bold">{item.price}</p>
                  <p
                    className={`text-xs font-semibold mt-1 ${item.up ? "text-emerald-600" : "text-red-500"
                      }`}
                  >
                    {item.trend}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ================= BUYER INTERESTS ================= */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Buyer Interests</h2>
            <Badge className="bg-emerald-600">3 New</Badge>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold">FreshMart Exports</h4>
                  <p className="text-sm text-muted-foreground">
                    Wants 500kg Wheat @ ₹2,200
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm">Accept</Button>
                    <Button size="sm" variant="outline">Negotiate</Button>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  2 min ago
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold">AgriLogistics Co.</h4>
                  <p className="text-sm text-muted-foreground">
                    Quote requested for Organic Basmati
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ActionCard
              icon={ArrowUpRight}
              title="Sell Crop"
              description="List produce"
              to="/sell"
            />
            <ActionCard
              icon={TrendingUp}
              title="Soil Analysis"
              description="AI insights"
              to="/soil"
            />
            <ActionCard
              icon={Clock}
              title="Track Truck"
              description="Live tracking"
              to="/tracking"
            />
            <ActionCard
              icon={FileText}
              title="Govt Schemes"
              description="Apply benefits"
              to="/schemes"
            />
          </div>
        </section>

      </div>
    </ResponsiveLayout>
  );
}
