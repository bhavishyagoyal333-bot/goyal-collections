'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Sizing & Inquiries');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-500 block">
          CLIENT CONCIERGE &amp; SUPPORT
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-black">
          CONNECT WITH GOYAL COLLECTIONS
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto">
          Our dedicated support specialists are at your disposal for sizing guidance, order assistance, and appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-black pb-3 border-b border-neutral-200">
              DIRECT REACH
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-black" />
                </div>
                <div>
                  <span className="text-neutral-500 uppercase font-mono block">Email</span>
                  <a href="mailto:concierge@mirli.store" className="text-black font-semibold hover:underline text-sm">
                    concierge@mirli.store
                  </a>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Average response under 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-neutral-500 uppercase font-mono block">Direct Helpline / WhatsApp</span>
                  <a
                    href="https://wa.me/919001725016?text=Hello%20Goyal%20Collections%2C%20I%20have%20an%20inquiry%20regarding%20an%20order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-bold hover:text-emerald-600 hover:underline text-sm flex items-center gap-1.5"
                  >
                    <span>+91 90017 25016</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-semibold">
                      WhatsApp Available
                    </span>
                  </a>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Mon–Sat: 10:00 AM – 7:30 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <div>
                  <span className="text-neutral-500 uppercase font-mono block">Flagship Atelier</span>
                  <p className="text-black font-medium text-sm">
                    GOYAL COLLECTIONS Atelier
                  </p>
                  <p className="text-neutral-600">
                    42 Boulevard de Royale, Connaught Place, New Delhi, India 110001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-black" />
                </div>
                <div>
                  <span className="text-neutral-500 uppercase font-mono block">Hours</span>
                  <p className="text-black font-medium">Monday to Saturday: 10:00 AM – 8:00 PM</p>
                  <p className="text-neutral-400">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-black">
              SEND A MESSAGE
            </h3>

            {sent ? (
              <div className="py-12 text-center space-y-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-black">Inquiry Received</h4>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Thank you, {name}. A GOYAL COLLECTIONS personal representative will review your message and reply via email within a few hours.
                </p>
                <button onClick={() => setSent(false)} className="bg-neutral-100 hover:bg-neutral-200 text-black px-5 py-2 rounded-full text-xs font-semibold transition-colors">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono text-neutral-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priyadarshini Rao"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-neutral-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya@example.com"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono text-neutral-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-mono placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono text-neutral-700 mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                    >
                      <option value="Product Sizing & Inquiries">Product Sizing &amp; Inquiries</option>
                      <option value="Order Tracking & Logistics">Order Tracking &amp; Logistics</option>
                      <option value="Return or Exchange Assistance">Return or Exchange Assistance</option>
                      <option value="Bespoke / Bulk Luxury Gifting">Bespoke / Bulk Gifting</option>
                      <option value="Atelier Appointment">Atelier Private Appointment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono text-neutral-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can assist you..."
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Transmitting...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
