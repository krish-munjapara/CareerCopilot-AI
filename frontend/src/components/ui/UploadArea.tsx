import { useCallback } from 'react'
import { Upload } from 'lucide-react'

interface UploadAreaProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number
  label?: string
}

export default function UploadArea({
  onFileSelect,
  accept = '.pdf',
  maxSize = 5 * 1024 * 1024, // 5MB
  label = 'Drop your file here or click to upload',
}: UploadAreaProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && file.size <= maxSize) {
        onFileSelect(file)
      }
    },
    [onFileSelect, maxSize]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && file.size <= maxSize) {
        onFileSelect(file)
      }
    },
    [onFileSelect, maxSize]
  )

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer"
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">{label}</p>
        <p className="text-sm text-gray-400 mt-2">Maximum file size: {maxSize / 1024 / 1024}MB</p>
      </label>
    </div>
  )
}
