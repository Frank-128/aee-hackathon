import { useState } from "react";
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

type Role = "farmer" | "consumer";
type Step = "role" | "details";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep("details");
  };

  const handleRegister = () => {
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !dob ||
      !email ||
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
          "Password must be at least 8 characters and include uppercase, lowercase, and a number",
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="bg-card/90 backdrop-blur border border-border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Join the AI-enabled farmer–buyer marketplace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* STEP 1 – ROLE */}
            {step === "role" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Choose your role
                </p>

                <Button
                  className="
                    w-full justify-start gap-3
                    border border-border
                    bg-background text-foreground
                    transition-all duration-200
                    hover:border-primary
                    hover:bg-primary/5
                    hover:-translate-y-[1px]
                    hover:shadow-sm
                  "
                  onClick={() => handleRoleSelect("farmer")}
                >
                  <User className="w-4 h-4" />
                  Farmer
                </Button>

                <Button
                  className="
                    w-full justify-start gap-3
                    border border-border
                    bg-background text-foreground
                    transition-all duration-200
                    hover:border-primary
                    hover:bg-primary/5
                    hover:-translate-y-[1px]
                    hover:shadow-sm
                  "
                  onClick={() => handleRoleSelect("consumer")}
                >
                  <Users className="w-4 h-4" />
                  Consumer / Buyer
                </Button>
              </div>
            )}

            {/* STEP 2 – DETAILS */}
            {step === "details" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-background border-border focus-visible:ring-primary"
                  />
                  <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-background border-border focus-visible:ring-primary"
                  />
                </div>

                <Input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="bg-background border-border focus-visible:ring-primary"
                />

                <Input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />

                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />

                {/* Password */}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-border focus-visible:ring-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-background border-border focus-visible:ring-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <Button
                  className="
                    w-full
                    transition-all duration-200
                    hover:shadow-md
                    hover:-translate-y-[1px]
                  "
                  onClick={handleRegister}
                >
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
