import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const existingToken = localStorage.getItem("authToken");
    const token =
      existingToken ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibWVyY2hhbnQiLCJleHAiOjE3NjMzNzE0NDIsImp0aSI6IjEiLCJpYXQiOjE3NjIxNjE4NDIsImlzcyI6ImJsb29taW5ndiIsInN1YiI6IjFkZjBlYzAwLWI2YzYtNGFiNS05OGJkLTczMWIxMTJhYzE3MyJ9.mK8zciAV3Y_hkzxllxMXuw_yF1EBJ9MRlISwQm_r4Dg";

    if (!existingToken) {
      localStorage.setItem("authToken", token);
    }

    navigate("/new-reg");

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
