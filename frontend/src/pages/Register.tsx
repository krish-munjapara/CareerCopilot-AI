import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'
import AuthLayout from '@/components/layout/AuthLayout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface RegisterFormData {
  full_name: string
  email: string
  password: string
  confirmPassword: string
}

declare global {
  interface Window {
    google: any
  }
}

export default function Register() {
  const { register: registerUser, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

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
            text: 'signup_with',
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

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      })
      toast.success('Welcome to CareerCopilot!')
      navigate('/dashboard')
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } }
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Start your AI-powered career journey">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          id="full_name"
          label="Full Name"
          type="text"
          autoComplete="name"
          placeholder="Alex Rivera"
          required
          leftIcon={<User className="h-4 w-4" />}
          error={errors.full_name?.message}
          {...register('full_name', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Full name must be at least 2 characters' },
          })}
        />

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
          autoComplete="new-password"
          placeholder="••••••••"
          required
          leftIcon={<Lock className="h-4 w-4" />}
          hint="Minimum 8 characters"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
          })}
        />

        <div className="flex items-start gap-2 text-sm text-ink-muted">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
        </div>

        <Button type="submit" variant="primary" fullWidth loading={loading} size="lg">
          Create Account
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
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
