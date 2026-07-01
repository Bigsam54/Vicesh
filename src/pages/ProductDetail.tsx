/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, Heart, ShoppingBag, Share2, ShieldCheck, Truck, RotateCcw, 
  ChevronRight, Plus, Minus, Leaf, AlertCircle, ArrowLeft, Send, Check 
} from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  productId, 
  setCurrentPage, 
  setSelectedProductId 
}) => {
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addProductReview,
    addRecentlyViewed,
    recentlyViewed
  } = useStore();

  const product = products.find(p => p.id === productId);

  // Fallback if product not found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-brand-sage mx-auto" />
        <h2 className="font-editorial text-2xl font-bold text-brand-forest">Product Not Found</h2>
        <p className="text-xs text-brand-sage">The botanical product you are looking for does not exist in our apothecary.</p>
        <button 
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 bg-brand-forest text-brand-cream text-xs uppercase tracking-widest font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // State definitions
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '100ml');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Review form states
  const [revName, setRevName] = useState('');
  const [revTitle, setRevTitle] = useState('');
  const [revComment, setRevComment] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Update states when product id changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0] || '100ml');
    setQuantity(1);
    setActiveTab('description');
    setReviewSubmitted(false);
    setShareCopied(false);
    
    // Track recently viewed
    addRecentlyViewed(product.id);
  }, [productId, product]);

  const favorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, quantity, selectedSize);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    // Simulate copying URL
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;

    addProductReview(product.id, {
      name: revName,
      title: revTitle,
      comment: revComment,
      rating: revRating
    });

    setReviewSubmitted(true);
    setRevName('');
    setRevTitle('');
    setRevComment('');
    setRevRating(5);
  };

  // Pull related products
  const relatedProducts = products.filter(p => 
    product.relatedIds?.includes(p.id) || 
    (p.category === product.category && p.id !== product.id)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-brand-sage uppercase tracking-wider font-medium">
        <button onClick={() => setCurrentPage('home')} className="hover:text-brand-forest">Home</button>
        <ChevronRight className="w-3 h-3 text-brand-beige" />
        <button onClick={() => setCurrentPage('shop')} className="hover:text-brand-forest">Shop</button>
        <ChevronRight className="w-3 h-3 text-brand-beige" />
        <button onClick={() => setCurrentPage(product.category)} className="hover:text-brand-forest">{product.category}</button>
        <ChevronRight className="w-3 h-3 text-brand-beige" />
        <span className="text-brand-forest truncate font-semibold">{product.name}</span>
      </nav>

      {/* Main product showcase grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Image Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Large display photo with simple zoom overlay hover */}
          <div className="relative aspect-square rounded-md overflow-hidden bg-brand-offwhite border border-brand-beige/20 shadow-sm group">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Quick tag */}
            <div className="absolute top-4 left-4">
              <span className="bg-brand-forest/90 text-brand-cream text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-xs flex items-center gap-1">
                🌱 Botanical Blend
              </span>
            </div>
          </div>

          {/* Miniature gallery thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 bg-brand-offwhite rounded-xs overflow-hidden border transition-all ${
                    activeImage === img 
                      ? 'border-brand-forest ring-1 ring-brand-forest/30 shadow-xs' 
                      : 'border-brand-beige/50 hover:border-brand-sage'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Buy Area / Product Customizer Details */}
        <div className="lg:col-span-6 text-left space-y-6">
          
          {/* Title & Brand stamps */}
          <div className="space-y-2 border-b border-brand-beige/35 pb-5">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-sage font-bold block">
              Vicesh Cosmetics — {product.category} collection
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-forest tracking-tight">
              {product.name}
            </h1>
            
            {/* Ratings and Reviews count */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-brand-beige/40'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-brand-sage font-medium">
                {product.rating} / 5 ({product.reviewsCount} verified reviews)
              </span>
            </div>
          </div>

          {/* Pricing area */}
          <div className="text-2xl font-bold text-brand-forest flex items-center gap-3">
            <span>${product.price.toFixed(2)}</span>
            {product.stock <= 5 && (
              <span className="text-[10px] text-red-600 border border-red-200 bg-red-50 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-sans">
                ⚠️ Low Stock ({product.stock} left)
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-brand-sage font-light leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Suitability tags */}
          <div className="space-y-2">
            <span className="text-xs text-brand-forest font-semibold uppercase tracking-wider">Suitable For:</span>
            <div className="flex flex-wrap gap-2">
              {product.suitableFor.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-brand-sage/15 border border-brand-sage/25 text-brand-forest text-xs px-3 py-1 rounded-full font-medium"
                >
                  🍃 {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Customizer: Sizes / Variants */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase tracking-widest text-brand-forest font-semibold">
              Selected Size: <span className="text-brand-sage font-normal">{selectedSize}</span>
            </h4>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-xs border uppercase tracking-wider transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-brand-forest text-brand-cream border-brand-forest shadow-xs'
                      : 'bg-brand-cream text-brand-forest border-brand-beige/50 hover:border-brand-sage'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & ATC */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center border-t border-brand-beige/25">
            
            {/* Quantity Input */}
            <div className="space-y-2 shrink-0">
              <span className="text-[10px] uppercase tracking-widest text-brand-sage font-bold block">Qty</span>
              <div className="flex items-center border border-brand-beige/65 rounded-xs bg-brand-offwhite w-28">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-brand-forest hover:text-brand-sage font-semibold"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-semibold text-brand-forest">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-brand-forest hover:text-brand-sage font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex-1 flex gap-3 pt-5 sm:pt-0">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || addedSuccess}
                className={`flex-1 py-4 text-xs tracking-widest uppercase font-bold rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedSuccess 
                    ? 'bg-brand-sage text-brand-cream' 
                    : 'bg-brand-forest text-brand-cream hover:bg-brand-sage shadow-xs'
                }`}
              >
                {isAdding ? (
                  <>
                    <span className="w-4 h-4 border-2 border-brand-cream border-t-transparent rounded-full animate-spin"></span>
                    Blending...
                  </>
                ) : addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Basket
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="px-6 py-4 bg-brand-gold text-brand-forest hover:bg-brand-offwhite hover:border-brand-gold border border-brand-gold text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer shadow-xs"
              >
                Buy Now
              </button>

              {/* Utility buttons */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 border rounded-xs flex items-center justify-center transition-all ${
                  favorited 
                    ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' 
                    : 'bg-brand-cream border-brand-beige/65 text-brand-forest hover:border-brand-sage'
                }`}
                title={favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="w-14 h-14 border border-brand-beige/65 rounded-xs flex items-center justify-center bg-brand-cream text-brand-forest hover:border-brand-sage relative"
                title="Copy Share Link"
              >
                <Share2 className="w-5 h-5" />
                {shareCopied && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-forest text-brand-cream text-[10px] px-2 py-1 rounded-xs whitespace-nowrap shadow-md">
                    Link Copied!
                  </span>
                )}
              </button>
            </div>

          </div>

          {/* Premium trust assurances */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-brand-beige/25 text-[11px] text-brand-sage font-light">
            <div className="flex gap-2 items-start">
              <Truck className="w-4.5 h-4.5 text-brand-sage shrink-0" />
              <div>
                <p className="font-semibold text-brand-forest uppercase tracking-wider text-[9px]">Local & Global</p>
                <p className="mt-0.5">Prompt delivery across Ghana or worldwide via DHL.</p>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-sage shrink-0" />
              <div>
                <p className="font-semibold text-brand-forest uppercase tracking-wider text-[9px]">Purity Approved</p>
                <p className="mt-0.5">Eco-certified organic ingredients.</p>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              <RotateCcw className="w-4.5 h-4.5 text-brand-sage shrink-0" />
              <div>
                <p className="font-semibold text-brand-forest uppercase tracking-wider text-[9px]">Peace Of Mind</p>
                <p className="mt-0.5">Complimentary 14-day hassle-free returns.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE TABS SYSTEM
          ========================================================================= */}
      <div className="border border-brand-beige/25 rounded-md overflow-hidden bg-brand-offwhite">
        
        {/* Tabs triggers */}
        <div className="flex flex-wrap border-b border-brand-beige/35 bg-brand-cream text-xs uppercase tracking-widest font-bold">
          {[
            { id: 'description', label: 'Description' },
            { id: 'ingredients', label: 'Pure Ingredients' },
            { id: 'benefits', label: 'Nourishing Benefits' },
            { id: 'usage', label: 'Usage Guidelines' },
            { id: 'reviews', label: `Reviews (${product.reviewsCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 border-r border-brand-beige/25 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-offwhite text-brand-forest border-b-2 border-b-brand-forest font-extrabold'
                  : 'text-brand-sage hover:text-brand-forest hover:bg-brand-offwhite/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content area */}
        <div className="p-6 sm:p-10 text-left bg-brand-offwhite">
          
          {/* DESCRIPTION TAB */}
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-4xl">
              <h3 className="font-editorial text-xl font-bold text-brand-forest">Eco-Friendly Formulation Details</h3>
              <p className="text-sm text-brand-sage font-light leading-relaxed">{product.description}</p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="bg-brand-cream border border-brand-beige/25 p-4 rounded-xs">
                  <h4 className="font-editorial text-sm font-semibold text-brand-forest">Purity Commitment</h4>
                  <p className="text-xs text-brand-sage font-light mt-1">We harvest and prepare botanical concentrates with zero chemical detergents or preservatives.</p>
                </div>
                <div className="bg-brand-cream border border-brand-beige/25 p-4 rounded-xs">
                  <h4 className="font-editorial text-sm font-semibold text-brand-forest">Ethically Sourced</h4>
                  <p className="text-xs text-brand-sage font-light mt-1">Direct community buybacks ensure our shea butter and natural seed oils yield living wages in Ghana.</p>
                </div>
              </div>
            </div>
          )}

          {/* INGREDIENTS TAB */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-editorial text-xl font-bold text-brand-forest">Full Ingredients Index</h3>
                <p className="text-xs text-brand-sage mt-1">We disclose everything. Zero hidden chemical compounds or cheap fillers.</p>
              </div>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-light text-brand-sage">
                {product.ingredients.map((ing) => (
                  <li key={ing} className="flex gap-2 items-center bg-brand-cream p-3 rounded-xs border border-brand-beige/20">
                    <Leaf className="w-4 h-4 text-brand-sage shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* BENEFITS TAB */}
          {activeTab === 'benefits' && (
            <div className="space-y-6 max-w-4xl">
              <h3 className="font-editorial text-xl font-bold text-brand-forest">Botanical Benefits</h3>
              <ul className="space-y-4">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3 items-start bg-brand-cream p-4 rounded-xs border border-brand-beige/25">
                    <div className="w-6 h-6 rounded-full bg-brand-sage/10 border border-brand-sage/25 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-brand-forest">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-brand-sage font-light leading-relaxed">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* USAGE TAB */}
          {activeTab === 'usage' && (
            <div className="space-y-6 max-w-4xl">
              <h3 className="font-editorial text-xl font-bold text-brand-forest">Step-by-Step Directions</h3>
              <ul className="space-y-4">
                {product.usage.map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start bg-brand-cream p-4 rounded-xs border border-brand-beige/25">
                    <div className="w-6 h-6 rounded-full bg-brand-gold text-brand-forest flex items-center justify-center font-bold text-xs shrink-0 font-sans">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-brand-sage font-light leading-relaxed">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Reviews List */}
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="font-editorial text-xl font-bold text-brand-forest">Client Appreciations</h3>
                  
                  {product.reviews.length === 0 ? (
                    <p className="text-xs text-brand-sage font-light italic">No reviews yet. Be the first to share your experience!</p>
                  ) : (
                    <div className="space-y-6">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="bg-brand-cream border border-brand-beige/25 p-5 rounded-xs space-y-3 shadow-xs text-left">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-sans text-xs font-bold text-brand-forest uppercase tracking-wider">{review.name}</h4>
                              <p className="text-[9px] text-brand-sage font-medium">{review.date}</p>
                            </div>
                            <div className="flex text-brand-gold">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                          </div>
                          <div className="space-y-1">
                            {review.title && (
                              <h5 className="font-editorial text-sm font-semibold text-brand-forest">{review.title}</h5>
                            )}
                            <p className="text-xs text-brand-sage font-light leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Write a review form */}
                <div className="lg:col-span-5 bg-brand-cream border border-brand-beige/35 p-6 rounded-md space-y-5 shadow-xs">
                  <h3 className="font-editorial text-lg font-bold text-brand-forest border-b border-brand-beige/20 pb-2">Share Your Experience</h3>
                  
                  {reviewSubmitted ? (
                    <div className="bg-brand-sage/10 border border-brand-sage/35 rounded-xs p-4 text-center space-y-2">
                      <ShieldCheck className="w-8 h-8 text-brand-sage mx-auto" />
                      <p className="text-sm font-bold text-brand-forest">Review Received!</p>
                      <p className="text-xs text-brand-sage font-light">Thank you for sharing your botanical experience with our community.</p>
                      <button 
                        onClick={() => setReviewSubmitted(false)}
                        className="text-xs font-bold uppercase tracking-widest text-brand-forest hover:text-brand-sage pt-2 underline"
                      >
                        Write Another Review
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      {/* Rating selection */}
                      <div className="space-y-1">
                        <span className="text-xs text-brand-forest font-semibold">Your Rating</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setRevRating(star)}
                              className="text-brand-gold hover:scale-110 transition-transform"
                            >
                              <Star className={`w-6 h-6 ${star <= revRating ? 'fill-current' : 'text-brand-beige/45'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-xs text-brand-forest font-semibold block">Full Name</label>
                        <input
                          type="text"
                          value={revName}
                          onChange={(e) => setRevName(e.target.value)}
                          placeholder="e.g. Abena Mensah"
                          className="w-full text-xs bg-brand-offwhite border border-brand-beige/65 px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-sage"
                          required
                        />
                      </div>

                      {/* Review Title */}
                      <div className="space-y-1">
                        <label className="text-xs text-brand-forest font-semibold block">Review Headline</label>
                        <input
                          type="text"
                          value={revTitle}
                          onChange={(e) => setRevTitle(e.target.value)}
                          placeholder="e.g. Incredibly moisturizing!"
                          className="w-full text-xs bg-brand-offwhite border border-brand-beige/65 px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-sage"
                        />
                      </div>

                      {/* Comment */}
                      <div className="space-y-1">
                        <label className="text-xs text-brand-forest font-semibold block">Your Review</label>
                        <textarea
                          rows={4}
                          value={revComment}
                          onChange={(e) => setRevComment(e.target.value)}
                          placeholder="Explain what you liked or disliked about this botanical formulation..."
                          className="w-full text-xs bg-brand-offwhite border border-brand-beige/65 px-3 py-2.5 rounded-xs focus:outline-none focus:border-brand-sage resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Submit Botanical Review
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

      {/* =========================================================================
          RELATED PRODUCTS RECOMMENDATIONS
          ========================================================================= */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8 border-t border-brand-beige/25 pt-16">
          <div className="text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-sage font-bold">Perfect Companions</span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-forest mt-1">Recommended Regime</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard 
                key={p.id}
                product={p}
                setCurrentPage={setCurrentPage}
                setSelectedProductId={setSelectedProductId}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
