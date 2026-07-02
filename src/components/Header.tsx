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
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${isScrolled ? 'bg-brand-ivory/90 backdrop-blur-md shadow-luxury border-b border-brand-beige/50 py-3' : 'bg-brand-ivory border-b border-brand-beige/20 py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left/Center: Elegant Logo + Clean Links */}
          <div className="flex items-center gap-8 md:gap-12">
            {/* Logo */}
            <button 
              id="brand-logo-btn"
              onClick={() => handleNavigate('home')} 
              className="group focus:outline-none cursor-pointer flex items-center transition-all duration-500 hover:opacity-80"
            >
              <img 
                src="https://res.cloudinary.com/dja3u7oha/image/upload/v1782844746/VIKESH_Variation_vzqsnb.png" 
                alt="Vicesh Logo" 
                className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-16'}`}
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Editorial Navigation Links (Desktop Only) */}
            <nav className="hidden lg:flex items-center space-x-10 text-sm font-sans font-medium text-brand-charcoal">
              <button 
                id="nav-shop"
                onClick={() => handleNavigate('shop')}
                className={`relative py-2 transition-colors cursor-pointer group ${currentPage === 'shop' ? 'text-brand-purple' : 'hover:text-brand-purple'}`}
              >
                Products
                <span className={`absolute left-0 bottom-0 w-full h-[1px] bg-brand-purple transition-transform duration-300 origin-left ${currentPage === 'shop' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
              <button 
                id="nav-about"
                onClick={() => handleNavigate('about')}
                className={`relative py-2 transition-colors cursor-pointer group ${currentPage === 'about' ? 'text-brand-purple' : 'hover:text-brand-purple'}`}
              >
                Our Story
                <span className={`absolute left-0 bottom-0 w-full h-[1px] bg-brand-purple transition-transform duration-300 origin-left ${currentPage === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            </nav>
          </div>

          {/* Center-Right: Pill-shaped Search Bar */}
          <div className="hidden md:block flex-1 max-w-xs mx-4">
            <div className="relative group">
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-brand-white text-brand-charcoal border border-brand-beige/60 rounded-full font-sans text-sm py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all duration-300 hover:shadow-luxury cursor-pointer"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none group-focus-within:text-brand-purple transition-colors" />
            </div>
          </div>

          {/* Right Side: Utility Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-brand-charcoal">
            
            {/* Account Button */}
            <button 
              id="header-account-btn"
              onClick={() => handleNavigate('account')}
              className={`hover:text-brand-purple transition-colors p-2 relative ${currentPage.startsWith('account') ? 'text-brand-purple' : ''}`}
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
              {currentUser && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-purple border-2 border-brand-ivory"></span>
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
              className="hidden md:flex hover:text-brand-purple transition-colors p-2 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-brand-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium font-sans">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button 
              id="header-cart-btn"
              onClick={() => setIsCartDrawerOpen(true)}
              className="hover:text-brand-purple transition-colors p-2 relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 bg-brand-purple text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium font-sans shadow-sm">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-brand-charcoal hover:text-brand-purple transition-colors p-2"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
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
            className="absolute inset-0 bg-brand-charcoal/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-brand-ivory shadow-luxury-lg flex flex-col h-full border-l border-brand-beige/30 transition-transform duration-500 transform translate-x-0">
              {/* Drawer Header */}
              <div className="px-8 py-6 border-b border-brand-beige/30 flex items-center justify-between bg-white">
                <h3 className="font-editorial text-2xl font-medium text-brand-charcoal">
                  Your Basket
                </h3>
                <button 
                  id="close-cart-drawer"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="text-brand-gray hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-brand-light-gray"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-8 py-6 bg-brand-ivory">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-white shadow-luxury flex items-center justify-center mb-6">
                      <ShoppingBag className="w-8 h-8 text-brand-muted stroke-[1]" />
                    </div>
                    <p className="font-editorial text-2xl text-brand-charcoal font-medium">Your basket is empty</p>
                    <p className="text-sm text-brand-gray max-w-xs mt-3 font-sans leading-relaxed">
                      Nourish your hair and skin with our handcrafted eco-friendly formulations.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        handleNavigate('shop');
                      }}
                      className="mt-8 btn-primary"
                    >
                      Shop Collection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-5 py-4 border-b border-brand-beige/40 last:border-0 group">
                        {/* Thumbnail */}
                        <div className="w-24 h-24 bg-brand-white flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-editorial text-base font-medium text-brand-charcoal">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-brand-gray font-sans mt-1">
                                Size: {item.selectedSize}
                              </p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-brand-muted hover:text-brand-purple transition-colors p-1"
                            >
                              <X className="w-4 h-4 stroke-[1.5]" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-brand-beige rounded-full bg-white shadow-sm overflow-hidden">
                              <button 
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 text-brand-gray hover:text-brand-purple transition-colors"
                              >
                                <Minus className="w-3 h-3 stroke-[2]" />
                              </button>
                              <span className="px-2 text-xs font-medium text-brand-charcoal min-w-[1.5rem] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-brand-gray hover:text-brand-purple transition-colors"
                              >
                                <Plus className="w-3 h-3 stroke-[2]" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="text-sm font-medium text-brand-charcoal">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer Summary */}
              {cart.length > 0 && (
                <div className="bg-white border-t border-brand-beige/30 px-8 py-6 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-gray font-sans">Subtotal</span>
                    <span className="font-medium text-brand-charcoal">${getCartSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-gray font-sans">Shipping</span>
                    <span className="text-brand-charcoal">
                      {getShippingCost() === 0 ? (
                        <span className="text-brand-purple font-medium">Complimentary</span>
                      ) : (
                        `$${getShippingCost().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-brand-beige/30 flex justify-between items-center text-lg">
                    <span className="font-editorial text-brand-charcoal">Estimated Total</span>
                    <span className="font-medium text-brand-charcoal">${getCartTotal().toFixed(2)}</span>
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        handleNavigate('cart');
                      }}
                      className="btn-secondary w-full text-sm"
                    >
                      View Cart
                    </button>
                    <button
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        handleNavigate('checkout');
                      }}
                      className="btn-primary w-full text-sm"
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
        <div className="fixed inset-0 z-50 bg-brand-ivory/98 backdrop-blur-md overflow-y-auto p-4 sm:p-6 md:p-10 transition-opacity duration-300">
          <div className="max-w-4xl mx-auto flex flex-col h-full animate-fade-in-up">
            
            {/* Search Header */}
            <div className="flex justify-between items-center py-6 border-b border-brand-beige/40">
              <span className="font-editorial text-2xl md:text-3xl font-medium text-brand-charcoal">
                Search Vicesh
              </span>
              <button 
                id="close-search-btn"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-brand-gray hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-brand-white"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Input Form */}
            <div className="py-12 relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by botanical ingredient, product name, or category..."
                className="w-full bg-transparent text-brand-charcoal font-editorial text-2xl md:text-4xl placeholder-brand-muted border-b border-brand-beige/60 pb-4 focus:outline-none focus:border-brand-purple transition-colors"
                autoFocus
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-brand-muted pointer-events-none mb-2" />
            </div>

            {/* Suggestions & Results */}
            <div className="flex-1">
              {searchQuery.trim() === '' ? (
                <div>
                  <h4 className="text-sm font-sans font-medium text-brand-gray mb-6">Suggested Ingredients</h4>
                  <div className="flex flex-wrap gap-3">
                    {['Rosemary', 'Avocado', 'Shea Butter', 'Almond Oil', 'Tea Tree', 'Eucalyptus', 'Lavender'].map((ing) => (
                      <button
                        key={ing}
                        onClick={() => setSearchQuery(ing)}
                        className="px-5 py-2.5 rounded-full bg-white border border-brand-beige/50 text-sm font-medium text-brand-gray hover:text-brand-purple hover:border-brand-purple hover:shadow-sm transition-all"
                      >
                        {ing}
                      </button>
                    ))}
                  </div>

                  <h4 className="text-sm font-sans font-medium text-brand-gray mt-12 mb-6">Quick Links</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['Hair Care', 'Pedicure', 'Manicure', 'Shop All'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          const page = cat.toLowerCase().replace(' ', '');
                          handleNavigate(page);
                          setIsSearchOpen(false);
                        }}
                        className="p-6 rounded-md bg-white border border-brand-beige/40 text-center font-medium text-brand-charcoal hover:border-brand-purple hover:text-brand-purple hover:shadow-luxury transition-all"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-sans font-medium text-brand-gray mb-6">
                    Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                  </p>

                  {searchResults.length === 0 ? (
                    <div className="text-center py-16">
                      <p className="font-editorial text-2xl text-brand-charcoal font-medium">No ingredients or products found</p>
                      <p className="text-base text-brand-gray mt-3 font-sans">Try searching for "rosemary", "shea", "foot", or "cuticle".</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.map((product) => (
                        <div 
                          key={product.id}
                          onClick={() => handleSearchItemClick(product)}
                          className="flex gap-4 p-4 bg-white border border-brand-beige/40 rounded-md hover:border-brand-purple/40 cursor-pointer transition-all hover:shadow-luxury group"
                        >
                          <div className="w-20 h-20 bg-brand-ivory rounded-sm overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h4 className="font-editorial text-base font-medium text-brand-charcoal group-hover:text-brand-purple transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-xs text-brand-gray line-clamp-1 mt-1">{product.shortDescription}</p>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-sm font-medium text-brand-charcoal">${product.price.toFixed(2)}</span>
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
            className="absolute inset-0 bg-brand-charcoal/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-xs bg-brand-ivory shadow-luxury-lg flex flex-col h-full border-r border-brand-beige/30">
              
              {/* Mobile Drawer Header */}
              <div className="px-6 py-5 border-b border-brand-beige/30 flex items-center justify-between bg-white">
                <img 
                  src="https://res.cloudinary.com/dja3u7oha/image/upload/v1782844746/VIKESH_Variation_vzqsnb.png" 
                  alt="Vicesh Logo" 
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <button 
                  id="close-mobile-menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-brand-gray hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-brand-light-gray"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8 bg-brand-ivory">
                <div className="flex flex-col space-y-6">
                  <h4 className="text-xs font-sans font-medium text-brand-muted uppercase tracking-widest border-b border-brand-beige/40 pb-2">
                    Menu
                  </h4>
                  <button 
                    id="mobile-nav-shop"
                    onClick={() => handleNavigate('shop')}
                    className="text-left font-editorial text-2xl font-medium text-brand-charcoal hover:text-brand-purple transition-colors py-1"
                  >
                    Products
                  </button>
                  <button 
                    id="mobile-nav-about"
                    onClick={() => handleNavigate('about')}
                    className="text-left font-editorial text-2xl font-medium text-brand-charcoal hover:text-brand-purple transition-colors py-1"
                  >
                    Our Story
                  </button>
                </div>

                <div className="flex flex-col space-y-5 pt-8 border-t border-brand-beige/40">
                  <button 
                    onClick={() => handleNavigate('account')}
                    className="flex items-center gap-3 font-sans text-sm font-medium text-brand-charcoal hover:text-brand-purple transition-colors"
                  >
                    <User className="w-5 h-5 stroke-[1.5] text-brand-gray" />
                    {currentUser ? `Hello, ${currentUser.name}` : 'Login / Sign Up'}
                  </button>
                  <button 
                    onClick={() => {
                      if (currentUser) {
                        handleNavigate('account:wishlist');
                      } else {
                        handleNavigate('account');
                      }
                    }}
                    className="flex items-center gap-3 font-sans text-sm font-medium text-brand-charcoal hover:text-brand-purple transition-colors"
                  >
                    <Heart className="w-5 h-5 stroke-[1.5] text-brand-gray" />
                    Wishlist ({wishlist.length})
                  </button>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="bg-white border-t border-brand-beige/30 p-6 space-y-2">
                <p className="font-editorial text-lg text-brand-charcoal">
                  Vicesh Cosmetics
                </p>
                <p className="text-sm text-brand-gray font-sans">
                  Luxury botanical self-care.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
