/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User, ShoppingBag, Heart, MapPin, Settings, LogOut, Award, 
  Clock, Truck, Check, ChevronRight, Eye, ShieldCheck, Mail, Lock, 
  CreditCard, Package
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
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    await loginUser(loginEmail);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName.trim() || !registerEmail.trim()) return;
    await registerUser(registerName, registerEmail);
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
        <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold block">
          {currentUser ? 'My Account' : 'Welcome'}
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-cream">
          {currentUser ? 'User Dashboard' : 'Sign In'}
        </h1>
        <div className="w-12 h-[1px] bg-brand-gold mt-1"></div>
      </div>

      {!currentUser ? (
        /* =========================================================================
            AUTHENTICATION SHEETS (LOGIN & REGISTRATION)
            ========================================================================= */
        <div className="max-w-4xl mx-auto bg-brand-offwhite border border-brand-cream/20 rounded-md shadow-md text-left overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* Aesthetic Background Image Side */}
          <div className="hidden md:block relative bg-brand-purple-dark">
            <img 
              src="https://images.unsplash.com/photo-1615397323192-3c25e2db8122?auto=format&fit=crop&q=80&w=1000" 
              alt="Botanical Beauty Elements" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-purple/20"></div>
            <div className="absolute bottom-10 left-10 right-10 text-brand-white">
              <h2 className="font-editorial text-3xl font-bold mb-2">Botanical Purity</h2>
              <p className="text-xs font-light text-brand-white/80 leading-relaxed">
                Log in to access your personal sanctuary. Track orders, manage addresses, and earn rewards with every organic purchase.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-8 flex flex-col justify-center">
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
                Register
              </button>
            </div>

            {/* LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-brand-cream font-semibold block">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. kofi@gmail.com"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3.5 pl-11 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-brand-cream font-semibold block">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3.5 pl-11 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-extrabold rounded-xs cursor-pointer shadow-xs mt-2"
                >
                  Sign In
                </button>

                <div className="pt-3 text-center border-t border-brand-cream/10 mt-6">
                  <p className="text-[11px] text-brand-cream/70 font-light">
                    Tip: Just enter any valid email address to explore the dashboard.
                  </p>
                </div>
              </form>
            )}

            {/* REGISTRATION FORM */}
            {authMode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-brand-cream font-semibold block">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3.5 pl-11 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-brand-cream font-semibold block">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="e.g. jane@example.com"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3.5 pl-11 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-brand-cream font-semibold block">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3.5 pl-11 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                      minLength={6}
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream/80" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-extrabold rounded-xs cursor-pointer shadow-xs mt-2"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>

        </div>
      ) : (
        /* =========================================================================
            ACTIVE CUSTOMER DASHBOARD
            ========================================================================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dashboard Left Sidebar Tabs */}
          <aside className="lg:col-span-3 bg-brand-purple-dark border border-brand-cream/20 rounded-md p-5 space-y-6 text-left lg:sticky lg:top-32">
            
            {/* Quick Profile Overview summary */}
            <div className="flex items-center gap-3 border-b border-brand-cream/20 pb-4">
              <div className="w-12 h-12 rounded-full bg-brand-sage/20 border-2 border-brand-sage flex items-center justify-center font-editorial text-lg font-bold text-brand-cream">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-editorial text-base font-bold text-brand-cream">{currentUser.name}</h4>
                <p className="text-[10px] text-brand-cream/80 font-medium uppercase tracking-wider">Member</p>
              </div>
            </div>

            {/* Tabs List */}
            <nav className="flex flex-col gap-1.5 text-xs tracking-wider uppercase font-medium font-sans">
              {[
                { id: 'overview', label: 'Dashboard', icon: User },
                { id: 'orders', label: `My Orders (${orders.length})`, icon: ShoppingBag },
                { id: 'wishlist', label: `My Wishlist (${wishlist.length})`, icon: Heart },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                { id: 'settings', label: 'Account Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-xs text-left cursor-pointer transition-all ${
                      activeTab === tab.id
                        ? 'bg-brand-forest text-brand-cream font-bold shadow-sm'
                        : 'text-brand-cream hover:bg-brand-beige/10 hover:text-brand-cream'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-brand-cream/80" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <button
                onClick={logoutUser}
                className="flex items-center gap-2.5 px-3 py-3 rounded-xs text-left cursor-pointer transition-all text-red-400 hover:bg-red-500/10 mt-4 border-t border-brand-cream/20 pt-4"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Log Out</span>
              </button>
            </nav>

          </aside>

          {/* Dashboard Right Main Content Column */}
          <div className="lg:col-span-9 bg-brand-offwhite border border-brand-beige/40 rounded-md p-6 sm:p-8 text-left min-h-[480px] shadow-sm">
            
            {/* TAB 1: OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <h3 className="font-editorial text-2xl font-bold text-brand-charcoal border-b border-brand-beige/40 pb-4">
                  Welcome back, {currentUser.name}!
                </h3>
                
                {/* 3 Grid KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Points summary */}
                  <div className="bg-white border border-brand-beige/40 p-5 rounded-md space-y-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-gold/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="flex items-center gap-2 text-brand-gold mb-1">
                      <Award className="w-5 h-5" />
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Rewards Points</h4>
                    </div>
                    <div>
                      <p className="font-editorial text-3xl font-bold text-brand-charcoal">{currentUser.loyaltyPoints}</p>
                      <p className="text-[10px] text-brand-gray font-light mt-1">
                        Redeem points at checkout for discounts.
                      </p>
                    </div>
                  </div>

                  {/* Orders Summary */}
                  <div className="bg-white border border-brand-beige/40 p-5 rounded-md space-y-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-sage/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="flex items-center gap-2 text-brand-sage mb-1">
                      <Package className="w-5 h-5" />
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Total Orders</h4>
                    </div>
                    <div>
                      <p className="font-editorial text-3xl font-bold text-brand-charcoal">{orders.length}</p>
                      <button onClick={() => setActiveTab('orders')} className="text-[10px] font-bold text-brand-sage uppercase tracking-wider hover:underline mt-1 block">View History</button>
                    </div>
                  </div>

                  {/* Wishlist Summary */}
                  <div className="bg-white border border-brand-beige/40 p-5 rounded-md space-y-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-400/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="flex items-center gap-2 text-red-400 mb-1">
                      <Heart className="w-5 h-5" />
                      <h4 className="text-[10px] uppercase tracking-widest font-bold">Saved Items</h4>
                    </div>
                    <div>
                      <p className="font-editorial text-3xl font-bold text-brand-charcoal">{wishlist.length}</p>
                      <button onClick={() => setActiveTab('wishlist')} className="text-[10px] font-bold text-red-400 uppercase tracking-wider hover:underline mt-1 block">View Wishlist</button>
                    </div>
                  </div>

                </div>

                {/* Recent Activity / Address Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                  {/* Recent Order */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2 border-b border-brand-beige/40 pb-2">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      Recent Order
                    </h4>
                    {orders.length === 0 ? (
                      <div className="bg-white p-6 rounded-md border border-brand-beige/40 text-center py-8 shadow-sm">
                        <p className="text-xs text-brand-gray">No orders placed yet.</p>
                        <button onClick={() => setCurrentPage('shop')} className="text-xs font-bold uppercase tracking-wider text-brand-gold mt-2 hover:underline">Start Shopping</button>
                      </div>
                    ) : (
                      <div className="bg-white p-5 rounded-md border border-brand-beige/40 text-xs flex flex-col gap-3 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-brand-charcoal">Order #{orders[0].id}</p>
                            <p className="text-brand-gray text-[10px] mt-0.5">{orders[0].date}</p>
                          </div>
                          <span className="bg-brand-sage/10 text-brand-sage border border-brand-sage/30 px-2 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                            {orders[0].status}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-brand-beige/40 flex justify-between items-center">
                          <p className="font-semibold text-brand-charcoal text-sm">${orders[0].total.toFixed(2)}</p>
                          <button onClick={() => setActiveTab('orders')} className="text-[10px] font-bold uppercase tracking-wider text-brand-gold hover:underline flex items-center gap-1">
                            Details <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Primary Address */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2 border-b border-brand-beige/40 pb-2">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      Primary Address
                    </h4>
                    <div className="bg-white p-5 rounded-md border border-brand-beige/40 text-xs flex flex-col gap-3 h-[130px] shadow-sm">
                      {currentUser.shippingAddress ? (
                        <div className="text-brand-gray space-y-1">
                          <p className="font-bold text-brand-charcoal">{currentUser.shippingAddress.fullName}</p>
                          <p>{currentUser.shippingAddress.addressLine1}</p>
                          <p>{currentUser.shippingAddress.city}, {currentUser.shippingAddress.state}, {currentUser.shippingAddress.country}</p>
                        </div>
                      ) : (
                        <p className="text-brand-gray">No address saved.</p>
                      )}
                      <div className="mt-auto pt-2 border-t border-brand-beige/40 text-right">
                         <button onClick={() => setActiveTab('addresses')} className="text-[10px] font-bold uppercase tracking-wider text-brand-gold hover:underline">Manage Addresses</button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: PAST ORDERS HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl font-bold text-brand-charcoal border-b border-brand-beige/40 pb-3">
                  My Orders
                </h3>

                {orders.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-brand-gray/50 mx-auto" />
                    <p className="font-editorial text-lg text-brand-charcoal">No orders yet</p>
                    <button onClick={() => setCurrentPage('shop')} className="px-5 py-2.5 bg-brand-forest text-brand-cream text-xs tracking-widest uppercase font-bold rounded-sm shadow-xs">Start Browsing</button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white border border-brand-beige/40 rounded-md p-5 sm:p-6 space-y-4 shadow-sm text-xs">
                        
                        {/* Order Header summary */}
                        <div className="flex flex-wrap justify-between items-center border-b border-brand-beige/40 pb-3 gap-3">
                          <div className="space-y-0.5">
                            <p className="font-bold text-brand-charcoal text-sm">Order #{order.id}</p>
                            <p className="text-brand-gray">Placed on {order.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="bg-brand-sage/20 border border-brand-sage/30 text-brand-sage font-bold uppercase px-3 py-1 rounded-sm text-[10px] flex items-center gap-1.5 tracking-wider">
                              <Truck className="w-3.5 h-3.5" />
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Items detailed list */}
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                              <div className="w-10 h-10 bg-brand-offwhite border border-brand-beige/40 rounded-sm overflow-hidden shrink-0">
                                <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-editorial font-bold text-brand-charcoal truncate">{item.productName}</h5>
                                <p className="text-[10px] text-brand-gray">Qty: {item.quantity}</p>
                              </div>
                              <div className="font-semibold text-brand-charcoal">
                                ${ (item.price * item.quantity).toFixed(2) }
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery tracking address / costs */}
                        <div className="pt-3 border-t border-brand-beige/40 grid grid-cols-1 sm:grid-cols-2 gap-4 text-brand-gray">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-brand-charcoal font-bold block mb-1">Tracking Number</span>
                            <span className="font-mono font-semibold text-brand-gold">{order.trackingNumber}</span>
                          </div>
                          <div className="text-right space-y-1">
                            <p>Subtotal: <span className="font-semibold text-brand-charcoal">${order.subtotal.toFixed(2)}</span></p>
                            {order.discountAmount > 0 && <p className="text-brand-gray">Discount: <span className="font-bold">-${order.discountAmount.toFixed(2)}</span></p>}
                            <p>Shipping Cost: <span className="font-semibold text-brand-charcoal">{order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}</span></p>
                            <p className="font-bold text-brand-charcoal text-sm border-t border-brand-beige/40 pt-1.5 mt-1.5">Total: ${order.total.toFixed(2)}</p>
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
                <h3 className="font-editorial text-2xl font-bold text-brand-charcoal border-b border-brand-beige/40 pb-3">
                  My Wishlist
                </h3>

                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <Heart className="w-12 h-12 text-brand-gray/50 mx-auto" />
                    <p className="font-editorial text-lg text-brand-charcoal">Your wishlist is empty</p>
                    <button onClick={() => setCurrentPage('shop')} className="px-5 py-2.5 bg-brand-forest text-brand-cream text-xs tracking-widest uppercase font-bold rounded-sm shadow-xs">Start Exploring</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistedProducts.map((p) => (
                      <div key={p.id} className="relative group">
                        {/* Overlay remove trigger */}
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="absolute top-2 right-2 bg-white hover:bg-red-500 hover:text-brand-cream text-brand-charcoal rounded-full w-7 h-7 flex items-center justify-center border border-brand-beige/40 shadow-xs z-10 transition-colors cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          ×
                        </button>
                        
                        <div onClick={() => handleProductClick(p.id)} className="cursor-pointer">
                          <div className="aspect-[4/5] bg-white rounded-md overflow-hidden border border-brand-beige/40 shadow-sm">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <h4 className="font-editorial text-sm font-bold text-brand-charcoal mt-3 truncate group-hover:text-brand-gold transition-colors">{p.name}</h4>
                          <p className="text-xs font-semibold text-brand-gray mt-0.5">${p.price.toFixed(2)}</p>
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
                <h3 className="font-editorial text-2xl font-bold text-brand-charcoal border-b border-brand-beige/40 pb-3">
                  Saved Addresses
                </h3>

                {addrSaved && (
                  <div className="bg-brand-sage/10 border border-brand-sage/35 text-brand-sage rounded-sm p-3 font-bold flex items-center gap-1.5 shadow-sm">
                    <Check className="w-4 h-4" />
                    Address saved successfully!
                  </div>
                )}

                <div className="space-y-4 text-left">
                  {/* Recipient */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-charcoal font-semibold block">Full Name</label>
                    <input 
                      type="text"
                      value={shipName}
                      onChange={(e) => setShipName(e.target.value)}
                      className="w-full text-xs bg-white border border-brand-beige/40 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-charcoal shadow-sm"
                      required
                    />
                  </div>

                  {/* Street Address */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-charcoal font-semibold block">Street Address</label>
                    <input 
                      type="text"
                      value={shipAddr}
                      onChange={(e) => setShipAddr(e.target.value)}
                      className="w-full text-xs bg-white border border-brand-beige/40 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-charcoal shadow-sm"
                      required
                    />
                  </div>

                  {/* City & State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-brand-charcoal font-semibold block">City</label>
                      <input 
                        type="text"
                        value={shipCity}
                        onChange={(e) => setShipCity(e.target.value)}
                        className="w-full text-xs bg-white border border-brand-beige/40 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-charcoal shadow-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-brand-charcoal font-semibold block">State / Region</label>
                      <input 
                        type="text"
                        value={shipState}
                        onChange={(e) => setShipState(e.target.value)}
                        className="w-full text-xs bg-white border border-brand-beige/40 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-charcoal shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Country Selection */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-charcoal font-semibold block">Country</label>
                    <select 
                      value={shipCountry}
                      onChange={(e) => setShipCountry(e.target.value)}
                      className="w-full text-xs bg-white border border-brand-beige/40 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-charcoal font-medium cursor-pointer shadow-sm"
                    >
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-charcoal font-semibold block">Phone Number</label>
                    <input 
                      type="tel"
                      value={shipPhone}
                      onChange={(e) => setShipPhone(e.target.value)}
                      className="w-full text-xs bg-white border border-brand-beige/40 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-charcoal shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-sm cursor-pointer shadow-xs"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* TAB 5: PROFILE SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleProfileSave} className="space-y-6 text-xs text-left">
                <h3 className="font-editorial text-2xl font-bold text-brand-charcoal border-b border-brand-beige/40 pb-3">
                  Account Settings
                </h3>

                {profSaved && (
                  <div className="bg-brand-sage/10 border border-brand-sage/35 text-brand-sage rounded-sm p-3 font-bold flex items-center gap-1.5 shadow-sm">
                    <Check className="w-4 h-4" />
                    Profile updated successfully!
                  </div>
                )}

                <div className="space-y-4">
                  {/* Email (Read Only) */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-charcoal font-semibold block">Email Address</label>
                    <input 
                      type="text"
                      value={currentUser.email}
                      className="w-full text-xs bg-neutral-100 border border-brand-beige/40 px-4 py-3 rounded-xs text-neutral-500 select-none font-medium cursor-not-allowed shadow-sm"
                      readOnly
                    />
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-charcoal font-semibold block">Full Name</label>
                    <input 
                      type="text"
                      value={profName}
                      onChange={(e) => setProfName(e.target.value)}
                      className="w-full text-xs bg-white border border-brand-beige/40 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-charcoal shadow-sm"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-charcoal font-semibold block">Phone Number</label>
                    <input 
                      type="tel"
                      value={profPhone}
                      onChange={(e) => setProfPhone(e.target.value)}
                      className="w-full text-xs bg-white border border-brand-beige/40 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-charcoal shadow-sm"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-sm cursor-pointer shadow-xs"
                  >
                    Save Changes
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
