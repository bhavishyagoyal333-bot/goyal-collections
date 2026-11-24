import { NextRequest, NextResponse } from 'next/server';
import { createCustomer, syncCustomersWithDurableStore } from '@/lib/db';
import { upsertDurableCustomer } from '@/lib/persistentStore';

export async function POST(request: NextRequest) {
  try {
    await syncCustomersWithDurableStore();
    const body = await request.json();
    const { name, email, phone, addresses } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const customer = createCustomer({
      fullName: name,
      email,
      phone: phone || '',
      addresses: addresses || [],
    });

    await upsertDurableCustomer(customer);

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully.',
      customer,
    });
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
