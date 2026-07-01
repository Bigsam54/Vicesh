/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Award, Heart, Shield, Globe } from 'lucide-react';
import { BrandDroplet } from '../components/BrandDroplet';

interface AboutUsProps {
  setCurrentPage: (page: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ setCurrentPage }) => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-white text-[#222222] pb-12">
      
      {/* Immersive Hero Section tailored to About Us */}
      <section id="about-hero-section" className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] bg-[#FCFAF6] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600" 
            alt="Vicesh Sourcing Heritage" 
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
                    VICESH STORY & HERITAGE <BrandDroplet size={24} color="#dfaf37" className="inline-block shrink-0 animate-pulse-slow" />
                  </h2>
                </div>
                
                {/* Sublinks */}
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] sm:text-xs font-bold text-brand-purple tracking-wider">
                  <button 
                    onClick={() => handleScrollTo('heritage-section')}
                    className="hover:text-brand-gold border-b-2 border-transparent hover:border-brand-gold pb-0.5 transition-all duration-200 cursor-pointer"
                  >
                    The Heritage
                  </button>
                  <button 
                    onClick={() => handleScrollTo('mission-section')}
                    className="hover:text-brand-gold border-b-2 border-transparent hover:border-brand-gold pb-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Our Sourcing Mission
                  </button>
                  <button 
                    onClick={() => handleScrollTo('pillars-section')}
                    className="hover:text-brand-gold border-b-2 border-transparent hover:border-brand-gold pb-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Pillars of Care
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentPage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-brand-gold border-b-2 border-transparent hover:border-brand-gold pb-0.5 transition-all duration-200 cursor-pointer"
                  >
                    Back to Apothecary
                  </button>
                </div>
              </div>

              {/* Right Column: Mini sub-title description */}
              <div className="max-w-md text-left md:text-right md:mb-1">
                <p className="text-[11px] sm:text-xs text-[#5D536B] font-semibold leading-relaxed">
                  Carefully balancing rich unrefined West African botanical ingredients with modern cosmetic science to heal, nourish and protect your hair and skin.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Editorial Header Section */}
      <div id="heritage-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        <div className="lg:col-span-7 text-left space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-sage font-bold">The Heritage of Organic Purity</span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-brand-forest uppercase leading-tight">
            Vicesh Cosmetics <br/>Story & Craft
          </h1>
          <div className="w-16 h-[2px] bg-brand-gold"></div>
          <p className="text-sm sm:text-base text-brand-sage font-light leading-relaxed max-w-2xl">
            Vicesh Cosmetics specializes in eco-friendly haircare and skincare products formulated with premium essential oils and botanical ingredients. Our solutions are carefully engineered to nourish, strengthen, protect, and restore healthy hair and skin while promoting overall wellness and self-care.
          </p>
        </div>
        
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-md overflow-hidden bg-brand-offwhite border border-brand-beige/25 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600" 
              alt="Organic Vicesh botanicals" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-brand-forest border border-brand-gold/15 text-brand-cream px-6 py-4 rounded-xs shadow-lg text-left hidden sm:block">
            <span className="font-editorial text-2xl font-bold text-brand-gold">100%</span>
            <p className="text-[10px] uppercase tracking-widest font-semibold mt-0.5">Eco-Friendly Botanicals</p>
          </div>
        </div>
      </div>

      {/* Mission Statement Banner */}
      <div id="mission-section" className="bg-brand-offwhite border border-brand-beige/25 rounded-md p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-3xs scroll-mt-24">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">Our Core Mission</span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-brand-forest uppercase">
          Empowering Health & Hair from the Roots
        </h2>
        <p className="text-sm sm:text-base text-brand-sage font-light leading-relaxed max-w-2xl mx-auto">
          "Our mission is to formulate safe, high-efficacy, and eco-certified cosmetics that honor the delicate physiology of hair, skin, and scalp. By bridging rich West African botanical ingredients with precise modern cosmetic science, we deliver deep nourishment, restorative balance, and healthy skin and hair without compromising our planet."
        </p>
      </div>

      {/* Brand Values Grid */}
      <div id="pillars-section" className="space-y-8 border-t border-brand-beige/20 pt-16 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-sage font-bold">Our Pillars</span>
          <h2 className="font-editorial text-3xl font-bold text-brand-forest">Pillars of Care</h2>
          <p className="text-xs sm:text-sm text-brand-sage font-light">We hold ourselves to a standard of absolute transparency, clean formulation, and sustainable impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Eco-Friendly Formulations',
              description: 'We prioritize raw, biodegradable botanical materials free from harsh chemical foaming agents, sulfates, parabens, phthalates, and synthetic silicones.',
              icon: Leaf
            },
            {
              title: 'Commitment to Quality',
              description: 'Every batch of our Rosemary shampoo, Avocado conditioners, and cuticle treatments is carefully inspected to maintain active nutrient profiles and absolute safety.',
              icon: Shield
            },
            {
              title: 'Ethical Sourcing & Impact',
              description: 'We ethically source unrefined Ghanaian oils and botanical extracts, directly supporting small-holder organic growers and local communities.',
              icon: Globe
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-brand-offwhite border border-brand-beige/25 p-6 sm:p-8 rounded-md text-left space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-brand-sage/10 border border-brand-sage/25 flex items-center justify-center text-brand-forest">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-brand-forest">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-brand-sage font-light leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Heritage Narrative Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-brand-cream border border-brand-beige/20 rounded-md p-8 sm:p-12 text-left">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-brand-sage font-bold">The Craftsmanship</span>
          <h3 className="font-editorial text-3xl font-bold text-brand-forest">Nourishment, Strength & Scalp Restoration</h3>
          <p className="text-xs sm:text-sm text-brand-sage font-light leading-relaxed">
            At Vicesh Cosmetics, we believe that healthy hair and skin start with clean nourishment. Traditional cosmetics often rely on heavy coatings and silicones that block respiration and lead to long-term brittleness. Instead, we formulate using nutrient-rich oils like Jojoba, Avocado, Sweet Almond, and Rosemary to repair structural barriers from within.
          </p>
          <p className="text-xs sm:text-sm text-brand-sage font-light leading-relaxed">
            Whether it is our sequential 6-step pedicure and manicure sets or our concentrated rosemary scalp growth therapies, each recipe is developed to satisfy professional standards while maintaining a deeply relaxing, therapeutic home experience.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-xs overflow-hidden border border-brand-beige/30">
            <img 
              src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400" 
              alt="Essential oils" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-square rounded-xs overflow-hidden border border-brand-beige/30 mt-8">
            <img 
              src="https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?auto=format&fit=crop&q=80&w=400" 
              alt="Botanical formulation" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Brand Identity & Guidelines Section */}
      <div className="border-t border-brand-beige/25 pt-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-sage font-bold">Design Standards</span>
          <h2 className="font-editorial text-3xl font-bold text-brand-forest uppercase">Vicesh Brand Guidelines</h2>
          <p className="text-xs sm:text-sm text-brand-sage font-light">
            Our visual language is a direct reflection of our luxury botanical ethos. Every typeface, color palette value, and graphic pattern is carefully designed to communicate organic science and premium health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Logo Symbol Explanation */}
          <div className="bg-brand-offwhite border border-brand-beige/25 rounded-md p-6 space-y-4 relative overflow-hidden flex flex-col justify-between text-left">
            {/* watermark droplet */}
            <div className="absolute right-[-10px] top-[-10px] w-24 h-24 text-brand-gold/10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 8 C50 8 82 46 82 68 C82 85.67 67.67 100 50 100 C32.33 100 18 85.67 18 68 C18 46 50 8 50 8 Z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">The Droplet Logo</span>
              <h4 className="font-editorial text-lg font-bold text-brand-forest">The Serif "V" & Oil Droplet</h4>
              <p className="text-xs text-brand-sage font-light leading-relaxed">
                The VICESH logo features a traditional serif “V” combined elegantly with an oil droplet. The “V” is set in <strong>Playfair Display</strong> to project luxury and classic heritage, while the enclosing droplet represents cosmetic oils, deep hydration, health, and natural beauty.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-brand-beige/20 text-[10px] uppercase font-bold text-brand-forest">
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
              Minimalist & Striking
            </div>
          </div>

          {/* Typography Explanation */}
          <div className="bg-brand-offwhite border border-brand-beige/25 rounded-md p-6 space-y-4 flex flex-col justify-between text-left">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">Typography</span>
              <h4 className="font-editorial text-lg font-bold text-brand-forest">Typeface Hierarchy</h4>
              <p className="text-xs text-brand-sage font-light leading-relaxed">
                Our primary display typeface is <span className="font-serif font-bold">Playfair Display</span>, chosen to convey sophistication, luxury editorial rhythm, and beauty trust. Our secondary typeface is <span className="font-rounded font-bold text-brand-forest">Arial Rounded</span>, lending an organic, friendly, accessible yet modern aesthetic.
              </p>
            </div>
            <div className="pt-4 border-t border-brand-beige/20">
              <div className="text-[10px] text-brand-sage leading-relaxed">
                <p className="font-semibold text-brand-forest">Primary: Playfair Display</p>
                <p className="font-rounded font-semibold text-brand-forest">Secondary: Arial Rounded</p>
              </div>
            </div>
          </div>

          {/* Color Palette Explanation */}
          <div className="bg-brand-offwhite border border-brand-beige/25 rounded-md p-6 space-y-4 flex flex-col justify-between text-left">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">Colorway Values</span>
              <h4 className="font-editorial text-lg font-bold text-brand-forest">Luxury Color Palette</h4>
              <p className="text-xs text-brand-sage font-light leading-relaxed">
                The VICESH brand palette is designed with deep royal contrast and soft organic backdrops to signify our premium botanical positioning:
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-brand-beige/20 text-[9px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-xs bg-[#8b008b] border border-black/10 shrink-0"></span>
                <span className="font-semibold text-brand-forest">Dark Magenta (#8b008b)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-xs bg-[#fdfffa] border border-black/10 shrink-0"></span>
                <span className="text-brand-sage">Off-White (#fdfffa)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-xs bg-[#ffffee] border border-black/10 shrink-0"></span>
                <span className="text-brand-sage">Cream (#ffffee)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-xs bg-[#dfaf37] border border-black/10 shrink-0"></span>
                <span className="text-brand-gold font-bold">Golden Yellow (#dfaf37)</span>
              </div>
            </div>
          </div>

          {/* Brand Patterns & Droplet Motif */}
          <div className="bg-brand-offwhite border border-brand-beige/25 rounded-md p-6 space-y-4 relative overflow-hidden flex flex-col justify-between text-left">
            {/* brand pattern sample */}
            <div className="absolute inset-0 brand-pattern-light opacity-[0.22] pointer-events-none rounded-md"></div>
            <div className="space-y-2 z-10 relative">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">Visual Devices</span>
              <h4 className="font-editorial text-lg font-bold text-brand-forest">Patterns & Motifs</h4>
              <p className="text-xs text-brand-sage font-light leading-relaxed">
                We utilize intricate organic patterns to differentiate our hair care, pedicure, and manicure product collections. These brand patterns must always be applied with an opacity range of 20% to 80% to maintain readability and elegant breathing room.
              </p>
            </div>
            <div className="pt-4 border-t border-brand-beige/20 z-10 relative text-[10px] text-brand-sage leading-normal">
              <p>🌱 Scalp / Hair: Dots Pattern (35% opacity)</p>
              <p>🌸 Feet / Hands: Wave Pattern (25% opacity)</p>
            </div>
          </div>

        </div>

        {/* Stakeholder Policy Banner */}
        <div className="bg-brand-forest text-brand-cream border border-brand-gold/25 rounded-md p-6 sm:p-10 text-left relative overflow-hidden">
          <div className="absolute right-[-30px] bottom-[-30px] w-48 h-48 text-brand-gold/10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 8 C50 8 82 46 82 68 C82 85.67 67.67 100 50 100 C32.33 100 18 85.67 18 68 C18 46 50 8 50 8 Z" />
            </svg>
          </div>
          <div className="max-w-3xl space-y-4 z-10 relative">
            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Brand Guidelines Advisory</span>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold">Cohesive Brand Alignment</h3>
            <p className="text-xs sm:text-sm text-brand-cream/80 font-light leading-relaxed">
              These visual and editorial guidelines represent the core pillars of VICESH luxury apothecary. Stakeholders, graphic artists, and digital content creators must apply these principles consistently across all printed and digital communications.
            </p>
            <p className="text-xs text-brand-cream/90">
              If additional design guidance is required or improvements are suggested, stakeholders should contact the <strong className="text-white">VICESH Communications Manager</strong> at <span className="font-semibold text-brand-gold">brand@vicesh.com</span> or submit an inquiry on our contact page.
            </p>
          </div>
        </div>
      </div>

    </div>

  </div>
  );
};
