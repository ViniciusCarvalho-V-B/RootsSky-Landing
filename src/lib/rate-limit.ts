export class RateLimiter {
  private cache: Map<string, number[]>;
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.cache = new Map();
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  public check(ip: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Remove timestamps outside the current window
    let timestamps = this.cache.get(ip) || [];
    timestamps = timestamps.filter(time => time > windowStart);

    if (timestamps.length >= this.maxRequests) {
      this.cache.set(ip, timestamps);
      return false; // Rate limit exceeded
    }

    timestamps.push(now);
    this.cache.set(ip, timestamps);
    return true; // Allowed
  }
}

// Global instances for different routes
export const authRateLimiter = new RateLimiter(60 * 1000, 5); // 5 attempts per minute
export const checkoutRateLimiter = new RateLimiter(60 * 1000, 10); // 10 checkouts per minute
export const couponRateLimiter = new RateLimiter(60 * 1000, 20); // 20 validations per minute
export const voteRateLimiter = new RateLimiter(60 * 1000, 5); // 5 votes per minute por IP
