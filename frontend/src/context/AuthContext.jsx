import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'
import { cookieService } from '../services/cookieService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check cookies first, then localStorage for backward compatibility
    const cookieSession = cookieService.getUserSession()
    const localToken = localStorage.getItem('token')
    
    if (cookieSession) {
      setUser(cookieSession.user)
      localStorage.setItem('token', cookieSession.token)
    } else if (localToken) {
      // For demo purposes, set a mock user when token exists
      const mockUser = { name: 'John Doe', email: 'john@example.com', role: 'user' }
      setUser(mockUser)
      cookieService.setUserSession(localToken, mockUser)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await authService.login(email, password)
    const token = response.access_token
    const user = response.user
    
    localStorage.setItem('token', token)
    cookieService.setUserSession(token, user)
    setUser(user)
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    
    // If registration includes access_token, auto-login the user
    if (response.access_token && response.user) {
      const token = response.access_token
      const user = response.user
      
      localStorage.setItem('token', token)
      cookieService.setUserSession(token, user)
      setUser(user)
    }
    
    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    cookieService.clearUserSession()
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}