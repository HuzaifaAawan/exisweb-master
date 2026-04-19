import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch {
    return null;
  }
}

function extractUserName(claims) {
  if (!claims) return null;
  return claims.name || claims.preferred_username || claims.given_name || claims.sub || null;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("authToken"));

  const claims = token ? decodeJwt(token) : null;
  const userName = extractUserName(claims);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("authToken", token);
    } else {
      sessionStorage.removeItem("authToken");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, userName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
