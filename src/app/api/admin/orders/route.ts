import { NextRequest, NextResponse } from 'next/server';
import { getOrders, syncOrdersWithDurableStore } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';
import { OrderStatus } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await syncOrdersWithDurableStore();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const status = (searchParams.get('status') as OrderStatus) || undefined;
    const email = searchParams.get('email') || undefined;
    const phone = searchParams.get('phone') || undefined;

    const orders = getOrders({ search, status, email, phone });
    return NextResponse.json({ success: true, orders, total: orders.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

