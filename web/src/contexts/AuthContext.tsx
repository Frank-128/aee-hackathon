import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authService, LoginData, RegisterData } from "@/services/authService";
import { User, UserRole } from "@/types";

/* -------------------- Types -------------------- */

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

/* -------------------- Context -------------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* -------------------- Provider -------------------- */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ---------- Restore session on refresh ---------- */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const response = await authService.getCurrentUser();
          // Handle ApiResponse<User> format: { success, data: User }
          const userData = (response.data || response) as User;

          // Normalize the user role to lowercase
          const normalizedUser: User = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            role: userData.role.toLowerCase() as UserRole,
            phone: userData.phone,
            avatar: userData.avatar,
            city: userData.city,
            state: userData.state,
            createdAt: userData.createdAt,
          };

          setUser(normalizedUser);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  /* ---------------- Login ---------------- */
  const login = async (data: LoginData) => {
    try {
      const response = await authService.login(data);

      const normalizedUser: User = {
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role.toLowerCase() as UserRole,
      };

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      setUser(normalizedUser);
    } catch (error) {
      throw error;
    }
  };

  /* ---------------- Register ---------------- */
  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);

      const normalizedUser: User = {
        _id: response._id,
        name: response.name,
        email: response.email,
        role: response.role.toLowerCase() as UserRole,
      };

      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      setUser(normalizedUser);
    } catch (error) {
      throw error;
    }
  };

  /* ---------------- Logout ---------------- */
  const logout = () => {
    authService.logout();
    setUser(null);
    window.location.href = "/login"; // Force redirect
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* -------------------- Hook -------------------- */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Re-export types for convenience
export type { User, UserRole };

