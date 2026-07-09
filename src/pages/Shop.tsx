/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShopProps {
  initialCategory?: string;
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
}

/* ─── Horizontal Scroll Arrow Button ─── */
const ScrollArrow: React.FC<{
  direction: 'left' | 'right';
  onClick: () => void;
}> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-purple-dark hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer text-brand-cream/80 shrink-0 shadow-sm"
    aria-label={`Scroll ${direction}`}
  >
    {direction === 'left' ? (
      <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
    ) : (
      <ChevronRight className="w-5 h-5 stroke-[1.5]" />
    )}
  </button>
);

/* ─── Category card data (Row 1: "Find your perfect product") ─── */
const categoryCards = [
  {
    id: 'haircare',
    label: 'Hair Care',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'pedicure',
    label: 'Pedicure',
    image: 'https://images.unsplash.com/photo-1519415510236-8a5169043d56?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'manicure',
    label: 'Manicure',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'skincare',
    label: 'Skincare',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'spa',
    label: 'Spa',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'oils',
    label: 'Essential Oils',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'bodycare',
    label: 'Body Care',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'gifts',
    label: 'Gifts & Wrapping',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238f073?auto=format&fit=crop&q=80&w=400',
  },
];

/* ─── Mood card data (Row 2: "How do you want to feel?") ─── */
const moodCards = [
  {
    id: 'relaxed',
    label: 'Relaxed',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=400',
    color: '#E8D5B7',
  },
  {
    id: 'refreshed',
    label: 'Cool & Refreshed',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400',
    color: '#B5D3E7',
  },
  {
    id: 'sensual',
    label: 'Sensual',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400',
    color: '#D4A6B5',
  },
  {
    id: 'comforted',
    label: 'Comforted',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=400',
    color: '#E5C9A4',
  },
  {
    id: 'uplifted',
    label: 'Uplifted',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
    color: '#F5E6A3',
  },
  {
    id: 'grounded',
    label: 'Grounded',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    color: '#A4B88F',
  },
  {
    id: 'playful',
    label: 'Playful',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400',
    color: '#F0B4D4',
  },
  {
    id: 'sleepy',
    label: 'Sleepy',
    image: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&q=80&w=400',
    color: '#C8B5E3',
  },
];

/* ─── Trending card data (Row 3: "Trending") ─── */
const trendingCards = [
  {
    id: 'bestsellers',
    label: 'Bestsellers',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'newArrivals',
    label: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'organic',
    label: 'Organic Botanicals',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'shea',
    label: 'Shea Butter Range',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'gift-sets',
    label: 'Gift Sets',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238f073?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'scalp',
    label: 'Scalp Treatments',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
  },
];

export const Shop: React.FC<ShopProps> = ({ 
  initialCategory = 'all', 
  setCurrentPage, 
  setSelectedProductId 
}) => {
  const { products } = useStore();

  const categorySliderRef = useRef<HTMLDivElement>(null);
  const moodSliderRef = useRef<HTMLDivElement>(null);
  const trendingSliderRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catId: string) => {
    if (['haircare', 'pedicure', 'manicure'].includes(catId)) {
      setCurrentPage(catId);
    } else if (catId === 'all') {
      setCurrentPage('shop');
    } else {
      setCurrentPage(`category:${catId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════ */
  return (
    <div className="w-full bg-brand-purple text-brand-cream pb-16">
      
      {/* ─── Thin top banner ─── */}
      <div className="w-full bg-brand-gold text-brand-purple text-center text-xs tracking-widest uppercase font-sans font-medium py-3">
        🌿 Complimentary standard delivery on orders over $50+
      </div>

      {/* ═══ ROW 1: "Find your perfect product" ═══ */}
      <div 
        className="w-full relative bg-cover bg-center"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dja3u7oha/image/upload/v1783540759/Avocado_ingredients_with_water_s__202607081955_1_e7imt4.jpg')` }}
      >
        {/* Subtle dark overlay to ensure the white text and cards remain visible */}
        <div className="absolute inset-0 bg-brand-purple-dark/60 mix-blend-multiply" />
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
          
          {/* Centered title */}
          <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-center text-brand-cream mb-10 drop-shadow-md">
            Find your perfect product
          </h2>

        {/* Horizontal scroll track */}
        <div className="relative">
          <div
            ref={categorySliderRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {categoryCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCategoryClick(card.id)}
                className="flex-none relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] group cursor-pointer focus:outline-none rounded-sm overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                {/* Text */}
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="block text-brand-cream font-sans font-bold text-sm uppercase tracking-wide">
                    {card.label}
                  </span>
                  <span className="block text-[9px] text-brand-gold font-medium tracking-widest uppercase mt-1">
                    Explore
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Scroll arrows */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <ScrollArrow direction="left" onClick={() => scroll(categorySliderRef, 'left')} />
            <ScrollArrow direction="right" onClick={() => scroll(categorySliderRef, 'right')} />
          </div>
        </div>
      </section>
      </div>

      {/* ═══ ROW 2: "How do you want to feel?" ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-brand-cream/20">

        <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-center text-brand-cream mb-10">
          How do you want to feel?
        </h2>

        <div className="relative">
          <div
            ref={moodSliderRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {moodCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCategoryClick(card.id)}
                className="flex-none w-[140px] sm:w-[160px] aspect-square rounded-lg overflow-hidden relative group cursor-pointer focus:outline-none transition-all duration-400 hover:-translate-y-1 hover:shadow-luxury"
              >
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Bottom label overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center">
                  <span className="bg-brand-purple-dark/95 backdrop-blur-md text-brand-cream text-xs font-sans font-semibold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                    {card.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 pt-6">
            <ScrollArrow direction="left" onClick={() => scroll(moodSliderRef, 'left')} />
            <ScrollArrow direction="right" onClick={() => scroll(moodSliderRef, 'right')} />
          </div>
        </div>
      </section>

      {/* ═══ ROW 3: "Trending" ═══ */}
      <div 
        className="w-full relative bg-cover bg-center border-t border-brand-cream/20"
        style={{ backgroundImage: `url('https://res.cloudinary.com/dja3u7oha/image/upload/v1783594372/Oranges_water_splashes_botanical__2K_202607091044_anxijn.jpg')` }}
      >
        <div className="absolute inset-0 bg-brand-purple-dark/60 mix-blend-multiply" />
        
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

          <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-center text-brand-cream mb-10 drop-shadow-md">
            Trending
          </h2>

        <div className="relative">
          <div
            ref={trendingSliderRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {trendingCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCategoryClick(card.id)}
                className="flex-none w-[220px] sm:w-[280px] aspect-[4/3] rounded-lg overflow-hidden relative group cursor-pointer focus:outline-none transition-all duration-400 hover:-translate-y-1 hover:shadow-luxury"
              >
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Bottom label overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center">
                  <div className="w-full bg-brand-purple-dark text-brand-cream text-xs sm:text-sm font-sans font-semibold uppercase tracking-widest px-2 py-3 rounded-md shadow-lg text-center leading-tight">
                    {card.label}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 pt-6">
            <ScrollArrow direction="left" onClick={() => scroll(trendingSliderRef, 'left')} />
            <ScrollArrow direction="right" onClick={() => scroll(trendingSliderRef, 'right')} />
          </div>
        </div>
      </section>
      </div>

    </div>
  );
};
