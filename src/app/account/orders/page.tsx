'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, ArrowLeft, Truck, Loader2 } from 'lucide-react';
import { Order } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const query = user?.email ? `email=${encodeURIComponent(user.email)}` : '';
        const res = await fetch(`/api/orders?${query}`);
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user]);

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter((o) => o.orderStatus.toLowerCase().replace(/\s+/g, '-') === statusFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-white">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <Link href="/account" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 mb-2 font-mono transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
          </Link>
          <h1 className="font-serif text-3xl font-extrabold text-white">
            MY ORDERS &amp; SHIPMENTS
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Track live dispatch status, view invoices, or request returns.
          </p>
        </div>

        <Link href="/order-tracking" className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors">
          <Truck className="w-4 h-4" />
          <span>Track by Order ID</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'delivered', label: 'Delivered' },
          { id: 'out-for-delivery', label: 'In Transit' },
          { id: 'order-placed', label: 'Order Placed' },
          { id: 'cancelled', label: 'Cancelled' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-4 py-2 rounded-full transition-all ${
              statusFilter === tab.id
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-neutral-900 rounded-3xl p-12 text-center border border-neutral-800 max-w-md mx-auto shadow-xl">
          <Package className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-white mb-1">No Orders Match Filter</h3>
          <p className="text-xs text-neutral-400 mb-6">Switch filter or browse our latest fashion arrivals.</p>
          <Link href="/shop" className="bg-white hover:bg-neutral-200 text-black px-6 py-2.5 rounded-full text-xs font-bold transition-colors">
            Shop Catalog
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 space-y-6 group hover:border-neutral-600 transition-all shadow-xl text-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800 text-xs">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-white">{ord.orderNumber}</span>
                    <span className="bg-neutral-800 border border-neutral-700 text-neutral-300 px-3 py-0.5 text-[10px] font-mono rounded-full font-semibold">
                      {ord.orderStatus}
                    </span>
                  </div>
                  <span className="text-neutral-400 font-mono text-[11px] block mt-1">
                    Ordered on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-neutral-400">Estimated: <strong className="text-white">{ord.estimatedDeliveryDate}</strong></span>
                  <span className="text-white font-bold text-sm">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-neutral-800">
                {ord.items.map((item, i) => (
                  <div key={i} className="py-3 flex items-center justify-between text-xs gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200'}
                        alt={item.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200';
                        }}
                        className="w-14 h-16 object-cover rounded-xl bg-neutral-950 border border-neutral-800"
                      />
                      <div>
                        <Link href={`/product/${item.slug}`} className="text-white font-semibold hover:text-neutral-300 block truncate max-w-sm">
                          {item.name}
                        </Link>
                        <span className="text-neutral-400 text-[11px]">
                          Size: {item.size} • Color: {item.color.name} • Qty {item.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono font-semibold text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-neutral-400">
                  Payment: <strong className="text-white">{ord.paymentMethod}</strong> ({ord.paymentStatus})
                </span>
                <Link
                  href={`/order-tracking?orderId=${ord.orderNumber}`}
                  className="bg-white hover:bg-neutral-200 text-black px-5 py-2 rounded-full text-xs font-bold text-center transition-colors shadow-sm"
                >
                  Track Live Delivery
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
