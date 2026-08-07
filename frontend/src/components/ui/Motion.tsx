import { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  staggerItem,
  scaleIn,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

type VariantKey = 'fadeIn' | 'fadeInUp' | 'scaleIn'

const variantsMap = {
  fadeIn,
  fadeInUp,
  scaleIn,
}

interface MotionBoxProps extends HTMLMotionProps<'div'> {
  variant?: VariantKey
  children: ReactNode
}

export function MotionBox({ variant = 'fadeInUp', children, className, ...props }: MotionBoxProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variantsMap[variant]}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function MotionStagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MotionStaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  )
}

export function MotionPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
