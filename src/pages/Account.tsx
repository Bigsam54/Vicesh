/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User, ShoppingBag, Heart, MapPin, Settings, LogOut, Award, 
  Clock, Truck, Check, ChevronRight, Eye, ShieldCheck, Mail, Lock 
} from 'lucide-react';

interface AccountProps {
  initialTab?: string;
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const Account: React.FC<AccountProps> = ({ 
  initialTab = 'overview', 
  setCurrentPage, 
  setSelectedProductId 
}) => {
  const { 
    currentUser, 
    orders, 
    wishlist, 
    products, 
    loginUser, 
    registerUser, 
    logoutUser, 
    updateProfile, 
    updateAddresses,
    toggleWishlist
  } = useStore();

  // Authentication Panel toggles
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  // Dashboard Navigation Tab
  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile Form States
  const [profName, setProfName] = useState(currentUser?.name || '');
  const [profPhone, setProfPhone] = useState(currentUser?.phone || '');
  const [profSaved, setProfSaved] = useState(false);

  // Address Form States
  const [shipName, setShipName] = useState(currentUser?.shippingAddress?.fullName || '');
  const [shipAddr, setShipAddr] = useState(currentUser?.shippingAddress?.addressLine1 || '');
  const [shipCity, setShipCity] = useState(currentUser?.shippingAddress?.city || '');
  const [shipState, setShipState] = useState(currentUser?.shippingAddress?.state || '');
  const [shipCountry, setShipCountry] = useState(currentUser?.shippingAddress?.country || 'Ghana');
  const [shipPhone, setShipPhone] = useState(currentUser?.shippingAddress?.phone || '');
  const [addrSaved, setAddrSaved] = useState(false);

  // Form handle submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    loginUser(loginEmail);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName.trim() || !registerEmail.trim()) return;
    registerUser(registerName, registerEmail);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profName, profPhone);
    setProfSaved(true);
    setTimeout(() => setProfSaved(false), 2000);
  };

  const handleAddressSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAddresses({
      fullName: shipName,
      addressLine1: shipAddr,
      city: shipCity,
      state: shipState,
      country: shipCountry,
      phone: shipPhone
    });
    setAddrSaved(true);
    setTimeout(() => setAddrSaved(false), 2000);
  };

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage(`product:${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve wishlist products
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-left space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold block">Secure Sanctuary</span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-cream">
          {currentUser ? 'Customer Sanctuary Portal' : 'Access Your Shelf'}
        </h1>
        <div className="w-12 h-[1px] bg-brand-gold mt-1"></div>
      </div>

      {!currentUser ? (
        /* =========================================================================
            AUTHENTICATION SHEETS (LOGIN & REGISTRATION)
            ========================================================================= */
        <div className="max-w-md mx-auto bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 sm:p-8 space-y-6 shadow-md text-left">
          
          {/* Header toggles */}
          <div className="flex border-b border-brand-cream/20 text-xs uppercase tracking-widest font-bold">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 text-center transition-all cursor-pointer ${
                authMode === 'login' 
                  ? 'text-brand-cream border-b-2 border-brand-forest font-extrabold' 
                  : 'text-brand-cream/80 hover:text-brand-cream'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-3 text-center transition-all cursor-pointer ${
                authMode === 'register' 
                  ? 'text-brand-cream border-b-2 border-brand-forest font-extrabold' 
                  : 'text-brand-cream/80 hover:text-brand-cream'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-brand-cream font-semibold block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. kofi@gmail.com"
                    className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 pl-10 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-brand-cream font-semibold block">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 pl-10 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-extrabold rounded-xs cursor-pointer shadow-xs"
              >
                Enter Sanctuary
              </button>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-brand-cream/80 font-light">
                  Tip: Just enter any valid email address to instantly explore our dashboard.
                </p>
              </div>
            </form>
          )}

          {/* REGISTRATION FORM */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-brand-cream font-semibold block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="e.g. Kofi Boateng"
                    className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 pl-10 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    required
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-brand-cream font-semibold block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="e.g. kofi@gmail.com"
                    className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 pl-10 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-brand-cream font-semibold block">Secure Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 pl-10 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    required
                    minLength={6}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" id="terms-agree" className="mt-0.5 rounded-xs" required />
                <label htmlFor="terms-agree" className="text-[10px] text-brand-cream/80 leading-normal">
                  I agree to enroll in Vicesh's Loyalty Program and accept the Terms & Conditions and Privacy Policy.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-extrabold rounded-xs cursor-pointer shadow-xs"
              >
                Register & Claim Bonus Points
              </button>
            </form>
          )}

        </div>
      ) : (
        /* =========================================================================
            ACTIVE CUSTOMER SANCTUARY DASHBOARD
            ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dashboard Left Sidebar Tabs */}
          <aside className="lg:col-span-3 bg-brand-offwhite border border-brand-cream/20 rounded-md p-5 space-y-6 text-left sticky top-32">
            
            {/* Quick Profile Overview summary */}
            <div className="flex items-center gap-3 border-b border-brand-cream/20 pb-4">
              <div className="w-12 h-12 rounded-full bg-brand-sage/10 border-2 border-brand-sage flex items-center justify-center font-editorial text-lg font-bold text-brand-cream">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-editorial text-base font-bold text-brand-cream">{currentUser.name}</h4>
                <p className="text-[10px] text-brand-cream/80 font-medium uppercase tracking-wider">Loyal Botanical Circle</p>
              </div>
            </div>

            {/* Loyalty points banner */}
            <div className="bg-brand-forest text-brand-cream rounded-xs p-4 flex items-center gap-3 border border-brand-gold/15">
              <Award className="w-8 h-8 text-brand-gold shrink-0" />
              <div className="text-xs">
                <p className="text-brand-gold uppercase tracking-wider font-bold text-[9px]">Vicesh Points</p>
                <p className="font-editorial text-base font-bold">{currentUser.loyaltyPoints} Gold Points</p>
              </div>
            </div>

            {/* Tabs List */}
            <nav className="flex flex-col gap-1.5 text-xs tracking-wider uppercase font-medium font-sans">
              {[
                { id: 'overview', label: 'Sanctuary Overview', icon: User },
                { id: 'orders', label: `My Orders (${orders.length})`, icon: ShoppingBag },
                { id: 'wishlist', label: `My Wishlist (${wishlist.length})`, icon: Heart },
                { id: 'addresses', label: 'Default Addresses', icon: MapPin },
                { id: 'settings', label: 'Profile Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-xs text-left cursor-pointer transition-all ${
                      activeTab === tab.id
                        ? 'bg-brand-forest text-brand-cream font-bold'
                        : 'text-brand-cream hover:bg-brand-beige/25 hover:text-brand-cream/80'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-brand-cream/80" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <button
                onClick={logoutUser}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xs text-left cursor-pointer transition-all text-red-600 hover:bg-red-50 mt-4 border-t border-brand-cream/20 pt-4"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Log Out</span>
              </button>
            </nav>

          </aside>

          {/* Dashboard Right Main Content Column */}
          <div className="lg:col-span-9 bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 sm:p-8 text-left min-h-[480px]">
            
            {/* TAB 1: OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-3">
                  Welcome back, {currentUser.name}!
                </h3>
                
                {/* 3 Grid summaries */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Points summary */}
                  <div className="bg-brand-purple-dark border border-brand-cream/20 p-5 rounded-xs space-y-2">
                    <h4 className="text-[10px] uppercase tracking-widest text-brand-cream/80 font-bold">Loyalty Sanctuary</h4>
                    <p className="font-editorial text-lg text-brand-cream leading-tight">
                      You have earned <span className="text-brand-cream/80 font-bold font-serif italic">{currentUser.loyaltyPoints} Vicesh Gold points</span>.
                    </p>
                    <p className="text-[10px] text-brand-cream/80 font-light leading-normal">
                      Redeem points at checkout for complimentary botanical oils or special discounts. You earn 1 point for every $1 spent.
                    </p>
                  </div>

                  {/* Address default */}
                  <div className="bg-brand-purple-dark border border-brand-cream/20 p-5 rounded-xs space-y-2 text-xs">
                    <h4 className="text-[10px] uppercase tracking-widest text-brand-cream/80 font-bold">Primary Delivery Address</h4>
                    {currentUser.shippingAddress ? (
                      <div className="text-brand-cream/80 space-y-0.5 leading-relaxed font-light">
                        <p className="font-semibold text-brand-cream">{currentUser.shippingAddress.fullName}</p>
                        <p>{currentUser.shippingAddress.addressLine1}</p>
                        <p>{currentUser.shippingAddress.city}, {currentUser.shippingAddress.state}</p>
                        <p>{currentUser.shippingAddress.country}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-brand-cream/80 font-light">No default address registered yet.</p>
                        <button onClick={() => setActiveTab('addresses')} className="text-xs font-bold uppercase tracking-wider text-brand-cream underline">Add Address</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent order summary */}
                <div className="space-y-3 pt-4">
                  <h4 className="text-xs uppercase tracking-widest text-brand-cream font-semibold">Recent Botanical Orders</h4>
                  {orders.length === 0 ? (
                    <div className="bg-brand-purple-dark p-6 rounded-xs border border-brand-cream/20 text-center py-8">
                      <p className="text-xs text-brand-cream/80 font-light">You have not placed any orders yet.</p>
                      <button onClick={() => setCurrentPage('shop')} className="text-xs font-bold uppercase tracking-wider text-brand-cream mt-2 underline">Shop Collections</button>
                    </div>
                  ) : (
                    <div className="bg-brand-purple-dark p-5 rounded-xs border border-brand-cream/20 text-xs flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="font-bold text-brand-cream">Ref: {orders[0].id}</p>
                        <p className="text-brand-cream/80">Placed on: {orders[0].date}</p>
                        <p className="text-brand-cream/80 font-semibold">Total: ${orders[0].total.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="bg-brand-sage/15 border border-brand-sage/35 text-brand-cream font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-[9px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brand-cream/80 animate-spin-slow" />
                          {orders[0].status}
                        </span>
                        <button onClick={() => setActiveTab('orders')} className="text-[10px] uppercase font-bold text-brand-cream underline">View Order Details</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PAST ORDERS HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-3">
                  Your Order Archives
                </h3>

                {orders.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-brand-beige mx-auto" />
                    <p className="font-editorial text-lg text-brand-cream">No historic orders</p>
                    <p className="text-xs text-brand-cream/80 font-light">Explore our organic hair and skincare lines to place your first botanical order.</p>
                    <button onClick={() => setCurrentPage('shop')} className="px-5 py-2.5 bg-brand-forest text-brand-cream text-xs tracking-widest uppercase font-bold">Start Browsing</button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-brand-purple-dark border border-brand-cream/20 rounded-xs p-5 sm:p-6 space-y-4 shadow-xs text-xs">
                        
                        {/* Order Header summary */}
                        <div className="flex flex-wrap justify-between items-center border-b border-brand-cream/20 pb-3 gap-3">
                          <div className="space-y-0.5">
                            <p className="font-bold text-brand-cream text-sm">Ref Number: {order.id}</p>
                            <p className="text-brand-cream/80">Placed on {order.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="bg-brand-sage/10 border border-brand-sage/30 text-brand-cream font-bold uppercase px-3 py-1 rounded-full text-[9px] flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5" />
                              Status: {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Items detailed list */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                              <div className="w-10 h-10 bg-brand-offwhite border border-brand-cream/20 rounded-xs overflow-hidden shrink-0">
                                <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-editorial font-bold text-brand-cream truncate">{item.productName}</h5>
                                <p className="text-[10px] text-brand-cream/80">Size: {item.selectedSize} × {item.quantity}</p>
                              </div>
                              <div className="font-semibold text-brand-cream">
                                ${ (item.price * item.quantity).toFixed(2) }
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery tracking address / costs */}
                        <div className="pt-3 border-t border-brand-cream/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-brand-cream/80">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-brand-cream font-bold block mb-1">Package Tracking Code</span>
                            <span className="font-mono font-semibold text-brand-cream">{order.trackingNumber}</span>
                          </div>
                          <div className="text-right space-y-1">
                            <p>Subtotal: <span className="font-semibold text-brand-cream">${order.subtotal.toFixed(2)}</span></p>
                            {order.discountAmount > 0 && <p className="text-brand-cream/80">Discount: <span className="font-bold">-${order.discountAmount.toFixed(2)}</span></p>}
                            <p>Shipping Cost: <span className="font-semibold text-brand-cream">${order.shippingCost.toFixed(2)}</span></p>
                            <p className="font-bold text-brand-cream text-sm border-t border-brand-cream/20 pt-1.5 mt-1.5">Charge Settled: ${order.total.toFixed(2)}</p>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: WISHLIST MANAGER */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-3">
                  Your Botanical Wishlist
                </h3>

                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <Heart className="w-12 h-12 text-brand-beige mx-auto" />
                    <p className="font-editorial text-lg text-brand-cream">Wishlist is empty</p>
                    <p className="text-xs text-brand-cream/80 font-light">Bookmark your favorite eco-friendly hair and skincare formulations.</p>
                    <button onClick={() => setCurrentPage('shop')} className="px-5 py-2.5 bg-brand-forest text-brand-cream text-xs tracking-widest uppercase font-bold">Start Exploring</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedProducts.map((p) => (
                      <div key={p.id} className="relative group">
                        {/* Overlay remove trigger */}
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="absolute top-2 right-2 bg-brand-purple-dark hover:bg-red-50 text-brand-cream/80 hover:text-red-600 rounded-full w-7 h-7 flex items-center justify-center border border-brand-cream/20 shadow-xs z-10"
                          title="Remove from Wishlist"
                        >
                          ×
                        </button>
                        
                        <div onClick={() => handleProductClick(p.id)} className="cursor-pointer">
                          <div className="aspect-[4/5] bg-brand-offwhite rounded-xs overflow-hidden border border-brand-cream/20">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform" />
                          </div>
                          <h4 className="font-editorial text-sm font-bold text-brand-cream mt-2 truncate group-hover:text-brand-cream/80">{p.name}</h4>
                          <p className="text-xs font-semibold text-brand-cream mt-0.5">${p.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ADDRESSES MANAGEMENT */}
            {activeTab === 'addresses' && (
              <form onSubmit={handleAddressSave} className="space-y-6 text-xs">
                <h3 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-3">
                  Address Registry
                </h3>

                {addrSaved && (
                  <div className="bg-brand-sage/10 border border-brand-sage/35 text-brand-cream rounded-xs p-3 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-brand-cream/80" />
                    Delivery addresses saved successfully!
                  </div>
                )}

                <div className="space-y-4 text-left">
                  {/* Recipient */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Receiver Full Name</label>
                    <input 
                      type="text"
                      value={shipName}
                      onChange={(e) => setShipName(e.target.value)}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                  </div>

                  {/* Street Address */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Street Address</label>
                    <input 
                      type="text"
                      value={shipAddr}
                      onChange={(e) => setShipAddr(e.target.value)}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                  </div>

                  {/* City & State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream font-semibold block">City</label>
                      <input 
                        type="text"
                        value={shipCity}
                        onChange={(e) => setShipCity(e.target.value)}
                        className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream font-semibold block">Region / State</label>
                      <input 
                        type="text"
                        value={shipState}
                        onChange={(e) => setShipState(e.target.value)}
                        className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                        required
                      />
                    </div>
                  </div>

                  {/* Country Selection */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Country</label>
                    <select 
                      value={shipCountry}
                      onChange={(e) => setShipCountry(e.target.value)}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-medium cursor-pointer"
                    >
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Contact Number</label>
                    <input 
                      type="tel"
                      value={shipPhone}
                      onChange={(e) => setShipPhone(e.target.value)}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer shadow-xs"
                  >
                    Save Default Address
                  </button>
                </div>
              </form>
            )}

            {/* TAB 5: PROFILE SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleProfileSave} className="space-y-6 text-xs text-left">
                <h3 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-3">
                  Account Configuration
                </h3>

                {profSaved && (
                  <div className="bg-brand-sage/10 border border-brand-sage/35 text-brand-cream rounded-xs p-3 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-brand-cream/80" />
                    Profile preferences updated!
                  </div>
                )}

                <div className="space-y-4">
                  {/* Email (Read Only) */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Email Address (Primary Identity)</label>
                    <input 
                      type="text"
                      value={currentUser.email}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs text-brand-cream/80 select-none font-medium cursor-not-allowed"
                      readOnly
                    />
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Preferred Display Name</label>
                    <input 
                      type="text"
                      value={profName}
                      onChange={(e) => setProfName(e.target.value)}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Sanctuary Mobile Contact</label>
                    <input 
                      type="tel"
                      value={profPhone}
                      onChange={(e) => setProfPhone(e.target.value)}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer shadow-xs"
                  >
                    Update Profile Details
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
