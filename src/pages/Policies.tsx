/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Truck, RotateCcw, FileText, ChevronRight } from 'lucide-react';

interface PoliciesProps {
  initialPolicy?: string;
}

export const Policies: React.FC<PoliciesProps> = ({ initialPolicy = 'shipping' }) => {
  const [activePolicy, setActivePolicy] = useState(initialPolicy);

  useEffect(() => {
    setActivePolicy(initialPolicy);
  }, [initialPolicy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-left space-y-2 border-b border-brand-cream/20 pb-5">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/80 font-bold block">Assurances & Policies</span>
        <h1 className="font-editorial text-3xl font-bold text-brand-cream">Corporate Policies</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 bg-brand-purple-dark border border-brand-cream/20 rounded-md p-5 space-y-2 text-left sticky top-32">
          {[
            { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
            { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
            { id: 'privacy', label: 'Privacy Policy', icon: Shield },
            { id: 'terms', label: 'Terms & Conditions', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePolicy(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xs text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activePolicy === tab.id
                    ? 'bg-brand-forest text-brand-cream font-bold'
                    : 'text-brand-cream hover:bg-brand-beige/25 hover:text-brand-cream/80'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0 text-brand-cream/80" />
                  {tab.label}
                </span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            );
          })}
        </aside>

        {/* Content body */}
        <div className="lg:col-span-9 bg-brand-purple-dark border border-brand-cream/20 rounded-md p-6 sm:p-10 text-left text-xs sm:text-sm text-brand-cream/80 leading-relaxed font-light space-y-6 shadow-2xs">
          
          {/* SHIPPING & DELIVERY POLICY */}
          {activePolicy === 'shipping' && (
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2">
                Shipping & Delivery Policies
              </h2>
              <p>
                At Vicesh Cosmetics, our eco-friendly hair and skin formulations are handled with absolute care. We coordinate safe, heat-insulated regional deliveries to preserve active botanical nutrients and prevent transit damage.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">1. Delivery Service Areas</h3>
                <p>
                  We offer reliable delivery services covering the following key locations in Ghana:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Accra and surrounding areas</strong></li>
                  <li><strong>Winneba</strong></li>
                  <li><strong>Swedru</strong></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">2. Shipping Timelines</h3>
                <p>
                  Timelines vary depending on order volume to ensure proper quality checks and packaging:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Retail Orders:</strong> Delivered within <strong>3 working days</strong> of purchase confirmation.</li>
                  <li><strong>Wholesale Orders:</strong> Dispatched and delivered within <strong>7 working days</strong> to accommodate larger batch formulations.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">3. Physical Pickup Location</h3>
                <p>
                  Customers who prefer direct local pickups can pick up their orders at our centralized pickup point in:
                  <br />
                  <strong className="text-brand-cream">Accra, Makola</strong>
                </p>
                <p className="italic text-brand-cream">
                  Please coordinate with our support desk via WhatsApp (0595780477) or phone before visiting for pickup.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">4. Wholesale Shipping Orders</h3>
                <p>
                  Wholesale customers should contact Vicesh Cosmetics directly through phone, WhatsApp (0595780477), or email (viceshcompanyltd@gmail.com) for wholesale shipping coordination, heavy weight packaging rates, or bulk logistics.
                </p>
              </div>
            </div>
          )}

          {/* RETURNS & REFUNDS POLICY */}
          {activePolicy === 'returns' && (
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2">
                Returns & Refund Agreements
              </h2>
              <p>
                We stand behind the botanical quality and nourishing efficacy of every Vicesh Cosmetics product. If you have any concerns regarding your purchase, we seek to resolve them promptly and fairly.
              </p>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">1. 14-Day Return Window</h3>
                <p>
                  We accept returns on eligible products within <strong>14 working days</strong> of delivery. To qualify for a return and subsequent refund, the product must meet the following strict criteria:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>The product must be <strong>unopened</strong>.</li>
                  <li>The product must be <strong>unused</strong>.</li>
                  <li>The product must be in its <strong>original condition</strong> (including unbroken seals and undamaged packaging box structures).</li>
                </ul>
                <p className="text-xs text-brand-gold italic font-semibold">
                  Due to hygiene, microbiological safety, and the organic nature of our botanical ingredients, used or opened cosmetics cannot be returned.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">2. Refund Processing</h3>
                <p>
                  Once your returned items are received and inspected by our warehouse quality team, we will communicate the approval status. Approved refunds will be processed and returned using the original payment mode (Mobile Money or Bank transfer) and typically take approximately <strong>3 to 10 business days</strong> to settle.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">3. Damaged or Faulty Deliveries</h3>
                <p>
                  If an item is fractured or damaged in courier transit, please contact us on WhatsApp immediately at 0595780477 with photo evidence. We will gladly dispatch a replacement or issue a full refund within our refund timeline.
                </p>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activePolicy === 'privacy' && (
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2">
                Privacy Policy Statement
              </h2>
              <p>
                Vicesh Cosmetics respects the absolute confidentiality of our customers. Your personal data is securely protected and never sold, traded, or rented to secondary advertising corporations.
              </p>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">1. Collected Metrics</h3>
                <p>
                  We capture your name, mailing address, delivery coordinates, phone numbers, and email credentials solely to process your orders, schedule shipping via domestic couriers, and send order notifications.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">2. Secure Payment Processing</h3>
                <p>
                  All online payments and Mobile Money (MoMo) transactions processed through our portal are piped through Paystack's 256-bit secured SSL socket networks. Vicesh Cosmetics does not hold payment card metadata or pin records on our servers.
                </p>
              </div>
            </div>
          )}

          {/* TERMS & CONDITIONS */}
          {activePolicy === 'terms' && (
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-brand-cream border-b border-brand-cream/20 pb-2">
                Terms & Conditions of Service
              </h2>
              <p>
                Accessing viceshcosmetics.com binds users to our core brand operational mandates.
              </p>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">1. Botanical Ingredient Disclaimers</h3>
                <p>
                  While our formulations utilize pure, gentle natural extracts and organic essential oils, individual skin and hair structures differ. We highly recommend carrying out a standard 24-hour patch test before full application. If skin irritation, redness, or discomfort emerges, cease application and consult with a dermatologist.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-editorial text-base font-bold text-brand-cream">2. Intellectual Property Protection</h3>
                <p>
                  All catalog imagery, editorial branding text, product recipes, usage descriptions, and website design assets are protected intellectual property of Vicesh Cosmetics Company Ltd. Ghana. Unauthorized replication is strictly prohibited.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
