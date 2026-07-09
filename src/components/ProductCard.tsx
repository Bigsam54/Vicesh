/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  setCurrentPage, 
  setSelectedProductId 
}) => {
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  const favorite = isInWishlist(product.id);

  const handleProductClick = () => {
    setSelectedProductId(product.id);
    setCurrentPage(`product:${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    // Choose the first available size
    const size = product.sizes[0] || '100ml';
    
    setTimeout(() => {
      addToCart(product, 1, size);
      setIsAdding(false);
      setAddedSuccessfully(true);
      
      // Reset success check after 2 seconds
      setTimeout(() => setAddedSuccessfully(false), 2000);
    }, 600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div 
      className="group relative bg-brand-purple-dark border border-brand-cream/10 rounded-lg overflow-hidden transition-all duration-500 flex flex-col h-full cursor-pointer hover:-translate-y-2 hover:shadow-luxury-hover hover:border-brand-gold/30"
      onClick={handleProductClick}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full bg-brand-purple overflow-hidden flex items-center justify-center">
        {/* Subtle glow behind image */}
        <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 mix-blend-screen" />
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.05] transition-transform duration-700 ease-out z-10"
          loading="lazy"
        />

        {/* Brand Badges */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5 z-10">
          {product.bestSeller && (
            <span className="bg-brand-gold text-brand-purple text-[8px] sm:text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
              Bestseller
            </span>
          )}
          {product.featured && (
            <span className="bg-brand-gold text-brand-purple text-[8px] sm:text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
              Limited Edition
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 z-10 w-8 h-8 bg-brand-purple-dark/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
            favorite 
              ? 'text-brand-gold' 
              : 'text-brand-cream/80 hover:text-brand-gold hover:scale-110'
          }`}
          aria-label={favorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : 'stroke-[1.5]'}`} />
        </button>

        {/* Quick View Button Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex justify-center transform translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={handleQuickViewClick}
            className="bg-brand-purple-dark/90 backdrop-blur-md text-brand-cream hover:text-brand-gold font-sans font-medium text-[10px] sm:text-xs px-4 py-1.5 sm:px-6 sm:py-2 rounded-full shadow-luxury flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="relative flex flex-col flex-1 justify-between text-left p-4 sm:p-5 space-y-3 sm:space-y-4 bg-brand-purple-dark overflow-hidden">
        
        {/* Subtle Botanical Watermark */}
        <div className="absolute -bottom-4 -right-4 opacity-[0.03] text-brand-gold transform rotate-[-15deg] group-hover:rotate-0 group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none z-0">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C50 0 10 30 10 70C10 90 30 100 50 100C70 100 90 90 90 70C90 30 50 0 50 0ZM50 90C35 90 20 80 20 65C20 40 40 20 50 10C60 20 80 40 80 65C80 80 65 90 50 90Z" />
            <path d="M50 10V90" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="space-y-2 sm:space-y-2.5 relative z-10">
          {/* Sub-headline / Category */}
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-brand-cream/80 font-medium block truncate">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-editorial text-base sm:text-lg font-medium text-brand-cream leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* Description - Hide on very small mobile to save space, show otherwise */}
          <p className="hidden sm:block text-xs sm:text-sm font-sans font-light text-brand-cream/80 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
            {/* Price */}
            <div className="text-lg sm:text-xl font-editorial font-medium text-brand-cream">
              ${product.price.toFixed(2)}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-brand-beige'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-[9px] sm:text-[10px] text-brand-cream/80 font-medium">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Add to Bag centered pill button */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`w-full py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-300 flex items-center justify-center gap-1.5 ${
              addedSuccessfully ? 'bg-brand-gold text-brand-purple' : 'bg-transparent border border-brand-cream/20 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-purple text-brand-cream'
            }`}
          >
            {isAdding ? (
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></span>
            ) : addedSuccessfully ? (
              <>
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.5]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
