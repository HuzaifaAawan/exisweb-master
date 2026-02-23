import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if already logged in
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) {
      navigate("/new-reg");
      return;
    }

   navigate("/new-reg");

    // Redirect to SSO login
    const ssoUrl = process.env.REACT_APP_SSO_LOGIN_URL;
    const callbackUrl = encodeURIComponent(
      `${window.location.origin}/auth/callback?redirect=/new-reg`
    );
    window.location.href = `${ssoUrl}?callbackUrl=${callbackUrl}`;
  };

  return (
    <div>
      <h2>Excise SSO Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
