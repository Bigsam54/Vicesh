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
    className="w-10 h-10 rounded-full border border-brand-beige flex items-center justify-center hover:bg-white hover:border-brand-purple hover:text-brand-purple transition-all cursor-pointer text-brand-gray shrink-0 shadow-sm"
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
    <div className="w-full bg-brand-ivory text-brand-charcoal pb-16">
      
      {/* ─── Thin top banner ─── */}
      <div className="w-full bg-brand-purple text-white text-center text-xs tracking-widest uppercase font-sans font-medium py-3">
        🌿 Complimentary standard delivery on orders over $50+
      </div>

      {/* ═══ ROW 1: "Find your perfect product" ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Centered title */}
        <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-center text-brand-charcoal mb-10">
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
                className="flex-none flex flex-col items-center text-center group cursor-pointer focus:outline-none"
              >
                {/* Thumbnail image */}
                <div className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-400 group-hover:shadow-luxury group-hover:-translate-y-1">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                {/* Label below image */}
                <span className="text-sm font-sans font-medium text-brand-gray group-hover:text-brand-purple transition-colors">
                  {card.label}
                </span>
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

      {/* ═══ ROW 2: "How do you want to feel?" ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-brand-beige/40">

        <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-center text-brand-charcoal mb-10">
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
                  <span className="bg-white/95 backdrop-blur-md text-brand-charcoal text-xs font-sans font-semibold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-brand-beige/40">

        <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-center text-brand-charcoal mb-10">
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
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="bg-white/95 backdrop-blur-md text-brand-charcoal text-xs sm:text-sm font-sans font-semibold uppercase tracking-widest px-4 py-2 rounded-sm shadow-sm inline-block">
                    {card.label}
                  </span>
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
  );
};
