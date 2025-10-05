import { useEffect } from "react";
import { SSO_URL } from "../constants";


function Login() {
  useEffect(() => {
    // Immediately send user to SSO login page
    window.location.href = SSO_URL;
  }, []);

  return <h2>Redirecting to SSO login...</h2>;
}

export default Login;
