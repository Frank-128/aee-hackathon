import { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { farmerService } from "@/services/farmerService";
import { FarmerProfile as FarmerProfileType } from "@/types";

export default function FarmerProfile() {
  const isOwner = true;

  /* -------------------- STATE -------------------- */
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<FarmerProfileType | null>(null);

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    isAvailable: true,
  });

  /* -------------------- LOAD PROFILE -------------------- */
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await farmerService.getProfile();
      const profileData: FarmerProfileType = response.data as FarmerProfileType;
      setProfile(profileData);

      // Initialize edit form with loaded data
      setEditForm({
        name: profileData.name || "",
        phone: profileData.phone || "",
        email: profileData.email || "",
        city: profileData.city || profileData.address?.city || "",
        state: profileData.state || profileData.address?.state || "",
        isAvailable: profileData.isAvailable ?? true,
      });
    } catch (error: any) {
      console.error("Failed to load profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- HANDLERS -------------------- */
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await farmerService.updateProfile({
        name: editForm.name,
        phone: editForm.phone,
        email: editForm.email,
        city: editForm.city,
        state: editForm.state,
      });

      const updatedProfile: FarmerProfileType = response.data as FarmerProfileType;
      setProfile(updatedProfile);
      setEditProfileOpen(false);

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAddressSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await farmerService.updateProfile({
        city: editForm.city,
        state: editForm.state,
      });

      const updatedProfile: FarmerProfileType = response.data as FarmerProfileType;
      setProfile(updatedProfile);
      setEditAddressOpen(false);

      toast({
        title: "Success",
        description: "Address updated successfully!",
      });
    } catch (error: any) {
      console.error("Failed to update address:", error);
      toast({
        title: "Error",
        description: "Failed to update address",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvailabilityToggle = async (checked: boolean) => {
    try {
      const response = await farmerService.updateProfile({
        isAvailable: checked,
      });

      const updatedProfile: FarmerProfileType = response.data as FarmerProfileType;
      setProfile(updatedProfile);
      setEditForm({ ...editForm, isAvailable: checked });

      toast({
        title: "Success",
        description: `You are now ${checked ? "available" : "unavailable"} for orders`,
      });
    } catch (error: any) {
      console.error("Failed to update availability:", error);
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      });
    }
  };

  /* -------------------- LOADING STATE -------------------- */
  if (loading) {
    return (
      <ResponsiveLayout title="My Profile">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      </ResponsiveLayout>
    );
  }

  if (!profile) {
    return (
      <ResponsiveLayout title="My Profile">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load profile</p>
          <Button onClick={loadProfile} className="mt-4">
            Retry
          </Button>
        </div>
      </ResponsiveLayout>
    );
  }

  const joinedYear = profile.createdAt ? new Date(profile.createdAt).getFullYear() : "2021";
  const location = profile.city || profile.address?.city || "Unknown";

  return (
    <ResponsiveLayout title="My Profile">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ================= PUBLIC PROFILE ================= */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-green-500" />
          <CardContent className="pt-0 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
              <div className="flex items-end gap-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-emerald-600 text-white text-2xl">
                    {profile.name?.charAt(0).toUpperCase() || "F"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    {profile.isAvailable && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Available for Orders
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {location} • Joined {joinedYear}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold">{profile.trustScore?.toFixed(1) || "N/A"}</span>
                <span className="text-sm text-muted-foreground">Trust Score</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================= PRIVATE ACCOUNT VIEW ================= */}
        {isOwner && (
          <>
            {/* PERSONAL DETAILS */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Personal Details</h3>
                  <Button size="sm" variant="outline" onClick={() => setEditProfileOpen(true)}>
                    Edit
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {profile.name}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {profile.phone || "Not set"}</p>
                  <p><span className="text-muted-foreground">Email:</span> {profile.email}</p>
                  <p><span className="text-muted-foreground">Role:</span> Farmer</p>
                </div>

                {/* Availability Toggle */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="font-medium">Availability Status</p>
                    <p className="text-sm text-muted-foreground">
                      {profile.isAvailable ? "You are accepting orders" : "You are not accepting orders"}
                    </p>
                  </div>
                  <Switch
                    checked={profile.isAvailable ?? true}
                    onCheckedChange={handleAvailabilityToggle}
                  />
                </div>
              </CardContent>
            </Card>

            {/* ADDRESS */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">Address Management</h3>
                  <Button size="sm" variant="outline" onClick={() => setEditAddressOpen(true)}>
                    Edit Address
                  </Button>
                </div>
                <div className="p-4 border rounded-xl">
                  <p className="font-medium">Primary Farm Address</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.city || profile.address?.city || "City not set"}, {profile.state || profile.address?.state || "State not set"}
                  </p>
                  <Badge className="mt-2">Default</Badge>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* ================= MODALS ================= */}

        {/* EDIT PROFILE */}
        <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Personal Details</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleProfileSave}>
              <div>
                <Label>Name</Label>
                <Input
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={editForm.phone}
                  onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={saving}>
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* EDIT ADDRESS */}
        <Dialog open={editAddressOpen} onOpenChange={setEditAddressOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Address Details</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleAddressSave}>
              <div>
                <Label>City</Label>
                <Input
                  value={editForm.city}
                  onChange={e => setEditForm({ ...editForm, city: e.target.value })}
                  placeholder="Enter city"
                  required
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  value={editForm.state}
                  onChange={e => setEditForm({ ...editForm, state: e.target.value })}
                  placeholder="Enter state"
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={saving}>
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Address"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </ResponsiveLayout>
  );
}
