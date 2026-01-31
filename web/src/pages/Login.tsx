import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

/* ------------------ Component ------------------ */

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login instead of loginDemo
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await login({ email, password });

      // Get user from context after successful login
      const storedUser = localStorage.getItem("user");
      let userRole = 'buyer'; // Default fallback
      console.log(storedUser);
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userRole = parsedUser.role.toLowerCase();
        } catch (parseError) {
          console.error("Failed to parse user data:", parseError);
        }
      }

      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });

      // Redirect based on role
      navigate(`/${userRole}/dashboard`);
    } catch (error: any) {
      console.error("Login error:", error);

      // Extract error message from various possible error structures
      let errorMessage = "Invalid credentials";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
