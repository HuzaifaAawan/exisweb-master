import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token"); // token from SSO
    const redirectPath =
      // params.get("redirect") ||
      "/new-reg";

    if (token) {
      localStorage.setItem("authToken", token); // store real token
      navigate(redirectPath, { replace: true });
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <h2>Signing you in...</h2>;
}

export default AuthCallback;
