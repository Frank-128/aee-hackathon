import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* -------------------- Types -------------------- */

export type UserRole = "farmer" | "buyer" | "admin";

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginDemo: (email: string, role: UserRole) => AuthResult;
  logout: () => void;
}

/* -------------------- Context -------------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* -------------------- Mock Users (DEMO ONLY) -------------------- */

const mockUsers: Record<UserRole, User> = {
  farmer: {
    id: "farmer-1",
    name: "Ramesh Kumar",
    email: "farmer@test.com",
    role: "farmer",
  },
  buyer: {
    id: "buyer-1",
    name: "Anita Verma",
    email: "buyer@test.com",
    role: "buyer",
  },
  admin: {
    id: "admin-1",
    name: "Admin User",
    email: "admin@test.com",
    role: "admin",
  },
};

/* -------------------- Provider -------------------- */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ---------- Restore session on refresh ---------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  /* ---------------- Login (Demo) ---------------- */
  const loginDemo = (email: string, role: UserRole): AuthResult => {
    const baseUser = mockUsers[role];

    const loggedUser: User = {
      ...baseUser,
      email,
    };

    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("auth_token", "demo-token");

    return { success: true, user: loggedUser };
  };

  /* ---------------- Logout ---------------- */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginDemo,
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
