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
      className="group relative bg-[#F2F2F2] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full cursor-pointer p-6"
      onClick={handleProductClick}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full flex items-center justify-center bg-transparent mb-5">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-[85%] h-[85%] object-cover rounded-full shadow-sm transform scale-100 group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Brand Badges */}
        <div className="absolute top-0 left-0 flex flex-col gap-1.5 z-10">
          {product.bestSeller && (
            <span className="bg-black text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-xs">
              ★ BESTSELLER
            </span>
          )}
          {product.featured && (
            <span className="bg-[#1C1326] text-brand-gold text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-xs">
              ✦ LIMITED EDITION
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-0 right-0 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            favorite 
              ? 'text-red-600' 
              : 'text-brand-charcoal/40 hover:text-red-500'
          }`}
          aria-label={favorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 justify-between text-left space-y-4">
        <div className="space-y-1.5">
          {/* Name - permanent marker handwritten vibe */}
          <h3 className="font-editorial text-lg text-[#222222] uppercase tracking-wide group-hover:text-brand-purple transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Sub-headline / Category */}
          <span className="text-[10px] uppercase tracking-wider text-[#5D536B] font-black block">
            {product.category}
          </span>

          {/* Description */}
          <p className="text-xs text-[#5D536B]/90 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 py-0.5">
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-[11px] text-[#5D536B] font-bold">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          {/* Price */}
          <div className="text-sm font-black text-[#222222] pt-1">
            ${product.price.toFixed(2)}
          </div>

          {/* Delivery & Availability Stamps */}
          <div className="space-y-1 pt-1 text-[11px] font-bold text-[#5D536B]">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="text-[10px]">✓</span>
              <span>Online delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#5D536B]/80">
              <span className="text-[10px]">⚲</span>
              <span>Check availability for collection in-store</span>
            </div>
          </div>
        </div>

        {/* Add to Bag centered pill button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`px-6 py-2.5 text-[10px] tracking-widest font-black uppercase rounded-full border border-black/20 bg-white text-brand-charcoal transition-all duration-300 hover:bg-[#222222] hover:text-white flex items-center justify-center gap-1.5 shadow-2xs ${
              addedSuccessfully ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700' : ''
            }`}
          >
            {isAdding ? (
              <span className="w-3.5 h-3.5 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin"></span>
            ) : addedSuccessfully ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="text-white">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>Add to bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
