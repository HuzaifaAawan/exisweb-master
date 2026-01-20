import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
    setIsChecking(false);
  }, [location.pathname]);

  if (isChecking) {
    return <h2>Checking authentication...</h2>;
  }

  if (!token) {
    // Token missing → redirect to SSO login
    const baseSSOUrl = process.env.REACT_APP_SSO_LOGIN_URL;
    const callbackUrl = encodeURIComponent(
      `${window.location.origin}/auth/callback?redirect=${location.pathname}`,
    );
    window.location.href = `${baseSSOUrl}?callbackUrl=${callbackUrl}`;
    return null;
  }

  return children;
};

export default PrivateRoute;
