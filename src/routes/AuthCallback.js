import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessed = useRef(false);
  const { setToken } = useAuth();

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const params = new URLSearchParams(location.search);
    const token = params.get("token") || params.get("access_token") || params.get("authToken") || params.get("jwt");
    const redirectPath = params.get("redirect") || "/new-reg";

    if (token) {
      setToken(token);
      navigate(redirectPath, { replace: true });
    } else {
      console.error("AuthCallback - No token found in URL");
      navigate("/login");
    }
  }, [location.search, navigate]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Signing you in...</h2>
      <p>Processing authentication, please wait...</p>
    </div>
  );
}

export default AuthCallback;
