import AppLayout from '@/components/layout/AppLayout'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import { MotionPage } from '@/components/ui/Motion'
import { HelpCircle, ChevronRight } from 'lucide-react'

const faqs = [
  {
    question: 'How do I upload my resume?',
    answer: 'Go to the Dashboard and click "Upload Resume" or navigate directly to /upload-resume. You can upload PDF files up to 10MB in size. Make sure your resume is in text-based PDF format for best results.'
  },
  {
    question: 'How does ATS scoring work?',
    answer: 'Our ATS (Applicant Tracking System) scoring analyzes your resume against job descriptions using AI. It checks for keyword matching, skill coverage, formatting, and other factors that real ATS systems use. The score ranges from 0-100%.'
  },
  {
    question: 'How are missing skills detected?',
    answer: 'We extract skills from both your resume and the job description using natural language processing. Skills present in the job but missing from your resume are flagged as "missing skills" so you know what to add.'
  },
  {
    question: 'How can I improve my score?',
    answer: 'Focus on adding the missing skills we identify, include relevant keywords from the job description, and follow our personalized recommendations. Updating your resume and re-analyzing will show your improved score.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, your data is encrypted and securely stored. We never share your resume or personal information with third parties. You can delete your data at any time from your account settings.'
  },
  {
    question: 'Can I analyze multiple job descriptions?',
    answer: 'Yes! You can upload different job descriptions and analyze your resume against each one. Your analysis history is saved so you can compare different opportunities.'
  },
  {
    question: 'What file formats are supported?',
    answer: 'We currently support PDF files for resume uploads. For best results, use text-based PDFs rather than scanned images. DOCX support is coming soon.'
  },
  {
    question: 'How do I contact support?',
    answer: 'If you need additional help, you can reach our support team at support@careercopilot.ai. We typically respond within 24 hours on business days.'
  }
]

export default function Help() {
  return (
    <AppLayout>
      <MotionPage className="mx-auto max-w-4xl">
        <PageHeader
          badge="Help"
          title="Help & Support"
          description="Find answers to common questions about CareerCopilot"
        />

        <Card variant="elevated">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-surface-border last:border-0">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between py-4 text-sm font-medium text-ink select-none">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      {faq.question}
                    </div>
                    <ChevronRight className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="pb-4 pl-11 text-sm text-ink-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="elevated" className="mt-6 bg-gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold mb-1">Still need help?</h3>
              <p className="text-sm text-primary-100">
                Our support team is here to assist you with any questions.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">support@careercopilot.ai</p>
              <p className="text-xs text-primary-200">Response within 24 hours</p>
            </div>
          </div>
        </Card>
      </MotionPage>
    </AppLayout>
  )
}
