import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: googlea2e23dd0ac54739f.html', {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
