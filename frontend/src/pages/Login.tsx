import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Lock, ArrowRight } from 'lucide-react'
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

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  // Load Google Identity Services
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
        })
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            text: 'signin_with',
            width: '100%',
            logo_alignment: 'left',
          }
        )
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleGoogleCredentialResponse = async (response: any) => {
    setGoogleLoading(true)
    try {
      await loginWithGoogle(response.credential)
      toast.success('Signed in with Google!')
      navigate('/dashboard')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Google sign-in failed')
    } finally {
      setGoogleLoading(false)
    }
  }

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
    <AuthLayout title="Welcome back" subtitle="Sign in to your CareerCopilot account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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

        <Input
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <input type="checkbox" className="rounded border-surface-border text-primary-600 focus:ring-primary-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" fullWidth loading={loading} size="lg">
          Sign In
          <ArrowRight className="h-4 w-4" />
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

      <div id="google-signin-button" className="w-full">
        {googleLoading && (
          <div className="flex items-center justify-center py-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-surface-border border-t-primary-600" />
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
