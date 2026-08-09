import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Lock, ArrowRight, Eye, EyeOff, Shield } from 'lucide-react'
import AuthLayout from '@/components/layout/AuthLayout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface LoginFormData {
  email: string
  password: string
}

declare global {
  interface Window {
    google: any
  }
}

// Global flag to prevent duplicate script loading (but allow re-initialization for callback updates)
let googleGisScriptLoaded = false

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const handleGoogleCredentialResponse = useCallback(async (response: any) => {
    console.log('[AUTH] Google credential callback invoked')
    console.log('[AUTH] Google credential received:', !!response.credential)
    console.log('[AUTH] Credential length:', response.credential?.length || 0)
    setGoogleLoading(true)
    try {
      console.log('[AUTH] Sending credential to /auth/google')
      await loginWithGoogle(response.credential)
      console.log('[AUTH] Google authentication successful')
      toast.success('Signed in with Google!')
      navigate('/dashboard')
    } catch (error: unknown) {
      console.log('[AUTH] Google authentication failed:', error)
      const err = error as { response?: { status?: number; data?: { detail?: string } } }
      console.log('[AUTH] Backend response status:', err.response?.status)
      console.log('[AUTH] Backend error detail:', err.response?.data?.detail)
      toast.error(err.response?.data?.detail || 'Google sign-in failed')
    } finally {
      setGoogleLoading(false)
    }
  }, [loginWithGoogle, navigate])

  // Load Google Identity Services
  useEffect(() => {
    console.log('[AUTH] Runtime origin:', window.location.origin)
    console.log('[AUTH] Google Client ID configured:', !!import.meta.env.VITE_GOOGLE_CLIENT_ID)
    if (import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      console.log('[AUTH] Google Client ID suffix:', import.meta.env.VITE_GOOGLE_CLIENT_ID.split('.apps.googleusercontent.com')[0])
    }

    // Load GIS script only once globally
    if (!googleGisScriptLoaded && !window.google) {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log('[AUTH] Google Identity Services loaded')
        googleGisScriptLoaded = true
      }
      script.onerror = () => {
        console.error('[AUTH] Failed to load Google Identity Services')
      }
      document.body.appendChild(script)
    }

    // Initialize and render button when Google is available
    const initializeAndRenderButton = () => {
      if (window.google) {
        console.log('[AUTH] Initializing Google Sign-In')
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
        })
        
        const buttonElement = document.getElementById('google-signin-button')
        if (buttonElement) {
          // Clear previous button if exists
          buttonElement.innerHTML = ''
          window.google.accounts.id.renderButton(
            buttonElement,
            {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'signin_with',
              width: 400,
              logo_alignment: 'left',
            }
          )
          console.log('[AUTH] Google Sign-In button rendered')
        } else {
          console.error('[AUTH] Google button element not found')
        }
      }
    }

    // If Google is already loaded, initialize immediately
    if (window.google) {
      initializeAndRenderButton()
    } else {
      // Otherwise, wait for it to load
      const checkInterval = setInterval(() => {
        if (window.google) {
          clearInterval(checkInterval)
          initializeAndRenderButton()
        }
      }, 100)

      // Cleanup interval after 5 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkInterval)
        if (!window.google) {
          console.error('[AUTH] Google Identity Services failed to load within timeout')
        }
      }, 5000)

      return () => {
        clearInterval(checkInterval)
        clearTimeout(timeout)
      }
    }
  }, [handleGoogleCredentialResponse])

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      await login(data)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your CareerCopilot account" showBackLink>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />

        <div className="relative">
          <Input
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            required
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.3rem] text-ink-muted hover:text-ink transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>


        <Button type="submit" variant="primary" fullWidth disabled={loading} size="lg">
          {loading ? 'Signing in...' : 'Sign In'}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-surface px-2 text-ink-muted">Or continue with</span>
        </div>
      </div>

      <div id="google-signin-button" className="w-full flex justify-center">
        {googleLoading && (
          <div className="flex items-center justify-center gap-2 py-3 text-sm text-ink-muted">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-surface-border border-t-primary-600" />
            <span>Connecting to Google...</span>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 hover:underline">
          Create one
        </Link>
      </p>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-muted">
        <Shield className="h-3.5 w-3.5" />
        <span>Your account is protected with secure authentication</span>
      </div>
    </AuthLayout>
  )
}
