import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Target,
  Sparkles,
  Shield,
  Zap,
  CheckCircle2,
} from 'lucide-react'
import MarketingLayout from '@/components/layout/MarketingLayout'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { MotionStagger, MotionStaggerItem } from '@/components/ui/Motion'

const features = [
  {
    icon: BarChart3,
    title: 'ATS Scoring',
    description:
      'Instant compatibility scores with semantic match, skill coverage, and completeness breakdowns.',
    color: 'text-primary-600 bg-primary-50',
  },
  {
    icon: Target,
    title: 'Skill Gap Analysis',
    description: 'See exactly which skills match, which are missing, and where to focus your learning.',
    color: 'text-secondary-600 bg-secondary-50',
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Prioritized, actionable suggestions tailored to your resume and target role.',
    color: 'text-amber-600 bg-amber-50',
  },
]

const steps = [
  { step: '01', title: 'Upload resume', desc: 'Drop your PDF — we extract skills, experience, and structure.' },
  { step: '02', title: 'Add job description', desc: 'Paste the role requirements for precise matching.' },
  { step: '03', title: 'Get intelligence', desc: 'ATS scores, gaps, and recommendations in one dashboard.' },
]

const stats = [
  { value: '10K+', label: 'Resumes Analyzed', icon: BarChart3 },
  { value: '95%', label: 'Accuracy Rate', icon: Target },
  { value: '50+', label: 'Skills Tracked', icon: Sparkles },
]

const trustItems = ['Secure upload', 'No credit card', 'Instant analysis']

export default function Landing() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32 relative">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary-700 shadow-soft backdrop-blur-sm animate-fade-in-up">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI Career Intelligence Platform
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl animate-fade-in-up animation-delay-100">
              Land your next role with{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI-powered insight
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted animate-fade-in-up animation-delay-200">
              Upload your resume and job description to get ATS scoring, skill gap analysis, and personalized
              recommendations — all in one premium career dashboard.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up animation-delay-300">
              <Link to="/register">
                <Button size="lg" variant="primary" className="min-w-[200px]">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Sign In
                </Button>
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted animate-fade-in-up animation-delay-400">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="section-title">Trusted by job seekers</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            Join thousands of professionals optimizing their career journey
          </p>
        </div>
        <MotionStagger className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <MotionStaggerItem key={stat.label}>
                <Card variant="elevated" className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                    <Icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <p className="text-3xl font-bold text-ink">{stat.value}</p>
                  <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
                </Card>
              </MotionStaggerItem>
            )
          })}
        </MotionStagger>
      </section>

      <section id="features" className="border-y border-surface-border bg-surface-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="section-title">Everything you need to stand out</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              From first upload to actionable next steps — built for modern job seekers.
            </p>
          </div>
          <MotionStagger className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <MotionStaggerItem key={feature.title}>
                  <Card variant="elevated" hover>
                    <div className={`mb-4 inline-flex rounded-xl p-3 ${feature.color}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-ink">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
                  </Card>
                </MotionStaggerItem>
              )
            })}
          </MotionStagger>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">Three steps to career clarity</p>
        </div>
        <MotionStagger className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <MotionStaggerItem key={item.step} className="relative text-center">
              <span className="text-5xl font-bold text-primary-100">{item.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{item.desc}</p>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card
            variant="elevated"
            className="overflow-hidden bg-gradient-primary p-8 text-center text-white sm:p-12"
          >
            <div className="mx-auto max-w-2xl">
              <Zap className="mx-auto mb-4 h-10 w-10 text-primary-200" aria-hidden="true" />
              <h2 className="text-2xl font-bold sm:text-3xl">Ready to optimize your career?</h2>
              <p className="mt-3 text-primary-100">
                Join CareerCopilot and turn your resume into a strategic advantage.
              </p>
              <Link to="/register" className="mt-8 inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white text-primary-700 hover:bg-primary-50"
                >
                  Create Free Account
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-primary-200">
                <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                Your data stays private and secure
              </p>
            </div>
          </Card>
        </motion.div>
      </section>
    </MarketingLayout>
  )
}
