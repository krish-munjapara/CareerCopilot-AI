import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService, type AuthResponse } from '@/services/auth.service'

interface AuthContextType {
  user: AuthResponse['user'] | null
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (credentials: { full_name: string; email: string; password: string }) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = authService.getToken()
    const savedUser = authService.getUser()
    if (token && savedUser) {
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    const response = await authService.login(credentials)
    localStorage.setItem('token', response.access_token)
    localStorage.setItem('user', JSON.stringify(response.user))
    setUser(response.user)
  }

  const register = async (credentials: { full_name: string; email: string; password: string }) => {
    const response = await authService.register(credentials)
    localStorage.setItem('token', response.access_token)
    localStorage.setItem('user', JSON.stringify(response.user))
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
        login,
        register,
        logout,
        loading,
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
