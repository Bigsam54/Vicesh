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
    <footer id="vicesh-footer" className="bg-brand-offwhite text-brand-charcoal border-t border-brand-beige/25 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-brand-beige/20 pb-16">
          
          {/* Brand Info & Story */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src="https://res.cloudinary.com/dja3u7oha/image/upload/v1782844746/VIKESH_Variation_vzqsnb.png" 
                alt="Apothecary Logo" 
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs leading-relaxed text-brand-sage font-light max-w-sm">
              We handcraft premium, organic self-care formulas infused with wild-harvested African botanicals and therapeutic essential oils, directly supporting women-led agricultural collectives in Northern Ghana.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-brand-forest hover:text-brand-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-brand-forest hover:text-brand-gold transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Nav Collections */}
          <div className="space-y-5">
            <h3 className="font-editorial text-base font-semibold text-brand-forest tracking-wider">
              Botanical Collections
            </h3>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-medium font-sans text-brand-sage">
              <li>
                <button onClick={() => handleNavigate('haircare')} className="hover:text-brand-gold transition-colors text-left">
                  Hair Care Solutions
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('pedicure')} className="hover:text-brand-gold transition-colors text-left">
                  Premium Pedicure
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('manicure')} className="hover:text-brand-gold transition-colors text-left">
                  Nourishing Manicure
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('shop')} className="hover:text-brand-gold transition-colors text-left">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('about')} className="hover:text-brand-gold transition-colors text-left text-brand-forest font-semibold">
                  Our Botanical Story
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div className="space-y-5">
            <h3 className="font-editorial text-base font-semibold text-brand-forest tracking-wider">
              Customer Sanctuary
            </h3>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-medium font-sans text-brand-sage">
              <li>
                <button onClick={() => handleNavigate('contact')} className="hover:text-brand-gold transition-colors text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('faqs')} className="hover:text-brand-gold transition-colors text-left">
                  Frequently FAQs
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('policies', 'shipping')} className="hover:text-brand-gold transition-colors text-left">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('policies', 'returns')} className="hover:text-brand-gold transition-colors text-left">
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('policies', 'privacy')} className="hover:text-brand-gold transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('policies', 'terms')} className="hover:text-brand-gold transition-colors text-left">
                  Terms & Conditions
                </button>
              </li>
              <li className="pt-2 border-t border-brand-beige/20">
                <div className="text-[10px] normal-case text-brand-sage font-light leading-snug">
                  <span className="font-bold text-brand-forest uppercase tracking-wider block text-[8px] mb-1">Brand Compliance</span>
                  For design feedback or brand guidelines questions, contact our <button onClick={() => handleNavigate('contact')} className="underline hover:text-brand-gold font-bold">Communications Manager</button>.
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-5">
            <h3 className="font-editorial text-base font-semibold text-brand-forest tracking-wider">
              The Botanical Circle
            </h3>
            <p className="text-xs text-brand-sage font-light leading-relaxed">
              Subscribe to receive curated beauty wisdom, herbal wellness practices, and exclusive access to new seasonal collections.
            </p>

            {subscribed ? (
              <div className="bg-brand-forest/5 border border-brand-forest/20 rounded-xs p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-brand-forest uppercase tracking-wider">You are enrolled!</p>
                  <p className="text-[10px] text-brand-sage mt-1 leading-normal font-light">Welcome to the inner circle. Your 10% enrollment discount code will arrive shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex border-b border-brand-beige/40 pb-2 focus-within:border-brand-gold transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-transparent text-xs w-full focus:outline-none placeholder-brand-sage/50 pr-4 text-brand-charcoal"
                    required
                  />
                  <button type="submit" className="text-brand-forest hover:text-brand-gold transition-colors" aria-label="Subscribe">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="block text-[10px] text-brand-sage/60 font-light font-sans">
                  By subscribing, you agree to receive promotional letters. Opt out anytime.
                </span>
              </form>
            )}

            {/* Ghana Presence Details */}
            <div className="pt-4 flex flex-col space-y-2 text-xs font-light text-brand-sage text-left">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-forest shrink-0 mt-0.5" />
                <span>CL-0635-9738, Oguaakrom, Winneba Road</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-forest shrink-0" />
                <span>+233 (0) 59 578 0477</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-forest shrink-0" />
                <span>viceshcompanyltd@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom (Accreditation & Disclaimer) */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-sage tracking-wider font-sans space-y-4 md:space-y-0 uppercase font-medium">
          <div className="flex flex-wrap justify-center gap-4 text-center">
            <span>© 2026 VICESH COSMETICS. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline">|</span>
            <span>ECO-CONSCIOUS BEAUTY HUB</span>
            <span className="hidden md:inline">|</span>
            <span>MADE WITH LOVE IN GHANA</span>
          </div>
          <div className="flex items-center gap-2 bg-brand-forest/5 px-3 py-1.5 rounded-full border border-brand-forest/10 text-brand-forest">
            <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse"></span>
            <span>Secure SSL Encrypted Checkout</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
