import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService, type AuthResponse } from '@/services/auth.service'

interface AuthContextType {
  user: AuthResponse['user'] | null
  isAuthenticated: boolean
  loading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (credentials: { full_name: string; email: string; password: string }) => Promise<void>
  loginWithGoogle: (idToken: string) => Promise<void>
  logout: () => void
  restoreSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null)
  const [loading, setLoading] = useState(true)

  const restoreSession = async () => {
    try {
      const token = authService.getToken()
      if (!token) {
        setLoading(false)
        return
      }

      // Verify token with backend
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      // Token is invalid or expired, clear auth state
      authService.logout()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    restoreSession()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    const response = await authService.login(credentials)
    authService.setAuth(response)
    setUser(response.user)
  }

  const register = async (credentials: { full_name: string; email: string; password: string }) => {
    const response = await authService.register(credentials)
    authService.setAuth(response)
    setUser(response.user)
  }

  const loginWithGoogle = async (idToken: string) => {
    const response = await authService.loginWithGoogle(idToken)
    authService.setAuth(response)
    setUser(response.user)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
