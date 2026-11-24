'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Loader2, Truck, Clock } from 'lucide-react';

interface PincodeCheckerProps {
  onPincodeVerified?: (info: { pincode: string; district: string; state: string; days: number }) => void;
}

// Client-side memory cache for instant pincode resolution
const clientPincodeCheckerCache = new Map<string, any>();

export default function PincodeChecker({ onPincodeVerified }: PincodeCheckerProps) {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    district?: string;
    state?: string;
    postOffices?: string[];
    days?: number;
    message?: string;
  } | null>(null);

  const handleCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      setResult({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }

    setLoading(true);
    setResult(null);

    const cached = clientPincodeCheckerCache.get(cleanPin);
    if (cached) {
      const estDate = new Date();
      estDate.setDate(estDate.getDate() + (cached.deliveryDays || 3));
      const dateStr = estDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      setResult({
        valid: true,
        district: cached.district,
        state: cached.state,
        postOffices: cached.postOffices,
        days: cached.deliveryDays || 3,
        message: `Delivery by ${dateStr} • Express & COD Available`,
      });

      if (onPincodeVerified) {
        onPincodeVerified({
          pincode: cleanPin,
          district: cached.district,
          state: cached.state,
          days: cached.deliveryDays || 3,
        });
      }
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/pincode/${cleanPin}`);
      const data = await res.json();

      if (data.success) {
        clientPincodeCheckerCache.set(cleanPin, data);
        const estDate = new Date();
        estDate.setDate(estDate.getDate() + (data.deliveryDays || 3));
        const dateStr = estDate.toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });

        setResult({
          valid: true,
          district: data.district,
          state: data.state,
          postOffices: data.postOffices,
          days: data.deliveryDays || 3,
          message: `Delivery by ${dateStr} • Express & COD Available`,
        });

        if (onPincodeVerified) {
          onPincodeVerified({
            pincode: cleanPin,
            district: data.district,
            state: data.state,
            days: data.deliveryDays || 3,
          });
        }
      } else {
        setResult({ valid: false, message: data.message || 'PIN code unserviceable.' });
      }
    } catch (err: any) {
      setResult({ valid: false, message: 'Network error checking PIN code.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 text-white">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
        <MapPin className="w-4 h-4 text-white" />
        <span>Check Delivery Availability &amp; COD</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPincode(val);
            if (val.length === 6) {
              setTimeout(() => {
                fetch(`/api/pincode/${val}`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.success) {
                      const estDate = new Date();
                      estDate.setDate(estDate.getDate() + (data.deliveryDays || 3));
                      const dateStr = estDate.toLocaleDateString('en-IN', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      });
                      setResult({
                        valid: true,
                        district: data.district,
                        state: data.state,
                        postOffices: data.postOffices,
                        days: data.deliveryDays || 3,
                        message: `Delivery by ${dateStr} • Express & COD Available`,
                      });
                      if (onPincodeVerified) {
                        onPincodeVerified({
                          pincode: val,
                          district: data.district,
                          state: data.state,
                          days: data.deliveryDays || 3,
                        });
                      }
                    }
                  })
                  .catch(() => {});
              }, 100);
            }
          }}
          placeholder="Enter 6-digit Indian PIN code"
          className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-xs tracking-wider placeholder-neutral-500 font-mono text-white focus:outline-none focus:border-white"
        />
        <button
          type="submit"
          disabled={loading || pincode.length !== 6}
          className="bg-white text-black hover:bg-neutral-200 px-5 py-2 rounded-xl text-xs font-bold disabled:opacity-40 transition-all shadow-sm"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-black" /> : 'Check'}
        </button>
      </form>

      {/* Result Card */}
      {result && (
        <div className={`p-3 rounded-xl text-xs animate-fade-in ${
          result.valid ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-red-950/60 border border-red-800 text-red-300'
        }`}>
          {result.valid ? (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Serviceable Destination</span>
              </div>
              <p className="text-white font-semibold text-[11px]">{result.message}</p>
              <p className="text-neutral-400 text-[10px]">
                Delivering to: <strong className="text-white">{result.district}, {result.state}</strong>
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{result.message}</span>
            </div>
          )}
        </div>
      )}

      {/* Assurances */}
      <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-neutral-400 border-t border-neutral-800">
        <span className="flex items-center gap-1">
          <Truck className="w-3 h-3 text-white" /> Free over ₹1,999
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-white" /> 2-4 Business Days
        </span>
      </div>
    </div>
  );
}
