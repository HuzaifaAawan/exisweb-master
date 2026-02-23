import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth(); // Use AuthContext state directly
  const location = useLocation();

  console.log("PrivateRoute checking auth at:", location.pathname);
  console.log("PrivateRoute found token:", token ? "YES (length: " + token.length + ")" : "NO");

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
