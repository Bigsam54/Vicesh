/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface NotFoundProps {
  setCurrentPage: (page: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ setCurrentPage }) => {
  return (
    <div className="max-w-2xl bg-brand-offwhite border border-brand-beige/25 rounded-md p-10 sm:p-16 mx-auto text-center space-y-6 my-16 shadow-xs">
      <div className="w-16 h-16 rounded-full bg-brand-sage/10 border-2 border-brand-sage flex items-center justify-center mx-auto text-brand-sage">
        <AlertTriangle className="w-8 h-8" />
      </div>
      
      <div className="space-y-2">
        <h1 className="font-editorial text-4xl font-bold text-brand-forest">404</h1>
        <h2 className="font-editorial text-2xl font-bold text-brand-forest">Lost in the Woods</h2>
        <p className="text-xs text-brand-sage max-w-sm mx-auto leading-relaxed">
          The custom apothecary route or botanical page you are seeking has been relocated or returned to nature.
        </p>
      </div>

      <div className="pt-4 flex justify-center gap-3">
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer flex items-center gap-1.5"
        >
          Go Back Home
        </button>
        <button
          onClick={() => {
            setCurrentPage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 border border-brand-forest text-brand-forest hover:bg-brand-cream transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer flex items-center gap-1.5"
        >
          Explore Shop
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
