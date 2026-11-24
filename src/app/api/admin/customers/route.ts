import { NextRequest, NextResponse } from 'next/server';
import { getCustomers, getCustomerById, updateCustomerStatus, syncCustomersWithDurableStore, syncOrdersWithDurableStore } from '@/lib/db';
import { upsertDurableCustomer } from '@/lib/persistentStore';
import { checkAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await syncOrdersWithDurableStore();
    await syncCustomersWithDurableStore();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search') || undefined;

    if (id) {
      const data = getCustomerById(id);
      if (!data) {
        return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, customer: data.customer, orders: data.orders });
    }

    const customers = getCustomers(search);
    return NextResponse.json({ success: true, customers, total: customers.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await syncCustomersWithDurableStore();

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Customer ID and status required.' }, { status: 400 });
    }

    const updated = updateCustomerStatus(id, status, auth.email);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 });
    }

    await upsertDurableCustomer(updated);

    return NextResponse.json({ success: true, customer: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

