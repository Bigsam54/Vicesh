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
      className="group relative bg-white border border-brand-beige/40 rounded-lg overflow-hidden transition-all duration-400 flex flex-col h-full cursor-pointer hover:-translate-y-1 hover:shadow-luxury-hover"
      onClick={handleProductClick}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-brand-ivory overflow-hidden p-6 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover rounded-md shadow-[0_2px_15px_rgba(0,0,0,0.05)] transform scale-100 group-hover:scale-[1.08] transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Brand Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.bestSeller && (
            <span className="bg-brand-gold text-brand-purple text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
              Bestseller
            </span>
          )}
          {product.featured && (
            <span className="bg-brand-purple text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
              Limited Edition
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
            favorite 
              ? 'text-brand-purple' 
              : 'text-brand-gray hover:text-brand-purple hover:scale-110'
          }`}
          aria-label={favorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : 'stroke-[1.5]'}`} />
        </button>

        {/* Quick View Button Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex justify-center transform translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={handleQuickViewClick}
            className="bg-white/90 backdrop-blur-md text-brand-charcoal hover:text-brand-purple font-sans font-medium text-xs px-6 py-2 rounded-full shadow-luxury flex items-center gap-2 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 justify-between text-left p-6 space-y-5 bg-white">
        <div className="space-y-3">
          {/* Sub-headline / Category */}
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gray font-medium block">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-editorial text-xl font-medium text-brand-charcoal leading-tight">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm font-sans font-light text-brand-gray line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="text-xl font-editorial font-medium text-brand-charcoal">
              ${product.price.toFixed(2)}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-brand-beige'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-[11px] text-brand-gray font-medium">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Add to Bag centered pill button */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`w-full py-3.5 text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
              addedSuccessfully ? 'bg-brand-gold text-brand-purple' : 'btn-secondary hover:border-brand-purple hover:bg-brand-purple hover:text-white'
            }`}
          >
            {isAdding ? (
              <span className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></span>
            ) : addedSuccessfully ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
