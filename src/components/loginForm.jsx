import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Input from "components/Input";

export default function LoginForm() {
  const { login } = useAuth();
  const [user, setUser] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const validate = (values) => {
    let valErrors = {};
    if (!values.username) valErrors.username = "Usuario requerido";
    if (!values.password) valErrors.password = "Contraseña requerida";
    else if (values.password.length < 6) valErrors.password = "La contraseña debe tener al menos 6 caracteres";
    return valErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "", general: "" });
    const val = validate(user);
    if (Object.keys(val).length > 0) {
      setErrors({ ...errors, ...val });
      return;
    }
    setLoading(true);
    try {
      await login(user);
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: "Credenciales inválidas" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="username"
        label="Usuario"
        type="text"
        value={user.username}
        onChange={handleChange}
        placeholder="Tu usuario"
        error={errors.username}
      />
      <Input
        name="password"
        label="Contraseña"
        type="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Contraseña"
        error={errors.password}
      />
      {errors.general && <div className="input-error-message">{errors.general}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
