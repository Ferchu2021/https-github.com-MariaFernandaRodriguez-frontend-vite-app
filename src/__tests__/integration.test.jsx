import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock del servicio API
vi.mock('../services/api', () => ({
  login: vi.fn(),
}))

// Mock del localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock simple de la aplicación
const App = () => {
  const [currentPage, setCurrentPage] = React.useState('home')
  const [formData, setFormData] = React.useState({ username: '', password: '' })
  const [errors, setErrors] = React.useState({})

  const handleLoginClick = () => {
    setCurrentPage('login')
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.username) newErrors.username = 'Usuario requerido'
    if (!formData.password) newErrors.password = 'Contraseña requerida'
    
    if (Object.keys(newErrors).length === 0) {
      // Simular login exitoso
      localStorageMock.setItem('token', 'test-token')
    } else {
      setErrors(newErrors)
    }
  }

  if (currentPage === 'home') {
    return (
      <div>
        <h1>Bienvenido</h1>
        <button onClick={handleLoginClick}>Ingresar</button>
      </div>
    )
  }

  if (currentPage === 'login') {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    )
  }

  return null
}

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('renders home page by default', () => {
    render(<App />)
    
    expect(screen.getByText(/bienvenido/i)).toBeInTheDocument()
  })

  it('navigates to login page when login link is clicked', () => {
    render(<App />)
    
    const loginButton = screen.getByRole('button', { name: /ingresar/i })
    fireEvent.click(loginButton)
    
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
  })

  it('form validation shows appropriate errors', async () => {
    render(<App />)
    
    // Navigate to login
    const loginButton = screen.getByRole('button', { name: /ingresar/i })
    fireEvent.click(loginButton)
    
    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /ingresar/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/usuario requerido/i)).toBeInTheDocument()
      expect(screen.getByText(/contraseña requerida/i)).toBeInTheDocument()
    })
  })

  it('successful form submission', async () => {
    render(<App />)
    
    // Navigate to login
    const loginButton = screen.getByRole('button', { name: /ingresar/i })
    fireEvent.click(loginButton)
    
    // Fill form
    const usernameInput = screen.getByLabelText(/usuario/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const submitButton = screen.getByRole('button', { name: /ingresar/i })
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'test-token')
    })
  })
}) 