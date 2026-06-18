import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow public access to the auth endpoint and public updates GET
  if (request.nextUrl.pathname === '/api/admin/auth') {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname === '/api/admin/updates' && request.method === 'GET') {
    return NextResponse.next();
  }
  
  // Check if the admin token cookie exists
  const token = request.cookies.get('admin_token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*'],
};
