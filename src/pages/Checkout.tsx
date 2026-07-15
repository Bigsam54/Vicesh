/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowRight, ArrowLeft, ShieldCheck, CreditCard, CheckCircle, 
  ShoppingBag, HelpCircle, User, MapPin
} from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { Address } from '../types';

interface CheckoutProps {
  setCurrentPage: (page: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ setCurrentPage }) => {
  const { 
    cart, 
    currentUser, 
    getCartSubtotal, 
    getShippingCost, 
    getCartTotal, 
    appliedCoupon,
    placeOrder
  } = useStore();

  // Simplified Step state: 1 (Delivery), 2 (Payment & Review), 3 (Success)
  const [step, setStep] = useState(1);
  const [lastOrderPlaced, setLastOrderPlaced] = useState<any>(null);

  // If cart is empty, redirect or display warning
  useEffect(() => {
    if (cart.length === 0 && !lastOrderPlaced) {
      setCurrentPage('cart');
    }
  }, [cart, lastOrderPlaced, setCurrentPage]);

  // Delivery Inputs (Combines old Account + Shipping)
  const [email, setEmail] = useState(currentUser?.email || '');
  const [fullName, setFullName] = useState(currentUser?.shippingAddress?.fullName || currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.shippingAddress?.phone || currentUser?.phone || '');
  const [addressLine1, setAddressLine1] = useState(currentUser?.shippingAddress?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(currentUser?.shippingAddress?.addressLine2 || '');
  const [city, setCity] = useState(currentUser?.shippingAddress?.city || '');
  const [state, setState] = useState(currentUser?.shippingAddress?.state || '');
  const [country, setCountry] = useState(currentUser?.shippingAddress?.country || 'Ghana');

  // Payment Inputs
  const [paymentMethod, setPaymentMethod] = useState('paystack_momo'); 
  const [momoNetwork, setMomoNetwork] = useState('mtn'); 
  const [momoNumber, setMomoNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Submission / Loading simulator
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const shippingAddress: Address = {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      phone
    };

    const methodLabel = paymentMethod === 'paystack_momo' 
      ? `Mobile Money (${momoNetwork.toUpperCase()})` 
      : 'Credit/Debit Card';

    try {
      const order = await placeOrder(methodLabel, shippingAddress);
      setLastOrderPlaced(order);
      setIsSubmitting(false);
      setStep(3); // Success step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Order failed", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Checkout header */}
      <div className="text-left space-y-2 border-b border-brand-cream/20 pb-5">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold block">Secure Checkout</span>
        <h1 className="font-editorial text-3xl font-bold text-brand-cream">Complete Your Order</h1>
        
        {/* Simplified Step indicators */}
        {step <= 2 && (
          <div className="pt-4 grid grid-cols-2 gap-4 max-w-sm text-[10px] uppercase tracking-widest font-bold text-brand-cream/80">
            <div className={`border-b-2 pb-1.5 text-left ${step >= 1 ? 'border-brand-forest text-brand-cream font-extrabold' : 'border-brand-cream/20'}`}>
              1. Delivery
            </div>
            <div className={`border-b-2 pb-1.5 text-left ${step >= 2 ? 'border-brand-forest text-brand-cream font-extrabold' : 'border-brand-cream/20'}`}>
              2. Payment
            </div>
          </div>
        )}
      </div>

      {step === 3 ? (
        /* =========================================================================
            SUCCESS STATE
            ========================================================================= */
        <div className="max-w-2xl bg-brand-purple border border-brand-cream/20 rounded-md p-8 sm:p-12 mx-auto text-center space-y-6 shadow-md">
          <div className="w-16 h-16 rounded-full bg-brand-sage/10 border-2 border-brand-sage flex items-center justify-center mx-auto text-brand-cream/80">
            <CheckCircle className="w-10 h-10 text-brand-sage" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-editorial text-3xl font-bold text-brand-cream">Thank You!</h2>
            <p className="text-xs text-brand-cream/80 max-w-sm mx-auto">
              Your order has been placed successfully. We've sent a confirmation email with your order details and tracking info.
            </p>
          </div>

          {lastOrderPlaced && (
            <div className="bg-brand-purple-dark border border-brand-cream/20 rounded-xs p-5 text-left text-xs space-y-2 max-w-md mx-auto">
              <p className="font-bold text-brand-cream flex justify-between">
                <span>Order Number:</span>
                <span>{lastOrderPlaced.id}</span>
              </p>
              <p className="text-brand-cream/80 flex justify-between">
                <span>Tracking Number:</span>
                <span className="font-mono">{lastOrderPlaced.trackingNumber}</span>
              </p>
              <p className="text-brand-cream/80 flex justify-between border-t border-brand-cream/20 pt-2">
                <span>Total Paid:</span>
                <span className="font-semibold text-brand-cream">${lastOrderPlaced.total.toFixed(2)}</span>
              </p>
              <p className="text-brand-cream/80 flex justify-between">
                <span>Payment Method:</span>
                <span>{lastOrderPlaced.paymentMethod}</span>
              </p>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer"
            >
              Back to Home
            </button>
            <button
              onClick={() => setCurrentPage('account:orders')}
              className="px-6 py-3 border border-brand-forest text-brand-cream hover:bg-brand-purple-dark transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer"
            >
              View My Orders
            </button>
          </div>
        </div>
      ) : (
        /* CHECKOUT WORKFLOW FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7">
            
            {/* STEP 1: DELIVERY DETAILS (Combined Info + Shipping) */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="bg-brand-purple border border-brand-cream/20 rounded-md p-6 sm:p-8 space-y-8 text-left shadow-xs">
                
                {/* Contact Info Section */}
                <div className="space-y-4">
                  <h3 className="font-editorial text-xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2 flex items-center gap-2">
                    <User className="w-5 h-5 text-brand-gold" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream font-semibold block">Full Name</label>
                      <input 
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jane Doe"
                        className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream font-semibold block">Email</label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. jane@example.com"
                        className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Phone Number</label>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 054 123 4567"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Address Section */}
                <div className="space-y-4">
                  <h3 className="font-editorial text-xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-gold" />
                    Delivery Address
                  </h3>
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Street Address</label>
                    <input 
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="e.g. 123 Main Street"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Apartment, suite, etc. (optional)</label>
                    <input 
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="e.g. Apt 4B"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream font-semibold block">City</label>
                      <input 
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Accra"
                        className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream font-semibold block">Region / State</label>
                      <input 
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Greater Accra"
                        className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Country</label>
                    <select 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-medium cursor-pointer"
                    >
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT & REVIEW */}
            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="bg-brand-purple border border-brand-cream/20 rounded-md p-6 sm:p-8 space-y-8 text-left shadow-xs">
                
                {/* Review Details Summary */}
                <div className="space-y-4">
                  <h3 className="font-editorial text-xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2">
                    Review Details
                  </h3>
                  <div className="bg-brand-purple-dark border border-brand-cream/20 p-4 rounded-xs text-xs flex justify-between items-start">
                    <div>
                      <p className="font-bold text-brand-cream">{fullName}</p>
                      <p className="text-brand-cream/80">{addressLine1}{addressLine2 && `, ${addressLine2}`}</p>
                      <p className="text-brand-cream/80">{city}, {state}, {country}</p>
                      <p className="text-brand-cream/80 mt-1">{email} | {phone}</p>
                    </div>
                    <button type="button" onClick={handlePrevStep} className="text-brand-gold hover:underline font-semibold cursor-pointer">Edit</button>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-4">
                  <div className="border-b border-brand-cream/20 pb-2 flex justify-between items-center">
                    <h3 className="font-editorial text-xl font-bold text-brand-cream">
                      Payment Method
                    </h3>
                    <div className="flex gap-1.5 items-center bg-brand-purple-dark px-2 py-1 rounded-full border border-brand-cream/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-cream/80" />
                      <span className="text-[9px] uppercase tracking-wider font-bold text-brand-cream/80">Secure</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paystack_momo')}
                      className={`p-4 border rounded-md flex flex-col items-center gap-2 cursor-pointer transition-all text-center ${
                        paymentMethod === 'paystack_momo'
                          ? 'border-brand-forest bg-brand-forest/5 text-brand-cream font-bold'
                          : 'border-brand-cream/20 text-brand-cream/80 hover:border-brand-sage'
                      }`}
                    >
                      <ShoppingBag className="w-6 h-6 text-brand-cream/80" />
                      <span className="text-xs uppercase tracking-wider">Mobile Money</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paystack_card')}
                      className={`p-4 border rounded-md flex flex-col items-center gap-2 cursor-pointer transition-all text-center ${
                        paymentMethod === 'paystack_card'
                          ? 'border-brand-forest bg-brand-forest/5 text-brand-cream font-bold'
                          : 'border-brand-cream/20 text-brand-cream/80 hover:border-brand-sage'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 text-brand-cream/80" />
                      <span className="text-xs uppercase tracking-wider">Card</span>
                    </button>
                  </div>

                  {/* MoMo Fields */}
                  {paymentMethod === 'paystack_momo' && (
                    <div className="bg-brand-purple-dark p-5 rounded-xs border border-brand-cream/20 space-y-4">
                      <span className="text-xs font-semibold text-brand-cream block">Select Network</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'mtn', label: 'MTN' },
                          { id: 'telecel', label: 'Telecel' },
                          { id: 'at', label: 'AT' }
                        ].map((net) => (
                          <button
                            key={net.id}
                            type="button"
                            onClick={() => setMomoNetwork(net.id)}
                            className={`p-2.5 text-xs font-bold rounded-xs border cursor-pointer transition-all ${
                              momoNetwork === net.id
                                ? 'bg-brand-forest text-brand-cream border-brand-forest'
                                : 'bg-brand-purple-dark text-brand-cream border-brand-cream/20 hover:border-brand-sage'
                            }`}
                          >
                            {net.label}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-brand-cream font-semibold block">Mobile Money Number</label>
                        <input 
                          type="tel"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          placeholder="e.g. 024 123 4567"
                          className="w-full text-xs bg-brand-purple border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Card Fields */}
                  {paymentMethod === 'paystack_card' && (
                    <div className="bg-brand-purple-dark p-5 rounded-xs border border-brand-cream/20 space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs text-brand-cream font-semibold block">Name on Card</label>
                        <input 
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full text-xs bg-brand-purple border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-brand-cream font-semibold block">Card Number</label>
                        <input 
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className="w-full text-xs bg-brand-purple border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-mono"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream font-semibold block">Expiry Date</label>
                          <input 
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full text-xs bg-brand-purple border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-mono"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream font-semibold block">CVV</label>
                          <input 
                            type="password"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            placeholder="123"
                            className="w-full text-xs bg-brand-purple border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-mono"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between gap-4 border-t border-brand-cream/20">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-3 border border-brand-cream/20 text-brand-cream hover:bg-brand-purple-dark transition-colors text-xs tracking-widest uppercase font-bold rounded-xs flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-brand-gold text-brand-purple hover:bg-brand-gold-light disabled:opacity-70 transition-all text-xs tracking-widest uppercase font-extrabold rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-purple border border-brand-cream/20 rounded-md p-6 space-y-4 shadow-xs text-left">
              <h3 className="font-editorial text-lg font-bold text-brand-cream flex items-center gap-2 border-b border-brand-cream/20 pb-2">
                <ShoppingBag className="w-4.5 h-4.5 text-brand-cream/80" />
                Order Summary
              </h3>

              {/* Items list */}
              <div className="divide-y divide-brand-beige/15 max-h-60 overflow-y-auto pr-2 space-y-3.5">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 pt-3 first:pt-0">
                    <div className="w-12 h-12 bg-brand-purple-dark rounded-xs overflow-hidden border border-brand-cream/20 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-editorial font-bold text-brand-cream truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-brand-cream/80">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      <p className="font-semibold text-brand-cream mt-0.5">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-brand-cream/20 space-y-2.5 text-xs text-brand-cream/80 font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-cream">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between font-bold text-brand-gold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-brand-cream">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-brand-cream/20 flex justify-between text-base font-bold text-brand-cream font-editorial">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Assistance Card */}
            <div className="bg-brand-purple border border-brand-cream/20 rounded-md p-5 text-left text-xs text-brand-cream/80 space-y-2 font-light">
              <p className="font-bold text-brand-cream flex items-center gap-1">
                <HelpCircle className="w-4 h-4 text-brand-cream/80" />
                Need help?
              </p>
              <p>Message us on WhatsApp for support:</p>
              <a 
                href="https://wa.me/233595780477" 
                target="_blank" 
                rel="noreferrer"
                className="text-brand-cream font-bold hover:text-brand-gold transition-colors block"
              >
                +233 (0) 59 578 0477
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
