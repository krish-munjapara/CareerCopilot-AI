interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle mx-auto max-w-2xl">{subtitle}</p>}
    </div>
  )
}
