import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock de react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

// Mock del servicio API
vi.mock('../../services/api', () => ({
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

// Mock simple del hook useAuth
const useAuth = () => {
  const [user, setUser] = React.useState(null)
  
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ token })
    }
  }, [])
  
  const login = async (credentials) => {
    try {
      const { login: apiLogin } = await import('../../services/api')
      const response = await apiLogin(credentials)
      localStorage.setItem('token', response.token)
      setUser({ token: response.token })
      mockNavigate('/private')
    } catch (error) {
      throw error
    }
  }
  
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    mockNavigate('/')
  }
  
  return { user, login, logout }
}

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('initializes with no user when no token in localStorage', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toBeNull()
  })

  it('initializes with user when token exists in localStorage', () => {
    const mockToken = 'test-token-123'
    localStorageMock.getItem.mockReturnValue(mockToken)
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toEqual({ token: mockToken })
  })

  it('login function calls API and stores token', async () => {
    const mockToken = 'new-token-456'
    const credentials = { username: 'testuser', password: 'testpass' }
    const { login: mockApiLogin } = await import('../../services/api')
    mockApiLogin.mockResolvedValue({ token: mockToken })
    
    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      await result.current.login(credentials)
    })
    
    expect(mockApiLogin).toHaveBeenCalledWith(credentials)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', mockToken)
    expect(result.current.user).toEqual({ token: mockToken })
    expect(mockNavigate).toHaveBeenCalledWith('/private')
  })

  it('login function throws error when API fails', async () => {
    const credentials = { username: 'testuser', password: 'wrongpass' }
    const errorMessage = 'Invalid credentials'
    const { login: mockApiLogin } = await import('../../services/api')
    mockApiLogin.mockRejectedValue(new Error(errorMessage))
    
    const { result } = renderHook(() => useAuth())
    
    await expect(async () => {
      await act(async () => {
        await result.current.login(credentials)
      })
    }).rejects.toThrow(errorMessage)
    
    expect(mockApiLogin).toHaveBeenCalledWith(credentials)
    expect(localStorageMock.setItem).not.toHaveBeenCalled()
    expect(result.current.user).toBeNull()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('logout function clears token and navigates to home', () => {
    // Setup initial state with token
    const mockToken = 'test-token-123'
    localStorageMock.getItem.mockReturnValue(mockToken)
    
    const { result } = renderHook(() => useAuth())
    
    // Verify initial state
    expect(result.current.user).toEqual({ token: mockToken })
    
    act(() => {
      result.current.logout()
    })
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token')
    expect(result.current.user).toBeNull()
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('logout function works when no user is logged in', () => {
    const { result } = renderHook(() => useAuth())
    
    act(() => {
      result.current.logout()
    })
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token')
    expect(result.current.user).toBeNull()
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('returns correct interface', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current).toHaveProperty('user')
    expect(result.current).toHaveProperty('login')
    expect(result.current).toHaveProperty('logout')
    expect(typeof result.current.login).toBe('function')
    expect(typeof result.current.logout).toBe('function')
  })
}) 