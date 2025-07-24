import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "src/Components/Input";

function Login() {
  const [input, setInput] = useState({ user: '', password: '' });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate(values) {
    let errors = {};
    if (!values.user) errors.user = 'Usuario requerido';
    if (!values.password) errors.password = 'Contraseña requerida';
    else if (values.password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres';
    return errors;
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setAuthError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError('');
    const val = validate(input);
    setErrors(val);
    if (Object.keys(val).length === 0) {
      setLoading(true);
      try {
        // ⚠️ Acá debes poner tu petición real al backend.
        if (input.user === "admin" && input.password === "admin123") {
          const fakeToken = "token_de_ejemplo_jwt";
          localStorage.setItem('token', fakeToken);
          navigate('/dashboard');
        } else {
          setAuthError("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        setAuthError("Error de servidor. Intentalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="user"
        label="Usuario"
        type="text"
        value={input.user}
        onChange={handleChange}
        placeholder="Tu usuario"
        error={errors.user}
      />
      <Input
        name="password"
        label="Contraseña"
        type="password"
        value={input.password}
        onChange={handleChange}
        placeholder="Contraseña"
        error={errors.password}
      />
      {authError && <div className="input-error-message">{authError}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}

export default Login;
