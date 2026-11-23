'use client';

import React, { useState } from 'react';
import { AdminUser } from '@/lib/types';
import { ShieldCheck, Plus, Trash2, Edit, UserCheck, Shield, Key, Search, Mail, Lock, CheckCircle2 } from 'lucide-react';

interface UsersViewProps {
  adminUsers: AdminUser[];
  onRefresh: () => void;
  showToast: (msg: string) => void;
}

export default function UsersView({ adminUsers = [], onRefresh, showToast }: UsersViewProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AdminUser['role']>('order_manager');
  const [status, setStatus] = useState<AdminUser['status']>('active');
  const [saving, setSaving] = useState(false);

  const safeUsers = adminUsers || [];
  const filtered = safeUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.roleTitle?.toLowerCase().includes(search.toLowerCase())
  );

  const openNewUserModal = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('order_manager');
    setStatus('active');
    setIsModalOpen(true);
  };

  const openEditModal = (u: AdminUser) => {
    setEditingUser(u);
    setName(u.name);
    setEmail(u.email);
    setPassword('');
    setRole(u.role);
    setStatus(u.status);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingUser) {
        // Update
        const res = await fetch('/api/admin/users', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingUser.id,
            name,
            role,
            status,
            password: password || undefined,
          }),
        });
        const data = await res.json();
        if (data.success) {
          showToast(`Admin profile for ${name} updated successfully!`);
          setIsModalOpen(false);
          onRefresh();
        } else {
          alert(data.message || 'Update failed');
        }
      } else {
        // Create
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role, status }),
        });
        const data = await res.json();
        if (data.success) {
          showToast(`New admin user ${name} registered successfully!`);
          setIsModalOpen(false);
          onRefresh();
        } else {
          alert(data.message || 'Registration failed');
        }
      }
    } catch (err) {
      alert('Network error while saving user');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (id: string, userName: string) => {
    if (!confirm(`Are you sure you want to revoke access for ${userName}?`)) return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(`Admin user ${userName} access revoked`);
        onRefresh();
      } else {
        alert(data.message || 'Deletion failed');
      }
    } catch (err) {
      alert('Error deleting user');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h3 className="font-serif text-xl font-bold tracking-wide">ADMIN USERS & ROLE-BASED ACCESS (RBAC)</h3>
          <p className="text-xs text-neutral-400 font-mono">
            Granular staff permissions, multi-admin security policies, and team credentials.
          </p>
        </div>

        <button
          onClick={openNewUserModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all shadow-md self-start sm:self-auto font-mono"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* RBAC Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Super Admin</span>
          </div>
          <p className="text-[11px] text-neutral-400">Unrestricted root master privileges across all systems.</p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <Shield className="w-4 h-4" />
            <span>Product Mgr</span>
          </div>
          <p className="text-[11px] text-neutral-400">Catalog, variants, inventory, pricing, and category controller.</p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Shield className="w-4 h-4" />
            <span>Order Mgr</span>
          </div>
          <p className="text-[11px] text-neutral-400">11-stage fulfillment, courier dispatch, and customer notes.</p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-2 text-purple-400 font-bold">
            <Shield className="w-4 h-4" />
            <span>Support Mgr</span>
          </div>
          <p className="text-[11px] text-neutral-400">Customer profiles, order tracking, returns, and reviews.</p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <Shield className="w-4 h-4" />
            <span>Finance Mgr</span>
          </div>
          <p className="text-[11px] text-neutral-400">Payment reconciliation, tax invoices, and refunds.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative text-xs font-mono">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search admin users by name, email, or role..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Users Table */}
      <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
              <th className="pb-3">Admin Member</th>
              <th className="pb-3">Role & Privileges</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Last Active</th>
              <th className="pb-3">Registered On</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-neutral-800/40 transition-colors">
                <td className="py-3.5">
                  <div className="font-bold text-white font-sans">{u.name}</div>
                  <div className="text-[11px] text-neutral-400 font-mono">{u.email}</div>
                </td>
                <td className="py-3.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      u.role === 'super_admin'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : u.role === 'product_manager'
                        ? 'bg-sky-950 text-sky-400 border border-sky-800'
                        : u.role === 'finance_manager'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {u.roleTitle}
                  </span>
                </td>
                <td className="py-3.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      u.status === 'active'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900'
                        : 'bg-red-950/60 text-red-400 border border-red-900'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 text-neutral-400 text-[11px]">
                  {u.lastLogin ? new Date(u.lastLogin).toLocaleString('en-IN') : 'Just now'}
                </td>
                <td className="py-3.5 text-neutral-400 text-[11px]">
                  {new Date(u.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td className="py-3.5 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(u)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                    title="Edit User"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  {u.email !== 'admin@mirli.store' && (
                    <button
                      onClick={() => handleDeleteUser(u.id, u.name)}
                      className="p-1.5 rounded-lg bg-red-950/50 hover:bg-red-900 text-red-300 transition-colors"
                      title="Revoke Access"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl font-mono text-xs">
            <h4 className="font-serif text-lg font-bold text-white">
              {editingUser ? `Edit Admin: ${editingUser.name}` : 'Register New Admin Member'}
            </h4>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <label className="block text-neutral-400 mb-1">FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikramaditya Sharma"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  disabled={!!editingUser}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. staff@goyal.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">
                  PASSWORD {editingUser ? '(LEAVE BLANK TO KEEP UNCHANGED)' : '*'}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">ASSIGNED ROLE *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="product_manager">Product Manager</option>
                    <option value="order_manager">Order Manager</option>
                    <option value="support_manager">Support Manager</option>
                    <option value="finance_manager">Finance Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">ACCOUNT STATUS *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
