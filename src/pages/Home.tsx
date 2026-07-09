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
    <div className="bg-brand-purple min-h-screen">
      
      {/* =========================================================================
          1. IMMERSIVE HERO SECTION
          ========================================================================= */}
      <section id="hero-section" className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] bg-brand-purple overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dja3u7oha/image/upload/v1783543197/Woman_holding_cosmetic_product_2K_202607082034_isptot.jpg" 
            alt="Vicesh Fresh Botanical Care" 
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105 transform scale-105 opacity-100"
          />
          {/* Elegant dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent"></div>
        </div>

        {/* Bottom wave overlay and content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end">
          
          {/* Beautiful organic wave shape */}
          <svg 
            className="w-full h-[60px] sm:h-[80px] md:h-[120px] -mb-[1px] text-brand-purple fill-current drop-shadow-[0_-10px_20px_rgba(223,175,55,0.1)]" 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,70 C360,15 720,110 1080,85 C1260,72 1380,78 1440,65 L1440,120 L0,120 Z" />
          </svg>

          {/* Bright bar content area */}
          <div className="bg-brand-purple text-brand-cream pt-4 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 border-b border-brand-cream/10 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
              
              {/* Left Column */}
              <div className="space-y-5 text-left">
                <div className="flex items-center gap-3">
                  <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-brand-cream font-medium select-none">
                    Fresh Botanical Care
                  </h2>
                </div>
                
                {/* Sublinks */}
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-sans font-medium text-brand-cream/80">
                  <button 
                    onClick={() => handleNavigate('haircare')} 
                    className="relative py-1 group hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    Hair & Scalp Care
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </button>
                  <button 
                    onClick={() => handleNavigate('pedicure')} 
                    className="relative py-1 group hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    Skin Talk Pedicure
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </button>
                  <button 
                    onClick={() => handleNavigate('manicure')} 
                    className="relative py-1 group hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    Nail & Manicure Care
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </button>
                  <button 
                    onClick={() => handleNavigate('shop')} 
                    className="relative py-1 group hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    Botanical Apothecary
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </button>
                </div>
              </div>

              {/* Right Column: CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 md:mb-2 relative z-10">
                <button 
                  onClick={() => handleNavigate('shop')}
                  className="btn-primary"
                >
                  Explore Collections
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button 
                  onClick={() => handleNavigate('about')}
                  className="btn-secondary"
                >
                  Our Story
                </button>
              </div>

            </div>
          </div>

          {/* Decorative Floating Botanicals removed per user request */}

        </div>
      </section>

    </div>
  );
};
