'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Truck,
  ArrowRight,
  Printer,
  Loader2,
} from 'lucide-react';
import { Order } from '@/lib/types';

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${params.orderId}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-black animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl text-black mb-2">Order Not Found</h2>
        <p className="text-neutral-500 text-xs mb-6">We could not locate this order record.</p>
        <Link href="/" className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-xs transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Success Hero Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 block mb-1">
            ORDER CONFIRMED
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-black">
            THANK YOU, {order.customerName.toUpperCase()}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-md mx-auto">
            Your order has been received. Our fulfillment team is preparing your package.
          </p>
        </div>

        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-3.5 rounded-2xl bg-white border border-neutral-200 text-xs font-mono shadow-sm">
          <span>Order Ref: <strong className="text-black">{order.orderNumber}</strong></span>
          <span>•</span>
          <span>Placed: <strong className="text-emerald-700">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</strong></span>
          <span>•</span>
          <span>Est. Delivery: <strong className="text-black">{order.estimatedDeliveryDate}</strong></span>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-8 shadow-sm">
        
        {/* Top Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b border-neutral-200 text-xs">
          <div>
            <span className="text-neutral-500 uppercase font-mono block mb-1">Customer</span>
            <span className="font-semibold text-black block">{order.customerName}</span>
            <span className="text-neutral-600 block">{order.email}</span>
            <span className="text-neutral-600 block">+{order.phone}</span>
          </div>

          <div>
            <span className="text-neutral-500 uppercase font-mono block mb-1">Destination</span>
            <span className="text-neutral-700 block">
              {order.shippingAddress.houseNo}, {order.shippingAddress.street}
            </span>
            <span className="text-neutral-700 block">
              {order.shippingAddress.area}, {order.shippingAddress.district}
            </span>
            <span className="text-neutral-700 font-mono block">
              {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 uppercase font-mono block mb-1">Payment Method</span>
            <span className="font-semibold text-black block">
              {order.paymentMethod === 'ONLINE' ? 'Online Payment (Prepaid)' : 'Cash On Delivery (COD)'}
            </span>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
              {order.paymentStatus}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 uppercase font-mono block mb-1">Exact Placed Time</span>
            <span className="font-semibold text-black block">
              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="text-emerald-700 font-mono font-medium block mt-0.5">
              {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </span>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-black">
            ORDER ITEMS ({order.items.length})
          </h3>

          <div className="divide-y divide-neutral-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200'}
                    alt={item.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200';
                    }}
                    className="w-16 h-20 object-cover rounded-xl bg-neutral-100 border border-neutral-200"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-black">{item.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                      <span>Size: {item.size}</span>
                      <span>•</span>
                      <span>Color: {item.color.name}</span>
                      <span>•</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-sm font-bold text-black">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Totals Summary */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-neutral-100 hover:bg-neutral-200 text-black px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>
          </div>

          <div className="w-full sm:w-64 space-y-1.5 text-xs text-neutral-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-black">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount ({order.couponCode || 'Promo'})</span>
                <span className="font-mono">-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="font-mono text-black">
                {order.deliveryCharge === 0 ? <span className="text-emerald-700 font-medium">FREE</span> : `₹${order.deliveryCharge}`}
              </span>
            </div>
            <div className="pt-2 border-t border-neutral-200 flex justify-between text-base font-bold text-black">
              <span>Total Paid</span>
              <span className="font-mono text-lg">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href={`/order-tracking?orderId=${order.orderNumber}`}
          className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-colors"
        >
          <Truck className="w-4 h-4" />
          <span>Track Delivery Status</span>
        </Link>

        <Link
          href="/shop"
          className="bg-neutral-100 hover:bg-neutral-200 text-black px-8 py-3.5 rounded-full text-xs uppercase font-semibold tracking-wider flex items-center gap-2 transition-colors"
        >
          <span>Continue Browsing</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
