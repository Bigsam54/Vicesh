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
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-brand-white rounded-full flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8 text-brand-muted stroke-[1.5]" />
        </div>
        <h2 className="font-editorial text-3xl font-medium text-brand-charcoal">Product Not Found</h2>
        <p className="text-sm text-brand-gray font-sans">The botanical product you are looking for does not exist in our apothecary.</p>
        <button 
          onClick={() => setCurrentPage('shop')}
          className="btn-primary mt-4"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-20 bg-brand-ivory">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-sans text-brand-muted tracking-wide">
        <button onClick={() => setCurrentPage('home')} className="hover:text-brand-purple transition-colors">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => setCurrentPage('shop')} className="hover:text-brand-purple transition-colors">Shop</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => setCurrentPage(product.category)} className="hover:text-brand-purple transition-colors capitalize">{product.category}</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-charcoal truncate font-medium">{product.name}</span>
      </nav>

      {/* Main product showcase grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left: Image Gallery Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Large display photo with soft shadow */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm border border-brand-beige/40">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-95"
            />
          </div>

          {/* Miniature gallery thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-md overflow-hidden border transition-all ${
                    activeImage === img 
                      ? 'border-brand-purple ring-1 ring-brand-purple/20 shadow-sm' 
                      : 'border-brand-beige/50 hover:border-brand-purple/40 hover:shadow-sm'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Buy Area / Product Customizer Details */}
        <div className="lg:col-span-6 text-left flex flex-col justify-center h-full space-y-8">
          
          {/* Title & Brand stamps */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gray font-medium font-sans">
              Vicesh Cosmetics — {product.category}
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-brand-charcoal leading-tight">
              {product.name}
            </h1>
            
            {/* Ratings and Reviews count */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-brand-beige'
                    }`} 
                  />
                ))}
              </div>
              <button 
                onClick={() => {
                  setActiveTab('reviews');
                  window.scrollTo({ top: document.getElementById('tabs-section')?.offsetTop || 0, behavior: 'smooth' });
                }}
                className="text-sm text-brand-gray font-sans hover:text-brand-purple transition-colors hover:underline underline-offset-4"
              >
                {product.rating} / 5 ({product.reviewsCount} reviews)
              </button>
            </div>
          </div>

          {/* Pricing area */}
          <div className="text-3xl font-editorial font-medium text-brand-charcoal flex items-center gap-4">
            <span>${product.price.toFixed(2)}</span>
            {product.stock <= 5 && (
              <span className="text-[10px] text-red-600 border border-red-200 bg-red-50 font-semibold uppercase tracking-widest px-3 py-1 rounded-full font-sans">
                Only {product.stock} Left
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-base text-brand-gray font-sans font-light leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Customizer: Sizes / Variants */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-sans font-medium text-brand-charcoal">
                Size
              </h4>
              <span className="text-xs text-brand-muted font-sans font-light">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2.5 text-sm font-sans font-medium rounded-full border transition-all duration-300 ${
                    selectedSize === size
                      ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-md'
                      : 'bg-white text-brand-gray border-brand-beige hover:border-brand-purple hover:text-brand-purple'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & CTAs */}
          <div className="pt-6 border-t border-brand-beige/40 flex flex-col sm:flex-row gap-4">
            
            {/* Quantity Input */}
            <div className="flex items-center border border-brand-beige rounded-full bg-white h-[52px] px-2 overflow-hidden shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-brand-gray hover:text-brand-purple transition-colors rounded-full hover:bg-brand-light-gray"
              >
                <Minus className="w-4 h-4 stroke-[1.5]" />
              </button>
              <span className="w-10 text-center text-sm font-medium text-brand-charcoal">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-brand-gray hover:text-brand-purple transition-colors rounded-full hover:bg-brand-light-gray"
              >
                <Plus className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>

            {/* CTA Buttons */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || addedSuccess}
              className={`flex-1 h-[52px] rounded-full text-sm font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                addedSuccess 
                  ? 'bg-brand-gold text-brand-purple shadow-sm' 
                  : 'bg-brand-purple text-white hover:bg-brand-purple-dark hover:shadow-luxury-hover shadow-sm'
              }`}
            >
              {isAdding ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Adding...
                </>
              ) : addedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[2]" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  Add to Basket
                </>
              )}
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-2 text-sm font-sans font-medium transition-colors ${
                favorited ? 'text-brand-purple' : 'text-brand-gray hover:text-brand-purple'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : 'stroke-[1.5]'}`} />
              {favorited ? 'Saved' : 'Save to Wishlist'}
            </button>
            <div className="w-[1px] h-5 bg-brand-beige/60"></div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm font-sans font-medium text-brand-gray hover:text-brand-purple transition-colors relative"
            >
              <Share2 className="w-4 h-4 stroke-[1.5]" />
              Share
              {shareCopied && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-charcoal text-white text-[10px] px-3 py-1.5 rounded-full whitespace-nowrap shadow-md">
                  Link Copied!
                </span>
              )}
            </button>
          </div>

          {/* Premium trust assurances */}
          <div className="grid grid-cols-1 gap-4 pt-8 border-t border-brand-beige/40">
            <div className="flex gap-4 items-center bg-white p-4 rounded-md border border-brand-beige/30 shadow-sm">
              <Truck className="w-6 h-6 text-brand-gold stroke-[1.5] shrink-0" />
              <div>
                <p className="font-sans font-medium text-sm text-brand-charcoal">Complimentary Delivery</p>
                <p className="text-xs text-brand-gray font-light mt-0.5">On all orders over $50 within Ghana.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE TABS SYSTEM
          ========================================================================= */}
      <div id="tabs-section" className="pt-10">
        
        {/* Tabs triggers */}
        <div className="flex flex-wrap gap-8 border-b border-brand-beige/60">
          {[
            { id: 'description', label: 'Details' },
            { id: 'ingredients', label: 'Ingredients' },
            { id: 'usage', label: 'How to Use' },
            { id: 'reviews', label: `Reviews (${product.reviewsCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-sans font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-brand-purple'
                  : 'text-brand-gray hover:text-brand-charcoal'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple rounded-t-sm"></span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content area */}
        <div className="py-12 text-left animate-fade-in-up">
          
          {/* DESCRIPTION TAB */}
          {activeTab === 'description' && (
            <div className="space-y-10 max-w-3xl mx-auto text-center">
              <h3 className="font-editorial text-2xl font-medium text-brand-charcoal">The Formulation</h3>
              <p className="text-base text-brand-gray font-sans font-light leading-relaxed">{product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-left">
                <div className="bg-white border border-brand-beige/40 p-6 rounded-md shadow-sm hover:shadow-luxury transition-shadow">
                  <h4 className="font-editorial text-lg font-medium text-brand-charcoal">Pure & Potent</h4>
                  <p className="text-sm text-brand-gray font-light mt-2 leading-relaxed">Crafted with wild-harvested botanical extracts, free from synthetic preservatives, parabens, and artificial fragrances.</p>
                </div>
                <div className="bg-white border border-brand-beige/40 p-6 rounded-md shadow-sm hover:shadow-luxury transition-shadow">
                  <h4 className="font-editorial text-lg font-medium text-brand-charcoal">Ethically Sourced</h4>
                  <p className="text-sm text-brand-gray font-light mt-2 leading-relaxed">We partner directly with women-led cooperatives in Northern Ghana to ensure fair wages and sustainable harvesting.</p>
                </div>
              </div>
            </div>
          )}

          {/* INGREDIENTS TAB */}
          {activeTab === 'ingredients' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="font-editorial text-2xl font-medium text-brand-charcoal">Botanical Index</h3>
                <p className="text-sm text-brand-gray font-light mt-2">Complete transparency. Nothing hidden.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.ingredients.map((ing) => (
                  <div key={ing} className="flex gap-3 items-center bg-white p-4 rounded-md border border-brand-beige/40 shadow-sm">
                    <Leaf className="w-5 h-5 text-brand-gold stroke-[1.5] shrink-0" />
                    <span className="font-sans text-sm text-brand-charcoal">{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* USAGE TAB */}
          {activeTab === 'usage' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="font-editorial text-2xl font-medium text-brand-charcoal">The Ritual</h3>
              </div>
              <div className="space-y-6">
                {product.usage.map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start bg-white p-6 rounded-md border border-brand-beige/40 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-brand-ivory text-brand-purple flex items-center justify-center font-editorial text-lg shrink-0 border border-brand-beige">
                      {idx + 1}
                    </div>
                    <p className="text-base text-brand-gray font-light leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Reviews List */}
                <div className="lg:col-span-7 space-y-8">
                  <h3 className="font-editorial text-2xl font-medium text-brand-charcoal">Client Experiences</h3>
                  
                  {product.reviews.length === 0 ? (
                    <div className="bg-white border border-brand-beige/40 p-8 rounded-md text-center shadow-sm">
                      <p className="text-sm text-brand-gray font-light">Be the first to share your experience with this botanical blend.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="bg-white border border-brand-beige/40 p-6 rounded-md space-y-4 shadow-sm hover:shadow-luxury transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex text-brand-gold mb-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                ))}
                              </div>
                              <h4 className="font-sans text-sm font-medium text-brand-charcoal">{review.name}</h4>
                            </div>
                            <p className="text-xs text-brand-muted font-sans">{review.date}</p>
                          </div>
                          <div className="space-y-2">
                            {review.title && (
                              <h5 className="font-editorial text-base font-medium text-brand-charcoal">{review.title}</h5>
                            )}
                            <p className="text-sm text-brand-gray font-light leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Write a review form */}
                <div className="lg:col-span-5">
                  <div className="bg-white border border-brand-beige/40 p-8 rounded-md shadow-sm sticky top-24">
                    <h3 className="font-editorial text-xl font-medium text-brand-charcoal mb-6">Write a Review</h3>
                    
                    {reviewSubmitted ? (
                      <div className="text-center space-y-4 py-8">
                        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto">
                          <ShieldCheck className="w-8 h-8 text-brand-gold" />
                        </div>
                        <p className="text-lg font-editorial text-brand-charcoal">Thank You</p>
                        <p className="text-sm text-brand-gray font-light">Your insights help our community.</p>
                        <button 
                          onClick={() => setReviewSubmitted(false)}
                          className="text-sm font-medium text-brand-purple hover:underline pt-4"
                        >
                          Write Another Review
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleReviewSubmit} className="space-y-5">
                        {/* Rating */}
                        <div className="space-y-2">
                          <label className="text-sm text-brand-charcoal font-sans font-medium">Rating</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                type="button"
                                key={star}
                                onClick={() => setRevRating(star)}
                                className="text-brand-gold transition-transform hover:scale-110"
                              >
                                <Star className={`w-6 h-6 ${star <= revRating ? 'fill-current' : 'text-brand-beige'}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                          <label className="text-sm text-brand-charcoal font-sans font-medium">Name</label>
                          <input
                            type="text"
                            value={revName}
                            onChange={(e) => setRevName(e.target.value)}
                            className="w-full text-sm bg-brand-ivory border border-brand-beige px-4 py-3 rounded-md focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
                            required
                          />
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                          <label className="text-sm text-brand-charcoal font-sans font-medium">Review Title</label>
                          <input
                            type="text"
                            value={revTitle}
                            onChange={(e) => setRevTitle(e.target.value)}
                            className="w-full text-sm bg-brand-ivory border border-brand-beige px-4 py-3 rounded-md focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors"
                          />
                        </div>

                        {/* Comment */}
                        <div className="space-y-2">
                          <label className="text-sm text-brand-charcoal font-sans font-medium">Experience</label>
                          <textarea
                            rows={4}
                            value={revComment}
                            onChange={(e) => setRevComment(e.target.value)}
                            className="w-full text-sm bg-brand-ivory border border-brand-beige px-4 py-3 rounded-md focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-colors resize-none"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn-primary w-full"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}
                  </div>
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
        <div className="pt-20 border-t border-brand-beige/40">
          <div className="text-center mb-12">
            <h2 className="font-editorial text-3xl font-medium text-brand-charcoal">Recommended Routine</h2>
            <p className="text-brand-gray mt-2 font-sans font-light">Pair with these botanical essentials.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
