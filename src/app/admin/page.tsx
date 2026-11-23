'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import PaymentsView from '@/components/admin/PaymentsView';
import ShippingView from '@/components/admin/ShippingView';
import NotificationsView from '@/components/admin/NotificationsView';
import UsersView from '@/components/admin/UsersView';
import ActivityLogsView from '@/components/admin/ActivityLogsView';
import PrintInvoiceModal from '@/components/admin/PrintInvoiceModal';
import {
  PaymentTransaction,
  ShippingRecord,
  AdminNotification,
  AdminUser,
} from '@/lib/types';
import {
  Bell,
  Printer,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  Star,
  Tag,
  Image as ImageIcon,
  TrendingUp,
  ArrowDownUp,
  Settings,
  LogOut,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Ban,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Sliders,
  DollarSign,
  ArrowRight,
  Save,
  X,
  Loader2,
  Menu,
  ChevronDown,
  Upload,
  Download,
  FileSpreadsheet,
  Check,
  ExternalLink,
  Lock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Percent,
  Sparkles,
  SlidersHorizontal,
  History,
  FileText,
} from 'lucide-react';
import {
  Product,
  CategoryItem,
  Order,
  OrderStatus,
  Customer,
  Coupon,
  Review,
  StockLog,
  AdminActivityLog,
  BannerSlide,
} from '@/lib/types';

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'orders'
  | 'customers'
  | 'reviews'
  | 'coupons'
  | 'payments'
  | 'shipping'
  | 'analytics'
  | 'notifications'
  | 'banners'
  | 'content'
  | 'users'
  | 'settings'
  | 'logs'
  | 'inventory'
  | 'export_import';

export default function AdminDashboardPage() {
  // Luxury Audio Chime for Real-Time Order Alerts (Web Audio API)
  const playLuxuryChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start(ctx.currentTime + 0.08);
      osc1.stop(ctx.currentTime + 0.85);
      osc2.stop(ctx.currentTime + 0.85);
    } catch (e) {
      console.warn('Audio chime notice:', e);
    }
  };

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginEmail, setLoginEmail] = useState('admin@mirli.store');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Navigation state
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global Data states
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryLogs, setInventoryLogs] = useState<StockLog[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [banners, setBanners] = useState<BannerSlide[]>([]);
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>([]);
  const [settings, setSettings] = useState<any>(null);

  // Real-Time & Advanced Admin States
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [shippingRecords, setShippingRecords] = useState<ShippingRecord[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [realtimeConnected, setRealtimeConnected] = useState<boolean>(false);
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<Order | null>(null);
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | '7d' | '30d' | 'this_month' | 'last_month'>('all');

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filter states
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productStatusFilter, setProductStatusFilter] = useState('all');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  const [customerSearch, setCustomerSearch] = useState('');

  // Modals & Drawers
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderStatusUpdate, setOrderStatusUpdate] = useState<OrderStatus>('Order Placed');
  const [orderNotes, setOrderNotes] = useState('');
  const [courierName, setCourierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [newSubcatName, setNewSubcatName] = useState('');
  const [newSubcatSlug, setNewSubcatSlug] = useState('');

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerSlide | null>(null);

  // Import State
  const [importType, setImportType] = useState<'products' | 'inventory'>('products');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<any>(null);
  const [importing, setImporting] = useState(false);

  // Product Form State
  const [prodForm, setProdForm] = useState({
    name: '',
    sku: '',
    category: 'footwear',
    categoryTitle: 'Footwear',
    subcategory: 'shoes',
    subcategoryTitle: 'Shoes',
    price: 3999,
    mrp: 5999,
    stock: 25,
    status: 'active' as 'active' | 'inactive',
    isTrending: false,
    isNewArrival: true,
    isBestSeller: false,
    featured: false,
    description: '',
    sizes: 'UK 7, UK 8, UK 9, UK 10',
    colorName: 'Obsidian Black',
    colorHex: '#0a0a0a',
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000'],
    primaryMaterial: 'Full-Grain Calfskin Leather',
    lining: 'Ergonomic Memory Leather Footbed',
    closure: 'Slip-On Elastic Gusset',
    origin: 'Handcrafted in Agra, India',
    designInfo: 'Anatomical contours with sharp elongated silhouette.',
    careInfo: 'Buff with neutral beeswax cream. Store in breathable canvas dust cover.',
    videoUrl: '',
  });

  // Category Form State
  const [catForm, setCatForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000',
  });

  // Coupon Form State
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountPercent: 15,
    maxDiscount: 2000,
    minOrder: 1999,
    description: '',
    expiresAt: '2026-12-31',
    active: true,
  });

  // Banner Form State
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    badge: 'COLLECTION 2026 // DROP',
    ctaText: 'EXPLORE COLLECTION',
    ctaLink: '/shop',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600',
    order: 1,
    active: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileRef = useRef<HTMLInputElement>(null);

  // -------------------------------------------------------------
  // 1. Check Admin Auth on Mount
  // -------------------------------------------------------------
  useEffect(() => {
    checkAuth();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        loadAllData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        showToast('Authorized. Welcome to GOYAL COLLECTIONS Admin Command Center.');
        loadAllData();
      } else {
        setLoginError(data.message || 'Invalid credentials. Access denied.');
      }
    } catch (e: any) {
      setLoginError('Connection failure during authentication.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {}
    setIsAuthenticated(false);
    showToast('Signed out securely.');
  };

  // -------------------------------------------------------------
  // 2. Fetch All Data
  // -------------------------------------------------------------
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        statsRes,
        prodRes,
        catRes,
        ordRes,
        custRes,
        invRes,
        revRes,
        coupRes,
        banRes,
        logRes,
        setRes,
        paymentsRes,
        shippingRes,
        notifRes,
        usersRes,
      ] = await Promise.all([
        fetch('/api/admin/stats').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/products').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/categories').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/orders').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/customers').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/inventory').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/reviews').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/coupons').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/banners').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/logs').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/settings').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/payments').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/shipping').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/notifications').then((r) => r.json()).catch(() => ({ success: false })),
        fetch('/api/admin/users').then((r) => r.json()).catch(() => ({ success: false })),
      ]);

      if (statsRes?.success) setStats(statsRes.stats);
      if (prodRes?.success) setProducts(prodRes.products || []);
      if (catRes?.success) setCategories(catRes.categories || []);
      if (ordRes?.success) setOrders(ordRes.orders || []);
      if (custRes?.success) setCustomers(custRes.customers || []);
      if (invRes?.success) setInventoryLogs(invRes.logs || []);
      if (revRes?.success) setReviews(revRes.reviews || []);
      if (coupRes?.success) setCoupons(coupRes.coupons || []);
      if (banRes?.success) setBanners(banRes.slides || []);
      if (logRes?.success) setActivityLogs(logRes.logs || []);
      if (setRes?.success) setSettings(setRes.settings || null);
      if (paymentsRes?.success) setPayments(paymentsRes.payments || []);
      if (shippingRes?.success) setShippingRecords(shippingRes.shipping || []);
      if (notifRes?.success && notifRes.notifications) {
        setNotifications(notifRes.notifications);
        setUnreadNotificationsCount(
          notifRes.unreadCount ?? (notifRes.notifications?.filter((n: any) => !n.read)?.length || 0)
        );
      }
      if (usersRes?.success) setAdminUsers(usersRes.users || []);
    } catch (err) {
      console.error('Failed loading admin records:', err);
    } finally {
      setLoading(false);
    }
  };


  // URL Synchronization on mount and popstate
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.replace(/^\/admin\/?/, '');
      const validTabs = [
        'dashboard', 'products', 'categories', 'orders', 'customers',
        'reviews', 'coupons', 'payments', 'shipping', 'analytics',
        'notifications', 'banners', 'content', 'users', 'settings', 'logs',
        'inventory', 'export_import'
      ];
      if (p) {
        const matched = validTabs.find((t) => p.startsWith(t));
        if (matched) {
          setActiveTab((matched === 'content' ? 'banners' : matched) as AdminTab);
        }
      }

      const onPop = () => {
        const popP = window.location.pathname.replace(/^\/admin\/?/, '');
        const matched = validTabs.find((t) => popP.startsWith(t));
        if (matched) {
          setActiveTab((matched === 'content' ? 'banners' : matched) as AdminTab);
        } else {
          setActiveTab('dashboard');
        }
      };
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }
  }, []);

  // Real-Time SSE Listener for Admin Events
  useEffect(() => {
    if (!isAuthenticated) return;

    let es: EventSource | null = null;
    try {
      es = new EventSource('/api/events?channel=admin');

      es.onopen = () => {
        setRealtimeConnected(true);
      };

      es.onerror = () => {
        setRealtimeConnected(false);
      };

      es.addEventListener('order:created', (e: any) => {
        try {
          const data = JSON.parse(e.data);
          if (data && data.order) {
            if (soundEnabled) playLuxuryChime();
            setNewOrderIds((prev) => new Set(prev).add(data.order.id));
            setOrders((prev) => [data.order, ...prev.filter((o) => o.id !== data.order.id)]);
            setToastMessage(`🚨 NEW ORDER #${data.order.orderNumber} - ₹${data.order.totalAmount.toLocaleString('en-IN')}`);
            setTimeout(() => setToastMessage(null), 8000);
            
            fetch('/api/admin/stats').then((r) => r.json()).then((d) => d.success && setStats(d.stats));
            fetch('/api/admin/payments').then((r) => r.json()).then((d) => d.success && setPayments(d.payments));
            fetch('/api/admin/shipping').then((r) => r.json()).then((d) => d.success && setShippingRecords(d.shipping));
            fetch('/api/admin/notifications').then((r) => r.json()).then((d) => {
              if (d.success) {
                setNotifications(d.notifications);
                setUnreadNotificationsCount(d.unreadCount);
              }
            });
          }
        } catch (err) {
          console.error('SSE order:created parse error:', err);
        }
      });

      es.addEventListener('order:updated', (e: any) => {
        try {
          const data = JSON.parse(e.data);
          const order = data?.order || data;
          if (order && order.id) {
            setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
            fetch('/api/admin/shipping').then((r) => r.json()).then((d) => d.success && setShippingRecords(d.shipping));
            fetch('/api/admin/payments').then((r) => r.json()).then((d) => d.success && setPayments(d.payments));
          }
        } catch (err) {}
      });

      es.addEventListener('product:updated', () => {
        fetch('/api/admin/products').then((r) => r.json()).then((d) => d.success && setProducts(d.products));
      });

      es.addEventListener('product:created', () => {
        fetch('/api/admin/products').then((r) => r.json()).then((d) => d.success && setProducts(d.products));
      });

      es.addEventListener('product:deleted', () => {
        fetch('/api/admin/products').then((r) => r.json()).then((d) => d.success && setProducts(d.products));
      });

      es.addEventListener('stock:updated', () => {
        fetch('/api/admin/products').then((r) => r.json()).then((d) => d.success && setProducts(d.products));
        fetch('/api/admin/inventory').then((r) => r.json()).then((d) => d.success && setInventoryLogs(d.logs));
      });

      es.addEventListener('customer:created', () => {
        fetch('/api/admin/customers').then((r) => r.json()).then((d) => d.success && setCustomers(d.customers));
      });

      es.addEventListener('review:updated', () => {
        fetch('/api/admin/reviews').then((r) => r.json()).then((d) => d.success && setReviews(d.reviews));
      });

      es.addEventListener('category:updated', () => {
        fetch('/api/admin/categories').then((r) => r.json()).then((d) => d.success && setCategories(d.categories));
      });
    } catch (err) {
      console.warn('SSE initialization notice:', err);
    }

    return () => {
      if (es) es.close();
    };
  }, [isAuthenticated, soundEnabled]);

  // -------------------------------------------------------------
  // 3. Image Upload Handler
  // -------------------------------------------------------------
  const handleImageFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'product' | 'category' | 'banner'
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      setActionLoading(true);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.files) {
        const uploadedUrls = data.files.map((f: any) => f.url);
        if (target === 'product') {
          setProdForm((prev) => ({
            ...prev,
            images: [...prev.images, ...uploadedUrls],
          }));
        } else if (target === 'category') {
          setCatForm((prev) => ({ ...prev, image: uploadedUrls[0] }));
        } else if (target === 'banner') {
          setBannerForm((prev) => ({ ...prev, image: uploadedUrls[0] }));
        }
        showToast(`Uploaded ${uploadedUrls.length} file(s) successfully!`);
      } else {
        alert(data.message || 'Upload failed.');
      }
    } catch (err) {
      alert('Network error while uploading file.');
    } finally {
      setActionLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 4. Product CRUD
  // -------------------------------------------------------------
  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      sku: `MRL-FW-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'footwear',
      categoryTitle: 'Footwear',
      subcategory: 'shoes',
      subcategoryTitle: 'Shoes',
      price: 4999,
      mrp: 7999,
      stock: 30,
      status: 'active',
      isTrending: false,
      isNewArrival: true,
      isBestSeller: false,
      featured: false,
      description: 'Handcrafted luxury piece sculpted with pure minimalist architecture.',
      sizes: 'UK 7, UK 8, UK 9, UK 10',
      colorName: 'Obsidian Black',
      colorHex: '#0a0a0a',
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000'],
      primaryMaterial: 'Full-Grain Calfskin Leather',
      lining: 'Ergonomic Memory Leather Footbed',
      closure: 'Slip-On Elastic Gusset',
      origin: 'Handcrafted in Agra, India',
      designInfo: 'Anatomical contours with sharp elongated silhouette.',
      careInfo: 'Buff with neutral beeswax cream. Store in breathable canvas dust cover.',
      videoUrl: '',
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    const getSpecVal = (key: string) =>
      prod.specifications?.find((s) => s.label.toLowerCase().includes(key))?.value || '';

    setProdForm({
      name: prod.name,
      sku: prod.sku || `MRL-${prod.category.slice(0, 2).toUpperCase()}-${prod.id.split('-').pop()}`,
      category: prod.category,
      categoryTitle: prod.categoryTitle,
      subcategory: prod.subcategory,
      subcategoryTitle: prod.subcategoryTitle,
      price: prod.price,
      mrp: prod.mrp,
      stock: prod.stock,
      status: prod.status || 'active',
      isTrending: !!prod.isTrending,
      isNewArrival: !!prod.isNewArrival,
      isBestSeller: !!prod.isBestSeller,
      featured: !!prod.featured,
      description: prod.description,
      sizes: prod.sizes.join(', '),
      colorName: prod.colors[0]?.name || 'Obsidian Black',
      colorHex: prod.colors[0]?.hex || '#0a0a0a',
      images: prod.images && prod.images.length > 0 ? prod.images : ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000'],
      primaryMaterial: getSpecVal('material') || getSpecVal('upper') || getSpecVal('fabric') || 'Full-Grain Leather',
      lining: getSpecVal('lining') || getSpecVal('sole') || 'Cupro Silk / Memory Footbed',
      closure: getSpecVal('closure') || 'Concealed Fastening',
      origin: getSpecVal('origin') || 'Handcrafted in Agra, India',
      designInfo: prod.designInfo || 'Anatomical contours with sharp elongated silhouette.',
      careInfo: prod.careInfo || 'Store in breathable canvas dust bag.',
      videoUrl: prod.videoUrl || '',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    const sizesArr = prodForm.sizes.split(',').map((s) => s.trim()).filter(Boolean);
    const colorsArr = [{ name: prodForm.colorName, hex: prodForm.colorHex }];
    const specsArr = [
      { label: 'Primary Material', value: prodForm.primaryMaterial },
      { label: 'Internal Structure & Lining', value: prodForm.lining },
      { label: 'Closure & Fastening', value: prodForm.closure },
      { label: 'Place of Craft', value: prodForm.origin },
    ];

    const payload = {
      name: prodForm.name,
      sku: prodForm.sku,
      category: prodForm.category,
      categoryTitle: prodForm.category === 'footwear' ? 'Footwear' : 'Ready-made Clothes',
      subcategory: prodForm.subcategory,
      subcategoryTitle: prodForm.subcategory.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      price: Number(prodForm.price),
      mrp: Number(prodForm.mrp),
      stock: Number(prodForm.stock),
      status: prodForm.status,
      isTrending: prodForm.isTrending,
      isNewArrival: prodForm.isNewArrival,
      isBestSeller: prodForm.isBestSeller,
      featured: prodForm.featured,
      description: prodForm.description,
      designInfo: prodForm.designInfo,
      careInfo: prodForm.careInfo,
      videoUrl: prodForm.videoUrl || undefined,
      images: prodForm.images.filter(Boolean),
      sizes: sizesArr,
      colors: colorsArr,
      specifications: specsArr,
      details: [
        `Crafted from ${prodForm.primaryMaterial}`,
        `${prodForm.closure} engineering`,
        prodForm.designInfo,
      ],
    };

    try {
      if (editingProduct) {
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? data.product : p)));
          setIsProductModalOpen(false);
          showToast(`Updated "${prodForm.name}" successfully!`);
          loadAllData();
        }
      } else {
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setProducts((prev) => [data.product, ...prev]);
          setIsProductModalOpen(false);
          showToast(`Created "${prodForm.name}" successfully!`);
          loadAllData();
        }
      }
    } catch {
      alert('Error saving product.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}" from the store catalog?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast(`Product "${name}" deleted.`);
        loadAllData();
      }
    } catch {
      alert('Failed to delete product.');
    }
  };

  const handleToggleProductStatus = async (prod: Product) => {
    const nextStatus = prod.status === 'inactive' ? 'active' : 'inactive';
    try {
      const res = await fetch(`/api/admin/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.map((p) => (p.id === prod.id ? { ...p, status: nextStatus } : p)));
        showToast(`"${prod.name}" is now ${nextStatus}.`);
      }
    } catch {}
  };

  // -------------------------------------------------------------
  // 5. Order Management & Status Transition
  // -------------------------------------------------------------
  const openOrderDetails = (ord: Order) => {
    setSelectedOrder(ord);
    setOrderStatusUpdate(ord.orderStatus);
    setOrderNotes(ord.internalNotes || '');
    setCourierName(ord.courierName || 'Blue Dart Express Air');
    setTrackingNumber(ord.trackingNumber || '');
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: orderStatusUpdate,
          notes: orderNotes,
          courierName,
          trackingNumber,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedOrder(data.order);
        setOrders((prev) => prev.map((o) => (o.id === data.order.id ? data.order : o)));
        showToast(`Order ${data.order.orderNumber} updated to "${orderStatusUpdate}".`);
        loadAllData();
      }
    } catch {
      alert('Failed to update order status.');
    } finally {
      setActionLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 6. Inventory Adjustments
  // -------------------------------------------------------------
  const handleStockAdjust = async (productId: string, newStock: number, reason: string) => {
    try {
      const res = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, newStock, reason }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
        );
        setInventoryLogs((prev) => [data.log, ...prev]);
        showToast(`Stock updated to ${newStock} units.`);
        loadAllData();
      }
    } catch {
      alert('Failed adjusting inventory.');
    }
  };

  // -------------------------------------------------------------
  // 7. Customer Management
  // -------------------------------------------------------------
  const handleToggleCustomerStatus = async (cust: Customer) => {
    const nextStatus = cust.status === 'active' ? 'suspended' : 'active';
    try {
      const res = await fetch('/api/admin/customers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cust.id, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setCustomers((prev) =>
          prev.map((c) => (c.id === cust.id ? { ...c, status: nextStatus } : c))
        );
        if (selectedCustomer?.id === cust.id) {
          setSelectedCustomer({ ...selectedCustomer, status: nextStatus });
        }
        showToast(`Customer account marked as ${nextStatus}.`);
      }
    } catch {}
  };

  // -------------------------------------------------------------
  // 8. Reviews Moderation
  // -------------------------------------------------------------
  const handleReviewStatus = async (productId: string, reviewId: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, reviewId, status }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) =>
          prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
        );
        showToast(`Review marked as ${status}.`);
        loadAllData();
      }
    } catch {}
  };

  const handleDeleteReview = async (productId: string, reviewId: string) => {
    if (!confirm('Permanently remove this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?productId=${productId}&reviewId=${reviewId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
        showToast('Review removed.');
        loadAllData();
      }
    } catch {}
  };

  // -------------------------------------------------------------
  // 9. Categories Management
  // -------------------------------------------------------------
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      if (editingCategory) {
        const res = await fetch('/api/admin/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: editingCategory.slug, updates: catForm }),
        });
        const data = await res.json();
        if (data.success) {
          setCategories((prev) =>
            prev.map((c) => (c.slug === editingCategory.slug ? data.category : c))
          );
          setIsCategoryModalOpen(false);
          showToast('Category updated!');
          loadAllData();
        }
      } else {
        const res = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(catForm),
        });
        const data = await res.json();
        if (data.success) {
          setCategories((prev) => [...prev, data.category]);
          setIsCategoryModalOpen(false);
          showToast('New Category added!');
          loadAllData();
        }
      }
    } catch {
      alert('Category save failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddSubcategory = async (categorySlug: string) => {
    if (!newSubcatName || !newSubcatSlug) return;
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-subcategory',
          categorySlug,
          subcategory: {
            name: newSubcatName,
            slug: newSubcatSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            description: `${newSubcatName} Atelier collection`,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000',
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewSubcatName('');
        setNewSubcatSlug('');
        showToast('Subcategory added!');
        loadAllData();
      }
    } catch {}
  };

  const handleDeleteCategory = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories?slug=${slug}`);
      const data = await res.json();
      if (!data.success && data.message) {
        if (confirm(`${data.message}\nDo you still wish to force delete?`)) {
          const forceRes = await fetch(`/api/admin/categories?slug=${slug}&force=true`, {
            method: 'DELETE',
          });
          const forceData = await forceRes.json();
          if (forceData.success) {
            setCategories((prev) => prev.filter((c) => c.slug !== slug));
            showToast('Category removed.');
            loadAllData();
          }
        }
      } else {
        const delRes = await fetch(`/api/admin/categories?slug=${slug}`, { method: 'DELETE' });
        const delData = await delRes.json();
        if (delData.success) {
          setCategories((prev) => prev.filter((c) => c.slug !== slug));
          showToast('Category removed.');
          loadAllData();
        } else {
          alert(delData.message);
        }
      }
    } catch {}
  };

  // -------------------------------------------------------------
  // 10. Coupons Management
  // -------------------------------------------------------------
  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponForm),
      });
      const data = await res.json();
      if (data.success) {
        setCoupons((prev) => [
          ...prev.filter((c) => c.code.toUpperCase() !== data.coupon.code.toUpperCase()),
          data.coupon,
        ]);
        setIsCouponModalOpen(false);
        showToast(`Coupon "${data.coupon.code}" saved.`);
        loadAllData();
      }
    } catch {}
  };

  const handleDeleteCoupon = async (code: string) => {
    if (!confirm(`Delete coupon ${code}?`)) return;
    try {
      const res = await fetch(`/api/admin/coupons?code=${code}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCoupons((prev) => prev.filter((c) => c.code !== code));
        showToast('Coupon removed.');
      }
    } catch {}
  };

  // -------------------------------------------------------------
  // 11. Banners Management
  // -------------------------------------------------------------
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        const res = await fetch('/api/admin/banners', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingBanner.id, updates: bannerForm }),
        });
        const data = await res.json();
        if (data.success) {
          setBanners((prev) => prev.map((b) => (b.id === editingBanner.id ? data.slide : b)));
          setIsBannerModalOpen(false);
          showToast('Banner updated.');
          loadAllData();
        }
      } else {
        const res = await fetch('/api/admin/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bannerForm),
        });
        const data = await res.json();
        if (data.success) {
          setBanners((prev) => [...prev, data.slide]);
          setIsBannerModalOpen(false);
          showToast('New hero banner created.');
          loadAllData();
        }
      }
    } catch {}
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm('Delete this homepage banner?')) return;
    try {
      const res = await fetch(`/api/admin/banners?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
        showToast('Banner deleted.');
        loadAllData();
      }
    } catch {}
  };

  // -------------------------------------------------------------
  // 12. Settings Management
  // -------------------------------------------------------------
  const handleSaveSettings = async () => {
    if (!settings) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        showToast('Global store & logistics settings saved.');
        loadAllData();
      }
    } catch {
      alert('Failed saving settings.');
    } finally {
      setActionLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 13. Import & Export Handlers
  // -------------------------------------------------------------
  const handlePreviewImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importFile) return;
    setImporting(true);

    const formData = new FormData();
    formData.append('file', importFile);
    formData.append('type', importType);
    formData.append('mode', 'preview');

    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImportPreview(data);
      } else {
        alert(data.message || 'Import preview failed.');
      }
    } catch {
      alert('Error previewing spreadsheet.');
    } finally {
      setImporting(false);
    }
  };

  const handleCommitImport = async () => {
    if (!importFile) return;
    setImporting(true);

    const formData = new FormData();
    formData.append('file', importFile);
    formData.append('type', importType);
    formData.append('mode', 'commit');

    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message);
        setImportFile(null);
        setImportPreview(null);
        loadAllData();
      } else {
        alert(data.message || 'Import commit failed.');
      }
    } catch {
      alert('Error committing import.');
    } finally {
      setImporting(false);
    }
  };

  // -------------------------------------------------------------
  // Filtered views
  // -------------------------------------------------------------
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(productSearch.toLowerCase())) ||
        p.subcategoryTitle.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCategory =
        productCategoryFilter === 'all' || p.category === productCategoryFilter;
      const matchesStatus =
        productStatusFilter === 'all' || (p.status || 'active') === productStatusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, productSearch, productCategoryFilter, productStatusFilter]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.phone.includes(orderSearch) ||
        o.email.toLowerCase().includes(orderSearch.toLowerCase());
      const matchesStatus =
        orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      return (
        c.fullName.toLowerCase().includes(customerSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
        c.phone.includes(customerSearch) ||
        c.id.toLowerCase().includes(customerSearch.toLowerCase())
      );
    });
  }, [customers, customerSearch]);

  // Dynamic stats calculation for Dashboard Date Range selector
  const filteredStats = useMemo(() => {
    if (!stats) return null;
    if (dateFilter === 'all') return stats;

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfDay - 86400000;
    const startOf7Days = now.getTime() - 7 * 86400000;
    const startOf30Days = now.getTime() - 30 * 86400000;
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).getTime();

    const matchingOrders = orders.filter((o) => {
      const t = new Date(o.createdAt).getTime();
      if (dateFilter === 'today') return t >= startOfDay;
      if (dateFilter === 'yesterday') return t >= startOfYesterday && t < startOfDay;
      if (dateFilter === '7d') return t >= startOf7Days;
      if (dateFilter === '30d') return t >= startOf30Days;
      if (dateFilter === 'this_month') return t >= startOfMonth;
      if (dateFilter === 'last_month') return t >= startOfLastMonth && t <= endOfLastMonth;
      return true;
    });

    const rev = matchingOrders
      .filter((o) => o.orderStatus !== 'Cancelled' && o.orderStatus !== 'Refunded')
      .reduce((sum, o) => sum + o.totalAmount, 0);

    return {
      ...(stats || {}),
      totalRevenue: rev,
      totalOrders: matchingOrders.length,
      pendingOrders: matchingOrders.filter((o) => o.orderStatus === 'Order Placed' || o.orderStatus === 'Confirmed').length,
      processingOrders: matchingOrders.filter((o) => o.orderStatus === 'Processing' || o.orderStatus === 'Packed').length,
      deliveredOrders: matchingOrders.filter((o) => o.orderStatus === 'Delivered').length,
      cancelledOrders: matchingOrders.filter((o) => o.orderStatus === 'Cancelled' || o.orderStatus === 'Refunded').length,
    };
  }, [stats, orders, dateFilter]);

  const safeStats = useMemo(() => {
    const s = filteredStats || stats;
    return {
      totalRevenue: s?.totalRevenue ?? 0,
      totalOrders: s?.totalOrders ?? 0,
      totalCustomers: s?.totalCustomers ?? 0,
      totalProducts: s?.totalProducts ?? 0,
      pendingOrders: s?.pendingOrders ?? 0,
      processingOrders: s?.processingOrders ?? 0,
      deliveredOrders: s?.deliveredOrders ?? 0,
      cancelledOrders: s?.cancelledOrders ?? 0,
      ordersByStatus: s?.ordersByStatus ?? {},
      bestSellingProducts: s?.bestSellingProducts ?? [],
      lowStockProducts: s?.lowStockProducts ?? [],
      paymentMethodStats: s?.paymentMethodStats ?? { ONLINE: 0, COD: 0 },
    };
  }, [filteredStats, stats]);

  // If loading session check
  if (loading && isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-mono">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-neutral-400">
            Validating GOYAL COLLECTIONS Admin Access Protocol...
          </p>
        </div>
      </div>
    );
  }

  // =============================================================
  // 1. SECURE ADMIN LOGIN SCREEN (When Unauthenticated)
  // =============================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 selection:bg-white selection:text-black">
        <div className="w-full max-w-md rounded-3xl bg-neutral-950 border border-neutral-800 p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white text-black font-serif font-black text-2xl flex items-center justify-center mx-auto shadow-circular-glow">
              GC
            </div>
            <div>
              <h1 className="font-serif text-2xl font-black tracking-wide">
                GOYAL COLLECTIONS
              </h1>
              <span className="inline-block mt-1 text-[10px] uppercase font-mono tracking-widest text-amber-400 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                ADMIN COMMAND CENTER
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-light">
              Enter your authorized executive credentials to access live e-commerce operations.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block uppercase text-[10px] text-neutral-400 mb-1">
                Admin Identifier / Email
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@goyalcollections.com"
                className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block uppercase text-[10px] text-neutral-400 mb-1">
                Master Security Key / Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize &amp; Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-900 text-center">
            <span className="text-[10px] text-neutral-400 font-mono block">
              Default Credentials: admin@goyalcollections.com // Admin@Goyal2026
            </span>
          </div>
        </div>
      </div>
    );
  }

  // =============================================================
  // 2. MAIN ADMIN DASHBOARD WITH LEFT SIDEBAR
  // =============================================================
  

  const navMenuItems = [
    { id: 'dashboard', label: '1. Dashboard', icon: LayoutDashboard },
    { id: 'products', label: `2. Products (${products.length})`, icon: Package },
    { id: 'categories', label: `3. Categories (${categories.length})`, icon: Layers },
    {
      id: 'orders',
      label: `4. Orders (${orders.length})`,
      icon: ShoppingBag,
      badge: newOrderIds.size > 0 ? `${newOrderIds.size} NEW` : null,
      badgeColor: 'bg-emerald-400 text-black animate-pulse',
    },
    { id: 'customers', label: `5. Customers (${customers.length})`, icon: Users },
    { id: 'reviews', label: `6. Reviews & Ratings (${reviews.length})`, icon: Star },
    { id: 'coupons', label: `7. Coupons & Discounts (${coupons.length})`, icon: Tag },
    { id: 'payments', label: `8. Payments & Trans (${payments.length})`, icon: CreditCard },
    { id: 'shipping', label: `9. Shipping & Courier (${shippingRecords.length})`, icon: Truck },
    { id: 'analytics', label: '10. Analytics & Reports', icon: TrendingUp },
    {
      id: 'notifications',
      label: `11. Notifications (${unreadNotificationsCount})`,
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? `${unreadNotificationsCount}` : null,
      badgeColor: 'bg-amber-400 text-black',
    },
    { id: 'banners', label: `12. Website Content`, icon: ImageIcon },
    { id: 'users', label: `13. Admin Users & Roles (${adminUsers.length})`, icon: ShieldCheck },
    { id: 'settings', label: '14. Settings', icon: Settings },
    { id: 'logs', label: `15. Activity Logs (${activityLogs.length})`, icon: History },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row selection:bg-white selection:text-black font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-neutral-900 text-white border border-neutral-700 px-5 py-3 rounded-2xl shadow-2xl text-xs font-mono flex items-center gap-2.5 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================== */}
      {/* LEFT SIDEBAR NAVIGATION (PERMANENT ON DESKTOP, DRAWER ON MOB)*/}
      {/* =========================================================== */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 lg:w-72 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between transition-transform duration-300 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6 overflow-y-auto scrollbar-none">
          {/* Logo & Super Admin Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-black font-serif font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                GC
              </div>
              <div>
                <span className="font-serif font-black text-base tracking-wider block">
                  GOYAL
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  COLLECTIONS
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Indicator */}
          <div className="px-3 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300">STORE ONLINE</span>
            </div>
            <span className="text-[10px] text-amber-400 uppercase font-bold">LIVE DB</span>
          </div>

          {/* 13 Navigation Menu Items */}
          <nav className="space-y-1 text-xs font-medium">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    const t = item.id as AdminTab;
                    setActiveTab(t);
                    if (typeof window !== 'undefined') {
                      const slug = t === 'banners' ? 'content' : t;
                      window.history.pushState(null, '', `/admin/${slug}`);
                    }
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {(item as any).badge && (
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ${(item as any).badgeColor || 'bg-white text-black'}`}>
                      {(item as any).badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Logout & Live Store Link */}
        <div className="p-4 border-t border-neutral-800 space-y-2 bg-neutral-950">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-900 transition-colors"
          >
            <span className="flex items-center gap-2 font-mono">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Storefront</span>
            </span>
            <span className="text-[10px] text-neutral-500">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-400 hover:text-red-300 rounded-xl hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* =========================================================== */}
      {/* MAIN CONTENT AREA                                           */}
      {/* =========================================================== */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen bg-black">
        
        {/* Top Header Bar for Mobile & Quick Actions */}
        <header className="sticky top-0 z-30 h-16 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-neutral-900 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide capitalize">
              {activeTab.replace('_', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono">
            {/* Realtime Live Pulse */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${realtimeConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="hidden sm:inline text-neutral-300">
                {realtimeConnected ? 'LIVE REAL-TIME' : 'CONNECTING...'}
              </span>
            </div>

            {/* Sound Chime Toggle */}
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              className={`p-2 rounded-xl border transition-colors ${
                soundEnabled
                  ? 'bg-neutral-900 border-neutral-700 text-emerald-400'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-500'
              }`}
              title={soundEnabled ? 'Chime Alert Enabled (Click to Mute)' : 'Chime Alert Muted (Click to Unmute)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => {
                setActiveTab('notifications');
                if (typeof window !== 'undefined') window.history.pushState(null, '', '/admin/notifications');
              }}
              className="relative p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              title="Notifications Center"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Refresh Data from Live Database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={openNewProductModal}
              className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Product</span>
            </button>
          </div>
        </header>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-8 space-y-8 flex-1">

          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD                                         */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && stats && (
            <div className="space-y-8 animate-fade-in">
              {/* Interactive Date Range Filter */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 font-mono text-xs">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white uppercase text-[11px]">Analytics Timeframe:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'All Time' },
                    { id: 'today', label: 'Today' },
                    { id: 'yesterday', label: 'Yesterday' },
                    { id: '7d', label: 'Last 7 Days' },
                    { id: '30d', label: 'Last 30 Days' },
                    { id: 'this_month', label: 'This Month' },
                    { id: 'last_month', label: 'Last Month' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setDateFilter(f.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono transition-colors ${
                        dateFilter === f.id
                          ? 'bg-white text-black font-bold shadow'
                          : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 8 Primary KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">TOTAL REVENUE</span>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white">
                    ₹{safeStats.totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">Net confirmed earnings</span>
                </div>

                <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">TOTAL ORDERS</span>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white">
                    {safeStats.totalOrders}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">Across all time</span>
                </div>

                <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">TOTAL CUSTOMERS</span>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white">
                    {safeStats.totalCustomers}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">Patron profiles</span>
                </div>

                <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">TOTAL PRODUCTS</span>
                  <div className="font-mono text-xl sm:text-2xl font-black text-white">
                    {safeStats.totalProducts}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">Active catalog items</span>
                </div>

                {/* 4 Status-Specific KPI Cards */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-amber-400 block">PENDING ORDERS</span>
                  <div className="font-mono text-lg font-bold text-white">{safeStats.pendingOrders}</div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-sky-400 block">PROCESSING / PACKED</span>
                  <div className="font-mono text-lg font-bold text-white">{safeStats.processingOrders}</div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 block">DELIVERED ORDERS</span>
                  <div className="font-mono text-lg font-bold text-white">{safeStats.deliveredOrders}</div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-red-400 block">CANCELLED / REFUNDED</span>
                  <div className="font-mono text-lg font-bold text-white">{safeStats.cancelledOrders}</div>
                </div>
              </div>

              {/* Order Status Distribution Overview */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 className="font-serif text-base sm:text-lg font-bold">11-STAGE ORDER PIPELINE</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-neutral-400 hover:text-white">
                    Manage Orders →
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 text-xs font-mono">
                  {[
                    'Order Placed',
                    'Confirmed',
                    'Processing',
                    'Packed',
                    'Shipped',
                    'Out for Delivery',
                    'Delivered',
                    'Cancelled',
                    'Return Requested',
                    'Returned',
                    'Refunded',
                  ].map((st) => (
                    <div key={st} className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800/60">
                      <span className="text-[10px] text-neutral-400 truncate block">{st}</span>
                      <span className="text-base font-bold text-white mt-0.5 block">
                        {safeStats.ordersByStatus?.[st] || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Column Grid: Best-Sellers & Low-Stock Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Best Selling Products */}
                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <h3 className="font-serif text-base font-bold">BEST-SELLING PIECES</h3>
                    <span className="text-[10px] font-mono text-neutral-400">By units sold</span>
                  </div>
                  <div className="space-y-3">
                    {safeStats.bestSellingProducts && safeStats.bestSellingProducts.length > 0 ? (
                      safeStats.bestSellingProducts.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772'}
                              alt=""
                              className="w-10 h-10 rounded-xl object-cover bg-neutral-950"
                            />
                            <div>
                              <span className="font-semibold text-white block max-w-[180px] sm:max-w-xs truncate">
                                {item.product?.name}
                              </span>
                              <span className="text-[11px] text-neutral-400 font-mono">
                                {item.product?.subcategoryTitle}
                              </span>
                            </div>
                          </div>
                          <div className="text-right font-mono">
                            <span className="font-bold text-white block">{item.unitsSold} units</span>
                            <span className="text-[10px] text-emerald-400">₹{item.revenue.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-neutral-500 py-4 text-center">No transactions recorded yet.</p>
                    )}
                  </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <h3 className="font-serif text-base font-bold">LOW STOCK WATCH</h3>
                    <button onClick={() => setActiveTab('inventory')} className="text-xs text-amber-400 hover:underline">
                      Stock Manager →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {safeStats.lowStockProducts && safeStats.lowStockProducts.length > 0 ? (
                      safeStats.lowStockProducts.map((p: Product) => (
                        <div key={p.id} className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772'}
                              alt=""
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1549298916-b41d501d3772';
                              }}
                              className="w-10 h-10 rounded-xl object-cover bg-neutral-950"
                            />
                            <div>
                              <span className="font-semibold text-white block max-w-[180px] sm:max-w-xs truncate">
                                {p.name}
                              </span>
                              <span className="text-[11px] text-neutral-400 font-mono">SKU: {p.sku || p.id}</span>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                            p.stock === 0 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950/60 text-amber-400 border border-amber-800/80'
                          }`}>
                            {p.stock === 0 ? 'OUT OF STOCK' : `${p.stock} left`}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-emerald-400 py-4 text-center">All inventory healthy above 15 units.</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Recent Orders Table */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 className="font-serif text-base sm:text-lg font-bold">RECENT ATELIER TRANSACTIONS</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs text-neutral-400 hover:text-white">
                    View All Orders →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 font-mono uppercase text-[11px]">
                        <th className="pb-3">Order Number</th>
                        <th className="pb-3">Patron</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Payment</th>
                        <th className="pb-3 text-right">Amount</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {orders.slice(0, 6).map((ord) => (
                        <tr key={ord.id} className="hover:bg-neutral-800/40 transition-colors">
                          <td className="py-3.5 font-mono font-bold text-white">{ord.orderNumber}</td>
                          <td className="py-3.5 text-neutral-300">
                            <div>{ord.customerName}</div>
                            <span className="text-[10px] text-neutral-500 font-mono">{ord.phone}</span>
                          </td>
                          <td className="py-3.5 text-neutral-400 font-mono text-[11px]">
                            {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                          </td>
                          <td className="py-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold ${
                              ord.orderStatus === 'Delivered'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : ord.orderStatus === 'Cancelled'
                                ? 'bg-red-950 text-red-400 border border-red-800'
                                : 'bg-white/10 text-white'
                            }`}>
                              {ord.orderStatus}
                            </span>
                          </td>
                          <td className="py-3.5 text-neutral-400 font-mono">{ord.paymentMethod}</td>
                          <td className="py-3.5 text-right font-mono font-bold text-white">
                            ₹{ord.totalAmount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => openOrderDetails(ord)}
                              className="px-3 py-1 rounded-full bg-neutral-800 hover:bg-white hover:text-black text-neutral-200 transition-colors text-[11px]"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: PRODUCTS MANAGEMENT                                */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">HAUTE COUTURE CATALOG ({filteredProducts.length})</h3>
                  <p className="text-xs text-neutral-400">Live products connected to the public customer storefront.</p>
                </div>
                <button
                  onClick={openNewProductModal}
                  className="px-4 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-neutral-200 transition-colors self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Search & Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by name, SKU, or subcategory..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white"
                >
                  <option value="all">All Main Categories</option>
                  <option value="footwear">Footwear</option>
                  <option value="ready-made-clothes">Ready-made Clothes</option>
                </select>

                <select
                  value={productStatusFilter}
                  onChange={(e) => setProductStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>

              {/* Products Table (Straight line table format like Orders) */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                      <th className="pb-3">Product Piece</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Price & MRP</th>
                      <th className="pb-3">Stock Units</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Highlights</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-mono">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-neutral-500 font-sans">
                          No products found matching the search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-800/40 transition-colors">
                          <td className="py-3.5">
                            <div className="flex items-center gap-3 font-sans">
                              <img
                                src={p.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000'}
                                alt={p.name}
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200';
                                }}
                                className="w-12 h-12 rounded-xl object-cover bg-neutral-950 shrink-0 border border-neutral-800"
                              />
                              <div className="min-w-0 max-w-xs">
                                <span className="font-semibold text-white block truncate">{p.name}</span>
                                <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-2 mt-0.5">
                                  <span>SKU: {p.sku || p.id}</span>
                                  {p.colors && p.colors[0] && (
                                    <span className="flex items-center gap-1">
                                      <span
                                        className="w-2 h-2 rounded-full border border-neutral-700"
                                        style={{ backgroundColor: p.colors[0].hex }}
                                      />
                                      {p.colors[0].name}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5">
                            <span className="px-2 py-0.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 text-[10px] font-bold">
                              {p.categoryTitle || p.category}
                            </span>
                            <span className="text-[10px] text-neutral-400 block mt-0.5">
                              {p.subcategoryTitle || p.subcategory}
                            </span>
                          </td>

                          <td className="py-3.5">
                            <div className="text-white font-bold text-sm">₹{p.price.toLocaleString('en-IN')}</div>
                            <div className="text-[10px] text-neutral-500 line-through">
                              MRP: ₹{p.mrp.toLocaleString('en-IN')}
                              <span className="ml-1 text-emerald-400 font-normal no-underline">
                                ({p.discountPercent}% OFF)
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  p.stock <= 5
                                    ? 'bg-red-400 animate-pulse'
                                    : p.stock <= 15
                                    ? 'bg-amber-400'
                                    : 'bg-emerald-400'
                                }`}
                              />
                              <span className="text-white font-bold">{p.stock} units</span>
                            </div>
                            <span className="text-[10px] text-neutral-500 block">
                              {p.stock <= 5 ? 'Critical Low' : p.stock <= 15 ? 'Low Stock' : 'In Stock'}
                            </span>
                          </td>

                          <td className="py-3.5">
                            <button
                              onClick={() => handleToggleProductStatus(p)}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold transition-all ${
                                p.status === 'inactive'
                                  ? 'bg-red-950/60 text-red-400 border border-red-900 hover:bg-red-900/60'
                                  : 'bg-emerald-950/60 text-emerald-400 border border-emerald-900 hover:bg-emerald-900/60'
                              }`}
                              title="Click to toggle status"
                            >
                              {p.status || 'active'}
                            </button>
                          </td>

                          <td className="py-3.5">
                            <div className="flex flex-wrap gap-1 max-w-[140px]">
                              {p.isTrending && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-950 text-amber-400 border border-amber-900">
                                  Trending
                                </span>
                              )}
                              {p.isBestSeller && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-950 text-purple-400 border border-purple-900">
                                  Best Seller
                                </span>
                              )}
                              {p.isNewArrival && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] bg-sky-950 text-sky-400 border border-sky-900">
                                  New
                                </span>
                              )}
                              {!p.isTrending && !p.isBestSeller && !p.isNewArrival && (
                                <span className="text-[10px] text-neutral-600">Standard</span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditProductModal(p)}
                                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-white hover:text-black text-neutral-300 transition-colors"
                                title="Edit Product"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-600 text-neutral-400 hover:text-white transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: CATEGORIES MANAGEMENT                              */}
          {/* ========================================================= */}
          {activeTab === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">CATEGORY ARCHITECTURE ({categories.length})</h3>
                  <p className="text-xs text-neutral-400">Preserving GOYAL COLLECTIONS luxury hierarchy: Footwear &amp; Ready-made Clothes.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setCatForm({
                      name: '',
                      slug: '',
                      description: '',
                      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000',
                    });
                    setIsCategoryModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="space-y-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                      <div className="flex items-center gap-4">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400';
                          }}
                          className="w-14 h-14 rounded-2xl object-cover bg-neutral-950"
                        />
                        <div>
                          <h4 className="font-serif text-lg font-bold text-white">{cat.name}</h4>
                          <span className="text-xs font-mono text-neutral-400">Slug: /{cat.slug}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setCatForm({
                              name: cat.name,
                              slug: cat.slug,
                              description: cat.description,
                              image: cat.image,
                            });
                            setIsCategoryModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-white hover:text-black text-xs font-mono transition-colors"
                        >
                          Edit Category
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.slug, cat.name)}
                          className="p-2 rounded-full bg-neutral-800 hover:bg-red-600 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subcategories */}
                    <div className="space-y-3">
                      <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-400 block">
                        Subcategories ({cat.subcategories.length})
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {cat.subcategories.map((sub) => (
                          <div key={sub.slug} className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800/80 text-xs">
                            <span className="font-semibold text-white block">{sub.name}</span>
                            <span className="text-[10px] font-mono text-neutral-500 block truncate">/{sub.slug}</span>
                          </div>
                        ))}
                      </div>

                      {/* Add Subcategory input */}
                      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                        <input
                          type="text"
                          value={newSubcatName}
                          onChange={(e) => {
                            setNewSubcatName(e.target.value);
                            setNewSubcatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                          }}
                          placeholder="New Subcategory Name..."
                          className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600"
                        />
                        <button
                          onClick={() => handleAddSubcategory(cat.slug)}
                          className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-white hover:text-black text-neutral-300 font-bold transition-colors"
                        >
                          + Add Subcategory
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: ORDERS & DISPATCH MANAGEMENT                       */}
          {/* ========================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">ALL CONCIERGE ORDERS ({filteredOrders.length})</h3>
                  <p className="text-xs text-neutral-400">Complete 11-stage fulfillment and courier tracking controller.</p>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by order #, patron name, phone, or email..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white"
                >
                  <option value="all">All 11 Order Statuses</option>
                  <option value="Order Placed">1. Order Placed</option>
                  <option value="Confirmed">2. Confirmed</option>
                  <option value="Processing">3. Processing</option>
                  <option value="Packed">4. Packed</option>
                  <option value="Shipped">5. Shipped</option>
                  <option value="Out for Delivery">6. Out for Delivery</option>
                  <option value="Delivered">7. Delivered</option>
                  <option value="Cancelled">8. Cancelled</option>
                  <option value="Return Requested">9. Return Requested</option>
                  <option value="Returned">10. Returned</option>
                  <option value="Refunded">11. Refunded</option>
                </select>
              </div>

              {/* Orders Table */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-mono uppercase text-[11px]">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Address</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-mono">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-3.5 font-bold text-white">
                          <div className="flex items-center gap-1.5">
                            <span>{ord.orderNumber}</span>
                            {newOrderIds.has(ord.id) && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-black uppercase animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 font-sans">
                          <div className="font-semibold text-white">{ord.customerName}</div>
                          <span className="text-[10px] text-neutral-400 font-mono">{ord.phone}</span>
                        </td>
                        <td className="py-3.5 text-neutral-400 text-[11px] max-w-xs truncate">
                          {ord.shippingAddress.district}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}
                        </td>
                        <td className="py-3.5 text-neutral-300 font-sans">
                          {ord.items.length} item(s)
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : ord.orderStatus === 'Cancelled' || ord.orderStatus === 'Refunded'
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : 'bg-white/10 text-white'
                          }`}>
                            {ord.orderStatus}
                          </span>
                        </td>
                        <td className="py-3.5 text-neutral-400">
                          {ord.paymentMethod} ({ord.paymentStatus})
                        </td>
                        <td className="py-3.5 font-bold text-white">
                          ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setInvoiceModalOrder(ord)}
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                              title="Print Official Tax Invoice"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openOrderDetails(ord)}
                              className="px-3 py-1.5 rounded-full bg-white text-black font-bold text-[11px] hover:bg-neutral-200 transition-colors"
                            >
                              Open Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: CUSTOMER MANAGEMENT                                */}
          {/* ========================================================= */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">REGISTERED PATRONS ({filteredCustomers.length})</h3>
                  <p className="text-xs text-neutral-400">Complete customer profiles, address book, and purchase records.</p>
                </div>
              </div>

              {/* Customer Search */}
              <div className="relative text-xs">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search by customer name, email, phone or customer ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Customers Table */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-mono uppercase text-[11px]">
                      <th className="pb-3">Customer ID</th>
                      <th className="pb-3">Full Name</th>
                      <th className="pb-3">Email Address</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">Registered</th>
                      <th className="pb-3">Orders</th>
                      <th className="pb-3">Total Spent</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-mono">
                    {filteredCustomers.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-3.5 text-neutral-400 text-[11px]">{c.id}</td>
                        <td className="py-3.5 font-sans font-semibold text-white">{c.fullName}</td>
                        <td className="py-3.5 text-neutral-300">{c.email}</td>
                        <td className="py-3.5 text-neutral-400">+91 {c.phone}</td>
                        <td className="py-3.5 text-neutral-400 text-[11px]">
                          {new Date(c.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3.5 text-white font-bold">{c.totalOrders || 0}</td>
                        <td className="py-3.5 text-emerald-400 font-bold">
                          ₹{(c.totalSpending || 0).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                            c.status === 'active' ? 'text-emerald-400 bg-emerald-950 border border-emerald-800' : 'text-red-400 bg-red-950 border border-red-800'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right font-sans">
                          <button
                            onClick={() => setSelectedCustomer(c)}
                            className="px-3 py-1 rounded-full bg-neutral-800 hover:bg-white hover:text-black text-xs transition-colors"
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: INVENTORY & STOCK LOGS                             */}
          {/* ========================================================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">INVENTORY CONTROL &amp; AUDIT LOG</h3>
                  <p className="text-xs text-neutral-400">Real-time stock units and historical modification records.</p>
                </div>
              </div>

              {/* Stock Table */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto space-y-4">
                <h4 className="font-serif text-base font-bold">CURRENT PRODUCT STOCK</h4>
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                      <th className="pb-3">SKU</th>
                      <th className="pb-3">Product Name</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Stock Units</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Quick Stock Adjustment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-800/40">
                        <td className="py-3 text-neutral-400">{p.sku || p.id}</td>
                        <td className="py-3 font-sans font-medium text-white max-w-xs truncate">{p.name}</td>
                        <td className="py-3 text-neutral-400">{p.subcategoryTitle}</td>
                        <td className="py-3">
                          <span className="font-bold text-base text-white">{p.stock}</span> units
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock === 0
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : p.stock < 15
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'text-emerald-400'
                          }`}>
                            {p.stock === 0 ? 'OUT OF STOCK' : p.stock < 15 ? 'LOW STOCK' : 'IN STOCK'}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleStockAdjust(p.id, Math.max(0, p.stock - 5), 'Manual deduction')}
                              className="px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-300 text-xs"
                            >
                              -5
                            </button>
                            <button
                              onClick={() => handleStockAdjust(p.id, p.stock + 10, 'Restock intake')}
                              className="px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-300 text-xs"
                            >
                              +10
                            </button>
                            <button
                              onClick={() => handleStockAdjust(p.id, p.stock + 50, 'Bulk atelier restock')}
                              className="px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-300 text-xs"
                            >
                              +50
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Stock Adjustment Audit Logs */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h4 className="font-serif text-base font-bold">STOCK ADJUSTMENT AUDIT LOG</h4>
                  <span className="text-xs text-neutral-400 font-mono">Auto-logged</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                        <th className="pb-3">Timestamp</th>
                        <th className="pb-3">Product Name</th>
                        <th className="pb-3">Previous</th>
                        <th className="pb-3">New</th>
                        <th className="pb-3">Change</th>
                        <th className="pb-3">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {inventoryLogs.slice(0, 15).map((log) => (
                        <tr key={log.id} className="hover:bg-neutral-800/40">
                          <td className="py-2.5 text-neutral-400">
                            {new Date(log.timestamp).toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5 font-sans font-medium text-white">{log.productName}</td>
                          <td className="py-2.5 text-neutral-400">{log.previousStock}</td>
                          <td className="py-2.5 text-white font-bold">{log.newStock}</td>
                          <td className="py-2.5">
                            <span className={log.change > 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {log.change > 0 ? `+${log.change}` : log.change}
                            </span>
                          </td>
                          <td className="py-2.5 text-neutral-300">{log.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: REVIEWS MODERATION                                 */}
          {/* ========================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">CUSTOMER REVIEWS MODERATION ({reviews.length})</h3>
                  <p className="text-xs text-neutral-400">Only verified &amp; approved reviews appear on public product detail pages.</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                      <th className="pb-3">Patron</th>
                      <th className="pb-3">Product Piece</th>
                      <th className="pb-3">Rating</th>
                      <th className="pb-3">Review Feedback</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-mono">
                    {reviews.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-neutral-500 font-sans">
                          No reviews submitted yet.
                        </td>
                      </tr>
                    ) : (
                      reviews.map((rev) => (
                        <tr key={rev.id} className="hover:bg-neutral-800/40 transition-colors">
                          <td className="py-3.5 font-sans">
                            <div className="font-semibold text-white">{rev.customerName}</div>
                            <span className="text-[10px] text-emerald-400 font-mono">Verified Buyer</span>
                          </td>
                          <td className="py-3.5 font-sans">
                            <span className="text-white font-medium max-w-xs block truncate">
                              {rev.productName || rev.productId}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">ID: {rev.productId}</span>
                          </td>
                          <td className="py-3.5 text-amber-400 text-sm whitespace-nowrap">
                            {'★'.repeat(rev.rating)}
                          </td>
                          <td className="py-3.5 font-sans text-neutral-300 max-w-md">
                            <div className="font-bold text-white text-xs">{rev.title}</div>
                            <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5">{rev.comment}</p>
                          </td>
                          <td className="py-3.5 text-neutral-400 text-[11px] whitespace-nowrap">
                            {rev.date}
                          </td>
                          <td className="py-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                                rev.status === 'approved'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-amber-950 text-amber-400 border border-amber-800'
                              }`}
                            >
                              {rev.status || 'approved'}
                            </span>
                          </td>
                          <td className="py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {rev.status !== 'approved' && (
                                <button
                                  onClick={() => handleReviewStatus(rev.productId, rev.id, 'approved')}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-[10px] font-bold"
                                >
                                  Approve
                                </button>
                              )}
                              {rev.status !== 'rejected' && (
                                <button
                                  onClick={() => handleReviewStatus(rev.productId, rev.id, 'rejected')}
                                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px]"
                                >
                                  Reject
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteReview(rev.productId, rev.id)}
                                className="p-1 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-[10px]"
                                title="Delete Review"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: COUPONS & PRIVILEGE DISCOUNTS                      */}
          {/* ========================================================= */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">PROMOTIONAL COUPONS &amp; PRIVILEGE DISCOUNTS</h3>
                  <p className="text-xs text-neutral-400">Codes directly validated during checkout.</p>
                </div>
                <button
                  onClick={() => setIsCouponModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Coupon</span>
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                      <th className="pb-3">Promo Code</th>
                      <th className="pb-3">Discount</th>
                      <th className="pb-3">Min Order</th>
                      <th className="pb-3">Offer Description</th>
                      <th className="pb-3">Expires On</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-mono">
                    {coupons.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-neutral-500 font-sans">
                          No active promotional coupons.
                        </td>
                      </tr>
                    ) : (
                      coupons.map((c) => (
                        <tr key={c.code} className="hover:bg-neutral-800/40 transition-colors">
                          <td className="py-3.5 font-bold text-white font-mono text-sm tracking-widest">
                            {c.code}
                          </td>
                          <td className="py-3.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                              {c.discountPercent}% OFF
                            </span>
                          </td>
                          <td className="py-3.5 text-white font-bold">
                            ₹{c.minOrder.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 text-neutral-300 font-sans max-w-xs truncate">
                            {c.description}
                          </td>
                          <td className="py-3.5 text-neutral-400 text-[11px]">
                            {c.expiresAt}
                          </td>
                          <td className="py-3.5">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-900 font-bold">
                              ACTIVE
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => handleDeleteCoupon(c.code)}
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-600 text-neutral-400 hover:text-white transition-colors"
                              title="Delete Coupon"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 9: HOMEPAGE BANNERS & CAROUSEL                        */}
          {/* ========================================================= */}
          {activeTab === 'banners' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">HOMEPAGE HERO BANNER MANAGEMENT</h3>
                  <p className="text-xs text-neutral-400">Controls the main promotional carousel slides on the public website.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingBanner(null);
                    setBannerForm({
                      title: '',
                      subtitle: '',
                      badge: 'COLLECTION 2026 // DROP',
                      ctaText: 'EXPLORE COLLECTION',
                      ctaLink: '/shop',
                      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600',
                      order: banners.length + 1,
                      active: true,
                    });
                    setIsBannerModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Banner</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((slide) => (
                  <div key={slide.id} className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden space-y-4 p-5">
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 relative">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono bg-black/80 text-white backdrop-blur-md">
                        {slide.badge}
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                          slide.active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400'
                        }`}>
                          {slide.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-serif text-base font-bold text-white">{slide.title}</h4>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{slide.subtitle}</p>
                      <div className="mt-3 text-xs font-mono flex items-center justify-between text-neutral-400">
                        <span>CTA: <strong className="text-white">{slide.ctaText}</strong></span>
                        <span>Link: <strong className="text-white">{slide.ctaLink}</strong></span>
                        <span>Order: <strong className="text-white">#{slide.order}</strong></span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingBanner(slide);
                          setBannerForm({
                            title: slide.title,
                            subtitle: slide.subtitle,
                            badge: slide.badge,
                            ctaText: slide.ctaText,
                            ctaLink: slide.ctaLink,
                            image: slide.image,
                            order: slide.order,
                            active: slide.active,
                          });
                          setIsBannerModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-white hover:text-black text-xs font-mono transition-colors"
                      >
                        Edit Banner
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(slide.id)}
                        className="p-2 rounded-full bg-neutral-800 hover:bg-red-600 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 10: REPORTS & ANALYTICS                               */}
          {/* ========================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">EXECUTIVE SALES &amp; REVENUE REPORTS</h3>
                  <p className="text-xs text-neutral-400">Distinguishing verified payments, COD orders and refunds.</p>
                </div>
                <a
                  href="/api/admin/export?type=sales&format=csv"
                  className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Sales Report</span>
                </a>
              </div>

              {/* Analytics Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">AVERAGE ORDER VALUE (AOV)</span>
                  <div className="font-mono text-2xl font-bold text-white">
                    ₹{safeStats.totalOrders > 0 ? Math.round(safeStats.totalRevenue / safeStats.totalOrders).toLocaleString('en-IN') : 0}
                  </div>
                  <span className="text-xs text-neutral-400">Calculated across verified orders</span>
                </div>

                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">ONLINE PREPAID ORDERS</span>
                  <div className="font-mono text-2xl font-bold text-white">
                    {safeStats.paymentMethodStats?.ONLINE || 0}
                  </div>
                  <span className="text-xs text-emerald-400">Instant digital checkout</span>
                </div>

                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">CASH ON DELIVERY (COD)</span>
                  <div className="font-mono text-2xl font-bold text-white">
                    {safeStats.paymentMethodStats?.COD || 0}
                  </div>
                  <span className="text-xs text-amber-400">Pay on doorstep</span>
                </div>
              </div>

              {/* Top Customers by Spending */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <h4 className="font-serif text-base font-bold">TOP PATRONS BY TOTAL SPEND</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                        <th className="pb-3">Patron Name</th>
                        <th className="pb-3">Email Address</th>
                        <th className="pb-3">Phone</th>
                        <th className="pb-3">Orders</th>
                        <th className="pb-3 text-right">Lifetime Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {customers.slice(0, 5).map((c) => (
                        <tr key={c.id} className="hover:bg-neutral-800/40">
                          <td className="py-3 font-sans font-semibold text-white">{c.fullName}</td>
                          <td className="py-3 text-neutral-300">{c.email}</td>
                          <td className="py-3 text-neutral-400">+91 {c.phone}</td>
                          <td className="py-3 text-white font-bold">{c.totalOrders || 0}</td>
                          <td className="py-3 text-right text-emerald-400 font-bold">
                            ₹{(c.totalSpending || 0).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 11: EXPORT & IMPORT MANAGEMENT                        */}
          {/* ========================================================= */}
          {activeTab === 'export_import' && (
            <div className="space-y-8 animate-fade-in">
              <div className="pb-4 border-b border-neutral-800">
                <h3 className="font-serif text-xl font-bold">DATA EXPORT &amp; IMPORT MANAGEMENT</h3>
                <p className="text-xs text-neutral-400">Download clean spreadsheets or bulk-import catalog products and stock.</p>
              </div>

              {/* Export Section */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5">
                <h4 className="font-serif text-base font-bold flex items-center gap-2">
                  <Download className="w-4 h-4 text-white" />
                  <span>ONE-CLICK DATA EXPORTS (CSV / XLSX)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'All Registered Customers', type: 'customers', desc: 'Full name, email, phone, address, PIN, district, state, and orders.' },
                    { title: 'All Products Catalog', type: 'products', desc: 'SKU, pricing, category, sizes, colors, stock, and descriptions.' },
                    { title: 'All Customer Orders', type: 'orders', desc: 'Order numbers, items, amounts, payment mode, delivery address, and tracking.' },
                    { title: 'Inventory Levels', type: 'inventory', desc: 'Current stock counts, status flags, and inventory valuations.' },
                    { title: 'Sales & Revenue Report', type: 'sales', desc: 'Chronological sales transactions with net verified revenue.' },
                  ].map((item) => (
                    <div key={item.type} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                      <div>
                        <span className="font-semibold text-white text-xs block">{item.title}</span>
                        <p className="text-[11px] text-neutral-400 mt-1">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-neutral-900 font-mono text-xs">
                        <a
                          href={`/api/admin/export?type=${item.type}&format=csv`}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-white hover:text-black text-neutral-200 transition-colors"
                        >
                          CSV
                        </a>
                        <a
                          href={`/api/admin/export?type=${item.type}&format=xlsx`}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-emerald-600 hover:text-white text-neutral-200 transition-colors"
                        >
                          Excel (.xlsx)
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Import Section */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5">
                <h4 className="font-serif text-base font-bold flex items-center gap-2">
                  <Upload className="w-4 h-4 text-white" />
                  <span>BULK SPREADSHEET IMPORT</span>
                </h4>
                <p className="text-xs text-neutral-400 max-w-2xl">
                  Upload a CSV or XLSX spreadsheet. The system will inspect your spreadsheet, detect duplicate SKUs, and allow you to preview records before committing to the database.
                </p>

                <form onSubmit={handlePreviewImport} className="space-y-4 max-w-xl text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-white cursor-pointer">
                      <input
                        type="radio"
                        name="impType"
                        checked={importType === 'products'}
                        onChange={() => {
                          setImportType('products');
                          setImportPreview(null);
                        }}
                      />
                      <span>Import Products Catalog</span>
                    </label>

                    <label className="flex items-center gap-2 text-white cursor-pointer">
                      <input
                        type="radio"
                        name="impType"
                        checked={importType === 'inventory'}
                        onChange={() => {
                          setImportType('inventory');
                          setImportPreview(null);
                        }}
                      />
                      <span>Import Inventory Stock</span>
                    </label>
                  </div>

                  <div>
                    <input
                      type="file"
                      accept=".csv, .xlsx, .xls"
                      required
                      onChange={(e) => {
                        setImportFile(e.target.files?.[0] || null);
                        setImportPreview(null);
                      }}
                      className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={importing || !importFile}
                    className="px-5 py-2.5 rounded-full bg-white text-black font-bold uppercase text-xs hover:bg-neutral-200 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                    <span>Preview &amp; Validate File</span>
                  </button>
                </form>

                {/* Import Preview Result */}
                {importPreview && (
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 animate-fade-in text-xs font-mono">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                      <div>
                        <span className="text-white font-bold">Total Rows in Spreadsheet: {importPreview.totalRows}</span>
                        <div className="flex items-center gap-3 mt-1 text-[11px]">
                          <span className="text-emerald-400">Valid: {importPreview.validCount}</span>
                          <span className="text-amber-400">Duplicates: {importPreview.duplicateCount}</span>
                          <span className="text-red-400">Errors: {importPreview.errorCount}</span>
                        </div>
                      </div>

                      <button
                        onClick={handleCommitImport}
                        disabled={importing || importPreview.validCount === 0}
                        className="px-6 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Confirm &amp; Commit to Database</span>
                      </button>
                    </div>

                    {importPreview.errors && importPreview.errors.length > 0 && (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-[11px] space-y-1">
                        <strong className="block">Detected Format Warnings:</strong>
                        {importPreview.errors.map((err: string, i: number) => (
                          <div key={i}>• {err}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 12: SETTINGS & LOGS                                   */}
          {/* ========================================================= */}
          {/* ========================================================= */}
          {/* TAB: PAYMENTS & FINANCIAL TRANSACTIONS                    */}
          {/* ========================================================= */}
          {activeTab === 'payments' && (
            <PaymentsView
              payments={payments}
              onRefresh={() =>
                fetch('/api/admin/payments')
                  .then((r) => r.json())
                  .then((d) => d.success && setPayments(d.payments))
              }
              showToast={showToast}
            />
          )}

          {/* ========================================================= */}
          {/* TAB: SHIPPING & COURIER DISPATCH                          */}
          {/* ========================================================= */}
          {activeTab === 'shipping' && (
            <ShippingView
              shippingRecords={shippingRecords}
              onRefresh={() =>
                fetch('/api/admin/shipping')
                  .then((r) => r.json())
                  .then((d) => d.success && setShippingRecords(d.shipping))
              }
              showToast={showToast}
            />
          )}

          {/* ========================================================= */}
          {/* TAB: NOTIFICATIONS CENTER                                 */}
          {/* ========================================================= */}
          {activeTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((prev) => !prev)}
              onPlayTestChime={playLuxuryChime}
              onRefresh={() =>
                fetch('/api/admin/notifications')
                  .then((r) => r.json())
                  .then((d) => {
                    if (d.success) {
                      setNotifications(d.notifications);
                      setUnreadNotificationsCount(d.unreadCount);
                    }
                  })
              }
              showToast={showToast}
            />
          )}

          {/* ========================================================= */}
          {/* TAB: ADMIN USERS & RBAC ROLES                             */}
          {/* ========================================================= */}
          {activeTab === 'users' && (
            <UsersView
              adminUsers={adminUsers}
              onRefresh={() =>
                fetch('/api/admin/users')
                  .then((r) => r.json())
                  .then((d) => d.success && setAdminUsers(d.users))
              }
              showToast={showToast}
            />
          )}

          {/* ========================================================= */}
          {/* TAB: ACTIVITY AUDIT LOGS                                  */}
          {/* ========================================================= */}
          {activeTab === 'logs' && (
            <ActivityLogsView
              logs={activityLogs}
              onRefresh={() =>
                fetch('/api/admin/logs')
                  .then((r) => r.json())
                  .then((d) => d.success && setActivityLogs(d.logs))
              }
            />
          )}

          {activeTab === 'settings' && settings && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-xl font-bold">STORE LOGISTICS &amp; AUDIT LOGS</h3>
                  <p className="text-xs text-neutral-400">Configure shipping fees, COD enablement, and inspect chronological admin audit history.</p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={actionLoading}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase text-[10px] text-neutral-400 mb-1">
                      Free Shipping Threshold (INR)
                    </label>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-[10px] text-neutral-400 mb-1">
                      Standard Shipping Charge (INR)
                    </label>
                    <input
                      type="number"
                      value={settings.standardShippingFee}
                      onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase text-[10px] text-neutral-400 mb-1">
                    Announcement Bar Ticker Text
                  </label>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.codEnabled}
                      onChange={(e) => setSettings({ ...settings, codEnabled: e.target.checked })}
                      className="rounded border-neutral-700 bg-neutral-950 text-white"
                    />
                    <span>Allow Cash on Delivery (COD) for Indian PIN Codes</span>
                  </label>
                </div>
              </div>

              {/* Real Admin Activity Audit Log */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h4 className="font-serif text-base font-bold flex items-center gap-2">
                    <History className="w-4 h-4 text-white" />
                    <span>ADMIN ACTIVITY AUDIT LOG ({activityLogs.length})</span>
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">Security Audit Trail</span>
                </div>

                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                        <th className="pb-2.5">Timestamp</th>
                        <th className="pb-2.5">Category</th>
                        <th className="pb-2.5">Action</th>
                        <th className="pb-2.5">Details</th>
                        <th className="pb-2.5">Admin Identity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 text-[11px]">
                      {activityLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-neutral-800/40">
                          <td className="py-2.5 text-neutral-400">
                            {new Date(log.timestamp).toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-950 border border-neutral-800 text-neutral-300">
                              {log.category}
                            </span>
                          </td>
                          <td className="py-2.5 font-bold text-white">{log.action}</td>
                          <td className="py-2.5 text-neutral-300 max-w-sm truncate">{log.details}</td>
                          <td className="py-2.5 text-neutral-400">{log.adminEmail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* =========================================================== */}
      {/* MODAL 1: ADD / EDIT PRODUCT                                 */}
      {/* =========================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-3xl w-full my-8 space-y-5 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-serif text-lg font-bold">
                {editingProduct ? `Edit Piece: ${editingProduct.name}` : 'Create New Haute Couture Piece'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">PRODUCT NAME *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    placeholder="e.g. Sovereign Leather Chelsea Boot"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">PRODUCT SKU *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.sku}
                    onChange={(e) => setProdForm({ ...prodForm, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">CATEGORY *</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) =>
                      setProdForm({
                        ...prodForm,
                        category: e.target.value,
                        subcategory: e.target.value === 'footwear' ? 'shoes' : 'mens-wear',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="footwear">Footwear</option>
                    <option value="ready-made-clothes">Ready-made Clothes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">SUBCATEGORY *</label>
                  <select
                    value={prodForm.subcategory}
                    onChange={(e) => setProdForm({ ...prodForm, subcategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  >
                    {prodForm.category === 'footwear' ? (
                      <>
                        <option value="mens-footwear">Men&apos;s Footwear</option>
                        <option value="womens-footwear">Women&apos;s Footwear</option>
                        <option value="kids-footwear">Kids&apos; Footwear</option>
                        <option value="shoes">Shoes</option>
                        <option value="sandals-slippers">Sandals &amp; Slippers</option>
                      </>
                    ) : (
                      <>
                        <option value="mens-wear">Men&apos;s Wear</option>
                        <option value="womens-wear">Women&apos;s Wear</option>
                        <option value="kids-wear">Kids&apos; Wear</option>
                        <option value="boys-wear">Boys&apos; Wear</option>
                        <option value="girls-wear">Girls&apos; Wear</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">STATUS *</label>
                  <select
                    value={prodForm.status}
                    onChange={(e) => setProdForm({ ...prodForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <option value="active">Active (Live in Store)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">SELLING PRICE (₹) *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.mrp}
                    onChange={(e) => setProdForm({ ...prodForm, mrp: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">STOCK UNITS *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              {/* Images Section with Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-neutral-400">PRODUCT IMAGES (MULTIPLE SUPPORTED)</label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-white underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload Images from Disk</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageFileUpload(e, 'product')}
                  />
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {prodForm.images.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setProdForm({
                            ...prodForm,
                            images: prodForm.images.filter((_, idx) => idx !== i),
                          })
                        }
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8px] bg-white text-black font-bold">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-neutral-400 mb-1">PRODUCT VIDEO URL (OPTIONAL - MP4 / YOUTUBE)</label>
                <input
                  type="url"
                  value={prodForm.videoUrl || ''}
                  onChange={(e) => setProdForm({ ...prodForm, videoUrl: e.target.value })}
                  placeholder="e.g. https://www.youtube.com/watch?v=... or direct MP4 URL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              {/* Sizes and Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">AVAILABLE SIZES (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={prodForm.sizes}
                    onChange={(e) => setProdForm({ ...prodForm, sizes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">PRIMARY COLOR</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={prodForm.colorName}
                      onChange={(e) => setProdForm({ ...prodForm, colorName: e.target.value })}
                      placeholder="Color Name"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                    />
                    <input
                      type="color"
                      value={prodForm.colorHex}
                      onChange={(e) => setProdForm({ ...prodForm, colorHex: e.target.value })}
                      className="w-11 h-10 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Specifications: Primary Material, Lining, Closure, Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">PRIMARY MATERIAL</label>
                  <input
                    type="text"
                    value={prodForm.primaryMaterial}
                    onChange={(e) => setProdForm({ ...prodForm, primaryMaterial: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">STRUCTURE &amp; LINING</label>
                  <input
                    type="text"
                    value={prodForm.lining}
                    onChange={(e) => setProdForm({ ...prodForm, lining: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-neutral-400 mb-1">ARCHITECTURAL DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-sans text-xs"
                />
              </div>

              {/* Design & Packaging & Care */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">DESIGN INFORMATION</label>
                  <textarea
                    rows={2}
                    value={prodForm.designInfo}
                    onChange={(e) => setProdForm({ ...prodForm, designInfo: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-sans text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">PACKAGING &amp; CARE</label>
                  <textarea
                    rows={2}
                    value={prodForm.careInfo}
                    onChange={(e) => setProdForm({ ...prodForm, careInfo: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-sans text-xs"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={prodForm.isTrending}
                    onChange={(e) => setProdForm({ ...prodForm, isTrending: e.target.checked })}
                  />
                  <span>Trending</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={prodForm.isNewArrival}
                    onChange={(e) => setProdForm({ ...prodForm, isNewArrival: e.target.checked })}
                  />
                  <span>New Arrival</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={prodForm.isBestSeller}
                    onChange={(e) => setProdForm({ ...prodForm, isBestSeller: e.target.checked })}
                  />
                  <span>Bestseller</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={prodForm.featured}
                    onChange={(e) => setProdForm({ ...prodForm, featured: e.target.checked })}
                  />
                  <span>Featured Collection</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-bold uppercase text-xs hover:bg-neutral-200 transition-colors"
                >
                  {actionLoading ? 'Saving...' : editingProduct ? 'Save Product Updates' : 'Add Product to Atelier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================== */}
      {/* MODAL 2: ORDER DETAILS & STATUS UPDATE CONTROLLER           */}
      {/* =========================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="font-mono text-base font-bold text-white block">
                  ORDER: {selectedOrder.orderNumber}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInvoiceModalOrder(selectedOrder)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-xs font-mono text-emerald-400 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
                <button onClick={() => setSelectedOrder(null)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase block font-bold">Patron Information</span>
                <div className="text-white font-sans font-semibold">{selectedOrder.customerName}</div>
                <div className="text-neutral-400">{selectedOrder.email}</div>
                <div className="text-neutral-400">+91 {selectedOrder.phone}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase block font-bold">Shipping Destination</span>
                <div className="text-neutral-300 font-sans">
                  {[
                    selectedOrder.shippingAddress.fullAddress,
                    selectedOrder.shippingAddress.houseNo,
                    selectedOrder.shippingAddress.street,
                    selectedOrder.shippingAddress.area,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </div>
                <div className="text-white font-semibold">
                  {selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                </div>
              </div>
            </div>

            {/* Ordered Items */}
            <div className="space-y-2 text-xs">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block font-bold">Ordered Items</span>
              <div className="divide-y divide-neutral-800 rounded-2xl bg-neutral-900 border border-neutral-800 p-4 space-y-2 font-mono">
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 font-sans">
                      <img src={it.image} alt="" className="w-10 h-10 rounded-xl object-cover bg-neutral-950" />
                      <div>
                        <span className="font-medium text-white block">{it.name}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          Size: {it.size} • Color: {it.color?.name || 'Standard'} • Qty: {it.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-white font-mono">
                      ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400">Total Invoice ({selectedOrder.paymentMethod}):</span>
              <span className="font-black text-lg text-white">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>

            {/* Status Update Controller */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 text-xs font-mono">
              <span className="text-[11px] uppercase font-bold text-amber-400 block">
                UPDATE 11-STAGE ORDER STATUS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">ORDER STATUS</label>
                  <select
                    value={orderStatusUpdate}
                    onChange={(e) => setOrderStatusUpdate(e.target.value as OrderStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-bold"
                  >
                    <option value="Order Placed">1. Order Placed</option>
                    <option value="Confirmed">2. Confirmed</option>
                    <option value="Processing">3. Processing</option>
                    <option value="Packed">4. Packed</option>
                    <option value="Shipped">5. Shipped</option>
                    <option value="Out for Delivery">6. Out for Delivery</option>
                    <option value="Delivered">7. Delivered</option>
                    <option value="Cancelled">8. Cancelled (Restores Stock)</option>
                    <option value="Return Requested">9. Return Requested</option>
                    <option value="Returned">10. Returned (Restores Stock)</option>
                    <option value="Refunded">11. Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">COURIER SERVICE</label>
                  <input
                    type="text"
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    placeholder="e.g. Blue Dart Express Air"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">AWB / TRACKING NUMBER</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. GC-AIR-89218"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">INTERNAL DISPATCH NOTES</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Notes recorded in order timeline..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white"
                />
              </div>

              <button
                type="button"
                onClick={handleUpdateOrder}
                disabled={actionLoading}
                className="w-full py-2.5 rounded-full bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-neutral-200 transition-colors"
              >
                {actionLoading ? 'Updating...' : 'Commit Status Update to Customer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================== */}
      {/* MODAL 3: CUSTOMER PROFILE DRAWER                            */}
      {/* =========================================================== */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-xl w-full my-8 space-y-5 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">{selectedCustomer.fullName}</h3>
                <span className="text-[11px] font-mono text-neutral-400">Patron ID: {selectedCustomer.id}</span>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
                <div>Email: <strong className="text-white">{selectedCustomer.email}</strong></div>
                <div>Phone: <strong className="text-white">+91 {selectedCustomer.phone}</strong></div>
                <div>Registered: <strong className="text-white">{new Date(selectedCustomer.createdAt).toLocaleDateString('en-IN')}</strong></div>
                <div>Total Spend: <strong className="text-emerald-400">₹{(selectedCustomer.totalSpending || 0).toLocaleString('en-IN')}</strong></div>
                <div>Total Orders: <strong className="text-white">{selectedCustomer.totalOrders || 0}</strong></div>
              </div>

              <div className="space-y-2">
                <span className="text-neutral-400 uppercase text-[10px] font-bold block">Saved Delivery Addresses</span>
                {selectedCustomer.addresses.map((addr, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
                    <span className="text-white font-sans font-semibold block">{addr.fullName}</span>
                    <p className="text-neutral-400">
                      {[addr.houseNo, addr.street, addr.area, addr.landmark].filter(Boolean).join(', ')}
                    </p>
                    <span className="text-neutral-300 font-bold block">
                      {addr.district}, {addr.state} - {addr.pincode}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleToggleCustomerStatus(selectedCustomer)}
                  className="px-4 py-2 rounded-full border border-neutral-700 hover:border-white text-neutral-300 text-xs"
                >
                  Account: {selectedCustomer.status === 'active' ? 'Suspend Account' : 'Reactivate Account'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================== */}
      {/* MODAL 4: ADD / EDIT CATEGORY                                */}
      {/* =========================================================== */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-serif text-base font-bold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 mb-1">CATEGORY NAME *</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => {
                    setCatForm({
                      ...catForm,
                      name: e.target.value,
                      slug: editingCategory ? catForm.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">SLUG *</label>
                <input
                  type="text"
                  required
                  value={catForm.slug}
                  onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">IMAGE URL</label>
                <input
                  type="text"
                  value={catForm.image}
                  onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-neutral-800 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-black font-bold uppercase"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================== */}
      {/* MODAL 5: ADD / EDIT COUPON                                  */}
      {/* =========================================================== */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-serif text-base font-bold">Create Privilege Coupon</h3>
              <button onClick={() => setIsCouponModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 mb-1">COUPON CODE *</label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. PRIVILEGE20"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-neutral-400 mb-1">DISCOUNT % *</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={couponForm.discountPercent}
                    onChange={(e) => setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">MIN ORDER (₹)</label>
                  <input
                    type="number"
                    value={couponForm.minOrder}
                    onChange={(e) => setCouponForm({ ...couponForm, minOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">DESCRIPTION</label>
                <input
                  type="text"
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  placeholder="e.g. 20% privilege off on luxury footwear"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-neutral-800 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-black font-bold uppercase"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================== */}
      {/* MODAL 6: ADD / EDIT BANNER                                  */}
      {/* =========================================================== */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-serif text-base font-bold">
                {editingBanner ? 'Edit Homepage Hero Banner' : 'Add New Hero Banner'}
              </h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 mb-1">BANNER TITLE *</label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  placeholder="e.g. THE MONOCHROME COUTURE ARCHIVE"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">SUBTITLE</label>
                <input
                  type="text"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-sans"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">IMAGE URL *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={bannerForm.image}
                    onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => bannerFileRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-neutral-800 text-white hover:bg-neutral-700"
                  >
                    Upload
                  </button>
                  <input
                    ref={bannerFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageFileUpload(e, 'banner')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-neutral-400 mb-1">CTA BUTTON TEXT</label>
                  <input
                    type="text"
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">CTA LINK</label>
                  <input
                    type="text"
                    value={bannerForm.ctaLink}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bannerForm.active}
                    onChange={(e) => setBannerForm({ ...bannerForm, active: e.target.checked })}
                  />
                  <span>Active on Homepage Slider</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-neutral-800 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-black font-bold uppercase"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
