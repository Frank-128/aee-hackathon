import { useState } from "react";
import {
  MapPin,
  Star,
  ShieldCheck,
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

export default function FarmerProfile() {
  const isOwner = true;

  /* -------------------- STATE -------------------- */
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [editBankOpen, setEditBankOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Ramesh Patel",
    phone: "+91 98XXXXXX21",
    email: "ramesh@farmmail.com",
    role: "Farmer",
  });

  const [address, setAddress] = useState({
    title: "Primary Farm Address",
    location: "Kothrud, Pune – 411038",
  });

  const [bank, setBank] = useState({
    name: "State Bank of India",
    account: "XXXX-XXXX-9821",
    payout: "Weekly",
  });

  /* -------------------- HANDLERS -------------------- */
  const handleProfileSave = (e: any) => {
    e.preventDefault();
    setEditProfileOpen(false);
  };

  const handleAddressSave = (e: any) => {
    e.preventDefault();
    setEditAddressOpen(false);
  };

  const handleBankSave = (e: any) => {
    e.preventDefault();
    setEditBankOpen(false);
  };

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
                  <AvatarImage src="/avatars/ramesh.png" />
                  <AvatarFallback className="bg-emerald-600 text-white text-2xl">
                    R
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
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

              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold">4.6</span>
                <span className="text-sm text-muted-foreground">(38 trades)</span>
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
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">Personal Details</h3>
                  <Button size="sm" variant="outline" onClick={() => setEditProfileOpen(true)}>
                    Edit
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {profile.name}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {profile.phone}</p>
                  <p><span className="text-muted-foreground">Email:</span> {profile.email}</p>
                  <p><span className="text-muted-foreground">Role:</span> {profile.role}</p>
                </div>
              </CardContent>
            </Card>

            {/* ADDRESS */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">Address Management</h3>
                  <Button size="sm" variant="outline" onClick={() => setEditAddressOpen(true)}>
                    Add / Edit Address
                  </Button>
                </div>
                <div className="p-4 border rounded-xl">
                  <p className="font-medium">{address.title}</p>
                  <p className="text-sm text-muted-foreground">{address.location}</p>
                  <Badge className="mt-2">Default</Badge>
                </div>
              </CardContent>
            </Card>

            {/* PAYMENTS */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Payment Details</h3>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Bank:</span> {bank.name}</p>
                  <p><span className="text-muted-foreground">Account:</span> {bank.account}</p>
                  <p><span className="text-muted-foreground">Payout Cycle:</span> {bank.payout}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditBankOpen(true)}>
                  Update Bank Details
                </Button>
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
                <Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <Button className="w-full">Save Changes</Button>
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
                <Label>Address Title</Label>
                <Input value={address.title} onChange={e => setAddress({ ...address, title: e.target.value })} />
              </div>
              <div>
                <Label>Location</Label>
                <Input value={address.location} onChange={e => setAddress({ ...address, location: e.target.value })} />
              </div>
              <Button className="w-full">Save Address</Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* EDIT BANK */}
        <Dialog open={editBankOpen} onOpenChange={setEditBankOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Bank Details</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleBankSave}>
              <div>
                <Label>Bank Name</Label>
                <Input value={bank.name} onChange={e => setBank({ ...bank, name: e.target.value })} />
              </div>
              <div>
                <Label>Account Number</Label>
                <Input value={bank.account} onChange={e => setBank({ ...bank, account: e.target.value })} />
              </div>
              <div>
                <Label>Payout Cycle</Label>
                <Input value={bank.payout} onChange={e => setBank({ ...bank, payout: e.target.value })} />
              </div>
              <Button className="w-full">Update Bank</Button>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </ResponsiveLayout>
  );
}
