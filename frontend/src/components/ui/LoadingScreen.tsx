import { Loader2 } from 'lucide-react'

interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-muted">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" aria-hidden="true" />
        {message && <p className="text-ink-muted">{message}</p>}
      </div>
    </div>
  )
}
