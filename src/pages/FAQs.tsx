/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FAQItem } from '../types';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface FAQsProps {
  setCurrentPage: (page: string) => void;
}

export const FAQs: React.FC<FAQsProps> = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const data = await api.faqs.getAll();
        setFaqs(data);
      } catch (error) {
        console.error("Failed to load FAQs", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFaqs();
  }, []);

  // Group unique categories
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filtering logic
  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-brand-cream/80 text-sm">Loading FAQs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold block">Apothecary Help Desk</span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-cream uppercase">
          Frequently Answered
        </h1>
        <div className="w-12 h-[1.5px] bg-brand-gold mx-auto mt-2"></div>
        <p className="text-xs sm:text-sm text-brand-cream/80 font-light leading-relaxed">
          Unlock answers regarding cold-pressed ingredient storage, delivery regions across Ghana, international DHL shipping speeds, and Paystack payments.
        </p>
      </div>

      {/* Interactive Toolbar */}
      <div className="space-y-6">
        
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our help database..."
            className="w-full bg-brand-purple-dark border border-brand-cream/20 text-xs rounded-full px-5 py-3 pl-11 focus:outline-none focus:border-brand-sage text-brand-cream shadow-xs"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80 pointer-events-none" />
        </div>

        {/* Category Pill select selectors */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-forest text-brand-cream border-brand-forest shadow-xs'
                  : 'bg-brand-purple-dark text-brand-cream border-brand-cream/20 hover:border-brand-sage'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

      </div>

      {/* FAQ list Accordions */}
      <div className="space-y-4 text-left">
        {filteredFAQs.length === 0 ? (
          <div className="bg-brand-purple-dark border border-brand-cream/20 rounded-md p-10 text-center space-y-2">
            <HelpCircle className="w-10 h-10 text-brand-cream/80 mx-auto" />
            <h4 className="font-editorial text-lg font-semibold text-brand-cream">No matches found</h4>
            <p className="text-xs text-brand-cream/80 font-light">Try entering alternative keywords or expanding your active category tag filters.</p>
          </div>
        ) : (
          filteredFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-brand-purple-dark border border-brand-cream/20 rounded-md overflow-hidden transition-all duration-300 shadow-2xs"
              >
                {/* Trigger heading banner */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-5 sm:px-6 py-4 flex justify-between items-center text-left gap-4 font-editorial text-sm sm:text-base font-bold text-brand-cream hover:bg-brand-purple-dark/35 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand-cream/80 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-brand-cream/80 shrink-0" />
                  )}
                </button>

                {/* Answer content (collapsible) */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-brand-cream/80 font-light leading-relaxed border-t border-brand-cream/20 bg-brand-purple-dark/15">
                    <p className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-1.5">{faq.category}</p>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Call to actions footer */}
      <div className="bg-brand-purple-dark border border-brand-cream/20 rounded-md p-6 sm:p-10 text-center space-y-4 max-w-2xl mx-auto shadow-2xs">
        <h3 className="font-editorial text-xl font-bold text-brand-cream">Still Have Unanswered Inquiries?</h3>
        <p className="text-xs text-brand-cream/80 font-light leading-relaxed max-w-md mx-auto">
          Our helpful customer care desk is available on WhatsApp or through our help tickets to answer custom cosmetic questions or process special delivery requests.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all rounded-xs cursor-pointer shadow-xs"
          >
            Submit Help Ticket
          </button>
          <a
            href="https://wa.me/233595780477"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 border border-brand-forest text-brand-cream hover:bg-brand-purple-dark transition-all rounded-xs flex items-center justify-center gap-1.5"
          >
            <WhatsAppIcon className="w-4 h-4 text-brand-cream/80 fill-current" />
            WhatsApp Support Desk
          </a>
        </div>
      </div>

    </div>
  );
};
