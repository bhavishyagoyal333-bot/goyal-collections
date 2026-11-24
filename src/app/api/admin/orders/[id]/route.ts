import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus, deleteOrder } from '@/lib/db';
import { checkAdminAuth } from '@/lib/adminAuth';
import { OrderStatus } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const order = getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;
    const body = await request.json();
    const { status, notes, courierName, trackingNumber } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });
    }

    const updated = updateOrderStatus(id, status as OrderStatus, {
      notes,
      courierName,
      trackingNumber,
      adminEmail: auth.email,
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export const PUT = PATCH;

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = checkAdminAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;
    const deleted = deleteOrder(id, auth.email);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Order successfully deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

