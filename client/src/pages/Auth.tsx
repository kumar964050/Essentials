import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthForms } from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleAuthSuccess = () => {
    navigate("/", { replace: true });
  };

  if (Cookies.get("token")) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <AuthForms onSuccess={handleAuthSuccess} />
    </div>
  );
};

export default Auth;
