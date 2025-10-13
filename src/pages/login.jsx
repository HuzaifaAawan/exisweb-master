// import { useEffect } from "react";

// function Login() {
//   useEffect(() => {
//     const baseSSOUrl = "https://58.65.189.226:884/custom-login";

//     // Always send user to your callback route after login
//     const callbackUrl = encodeURIComponent(
//       "http://localhost:3000/auth/callback?redirect=/new-reg"
//     );

//     const finalUrl = `${baseSSOUrl}?callbackUrl=${callbackUrl}`;

//     window.location.href = finalUrl;
//   }, []);

//   return <h2>Redirecting to Excise SSO...</h2>;
// }

// export default Login;
import { useState } from "react";
import axios from "axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://58.65.189.226:884/api/auth/generate-token",
        {
          userName: "user1@nadra.com",
          password: "Change$mypass123",
        }
      );
      console.debug(response, "response");
      const token = response.data?.token || response.data?.access_token;
      if (token) {
        localStorage.setItem("authToken", token);
        window.location.href = "/new-reg"; // redirect to your app
      } else {
        setError("Token not found in response");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Excise SSO Login</h2>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
