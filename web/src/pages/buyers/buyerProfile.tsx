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
import { BuyerProfile as BuyerProfileType } from "@/types";
import { toast } from "@/hooks/use-toast";

/* ============ BUYER PROFILE ============ */
export default function BuyerProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState<BuyerProfileType | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await buyerService.getProfile();
      setProfileData(response.data);
    } catch (error: any) {
      console.error("Failed to load profile:", error);
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
    } catch (error: any) {
      console.error("Failed to update profile:", error);
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
            <Button onClick={loadProfile} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </ResponsiveLayout>
    );
  }

  const stats = {
    memberSince: profileData.createdAt
      ? new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : "N/A",
  };

  const recentActivity = [
    {
      id: 1,
      action: "Placed order",
      description: "50kg Premium Basmati Rice",
      date: "2 hours ago",
      icon: ShoppingCart,
    },
    {
      id: 2,
      action: "Left review",
      description: "Kumar Farm Estate - 5 stars",
      date: "1 day ago",
      icon: Star,
    },
    {
      id: 3,
      action: "Added to wishlist",
      description: "Organic Wheat from Punjab Harvest",
      date: "3 days ago",
      icon: Heart,
    },
  ];

  return (
    <ResponsiveLayout title="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt={profileData.name} className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-emerald-600" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
                <p className="text-muted-foreground mb-2">{profileData.businessName || "Buyer"}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {profileData.businessType && (
                    <Badge variant="outline">{profileData.businessType}</Badge>
                  )}
                  <Badge className="status-success">Verified Buyer</Badge>
                </div>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                className="gap-2"
                disabled={saving}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-sm font-semibold truncate">{profileData.email}</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <p className="text-sm font-semibold">{profileData.phone || "Not set"}</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Member Since</p>
              <p className="text-sm font-bold">{stats.memberSince}</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-semibold">{profileData.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  Email
                </label>
                <p className="font-semibold text-muted-foreground">{profileData.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  Phone
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.phone || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-semibold">{profileData.phone || "Not set"}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  Business Name
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.businessName || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, businessName: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-semibold">{profileData.businessName || "Not set"}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  Business Type
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.businessType || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, businessType: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-semibold">{profileData.businessType || "Not set"}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  City
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.city || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, city: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-semibold">{profileData.city || "Not set"}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground mb-2 block">
                  State
                </label>
                {isEditing ? (
                  <Input
                    value={profileData.state || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, state: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-semibold">{profileData.state || "Not set"}</p>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="mt-6">
                <Button className="gap-2" onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <activity.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="card-hover cursor-pointer hover:border-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Manage notification preferences
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer hover:border-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">Security</p>
                  <p className="text-sm text-muted-foreground">
                    Change password and security settings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer hover:border-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold">Payment Methods</p>
                  <p className="text-sm text-muted-foreground">
                    Manage payment options
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover cursor-pointer hover:border-red-500"
            onClick={handleLogout}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <LogOut className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-red-600">Logout</p>
                  <p className="text-sm text-muted-foreground">
                    Sign out from your account
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ResponsiveLayout>
  );
}