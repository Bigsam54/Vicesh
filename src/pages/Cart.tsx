/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, X } from 'lucide-react';

interface CartProps {
  setCurrentPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ setCurrentPage, setSelectedProductId }) => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    getCartSubtotal, 
    getShippingCost, 
    getCartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost();
  const total = getCartTotal();

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCouponCode(couponCode);
    setCouponFeedback({ success: res.success, message: res.message });
    if (res.success) {
      setCouponCode('');
    }
    
    // Clear feedback after 3 seconds
    setTimeout(() => setCouponFeedback(null), 3000);
  };

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage(`product:${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = () => {
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-left space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold block">My Purchase Overview</span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-cream">Botanical Basket</h1>
        <div className="w-12 h-[1px] bg-brand-gold mt-1"></div>
      </div>

      {cart.length === 0 ? (
        /* EMPTY STATE */
        <div className="bg-brand-offwhite border border-brand-cream/20 rounded-md py-20 text-center space-y-5 max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-brand-purple-dark border border-brand-cream/20 flex items-center justify-center mx-auto text-brand-cream/80">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-brand-cream">Your basket is empty</h2>
          <p className="text-xs text-brand-cream/80 max-w-sm mx-auto leading-relaxed">
            Fill your self-care shelf with our raw, botanical haircare, authentic pedicure elements, and organic manicure formulations.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-3.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer shadow-xs"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        /* CART CONTENT GRID */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Cart items table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-brand-offwhite border border-brand-cream/20 rounded-md overflow-hidden shadow-xs">
              
              {/* Header titles (Desktop Only) */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-brand-purple-dark border-b border-brand-cream/20 text-[10px] uppercase tracking-widest font-bold text-brand-cream/80">
                <div className="col-span-6">Botanical product</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items row list */}
              <div className="divide-y divide-brand-beige/15 px-4 sm:px-6">
                {cart.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center">
                    
                    {/* Thumbnail & Identity */}
                    <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                      <div 
                        onClick={() => handleProductClick(item.product.id)}
                        className="w-20 h-20 bg-brand-purple-dark rounded-xs overflow-hidden border border-brand-cream/20 flex-shrink-0 cursor-pointer hover:opacity-90"
                      >
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left min-w-0">
                        <h4 
                          onClick={() => handleProductClick(item.product.id)}
                          className="font-editorial text-base font-bold text-brand-cream hover:text-brand-cream/80 cursor-pointer line-clamp-1"
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-[10px] text-brand-cream/80 uppercase tracking-wider mt-0.5">Size: {item.selectedSize}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-brand-cream/80 hover:text-red-600 font-bold uppercase tracking-wider flex items-center gap-1 mt-2.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-1 md:col-span-2 text-left md:text-center flex md:block justify-between text-xs font-semibold text-brand-cream pt-2 md:pt-0">
                      <span className="md:hidden text-brand-cream/80 font-normal uppercase tracking-wider text-[10px]">Price:</span>
                      <span>${item.product.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between pt-1 md:pt-0">
                      <span className="md:hidden text-brand-cream/80 font-normal uppercase tracking-wider text-[10px]">Quantity:</span>
                      <div className="flex items-center border border-brand-cream/20 rounded-xs bg-brand-purple-dark w-24">
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-brand-cream hover:text-brand-cream/80 font-semibold"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-xs font-semibold text-brand-cream">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-brand-cream hover:text-brand-cream/80 font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Row subtotal */}
                    <div className="col-span-1 md:col-span-2 text-right flex md:block justify-between text-sm font-bold text-brand-cream pt-2 md:pt-0">
                      <span className="md:hidden text-brand-cream/80 font-normal uppercase tracking-wider text-[10px]">Total:</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Shopping continuity */}
            <div className="flex justify-start text-xs font-bold uppercase tracking-wider">
              <button 
                onClick={() => setCurrentPage('shop')}
                className="text-brand-cream hover:text-brand-cream/80 transition-all py-1 border-b border-brand-forest hover:border-brand-sage"
              >
                ← Continue Browsing
              </button>
            </div>
          </div>

          {/* Right Column: Checkout Summary Panel */}
          <div className="lg:col-span-4 space-y-6 sticky top-32">
            
            {/* Promo Code widget */}
            <div className="bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 space-y-4 shadow-xs text-left">
              <h3 className="font-editorial text-base font-semibold text-brand-cream flex items-center gap-1.5 border-b border-brand-cream/20 pb-2">
                <Tag className="w-4 h-4 text-brand-cream/80" />
                Promo Discount Code
              </h3>
              
              {appliedCoupon ? (
                <div className="bg-brand-sage/10 border border-brand-sage/35 rounded-xs p-3 flex justify-between items-center text-xs">
                  <div className="text-brand-cream">
                    <span className="font-semibold">{appliedCoupon.code}</span>
                    <span className="text-brand-cream/80 block text-[10px]">Applied: {appliedCoupon.value}% reduction</span>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-brand-cream/80 hover:text-brand-cream"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. VICESH20"
                    className="flex-1 bg-brand-purple-dark border border-brand-cream/20 text-xs rounded-xs px-3 py-2.5 focus:outline-none focus:border-brand-sage text-brand-cream uppercase"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-colors text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Coupon code feedback */}
              {couponFeedback && (
                <p className={`text-[10px] font-bold ${couponFeedback.success ? 'text-brand-cream/80' : 'text-red-600'}`}>
                  {couponFeedback.message}
                </p>
              )}

              {/* Suggestions */}
              {!appliedCoupon && (
                <div className="pt-2 text-[10px] text-brand-cream/80 font-light space-y-1">
                  <p>Try <span className="font-semibold text-brand-cream">VICESH20</span> for 20% off orders above $50</p>
                  <p>Try <span className="font-semibold text-brand-cream">ORGANIC10</span> for 10% off site-wide</p>
                </div>
              )}
            </div>

            {/* Order breakdown summary card */}
            <div className="bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 space-y-5 shadow-xs text-left">
              <h3 className="font-editorial text-lg font-bold text-brand-cream border-b border-brand-cream/20 pb-2">Order Summary</h3>
              
              <div className="space-y-3 text-xs leading-relaxed text-brand-cream/80">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-brand-cream">${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-brand-cream/80 font-bold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span className="font-semibold text-brand-cream">
                    {shipping === 0 ? (
                      <span className="text-brand-cream/80 italic uppercase tracking-wider text-[10px] font-bold">Complimentary</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-brand-cream/20 flex justify-between text-base font-bold text-brand-cream font-editorial">
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Threshold indicator */}
              {subtotal < 100 ? (
                <div className="bg-brand-purple-dark border border-brand-cream/20 rounded-xs p-3 text-[10px] text-brand-cream/80 leading-relaxed font-light">
                  Add <span className="font-semibold text-brand-cream">${(100 - subtotal).toFixed(2)}</span> more to unlock <span className="font-bold text-brand-cream uppercase tracking-wider">Complimentary Complimentary Shipping</span>!
                </div>
              ) : (
                <div className="bg-brand-sage/10 border border-brand-sage/25 rounded-xs p-3 text-[10px] text-brand-cream/80 font-bold leading-relaxed flex items-center gap-1.5">
                  🎉 Your order qualifies for Complimentary Shipping!
                </div>
              )}

              {/* Progress checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-extrabold rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                Proceed To Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust badges */}
              <div className="pt-3 flex justify-center gap-4 text-[10px] text-brand-cream/80 font-light">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Secure SSL encryption</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
