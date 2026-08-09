import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AppLayout from '@/components/layout/AppLayout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { User, Mail, LogOut, Trash2, Camera, X, MapPin, Phone, Linkedin, Github, Globe, Briefcase, Plus, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { MotionPage } from '@/components/ui/Motion'
import api from '@/services/api'

interface ProfileData {
  full_name: string
  email: string
  phone?: string
  location?: string
  target_role?: string
  experience_level?: string
  work_type?: string
  preferred_location?: string
  skills: string[]
  linkedin?: string
  github?: string
  portfolio?: string
}

export default function Profile() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    target_role: '',
    experience_level: '',
    work_type: '',
    preferred_location: '',
    skills: [],
    linkedin: '',
    github: '',
    portfolio: '',
  })
  const [editForm, setEditForm] = useState<ProfileData>({ ...profileData })
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    loadProfile()
  }, [user])

  const loadProfile = async () => {
    try {
      setLoading(true)
      // In a real implementation, this would fetch from a profile API
      // For now, use the auth user data
      setProfileData({
        full_name: user?.full_name || '',
        email: user?.email || '',
        phone: '',
        location: '',
        target_role: '',
        experience_level: '',
        work_type: '',
        preferred_location: '',
        skills: [],
        linkedin: '',
        github: '',
        portfolio: '',
      })
      setEditForm({
        full_name: user?.full_name || '',
        email: user?.email || '',
        phone: '',
        location: '',
        target_role: '',
        experience_level: '',
        work_type: '',
        preferred_location: '',
        skills: [],
        linkedin: '',
        github: '',
        portfolio: '',
      })
    } catch (error) {
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      await api.put('/auth/me', {
        full_name: editForm.full_name,
      })
      
      // Update local state
      setProfileData(editForm)
      setEditModalOpen(false)
      toast.success('Profile updated successfully!')
      
      // Reload user data from auth context
      window.location.reload()
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()]
      })
      setNewSkill('')
      toast.success('Skill added')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    })
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

  const openLink = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

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
          <h1 className="text-3xl font-bold text-ink">Profile</h1>
          <p className="mt-2 text-lg text-ink-muted">
            Manage your personal information, career preferences, and account details.
          </p>
        </div>

        {/* Profile Header Card */}
        <Card variant="elevated" className="mb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary text-white text-2xl font-bold">
                  {profileData.full_name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-surface-border shadow-sm hover:bg-surface-subtle transition-colors"
                  aria-label="Change avatar"
                >
                  <Camera className="h-4 w-4 text-ink-muted" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-ink">{profileData.full_name || 'User'}</h2>
                <p className="text-ink-muted">{profileData.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="primary" className="capitalize">
                    {user?.auth_provider || 'Email'} Account
                  </Badge>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => setEditModalOpen(true)}>
              Edit Profile
            </Button>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <Card variant="elevated">
            <h3 className="mb-4 text-lg font-semibold text-ink">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-subtle">Full Name</div>
                  <div className="font-medium text-ink">{profileData.full_name || 'Not set'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50">
                  <Mail className="h-5 w-5 text-secondary-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-subtle">Email</div>
                  <div className="font-medium text-ink">{profileData.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50">
                  <Phone className="h-5 w-5 text-success-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-subtle">Phone Number</div>
                  <div className="font-medium text-ink">{profileData.phone || 'Not set'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50">
                  <MapPin className="h-5 w-5 text-warning-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-subtle">Location</div>
                  <div className="font-medium text-ink">{profileData.location || 'Not set'}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Career Information */}
          <Card variant="elevated">
            <h3 className="mb-4 text-lg font-semibold text-ink">Career Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
                  <Briefcase className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-subtle">Target Role</div>
                  <div className="font-medium text-ink">{profileData.target_role || 'Not set'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50">
                  <User className="h-5 w-5 text-secondary-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-subtle">Experience Level</div>
                  <div className="font-medium text-ink">{profileData.experience_level || 'Not set'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50">
                  <Globe className="h-5 w-5 text-success-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-subtle">Preferred Work Type</div>
                  <div className="font-medium text-ink">{profileData.work_type || 'Not set'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50">
                  <MapPin className="h-5 w-5 text-warning-600" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-ink-subtle">Preferred Location</div>
                  <div className="font-medium text-ink">{profileData.preferred_location || 'Not set'}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card variant="elevated">
            <h3 className="mb-4 text-lg font-semibold text-ink">Technical Skills</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {profileData.skills.length > 0 ? (
                profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1.5 text-sm text-primary-700 border border-primary-200"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-primary-400 hover:text-primary-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-sm text-ink-muted">No skills added yet</p>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleAddSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Professional Links */}
          <Card variant="elevated">
            <h3 className="mb-4 text-lg font-semibold text-ink">Professional Links</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="text-sm font-medium text-ink">LinkedIn</div>
                    <div className="text-xs text-ink-muted">{profileData.linkedin || 'Not set'}</div>
                  </div>
                </div>
                {profileData.linkedin && (
                  <Button variant="ghost" size="sm" onClick={() => openLink(profileData.linkedin!)}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-ink" />
                  <div>
                    <div className="text-sm font-medium text-ink">GitHub</div>
                    <div className="text-xs text-ink-muted">{profileData.github || 'Not set'}</div>
                  </div>
                </div>
                {profileData.github && (
                  <Button variant="ghost" size="sm" onClick={() => openLink(profileData.github!)}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-subtle/50 p-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-secondary-600" />
                  <div>
                    <div className="text-sm font-medium text-ink">Portfolio</div>
                    <div className="text-xs text-ink-muted">{profileData.portfolio || 'Not set'}</div>
                  </div>
                </div>
                {profileData.portfolio && (
                  <Button variant="ghost" size="sm" onClick={() => openLink(profileData.portfolio!)}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Account & Security */}
        <Card variant="elevated" className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-ink">Account & Security</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-surface-subtle/50 p-4">
              <div className="text-xs text-ink-subtle">Authentication</div>
              <div className="mt-1 font-medium text-ink capitalize">{user?.auth_provider || 'Email'}</div>
            </div>
            <div className="rounded-xl bg-surface-subtle/50 p-4">
              <div className="text-xs text-ink-subtle">Email Verification</div>
              <div className="mt-1 font-medium text-success-600">Verified</div>
            </div>
            <div className="rounded-xl bg-surface-subtle/50 p-4">
              <div className="text-xs text-ink-subtle">Account Created</div>
              <div className="mt-1 font-medium text-ink">N/A</div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card variant="elevated" className="mt-6 border-red-200">
          <h3 className="mb-4 text-lg font-semibold text-red-600">Danger Zone</h3>
          <p className="mb-4 text-sm text-ink-muted">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button
            variant="outline"
            className="text-red-600 hover:border-red-300 hover:bg-red-50"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </Card>

        {/* Edit Profile Modal */}
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card variant="elevated" className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-ink">Edit Profile</h3>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  leftIcon={<User className="h-4 w-4" />}
                />
                <Input
                  label="Phone Number"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  leftIcon={<Phone className="h-4 w-4" />}
                />
                <Input
                  label="Location"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
                <Input
                  label="Target Role"
                  value={editForm.target_role}
                  onChange={(e) => setEditForm({ ...editForm, target_role: e.target.value })}
                  leftIcon={<Briefcase className="h-4 w-4" />}
                />
                <Input
                  label="Preferred Location"
                  value={editForm.preferred_location}
                  onChange={(e) => setEditForm({ ...editForm, preferred_location: e.target.value })}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="primary"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Delete Account Modal */}
        {deleteModalOpen && (
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
                  onClick={() => setDeleteModalOpen(false)}
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
