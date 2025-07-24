import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [input, setInput] = useState({ user: '', password: '' });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(''); // para error de autenticación
  const navigate = useNavigate();

  function validate(values) {
    let errors = {};
    if (!values.user) errors.user = 'Usuario requerido';
    if (!values.password) errors.password = 'Contraseña requerida';
    else if (values.password.length < 6)
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    return errors;
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError(''); // limpiar error previo
    const val = validate(input);
    setErrors(val);
    if (Object.keys(val).length === 0) {
      try {
        // ⚠️ Reemplazá por tu petición real al backend:
        // Por ejemplo: const data = await loginRequest(input);
        // Simulación de respuesta de backend:
        if (input.user === "admin" && input.password === "admin123") {
          const fakeToken = "token_de_ejemplo_jwt";
          localStorage.setItem('token', fakeToken); // guardar token
          navigate('/dashboard'); // redirigir a la privada
        } else {
          setAuthError("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        setAuthError("Error de servidor. Intentalo de nuevo.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="user"
        value={input.user}
        onChange={handleChange}
        placeholder="Usuario"
      />
      {errors.user && <span style={{ color: 'red' }}>{errors.user}</span>}
      <input
        name="password"
        type="password"
        value={input.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      <button type="submit">Login</button>
      {authError && (
        <div style={{ color: 'red', marginTop: '1em' }}>{authError}</div>
      )}
    </form>
  );
}

export default Login;
