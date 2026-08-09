import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Target,
  Sparkles,
  Shield,
  Zap,
  FileText,
  Brain,
  TrendingUp,
  MessageSquare,
  FileDown,
  Search,
  Layers,
} from 'lucide-react'
import MarketingLayout from '@/components/layout/MarketingLayout'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { MotionStagger, MotionStaggerItem } from '@/components/ui/Motion'
import FeatureCard from '@/components/landing/FeatureCard'
import ValueCard from '@/components/landing/ValueCard'
import PipelineStep from '@/components/landing/PipelineStep'
import DashboardPreview from '@/components/landing/DashboardPreview'
import BeforeAfterCard from '@/components/landing/BeforeAfterCard'
import TechnologyCard from '@/components/landing/TechnologyCard'
import SectionHeader from '@/components/landing/SectionHeader'

const valueProps = [
  {
    icon: FileText,
    title: 'NLP Resume Intelligence',
    description: 'Extract skills, experience, education and projects from your resume.',
  },
  {
    icon: Search,
    title: 'Semantic Job Matching',
    description: 'Compare your resume and target role using semantic similarity instead of relying only on keywords.',
  },
  {
    icon: Brain,
    title: 'Personalized Skill Intelligence',
    description: 'Identify missing skills and understand exactly what to improve next.',
  },
]

const features = [
  {
    icon: BarChart3,
    title: 'ATS Intelligence',
    description: 'Understand how strongly your resume matches a target role.',
    color: 'text-primary-600 bg-primary-50',
  },
  {
    icon: Search,
    title: 'Semantic Job Matching',
    description: 'Measure meaningful resume-to-job similarity using embeddings.',
    color: 'text-secondary-600 bg-secondary-50',
  },
  {
    icon: Target,
    title: 'Skill Gap Analysis',
    description: 'Discover matched, missing and priority skills.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: TrendingUp,
    title: 'Career Roadmap',
    description: 'Get a personalized learning path based on your target career.',
    color: 'text-amber-600 bg-amber-50',
    comingSoon: true,
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Receive actionable recommendations tailored to your resume and target role.',
    color: 'text-primary-600 bg-primary-50',
  },
  {
    icon: MessageSquare,
    title: 'AI Career Coach',
    description: 'Get personalized career guidance, interview preparation and resume improvement suggestions.',
    color: 'text-secondary-600 bg-secondary-50',
    comingSoon: true,
  },
]

const steps = [
  { step: '01', title: 'Upload Your Resume', desc: 'Let CareerCopilot understand your skills, experience and career profile.' },
  { step: '02', title: 'Add Your Target Role', desc: 'Paste a job description or define the role you want to pursue.' },
  { step: '03', title: 'Get Career Intelligence', desc: 'See your match score, skill gaps and personalized next steps.' },
]

const pipelineSteps = [
  { icon: FileDown, title: 'Resume PDF', description: 'Upload your resume document' },
  { icon: FileText, title: 'Document Parsing', description: 'Extract text and structure' },
  { icon: Brain, title: 'NLP Skill Extraction', description: 'Identify skills and experience' },
  { icon: Layers, title: 'Resume Embeddings', description: 'Convert to vector representation' },
  { icon: Search, title: 'Job Embeddings', description: 'Process job description' },
  { icon: Target, title: 'Semantic Matching', description: 'Compare using similarity' },
  { icon: Zap, title: 'Skill Gap Detection', description: 'Identify missing skills' },
  { icon: Sparkles, title: 'AI Recommendations', description: 'Generate personalized insights' },
]

const technologies = [
  { name: 'NLP', description: 'Resume parsing and skill extraction.' },
  { name: 'Machine Learning', description: 'Scoring and recommendation intelligence.' },
  { name: 'Semantic Embeddings', description: 'Meaning-based resume and job matching.' },
  { name: 'Generative AI', description: 'Career coaching and personalized guidance.' },
]

const techBadges = [
  'Python', 'FastAPI', 'spaCy', 'scikit-learn', 'Sentence Transformers', 'MongoDB', 'React', 'LLM'
]

const beforeItems = [
  'Generic resume',
  'Unknown job fit',
  'No clear skill gaps',
  'No personalized roadmap',
]

const afterItems = [
  'AI-analyzed resume',
  'Job compatibility insights',
  'Prioritized skill gaps',
  'Personalized next steps',
]

export default function Landing() {
  return (
    <MarketingLayout>
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 relative">
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
              Turn Your Resume Into Your{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Career Strategy
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted animate-fade-in-up animation-delay-200">
              Upload your resume and target job description. CareerCopilot uses AI, NLP and semantic matching to analyze your fit, identify skill gaps and recommend your next career moves.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up animation-delay-300">
              <Link to="/register">
                <Button size="lg" variant="primary" className="min-w-[200px]">
                  Analyze My Resume →
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  See How It Works
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="Career Intelligence, Not Just Resume Analysis"
          subtitle="Powered by advanced AI, NLP and machine learning to transform your career data into actionable insights."
        />
        <MotionStagger className="grid gap-6 md:grid-cols-3">
          {valueProps.map((prop) => (
            <MotionStaggerItem key={prop.title}>
              <ValueCard icon={prop.icon} title={prop.title} description={prop.description} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </section>

      <section id="features" className="border-y border-surface-border bg-surface-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Everything You Need to Make Your Next Career Move"
            subtitle="Comprehensive AI-powered tools to analyze, optimize and advance your career."
          />
          <MotionStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <MotionStaggerItem key={feature.title}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                  comingSoon={feature.comingSoon}
                />
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="How It Works"
          subtitle="Three simple steps to transform your career strategy."
        />
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
        <SectionHeader
          title="How CareerCopilot's AI Understands Your Career"
          subtitle="From raw resume data to personalized career intelligence."
        />
        <Card variant="elevated" className="max-w-3xl mx-auto p-8">
          <div className="space-y-4">
            {pipelineSteps.map((step, index) => (
              <PipelineStep
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isLast={index === pipelineSteps.length - 1}
              />
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="One Dashboard. Your Entire Career Strategy."
          subtitle="See everything in one place — match scores, skill gaps, and personalized recommendations."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <DashboardPreview />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          title="From Resume to Career Strategy"
          subtitle="See the transformation CareerCopilot brings to your job search."
        />
        <BeforeAfterCard beforeItems={beforeItems} afterItems={afterItems} />
      </section>

      <section className="border-y border-surface-border bg-surface-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Built With Real AI, NLP & Machine Learning"
            subtitle="Powered by production-grade technologies for accurate career intelligence."
          />
          <MotionStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {technologies.map((tech) => (
              <MotionStaggerItem key={tech.name}>
                <TechnologyCard name={tech.name} description={tech.description} />
              </MotionStaggerItem>
            ))}
          </MotionStagger>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full border border-surface-border bg-white px-4 py-2 text-sm font-medium text-ink-muted shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card
            variant="elevated"
            className="overflow-hidden bg-gradient-primary p-8 text-center text-white sm:p-12"
          >
            <div className="mx-auto max-w-2xl">
              <Zap className="mx-auto mb-4 h-10 w-10 text-primary-200" aria-hidden="true" />
              <h2 className="text-2xl font-bold sm:text-3xl">Ready to Transform Your Career Strategy?</h2>
              <p className="mt-3 text-primary-100">
                Upload your resume and get AI-powered career intelligence in minutes.
              </p>
              <Link to="/register" className="mt-8 inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white text-primary-700 hover:bg-primary-50"
                >
                  Analyze My Resume →
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
