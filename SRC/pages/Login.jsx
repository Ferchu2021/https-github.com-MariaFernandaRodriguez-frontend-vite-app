import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [input, setInput] = useState({ user: '', password: '' });
  const [errors, setErrors] = useState({});
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
    const val = validate(input);
    setErrors(val);
    if (Object.keys(val).length === 0) {
      // Aquí puedes hacer la petición de autenticación al backend
      // Ejemplo:
      // const data = await loginRequest(input);
      // localStorage.setItem('token', data.token);
      // navigate('/dashboard');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="user" value={input.user} onChange={handleChange} placeholder="Usuario" />
      {errors.user && <span>{errors.user}</span>}
      <input name="password" type="password" value={input.password} onChange={handleChange} placeholder="Contraseña" />
      {errors.password && <span>{errors.password}</span>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
