import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User, AuthState } from "../types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface AuthContextType extends AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLogin: (userData: User, token: string) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = (userData: User, token: string) => {
    setIsLoading(true);
    Cookies.set("token", token);
    setUser(userData);
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoading(true);
    Cookies.remove("token");
    setUser(null);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = Cookies.get("token");
        const url = `http://localhost:3000/api/auth/user`;
        const res = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.status === "success") {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
