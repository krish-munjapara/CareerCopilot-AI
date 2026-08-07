import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import UploadResume from '@/pages/UploadResume'
import UploadJob from '@/pages/UploadJob'
import ATSResults from '@/pages/ATSResults'
import ResumeAnalysis from '@/pages/ResumeAnalysis'
import SkillGap from '@/pages/SkillGap'
import Recommendations from '@/pages/Recommendations'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/upload-resume" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
          <Route path="/upload-job" element={<ProtectedRoute><UploadJob /></ProtectedRoute>} />
          <Route path="/ats-results" element={<ProtectedRoute><ATSResults /></ProtectedRoute>} />
          <Route path="/resume-analysis" element={<ProtectedRoute><ResumeAnalysis /></ProtectedRoute>} />
          <Route path="/skill-gap" element={<ProtectedRoute><SkillGap /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '12px',
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#f8fafc' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#f8fafc' } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default AppRouter
