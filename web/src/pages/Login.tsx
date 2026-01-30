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
import { Eye, EyeOff } from "lucide-react";

/* ------------------ Dummy DB ------------------ */

type UserRecord = {
  email: string;
  password: string;
  role: "farmer" | "consumer" | "admin";
};

const dummyUsers: UserRecord[] = [
  {
    email: "farmer@test.com",
    password: "Farmer@123",
    role: "farmer",
  },
  {
    email: "buyer@test.com",
    password: "Buyer@123",
    role: "consumer",
  },
  {
    email: "admin@test.com",
    password: "Admin@123",
    role: "admin",
  },
];

/* ------------------ Utils ------------------ */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------ Auth Function ------------------ */

const authenticateUser = (
  email: string,
  password: string
): UserRecord | null => {
  return (
    dummyUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    ) || null
  );
};

/* ------------------ Component ------------------ */

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter email and password",
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

    const user = authenticateUser(email, password);

    if (!user) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return;
    }

    // Successful login
    toast({
      title: "Login successful",
      description: `Welcome back, ${user.role}!`,
    });

    // Role-based redirect
    switch (user.role) {
      case "farmer":
        navigate("/farmer/dashboard");
        break;
      case "consumer":
        navigate("/buyer/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="bg-card/90 backdrop-blur border border-border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Access your farmer–buyer marketplace account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
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

            <Button
              className="
                w-full
                transition-all duration-200
                hover:shadow-md
                hover:-translate-y-[1px]
              "
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/register" className="hover:text-primary">
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
