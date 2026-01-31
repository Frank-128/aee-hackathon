import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Camera,
  Edit,
  X,
  Check,
  ShoppingCart,
  Star,
  Heart,
  Bell,
  Lock,
  CreditCard,
  LogOut,
  Loader2,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { buyerService } from "@/services/buyerService";
import { dealService } from "@/services/dealService";
import { BuyerProfile as BuyerProfileType } from "@/types";
import { toast } from "@/hooks/use-toast";

/* ============ BUYER PROFILE ============ */
export default function BuyerProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] =
    useState<BuyerProfileType | null>(null);

  useEffect(() => {
    loadProfile();
    console.log("TOKEN USED:", localStorage.getItem('auth_token'));
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await buyerService.getProfile();

      // ✅ IMPORTANT FIX HERE
      setProfileData(res.data.data);

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleSave = async () => {
    if (!profileData) return;

    try {
      setSaving(true);
      await buyerService.updateProfile(profileData);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
      loadProfile();
    } catch {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <ResponsiveLayout title="Profile">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      </ResponsiveLayout>
    );
  }

  if (!profileData) {
    return (
      <ResponsiveLayout title="Profile">
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <p>Failed to load profile data</p>
            <Button onClick={loadProfile} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </ResponsiveLayout>
    );
  }

  const stats = {
    memberSince: profileData.createdAt
      ? new Date(profileData.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
      : "N/A",
  };

  /* ---------- DATA ---------- */
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await dealService.getMyDeals();
        const deals = res.data || [];
        // Sort by date desc
        const sorted = deals.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

        const activity = sorted.map((d: any) => ({
          id: d._id,
          action: "Placed order",
          description: `${d.quantity} ${d.unit} ${d.cropName}`,
          date: new Date(d.createdAt).toLocaleDateString(), // simplified relative time
          icon: ShoppingCart,
        }));
        setRecentActivity(activity);
      } catch (e) {
        console.error("Failed to fetch activity");
      }
    };
    if (user) fetchActivity();
  }, [user]);

  // Fallback if empty
  const defaultActivity = [
    {
      id: 1,
      action: "Welcome!",
      description: "Account created",
      date: new Date().toLocaleDateString(),
      icon: Star,
    }
  ];

  const displayActivity = recentActivity.length > 0 ? recentActivity : defaultActivity;

  return (
    <ResponsiveLayout title="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
              <User className="w-12 h-12 text-emerald-600" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">
                {profileData.businessName || "Buyer"}
              </p>
              <div className="flex gap-2 mt-2 justify-center md:justify-start">
                {profileData.businessType && (
                  <Badge variant="outline">
                    {profileData.businessType}
                  </Badge>
                )}
                <Badge className="status-success">Verified Buyer</Badge>
              </div>
            </div>

            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
              disabled={saving}
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card><CardContent className="p-6 text-center">{profileData.email}</CardContent></Card>
          <Card><CardContent className="p-6 text-center">{profileData.phone || "Not set"}</CardContent></Card>
          <Card><CardContent className="p-6 text-center">{stats.memberSince}</CardContent></Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {displayActivity.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader><CardTitle>Address Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City */}
            <div>
              <label className="text-sm font-semibold">City</label>
              {isEditing ? (
                <Input
                  value={profileData.location.city || ""}
                  onChange={(e) =>
                    setProfileData((prev) =>
                      prev
                        ? {
                          ...prev,
                          location: {
                            ...prev.location,
                            city: e.target.value,
                          },
                        }
                        : prev
                    )
                  }
                />
              ) : (
                <p>{profileData.location.city || "Not set"}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="text-sm font-semibold">State</label>
              {isEditing ? (
                <Input
                  value={profileData.location.state || ""}
                  onChange={(e) =>
                    setProfileData((prev) =>
                      prev
                        ? {
                          ...prev,
                          location: {
                            ...prev.location,
                            state: e.target.value,
                          },
                        }
                        : prev
                    )
                  }
                />
              ) : (
                <p>{profileData.location.state || "Not set"}</p>
              )}
            </div>
          </CardContent>

          {isEditing && (
            <CardContent>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Check />}
                Save Changes
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Logout */}
        <Card onClick={handleLogout} className="cursor-pointer hover:border-red-500">
          <CardContent className="p-6 flex items-center gap-4">
            <LogOut className="text-red-600" />
            <span className="text-red-600 font-semibold">Logout</span>
          </CardContent>
        </Card>
      </div>
    </ResponsiveLayout>
  );
}
