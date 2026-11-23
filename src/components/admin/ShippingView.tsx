'use client';

import React, { useState } from 'react';
import { ShippingRecord } from '@/lib/types';
import { Truck, Search, ExternalLink, RefreshCw, CheckCircle2, Clock, MapPin, Edit3, ArrowRight } from 'lucide-react';

interface ShippingViewProps {
  shippingRecords: ShippingRecord[];
  onRefresh: () => void;
  showToast: (msg: string) => void;
}

export default function ShippingView({ shippingRecords = [], onRefresh, showToast }: ShippingViewProps) {
  const [search, setSearch] = useState('');
  const [courierFilter, setCourierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<ShippingRecord | null>(null);

  // Edit shipment form
  const [editCourier, setEditCourier] = useState<ShippingRecord['courierName']>('Delhivery');
  const [editTrackingNumber, setEditTrackingNumber] = useState('');
  const [editStatus, setEditStatus] = useState<ShippingRecord['status']>('In Transit');
  const [saving, setSaving] = useState(false);

  const safeRecords = shippingRecords || [];
  // Compute metrics
  const totalShipments = safeRecords.length;
  const inTransitCount = safeRecords.filter((s) => s.status === 'In Transit' || s.status === 'Picked Up').length;
  const outForDeliveryCount = safeRecords.filter((s) => s.status === 'Out for Delivery').length;
  const deliveredCount = safeRecords.filter((s) => s.status === 'Delivered').length;

  const filtered = safeRecords.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.customerName.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.pincode.includes(search);

    const matchesCourier = courierFilter === 'all' || s.courierName === courierFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

    return matchesSearch && matchesCourier && matchesStatus;
  });

  const openEditModal = (rec: ShippingRecord) => {
    setSelectedRecord(rec);
    setEditCourier(rec.courierName);
    setEditTrackingNumber(rec.trackingNumber);
    setEditStatus(rec.status);
  };

  const handleSaveShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    try {
      setSaving(true);
      const res = await fetch('/api/admin/shipping', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedRecord.id,
          courierName: editCourier,
          trackingNumber: editTrackingNumber,
          status: editStatus,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Shipment for ${selectedRecord.orderNumber} updated to ${editStatus}`);
        setSelectedRecord(null);
        onRefresh();
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      alert('Network error while updating shipment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h3 className="font-serif text-xl font-bold tracking-wide">SHIPPING & COURIER DISPATCH MANAGEMENT</h3>
          <p className="text-xs text-neutral-400 font-mono">
            Multi-carrier dispatch tracking, AWB assignments, and real-time transit state tracking.
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Tracking</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase font-mono text-neutral-400 block">TOTAL DISPATCHES</span>
          <div className="font-mono text-xl sm:text-2xl font-black text-white">{totalShipments}</div>
          <span className="text-[11px] text-neutral-400 font-mono">All consignments</span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase font-mono text-sky-400 block">IN TRANSIT / PICKED UP</span>
          <div className="font-mono text-xl sm:text-2xl font-black text-white">{inTransitCount}</div>
          <span className="text-[11px] text-sky-400 font-mono flex items-center gap-1">
            <Truck className="w-3 h-3" /> Moving in network
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase font-mono text-amber-400 block">OUT FOR DELIVERY</span>
          <div className="font-mono text-xl sm:text-2xl font-black text-white">{outForDeliveryCount}</div>
          <span className="text-[11px] text-amber-400 font-mono">Last-mile doorstep</span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <span className="text-[10px] uppercase font-mono text-emerald-400 block">SUCCESSFULLY DELIVERED</span>
          <div className="font-mono text-xl sm:text-2xl font-black text-white">{deliveredCount}</div>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> POD verified
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search AWB, Order #, City, Pincode..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
          />
        </div>

        <select
          value={courierFilter}
          onChange={(e) => setCourierFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white"
        >
          <option value="all">All Courier Partners (Delhivery, BlueDart, DTDC, XpressBees)</option>
          <option value="Delhivery">Delhivery Express</option>
          <option value="BlueDart">Blue Dart Aviation</option>
          <option value="DTDC">DTDC Premier</option>
          <option value="XpressBees">XpressBees Logistics</option>
          <option value="SpeedPost">India Post / SpeedPost</option>
          <option value="Standard Air">Standard Armored Air</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white"
        >
          <option value="all">All Transit Statuses</option>
          <option value="Manifested">1. Manifested / Label Generated</option>
          <option value="Picked Up">2. Picked Up by Courier</option>
          <option value="In Transit">3. In Transit</option>
          <option value="Out for Delivery">4. Out for Delivery</option>
          <option value="Delivered">5. Delivered (POD Confirmed)</option>
          <option value="Returned">6. Returned / RTO</option>
        </select>
      </div>

      {/* Shipments Table */}
      <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
              <th className="pb-3">Consignment / Order</th>
              <th className="pb-3">Customer & Phone</th>
              <th className="pb-3">Destination</th>
              <th className="pb-3">Carrier & Tracking AWB</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Dates</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-neutral-500">
                  No shipping records found matching the current search criteria.
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5">
                    <span className="font-bold text-white block">{s.orderNumber}</span>
                    <span className="text-[10px] text-neutral-400">ID: {s.id.slice(0, 10)}</span>
                  </td>
                  <td className="py-3.5 font-sans">
                    <div className="font-semibold text-white">{s.customerName}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">+91 {s.phone}</div>
                  </td>
                  <td className="py-3.5 font-sans">
                    <div className="text-white font-medium">{s.city}, {s.state}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">PIN: {s.pincode}</div>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 text-[10px] font-bold">
                      {s.courierName}
                    </span>
                    <div className="text-white font-bold text-xs mt-1 tracking-wider">
                      {s.trackingNumber}
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                        s.status === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : s.status === 'Out for Delivery'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : s.status === 'Returned' || s.status === 'RTO'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-sky-950 text-sky-400 border border-sky-800'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-neutral-400 text-[10px]">
                    <div>Dispatched: {s.dispatchDate}</div>
                    <div className="text-neutral-500">Est Delivery: {s.estimatedDelivery}</div>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => openEditModal(s)}
                      className="px-3 py-1 rounded-full bg-white text-black font-bold text-[11px] hover:bg-neutral-200 transition-colors"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Shipment Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl font-mono text-xs">
            <h4 className="font-serif text-lg font-bold text-white">
              Update Courier & Tracking: {selectedRecord.orderNumber}
            </h4>
            <p className="text-neutral-400">
              Patron: <span className="text-white font-bold">{selectedRecord.customerName}</span> ({selectedRecord.city})
            </p>

            <form onSubmit={handleSaveShipment} className="space-y-4">
              <div>
                <label className="block text-neutral-400 mb-1">COURIER PARTNER *</label>
                <select
                  value={editCourier}
                  onChange={(e) => setEditCourier(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold"
                >
                  <option value="Delhivery">Delhivery Express</option>
                  <option value="BlueDart">Blue Dart Aviation</option>
                  <option value="DTDC">DTDC Premier</option>
                  <option value="XpressBees">XpressBees Logistics</option>
                  <option value="SpeedPost">India Post / SpeedPost</option>
                  <option value="Standard Air">Standard Armored Air</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">AIR WAYBILL (AWB) / TRACKING NUMBER *</label>
                <input
                  type="text"
                  required
                  value={editTrackingNumber}
                  onChange={(e) => setEditTrackingNumber(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">CURRENT TRANSIT STATUS *</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold"
                >
                  <option value="Manifested">1. Manifested / Ready for Pickup</option>
                  <option value="Picked Up">2. Picked Up by Courier</option>
                  <option value="In Transit">3. In Transit to Hub</option>
                  <option value="Out for Delivery">4. Out for Delivery</option>
                  <option value="Delivered">5. Delivered (POD Received)</option>
                  <option value="Returned">6. Returned / RTO</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Updates'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
