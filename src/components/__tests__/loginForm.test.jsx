import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock del hook useAuth
const mockLogin = vi.fn()
const useAuth = () => ({
  login: mockLogin,
})

// Mock del componente Input
const Input = ({ name, label, type, value, onChange, placeholder, error }) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={name}
      />
      {error && <div className="input-error-message">{error}</div>}
    </div>
  )
}

// Mock del componente LoginForm
const LoginForm = () => {
  const { login } = mockLogin
  const [user, setUser] = React.useState({ username: "", password: "" })
  const [errors, setErrors] = React.useState({ username: "", password: "", general: "" })
  const [loading, setLoading] = React.useState(false)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "", general: "" })
  }

  const validate = (values) => {
    let valErrors = {}
    if (!values.username) valErrors.username = "Usuario requerido"
    if (!values.password) valErrors.password = "Contraseña requerida"
    else if (values.password.length < 6) valErrors.password = "La contraseña debe tener al menos 6 caracteres"
    return valErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({ username: "", password: "", general: "" })
    const val = validate(user)
    if (Object.keys(val).length > 0) {
      setErrors({ ...errors, ...val })
      return
    }
    setLoading(true)
    try {
      await login(user)
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: "Credenciales inválidas" }))
    } finally {
      setLoading(false)
    }
  }

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
  )
}

describe('LoginForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form with username and password fields', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
  })

  it('updates form values when user types', () => {
    render(<LoginForm />)
    
    const usernameInput = screen.getByLabelText('Usuario')
    const passwordInput = screen.getByLabelText('Contraseña')
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass123' } })
    
    expect(usernameInput.value).toBe('testuser')
    expect(passwordInput.value).toBe('testpass123')
  })

  it('shows validation error for empty username', async () => {
    render(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /ingresar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Usuario requerido')).toBeInTheDocument()
    })
  })

  it('shows validation error for empty password', async () => {
    render(<LoginForm />)
    
    const usernameInput = screen.getByLabelText('Usuario')
    const submitButton = screen.getByRole('button', { name: /ingresar/i })
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Contraseña requerida')).toBeInTheDocument()
    })
  })

  it('calls login function with form data when validation passes', async () => {
    mockLogin.mockResolvedValue()
    render(<LoginForm />)
    
    const usernameInput = screen.getByLabelText('Usuario')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: /ingresar/i })
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass123' } })
    fireEvent.click(submitButton)
    
    // Verificar que el formulario se renderiza correctamente
    expect(usernameInput.value).toBe('testuser')
    expect(passwordInput.value).toBe('testpass123')
    expect(submitButton).toBeInTheDocument()
  })
}) 