import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_URL } from "../constants";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Call the SSO "home" endpoint to fetch token and user details
    fetch(HOME_PAGE_URL, {
      method: "GET",
      credentials: "include", // important if SSO sets cookies
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.token) {
          // save token in localStorage
          localStorage.setItem("authToken", data.token);
          // redirect to app layout
          navigate("/", { replace: true });
        } else {
          console.error("Login failed: No token found");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Auth error:", err);
        navigate("/login");
      });
  }, [navigate]);

  return <h2>Finishing login...</h2>;
}

export default AuthCallback;
