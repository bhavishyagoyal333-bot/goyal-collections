'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Star,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RefreshCw,
  ChevronRight,
  ZoomIn,
  Check,
  MessageSquarePlus,
  X,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import PincodeChecker from '@/components/PincodeChecker';
import ProductCard from '@/components/ProductCard';
import ProductAccordionSpecs from '@/components/ProductAccordionSpecs';
import { Product, ProductColor, Review } from '@/lib/types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '@/lib/initialData';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useAuth();

  // Synchronously resolve initial data from memory to eliminate loading flicker & page blinking
  const initialProduct = INITIAL_PRODUCTS.find((p) => p.slug === params.slug) || null;
  const initialReviews = initialProduct ? (INITIAL_REVIEWS[initialProduct.id] || []) : [];
  const initialFeatured = INITIAL_PRODUCTS.filter(
    (p) => (p.featured || p.isBestSeller || p.isTrending) && p.id !== initialProduct?.id
  ).slice(0, 4);

  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(initialFeatured);
  const [loading, setLoading] = useState(!initialProduct);

  // Pagination for Customer Reviews (2-3 initial reviews)
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(3);

  // User Selections
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(initialProduct?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(initialProduct?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  // Review Form Modal
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Seamless background synchronization: No screen flashing or loading spinner blinking
  useEffect(() => {
    let isCancelled = false;
    const currentFromInitial = INITIAL_PRODUCTS.find((p) => p.slug === params.slug) || null;

    if (currentFromInitial) {
      setProduct(currentFromInitial);
      setSelectedColor(currentFromInitial.colors?.[0] || null);
      if (currentFromInitial.sizes?.length > 0) {
        setSelectedSize(currentFromInitial.sizes[0]);
      }
      setActiveImageIdx(0);
      setQuantity(1);
      setValidationError('');
      setVisibleReviewsCount(3);
      setLoading(false);
      addRecentlyViewed(currentFromInitial);

      if (INITIAL_REVIEWS[currentFromInitial.id]) {
        setReviews(INITIAL_REVIEWS[currentFromInitial.id]);
      }

      const featList = INITIAL_PRODUCTS.filter(
        (p) => (p.featured || p.isBestSeller || p.isTrending) && p.id !== currentFromInitial.id
      ).slice(0, 4);
      setFeaturedProducts(featList);
    } else {
      // Dynamic product added by admin not in static data
      setLoading(true);
    }

    async function syncData() {
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        const data = await res.json();
        if (isCancelled) return;

        if (data.success && data.product) {
          setProduct(data.product);
          addRecentlyViewed(data.product);

          if (!currentFromInitial) {
            setSelectedColor(data.product.colors?.[0] || null);
            if (data.product.sizes?.length > 0) {
              setSelectedSize(data.product.sizes[0]);
            }
          }

          // Fetch fresh authentic customer reviews from database
          const revRes = await fetch(`/api/reviews?productId=${data.product.id}`);
          const revData = await revRes.json();
          if (!isCancelled && revData.success && Array.isArray(revData.reviews)) {
            setReviews(revData.reviews);
          }

          // Fetch fresh featured products
          const featRes = await fetch(`/api/products?limit=8`);
          const featData = await featRes.json();
          if (!isCancelled && featData.success && Array.isArray(featData.products)) {
            const dynamicFeat = featData.products
              .filter((p: Product) => p.id !== data.product.id && (p.featured || p.isBestSeller || p.isTrending))
              .slice(0, 4);
            if (dynamicFeat.length > 0) {
              setFeaturedProducts(dynamicFeat);
            }
          }
        }
      } catch (err) {
        console.error('Failed to sync product data:', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    syncData();

    return () => {
      isCancelled = true;
    };
  }, [params.slug]);

  // Live Real-Time Synchronizer for Product and Review updates
  useEffect(() => {
    const handleProductRealtime = (e: any) => {
      const p = e.detail?.payload || e.detail;
      if (p && (p.id === product?.id || p.slug === params.slug)) {
        setProduct((prev) => (prev ? { ...prev, ...p } : p));
      }
    };

    const handleReviewRealtime = () => {
      if (product?.id) {
        fetch(`/api/reviews?productId=${product.id}`)
          .then((r) => r.json())
          .then((d) => {
            if (d.success && Array.isArray(d.reviews)) {
              setReviews(d.reviews);
            }
          });
      }
    };

    window.addEventListener('goyal:product-update', handleProductRealtime);
    window.addEventListener('goyal:review-update', handleReviewRealtime);

    return () => {
      window.removeEventListener('goyal:product-update', handleProductRealtime);
      window.removeEventListener('goyal:review-update', handleReviewRealtime);
    };
  }, [product?.id, params.slug]); // Only re-run when the slug route parameter changes

  if (loading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xs font-mono text-neutral-400 bg-black">
        Loading atelier creation...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-black text-white">
        <h2 className="font-serif text-2xl font-bold mb-2">Piece Not Found</h2>
        <p className="text-neutral-400 text-xs mb-6">This item may have been archived or retired from our active drop.</p>
        <Link href="/shop" className="bg-white hover:bg-neutral-200 text-black px-6 py-2.5 rounded-full text-xs font-bold">
          Explore Active Collections
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select a size to proceed.');
      return;
    }
    setValidationError('');
    addToCart(product, selectedSize, selectedColor || product.colors[0], quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError('Please select a size to proceed.');
      return;
    }
    setValidationError('');
    addToCart(product, selectedSize, selectedColor || product.colors[0], quantity);
    router.push('/checkout');
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) return;

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerName: reviewerName,
          rating: reviewRating,
          title: reviewTitle || 'Verified Purchase',
          comment: reviewComment,
        }),
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setReviewModalOpen(false);
        setReviewerName('');
        setReviewComment('');
        setReviewTitle('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      
      {/* Toast Notification when added to bag */}
      {addedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce-subtle">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Added to your bag!</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          <Link href={`/category/${product.category}`} className="hover:text-white transition-colors">
            {product.categoryTitle}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          <Link href={`/category/${product.category}/${product.subcategory}`} className="hover:text-white transition-colors">
            {product.subcategoryTitle}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-white font-semibold truncate max-w-[180px]">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 sm:space-y-14 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Product Image Gallery on the Left */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-3 sm:gap-4">
            
            {/* Thumbnails column */}
            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto pb-1 md:pb-0 shrink-0 scrollbar-none">
              {(product.images || []).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border transition-all shrink-0 bg-neutral-900 ${
                    activeImageIdx === idx ? 'border-white ring-1 ring-white shadow-md' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Large Image Stage: Eager decoding prevents layout shift and flashing */}
            <div className="relative flex-1 aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 group">
              <img
                src={product.images?.[activeImageIdx] || product.images?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop'}
                alt={product.name}
                loading="eager"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop';
                }}
                className="w-full h-full object-cover transition-transform duration-500 cursor-zoom-in group-hover:scale-105 filter contrast-105"
                onClick={() => setIsZoomOpen(true)}
              />

              {/* Badges */}
              <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.isBestSeller && (
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-black bg-white uppercase rounded-md shadow-sm">
                    Bestseller
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold text-white bg-neutral-800 uppercase rounded-md border border-neutral-700 shadow-sm">
                    New
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold text-neutral-300 bg-neutral-900/90 rounded-md border border-neutral-700">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Zoom Action Button */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-full bg-neutral-900/90 text-white hover:bg-neutral-800 flex items-center justify-center transition-all shadow-md border border-neutral-700"
                title="Click to Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Product Details & Buying Actions (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5 font-mono">
                <span className="uppercase tracking-widest">{product.subcategoryTitle}</span>
                <div className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-white text-white" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-neutral-400">({reviews.length} Reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>
              {product.hindiName && (
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">{product.hindiName}</p>
              )}
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-baseline justify-between shadow-sm">
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-3xl font-bold text-white font-mono">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <span className="text-sm text-neutral-500 line-through font-mono">
                    MRP ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {product.discountPercent > 0 && (
                <span className="text-xs font-mono font-bold text-white bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-700 shadow-sm">
                  Save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({product.discountPercent}%)
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-2 font-bold">
                Color Tone: <span className="text-white">{selectedColor?.name || 'Default'}</span>
              </span>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`relative p-0.5 rounded-full transition-all ${
                      selectedColor?.name === color.name
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-neutral-600"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold">
                  Select Size: <span className="text-white">{selectedSize || 'Choose size'}</span>
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">
                  Standard Sizing
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setSelectedSize(sz);
                      setValidationError('');
                    }}
                    className={`py-2 text-xs font-mono rounded-xl border transition-all ${
                      selectedSize === sz
                        ? 'bg-white text-black font-bold border-white shadow-sm'
                        : 'border-neutral-700 bg-neutral-900 text-white hover:border-neutral-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Stock */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-mono text-neutral-400 font-bold">Qty:</span>
                <div className="flex items-center border border-neutral-700 rounded-full bg-neutral-950 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 text-neutral-400 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-mono text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-2 text-neutral-400 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <span className="text-xs font-mono text-neutral-300 flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5 text-white" />
                <span>In Stock ({product.stock} available)</span>
              </span>
            </div>

            {/* Validation Alert */}
            {validationError && (
              <p className="text-xs text-red-300 font-medium bg-red-950/60 border border-red-800 p-2.5 rounded-xl">
                {validationError}
              </p>
            )}

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white hover:bg-neutral-200 text-black py-3.5 sm:py-4 rounded-full text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 sm:p-4 rounded-full border transition-all ${
                    isFavorited
                      ? 'bg-white text-black border-white scale-105 shadow-md'
                      : 'bg-neutral-900 text-white border-neutral-700 hover:border-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-black' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 sm:py-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant Buy Now</span>
              </button>
            </div>

            {/* PIN Code Delivery Checker */}
            <div className="pt-2">
              <PincodeChecker />
            </div>

            {/* Assurances */}
            <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-neutral-800 text-center">
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                <Truck className="w-4 h-4 mx-auto mb-1 text-white" />
                <span>Express Delivery</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                <RefreshCw className="w-4 h-4 mx-auto mb-1 text-white" />
                <span>7 Days Return</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-white" />
                <span>Genuine Quality</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3-Section Specifications Accordion: Product Details, Design, Packaging & Care */}
        <ProductAccordionSpecs product={product} />

        {/* ========================================================================= */}
        {/* 2. CUSTOMER REVIEWS SECTION (CLEAN, COMPACT & AUTHENTIC)                 */}
        {/* ========================================================================= */}
        <section aria-label="Customer Reviews" className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest mb-1.5 border border-neutral-700">
                <ShieldCheck className="w-3 h-3 text-white" />
                <span>Patron Feedback</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white">
                CUSTOMER REVIEWS
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5 text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating || 5)
                          ? 'fill-white text-white'
                          : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-white">
                  {product.rating} / 5
                </span>
                <span className="text-xs text-neutral-400">
                  ({reviews.length} genuine {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="bg-white hover:bg-neutral-200 text-black px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 self-start sm:self-auto transition-colors shadow-md active:scale-95 shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4 text-black" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Genuine Reviews List */}
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <div className="py-8 text-center rounded-2xl bg-neutral-950/60 border border-neutral-800/80 p-6 space-y-2">
                <p className="text-xs text-neutral-300 font-medium">
                  No customer reviews yet for this piece.
                </p>
                <p className="text-[11px] text-neutral-500 font-light">
                  Only authentic reviews from verified customers are displayed. Be the first to share your experience.
                </p>
              </div>
            ) : (
              reviews.slice(0, visibleReviewsCount).map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 transition-all hover:border-neutral-700"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white">{rev.customerName}</span>
                      {rev.verifiedPurchase && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Verified Buyer</span>
                        </span>
                      )}
                    </div>
                    <span className="text-neutral-500 font-mono text-[11px] shrink-0">
                      {rev.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating ? 'fill-white text-white' : 'text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>

                  {rev.title && (
                    <p className="text-xs font-bold text-white">{rev.title}</p>
                  )}
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Load More Reviews Option */}
          {reviews.length > visibleReviewsCount && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setVisibleReviewsCount((prev) => prev + 3)}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-neutral-700 hover:border-white text-xs font-mono font-bold text-white uppercase tracking-wider bg-neutral-950 hover:bg-white hover:text-black transition-all active:scale-95 shadow-sm"
              >
                Load More Reviews ({reviews.length - visibleReviewsCount} remaining)
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 3. FEATURED PRODUCTS SECTION (BELOW REVIEWS, SMOOTH VERTICAL SCROLL)     */}
        {/* ========================================================================= */}
        {featuredProducts.length > 0 && (
          <section aria-label="Featured Products" className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-neutral-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Curated Atelier Selections</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  FEATURED CREATIONS
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-white hover:text-neutral-300 flex items-center gap-1 group self-start sm:self-auto"
              >
                <span>Explore Full Collection</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile 2-column grid that scrolls smoothly vertically with the document */}
            {/* Tablet/Desktop 4-column grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {featuredProducts.map((feat) => (
                <ProductCard key={feat.id} product={feat} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* FULL-SCREEN IMAGE ZOOM LIGHTBOX */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-white">
            <span className="font-mono uppercase tracking-widest">{product.name} // HIGH-RES ZOOM</span>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
          </div>

          <div className="flex justify-center gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-12 h-14 rounded-lg overflow-hidden border transition-all ${
                  activeImageIdx === idx ? 'border-white scale-110' : 'border-neutral-700 opacity-60'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* REVIEW SUBMISSION MODAL */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-800 max-w-md w-full shadow-2xl animate-slide-up space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h4 className="font-serif text-lg font-bold text-white">Share Your Review</h4>
              <button onClick={() => setReviewModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div>
                <label className="block text-xs uppercase font-mono text-neutral-300 mb-1 font-bold">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Vikramaditya S."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-300 mb-1 font-bold">Rating *</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= reviewRating ? 'fill-white text-white' : 'text-neutral-700'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-300 mb-1 font-bold">Headline</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Masterpiece in quality"
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-300 mb-1 font-bold">Review *</label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the fit, material quality, and craftsmanship..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="bg-white hover:bg-neutral-200 text-black px-6 py-2 rounded-full text-xs font-bold transition-colors shadow-md"
                >
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
