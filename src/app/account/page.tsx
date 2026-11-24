'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Trash2,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import AddressForm from '@/components/AddressForm';
import { Order } from '@/lib/types';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, saveAddress, deleteAddress, setDefaultAddress } = useAuth();
  const { wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [addingAddress, setAddingAddress] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      setLoadingOrders(true);
      try {
        const params = new URLSearchParams();
        if (user?.email) params.set('email', user.email);
        if (user?.phone) params.set('phone', user.phone);

        if (user?.addresses && user.addresses.length > 0) {
          const altPhone = user.addresses.find((a) => a.phone && a.phone !== user.phone)?.phone;
          if (altPhone && !params.has('phone')) {
            params.set('phone', altPhone);
          }
        }

        const res = await fetch(`/api/orders?${params.toString()}`);
        const data = await res.json();

        // Retrieve any locally recorded placed orders
        const localOrders: Order[] = [];
        try {
          const saved = localStorage.getItem('mirli_placed_orders');
          if (saved) {
            localOrders.push(...JSON.parse(saved));
          }
        } catch {}

        const orderMap = new Map<string, Order>();
        if (data.success && Array.isArray(data.orders)) {
          data.orders.forEach((o: Order) => orderMap.set(o.orderNumber, o));
        }
        localOrders.forEach((o: Order) => {
          if (!orderMap.has(o.orderNumber)) {
            orderMap.set(o.orderNumber, o);
          }
        });

        const combined = Array.from(orderMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(combined);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingOrders(false);
      }
    }
    loadOrders();
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      
      {/* Account Hero Banner */}
      <div className="bg-neutral-900 p-6 sm:p-10 rounded-3xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center font-serif text-2xl font-bold shadow-md">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                {user?.name || 'Customer'}
              </h1>
              <span className="bg-neutral-800 border border-neutral-700 px-2.5 py-0.5 text-[10px] uppercase font-mono text-neutral-300 rounded-full">
                Member
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {user?.email || 'customer@mirli.store'} • +91 {user?.phone || '9876543210'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleLogout}
            className="border border-neutral-700 hover:border-red-500 hover:text-red-400 px-4 py-2 rounded-full text-xs text-neutral-400 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-all ${
              activeTab === 'orders'
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Package className="w-4 h-4" /> My Orders
            </span>
            <span className="font-mono text-[11px] opacity-70">({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-all ${
              activeTab === 'addresses'
                ? 'bg-white text-black font-bold shadow-md'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4" /> Saved Addresses
            </span>
            <span className="font-mono text-[11px] opacity-70">({user?.addresses?.length || 0})</span>
          </button>

          <Link
            href="/wishlist"
            className="w-full text-left p-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-all"
          >
            <span className="flex items-center gap-2.5">
              <Heart className="w-4 h-4" /> My Wishlist
            </span>
            <span className="font-mono text-[11px] opacity-70">({wishlistCount})</span>
          </Link>
        </aside>

        {/* Tab Content Stage */}
        <main className="flex-1">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-serif text-xl font-bold text-white">
                  ORDER HISTORY &amp; SHIPMENTS
                </h3>
                <span className="text-xs font-mono text-neutral-400">{orders.length} TOTAL</span>
              </div>

              {loadingOrders ? (
                <div className="text-center py-12 text-neutral-400 text-xs">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16 bg-neutral-900 rounded-3xl p-8 border border-neutral-800 shadow-xl">
                  <Package className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
                  <p className="text-white text-sm font-semibold mb-1">No Orders Recorded Yet</p>
                  <p className="text-xs text-neutral-400 mb-6">Explore our iconic footwear and ready-made clothes.</p>
                  <Link href="/shop" className="bg-white hover:bg-neutral-200 text-black px-6 py-2.5 rounded-full text-xs font-bold transition-colors">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-neutral-900 p-5 sm:p-6 rounded-3xl border border-neutral-800 space-y-4 shadow-xl hover:border-neutral-600 transition-all text-white"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-white">{ord.orderNumber}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                              : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                          }`}>
                            {ord.orderStatus}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px]">
                          <span>Placed: <strong className="text-white font-medium">{new Date(ord.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date(ord.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</strong></span>
                          <span>•</span>
                          <span className="text-white font-bold">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-14 object-cover rounded-lg bg-neutral-950 border border-neutral-800"
                              />
                              <div>
                                <span className="text-white font-medium block truncate max-w-xs">{item.name}</span>
                                <span className="text-neutral-400 text-[11px]">Size: {item.size} • Qty {item.quantity}</span>
                              </div>
                            </div>
                            <span className="font-mono font-semibold text-white">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-400 font-mono">
                          Est. Delivery: <strong className="text-white">{ord.estimatedDeliveryDate}</strong>
                        </span>
                        <Link
                          href={`/order-tracking?orderId=${ord.orderNumber}`}
                          className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-700"
                        >
                          <span>Track Order</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-serif text-xl font-bold text-white">
                  SAVED ADDRESSES
                </h3>
                {!addingAddress && (
                  <button
                    onClick={() => setAddingAddress(true)}
                    className="bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {addingAddress ? (
                <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 shadow-xl">
                  <h4 className="font-serif text-lg font-bold text-white mb-4">Add New Delivery Address</h4>
                  <AddressForm
                    onSubmit={(addr) => {
                      saveAddress(addr);
                      setAddingAddress(false);
                    }}
                    onCancel={() => setAddingAddress(false)}
                  />
                </div>
              ) : user?.addresses && user.addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-900 p-5 rounded-3xl border border-neutral-800 space-y-3 relative group shadow-xl text-white"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{addr.fullName}</span>
                        <div className="flex items-center gap-2">
                          {addr.isDefault && (
                            <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-800 px-2 py-0.5 text-[10px] font-mono rounded-full">
                              Default
                            </span>
                          )}
                          <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 text-[10px] font-mono uppercase rounded-full">
                            {addr.addressType}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-400">
                        {addr.fullAddress || [addr.houseNo, addr.street, addr.area].filter(Boolean).join(', ')}
                      </p>
                      <p className="text-xs text-white font-mono">
                        {addr.district}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-[11px] text-neutral-500">Phone: {addr.phone}</p>

                      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(idx)}
                            className="text-neutral-400 hover:text-white underline text-[11px]"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(idx)}
                          className="text-red-400 hover:text-red-300 text-xs ml-auto flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-900 rounded-3xl p-6 border border-neutral-800 shadow-xl">
                  <p className="text-xs text-neutral-400 mb-4">You have no saved delivery destinations.</p>
                  <button onClick={() => setAddingAddress(true)} className="bg-white hover:bg-neutral-200 text-black px-6 py-2.5 rounded-full text-xs font-semibold transition-colors">
                    Add Address Now
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
