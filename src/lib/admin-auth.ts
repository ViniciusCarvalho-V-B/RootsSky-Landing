import { NextResponse } from 'next/server';
import crypto from 'crypto';

// The name of the cookie that will store the admin session
const COOKIE_NAME = 'admin_token';

// A simple utility to generate a secure token based on the admin password
// This avoids storing the password directly in the cookie
function generateExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.error("ADMIN_PASSWORD não está configurada no .env!");
    return "unconfigured";
  }
  
  // Use scrypt (a slow, memory-hard key derivation function) to hash the password.
  // This is resistant to brute-force and rainbow table attacks, unlike fast hashes like SHA-256.
  const salt = '_rootssky_admin_auth_salt_v2';
  const derivedKey = crypto.scryptSync(password, salt, 32);
  return derivedKey.toString('hex');
}

/**
 * Checks if the incoming request has a valid admin cookie.
 * @param request The Next.js incoming request object
 * @returns boolean True if authorized
 */
export function isAdmin(request: Request): boolean {
  // Try to parse the cookie from headers
  const cookieHeader = request.headers.get('cookie') || '';
  
  const cookies = cookieHeader.split(';').reduce((acc, current) => {
    const [name, value] = current.trim().split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);

  const token = cookies[COOKIE_NAME];
  const expectedToken = generateExpectedToken();

  return token === expectedToken && expectedToken !== "unconfigured";
}

/**
 * Attaches the admin authorization cookie to a given response.
 * @param response The NextResponse object to attach the cookie to
 * @returns The modified NextResponse
 */
export function createAdminResponse(response: NextResponse): NextResponse {
  const token = generateExpectedToken();
  const maxAge = 60 * 60 * 24; // 24 hours

  // Set the cookie using Set-Cookie header
  const isProd = process.env.NODE_ENV === 'production';
  const secureFlag = isProd ? 'Secure; ' : '';
  response.headers.append(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Max-Age=${maxAge}`
  );

  return response;
}

/**
 * Removes the admin authorization cookie from a given response (logout).
 * @param response The NextResponse object
 * @returns The modified NextResponse
 */
export function removeAdminResponse(response: NextResponse): NextResponse {
  // Clear the cookie by setting Max-Age to 0
  response.headers.append(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
  );

  return response;
}
