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

    const { loginDemo } = useAuth();

    const handleLogin = () => {
    loginDemo("farmer@test.com", "farmer");
    console.log("LOGIN CALLED");
    };


  return (
    <ResponsiveLayout title="Products">
      <div className="space-y-6">
 
      </div>
    </ResponsiveLayout>
  );
}
