/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

interface NotFoundProps {
  setCurrentPage: (page: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ setCurrentPage }) => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 -mt-16 sm:-mt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dja3u7oha/image/upload/v1783543197/Mother_helping_daughter_with_hair_202607082034_arawam.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-charcoal/70 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-2xl bg-brand-purple/40 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-10 sm:p-16 mx-auto text-center space-y-8 shadow-luxury">
        <div className="w-20 h-20 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center mx-auto text-brand-gold shadow-sm">
          <Leaf className="w-10 h-10" />
        </div>
        
        <div className="space-y-4">
          <h1 className="font-editorial text-7xl font-bold text-brand-gold drop-shadow-md">404</h1>
          <h2 className="font-editorial text-3xl font-bold text-brand-white">We Couldn't Find That Page</h2>
          <p className="text-sm md:text-base text-brand-white/90 max-w-md mx-auto leading-relaxed font-light">
            It looks like the page you are searching for has been moved or no longer exists. Let's get you back to discovering our organic, nourishing beauty collections.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-brand-gold text-brand-purple hover:bg-brand-white transition-all text-sm tracking-widest uppercase font-bold rounded-full shadow-md hover:shadow-luxury hover:-translate-y-0.5"
          >
            Go Back Home
          </button>
          <button
            onClick={() => {
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold/10 transition-all text-sm tracking-widest uppercase font-bold rounded-full flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            Explore Shop
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
