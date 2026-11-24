'use client';

import React, { useState, useEffect } from 'react';
import { ShippingAddress } from '@/lib/types';
import { MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface AddressFormProps {
  initialAddress?: Partial<ShippingAddress>;
  onSubmit: (address: ShippingAddress) => void;
  onCancel?: () => void;
  submitButtonText?: string;
}

// Client-side instant memory cache for 0ms pincode lookups
const clientPincodeCache = new Map<string, any>();

export default function AddressForm({
  initialAddress,
  onSubmit,
  onCancel,
  submitButtonText = 'Use This Address',
}: AddressFormProps) {
  // 1. Full Name
  const [fullName, setFullName] = useState(initialAddress?.fullName || '');
  
  // 2. Email Address
  const [email, setEmail] = useState(initialAddress?.email || '');
  
  // 3. Mobile Number
  const [phone, setPhone] = useState(initialAddress?.phone || '');
  
  // 4. Full Address (One simple text area for complete address)
  const [fullAddress, setFullAddress] = useState(
    initialAddress?.fullAddress ||
      [initialAddress?.houseNo, initialAddress?.street, initialAddress?.landmark, initialAddress?.area]
        .filter(Boolean)
        .join(', ') ||
      ''
  );
  
  // 5. PIN Code
  const [pincode, setPincode] = useState(initialAddress?.pincode || '');

  // Auto-detected Address Fields
  const [district, setDistrict] = useState(initialAddress?.district || '');
  const [state, setState] = useState(initialAddress?.state || '');
  const [area, setArea] = useState(initialAddress?.area || '');
  const [postOfficesList, setPostOfficesList] = useState<string[]>([]);
  const [loadingPin, setLoadingPin] = useState(false);
  const [pinStatus, setPinStatus] = useState<{
    success: boolean;
    message: string;
    deliveryDays?: number;
  } | null>(null);

  // Automatic Address Detection: triggers when customer enters a valid 6-digit PIN code
  useEffect(() => {
    const clean = pincode.trim().replace(/\D/g, '');
    if (clean.length === 6) {
      // 0ms instant check from client memory cache
      const cached = clientPincodeCache.get(clean);
      if (cached) {
        setDistrict(cached.district || '');
        setState(cached.state || '');
        if (Array.isArray(cached.postOffices) && cached.postOffices.length > 0) {
          setPostOfficesList(cached.postOffices);
          setArea((prev) => prev || cached.postOffices[0]);
        } else {
          setArea((prev) => prev || cached.district || '');
        }
        setPinStatus({
          success: true,
          message: `Verified: ${cached.district}, ${cached.state} (Serviceable Delivery Zone)`,
          deliveryDays: cached.deliveryDays || 3,
        });
        setLoadingPin(false);
        return;
      }

      setLoadingPin(true);
      setPinStatus(null);

      fetch(`/api/pincode/${clean}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            clientPincodeCache.set(clean, data);
            setDistrict(data.district || '');
            setState(data.state || '');
            if (Array.isArray(data.postOffices) && data.postOffices.length > 0) {
              setPostOfficesList(data.postOffices);
              setArea((prev) => prev || data.postOffices[0]);
            } else {
              setArea((prev) => prev || data.district || '');
            }
            setPinStatus({
              success: true,
              message: `Verified: ${data.district}, ${data.state} (Serviceable Delivery Zone)`,
              deliveryDays: data.deliveryDays || 3,
            });
          } else {
            setPinStatus({
              success: false,
              message: data.message || 'Invalid or unserviceable PIN code',
            });
          }
        })
        .catch(() => {
          setPinStatus({
            success: false,
            message: 'Unable to verify PIN code right now. You can still proceed.',
          });
        })
        .finally(() => setLoadingPin(false));
    } else {
      setPinStatus(null);
    }
  }, [pincode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      fullAddress: fullAddress.trim(),
      pincode: pincode.trim(),
      district: district.trim() || 'Central',
      state: state.trim() || 'India',
      area: area.trim() || district.trim(),
      street: area.trim() || fullAddress.trim(),
      houseNo: fullAddress.trim(),
      addressType: 'home',
      isDefault: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      {/* 1. Full Name */}
      <div>
        <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-medium">
          1. Full Name *
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Aarav Malhotra"
          className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* 2. Email Address */}
      <div>
        <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-medium">
          2. Email Address *
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. aarav@example.com (for order tracking & invoice)"
          className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* 3. Mobile Number */}
      <div>
        <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-medium">
          3. Mobile Number *
        </label>
        <input
          type="tel"
          required
          maxLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          placeholder="e.g. 9876543210 (10-digit number)"
          className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* 4. Full Address (One simple text area for complete address) */}
      <div>
        <label className="block text-xs uppercase font-mono text-neutral-300 mb-1.5 font-medium">
          4. Full Address *
        </label>
        <textarea
          required
          rows={3}
          value={fullAddress}
          onChange={(e) => setFullAddress(e.target.value)}
          placeholder="Enter complete address (Flat / House / Building No., Street, Landmark, Area)..."
          className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* 5. PIN Code (6-digit Indian PIN Code with Auto-Detection) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs uppercase font-mono text-neutral-300 font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>5. PIN Code * (Auto-Detects Area, District &amp; State)</span>
          </label>
          {loadingPin && (
            <span className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono">
              <Loader2 className="w-3 h-3 animate-spin text-white" /> Detecting...
            </span>
          )}
        </div>
        <input
          type="text"
          required
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-digit Indian PIN Code (e.g. 110001)"
          className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-mono tracking-widest placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Automatic Address Detection Display */}
      {(loadingPin || district || state || pinStatus) && (
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 animate-fade-in">
          {/* Status Alert Banner */}
          {pinStatus && (
            <div
              className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                pinStatus.success
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                  : 'bg-red-950/60 text-red-300 border border-red-800'
              }`}
            >
              {pinStatus.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              )}
              <span className="font-medium">{pinStatus.message}</span>
            </div>
          )}

          {/* Auto-detected: Street/Area, District, State */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Street / Area Information */}
            <div>
              <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1 font-semibold">
                Street / Area
              </label>
              {postOfficesList.length > 1 ? (
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                >
                  {postOfficesList.map((po) => (
                    <option key={po} value={po} className="bg-neutral-900 text-white">
                      {po}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Street / Area info"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              )}
            </div>

            {/* District */}
            <div>
              <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1 font-semibold">
                District / City
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="District"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1 font-semibold">
                State
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-2.5 rounded-full text-xs font-medium transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-white hover:bg-neutral-200 active:scale-95 text-black px-8 py-3 rounded-full text-xs uppercase font-bold tracking-wider transition-colors shadow-md"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}
