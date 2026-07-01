/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { BrandDroplet } from '../components/BrandDroplet';
import { 
  ArrowRight, Sparkles, CheckCircle2, Leaf, Droplet, ShieldCheck, Award, 
  ChevronLeft, ChevronRight, MessageCircle, Mail, Phone, Heart, CheckCircle 
} from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage, setSelectedProductId }) => {
  const { products } = useStore();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Best sellers are flagged in our product database
  const bestSellers = products.filter(p => p.bestSeller);

  const testimonials = [
    {
      quote: "The Rosemary Infused Hair Shampoo and Scalp Itching Therapy completely saved my hair! The itching reduced on my first use, and my braids felt so comfortable.",
      name: "Abena Osei-Mensah",
      role: "Accra, Ghana",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "Vicesh's Red Pedicure Set is a miracle. The specialized callus cream completely smoothed out my heels within ten minutes, and the cuticle oil has my nails looking brand new.",
      name: "Esi Taylor",
      role: "Swedru, Ghana",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "My natural hair was so dry and brittle after braids. The Almond Hair Mayonnaise deep conditioning restored its elasticity. I am locked in with Vicesh!",
      name: "Ama Serwaa",
      role: "Winneba, Ghana",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-20 pb-20 bg-brand-cream/30">
      
      {/* =========================================================================
          1. IMMERSIVE HERO SECTION WITH LUSH-STYLE WAVY OVERLAY BANHER (PIXEL PERFECT SCREENSHOT MATCH)
          ========================================================================= */}
      <section id="hero-section" className="relative w-full h-[400px] sm:h-[480px] md:h-[550px] lg:h-[620px] bg-[#FCFAF6] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1600" 
            alt="Vicesh Fresh Botanical Care" 
            className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02]"
          />
        </div>

        {/* Bottom wave overlay and content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end">
          
          {/* Beautiful organic wave shape */}
          <svg 
            className="w-full h-[40px] sm:h-[60px] md:h-[80px] lg:h-[100px] -mb-[1px] text-[#FCFAF6] fill-current" 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,70 C360,15 720,110 1080,85 C1260,72 1380,78 1440,65 L1440,120 L0,120 Z" />
          </svg>

          {/* Bright bar content area matching Lush screenshot bottom */}
          <div className="bg-[#FCFAF6] text-[#222222] pt-2 pb-6 md:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8 border-b border-brand-beige/20 shadow-xs">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              {/* Left Column: Lush-style brush font and sub-links */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 text-left">
                <div className="flex items-center gap-2">
                  <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#222222] tracking-wider flex items-center gap-2 select-none">
                    FRESH SKINCARE <span className="text-2xl sm:text-3xl lg:text-4xl">🌱</span>
                  </h2>
                </div>
                
                {/* Sublinks */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-brand-forest tracking-wider">
                  <button 
                    onClick={() => handleNavigate('haircare')} 
                    className="hover:text-brand-gold border-b-2 border-brand-beige/40 hover:border-brand-gold pb-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Hair & Scalp Care
                  </button>
                  <button 
                    onClick={() => handleNavigate('pedicure')} 
                    className="hover:text-brand-gold border-b-2 border-brand-beige/40 hover:border-brand-gold pb-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Skin Talk Pedicure
                  </button>
                  <button 
                    onClick={() => handleNavigate('manicure')} 
                    className="hover:text-brand-gold border-b-2 border-brand-beige/40 hover:border-brand-gold pb-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Nail & Manicure Care
                  </button>
                  <button 
                    onClick={() => handleNavigate('shop')} 
                    className="hover:text-brand-gold border-b-2 border-brand-beige/40 hover:border-brand-gold pb-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Botanical Apothecary
                  </button>
                </div>
              </div>

              {/* Right Column: CTA buttons with clean high-contrast style */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 md:mb-1">
                <button 
                  onClick={() => handleNavigate('shop')}
                  className="px-6 py-3.5 bg-brand-forest text-white hover:bg-brand-sage transition-all text-[11px] tracking-widest uppercase font-black rounded-xs shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Explore Fresh Blends
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => handleNavigate('about')}
                  className="px-6 py-3.5 border-2 border-brand-forest/60 text-brand-forest hover:bg-brand-forest hover:text-white transition-all text-[11px] tracking-widest uppercase font-black rounded-xs flex items-center justify-center cursor-pointer"
                >
                  Our Green Sourcing
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. FIND YOUR PERFECT PRODUCT — HERO-STYLED CATEGORY SLIDER (LUSH MATCH)
          ========================================================================= */}
      <section id="perfect-product-categories" className="relative w-full bg-[#FCFAF6] py-12 border-b border-brand-beige/25">
        
        {/* Decorative Wave Transition inside Section to match Hero pattern */}
        <div className="absolute inset-x-0 -top-10 h-10 overflow-hidden pointer-events-none z-10">
          <svg className="w-full h-full text-[#FCFAF6] fill-current" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path d="M0,20 Q360,40 720,20 T1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex justify-between items-end border-b border-brand-beige/25 pb-4">
            <div className="text-left space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-extrabold flex items-center gap-1.5">
                <BrandDroplet size={10} color="#dfaf37" className="animate-pulse" />
                Select Your Solution
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-black text-brand-charcoal uppercase tracking-tight">
                Find your perfect product
              </h2>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  const el = document.getElementById('home-category-slider');
                  if (el) el.scrollBy({ left: -240, behavior: 'smooth' });
                }}
                className="w-9 h-9 rounded-full border border-brand-beige/40 flex items-center justify-center hover:bg-brand-cream hover:border-brand-gold transition-all cursor-pointer text-brand-forest font-bold"
                aria-label="Scroll Left"
              >
                ‹
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('home-category-slider');
                  if (el) el.scrollBy({ left: 240, behavior: 'smooth' });
                }}
                className="w-9 h-9 rounded-full border border-brand-beige/40 flex items-center justify-center hover:bg-brand-cream hover:border-brand-gold transition-all cursor-pointer text-brand-forest font-bold"
                aria-label="Scroll Right"
              >
                ›
              </button>
            </div>
          </div>

          {/* Horizontally scrolling track matching the Lush style */}
          <div 
            id="home-category-slider"
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent snap-x scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Hair Care */}
            <div 
              onClick={() => handleNavigate('haircare')}
              className="flex-none w-[200px] sm:w-[260px] aspect-[4/5] rounded-lg overflow-hidden relative group text-left transition-all duration-300 snap-start cursor-pointer hover:scale-[1.02] hover:shadow-lg border border-brand-beige/20 bg-brand-charcoal"
            >
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400" 
                alt="Hair Care" 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 z-20 flex flex-col justify-end h-1/2 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">Vicesh Hair</span>
                <h3 className="font-editorial text-lg sm:text-xl font-black uppercase tracking-wider mt-1">Hair Care</h3>
                <p className="text-[10px] text-brand-cream/80 font-medium mt-1 line-clamp-1">Growth & Root Restoration</p>
                <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-gold">Guide Me</span>
                  <ArrowRight className="w-3 h-3 text-brand-gold" />
                </div>
              </div>
            </div>

            {/* Pedicure */}
            <div 
              onClick={() => handleNavigate('pedicure')}
              className="flex-none w-[200px] sm:w-[260px] aspect-[4/5] rounded-lg overflow-hidden relative group text-left transition-all duration-300 snap-start cursor-pointer hover:scale-[1.02] hover:shadow-lg border border-brand-beige/20 bg-brand-charcoal"
            >
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1519415510236-8a5169043d56?auto=format&fit=crop&q=80&w=400" 
                alt="Pedicure" 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 z-20 flex flex-col justify-end h-1/2 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">Vicesh Feet</span>
                <h3 className="font-editorial text-lg sm:text-xl font-black uppercase tracking-wider mt-1">Pedicure</h3>
                <p className="text-[10px] text-brand-cream/80 font-medium mt-1 line-clamp-1">Purify & Callus Softener</p>
                <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-gold">Guide Me</span>
                  <ArrowRight className="w-3 h-3 text-brand-gold" />
                </div>
              </div>
            </div>

            {/* Manicure */}
            <div 
              onClick={() => handleNavigate('manicure')}
              className="flex-none w-[200px] sm:w-[260px] aspect-[4/5] rounded-lg overflow-hidden relative group text-left transition-all duration-300 snap-start cursor-pointer hover:scale-[1.02] hover:shadow-lg border border-brand-beige/20 bg-brand-charcoal"
            >
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400" 
                alt="Manicure" 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 z-20 flex flex-col justify-end h-1/2 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">Vicesh Hands</span>
                <h3 className="font-editorial text-lg sm:text-xl font-black uppercase tracking-wider mt-1">Manicure</h3>
                <p className="text-[10px] text-brand-cream/80 font-medium mt-1 line-clamp-1">Cuticle Strength & Nourish</p>
                <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-gold">Guide Me</span>
                  <ArrowRight className="w-3 h-3 text-brand-gold" />
                </div>
              </div>
            </div>

            {/* Shop All */}
            <div 
              onClick={() => handleNavigate('shop')}
              className="flex-none w-[200px] sm:w-[260px] aspect-[4/5] rounded-lg overflow-hidden relative group text-left transition-all duration-300 snap-start cursor-pointer hover:scale-[1.02] hover:shadow-lg border border-brand-beige/20 bg-brand-charcoal"
            >
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors z-10" />
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" 
                alt="Shop All" 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 z-20 flex flex-col justify-end h-1/2 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold">Apothecary</span>
                <h3 className="font-editorial text-lg sm:text-xl font-black uppercase tracking-wider mt-1">Shop All</h3>
                <p className="text-[10px] text-brand-cream/80 font-medium mt-1 line-clamp-1">Curated Botanical Apothecary</p>
                <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-gold">Guide Me</span>
                  <ArrowRight className="w-3 h-3 text-brand-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BEST SELLING BLENDS — COMPOSITE HERO-DESIGN PATTERN SECTION
          ========================================================================= */}
      <section id="best-sellers-display" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FCFAF6] border border-brand-beige/35 rounded-lg p-6 sm:p-10 md:p-12 relative overflow-hidden space-y-8 shadow-sm">
          
          {/* Subtle wavy top line decorative element to mirror Hero theme */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-gold via-brand-forest to-brand-purple"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-beige/25 pb-5">
            <div className="space-y-2 text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-extrabold flex items-center gap-1.5">
                <BrandDroplet size={11} color="#dfaf37" />
                CUSTOMER FAVORITES
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-black text-brand-charcoal uppercase tracking-tight">
                Best Selling Blends
              </h2>
            </div>
            
            <button 
              onClick={() => handleNavigate('shop')}
              className="px-5 py-3 bg-brand-forest text-white hover:bg-brand-sage transition-all text-[11px] tracking-widest uppercase font-black rounded-xs shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              Explore All Botanicals
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {bestSellers.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white p-3 rounded-lg border border-neutral-100 hover:shadow-md transition-all">
                <ProductCard 
                  product={product}
                  setCurrentPage={setCurrentPage}
                  setSelectedProductId={setSelectedProductId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. EDITORIAL DUAL SECTION — BOLD MOOD & BRAND FOCUS (HERO MATCH)
          ========================================================================= */}
      <section id="natural-approach" className="relative w-full overflow-hidden bg-white py-12">
        {/* Decorative Wave Transition above section */}
        <div className="absolute inset-x-0 top-0 h-10 overflow-hidden pointer-events-none z-10">
          <svg className="w-full h-full text-[#FCFAF6] fill-current" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path d="M0,0 C360,25 720,5 1080,25 L1440,0 L1440,40 L0,40 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-lg overflow-hidden border border-brand-beige/35 shadow-xl bg-white">
            
            {/* Image side with smooth color overlay */}
            <div className="lg:col-span-6 aspect-square sm:aspect-[4/3] lg:aspect-auto relative min-h-[440px]">
              <img 
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1000" 
                alt="Vicesh Raw Extracts" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-brand-forest/10" />
            </div>

            {/* Content side with premium styling */}
            <div className="lg:col-span-6 p-8 sm:p-14 text-left flex flex-col justify-center space-y-6 bg-[#FCFAF6] relative overflow-hidden">
              
              {/* Elegant Watermark Droplet Accent */}
              <div className="absolute -right-12 -bottom-12 w-52 h-52 opacity-[0.04] text-brand-gold pointer-events-none select-none">
                <BrandDroplet size="100%" color="currentColor" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-extrabold flex items-center gap-1.5">
                  <BrandDroplet size={11} color="#dfaf37" />
                  Our Sourcing Philosophy
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-black text-brand-charcoal uppercase leading-none tracking-tight">
                  FRESHLY MADE.<br />ETHICALLY BOUGHT.
                </h2>
              </div>
              
              <div className="w-16 h-[2px] bg-brand-gold"></div>

              <p className="text-sm text-[#5D536B] leading-relaxed font-semibold">
                At Vicesh Cosmetics, our formulas are driven by a commitment to raw botanical potency. We reject heavy mineral oils, sulfates, paraben coatings, and cheap synthetic fillers. Instead, we use unrefined cold-pressed plant ingredients that trigger real restoration.
              </p>
              <p className="text-xs sm:text-sm text-[#5D536B]/95 leading-relaxed font-semibold">
                By supporting smallholder female harvesters in Ghana, we ensure you receive the finest ethical shea, rosemary, and botanical oils while paying a direct, dignified wage to our growing farming network.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-brand-beige/25">
                <div className="space-y-1">
                  <h4 className="font-editorial font-black text-brand-charcoal text-sm uppercase flex items-center gap-1.5">
                    <BrandDroplet size={10} color="#dfaf37" />
                    100% Vegan
                  </h4>
                  <p className="text-xs text-[#5D536B] leading-relaxed font-medium">Pure raw formulas completely safe for hair follicles & nail plates.</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-editorial font-black text-brand-charcoal text-sm uppercase flex items-center gap-1.5">
                    <BrandDroplet size={10} color="#dfaf37" />
                    Direct Ethical Buying
                  </h4>
                  <p className="text-xs text-[#5D536B] leading-relaxed font-medium">Sourced directly from smallholder communities in Central Ghana.</p>
                </div>
              </div>

              {/* Call to action resembling hero section */}
              <div className="pt-4 flex flex-wrap gap-4">
                <button 
                  onClick={() => handleNavigate('about')}
                  className="px-6 py-3.5 bg-brand-forest text-white hover:bg-brand-sage transition-all text-[11px] tracking-widest uppercase font-black rounded-xs shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                >
                  Our Botanical Story
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ACTIVE INGREDIENTS CAROUSEL (LUSH-INSPIRED STORIES GRID)
          ========================================================================= */}
      <section id="powered-by-essential-oils" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#FCFAF6] border border-brand-beige/35 rounded-lg p-6 sm:p-10 md:p-12 relative overflow-hidden space-y-8 shadow-sm">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-extrabold flex items-center justify-center gap-1.5">
              <BrandDroplet size={11} color="#dfaf37" />
              THERAPEUTIC POTENCY
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-black text-brand-charcoal uppercase tracking-tight">Active Ingredients</h2>
            <p className="text-xs sm:text-sm text-[#5D536B] leading-relaxed font-semibold">
              We select every herb and seed for its functional bio-activity on your body. Here is what we pack inside our signature remedies:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {/* Rosemary */}
            <div className="group relative rounded-lg overflow-hidden bg-brand-charcoal aspect-[3/4] shadow-md border border-brand-beige/25">
              <img 
                src="https://images.unsplash.com/photo-1594031636965-41604a1b023f?auto=format&fit=crop&q=80&w=400" 
                alt="Rosemary Oil" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-forest/45 group-hover:bg-brand-forest/55 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white text-left space-y-2">
                <span className="text-[9px] text-brand-gold font-sans font-black tracking-widest uppercase bg-brand-charcoal/50 px-2 py-0.5 rounded-sm inline-block">Active Growth</span>
                <h3 className="font-editorial text-xl font-extrabold uppercase tracking-tight">Rosemary</h3>
                <p className="text-xs text-brand-cream/90 leading-relaxed font-medium">
                  Induces cellular blood circulation at the scalp roots to strengthen hair shafts and spark active growth.
                </p>
              </div>
            </div>

            {/* Avocado */}
            <div className="group relative rounded-lg overflow-hidden bg-brand-charcoal aspect-[3/4] shadow-md border border-brand-beige/25">
              <img 
                src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400" 
                alt="Avocado Extract" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-forest/45 group-hover:bg-brand-forest/55 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white text-left space-y-2">
                <span className="text-[9px] text-brand-gold font-sans font-black tracking-widest uppercase bg-brand-charcoal/50 px-2 py-0.5 rounded-sm inline-block">Moisture Core</span>
                <h3 className="font-editorial text-xl font-extrabold uppercase tracking-tight">Avocado</h3>
                <p className="text-xs text-brand-cream/90 leading-relaxed font-medium">
                  Saturated with vital fats and amino proteins to reconstruct heat-damaged hair and lock in severe hydration.
                </p>
              </div>
            </div>

            {/* Almond */}
            <div className="group relative rounded-lg overflow-hidden bg-brand-charcoal aspect-[3/4] shadow-md border border-brand-beige/25">
              <img 
                src="https://images.unsplash.com/photo-1508061253366-f7da158b6d96?auto=format&fit=crop&q=80&w=400" 
                alt="Almond Oil" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-forest/45 group-hover:bg-brand-forest/55 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white text-left space-y-2">
                <span className="text-[9px] text-brand-gold font-sans font-black tracking-widest uppercase bg-brand-charcoal/50 px-2 py-0.5 rounded-sm inline-block">Nail Shield</span>
                <h3 className="font-editorial text-xl font-extrabold uppercase tracking-tight">Sweet Almond</h3>
                <p className="text-xs text-brand-cream/90 leading-relaxed font-medium">
                  Loaded with Vitamin E and Oleic acid to eliminate brittle plates and deeply nourish dehydrated skin beds.
                </p>
              </div>
            </div>

            {/* Jojoba Oil */}
            <div className="group relative rounded-lg overflow-hidden bg-brand-charcoal aspect-[3/4] shadow-md border border-brand-beige/25">
              <img 
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400" 
                alt="Jojoba Oil" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-forest/45 group-hover:bg-brand-forest/55 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white text-left space-y-2">
                <span className="text-[9px] text-brand-gold font-sans font-black tracking-widest uppercase bg-brand-charcoal/50 px-2 py-0.5 rounded-sm inline-block">Scalp Relief</span>
                <h3 className="font-editorial text-xl font-extrabold uppercase tracking-tight">Jojoba Oil</h3>
                <p className="text-xs text-brand-cream/90 leading-relaxed font-medium">
                  Closely mirrors raw human sebum to immediately treat post-braid tension and soothe severe itching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. LIFESTYLE BENTO STACK — SPA COMFORT AT HOME (HERO MATCH)
          ========================================================================= */}
      <section id="healthy-hair-root" className="relative w-full bg-[#FCFAF6] border-y border-brand-beige/25 py-16">
        
        {/* Beautiful wavy top divider to separate sections organically */}
        <div className="absolute inset-x-0 top-0 h-10 overflow-hidden pointer-events-none">
          <svg className="w-full h-full text-white fill-current" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path d="M0,40 C360,10 720,40 1080,10 L1440,40 L1440,0 L0,0 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
          
          <div className="lg:col-span-6 text-left space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-extrabold flex items-center gap-1.5">
              <BrandDroplet size={11} color="#dfaf37" />
              Clinical Spa System
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black text-brand-charcoal uppercase tracking-tight leading-tight">
              PRO-GRADE RESULTS. <br/>FROM YOUR OWN COUCH.
            </h2>
            <div className="w-16 h-[2px] bg-brand-gold"></div>
            <p className="text-sm text-[#5D536B] leading-relaxed font-semibold">
              We structure our Skin Talk Pedicure and Manicure collections with clear chronological numbers, helping you reproduce specialized clinical spa routines easily. Cleanse, deeply scrub dead heels using volcanic pumice elements, infuse rich nutrition, and seal nail cuticles perfectly.
            </p>
            
            <div className="space-y-4 pt-2 text-xs sm:text-sm text-brand-charcoal font-bold">
              <div className="flex items-center gap-3">
                <span className="bg-brand-gold/15 text-brand-gold w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black">1</span>
                <span className="text-[#5D536B] font-semibold">Mineral Salts completely relax tired, throbbing feet</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-brand-gold/15 text-brand-gold w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black">2</span>
                <span className="text-[#5D536B] font-semibold">Active Callus Creams dissolve dry skin within 10 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-brand-gold/15 text-brand-gold w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black">3</span>
                <span className="text-[#5D536B] font-semibold">Botanical Oils lock in hydration for long-term health</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={() => handleNavigate('pedicure')}
                className="px-6 py-3.5 bg-brand-forest text-white hover:bg-brand-sage transition-all text-[11px] tracking-widest uppercase font-black rounded-xs shadow-md cursor-pointer flex items-center gap-2"
              >
                Pedicure Systems
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => handleNavigate('manicure')}
                className="px-6 py-3.5 border-2 border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all text-[11px] tracking-widest uppercase font-black rounded-xs cursor-pointer flex items-center gap-2"
              >
                Manicure Systems
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-brand-beige/20 border border-brand-beige/35 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800" 
                alt="Pedicure and Manicure care" 
                className="w-full h-full object-cover filter brightness-[0.97]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. THE LUSH TRUST BADGES ROW — 100% BRAND MATCHING AESTHETIC
          ========================================================================= */}
      <section className="bg-[#FCFAF6] text-brand-charcoal py-12 border-y border-brand-beige/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl">🌿</div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">100% VEGAN FORMULAS</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl">🐇</div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">FIGHTING ANIMAL TESTING</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl">🥣</div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">FRESHLY HANDMADE</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl">🌱</div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">ECO-FRIENDLY BIO</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl">🤝</div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">DIRECT ETHICAL BUYING</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl">❤️</div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">MADE WITH LOVE IN GH</span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          8. THE VICESH GOLDEN DROPLET — THE ESSENCE OF OUR FORMULAS
          ========================================================================= */}
      <section id="golden-droplet-meaning" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FCFAF6] to-[#F5EFCF]/25 border border-brand-gold/30 rounded-sm p-8 sm:p-14 relative overflow-hidden text-center space-y-8 shadow-md">
          {/* Subtle repeating background pattern of brand droplets */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none flex flex-wrap gap-12 p-8 justify-center items-center">
            {[...Array(24)].map((_, i) => (
              <BrandDroplet key={i} size={44} color="#dfaf37" className="rotate-12 transform hover:scale-110 transition-transform duration-300" />
            ))}
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="flex justify-center">
              <div className="relative p-5 rounded-full bg-brand-gold/10 text-brand-gold shadow-sm">
                <BrandDroplet size={68} color="#dfaf37" />
              </div>
            </div>
            
            <span className="text-xs uppercase tracking-[0.25em] text-brand-forest font-black block">The Story of our Gold Droplet</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black text-brand-charcoal uppercase tracking-tight">
              The Essence of Every Drop
            </h2>
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-brand-gold/40"></div>
              <BrandDroplet size={14} color="#dfaf37" />
              <div className="h-[1px] w-8 bg-brand-gold/40"></div>
            </div>

            <p className="text-sm sm:text-base text-[#5D536B] leading-relaxed font-semibold">
              Our signature golden droplet pattern represents the precious unrefined cold-pressed oils at the heart of Vicesh Apothecary. Every drop is a pure, live concentration of botanical vitamins, bioactive fatty acids, and intense therapeutic nutrients.
            </p>
            <p className="text-xs text-[#5D536B]/80 leading-relaxed font-medium">
              We never dilute our active mixtures with cheap mineral base oils or synthetic parabens. Instead, every single drop delivers maximum botanical potency straight to your hair shafts, nail beds, and skin tissues.
            </p>
            
            <div className="pt-6 flex flex-wrap justify-center gap-6 text-left max-w-lg mx-auto border-t border-brand-beige/20">
              <div className="flex gap-2 items-center bg-white/60 px-3.5 py-2 rounded-xs border border-brand-beige/15">
                <BrandDroplet size={14} color="#dfaf37" />
                <span className="text-[10px] uppercase tracking-wider font-black text-brand-charcoal">Cold-Pressed Rosemary</span>
              </div>
              <div className="flex gap-2 items-center bg-white/60 px-3.5 py-2 rounded-xs border border-brand-beige/15">
                <BrandDroplet size={14} color="#dfaf37" />
                <span className="text-[10px] uppercase tracking-wider font-black text-brand-charcoal">Sweet Almond Elixir</span>
              </div>
              <div className="flex gap-2 items-center bg-white/60 px-3.5 py-2 rounded-xs border border-brand-beige/15">
                <BrandDroplet size={14} color="#dfaf37" />
                <span className="text-[10px] uppercase tracking-wider font-black text-brand-charcoal">Virgin Avocado Hydration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. BOTANICAL EXPERIENCES (TESTIMONIALS CAROUSEL)
          ========================================================================= */}
      <section id="testimonials-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-purple font-extrabold">True Customer Stories</span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-black text-[#222222] uppercase tracking-tight">Botanical Experiences</h2>
        
        <div className="bg-[#FCFAF6] border border-[#E5DFC4]/40 rounded-sm p-8 sm:p-14 relative shadow-md">
          <span className="absolute top-4 left-6 text-[#E5DFC4] text-8xl font-serif leading-none select-none">“</span>
          
          <div className="space-y-6 relative z-10">
            <div className="flex justify-center text-brand-gold gap-1">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            <p className="font-serif text-lg sm:text-xl md:text-2xl text-brand-charcoal italic font-medium leading-relaxed">
              {testimonials[activeTestimonial].quote}
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-brand-gold">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h4 className="font-editorial text-xs font-black uppercase tracking-wider text-brand-charcoal">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-[10px] text-[#5D536B] font-bold">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8 pt-4 border-t border-brand-beige/20">
            <button 
              onClick={handlePrevTestimonial}
              className="w-9 h-9 rounded-full border border-brand-beige/50 text-[#222222] hover:bg-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNextTestimonial}
              className="w-9 h-9 rounded-full border border-brand-beige/50 text-[#222222] hover:bg-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. WHOLESALE & BULK PARTNERSHIP
          ========================================================================= */}
      <section id="wholesale-enquiries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FCFAF6] text-brand-charcoal border border-brand-beige/25 rounded-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          
          <div className="lg:col-span-7 space-y-6 text-left z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-forest font-extrabold">Professional Partner Network</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black uppercase tracking-tight text-brand-charcoal">Wholesale purchases & Pricing</h2>
            <p className="text-sm text-brand-sage leading-relaxed font-medium">
              Are you a salon operator, specialized spa manager, beauty retailer, or cosmetic reseller across Accra, Winneba, or Swedru? We supply high-quality bulk orders with reliable 7-day courier delivery. Unlock priority volume pricing by connecting with our corporate desk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="https://wa.me/233595780477" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white transition-all text-xs tracking-widest uppercase font-black rounded-sm flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp Corporate Desk
              </a>
              <button 
                onClick={() => handleNavigate('contact')}
                className="px-8 py-4 bg-brand-forest text-white hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-black rounded-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Contact Corporate Office
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-brand-beige/25 rounded-sm p-8 space-y-4 text-left z-10 shadow-xs">
            <h3 className="font-editorial text-base font-black text-brand-forest border-b border-brand-beige/20 pb-2 uppercase tracking-wide">Wholesale Benefits</h3>
            <ul className="space-y-3.5 text-xs font-semibold text-brand-charcoal">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0" />
                <span>Specialized tiered pricing for certified resellers</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0" />
                <span>Raw active ingredients (no synthetic chemical fillers)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0" />
                <span>Reliable regional door-to-door transit within 7 days</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-forest shrink-0" />
                <span>Dedicated account manager support on WhatsApp</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* =========================================================================
          10. NEWSLETTER CIRCLE — LUXE CLEAN SIGNUP
          ========================================================================= */}
      <section id="newsletter-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FCFAF6] border border-[#E5DFC4]/50 rounded-sm p-8 sm:p-14 text-center space-y-6 shadow-md">
          <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mx-auto text-brand-purple">
            <Leaf className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-black text-brand-charcoal uppercase tracking-tight">JOIN THE BOTANICAL CIRCLE</h2>
            <p className="text-xs sm:text-sm text-[#5D536B] max-w-md mx-auto leading-relaxed">
              Sign up to receive the latest updates on freshly handmade West African recipes, scalp restoration guidelines, and botanical self-care wisdom.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-sm p-6 space-y-2">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
              <h4 className="font-editorial text-brand-charcoal font-black text-sm uppercase">Successfully Registered!</h4>
              <p className="text-xs text-[#5D536B]">Enjoy <strong className="text-brand-purple text-xs font-black">VICESH10</strong> for 10% off your next checkout!</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input 
                type="email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white border border-[#E5DFC4]/80 text-xs px-4 py-3.5 rounded-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple flex-1 font-semibold text-brand-charcoal"
                required
              />
              <button 
                type="submit"
                className="px-8 py-3.5 bg-[#222222] text-white hover:bg-brand-purple transition-all text-xs tracking-widest uppercase font-black rounded-sm cursor-pointer shrink-0"
              >
                Sign Up
              </button>
            </form>
          )}

          <span className="block text-[10px] text-[#5D536B]/60 font-semibold tracking-wide">
            🔒 Pure security. Zero spam. Unsubscribe with one click.
          </span>
        </div>
      </section>

    </div>
  );
};

// Simple rating star component
const StarIcon = () => (
  <svg className="w-4 h-4 fill-current text-brand-gold animate-pulse-slow" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
