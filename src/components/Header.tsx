/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { BrandDroplet } from './BrandDroplet';
import { Search, Heart, User, ShoppingBag, Menu, X, Trash2, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
  setPolicyTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  setCurrentPage, 
  setSelectedProductId,
  setPolicyTab
}) => {
  const { 
    cart, 
    wishlist, 
    currentUser, 
    updateCartQuantity, 
    removeFromCart, 
    getCartSubtotal, 
    getCartTotal,
    getShippingCost,
    products,
    openQuickView
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Track scroll position for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync search results
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = products.filter(
      p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keyIngredients.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setSearchResults(filtered);
  }, [searchQuery, products]);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchItemClick = (product: Product) => {
    setSelectedProductId(product.id);
    setCurrentPage(`product:${product.id}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Navigation Header */}
      <header 
        id="vicesh-header"
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-brand-beige/10' 
            : 'bg-brand-offwhite py-4 sm:py-5 border-b border-brand-beige/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left/Center: Bold Logo + Clean Links */}
          <div className="flex items-center gap-8 md:gap-10">
            {/* Logo: Custom Droplet Image */}
            <button 
              id="brand-logo-btn"
              onClick={() => handleNavigate('home')} 
              className="group focus:outline-none cursor-pointer flex items-center transition-all duration-300 hover:scale-[1.05]"
            >
              <img 
                src="https://res.cloudinary.com/dja3u7oha/image/upload/v1782844746/VIKESH_Variation_vzqsnb.png" 
                alt="Apothecary Logo" 
                className="h-14 w-auto sm:h-20 object-contain py-1"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Editorial Navigation Links (Desktop Only) - simplified to Products and Our Story */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm tracking-widest uppercase font-sans font-bold text-brand-forest">
              <button 
                id="nav-shop"
                onClick={() => handleNavigate('shop')}
                className={`hover:text-brand-gold transition-colors cursor-pointer relative py-1 ${currentPage === 'shop' ? 'text-brand-gold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-gold' : ''}`}
              >
                Products
              </button>
              <button 
                id="nav-about"
                onClick={() => handleNavigate('about')}
                className={`hover:text-brand-gold transition-colors cursor-pointer relative py-1 ${currentPage === 'about' ? 'text-brand-gold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-gold' : ''}`}
              >
                Our Story
              </button>
            </nav>
          </div>

          {/* Center-Right: Pill-shaped Search Bar, perfectly matching Lush screenshot */}
          <div className="hidden md:block flex-1 max-w-sm mx-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-brand-cream/60 text-brand-forest border border-brand-beige/35 placeholder-brand-sage text-sm rounded-full py-2.5 pl-5 pr-12 hover:bg-brand-cream/80 focus:bg-white focus:text-brand-charcoal focus:placeholder-brand-sage focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all duration-200"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-sage pointer-events-none group-focus-within:text-brand-purple" />
            </div>
          </div>

          {/* Right Side: Utility Icons (Account, Wishlist, Cart, Mobile Menu) */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-brand-forest">
            
            {/* Account Button (with friendly smile style highlight) */}
            <button 
              id="header-account-btn"
              onClick={() => handleNavigate('account')}
              className={`hover:text-brand-gold transition-colors p-2 relative ${currentPage.startsWith('account') ? 'text-brand-gold' : ''}`}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-brand-gold border-2 border-brand-purple"></span>
              )}
            </button>

            {/* Wishlist Button - Desktop Only */}
            <button 
              id="header-wishlist-btn"
              onClick={() => {
                if (currentUser) {
                  handleNavigate('account:wishlist');
                } else {
                  handleNavigate('account'); // force login
                }
              }}
              className="hidden md:flex hover:text-brand-gold transition-colors p-2 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gold text-brand-charcoal text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold font-sans">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Slide-out Toggle */}
            <button 
              id="header-cart-btn"
              onClick={() => setIsCartDrawerOpen(true)}
              className="hover:text-brand-gold transition-colors p-2 relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 bg-brand-gold text-brand-charcoal text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black font-sans animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger (Mobile Only, positioned on the right corner) */}
            <button 
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-brand-forest hover:text-brand-gold transition-colors p-2"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          ADVANCED UX FEATURE: SLIDE-OUT CART DRAWER
          ========================================================================= */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay backdrop */}
          <div 
            className="absolute inset-0 bg-brand-forest/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsCartDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-brand-cream shadow-2xl flex flex-col h-full border-l border-brand-beige/50">
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-brand-beige/30 flex items-center justify-between">
                <h3 className="font-editorial text-xl font-semibold text-brand-forest flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-sage" />
                  Your Botanicals
                </h3>
                <button 
                  id="close-cart-drawer"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="text-brand-forest hover:text-brand-sage transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-brand-offwhite flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-brand-beige" />
                    </div>
                    <p className="font-editorial text-lg text-brand-forest font-medium">Your basket is empty</p>
                    <p className="text-xs text-brand-sage max-w-xs mt-2 font-sans">
                      Nourish your hair and skin with our handcrafted eco-friendly formulations.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        handleNavigate('shop');
                      }}
                      className="mt-6 px-6 py-2.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-colors text-xs tracking-widest uppercase font-medium rounded-xs"
                    >
                      Shop Collection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 py-3 border-b border-brand-beige/20 last:border-0">
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-brand-offwhite flex-shrink-0 rounded-xs overflow-hidden border border-brand-beige/30">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-editorial text-sm font-medium text-brand-forest line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-brand-sage uppercase tracking-wider mt-0.5">
                              Size: {item.selectedSize}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-brand-beige/60 rounded-xs bg-brand-offwhite">
                              <button 
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-brand-forest hover:text-brand-sage"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-medium text-brand-forest">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-brand-forest hover:text-brand-sage"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price / Delete */}
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-brand-forest">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-brand-beige hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer Summary */}
              {cart.length > 0 && (
                <div className="bg-brand-offwhite border-t border-brand-beige/30 px-6 py-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-sage">Subtotal</span>
                    <span className="font-semibold text-brand-forest">${getCartSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-sage">Shipping</span>
                    <span className="text-brand-forest">
                      {getShippingCost() === 0 ? (
                        <span className="text-brand-sage italic text-xs uppercase tracking-wider font-semibold">Complimentary</span>
                      ) : (
                        `$${getShippingCost().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-brand-beige/30 flex justify-between text-base font-semibold">
                    <span className="text-brand-forest font-editorial">Estimated Total</span>
                    <span className="text-brand-forest">${getCartTotal().toFixed(2)}</span>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        handleNavigate('cart');
                      }}
                      className="w-full py-3 border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-brand-cream transition-colors text-xs tracking-widest uppercase font-medium rounded-xs"
                    >
                      View Cart
                    </button>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        handleNavigate('checkout');
                      }}
                      className="w-full py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-colors text-xs tracking-widest uppercase font-medium rounded-xs shadow-xs"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL-SCREEN INTERACTIVE SEARCH OVERLAY
          ========================================================================= */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-brand-cream/98 backdrop-blur-sm overflow-y-auto p-4 sm:p-6 md:p-10">
          <div className="max-w-4xl mx-auto flex flex-col h-full">
            
            {/* Search Header */}
            <div className="flex justify-between items-center py-4 border-b border-brand-beige/40">
              <span className="font-editorial text-xl font-bold tracking-widest text-brand-forest uppercase">
                Botanical Search
              </span>
              <button 
                id="close-search-btn"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-brand-forest hover:text-brand-sage transition-colors p-2 rounded-full hover:bg-brand-offwhite"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Input Form */}
            <div className="py-8 relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by botanical ingredient, product name, or category..."
                className="w-full bg-brand-offwhite text-brand-forest font-editorial text-xl sm:text-2xl placeholder-brand-sage border border-brand-beige rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-brand-sage focus:border-brand-sage"
                autoFocus
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-sage pointer-events-none" />
            </div>

            {/* Suggestions & Results */}
            <div className="flex-1">
              {searchQuery.trim() === '' ? (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-sage font-medium mb-4">Suggested Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Rosemary', 'Avocado', 'Shea Butter', 'Almond Oil', 'Tea Tree', 'Eucalyptus', 'Lavender'].map((ing) => (
                      <button
                        key={ing}
                        onClick={() => setSearchQuery(ing)}
                        className="px-4 py-2 rounded-full bg-brand-offwhite border border-brand-beige/50 text-xs text-brand-forest hover:bg-brand-sage hover:text-brand-cream hover:border-brand-sage transition-all"
                      >
                        {ing}
                      </button>
                    ))}
                  </div>

                  <h4 className="text-xs uppercase tracking-widest text-brand-sage font-medium mt-8 mb-4">Quick Links</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-medium text-brand-forest">
                    {['Hair Care', 'Pedicure', 'Manicure', 'Shop All'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          const page = cat.toLowerCase().replace(' ', '');
                          handleNavigate(page);
                          setIsSearchOpen(false);
                        }}
                        className="p-4 rounded-md bg-brand-offwhite border border-brand-beige/20 text-center hover:border-brand-sage transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs uppercase tracking-widest text-brand-sage font-medium mb-4">
                    Found {searchResults.length} {searchResults.length === 1 ? 'botanical result' : 'botanical results'}
                  </p>

                  {searchResults.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="font-editorial text-lg text-brand-forest font-medium">No ingredients or products found</p>
                      <p className="text-xs text-brand-sage mt-1 font-sans">Try searching for "rosemary", "shea", "foot", or "cuticle".</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {searchResults.map((product) => (
                        <div 
                          key={product.id}
                          onClick={() => handleSearchItemClick(product)}
                          className="flex gap-4 p-3 bg-brand-offwhite border border-brand-beige/20 rounded-md hover:border-brand-sage/60 cursor-pointer transition-all hover:shadow-xs group"
                        >
                          <div className="w-16 h-16 bg-brand-cream rounded-xs overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-editorial text-sm font-semibold text-brand-forest group-hover:text-brand-sage transition-colors truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-brand-sage line-clamp-1 mt-0.5">{product.shortDescription}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs font-bold text-brand-forest">${product.price.toFixed(2)}</span>
                              <span className="text-[10px] text-brand-cream bg-brand-sage px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          RESPONSIVE MOBILE MENU DRAWER
          ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          {/* Overlay backdrop */}
          <div 
            className="absolute inset-0 bg-brand-forest/30 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-xs bg-brand-cream shadow-2xl flex flex-col h-full border-r border-brand-beige/50">
              
              {/* Mobile Drawer Header */}
              <div className="px-6 py-4 border-b border-brand-beige/30 flex items-center justify-between bg-brand-offwhite">
                <img 
                  src="https://res.cloudinary.com/dja3u7oha/image/upload/v1782844746/VIKESH_Variation_vzqsnb.png" 
                  alt="Apothecary Logo" 
                  className="h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <button 
                  id="close-mobile-menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brand-forest hover:text-brand-sage transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
                <div className="flex flex-col space-y-5">
                  <h4 className="text-[10px] uppercase tracking-widest text-brand-sage font-bold border-b border-brand-beige/20 pb-1">
                    Navigation
                  </h4>
                  <button 
                    id="mobile-nav-shop"
                    onClick={() => handleNavigate('shop')}
                    className="text-left font-editorial text-xl font-bold text-brand-forest hover:text-brand-sage py-1"
                  >
                    Products
                  </button>
                  <button 
                    id="mobile-nav-about"
                    onClick={() => handleNavigate('about')}
                    className="text-left font-editorial text-xl font-bold text-brand-forest hover:text-brand-sage py-1"
                  >
                    Our Story
                  </button>
                </div>

                <div className="flex flex-col space-y-4 pt-4 border-t border-brand-beige/25">
                  <button 
                    onClick={() => handleNavigate('account')}
                    className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-brand-forest font-semibold"
                  >
                    <User className="w-4 h-4 text-brand-sage" />
                    {currentUser ? `Hello, ${currentUser.name}` : 'Customer Login / Sign Up'}
                  </button>
                  <button 
                    onClick={() => {
                      if (currentUser) {
                        handleNavigate('account:wishlist');
                      } else {
                        handleNavigate('account');
                      }
                    }}
                    className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-brand-forest font-semibold"
                  >
                    <Heart className="w-4 h-4 text-brand-sage" />
                    My Botanical Wishlist ({wishlist.length})
                  </button>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="bg-brand-offwhite border-t border-brand-beige/30 p-6 space-y-2">
                <p className="text-[10px] text-brand-sage uppercase tracking-wider font-sans">
                  Vicesh Cosmetics Ghana
                </p>
                <p className="text-xs text-brand-forest font-serif italic">
                  Ethically crafted, botanical self-care solutions.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
