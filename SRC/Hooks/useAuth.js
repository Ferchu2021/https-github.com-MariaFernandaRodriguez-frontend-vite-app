import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../services/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  const login = async (credentials) => {
    const { token } = await apiLogin(credentials);
    localStorage.setItem("token", token);
    setUser({ token });
    navigate("/private");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return { user, login, logout };
}
