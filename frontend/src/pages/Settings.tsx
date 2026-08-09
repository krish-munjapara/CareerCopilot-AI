import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Bell, LogOut, Trash2, Download, Shield, User, Sun, Moon, Monitor, LayoutGrid, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { MotionPage } from '@/components/ui/Motion'
import api from '@/services/api'

type Category = 'general' | 'notifications' | 'appearance' | 'privacy' | 'account'

interface SettingsData {
  language: string
  default_target_role: string
  default_experience_level: string
  default_job_type: string
  preferred_location: string
  notifications: {
    email: boolean
    analysis_completed: boolean
    new_recommendations: boolean
    skill_gap_updates: boolean
    security_alerts: boolean
  }
  appearance: {
    theme: 'light' | 'dark' | 'system'
    compact_mode: boolean
  }
}

export default function Settings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('general')
  const [settings, setSettings] = useState<SettingsData>({
    language: 'English',
    default_target_role: 'Software Engineer',
    default_experience_level: 'Fresher',
    default_job_type: 'Full-time',
    preferred_location: '',
    notifications: {
      email: true,
      analysis_completed: true,
      new_recommendations: true,
      skill_gap_updates: true,
      security_alerts: true
    },
    appearance: {
      theme: 'light',
      compact_mode: false
    }
  })
  const [clearHistoryModalOpen, setClearHistoryModalOpen] = useState(false)
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const response = await api.get('/settings/me')
      setSettings(response.data)
    } catch (error) {
      console.error('Failed to load settings:', error)
      // Use defaults if API fails
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await api.put('/settings/me', settings)
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Unable to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleClearHistory = async () => {
    try {
      await api.delete('/settings/analyses')
      toast.success('Analysis history cleared successfully')
      setClearHistoryModalOpen(false)
    } catch (error) {
      toast.error('Failed to clear analysis history')
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await api.delete('/auth/me')
      toast.success('Account deleted successfully')
      logout()
    } catch (error) {
      toast.error('Failed to delete account')
    }
  }

  const handleSignOut = () => {
    logout()
  }

  const handleManageProfile = () => {
    navigate('/profile')
  }

  const categories = [
    { id: 'general' as Category, label: 'General', icon: LayoutGrid },
    { id: 'notifications' as Category, label: 'Notifications', icon: Bell },
    { id: 'appearance' as Category, label: 'Appearance', icon: Sun },
    { id: 'privacy' as Category, label: 'Privacy & Security', icon: Shield },
    { id: 'account' as Category, label: 'Account', icon: User },
  ]

  if (loading) {
    return (
      <AppLayout>
        <MotionPage className="mx-auto max-w-5xl">
          <div className="space-y-6">
            <div className="h-8 w-48 animate-pulse rounded bg-surface-subtle" />
            <div className="h-32 animate-pulse rounded-2xl bg-surface-subtle" />
            <div className="h-64 animate-pulse rounded-2xl bg-surface-subtle" />
          </div>
        </MotionPage>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">Settings</h1>
          <p className="mt-2 text-lg text-ink-muted">
            Manage your application preferences, notifications, and account settings.
          </p>
        </div>

        <div className="flex gap-6 lg:gap-8">
          {/* Category Navigation */}
          <div className="hidden w-64 shrink-0 lg:block">
            <Card variant="elevated">
              <nav className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-ink hover:bg-surface-subtle'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {category.label}
                      {activeCategory === category.id && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </button>
                  )
                })}
              </nav>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            {/* General Settings */}
            {activeCategory === 'general' && (
              <Card variant="elevated">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-ink">Application Preferences</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Configure your default application settings
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full rounded-lg border border-surface-border bg-white px-4 py-2.5 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      <option>English</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">Default Target Role</label>
                    <Input
                      value={settings.default_target_role}
                      onChange={(e) => setSettings({ ...settings, default_target_role: e.target.value })}
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">Default Experience Level</label>
                    <select
                      value={settings.default_experience_level}
                      onChange={(e) => setSettings({ ...settings, default_experience_level: e.target.value })}
                      className="w-full rounded-lg border border-surface-border bg-white px-4 py-2.5 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      <option>Fresher</option>
                      <option>Junior</option>
                      <option>Mid-level</option>
                      <option>Senior</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">Default Job Type</label>
                    <select
                      value={settings.default_job_type}
                      onChange={(e) => setSettings({ ...settings, default_job_type: e.target.value })}
                      className="w-full rounded-lg border border-surface-border bg-white px-4 py-2.5 text-sm text-ink focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">Preferred Location</label>
                    <Input
                      value={settings.preferred_location}
                      onChange={(e) => setSettings({ ...settings, preferred_location: e.target.value })}
                      placeholder="e.g., Remote, San Francisco, CA"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Card>
            )}

            {/* Notification Settings */}
            {activeCategory === 'notifications' && (
              <Card variant="elevated">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-ink">Notification Preferences</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Choose what notifications you want to receive
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'email' as const, label: 'Email Notifications', description: 'Receive email updates about your account' },
                    { key: 'analysis_completed' as const, label: 'Analysis Completed', description: 'Notify me when my resume analysis is complete' },
                    { key: 'new_recommendations' as const, label: 'New Recommendations', description: 'Get notified about new AI recommendations' },
                    { key: 'skill_gap_updates' as const, label: 'Skill Gap Updates', description: 'Updates on skill gaps and improvements' },
                    { key: 'security_alerts' as const, label: 'Security Alerts', description: 'Important security notifications' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-surface-border last:border-0">
                      <div>
                        <h3 className="text-sm font-medium text-ink">{item.label}</h3>
                        <p className="text-xs text-ink-muted">{item.description}</p>
                      </div>
                      <button
                        onClick={() => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, [item.key]: !settings.notifications[item.key] }
                        })}
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          settings.notifications[item.key] ? 'bg-primary-600' : 'bg-surface-subtle'
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Card>
            )}

            {/* Appearance Settings */}
            {activeCategory === 'appearance' && (
              <Card variant="elevated">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-ink">Appearance</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Customize how the application looks
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-ink">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'light' as const, label: 'Light', icon: Sun },
                        { value: 'dark' as const, label: 'Dark', icon: Moon },
                        { value: 'system' as const, label: 'System', icon: Monitor },
                      ].map((theme) => {
                        const Icon = theme.icon
                        return (
                          <button
                            key={theme.value}
                            onClick={() => setSettings({ ...settings, appearance: { ...settings.appearance, theme: theme.value } })}
                            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                              settings.appearance.theme === theme.value
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-surface-border hover:border-surface-border'
                            }`}
                          >
                            <Icon className="h-5 w-5 text-ink" />
                            <span className="text-sm font-medium text-ink">{theme.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-surface-border">
                    <div>
                      <h3 className="text-sm font-medium text-ink">Compact Mode</h3>
                      <p className="text-xs text-ink-muted">Reduce spacing and card height throughout the application</p>
                    </div>
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, compact_mode: !settings.appearance.compact_mode }
                      })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        settings.appearance.compact_mode ? 'bg-primary-600' : 'bg-surface-subtle'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          settings.appearance.compact_mode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Card>
            )}

            {/* Privacy & Security */}
            {activeCategory === 'privacy' && (
              <div className="space-y-6">
                <Card variant="elevated">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-ink">Account Authentication</h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      Your current authentication method
                    </p>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                      <Shield className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink capitalize">{user?.auth_provider || 'Email'}</div>
                      <div className="text-xs text-ink-muted">Authentication Provider</div>
                    </div>
                  </div>
                </Card>

                <Card variant="elevated">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-ink">Session</h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-ink">Your account is currently signed in</p>
                    </div>
                    <Button variant="outline" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </Card>

                <Card variant="elevated">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-ink">Your Data</h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      Manage how your CareerCopilot data is stored and used
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={() => toast.success('Data export feature coming soon')}
                    >
                      <Download className="h-4 w-4" />
                      Download My Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={() => setClearHistoryModalOpen(true)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear Analysis History
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Account Settings */}
            {activeCategory === 'account' && (
              <div className="space-y-6">
                <Card variant="elevated">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-ink">Account</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                        <User className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-ink">{user?.full_name}</div>
                        <div className="text-xs text-ink-muted">{user?.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50">
                        <Shield className="h-5 w-5 text-secondary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-ink capitalize">{user?.auth_provider || 'Email'}</div>
                        <div className="text-xs text-ink-muted">Authentication Provider</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50">
                        <Shield className="h-5 w-5 text-success-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-ink">Active</div>
                        <div className="text-xs text-ink-muted">Account Status</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" onClick={handleManageProfile} className="w-full">
                      Manage Profile
                    </Button>
                  </div>
                </Card>

                <Card variant="elevated">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-ink">Sign Out</h3>
                      <p className="text-sm text-ink-muted">Sign out of your account</p>
                    </div>
                    <Button variant="outline" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </Card>

                <Card variant="elevated" className="border-red-200">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      Deleting your account is permanent and cannot be undone.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:border-red-300 hover:bg-red-50"
                    onClick={() => setDeleteAccountModalOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Clear History Modal */}
        {clearHistoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card variant="elevated" className="w-full max-w-md">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-ink">Clear Analysis History</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Are you sure you want to clear your analysis history? This action permanently removes all your past analyses and cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setClearHistoryModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleClearHistory}
                  className="flex-1"
                >
                  Clear History
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Delete Account Modal */}
        {deleteAccountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card variant="elevated" className="w-full max-w-md">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-ink">Delete Account</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteAccountModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleDeleteAccount}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        )}
      </MotionPage>
    </AppLayout>
  )
}
