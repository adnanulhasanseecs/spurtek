import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { downloadSchema } from '@/lib/validations';
import { checkRateLimit } from '@/lib/ratelimit';

/**
 * POST /api/downloads
 * Track resource downloads
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 10 requests per hour per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = await checkRateLimit(`download:${ip}`, 10, '1 h');

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = downloadSchema.parse(body);

    // Get user agent
    const userAgent = request.headers.get('user-agent') || undefined;

    // Save download record (if database is configured)
    try {
      await prisma.download.create({
        data: {
          resourceSlug: validatedData.resourceSlug,
          resourceType: validatedData.resourceType,
          email: validatedData.email,
          ipAddress: ip !== 'unknown' ? ip : undefined,
          userAgent,
        },
      });
    } catch (dbError) {
      console.warn('Database operation failed (database may not be configured):', dbError);
      // Continue even if database save fails
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    console.error('Download tracking error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid input data', details: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

