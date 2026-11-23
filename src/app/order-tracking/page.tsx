'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Truck,
  CheckCircle2,
  MapPin,
  AlertCircle,
  Loader2,
  RotateCcw,
  Ban,
  Printer,
} from 'lucide-react';
import { Order, OrderStatus } from '@/lib/types';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cancellation and Return states
  const [actionModal, setActionModal] = useState<'cancel' | 'return' | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [actionSubmitting, setActionSubmitting] = useState(false);

  const fetchOrder = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setError('Order not found. Please double-check your Order Number (e.g. GC-90412).');
        setOrder(null);
      }
    } catch (e: any) {
      setError(e.message || 'Error locating order details.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      fetchOrder(initialOrderId);
    }
  }, [initialOrderId]);

  // Live Real-Time Synchronizer for Customer Order Tracking
  useEffect(() => {
    const handleOrderRealtime = (e: any) => {
      const updated = e.detail?.payload || e.detail?.order || e.detail;
      if (updated && (updated.id === order?.id || updated.orderNumber === order?.orderNumber)) {
        setOrder(updated);
      }
    };
    window.addEventListener('goyal:order-update', handleOrderRealtime);
    return () => window.removeEventListener('goyal:order-update', handleOrderRealtime);
  }, [order?.id, order?.orderNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderQuery);
  };

  const handleStatusChangeAction = async () => {
    if (!order || !actionModal) return;
    setActionSubmitting(true);

    const targetStatus: OrderStatus = actionModal === 'cancel' ? 'Cancelled' : 'Return Requested';

    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: targetStatus,
          notes: actionReason || (actionModal === 'cancel' ? 'Customer requested cancellation' : 'Customer requested 7-day return'),
        }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
        setActionModal(null);
        setActionReason('');
      } else {
        alert(data.message || 'Failed to update order status');
      }
    } catch (e) {
      alert('Error updating order');
    } finally {
      setActionSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-white">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-300">
          <Truck className="w-3.5 h-3.5 text-white" />
          <span>Real-Time All-India Logistics</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
          TRACK YOUR ORDER
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
          Enter your order number to inspect live fulfillment progress, courier dispatch updates, and delivery schedules.
        </p>
      </div>

      {/* Tracker Lookup Input Form */}
      <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              required
              placeholder="Enter Order Number (e.g. GC-90412)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-2xl px-4 py-3 text-xs uppercase font-mono tracking-wider text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-white hover:bg-neutral-200 text-black px-8 py-3 rounded-2xl text-xs uppercase font-bold tracking-wider shrink-0 transition-colors shadow-md"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto text-black" /> : 'Track Order'}
          </button>
        </form>

        {error && (
          <div className="mt-3 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Tracked Order Details */}
      {order && (
        <div className="bg-neutral-900 p-6 sm:p-10 rounded-3xl border border-neutral-800 space-y-8 animate-fade-in shadow-xl text-white">
          
          {/* Header Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">
                Order Reference
              </span>
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-2xl font-bold text-white font-mono">{order.orderNumber}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                  order.orderStatus === 'Delivered'
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    : order.orderStatus === 'Cancelled'
                    ? 'bg-red-950/60 text-red-300 border border-red-800'
                    : 'bg-neutral-800 text-white border border-neutral-700'
                }`}>
                  {order.orderStatus.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(order.orderStatus === 'Order Placed' || order.orderStatus === 'Confirmed') && (
                <button
                  onClick={() => setActionModal('cancel')}
                  className="px-4 py-2 rounded-full text-xs text-red-400 hover:bg-red-950/40 border border-red-800 flex items-center gap-1.5 transition-colors"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Cancel Order</span>
                </button>
              )}

              {order.orderStatus === 'Delivered' && (
                <button
                  onClick={() => setActionModal('return')}
                  className="px-4 py-2 rounded-full text-xs text-white hover:bg-neutral-800 border border-neutral-700 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Request 7-Day Return</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-full text-xs text-white hover:bg-neutral-800 border border-neutral-700 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>

          {/* Logistics Timeline */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-6">
              LIVE SHIPMENT MILESTONES
            </h4>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
              {order.trackingTimeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div
                    className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      step.completed
                        ? 'bg-white text-black'
                        : step.current
                        ? 'bg-white text-black ring-4 ring-neutral-700 animate-pulse'
                        : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-current" />
                    )}
                  </div>

                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="font-bold text-sm text-white">{step.status}</span>
                      <span className="text-neutral-400 font-mono text-[11px]">
                        {step.date} {step.time !== '--:--' && `• ${step.time}`}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-normal">{step.description}</p>
                    {step.location && (
                      <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono pt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{step.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-400 uppercase font-mono block mb-2">Delivery Address</span>
              <p className="text-white font-semibold">{order.shippingAddress.fullName}</p>
              <p className="text-neutral-400">
                {order.shippingAddress.houseNo}, {order.shippingAddress.street}, {order.shippingAddress.area}
              </p>
              <p className="text-neutral-400">
                {order.shippingAddress.district}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>

            <div>
              <span className="text-neutral-400 uppercase font-mono block mb-2">Package Contents</span>
              <div className="space-y-2.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center gap-3 min-w-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-12 object-cover rounded-lg bg-neutral-950 shrink-0 border border-neutral-800"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200';
                          }}
                        />
                      ) : (
                        <div className="w-10 h-12 rounded-lg bg-neutral-950 border border-neutral-800 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <span className="text-white font-medium text-xs truncate block max-w-[180px] sm:max-w-xs">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-mono block">
                          Size: {item.size} • Color: {item.color?.name || 'Standard'}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-neutral-300 font-bold shrink-0">Qty {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-800 max-w-md w-full space-y-4 shadow-2xl text-white">
            <h3 className="font-serif text-xl font-bold text-white">
              {actionModal === 'cancel' ? 'Cancel Order' : 'Request Return & Refund'}
            </h3>
            <p className="text-xs text-neutral-400">
              {actionModal === 'cancel'
                ? 'Are you sure you wish to cancel this order? If prepaid, the refund will be credited back within 48 business hours.'
                : 'GOYAL COLLECTIONS offers 7 days hassle-free doorstep return pickup. Please tell us the reason for return.'}
            </p>

            <textarea
              rows={3}
              required
              placeholder={actionModal === 'cancel' ? 'Reason for cancellation...' : 'Reason for return (size issue, style, etc.)...'}
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-2xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActionModal(null)}
                className="px-5 py-2 rounded-full text-xs text-neutral-300 border border-neutral-700 hover:bg-neutral-900"
              >
                Go Back
              </button>
              <button
                type="button"
                disabled={actionSubmitting || !actionReason.trim()}
                onClick={handleStatusChangeAction}
                className="bg-white hover:bg-neutral-200 text-black px-6 py-2 rounded-full text-xs font-bold disabled:opacity-40 transition-colors shadow-md"
              >
                {actionSubmitting ? 'Processing...' : 'Confirm Request'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400 text-xs bg-black">Loading tracker...</div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}
