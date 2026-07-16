/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  setPolicyTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, setPolicyTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setSubscribed(true);
    setEmail('');
  };

  const handleNavigate = (page: string, policyTabName?: string) => {
    setCurrentPage(page);
    if (policyTabName && setPolicyTab) {
      setPolicyTab(policyTabName);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="vicesh-footer" className="bg-brand-purple text-brand-white pt-24 pb-12 relative overflow-hidden">
      {/* Brand Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dja3u7oha/image/upload/v1783194050/Pattern_3_pljtnl.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transform: 'scale(1.8)',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-b border-brand-white/10 pb-16">
          
          {/* Brand Info & Story */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center">
              <h2 className="font-editorial text-3xl font-bold tracking-widest text-brand-white whitespace-nowrap">
                Vicesh Cosmetics
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-brand-white/80 font-sans font-light">
              We handcraft authentic, organic self-care formulas infused with wild-harvested African botanicals and therapeutic essential oils, directly supporting women-led agricultural collectives in Ghana.
            </p>
            <div className="flex space-x-5 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-brand-white/80 hover:text-brand-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5 stroke-[1.5]" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-brand-white/80 hover:text-brand-gold transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Quick Nav Collections */}
          <div className="space-y-6">
            <h3 className="font-editorial text-xl font-medium text-brand-white italic">
              Botanical Collections
            </h3>
            <ul className="space-y-4 text-sm font-sans font-light text-brand-white/80">
              <li>
                <button onClick={() => handleNavigate('haircare')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Hair Care Solutions
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('pedicure')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Authentic Pedicure
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('manicure')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Nourishing Manicure
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('shop')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('about')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left text-brand-white font-medium">
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div className="space-y-6">
            <h3 className="font-editorial text-xl font-medium text-brand-white italic">
              Customer Sanctuary
            </h3>
            <ul className="space-y-4 text-sm font-sans font-light text-brand-white/80">
              <li>
                <button onClick={() => handleNavigate('contact')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('faqs')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('policies', 'shipping')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('policies', 'returns')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('policies', 'privacy')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('policies', 'terms')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('admin')} className="hover:text-brand-gold hover:translate-x-1 transition-all text-left font-semibold text-brand-white">
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-6">
            <h3 className="font-editorial text-xl font-medium text-brand-white italic">
              The Botanical Circle
            </h3>
            <p className="text-sm text-brand-white/80 font-sans font-light leading-relaxed">
              Subscribe to receive curated beauty wisdom, herbal wellness practices, and exclusive access to new seasonal collections.
            </p>

            {subscribed ? (
              <div className="bg-brand-white/5 border border-brand-gold/30 rounded-md p-5 flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-white">You are enrolled!</p>
                  <p className="text-xs text-brand-white/70 mt-1.5 leading-relaxed font-light">Welcome to the inner circle. Your 10% enrollment discount code will arrive shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3 mt-2">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-brand-gold/10 border-2 border-brand-gold rounded-full text-sm w-full font-sans focus:outline-none focus:bg-brand-gold/20 text-brand-gold placeholder-brand-gold/60 pl-5 pr-12 py-3 transition-colors"
                    required
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-brand-gold text-brand-purple hover:bg-white transition-colors" aria-label="Subscribe">
                    <ArrowRight className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </form>
            )}

            {/* Ghana Presence Details */}
            <div className="pt-6 flex flex-col space-y-3 text-sm font-light text-brand-white/80 text-left">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 stroke-[1.5]" />
                <span>CL-0635-9738, Oguaakrom, Winneba Road</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0 stroke-[1.5]" />
                <span>+233 (0) 59 578 0477</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0 stroke-[1.5]" />
                <span>viceshcompanyltd@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom (Accreditation & Disclaimer) */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-white/60 font-sans space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center gap-4 text-center">
            <span>&copy; {new Date().getFullYear()} Vicesh Cosmetics. All Rights Reserved.</span>
            <span className="hidden md:inline text-brand-white/30">|</span>
            <span>Made with Care in Ghana</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
