
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    console.log("Callback URL:", window.location.href);
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const redirectPath = params.get("redirect") || "/new-reg";

    if (token) {
      localStorage.setItem("authToken", token);
      setTimeout(() => navigate(redirectPath, { replace: true }), 100);
    } else {
      console.error("❌ No token found in callback URL!");
      navigate("/login");
    }
  }, [location, navigate]);

  return <h2>Signing you in...</h2>;
}

export default AuthCallback;
