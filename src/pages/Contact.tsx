/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle, ShieldAlert } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('order_inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate sending ticket
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-left space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold block">Vicesh Cosmetics Desk</span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-brand-cream">Contact Our Team</h1>
        <div className="w-12 h-[1px] bg-brand-gold mt-1"></div>
      </div>

      {/* Wholesale Banner Notification */}
      <div className="bg-brand-forest text-brand-cream border border-brand-gold/25 rounded-md p-6 sm:p-8 text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Wholesale Opportunities</span>
          <h3 className="font-editorial text-xl font-bold">Interested in Wholesale Pricing or salon packages?</h3>
          <p className="text-xs text-brand-cream/80 font-light leading-relaxed">
            We offer specialized wholesale pricing for cosmetic shops, spas, beauty schools, and salons. Please reach out directly to our business desk via Phone, WhatsApp, or Email to place a custom wholesale purchase.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
          <a 
            href="https://wa.me/233595780477?text=Hello%20Vicesh%2C%20I%20am%20interested%20in%20wholesale%20purchases" 
            target="_blank" 
            rel="noreferrer"
            className="w-full text-center px-5 py-3 bg-brand-gold hover:bg-brand-purple-dark hover:text-brand-cream text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-xs"
          >
            Wholesale WhatsApp
          </a>
          <a 
            href="mailto:viceshcompanyltd@gmail.com?subject=Wholesale%20Inquiry"
            className="w-full text-center px-5 py-3 border border-brand-cream hover:bg-brand-purple-dark hover:text-brand-cream text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xs transition-all"
          >
            Email Wholesale Desk
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact info */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          <div className="space-y-4">
            <h3 className="font-editorial text-2xl font-bold text-brand-cream">Corporate Office & Showroom</h3>
            <p className="text-xs sm:text-sm text-brand-cream/80 font-light leading-relaxed">
              For any questions regarding our organic formulations, delivery timelines, product ingredients, or bulk packaging, use the contact details below or send a support ticket.
            </p>
          </div>

          {/* Quick contact list */}
          <div className="space-y-4 text-xs font-light text-brand-cream/80 leading-relaxed">
            
            <div className="flex gap-3 items-start bg-brand-offwhite border border-brand-cream/20 p-4 rounded-xs">
              <MapPin className="w-5 h-5 text-brand-cream/80 shrink-0" />
              <div>
                <p className="font-bold text-brand-cream uppercase tracking-wider text-[9px] mb-0.5">Physical Headquarters Address</p>
                <p className="font-semibold text-brand-cream">CL-0635-9738, Oguaakrom, Winneba Road, Ghana.</p>
                <p className="mt-1 text-[10px] text-brand-gold font-medium">Pickup spot available at: Accra, Makola</p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-brand-offwhite border border-brand-cream/20 p-4 rounded-xs">
              <Phone className="w-5 h-5 text-brand-cream/80 shrink-0" />
              <div>
                <p className="font-bold text-brand-cream uppercase tracking-wider text-[9px] mb-0.5">Phone & WhatsApp Support Desk</p>
                <p className="font-semibold text-brand-cream text-sm">0595780477</p>
                <p className="font-semibold text-brand-cream mt-0.5">+233 (0) 59 578 0477</p>
                <p className="mt-1">Available Monday to Saturday for direct orders and tele-consultation.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-brand-offwhite border border-brand-cream/20 p-4 rounded-xs">
              <Mail className="w-5 h-5 text-brand-cream/80 shrink-0" />
              <div>
                <p className="font-bold text-brand-cream uppercase tracking-wider text-[9px] mb-0.5">Email Support Inbox</p>
                <p className="font-semibold text-brand-cream">viceshcompanyltd@gmail.com</p>
                <p className="mt-1">For sales inquiries, corporate collaborations, or order queries.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-brand-offwhite border border-brand-cream/20 p-4 rounded-xs">
              <Clock className="w-5 h-5 text-brand-cream/80 shrink-0" />
              <div>
                <p className="font-bold text-brand-cream uppercase tracking-wider text-[9px] mb-0.5">Support Desk Timing</p>
                <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                <p>Saturday: 9:00 AM – 4:00 PM</p>
                <p className="italic text-brand-gold mt-1">Closed Sundays & Ghana Public Holidays</p>
              </div>
            </div>

          </div>

          {/* WhatsApp Direct */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-md p-6 space-y-3">
            <h4 className="font-editorial text-lg font-bold text-emerald-800 flex items-center gap-1.5">
              <MessageCircle className="w-5 h-5 fill-current" />
              Instant WhatsApp Support
            </h4>
            <p className="text-xs text-emerald-700 leading-relaxed font-light">
              Chat instantly with a Vicesh beauty and hair consultant. Perfect for real-time delivery tracking, payment queries, or ingredient concerns.
            </p>
            <a 
              href="https://wa.me/233595780477" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
            >
              Start Chat
            </a>
          </div>

          {/* BRAND GUIDELINES & BRAND COMPLIANCE DESK */}
          <div className="relative overflow-hidden bg-brand-forest text-brand-cream border border-brand-gold/25 rounded-md p-6 space-y-4 shadow-sm">
            {/* Visual Droplet Symbol background watermark */}
            <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 text-brand-gold/15 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 8 C50 8 82 46 82 68 C82 85.67 67.67 100 50 100 C32.33 100 18 85.67 18 68 C18 46 50 8 50 8 Z" />
              </svg>
            </div>
            
            <div className="space-y-1 z-10 relative">
              <span className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em] block">Brand Guidelines & Design Desk</span>
              <h4 className="font-editorial text-lg font-bold">Communications & Brand Identity</h4>
            </div>
            <p className="text-xs text-brand-cream/90 font-light leading-relaxed z-10 relative">
              The VICESH brand system represents authentic local heritage, botanical purity, and eco-certified craftsmanship. These design principles and rules must be applied consistently across all printed and digital communications.
            </p>
            <div className="bg-black/15 p-3 rounded-xs border border-brand-gold/10 z-10 relative text-[11px] leading-relaxed">
              <p className="font-semibold text-brand-gold mb-1">Manager Contact Details:</p>
              <p className="text-brand-cream/80 font-light">
                If additional brand guidance is required, or design improvements are suggested, stakeholders and team partners should contact the <span className="font-semibold text-brand-purple">VICESH Communications Manager</span> at <span className="font-semibold text-brand-gold">brand@vicesh.com</span> or via this page.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Support Ticket Form */}
        <div className="lg:col-span-7 bg-brand-offwhite border border-brand-cream/20 rounded-md p-6 sm:p-10 shadow-xs text-left space-y-6">
          <h3 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-3">
            Submit Support Inquiry
          </h3>

          {submitted ? (
            <div className="bg-brand-sage/10 border border-brand-sage/35 text-center p-8 rounded-xs space-y-3">
              <CheckCircle className="w-12 h-12 text-brand-cream/80 mx-auto" />
              <h4 className="font-editorial text-xl font-bold text-brand-cream">Ticket Submitted Successfully!</h4>
              <p className="text-xs text-brand-cream/80 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting Vicesh Cosmetics. Our representative will review your inquiry and reach out via email or phone within 24 business hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold uppercase tracking-widest text-brand-cream hover:text-brand-cream/80 pt-2 underline cursor-pointer"
              >
                Send Another Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs text-brand-cream font-semibold block">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Abena Mensah"
                    className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    required
                  />
                </div>

                {/* Email address */}
                <div className="space-y-1">
                  <label className="text-xs text-brand-cream font-semibold block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. abena@gmail.com"
                    className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-xs text-brand-cream font-semibold block">Inquiry Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream font-medium cursor-pointer"
                >
                  <option value="order_inquiry">Order Status & Tracking</option>
                  <option value="product_consult">Botanical Ingredient Question</option>
                  <option value="wholesale">Wholesale Pricing & Salon Bulks</option>
                  <option value="feedback">Client Feedback</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs text-brand-cream font-semibold block">Message Details</label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need..."
                  className="w-full text-xs bg-brand-purple-dark border border-brand-cream/20 px-4 py-3 rounded-xs focus:outline-none focus:border-brand-sage text-brand-cream resize-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-brand-forest text-brand-cream hover:bg-brand-sage transition-all text-xs tracking-widest uppercase font-bold rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Support Ticket
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
