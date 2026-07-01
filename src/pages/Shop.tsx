/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { BrandDroplet } from '../components/BrandDroplet';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ShopProps {
  initialCategory?: string;
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ 
  initialCategory = 'all', 
  setCurrentPage, 
  setSelectedProductId 
}) => {
  const { products } = useStore();

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortOption, setSortOption] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  // Sync initial category prop if it changes (e.g. Nav link click)
  useEffect(() => {
    setCategoryFilter(initialCategory);
    setCurrentPageNum(1);
  }, [initialCategory]);

  const itemsPerPage = 6;

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch = 
      categoryFilter === 'all' || product.category === categoryFilter;
    
    // Price match
    const priceMatch = 
      product.price >= priceRange[0] && product.price <= priceRange[1];

    // Search query match
    const searchMatch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.keyIngredients.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && priceMatch && searchMatch;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low-high') {
      return a.price - b.price;
    }
    if (sortOption === 'price-high-low') {
      return b.price - a.price;
    }
    if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    // 'featured' / default sorting
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Pagination bounds
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPageNum - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Simulate a highly professional botanical "infusing" loading state when filters change
  const triggerFilterChange = (updater: () => void) => {
    setIsFiltering(true);
    updater();
    setTimeout(() => {
      setIsFiltering(false);
    }, 450);
  };

  const handleResetFilters = () => {
    triggerFilterChange(() => {
      setCategoryFilter('all');
      setPriceRange([0, 50]);
      setSortOption('featured');
      setSearchQuery('');
      setCurrentPageNum(1);
    });
  };

  return (
    <div className="w-full bg-white text-[#222222] pb-10">
      
      {/* Immersive Hero Section tailored to Category */}
      <section id="category-hero-section" className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] bg-[#FCFAF6] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={
              categoryFilter === 'haircare' 
                ? "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600"
                : categoryFilter === 'pedicure'
                ? "https://images.unsplash.com/photo-1519415510236-8a5169043d56?auto=format&fit=crop&q=80&w=1600"
                : categoryFilter === 'manicure'
                ? "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1600"
                : "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1600"
            } 
            alt="Vicesh Fresh Botanical Care" 
            className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02]"
          />
        </div>

        {/* Bottom wave overlay and content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end">
          
          {/* Beautiful organic wave shape */}
          <svg 
            className="w-full h-[30px] sm:h-[45px] md:h-[60px] lg:h-[80px] -mb-[1px] text-[#FCFAF6] fill-current" 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,70 C360,15 720,110 1080,85 C1260,72 1380,78 1440,65 L1440,120 L0,120 Z" />
          </svg>

          {/* Bright bar content area matching Lush screenshot bottom */}
          <div className="bg-[#FCFAF6] text-[#222222] pt-1 pb-4 md:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-8 border-b border-brand-beige/20 shadow-xs">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
              
              {/* Left Column: Lush-style brush font and sub-links */}
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <h2 className="font-editorial text-xl sm:text-2xl lg:text-3xl text-[#222222] tracking-wider flex items-center gap-2 select-none">
                    {categoryFilter === 'all' ? 'BOTANICAL APOTHECARY' : categoryFilter === 'haircare' ? 'HAIR & SCALP CARE' : categoryFilter === 'pedicure' ? 'SKIN TALK PEDICURE' : 'NAIL & MANICURE CARE'} 
                    <BrandDroplet size={24} color="#dfaf37" className="inline-block shrink-0 animate-pulse-slow" />
                  </h2>
                </div>
                
                {/* Sublinks */}
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] sm:text-xs font-bold text-brand-purple tracking-wider">
                  <button 
                    onClick={() => {
                      triggerFilterChange(() => {
                        setCategoryFilter('haircare');
                        setCurrentPage('haircare');
                        setCurrentPageNum(1);
                      });
                    }}
                    className={`pb-0.5 transition-all duration-200 cursor-pointer ${categoryFilter === 'haircare' ? 'border-b-2 border-brand-purple' : 'hover:text-brand-gold border-b border-transparent'}`}
                  >
                    Hair & Scalp Care
                  </button>
                  <button 
                    onClick={() => {
                      triggerFilterChange(() => {
                        setCategoryFilter('pedicure');
                        setCurrentPage('pedicure');
                        setCurrentPageNum(1);
                      });
                    }}
                    className={`pb-0.5 transition-all duration-200 cursor-pointer ${categoryFilter === 'pedicure' ? 'border-b-2 border-brand-purple' : 'hover:text-brand-gold border-b border-transparent'}`}
                  >
                    Skin Talk Pedicure
                  </button>
                  <button 
                    onClick={() => {
                      triggerFilterChange(() => {
                        setCategoryFilter('manicure');
                        setCurrentPage('manicure');
                        setCurrentPageNum(1);
                      });
                    }}
                    className={`pb-0.5 transition-all duration-200 cursor-pointer ${categoryFilter === 'manicure' ? 'border-b-2 border-brand-purple' : 'hover:text-brand-gold border-b border-transparent'}`}
                  >
                    Nail & Manicure Care
                  </button>
                  <button 
                    onClick={() => {
                      triggerFilterChange(() => {
                        setCategoryFilter('all');
                        setCurrentPage('shop');
                        setCurrentPageNum(1);
                      });
                    }}
                    className={`pb-0.5 transition-all duration-200 cursor-pointer ${categoryFilter === 'all' ? 'border-b-2 border-brand-purple' : 'hover:text-brand-gold border-b border-transparent'}`}
                  >
                    Botanical Apothecary
                  </button>
                </div>
              </div>

              {/* Right Column: Mini sub-title description */}
              <div className="max-w-md text-left md:text-right md:mb-1">
                <p className="text-[11px] sm:text-xs text-[#5D536B] font-semibold leading-relaxed">
                  {categoryFilter === 'haircare' 
                    ? 'Formulated with rosemary extracts, cold-pressed almond and therapeutic oils to restore follicle health and promote dense growth.'
                    : categoryFilter === 'pedicure'
                    ? 'Clinical numbered systems featuring purifying salt baths, softening callus cream, hygiene spray, and therapeutic herbal lotions.'
                    : categoryFilter === 'manicure'
                    ? 'Intense rescue systems for dry cuticles and weak nails utilizing cold-pressed sweet almond, active lemon, and organic myrrh.'
                    : 'Ethically crafted West African organic formulas featuring active botanicals directly supporting local small-holder cooperatives.'}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Main Shop Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* LUSH SCREENSHOT MATCH: "Find your perfect product" Category Guide Cards */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-neutral-100 pb-4">
            <div className="text-left space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-extrabold block">CURATED SOLUTIONS</span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-black text-brand-charcoal uppercase tracking-tight">
                Find your perfect product
              </h3>
            </div>
            
            {/* Horizontal scroll indicators */}
            <div className="flex items-center gap-2">
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-400 mr-2 hidden sm:block">
                Select a box to filter products
              </div>
              <button 
                onClick={() => {
                  const el = document.getElementById('lush-category-slider');
                  if (el) el.scrollBy({ left: -240, behavior: 'smooth' });
                }}
                className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer text-neutral-600"
                aria-label="Scroll left"
              >
                ‹
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('lush-category-slider');
                  if (el) el.scrollBy({ left: 240, behavior: 'smooth' });
                }}
                className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer text-neutral-600"
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          </div>

          {/* Scrolling card track */}
          <div 
            id="lush-category-slider"
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent snap-x scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Card 1: Hair Care */}
            <button
              onClick={() => {
                triggerFilterChange(() => {
                  setCategoryFilter('haircare');
                  setCurrentPageNum(1);
                });
              }}
              className={`flex-none w-[180px] sm:w-[220px] aspect-[4/5] rounded-lg overflow-hidden relative group text-left transition-all duration-300 snap-start cursor-pointer focus:outline-none ${
                categoryFilter === 'haircare' 
                  ? 'ring-4 ring-brand-gold shadow-md scale-[1.02]' 
                  : 'hover:scale-[1.02] hover:shadow-sm'
              }`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400" 
                alt="Hair Care"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 z-20 flex flex-col justify-end h-1/2 text-white">
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Vicesh Hair</span>
                <span className="font-editorial text-base sm:text-lg font-black uppercase tracking-wider mt-0.5">Hair Care</span>
                {categoryFilter === 'haircare' && (
                  <div className="mt-2 flex items-center gap-1">
                    <BrandDroplet size={12} color="#dfaf37" />
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">Active Filter</span>
                  </div>
                )}
              </div>
            </button>

            {/* Card 2: Pedicure */}
            <button
              onClick={() => {
                triggerFilterChange(() => {
                  setCategoryFilter('pedicure');
                  setCurrentPageNum(1);
                });
              }}
              className={`flex-none w-[180px] sm:w-[220px] aspect-[4/5] rounded-lg overflow-hidden relative group text-left transition-all duration-300 snap-start cursor-pointer focus:outline-none ${
                categoryFilter === 'pedicure' 
                  ? 'ring-4 ring-brand-gold shadow-md scale-[1.02]' 
                  : 'hover:scale-[1.02] hover:shadow-sm'
              }`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1519415510236-8a5169043d56?auto=format&fit=crop&q=80&w=400" 
                alt="Pedicure"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 z-20 flex flex-col justify-end h-1/2 text-white">
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Vicesh Feet</span>
                <span className="font-editorial text-base sm:text-lg font-black uppercase tracking-wider mt-0.5">Pedicure</span>
                {categoryFilter === 'pedicure' && (
                  <div className="mt-2 flex items-center gap-1">
                    <BrandDroplet size={12} color="#dfaf37" />
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">Active Filter</span>
                  </div>
                )}
              </div>
            </button>

            {/* Card 3: Manicure */}
            <button
              onClick={() => {
                triggerFilterChange(() => {
                  setCategoryFilter('manicure');
                  setCurrentPageNum(1);
                });
              }}
              className={`flex-none w-[180px] sm:w-[220px] aspect-[4/5] rounded-lg overflow-hidden relative group text-left transition-all duration-300 snap-start cursor-pointer focus:outline-none ${
                categoryFilter === 'manicure' 
                  ? 'ring-4 ring-brand-gold shadow-md scale-[1.02]' 
                  : 'hover:scale-[1.02] hover:shadow-sm'
              }`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400" 
                alt="Manicure"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 z-20 flex flex-col justify-end h-1/2 text-white">
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Vicesh Hands</span>
                <span className="font-editorial text-base sm:text-lg font-black uppercase tracking-wider mt-0.5">Manicure</span>
                {categoryFilter === 'manicure' && (
                  <div className="mt-2 flex items-center gap-1">
                    <BrandDroplet size={12} color="#dfaf37" />
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">Active Filter</span>
                  </div>
                )}
              </div>
            </button>

            {/* Card 4: Collections Guide */}
            <button
              onClick={() => {
                triggerFilterChange(() => {
                  setCategoryFilter('all');
                  setCurrentPageNum(1);
                });
              }}
              className={`flex-none w-[180px] sm:w-[220px] aspect-[4/5] rounded-lg overflow-hidden relative group text-left transition-all duration-300 snap-start cursor-pointer focus:outline-none ${
                categoryFilter === 'all' 
                  ? 'ring-4 ring-brand-gold shadow-md scale-[1.02]' 
                  : 'hover:scale-[1.02] hover:shadow-sm'
              }`}
            >
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=400" 
                alt="Collections Guide"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 z-20 flex flex-col justify-end h-1/2 text-white">
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Botanicals</span>
                <span className="font-editorial text-base sm:text-lg font-black uppercase tracking-wider mt-0.5">Collections Guide</span>
                {categoryFilter === 'all' && (
                  <div className="mt-2 flex items-center gap-1">
                    <BrandDroplet size={12} color="#dfaf37" />
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">Active</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </section>

      {/* CONDITIONAL RENDERING: COLLECTION EXPLORER VS ACTIVE PRODUCTS LIST */}
      {categoryFilter === 'all' ? (
        <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-10 animate-fade-in">
          <div className="space-y-4 max-w-xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-extrabold flex items-center justify-center gap-1.5">
              <BrandDroplet size={11} color="#dfaf37" className="animate-bounce" />
              Start Your Discovery
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-black text-brand-charcoal uppercase tracking-tight">
              Select a Collection to Begin
            </h3>
            <p className="text-xs sm:text-sm text-[#5D536B] leading-relaxed font-semibold">
              Explore our premium, unrefined botanical formulations. Select one of our signature solutions below to instantly open our fresh apothecary products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Hair Care Card */}
            <div 
              onClick={() => {
                triggerFilterChange(() => {
                  setCategoryFilter('haircare');
                  setCurrentPageNum(1);
                });
              }}
              className="bg-[#FCFAF6] border border-brand-beige/35 hover:border-brand-gold hover:shadow-lg rounded-xl p-6 text-center space-y-4 cursor-pointer transition-all duration-300 group hover:scale-[1.02] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                  <BrandDroplet size={20} color="currentColor" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-editorial text-lg font-black uppercase tracking-wider text-brand-charcoal">Hair Care</h4>
                  <p className="text-xs text-[#5D536B] leading-relaxed font-semibold">
                    Unrefined rosemary oils, restorative hair mayo, and therapeutic remedies for scalp growth.
                  </p>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-brand-gold border-t border-brand-beige/10">
                <span>Open Hair Care</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pedicure Card */}
            <div 
              onClick={() => {
                triggerFilterChange(() => {
                  setCategoryFilter('pedicure');
                  setCurrentPageNum(1);
                });
              }}
              className="bg-[#FCFAF6] border border-brand-beige/35 hover:border-brand-gold hover:shadow-lg rounded-xl p-6 text-center space-y-4 cursor-pointer transition-all duration-300 group hover:scale-[1.02] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                  <BrandDroplet size={20} color="currentColor" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-editorial text-lg font-black uppercase tracking-wider text-brand-charcoal">Pedicure</h4>
                  <p className="text-xs text-[#5D536B] leading-relaxed font-semibold">
                    Numbered pro-grade clinical spa systems with dead skin softeners, sprays & bath salts.
                  </p>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-brand-gold border-t border-brand-beige/10">
                <span>Open Pedicure</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Manicure Card */}
            <div 
              onClick={() => {
                triggerFilterChange(() => {
                  setCategoryFilter('manicure');
                  setCurrentPageNum(1);
                });
              }}
              className="bg-[#FCFAF6] border border-brand-beige/35 hover:border-brand-gold hover:shadow-lg rounded-xl p-6 text-center space-y-4 cursor-pointer transition-all duration-300 group hover:scale-[1.02] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                  <BrandDroplet size={20} color="currentColor" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-editorial text-lg font-black uppercase tracking-wider text-brand-charcoal">Manicure</h4>
                  <p className="text-xs text-[#5D536B] leading-relaxed font-semibold">
                    Cuticle repair formulations and sweet almond nail shield systems to fix brittle dry nail plates.
                  </p>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-brand-gold border-t border-brand-beige/10">
                <span>Open Manicure</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* LUSH SCREENSHOT MATCH: SORT BAR */}
          <div className="flex justify-end items-center border-y border-neutral-200 py-3 mt-4">
            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5D536B] font-bold">Sort by Relevance</span>
              <select
                value={sortOption}
                onChange={(e) => triggerFilterChange(() => setSortOption(e.target.value))}
                className="bg-transparent border-none text-[#1C1326] text-xs focus:outline-none font-black uppercase tracking-wider cursor-pointer"
              >
                <option value="featured">Featured ∨</option>
                <option value="price-low-high">Price: Low-High ∨</option>
                <option value="price-high-low">Price: High-Low ∨</option>
                <option value="rating">Rating ∨</option>
              </select>
            </div>
          </div>

          {/* Advanced Filter and Control Layout */}
          <div className="w-full">
            
            {/* Right Side: Product Catalog Grid Area */}
            <div className="w-full space-y-6">
              
              {/* Active tags and indicators */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-[#5D536B] pt-4">
                <div>
                  Showing <span className="text-black">{sortedProducts.length === 0 ? 0 : startIndex + 1}</span> to{' '}
                  <span className="text-black">
                    {Math.min(startIndex + itemsPerPage, sortedProducts.length)}
                  </span>{' '}
                  of <span className="text-black">{sortedProducts.length}</span> fresh products
                </div>

                {/* Selected filters tags overview */}
                {(categoryFilter !== 'all' || searchQuery || priceRange[0] !== 0 || priceRange[1] !== 50) && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {categoryFilter !== 'all' && (
                      <span className="bg-neutral-100 text-[#1C1326] px-2 py-0.5 rounded-full flex items-center gap-1 border border-neutral-200 text-[10px]">
                        Collection: {categoryFilter}
                        <button onClick={() => triggerFilterChange(() => setCategoryFilter('all'))} className="text-[#5D536B] hover:text-black">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="bg-neutral-100 text-[#1C1326] px-2 py-0.5 rounded-full flex items-center gap-1 border border-neutral-200 text-[10px]">
                        Query: "{searchQuery}"
                        <button onClick={() => triggerFilterChange(() => setSearchQuery(''))} className="text-[#5D536B] hover:text-black">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}
                    {(priceRange[0] !== 0 || priceRange[1] !== 50) && (
                      <span className="bg-neutral-100 text-[#1C1326] px-2 py-0.5 rounded-full flex items-center gap-1 border border-neutral-200 text-[10px]">
                        Budget: ${priceRange[0]}-${priceRange[1]}
                        <button onClick={() => triggerFilterChange(() => setPriceRange([0, 50]))} className="text-[#5D536B] hover:text-black">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Product Cards Grid & Loading Simulation */}
              {isFiltering ? (
                /* SKELETON CARDS LOADING STATE */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(itemsPerPage)].map((_, idx) => (
                    <div key={idx} className="bg-brand-cream border border-brand-beige/20 rounded-md overflow-hidden animate-pulse flex flex-col h-[400px]">
                      <div className="aspect-[4/5] bg-brand-offwhite"></div>
                      <div className="p-4 flex-1 space-y-3">
                        <div className="h-2 w-1/4 bg-brand-beige rounded-full"></div>
                        <div className="h-4 w-3/4 bg-brand-beige rounded-full"></div>
                        <div className="h-10 w-full bg-brand-beige rounded-xs"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginatedProducts.length === 0 ? (
                /* EMPTY STATE */
                <div className="bg-brand-offwhite border border-brand-beige/25 rounded-md py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-cream border border-brand-beige flex items-center justify-center mx-auto text-brand-sage">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-brand-forest">No matching botanicals</h3>
                  <p className="text-xs text-brand-sage max-w-sm mx-auto leading-relaxed">
                    We couldn't find any products matching your search query. Try expanding your search queries or resetting filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-colors text-xs tracking-widest uppercase font-semibold rounded-xs cursor-pointer shadow-xs"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                /* ACTUAL ACTIVE PRODUCTS GRID */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                  {paginatedProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      setCurrentPage={setCurrentPage}
                      setSelectedProductId={setSelectedProductId}
                    />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && !isFiltering && (
                <div className="flex justify-center items-center gap-2 pt-8">
                  <button
                    disabled={currentPageNum === 1}
                    onClick={() => handlePageChange(currentPageNum - 1)}
                    className="px-4 py-2 border border-brand-beige/50 text-xs font-semibold rounded-xs hover:border-brand-sage disabled:opacity-40 text-brand-forest"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const pageIdx = i + 1;
                    return (
                      <button
                        key={pageIdx}
                        onClick={() => handlePageChange(pageIdx)}
                        className={`w-9 h-9 text-xs font-bold rounded-xs transition-all ${
                          currentPageNum === pageIdx
                            ? 'bg-brand-forest text-brand-cream'
                            : 'border border-brand-beige/50 text-brand-forest hover:border-brand-sage'
                        }`}
                      >
                        {pageIdx}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPageNum === totalPages}
                    onClick={() => handlePageChange(currentPageNum + 1)}
                    className="px-4 py-2 border border-brand-beige/50 text-xs font-semibold rounded-xs hover:border-brand-sage disabled:opacity-40 text-brand-forest"
                  >
                    Next
                  </button>
                </div>
              )}

            </div>

          </div>
        </>
      )}

    </div>

  </div>
  );
};
