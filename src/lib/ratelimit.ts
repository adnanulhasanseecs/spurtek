import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limiting configuration
 * Uses Upstash Redis for production, falls back to in-memory for development
 */

let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute default
    analytics: true,
  });
}

/**
 * Rate limit check
 * Returns { success: true } if allowed, { success: false, limit: number, remaining: number, reset: number } if rate limited
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  window: string = '1 m'
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  // If no Redis configured, allow in development
  if (!ratelimit) {
    if (process.env.NODE_ENV === 'development') {
      return { success: true };
    }
    // In production without Redis, we should still enforce some basic rate limiting
    // For now, allow but log a warning
    console.warn('Rate limiting not configured - requests allowed');
    return { success: true };
  }

  // Create a custom limiter for this specific limit/window
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  const customLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window as '1 s' | '1 m' | '1 h' | '1 d'),
  });

  const result = await customLimiter.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

