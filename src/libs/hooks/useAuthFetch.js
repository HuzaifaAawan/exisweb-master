import { useAuth } from "../../context/AuthContext";

export function useAuthFetch() {
  const { token, setToken } = useAuth();

  const authFetch = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      setToken(null);
      const callbackUrl = encodeURIComponent(
        `${window.location.origin}/auth/callback?redirect=${window.location.pathname}`
      );
      window.location.href = `${process.env.REACT_APP_SSO_LOGIN_URL}?callbackUrl=${callbackUrl}`;
      return null;
    }

    return response;
  };

  return authFetch;
}
