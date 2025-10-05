import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  // This will check if a token exists or not, if not, redirect to /login path.

  if (!token) {
    // no token? send to login
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
