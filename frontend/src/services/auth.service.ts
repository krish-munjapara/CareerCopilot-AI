import api from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  full_name: string
  email: string
  password: string
}

export interface GoogleAuthRequest {
  id_token: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: {
    id: string
    full_name: string
    email: string
    role: string
    auth_provider: string
    profile_picture?: string
  }
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/register', credentials)
    return response.data
  },

  async loginWithGoogle(idToken: string): Promise<AuthResponse> {
    const response = await api.post('/auth/google', { id_token: idToken })
    return response.data
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await api.get('/auth/me')
    return response.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  setAuth(authResponse: AuthResponse) {
    localStorage.setItem('token', authResponse.access_token)
    localStorage.setItem('user', JSON.stringify(authResponse.user))
  },
}
