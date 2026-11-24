'use client';

import React from 'react';
import { Order } from '@/lib/types';
import { Printer, X, Download, ShieldCheck } from 'lucide-react';

interface PrintInvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export default function PrintInvoiceModal({ order, onClose }: PrintInvoiceModalProps) {
  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `GC-INV-${order.orderNumber.replace(/[^0-9]/g, '') || Math.floor(100000 + Math.random() * 900000)}`;
  const invoiceDate = `${new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}, ${new Date(order.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })}`;

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAmount = Math.round(order.totalAmount * 0.05); // 5% GST included

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl my-8 bg-white text-black rounded-3xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none print:m-0 print:max-w-none">
        
        {/* Actions Bar - Hidden during print */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider">Official Tax Invoice Preview</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-8 sm:p-12 space-y-8 bg-white text-neutral-900 print:p-8 font-sans">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-neutral-200 pb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-2xl tracking-widest text-black">
                  GOYAL COLLECTIONS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-300 text-[10px] font-mono font-bold uppercase text-neutral-600">
                  Tax Invoice
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1 font-sans">
                Haute Couture Fashion & Mastercrafted Footwear
              </p>
              <p className="text-[11px] text-neutral-500 mt-2 font-mono">
                GSTIN: <span className="font-bold text-neutral-800">07AABCU9603R1ZM</span> | State: Uttar Pradesh (09)<br />
                Atelier: Goyal Collections, Central Commercial District, Agra - 282001, UP<br />
                Concierge: support@mirli.store | +91 98765 43210
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs space-y-1 bg-neutral-50 p-4 rounded-2xl border border-neutral-200 sm:min-w-[220px]">
              <div className="text-[10px] uppercase text-neutral-400 font-bold">Invoice Details</div>
              <div className="text-sm font-bold text-black">{invoiceNumber}</div>
              <div className="text-neutral-600">Date: {invoiceDate}</div>
              <div className="text-neutral-600">Order: <span className="font-bold text-black">{order.orderNumber}</span></div>
              <div className="text-neutral-600">
                Payment: <span className="font-bold uppercase text-emerald-700">{order.paymentMethod}</span> ({order.paymentStatus})
              </div>
            </div>
          </div>

          {/* Billing & Shipping Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider block">Billed To</span>
              <div className="font-bold text-black font-sans text-sm">{order.customerName}</div>
              <div className="text-neutral-600 font-sans">{order.email}</div>
              <div className="text-neutral-600">+91 {order.phone}</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider block">Shipped To Destination</span>
              <div className="font-bold text-black font-sans text-sm">{order.customerName}</div>
              <div className="text-neutral-700 font-sans">
                {[
                  order.shippingAddress.fullAddress,
                  order.shippingAddress.houseNo,
                  order.shippingAddress.street,
                  order.shippingAddress.area,
                ].filter(Boolean).join(', ')}
              </div>
              <div className="text-neutral-800 font-bold">
                {order.shippingAddress.district}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-neutral-900 font-mono uppercase text-[11px] text-neutral-600">
                  <th className="py-2.5 w-10">#</th>
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Size</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-mono">
                {order.items.map((item, index) => (
                  <tr key={index} className="hover:bg-neutral-50/50">
                    <td className="py-3 text-neutral-400">{index + 1}</td>
                    <td className="py-3 font-sans">
                      <div className="font-semibold text-neutral-900">{item.name}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        Color: {item.color?.name || 'Standard'} • HSN: 6403
                      </div>
                    </td>
                    <td className="py-3 text-center text-neutral-700">{item.size}</td>
                    <td className="py-3 text-center text-neutral-900 font-bold">{item.quantity}</td>
                    <td className="py-3 text-right text-neutral-700">₹{item.price.toLocaleString('en-IN')}</td>
                    <td className="py-3 text-right font-bold text-black">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-neutral-200">
            <div className="max-w-xs text-[11px] text-neutral-500 font-mono space-y-1">
              <p className="font-bold text-neutral-800">TERMS & CONDITIONS:</p>
              <p>1. Handcrafted items subject to standard artisanal care standards.</p>
              <p>2. Returns / exchanges accepted within 7 days of verified delivery in original packaging.</p>
              <p>3. This is a computer-generated tax invoice verified under Indian GST rules.</p>
            </div>

            <div className="w-full sm:w-72 font-mono text-xs space-y-2 bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping & Insured Delivery:</span>
                <span className="text-emerald-700 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>GST (5% Included):</span>
                <span>₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
              {order.couponCode && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon ({order.couponCode}):</span>
                  <span>-₹{(order.discount || 0).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="pt-2 border-t border-neutral-300 flex justify-between text-sm font-black text-black">
                <span>Net Amount Payable:</span>
                <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Signatory Footer */}
          <div className="flex justify-between items-end pt-8 border-t border-neutral-200 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Goyal Collections Verified Merchant Seal</span>
            </div>
            <div className="text-right space-y-1">
              <div className="font-serif italic font-bold text-base text-neutral-800">Goyal Collections</div>
              <div className="text-[10px] uppercase text-neutral-400">Authorized Signatory</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
