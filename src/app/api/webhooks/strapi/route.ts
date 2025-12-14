import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * POST /api/webhooks/strapi
 * Handle Strapi webhook for content updates
 * This will revalidate Next.js cache when content is updated in Strapi
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (implement based on Strapi webhook configuration)
    const signature = request.headers.get('x-strapi-signature');
    // TODO: Implement signature verification
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const body = await request.json();
    const { model } = body;

    // Revalidate relevant paths based on content type
    if (model === 'product') {
      revalidatePath('/products', 'page');
      revalidatePath('/products/[slug]', 'page');
      revalidateTag('products', 'page');
    } else if (model === 'case-study') {
      revalidatePath('/case-studies', 'page');
      revalidatePath('/case-studies/[slug]', 'page');
      revalidateTag('case-studies', 'page');
    } else if (model === 'resource') {
      revalidatePath('/resources', 'page');
      revalidatePath('/resources/[slug]', 'page');
      revalidateTag('resources', 'page');
    } else if (model === 'industry') {
      revalidatePath('/solutions', 'page');
      revalidatePath('/solutions/[slug]', 'page');
      revalidateTag('industries', 'page');
    }

    return NextResponse.json({ success: true, revalidated: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

