/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, Heart, ShoppingBag, Check, Award, Flame } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync selected size with product when modal opens
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || '100ml');
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const favorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(quickViewProduct, quantity, selectedSize);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        closeQuickView();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-forest/40 backdrop-blur-xs transition-opacity" 
        onClick={closeQuickView}
      />

      {/* Modal Card */}
      <div className="relative bg-brand-purple-dark rounded-md max-w-4xl w-full shadow-2xl overflow-hidden border border-brand-cream/20 z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-[85vh]">
        
        {/* Close button */}
        <button 
          id="close-quickview-modal"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 bg-brand-purple-dark/80 backdrop-blur-xs text-brand-cream hover:text-brand-cream/80 p-1.5 rounded-full hover:bg-brand-purple-dark shadow-xs transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image Gallery/Showcase */}
        <div className="relative bg-brand-offwhite aspect-square md:aspect-auto md:h-full overflow-hidden">
          <img 
            src={quickViewProduct.image} 
            alt={quickViewProduct.name} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            {quickViewProduct.bestSeller && (
              <span className="bg-brand-forest text-brand-cream text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-xs flex items-center gap-1 shadow-sm">
                <Flame className="w-3 h-3 text-brand-gold fill-current" />
                Best Seller
              </span>
            )}
            <span className="bg-brand-sage/90 text-brand-cream text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs flex items-center gap-1 shadow-sm">
              <Award className="w-3 h-3 text-brand-cream" />
              100% Organic
            </span>
          </div>
        </div>

        {/* Right Side: Product Customizations */}
        <div className="p-6 sm:p-8 flex flex-col h-full overflow-y-auto bg-brand-purple-dark">
          <div className="flex-1">
            
            {/* Category */}
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/80 font-bold">
              {quickViewProduct.category} Collection
            </span>

            {/* Title */}
            <h2 className="font-editorial text-2xl font-bold text-brand-cream mt-1">
              {quickViewProduct.name}
            </h2>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'text-brand-beige/40'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-brand-cream/80 font-medium">
                {quickViewProduct.rating} out of 5 stars ({quickViewProduct.reviewsCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-xl font-bold text-brand-cream mt-4">
              ${quickViewProduct.price.toFixed(2)}
            </div>

            {/* Short Description */}
            <p className="text-xs text-brand-cream/80 leading-relaxed mt-4 font-light border-b border-brand-cream/20 pb-4">
              {quickViewProduct.shortDescription}
            </p>

            {/* Size Variants */}
            <div className="mt-5">
              <h4 className="text-xs uppercase tracking-widest text-brand-cream font-semibold mb-2.5">
                Select Size: <span className="text-brand-cream/80 font-normal">{selectedSize}</span>
              </h4>
              <div className="flex gap-2">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xs border uppercase tracking-wider transition-all ${
                      selectedSize === size
                        ? 'bg-brand-forest text-brand-cream border-brand-forest'
                        : 'bg-brand-purple-dark text-brand-cream border-brand-cream/20 hover:border-brand-sage'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5">
              <h4 className="text-xs uppercase tracking-widest text-brand-cream font-semibold mb-2.5">
                Quantity
              </h4>
              <div className="flex items-center w-28 border border-brand-cream/20 rounded-xs bg-brand-offwhite">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-brand-cream hover:text-brand-cream/80 font-medium"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-semibold text-brand-cream">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-brand-cream hover:text-brand-cream/80 font-medium"
                >
                  +
                </button>
              </div>
            </div>

            {/* Key Botanical Highlights */}
            <div className="mt-6 bg-brand-offwhite rounded-xs p-3.5 border border-brand-cream/20">
              <span className="text-[10px] uppercase tracking-wider text-brand-cream/80 font-bold block mb-1">
                Active Botanicals
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickViewProduct.keyIngredients.map((ing) => (
                  <span 
                    key={ing} 
                    className="text-[10px] bg-brand-purple-dark border border-brand-cream/20 px-2 py-0.5 rounded-full text-brand-cream"
                  >
                    🌱 {ing}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-4 border-t border-brand-cream/20 flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || addedSuccess}
              className={`flex-1 py-3.5 rounded-xs text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 transition-all ${
                addedSuccess 
                  ? 'bg-brand-sage text-brand-cream' 
                  : 'bg-brand-forest text-brand-cream hover:bg-brand-sage hover:shadow-xs'
              }`}
            >
              {isAdding ? (
                <>
                  <span className="w-4 h-4 border-2 border-brand-cream border-t-transparent rounded-full animate-spin"></span>
                  Infusing...
                </>
              ) : addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Added To Basket!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Add to Basket
                </>
              )}
            </button>

            <button
              onClick={() => toggleWishlist(quickViewProduct.id)}
              className={`w-12 h-12 rounded-xs border flex items-center justify-center transition-all ${
                favorited 
                  ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' 
                  : 'bg-brand-purple-dark border-brand-cream/20 text-brand-cream hover:border-brand-sage'
              }`}
              title={favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
