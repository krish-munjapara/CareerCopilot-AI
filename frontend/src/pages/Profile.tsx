import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { User, Mail, Shield, Key, Trash2, Camera, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { MotionPage } from '@/components/ui/Motion'

export default function Profile() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(user?.full_name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSave = () => {
    toast.success('Profile updated successfully!')
    setEditing(false)
  }

  const handleCancel = () => {
    setFullName(user?.full_name || '')
    setEmail(user?.email || '')
    setEditing(false)
  }

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-4xl">
        <PageHeader badge="Account" title="Profile" description="Manage your account settings and preferences" />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="elevated" className="lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary text-white text-3xl font-bold shadow-glow">
                  {fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-surface-border shadow-sm hover:bg-surface-subtle transition-colors"
                  aria-label="Change avatar"
                >
                  <Camera className="h-4 w-4 text-ink-muted" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-ink">{fullName || 'User'}</h3>
              <p className="text-sm text-ink-muted">{email}</p>
              <Badge variant="primary" className="mt-2 capitalize">
                {user?.role}
              </Badge>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card variant="elevated">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-ink">Account Information</h3>
                {!editing && (
                  <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>

              {editing ? (
                <div className="space-y-5">
                  <Input
                    id="fullName"
                    label="Full Name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    leftIcon={<User className="h-4 w-4" />}
                  />
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="h-4 w-4" />}
                  />
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleSave} variant="primary">
                      <Check className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <dl className="space-y-4">
                  <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/80 p-4 transition-colors hover:bg-surface-subtle">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                      <User className="h-5 w-5 text-primary-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <dt className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Full Name</dt>
                      <dd className="font-medium text-ink">{user?.full_name}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/80 p-4 transition-colors hover:bg-surface-subtle">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50">
                      <Mail className="h-5 w-5 text-secondary-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <dt className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Email</dt>
                      <dd className="font-medium text-ink">{user?.email}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/80 p-4 transition-colors hover:bg-surface-subtle">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50">
                      <Shield className="h-5 w-5 text-success-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <dt className="text-xs font-medium uppercase tracking-wide text-ink-subtle">Role</dt>
                      <dd>
                        <Badge variant="success" className="capitalize">
                          {user?.role}
                        </Badge>
                      </dd>
                    </div>
                  </div>
                </dl>
              )}
            </Card>

            <Card variant="elevated">
              <h3 className="mb-4 text-lg font-semibold text-ink">Account Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                  <Key className="h-4 w-4" />
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-red-600 hover:border-red-200 hover:bg-red-50"
                  size="lg"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </MotionPage>
    </AppLayout>
  )
}
