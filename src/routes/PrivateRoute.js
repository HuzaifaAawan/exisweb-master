
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setHasToken(!!token);
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <h2>Checking authentication...</h2>;
  }

  if (!hasToken) {
    // Not logged in then redirect to SSO login page
    const baseSSOUrl = "https://58.65.189.226:884/custom-login";
    const callbackUrl = encodeURIComponent(
      `${window.location.origin}/auth/callback?redirect=${location.pathname}`
    );
    window.location.href = `${baseSSOUrl}?callbackUrl=${callbackUrl}`;
    return null;
  }

  return children;
};

export default PrivateRoute;
