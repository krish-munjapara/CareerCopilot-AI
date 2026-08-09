import { useCallback, useId, useState } from 'react'
import { Upload, FileText, AlertCircle, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadAreaProps {
  onFileSelect: (file: File) => void
  onFileRemove?: () => void
  accept?: string
  maxSize?: number
  label?: string
  description?: string
  selectedFile?: File | null
  variant?: 'default' | 'minimal' | 'card'
}

export default function UploadArea({
  onFileSelect,
  onFileRemove,
  accept = '.pdf,.docx,.doc',
  maxSize = 10 * 1024 * 1024,
  label = 'Drag & drop your file here',
  description = 'PDF, DOCX • Max 10MB',
  selectedFile,
  variant = 'default',
}: UploadAreaProps) {
  const inputId = useId()
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateAndSelect = useCallback(
    (file: File | undefined) => {
      if (!file) return
      setError(null)

      if (file.size > maxSize) {
        setError(`File exceeds ${maxSize / 1024 / 1024}MB limit`)
        return
      }

      const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase())
      const ext = '.' + file.name.split('.').pop()?.toLowerCase()
      if (acceptedTypes.length && !acceptedTypes.some((t) => t === ext || file.type.includes(t.replace('.', '')))) {
        setError('Invalid file type. Please upload a PDF or DOCX file.')
        return
      }

      onFileSelect(file)
    },
    [accept, maxSize, onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragActive(false)
      validateAndSelect(e.dataTransfer.files[0])
    },
    [validateAndSelect]
  )

  const handleRemove = useCallback(() => {
    setError(null)
    onFileRemove?.()
  }, [onFileRemove])

  if (variant === 'minimal' && selectedFile) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3 animate-fade-in-up">
        <FileText className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{selectedFile.name}</p>
          <p className="text-xs text-ink-subtle">{(selectedFile.size / 1024).toFixed(1)} KB</p>
        </div>
        <button
          onClick={handleRemove}
          className="rounded-lg p-1.5 text-ink-subtle transition-colors hover:bg-emerald-100 hover:text-emerald-600"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        className={cn(
          'relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200',
          variant === 'card' && 'bg-white shadow-soft',
          dragActive
            ? 'border-primary-400 bg-primary-50/50 scale-[1.02]'
            : 'border-surface-border hover:border-primary-300 hover:bg-surface-subtle/50',
          error && 'border-red-300 bg-red-50/30',
          selectedFile && !error && 'border-emerald-300 bg-emerald-50/30'
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={(e) => validateAndSelect(e.target.files?.[0])}
          className="sr-only"
          id={inputId}
          disabled={!!selectedFile}
        />
        {!selectedFile ? (
          <label htmlFor={inputId} className="flex cursor-pointer flex-col items-center">
            <div
              className={cn(
                'mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-200',
                dragActive
                  ? 'bg-primary-100 text-primary-600 scale-110'
                  : 'bg-surface-subtle text-ink-subtle hover:bg-primary-50 hover:text-primary-600'
              )}
            >
              <Upload className="h-8 w-8" aria-hidden="true" />
            </div>
            <p className="font-semibold text-ink">{label}</p>
            <p className="mt-1 text-sm text-ink-subtle">{description}</p>
          </label>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="font-medium text-ink">{selectedFile.name}</p>
              <p className="text-sm text-ink-subtle">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={handleRemove}
              className="ml-auto rounded-lg p-2 text-ink-subtle transition-colors hover:bg-emerald-100 hover:text-emerald-600"
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 animate-fade-in-up" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}
    </div>
  )
}
