import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { User, Users, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

/* ------------------ Types ------------------ */

type Role = "farmer" | "buyer";
type Step = "role" | "details";

type StateDistrictMap = {
  [state: string]: string[];
};

/* ------------------ Validation ------------------ */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/* ------------------ Dummy API ------------------ */

const fetchStatesAndDistricts = async (): Promise<StateDistrictMap> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        Karnataka: ["Bengaluru Urban", "Mysuru", "Mangaluru"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
        Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
        Telangana: ["Hyderabad", "Warangal"],
        Gujarat: ["Ahmedabad", "Surat"],
      });
    }, 500);
  });
};

/* ------------------ Component ------------------ */

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); // Use register from context

  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [stateQuery, setStateQuery] = useState("");
  const [districtQuery, setDistrictQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [statesData, setStatesData] = useState<StateDistrictMap>({});

  useEffect(() => {
    fetchStatesAndDistricts().then(setStatesData);
  }, []);

  const filteredStates = Object.keys(statesData).filter((s) =>
    s.toLowerCase().includes(stateQuery.toLowerCase())
  );

  const filteredDistricts =
    selectedState && statesData[selectedState]
      ? statesData[selectedState].filter((d) =>
        d.toLowerCase().includes(districtQuery.toLowerCase())
      )
      : [];

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    setStep("details");
  };

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !selectedState ||
      !selectedDistrict ||
      !password ||
      !confirmPassword
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill all required details",
        variant: "destructive",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!strongPasswordRegex.test(password)) {
      toast({
        title: "Weak password",
        description:
          "Password must contain uppercase, lowercase & number (min 8 chars)",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!role) {
      toast({
        title: "Error",
        description: "Role is missing",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Backend expects role in UPPERCASE, but frontend uses lowercase
      await register({
        name: `${firstName} ${lastName}`,
        email,
        password,
        role: role.toUpperCase() as any, // Send UPPERCASE to backend
      });

      toast({
        title: "Registration successful",
        description: `Account created as ${role}`,
      });

      // Navigate using lowercase role for frontend routing
      navigate(`/${role.toLowerCase()}/dashboard`);

    } catch (error: any) {
      console.error("Registration error:", error);

      // Extract error message from various possible error structures
      let errorMessage = "Something went wrong";

      if (error?.response?.data) {
        const errorData = error.response.data;

        // Handle different error response formats
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          // Handle validation errors array
          errorMessage = errorData.errors[0].msg || errorData.errors[0].message || errorData.errors[0];
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-black/60" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold font-display">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            AgriMarket
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h1 className="text-4xl font-bold leading-tight font-display">
            Start your journey with <br />
            <span className="text-emerald-400">Intelligent Agriculture</span>
          </h1>
          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">For Farmers</h3>
                <p className="text-slate-300 text-sm">Access crop predictions, soil health checks, and direct buyers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">For Buyers</h3>
                <p className="text-slate-300 text-sm">Source verified produce directly from farms with quality assurance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-400">
          Join 50,000+ users transforming Indian agriculture.
        </div>
      </div>

      {/* RIGHT PANEL - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {step === "details" && (
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all -ml-2 text-muted-foreground" onClick={() => setStep("role")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Role Selection
            </Button>
          )}

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="mt-2 text-muted-foreground">
              {step === "role" ? "Select how you want to use the platform" : `Complete your ${role} profile`}
            </p>
          </div>

          {step === "role" ? (
            <div className="grid gap-4">
              <button
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-emerald-600 hover:bg-emerald-50 transition-all group text-left"
                onClick={() => handleRoleSelect("farmer")}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <User className="w-6 h-6 text-emerald-700 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold">I am a Farmer</h3>
                  <p className="text-sm text-muted-foreground">I want to sell my produce & get insights.</p>
                </div>
              </button>

              <button
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-blue-600 hover:bg-blue-50 transition-all group text-left"
                onClick={() => handleRoleSelect("buyer")}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Users className="w-6 h-6 text-blue-700 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold">I am a Buyer</h3>
                  <p className="text-sm text-muted-foreground">I want to purchase crops in bulk.</p>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium">State</label>
                  <Input placeholder="Select State" value={stateQuery} onChange={(e) => {
                    setStateQuery(e.target.value);
                    setSelectedState("");
                    setSelectedDistrict("");
                    setDistrictQuery("");
                  }} />
                  {stateQuery && !selectedState && (
                    <div className="absolute top-[70px] z-50 w-full bg-white border border-border rounded-lg max-h-40 overflow-auto shadow-lg">
                      {filteredStates.map((s) => (
                        <div key={s} className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm" onClick={() => {
                          setSelectedState(s);
                          setStateQuery(s);
                        }}>{s}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium">District</label>
                  <Input placeholder="Select District" disabled={!selectedState} value={districtQuery} onChange={(e) => {
                    setDistrictQuery(e.target.value);
                    setSelectedDistrict("");
                  }} />
                  {districtQuery && !selectedDistrict && (
                    <div className="absolute top-[70px] z-50 w-full bg-white border border-border rounded-lg max-h-40 overflow-auto shadow-lg">
                      {filteredDistricts.map((d) => (
                        <div key={d} className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm" onClick={() => {
                          setSelectedDistrict(d);
                          setDistrictQuery(d);
                          setAddress("");
                        }}>{d}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Input placeholder="Farm Address / Area" disabled={!selectedDistrict} value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pr-10" />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button className="w-full h-11 text-base mt-2" onClick={handleRegister}>
                Create My Account <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
