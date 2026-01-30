import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { User, Users, Eye, EyeOff } from "lucide-react";

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

  const handleRegister = () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !dob ||
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

    toast({
      title: "Registration successful",
      description: `Account created as ${role}`,
    });

    navigate("/login");
  };

  const inputClass =
    "h-11 rounded-lg bg-slate-50 border border-border px-4 text-sm focus:bg-white focus:outline-none focus:ring-0";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="bg-white border border-border/60 rounded-xl shadow-md">
          <CardHeader className="text-center">
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join the AI-enabled farmer–buyer marketplace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === "role" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Choose your role
                </p>

                <Button
                  variant="outline"
                  className="w-full h-11 rounded-full bg-slate-50 border border-border justify-start gap-3 hover:bg-slate-100"
                  onClick={() => handleRoleSelect("farmer")}
                >
                  <User className="w-4 h-4" />
                  Farmer
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 rounded-full bg-slate-50 border border-border justify-start gap-3 hover:bg-slate-100"
                  onClick={() => handleRoleSelect("buyer")}
                >
                  <Users className="w-4 h-4" />
                  Consumer / Buyer
                </Button>
              </div>
            )}

            {step === "details" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Input className={inputClass} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <Input className={inputClass} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <Input className={inputClass} placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} />
                <Input className={inputClass} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                <Input className={inputClass} placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                {/* STATE */}
                <div className="relative">
                  <Input className={inputClass} placeholder="State" value={stateQuery} onChange={(e) => {
                    setStateQuery(e.target.value);
                    setSelectedState("");
                    setSelectedDistrict("");
                    setDistrictQuery("");
                  }} />
                  {stateQuery && !selectedState && (
                    <div className="absolute z-10 w-full bg-white border border-border rounded-lg mt-1 max-h-40 overflow-auto shadow-sm">
                      {filteredStates.map((s) => (
                        <div
                          key={s}
                          className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm"
                          onClick={() => {
                            setSelectedState(s);
                            setStateQuery(s);
                          }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* DISTRICT */}
                <div className="relative">
                  <Input className={inputClass} placeholder="District" disabled={!selectedState} value={districtQuery} onChange={(e) => {
                    setDistrictQuery(e.target.value);
                    setSelectedDistrict("");
                  }} />
                  {districtQuery && !selectedDistrict && (
                    <div className="absolute z-10 w-full bg-white border border-border rounded-lg mt-1 max-h-40 overflow-auto shadow-sm">
                      {filteredDistricts.map((d) => (
                        <div
                          key={d}
                          className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm"
                          onClick={() => {
                            setSelectedDistrict(d);
                            setDistrictQuery(d);
                            setAddress("");
                          }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Input
                  className={inputClass}
                  placeholder={
                    selectedDistrict
                      ? "Full Address (House, Street, Area)"
                      : "Select State & District first"
                  }
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!selectedDistrict}
                />


                {/* PASSWORD */}
                <div className="relative">
                  <Input className={inputClass} type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="relative">
                  <Input className={inputClass} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Button className="w-full h-11 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium" onClick={handleRegister}>
                  Create Account
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-muted-foreground">
            Already have an account? Login →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
