import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { leadContactSchema } from '@/lib/validations';
import { getResend, emailTemplates } from '@/lib/resend';
import { checkRateLimit } from '@/lib/ratelimit';

/**
 * POST /api/leads/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 requests per hour per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = await checkRateLimit(`contact:${ip}`, 3, '1 h');

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = leadContactSchema.parse(body);

    // Save to database (if configured)
    let leadId: string | null = null;
    try {
      const lead = await prisma.lead.create({
      data: {
        type: 'contact',
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        industry: validatedData.industry,
        message: validatedData.message || validatedData.need,
        metadata: {
          need: validatedData.need,
          timeline: validatedData.timeline,
        },
      },
    });
      leadId = lead.id;
    } catch (dbError) {
      // If database is not configured, log but don't fail the request
      console.warn('Database operation failed (database may not be configured):', dbError);
      // Continue with email sending even if DB save fails
    }

    // Send emails (non-blocking)
    if (process.env.RESEND_API_KEY) {
      try {
        const emailClient = getResend();
        // Admin notification
        await emailClient.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'noreply@spurtek.com.pk',
          to: process.env.RESEND_ADMIN_EMAIL || 'admin@spurtek.com.pk',
          ...emailTemplates.adminNotification({
            type: 'contact',
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            company: validatedData.company,
            message: validatedData.message || validatedData.need,
          }),
        });

        // User confirmation
        await emailClient.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'noreply@spurtek.com.pk',
          to: validatedData.email,
          ...emailTemplates.userConfirmation({
            firstName: validatedData.firstName,
            type: 'contact request',
          }),
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      id: leadId || 'demo-mode',
      message: leadId ? undefined : 'Demo mode: Database not configured. Form submitted successfully but not saved.',
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Contact form error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid input data', details: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

