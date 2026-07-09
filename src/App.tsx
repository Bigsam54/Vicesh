/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { FAQs } from './pages/FAQs';
import { Policies } from './pages/Policies';
import { NotFound } from './pages/NotFound';
import { CategoryPage } from './pages/CategoryPage';
import { QuickViewModal } from './components/QuickViewModal';
import { ArrowUp } from 'lucide-react';
import { Admin } from './pages/Admin';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to top when page changes & Update SEO Meta Tags
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });

    // SEO Dynamic Metadata Mapping
    const titleMap: Record<string, string> = {
      home: 'Vicesh Cosmetics | Authentic Eco-Friendly Hair & Skincare',
      shop: 'Shop Eco-Friendly Cosmetics | Vicesh Cosmetics',
      haircare: 'Organic Hair Care Collection | Vicesh Cosmetics',
      pedicure: 'Professional Pedicure Sets | Vicesh Cosmetics',
      manicure: 'Hydrating Manicure Care | Vicesh Cosmetics',
      about: 'Our Story & Brand Heritage | Vicesh Cosmetics',
      contact: 'Contact Vicesh Cosmetics | Wholesale & Support Desk',
      faqs: 'Frequently Answered Questions | Vicesh Cosmetics Help',
      cart: 'Your Shopping Cart | Vicesh Cosmetics',
      checkout: 'Secure Checkout | Vicesh Cosmetics'
    };

    const descMap: Record<string, string> = {
      home: 'Vicesh Cosmetics specializes in eco-friendly haircare and skincare formulated with unrefined essential oils and botanical ingredients to nourish, strengthen, and restore healthy beauty.',
      shop: 'Browse our complete catalog of organic beauty solutions, featuring active rosemary scalp growth serums and professional numbered manicure and pedicure spa collections.',
      haircare: 'Nourish hair follicles and accelerate growth with Vicesh Rosemary shampoos, deep conditioning Almond hair mayonnaise, and healing Jojoba scalp therapies.',
      pedicure: 'Experience clinical pedicure spa treatments at home. Step-by-step numbered soak salts, callus softening cream, hygiene sprays, and revitalizing tea tree lotions.',
      manicure: 'Repair parched nails and hydrate dry cuticles with sweet almond, cold-pressed lemon, and organic myrrh. Strengthen and restore natural skin brightness.',
      about: 'Learn about the unyielding pillars of care, ethical West African botanical sourcing, clean ingredients, and sustainable eco-friendly formulations behind Vicesh Ghana.',
      contact: 'Connect with Vicesh Cosmetics directly on Phone or WhatsApp at 0595780477, email viceshcompanyltd@gmail.com, or submit our official salon support ticket form.',
      faqs: 'Find detailed, helpful answers on organic ingredient storage, regional delivery across Accra, Winneba, Swedru, 14-day return policies, and wholesale orders.',
      cart: 'Review the botanical products in your cart. Check items before moving to our secure payment checkout.',
      checkout: 'Complete your purchase securely. Choose delivery within 3 working days for Accra, Winneba, Swedru, or physical Makola pickup.'
    };

    let baseKey = currentPage;
    if (currentPage.startsWith('product:')) baseKey = 'shop';
    if (currentPage.startsWith('account')) baseKey = 'home';
    if (currentPage.startsWith('policies')) baseKey = 'faqs';

    const pageTitle = titleMap[baseKey] || 'Vicesh Cosmetics | West African Organic Beauty';
    const pageDesc = descMap[baseKey] || 'Vicesh Cosmetics specializes in eco-friendly West African haircare and skincare products formulated with essential oils and botanical ingredients.';

    // Apply document title
    document.title = pageTitle;

    // Apply description meta tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);

    // Apply Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', pageTitle);

    // Apply Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', pageDesc);

    // Apply Open Graph Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    // Apply Open Graph Site Name
    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement('meta');
      ogSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute('content', 'Vicesh Cosmetics');

  }, [currentPage]);

  // Back to top appearance hook
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Page Component based on custom state router
  const renderPage = () => {
    if (currentPage === 'admin') {
      return <Admin setCurrentPage={setCurrentPage} />;
    }

    // Exact match
    if (currentPage === 'home') {
      return (
        <Home 
          setCurrentPage={setCurrentPage} 
          setSelectedProductId={setSelectedProductId} 
        />
      );
    }
    if (currentPage === 'shop') {
      return (
        <Shop 
          initialCategory="all" 
          setCurrentPage={setCurrentPage} 
          setSelectedProductId={setSelectedProductId} 
        />
      );
    }
    if (['haircare', 'pedicure', 'manicure'].includes(currentPage)) {
      return (
        <CategoryPage 
          categoryId={currentPage} 
          setCurrentPage={setCurrentPage} 
          setSelectedProductId={setSelectedProductId} 
        />
      );
    }
    if (currentPage === 'cart') {
      return (
        <Cart 
          setCurrentPage={setCurrentPage} 
          setSelectedProductId={setSelectedProductId} 
        />
      );
    }
    if (currentPage === 'checkout') {
      return <Checkout setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === 'about') {
      return <AboutUs setCurrentPage={setCurrentPage} setSelectedProductId={setSelectedProductId} />;
    }
    if (currentPage === 'contact') {
      return <Contact />;
    }
    if (currentPage === 'faqs') {
      return <FAQs setCurrentPage={setCurrentPage} />;
    }

    // Dynamic Category Routing (handles any category id clicked from Shop)
    if (currentPage.startsWith('category:')) {
      const parts = currentPage.split(':');
      const categoryId = parts[1] || 'all';
      return (
        <CategoryPage 
          categoryId={categoryId} 
          setCurrentPage={setCurrentPage} 
          setSelectedProductId={setSelectedProductId} 
        />
      );
    }

    // Dynamic Product Detail Routing
    if (currentPage.startsWith('product:')) {
      const parts = currentPage.split(':');
      const id = parts[1] || selectedProductId;
      return (
        <ProductDetail 
          productId={id} 
          setCurrentPage={setCurrentPage} 
          setSelectedProductId={setSelectedProductId} 
        />
      );
    }

    // Dynamic Account Portal Routing
    if (currentPage.startsWith('account')) {
      const parts = currentPage.split(':');
      const tab = parts[1] || 'overview';
      return (
        <Account 
          initialTab={tab} 
          setCurrentPage={setCurrentPage} 
          setSelectedProductId={setSelectedProductId} 
        />
      );
    }

    // Dynamic Policy Documentation Routing
    if (currentPage.startsWith('policies')) {
      const parts = currentPage.split(':');
      const policyType = parts[1] || 'shipping';
      return <Policies initialPolicy={policyType} />;
    }

    // Default Fallback
    return <NotFound setCurrentPage={setCurrentPage} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-purple-dark text-brand-cream selection:bg-brand-sage/25 selection:text-brand-cream relative">
      
      {/* Announcement Banner Bar */}
      {currentPage !== 'admin' && (
        <div id="vicesh-announcement-bar" className="bg-brand-forest text-brand-cream text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] py-2.5 px-4 text-center border-b border-brand-gold/15 select-none z-50">
          🍃 Complimentary Shipping on all Ghana orders above $100 equivalent — Hand-crafted Organic Botanicals
        </div>
      )}

      {/* Main Header navigation */}
      {currentPage !== 'admin' && (
        <Header 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          setSelectedProductId={setSelectedProductId} 
        />
      )}

      {/* Dynamic Main Body Content Area */}
      <main id="vicesh-main-canvas" className={`flex-grow ${currentPage === 'admin' ? '' : 'pt-10 sm:pt-16 pb-16'}`}>
        {renderPage()}
      </main>

      {/* Premium editorial footer */}
      {currentPage !== 'admin' && (
        <Footer setCurrentPage={setCurrentPage} />
      )}

      {/* Embedded Global Modal overlays */}
      <QuickViewModal 
        setCurrentPage={setCurrentPage} 
        setSelectedProductId={setSelectedProductId} 
      />

      {/* Back To Top Action */}
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-6 right-6 bg-brand-forest hover:bg-brand-sage text-brand-cream border border-brand-gold/15 rounded-full w-11 h-11 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hover:scale-105 z-40"
          title="Return to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
