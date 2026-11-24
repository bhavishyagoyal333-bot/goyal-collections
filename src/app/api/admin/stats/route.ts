import { NextRequest, NextResponse } from 'next/server';
import { getAdminStats, syncOrdersWithDurableStore, syncCustomersWithDurableStore } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized access.' }, { status: 401 });
    }

    await syncOrdersWithDurableStore();
    await syncCustomersWithDurableStore();

    const stats = getAdminStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
