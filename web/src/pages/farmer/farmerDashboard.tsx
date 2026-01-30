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

  // const [searchTerm, setSearchTerm] = useState("");
  // const [filter, setFilter] = useState<"all" | "personal" | "business" | "home">("all");

  // const filteredLoans = allLoans.filter((loan) => {
  //   const matchesSearch = loan.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        loan.type.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesFilter = filter === "all" || loan.type.toLowerCase().includes(filter);
  //   return matchesSearch && matchesFilter;
  // });


/* ------------------------------------------------------ */

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ DEFAULT USER FOR TESTING
  const resolvedUser = user ?? {
    id: "user-1",
    name: "Test Customer",
    role: "customer",
    city: "Mumbai",
  };

  const primaryAccount = accounts[0];

  const pendingTransactions = transactions.filter(
    t => t.status === "pending"
  ).length;

    // ---------------- LOAN SEARCH STATE ----------------
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<
    "all" | "personal" | "business" | "home"
  >("all");

  const filteredLoans = allLoans.filter((loan) => {
    const matchesSearch =
      loan.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" || loan.type.toLowerCase().includes(filter);

    return matchesSearch && matchesFilter;
  });


  return (
    <ResponsiveLayout title="Dashboard">
      <div className="space-y-6">

        {/* -------- Welcome Section -------- */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">
              {resolvedUser.name}
            </h1>
          </div>

          <button
            onClick={() => navigate("/customer/branch")}
            className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm"
          >
            <MapPin className="w-4 h-4 text-primary" />
            {/* <span>{resolvedUser.city}</span> */}
          </button>
        </div>

        {/* -------- Account Balance -------- */}
        <div className="card-elevated">
          <p className="text-sm text-muted-foreground">
            {primaryAccount.type}
          </p>
          <h2 className="text-3xl font-bold mt-1">
            ₹{primaryAccount.balance.toLocaleString()}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Available Balance
          </p>
        </div>

        {/* -------- Interest / Offers -------- */}
        <div className="card-elevated">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Rates & Offers
            </h2>
            <button
              onClick={() => navigate("/customer/offers")}
              className="text-sm text-primary font-medium"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {interestRates.map(rate => (
              <div
                key={rate.id}
                className="text-center p-3 bg-muted/50 rounded-xl border"
              >
                <p className="text-lg font-bold text-primary">
                  {rate.rate}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {rate.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* -------- Quick Loans -------- */}
        <div className="">
          <main className="pt-12 pb-12">
            <div className="container mx-auto px-4">
              {/* Page Header */}
              <div className="mb-8 animate-fade-in">
                <Badge variant="outline" className="mb-3 text-primary border-primary/50">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Loan Marketplace
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  Explore <span className="text-gradient-gold">Loan Offers</span>
                </h1>
                <p className="text-muted-foreground">
                  Compare rates from top banking partners and find the best deal for you
                </p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by bank or loan type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "personal", label: "Personal" },
                    { value: "business", label: "Business" },
                    { value: "home", label: "Home" },
                  ].map((f) => (
                    <Button
                      key={f.value}
                      variant={filter === f.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(f.value as typeof filter)}
                    >
                      {f.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Loan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLoans.map((loan, index) => (
                  <Card 
                    key={loan.id} 
                    className="card-hover relative overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {loan.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-primary to-warning text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-semibold">{loan.bank}</CardTitle>
                          <p className="text-xs text-muted-foreground">{loan.type}</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Percent className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Rate</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-lg">{loan.rate}</span>
                          {loan.trend === 'down' ? (
                            <TrendingDown className="w-4 h-4 text-success" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-destructive" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <IndianRupee className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Max</span>
                        </div>
                        <span className="font-semibold">{loan.max}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Tenure</span>
                        </div>
                        <span className="text-sm">{loan.tenure}</span>
                      </div>
                      
                      <Link to="/apply">
                        <Button variant="secondary" className="w-full mt-2">
                          Apply Now
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredLoans.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">No loans found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </main>
        </div>

        

        {/* -------- Quick Actions -------- */}
        <div>
          <h2 className="section-title">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActionCard
              icon={ArrowUpRight}
              title="Transfer Money"
              description="Send money to any bank account"
              to="/customer/transfer"
              variant="primary"
            />

            <ActionCard
              icon={FileText}
              title="Transactions"
              description="View account activity"
              to="/customer/transactions"
              badge={pendingTransactions > 0 ? pendingTransactions : undefined}
            />

            <ActionCard
              icon={CreditCard}
              title="Cards & Loans"
              description="Manage cards and loan accounts"
              to="/customer/cards"
            />

            <ActionCard
              icon={Wallet}
              title="Bill Payments"
              description="Electricity, mobile & more"
              to="/customer/bills"
            />

            <ActionCard
              icon={MapPin}
              title="ATM / Branch Locator"
              description="Find nearby branches & ATMs"
              to="/customer/locator"
            />

            <ActionCard
              icon={Clock}
              title="Scheduled Payments"
              description="Upcoming & auto-debits"
              to="/customer/scheduled"
            />
          </div>
        </div>

        
      </div>
    </ResponsiveLayout>
  );
}
