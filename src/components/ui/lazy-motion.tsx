'use client';

import { motion, MotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * LazyMotion wrapper that respects user's motion preferences
 * Use this instead of motion.div for better performance and accessibility
 */
export function LazyMotion({
  children,
  ...props
}: MotionProps & { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return <motion.div {...props}>{children}</motion.div>;
}

