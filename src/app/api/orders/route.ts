import { NextRequest, NextResponse } from 'next/server';
import { getOrders, createOrder, deleteOrder, deleteOrdersByCustomer } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || undefined;
    const phone = searchParams.get('phone') || undefined;
    const userId = searchParams.get('userId') || undefined;

    const orders = getOrders({ email, phone, userId });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const customerName = (
      body.customerName ||
      body.shippingAddress?.fullName ||
      body.shippingAddress?.name ||
      body.name ||
      'Valued Connoisseur'
    ).trim();

    const phone = (
      body.phone ||
      body.customerPhone ||
      body.shippingAddress?.phone ||
      body.shippingAddress?.mobile ||
      ''
    ).trim();

    const email = (
      body.email ||
      body.customerEmail ||
      body.shippingAddress?.email ||
      'customer@goyalcollections.shop'
    ).trim();

    const shippingAddress = body.shippingAddress || body.address;
    const items = body.items || [];

    if (!customerName || !phone || !shippingAddress || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required order details (customerName, phone, address, items).',
          details: {
            hasCustomerName: !!customerName,
            hasPhone: !!phone,
            hasAddress: !!shippingAddress,
            itemCount: items.length,
          },
        },
        { status: 400 }
      );
    }

    const order = createOrder({
      customerName,
      email,
      phone,
      shippingAddress: typeof shippingAddress === 'object' ? shippingAddress : { fullAddress: String(shippingAddress) },
      items,
      subtotal: Number(body.subtotal || 0),
      discount: Number(body.discount || 0),
      couponCode: body.couponCode || undefined,
      deliveryCharge: Number(body.deliveryCharge ?? body.shippingFee ?? 0),
      totalAmount: Number(body.totalAmount ?? body.total ?? 0),
      paymentMethod: body.paymentMethod || 'COD',
      paymentId: body.paymentId,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId') || searchParams.get('id');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    if (orderId) {
      const deleted = deleteOrder(orderId, email || 'customer');
      if (!deleted) {
        return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: `Order ${orderId} deleted` });
    }

    if (email || phone) {
      const target = (email || phone) as string;
      const count = deleteOrdersByCustomer(target, 'customer-request');
      return NextResponse.json({ success: true, message: `Deleted ${count} orders for ${target}`, deletedCount: count });
    }

    return NextResponse.json(
      { success: false, message: 'Provide orderId, email, or phone to delete orders' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
