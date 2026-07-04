/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Lock, ArrowRight, ArrowLeft, ShieldCheck, CreditCard, CheckCircle, 
  ShoppingBag, HelpCircle 
} from 'lucide-react';
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

  // If cart is empty, redirect or display warning
  useEffect(() => {
    if (cart.length === 0 && !lastOrderPlaced) {
      setCurrentPage('cart');
    }
  }, [cart]);

  // Step state: 1, 2, 3, 4
  const [step, setStep] = useState(1);
  const [lastOrderPlaced, setLastOrderPlaced] = useState<any>(null);

  // Form Inputs
  const [email, setEmail] = useState(currentUser?.email || '');
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  
  // Shipping Inputs
  const [addressLine1, setAddressLine1] = useState(currentUser?.shippingAddress?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(currentUser?.shippingAddress?.addressLine2 || '');
  const [city, setCity] = useState(currentUser?.shippingAddress?.city || 'Accra');
  const [state, setState] = useState(currentUser?.shippingAddress?.state || 'Greater Accra');
  const [country, setCountry] = useState(currentUser?.shippingAddress?.country || 'Ghana');
  const [shippingPhone, setShippingPhone] = useState(currentUser?.shippingAddress?.phone || currentUser?.phone || '');

  // Payment Inputs (Simulating Paystack integration)
  const [paymentMethod, setPaymentMethod] = useState('paystack_momo'); // paystack_momo or paystack_card
  const [momoNetwork, setMomoNetwork] = useState('mtn'); // mtn, telecel, at
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

  // Handle progressions
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Place order
  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    
    const shippingAddress: Address = {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      phone: shippingPhone
    };

    const methodLabel = paymentMethod === 'paystack_momo' 
      ? `Paystack MoMo (${momoNetwork.toUpperCase()}: ${momoNumber})` 
      : 'Paystack Secured Card';

    setTimeout(() => {
      const order = placeOrder(methodLabel, shippingAddress);
      setLastOrderPlaced(order);
      setIsSubmitting(false);
      setStep(5); // Success step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Checkout header */}
      <div className="text-left space-y-2 border-b border-brand-cream/20 pb-5">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold block">Sanctuary Checkout</span>
        <h1 className="font-editorial text-3xl font-bold text-brand-cream">Botanical Order</h1>
        
        {/* Step indicators */}
        {step <= 4 && (
          <div className="pt-4 grid grid-cols-4 gap-2 max-w-lg text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-brand-cream/80">
            <div className={`border-b-2 pb-1.5 text-left ${step >= 1 ? 'border-brand-forest text-brand-cream font-extrabold' : 'border-brand-cream/20'}`}>1. Account</div>
            <div className={`border-b-2 pb-1.5 text-left ${step >= 2 ? 'border-brand-forest text-brand-cream font-extrabold' : 'border-brand-cream/20'}`}>2. Shipping</div>
            <div className={`border-b-2 pb-1.5 text-left ${step >= 3 ? 'border-brand-forest text-brand-cream font-extrabold' : 'border-brand-cream/20'}`}>3. Payment</div>
            <div className={`border-b-2 pb-1.5 text-left ${step >= 4 ? 'border-brand-forest text-brand-cream font-extrabold' : 'border-brand-cream/20'}`}>4. Review</div>
          </div>
        )}
      </div>

      {step === 5 ? (
        /* =========================================================================
            SUCCESS STATE: COMPLETED ORDER CONFIRMATION
            ========================================================================= */
        <div className="max-w-2xl bg-brand-offwhite border border-brand-cream/20 rounded-md p-8 sm:p-12 mx-auto text-center space-y-6 shadow-md">
          <div className="w-16 h-16 rounded-full bg-brand-sage/10 border-2 border-brand-sage flex items-center justify-center mx-auto text-brand-cream/80">
            <CheckCircle className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-editorial text-3xl font-bold text-brand-cream">Medaase! Thank You</h2>
            <p className="text-xs text-brand-cream/80 max-w-sm mx-auto">
              Your organic botanical order is now being processed. We will email your delivery confirmation and package tracing instructions shortly.
            </p>
          </div>

          {lastOrderPlaced && (
            <div className="bg-brand-purple-dark border border-brand-cream/20 rounded-xs p-5 text-left text-xs space-y-2 max-w-md mx-auto">
              <p className="font-bold text-brand-cream flex justify-between">
                <span>Order Reference:</span>
                <span>{lastOrderPlaced.id}</span>
              </p>
              <p className="text-brand-cream/80 flex justify-between">
                <span>Tracking Pin:</span>
                <span className="font-mono">{lastOrderPlaced.trackingNumber}</span>
              </p>
              <p className="text-brand-cream/80 flex justify-between border-t border-brand-cream/20 pt-2">
                <span>Total Charge:</span>
                <span className="font-semibold text-brand-cream">${lastOrderPlaced.total.toFixed(2)}</span>
              </p>
              <p className="text-brand-cream/80 flex justify-between">
                <span>Settled Via:</span>
                <span>{lastOrderPlaced.paymentMethod}</span>
              </p>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="px-6 py-3 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer"
            >
              Back To Homepage
            </button>
            <button
              onClick={() => setCurrentPage('account:orders')}
              className="px-6 py-3 border border-brand-forest text-brand-cream hover:bg-brand-purple-dark transition-all text-xs tracking-widest uppercase font-bold rounded-xs cursor-pointer"
            >
              Track Order History
            </button>
          </div>
        </div>
      ) : (
        /* CHECKOUT WORKFLOW FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Details according to step */}
          <div className="lg:col-span-7">
            
            {/* STEP 1: CUSTOMER INFORMATION */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 sm:p-8 space-y-6 text-left shadow-xs">
                <h3 className="font-editorial text-xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2">
                  1. Customer Account Information
                </h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Email Address</label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. kofi@gmail.com"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                    <span className="block text-[10px] text-brand-cream/80 leading-normal">
                      Used for order invoices and package delivery tracking codes.
                    </span>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Receiver Full Name</label>
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Kofi Boateng"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Primary Phone Number</label>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +233 24 412 3456"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                    <span className="block text-[10px] text-brand-cream/80 leading-normal">
                      Courier will contact you on this line during regional delivery attempts.
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    Proceed To Shipping
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: SHIPPING INFORMATION */}
            {step === 2 && (
              <form onSubmit={handleNextStep} className="bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 sm:p-8 space-y-6 text-left shadow-xs">
                <h3 className="font-editorial text-xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2">
                  2. Delivery Shipping Address
                </h3>
                
                <div className="space-y-4">
                  {/* Address Line 1 */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Street Address</label>
                    <input 
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="e.g. 34 Liberation Road"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                      required
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Apartment / Landmark (Optional)</label>
                    <input 
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="e.g. Near Airport Residential Area, Apartment 5"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    />
                  </div>

                  {/* City & State Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-brand-cream font-semibold block">City</label>
                      <input 
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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

                  {/* Country Selection */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Country</label>
                    <select 
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-medium cursor-pointer"
                    >
                      <option value="Ghana">Ghana (Local)</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom (DHL)</option>
                      <option value="United States">United States (DHL)</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  {/* Shipping phone override */}
                  <div className="space-y-1">
                    <label className="text-xs text-brand-cream font-semibold block">Delivery Phone override (if different)</label>
                    <input 
                      type="tel"
                      value={shippingPhone}
                      onChange={(e) => setShippingPhone(e.target.value)}
                      placeholder="e.g. +233 24 412 3456"
                      className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between gap-4">
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
                    className="px-6 py-3.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    Proceed To Payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT METHOD (PAYSTACK INFUSED) */}
            {step === 3 && (
              <form onSubmit={handleNextStep} className="bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 sm:p-8 space-y-6 text-left shadow-xs">
                <div className="border-b border-brand-cream/20 pb-2 flex justify-between items-center">
                  <h3 className="font-editorial text-xl font-bold text-brand-cream">
                    3. Paystack Secured Payment
                  </h3>
                  <div className="flex gap-2 items-center bg-brand-purple-dark px-3 py-1 rounded-full border border-brand-cream/20">
                    <ShieldCheck className="w-4 h-4 text-brand-cream/80" />
                    <span className="text-[9px] uppercase tracking-wider font-sans font-bold text-brand-cream/80">Secured API</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Option triggers */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* MoMo Option */}
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

                    {/* Card Option */}
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
                      <span className="text-xs uppercase tracking-wider">Secure Card</span>
                    </button>
                  </div>

                  {/* MoMo Specific Fields */}
                  {paymentMethod === 'paystack_momo' && (
                    <div className="bg-brand-purple-dark p-5 rounded-xs border border-brand-cream/20 space-y-4">
                      <span className="text-[9px] uppercase tracking-widest text-brand-cream/80 font-bold block">Network Operator</span>
                      
                      {/* Network Select */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'mtn', label: 'MTN MoMo' },
                          { id: 'telecel', label: 'Telecel Cash' },
                          { id: 'at', label: 'AT Money' }
                        ].map((net) => (
                          <button
                            key={net.id}
                            type="button"
                            onClick={() => setMomoNetwork(net.id)}
                            className={`p-2.5 text-[10px] uppercase tracking-wider font-bold rounded-xs border cursor-pointer transition-all ${
                              momoNetwork === net.id
                                ? 'bg-brand-forest text-brand-cream border-brand-forest'
                                : 'bg-brand-purple-dark text-brand-cream border-brand-cream/20 hover:border-brand-sage'
                            }`}
                          >
                            {net.label}
                          </button>
                        ))}
                      </div>

                      {/* Momo Number input */}
                      <div className="space-y-1 pt-1">
                        <label className="text-xs text-brand-cream font-semibold block">Registered Wallet Number</label>
                        <input 
                          type="tel"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          placeholder="e.g. 0244123456"
                          className="w-full text-xs bg-brand-offwhite border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-mono"
                          required
                        />
                        <span className="block text-[10px] text-brand-cream/80 leading-normal font-light">
                          Upon review, Paystack will push a secured USSD prompt to this phone wallet. Enter your PIN to settle GHS equivalent securely.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Specific Fields */}
                  {paymentMethod === 'paystack_card' && (
                    <div className="bg-brand-purple-dark p-5 rounded-xs border border-brand-cream/20 space-y-4">
                      {/* Card Holder */}
                      <div className="space-y-1">
                        <label className="text-xs text-brand-cream font-semibold block">Cardholder Name</label>
                        <input 
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="e.g. Kofi Boateng"
                          className="w-full text-xs bg-brand-offwhite border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                          required
                        />
                      </div>

                      {/* Card Number */}
                      <div className="space-y-1">
                        <label className="text-xs text-brand-cream font-semibold block">Secured Card Number</label>
                        <input 
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className="w-full text-xs bg-brand-offwhite border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-mono"
                          required
                        />
                      </div>

                      {/* Expiry & CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream font-semibold block">Expiry (MM/YY)</label>
                          <input 
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full text-xs bg-brand-offwhite border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-mono"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-brand-cream font-semibold block">Secured CVV</label>
                          <input 
                            type="password"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                            placeholder="***"
                            className="w-full text-xs bg-brand-offwhite border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-mono"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div className="pt-4 flex justify-between gap-4">
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
                    className="px-6 py-3.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    Proceed To Review
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: ORDER REVIEW & VERIFICATION */}
            {step === 4 && (
              <div className="bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 sm:p-8 space-y-6 text-left shadow-xs">
                <h3 className="font-editorial text-xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2">
                  4. Review Botanical Order
                </h3>
                
                {/* Information Summaries */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-cream/80 font-light">
                  {/* Account overview */}
                  <div className="bg-brand-purple-dark border border-brand-cream/20 p-4 rounded-xs space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-brand-cream font-bold block">Recipient</span>
                    <p className="font-semibold text-brand-cream">{fullName}</p>
                    <p>{email}</p>
                    <p>{phone}</p>
                  </div>

                  {/* Shipping overview */}
                  <div className="bg-brand-purple-dark border border-brand-cream/20 p-4 rounded-xs space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-brand-cream font-bold block">Delivery Destination</span>
                    <p className="font-semibold text-brand-cream">{addressLine1}</p>
                    {addressLine2 && <p>{addressLine2}</p>}
                    <p>{city}, {state}</p>
                    <p>{country}</p>
                  </div>

                  {/* Payment Overview */}
                  <div className="bg-brand-purple-dark border border-brand-cream/20 p-4 rounded-xs col-span-1 sm:col-span-2 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-brand-cream font-bold block">Paystack Method</span>
                    <p className="font-semibold text-brand-cream flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-brand-cream/80" />
                      {paymentMethod === 'paystack_momo' 
                        ? `Mobile Money: ${momoNetwork.toUpperCase()} (${momoNumber})` 
                        : 'Secure Visa/Mastercard Account'}
                    </p>
                  </div>
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
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-brand-forest text-brand-cream hover:bg-brand-sage disabled:bg-brand-sage transition-all text-xs tracking-widest uppercase font-extrabold rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-brand-cream border-t-transparent rounded-full animate-spin"></span>
                        Transacting...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4.5 h-4.5 text-brand-gold fill-current" />
                        Authorize Botanical Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Mini Checkout Basket Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 space-y-4 shadow-xs text-left">
              <h3 className="font-editorial text-lg font-bold text-brand-cream flex items-center gap-2 border-b border-brand-cream/20 pb-2">
                <ShoppingBag className="w-4.5 h-4.5 text-brand-cream/80" />
                Botanical Basket
              </h3>

              {/* Items checklist */}
              <div className="divide-y divide-brand-beige/15 max-h-60 overflow-y-auto pr-2 space-y-3.5">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 pt-3 first:pt-0">
                    <div className="w-12 h-12 bg-brand-purple-dark rounded-xs overflow-hidden border border-brand-cream/20 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-editorial font-bold text-brand-cream truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-brand-cream/80">Size: {item.selectedSize} × {item.quantity}</p>
                      <p className="font-semibold text-brand-cream mt-0.5">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="pt-4 border-t border-brand-cream/20 space-y-2.5 text-xs text-brand-cream/80 font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-cream">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between font-bold text-brand-cream/80">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-brand-cream">
                    {shipping === 0 ? (
                      <span className="text-brand-cream/80 italic uppercase tracking-wider text-[10px] font-bold">Complimentary</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-brand-cream/20 flex justify-between text-base font-bold text-brand-cream font-editorial">
                  <span>Authorized Charge</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

            </div>

            {/* Assistance Card */}
            <div className="bg-brand-offwhite border border-brand-cream/20 rounded-md p-5 text-left text-xs text-brand-cream/80 space-y-2 font-light">
              <p className="font-bold text-brand-cream flex items-center gap-1">
                <HelpCircle className="w-4 h-4 text-brand-cream/80" />
                Need ordering assistance?
              </p>
              <p>For custom delivery inquiries or MoMo help, message our Vicesh help desk on WhatsApp:</p>
              <a 
                href="https://wa.me/233595780477" 
                target="_blank" 
                rel="noreferrer"
                className="text-brand-cream font-bold hover:text-brand-cream/80 transition-colors underline block"
              >
                📱 WhatsApp support: +233 (0) 59 578 0477
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
