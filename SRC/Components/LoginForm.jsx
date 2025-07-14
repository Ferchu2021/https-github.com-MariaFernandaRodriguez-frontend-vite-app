import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user);
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input name="username" placeholder="Usuario" value={user.username} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" value={user.password} onChange={handleChange} required />
      <button type="submit">Ingresar</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
