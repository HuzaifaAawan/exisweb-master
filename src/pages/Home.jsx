import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_URL } from "../constants";

function Home() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(HOME_PAGE_URL, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("SSO User:", data);
        setToken(data.token); // store token in context + localStorage
        navigate("/"); // go to app dashboard
      })
      .catch((err) => console.error("Error fetching SSO user:", err));
  }, [setToken, navigate]);

  return <h2>Processing login...</h2>;
}

export default Home;
