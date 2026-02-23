import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessed = useRef(false);
  const { setToken } = useAuth();

  // Helper function to get cookie value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    // Prevent double execution
    if (hasProcessed.current) {
      console.log("AuthCallback - Already processed, skipping");
      return;
    }

    hasProcessed.current = true;

    const params = new URLSearchParams(location.search);
    console.log("AuthCallback - Full URL:", window.location.href);
    console.log("AuthCallback - URL Params:", Object.fromEntries(params));

    // Try to get token from cookie first (preferred method)
    let token = getCookie("token");
    let tokenSource = "cookie";
    console.log("AuthCallback - Token from cookie:", token ? "Found" : "Not found");

    // Fallback: try URL parameters
    if (!token) {
      token =
        params.get("token") ||
        params.get("access_token") ||
        params.get("authToken") ||
        params.get("jwt");
      tokenSource = "url";
      console.log("AuthCallback - Token from URL:", token ? "Found" : "Not found");
    }

    const redirectPath = params.get("redirect") || "/new-reg";
    console.log("AuthCallback - Redirect path:", redirectPath);

    if (token) {
      // Update AuthContext state (which will also update localStorage via useEffect)
      setToken(token);
      console.log("AuthCallback - Token stored via AuthContext");
      console.log("AuthCallback - Token source:", tokenSource);
      console.log("AuthCallback - Navigating to:", redirectPath);

      // Navigate immediately
      navigate(redirectPath, { replace: true });
    } else {
      alert("ERROR: No token found!");
      console.log("AuthCallback - ERROR: No token found in cookie or URL");
      console.log("AuthCallback - Redirecting to /login");
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
