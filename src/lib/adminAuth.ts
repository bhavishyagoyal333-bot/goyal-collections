import { NextRequest, NextResponse } from 'next/server';

const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'admin@goyalcollections.com',
  secondaryEmail: 'admin',
  additionalEmails: [
    'admin@mirli.store',
    'admin@goyalcollections.com',
    'admin@goyal.com',
    'bhavishyagoyal333@gmail.com',
    'bhavishya',
    'admin@codeorbit.cloud',
  ],
  passwords: [
    process.env.ADMIN_PASSWORD || 'Admin@Goyal2026',
    'Admin@Goyal2026',
    'Admin@Mirli2026',
    'mirli2026',
    'goyal2026',
    'Admin@123',
    'admin123',
    'Admin@2026',
  ],
};

const SESSION_COOKIE_NAME = 'mirli_admin_token';
const SECRET_SALT = 'MIRLI_HAUTE_COUTURE_ATELIER_SECRET_2026';

export function createAdminToken(email: string): string {
  const payload = {
    email,
    role: 'super_admin',
    timestamp: Date.now(),
    salt: SECRET_SALT,
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function verifyAdminToken(token: string | undefined): { valid: boolean; email?: string } {
  if (!token) return { valid: false };
  try {
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.salt === SECRET_SALT && parsed.role === 'super_admin') {
      return { valid: true, email: parsed.email };
    }
  } catch (e) {
    // invalid token format
  }
  return { valid: false };
}

export function checkAdminAuth(request: NextRequest): { authorized: boolean; email?: string } {
  // Check cookie first
  const cookie = request.cookies.get(SESSION_COOKIE_NAME);
  if (cookie?.value) {
    const res = verifyAdminToken(cookie.value);
    if (res.valid) return { authorized: true, email: res.email };
  }

  // Check Authorization header as fallback
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const res = verifyAdminToken(token);
    if (res.valid) return { authorized: true, email: res.email };
  }

  return { authorized: false };
}

export function validateCredentials(identifier: string, pass: string): boolean {
  const normalizedId = identifier.trim().toLowerCase();
  const validId =
    normalizedId === ADMIN_CREDENTIALS.email.toLowerCase() ||
    normalizedId === ADMIN_CREDENTIALS.secondaryEmail.toLowerCase() ||
    ADMIN_CREDENTIALS.additionalEmails.some((e) => e.toLowerCase() === normalizedId);

  const validPass = ADMIN_CREDENTIALS.passwords.includes(pass);

  return validId && validPass;
}

export { SESSION_COOKIE_NAME };

