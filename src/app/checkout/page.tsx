'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  Plus,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import AddressForm from '@/components/AddressForm';
import { ShippingAddress } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, isHydrated, subtotal, couponDiscount, appliedCoupon, deliveryCharge, finalTotal, clearCart } = useCart();
  const { user, saveAddress } = useAuth();

  // Address Selection
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [guestAddress, setGuestAddress] = useState<ShippingAddress | null>(null);

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('ONLINE');
  const [onlineGatewayType, setOnlineGatewayType] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [upiId, setUpiId] = useState('customer@okhdfcbank');

  // Checkout Processing States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!orderPlaced && isHydrated && cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, isHydrated, orderPlaced, router]);

  const activeAddress: ShippingAddress | null =
    user?.addresses && user.addresses.length > 0 && !isAddingNewAddress
      ? user.addresses[selectedAddressIndex] || user.addresses[0]
      : guestAddress;

  const handleSaveNewAddress = (address: ShippingAddress) => {
    if (user) {
      saveAddress(address);
      setIsAddingNewAddress(false);
      setSelectedAddressIndex(user.addresses ? user.addresses.length : 0);
    } else {
      setGuestAddress(address);
      setIsAddingNewAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!activeAddress) {
      setErrorMessage('Please provide a valid delivery address before proceeding.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Your shopping bag is empty.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const customerName = (activeAddress.fullName || (activeAddress as any).name || user?.name || 'Valued Customer').trim();
      const phone = (activeAddress.phone || (activeAddress as any).mobile || user?.phone || '').trim();
      const email = (activeAddress.email || user?.email || 'customer@goyalcollections.shop').trim();

      const orderPayload = {
        userId: user ? user.id : 'guest',
        customerName,
        phone,
        customerPhone: phone,
        email,
        customerEmail: email,
        items: cartItems,
        shippingAddress: {
          ...activeAddress,
          fullName: customerName,
          phone,
          email,
        },
        address: activeAddress,
        paymentMethod,
        paymentStatus: paymentMethod === 'ONLINE' ? 'PAID' : 'PENDING',
        subtotal: Number(subtotal || 0),
        discount: Number(couponDiscount || 0),
        couponCode: appliedCoupon?.code,
        shippingFee: Number(deliveryCharge || 0),
        deliveryCharge: Number(deliveryCharge || 0),
        total: Number(finalTotal || 0),
        totalAmount: Number(finalTotal || 0),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data.success && data.order) {
        setOrderPlaced(true);
        clearCart();
        router.push(`/order-confirmation/${data.order.id}`);
      } else {
        setErrorMessage(data.message || 'Failed to place order. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred while placing order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return <div className="min-h-[50vh] flex items-center justify-center text-xs text-neutral-400 bg-black">Loading checkout...</div>;
  }

  if (!orderPlaced && cartItems.length === 0) return null;

  return (
    <div className="bg-black text-white min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        
        {/* Checkout Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold block mb-1">
              HAUTE CONCIERGE CHECKOUT
            </span>
            <h1 className="font-serif text-3xl font-extrabold text-white">
              SECURE ORDER CHECKOUT
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>256-BIT ENCRYPTED TLS GATEWAY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left: Shipping Address & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: DELIVERY ADDRESS */}
            <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h2 className="font-serif text-xl font-bold text-white">
                    DELIVERY DESTINATION
                  </h2>
                </div>

                {user?.addresses && user.addresses.length > 0 && !isAddingNewAddress && (
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(true)}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {/* Saved Addresses Selector */}
              {user?.addresses && user.addresses.length > 0 && !isAddingNewAddress ? (
                <div className="space-y-3">
                  <span className="text-xs text-neutral-400 font-mono block">
                    Select a saved delivery address:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.addresses.map((addr, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedAddressIndex(idx)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          selectedAddressIndex === idx
                            ? 'border-white bg-neutral-900 shadow-md ring-1 ring-white'
                            : 'border-neutral-800 bg-neutral-950 hover:border-neutral-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-xs text-white">{addr.fullName}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-neutral-800 text-neutral-300 border border-neutral-700 font-semibold">
                            {addr.addressType}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-2">
                          {addr.fullAddress || [addr.houseNo, addr.street, addr.area].filter(Boolean).join(', ')}
                        </p>
                        <p className="text-xs text-white font-mono font-semibold mt-1">
                          {addr.district}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-[11px] text-neutral-500 mt-1">Phone: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : isAddingNewAddress || !activeAddress ? (
                <div>
                  <span className="text-xs text-neutral-400 font-mono block mb-4">
                    {user ? 'Add a new delivery address:' : 'Enter your shipping address (Guest or Registered):'}
                  </span>
                  <AddressForm
                    initialAddress={guestAddress || undefined}
                    onSubmit={handleSaveNewAddress}
                    onCancel={user?.addresses?.length ? () => setIsAddingNewAddress(false) : undefined}
                    submitButtonText="Use This Address"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="font-bold text-xs text-white block">{activeAddress.fullName}</span>
                    <p className="text-xs text-neutral-400">
                      {activeAddress.fullAddress || [activeAddress.houseNo, activeAddress.street, activeAddress.area].filter(Boolean).join(', ')}, {activeAddress.district}, {activeAddress.state} - {activeAddress.pincode}
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5 font-mono">Phone: {activeAddress.phone}</p>
                  </div>
                  <button
                    onClick={() => setIsAddingNewAddress(true)}
                    className="text-xs text-white font-bold underline hover:text-neutral-300"
                  >
                    Change
                  </button>
                </div>
              )}
            </section>

            {/* STEP 2: PAYMENT METHOD */}
            <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-800">
                <div className="w-7 h-7 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <h2 className="font-serif text-xl font-bold text-white">
                  SELECT PAYMENT ARCHITECTURE
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Online Gateway Option */}
                <div
                  onClick={() => setPaymentMethod('ONLINE')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'ONLINE'
                      ? 'border-white bg-neutral-900 shadow-md ring-1 ring-white'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-white" />
                      <span className="font-bold text-sm text-white">Online Payment</span>
                    </div>
                    {paymentMethod === 'ONLINE' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-neutral-400 mb-2">
                    UPI (GPay, PhonePe, Paytm), RuPay, Credit/Debit cards &amp; NetBanking.
                  </p>
                  <span className="px-2 py-0.5 rounded text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 font-mono font-semibold">
                    Instant Priority Dispatch
                  </span>
                </div>

                {/* Cash On Delivery Option */}
                <div
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-white bg-neutral-900 shadow-md ring-1 ring-white'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-white" />
                      <span className="font-bold text-sm text-white">Cash on Delivery (COD)</span>
                    </div>
                    {paymentMethod === 'COD' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-neutral-400 mb-2">
                    Pay with cash or UPI QR upon delivery to your doorstep.
                  </p>
                  <span className="px-2 py-0.5 rounded text-[10px] text-neutral-300 bg-neutral-800 border border-neutral-700 font-mono">
                    All-India Coverage
                  </span>
                </div>

              </div>

              {/* Online Gateway Simulator Controls */}
              {paymentMethod === 'ONLINE' && (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                  <div className="flex gap-2">
                    {(['UPI', 'CARD', 'NETBANKING'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setOnlineGatewayType(mode)}
                        className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl transition-all ${
                          onlineGatewayType === mode
                            ? 'bg-white text-black shadow-sm'
                            : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 border border-neutral-800'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>

                  {onlineGatewayType === 'UPI' && (
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase font-mono text-neutral-400 font-bold">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. mobile@upi or username@okhdfcbank"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-white"
                      />
                      <span className="text-[11px] text-neutral-500 block font-sans">
                        Supported: Google Pay, PhonePe, Paytm, BHIM, CRED
                      </span>
                    </div>
                  )}

                  {onlineGatewayType === 'CARD' && (
                    <div className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Card Number (4000 1234 5678 9010)"
                        defaultValue="4242 •••• •••• 4242"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-white"
                      />
                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/28"
                          className="bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-white"
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          defaultValue="888"
                          maxLength={4}
                          className="bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>
                  )}

                  {onlineGatewayType === 'NETBANKING' && (
                    <select className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white">
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="SBI">State Bank of India</option>
                      <option value="AXIS">Axis Bank</option>
                      <option value="KOTAK">Kotak Mahindra Bank</option>
                    </select>
                  )}
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-2xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

            </section>

          </div>

          {/* Right: Order Summary Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-white pb-3 border-b border-neutral-800 flex items-center justify-between">
                <span>ORDER SUMMARY</span>
                <span className="text-xs font-mono text-neutral-400 font-semibold">{cartItems.length} items</span>
              </h3>

              {/* Mini Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color.name}`} className="flex items-center gap-3">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200'}
                      alt={item.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200';
                      }}
                      className="w-14 h-16 object-cover rounded-xl bg-neutral-950 border border-neutral-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-2 font-mono">
                        <span>Size: {item.size}</span>
                        <span>•</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs font-bold text-white">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="pt-4 border-t border-neutral-800 space-y-2.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Privilege Savings ({appliedCoupon?.code})</span>
                    <span className="font-mono">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>All-India Shipping</span>
                  <span className="font-mono text-white">
                    {deliveryCharge === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes &amp; GST</span>
                  <span className="font-mono text-neutral-400">Included (18% GST)</span>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between text-base font-extrabold text-white">
                  <span>Final Payable</span>
                  <span className="font-mono text-xl">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Place Order CTA: Solid White */}
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting || !activeAddress}
                className="w-full bg-white hover:bg-neutral-200 text-black py-4 rounded-full text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Authorizing Order...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {paymentMethod === 'ONLINE' ? 'Confirm & Pay Securely' : 'Place Cash On Delivery Order'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>The GOYAL COLLECTIONS Guarantee</span>
                </div>
                <p>Every piece arrives meticulously packed in signature rigid gift boxes with dust protection.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
