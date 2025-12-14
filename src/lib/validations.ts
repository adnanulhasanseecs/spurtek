import { z } from 'zod';

/**
 * Zod validation schemas for form inputs and API requests
 */

export const leadQuoteSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  message: z.string().optional(),
  productId: z.string().optional(),
});

export const leadDemoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

export const leadContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  need: z.string().min(1, 'Please describe your needs'),
  timeline: z.string().optional(),
  message: z.string().optional(),
});

export const downloadSchema = z.object({
  resourceSlug: z.string().min(1, 'Resource slug is required'),
  resourceType: z.enum(['datasheet', 'whitepaper', 'video']),
  email: z.string().email('Invalid email address').optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional(),
});

export type LeadQuoteInput = z.infer<typeof leadQuoteSchema>;
export type LeadDemoInput = z.infer<typeof leadDemoSchema>;
export type LeadContactInput = z.infer<typeof leadContactSchema>;
export type DownloadInput = z.infer<typeof downloadSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

