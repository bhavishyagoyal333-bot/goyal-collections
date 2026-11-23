import { NextRequest, NextResponse } from 'next/server';
import {
  checkAdminAuth,
  createAdminToken,
  validateCredentials,
  SESSION_COOKIE_NAME,
} from '@/lib/adminAuth';
import { logAdminActivity } from '@/lib/db';

export async function GET(request: NextRequest) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: auth.email || 'admin@goyalcollections.com',
      role: 'super_admin',
      name: 'Executive Goyal Collections Admin',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const identifier = (body.identifier || body.email || '').trim();
    const password = (body.password || '').trim();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both email/username and password.' },
        { status: 400 }
      );
    }

    const isValid = validateCredentials(identifier, password);
    if (!isValid) {
      try {
        logAdminActivity('Failed Admin Login Attempt', 'Auth', `Invalid credentials for "${identifier}"`, identifier);
      } catch {}
      return NextResponse.json(
        { success: false, message: 'Invalid admin credentials. Access denied.' },
        { status: 401 }
      );
    }

    const email = identifier.includes('@') ? identifier : 'admin@goyalcollections.com';
    const token = createAdminToken(email);

    try {
      logAdminActivity('Admin Logged In', 'Auth', `Admin session authenticated for ${email}`, email);
    } catch {}

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      user: {
        email,
        role: 'super_admin',
        name: 'Executive Goyal Collections Admin',
      },
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Authentication error occurred.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = checkAdminAuth(request);
  if (auth.authorized) {
    try {
      logAdminActivity('Admin Logged Out', 'Auth', `Admin logged out`, auth.email || 'admin@goyalcollections.com');
    } catch {}
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

