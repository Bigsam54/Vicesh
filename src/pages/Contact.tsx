import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const Contact: React.FC = () => {
  return (
    <div className="w-full bg-brand-purple-dark min-h-screen text-brand-cream pb-24 -mt-16 sm:-mt-16">
      {/* Video Hero Section */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] min-h-[450px] flex flex-col justify-end overflow-hidden">
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/30 to-transparent z-10"></div>
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://res.cloudinary.com/dja3u7oha/video/upload/v1784136207/African_women_using_conditioner_1080p_202607151722_dfh6n7.mp4" type="video/mp4" />
        </video>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 md:pb-32">
          <div className="max-w-3xl text-left">
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl font-bold text-brand-white drop-shadow-lg italic">
              Let's <span className="text-brand-gold">Connect</span>
            </h1>
          </div>
        </div>

        {/* Bottom wave overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end pointer-events-none">
          <svg 
            className="w-full h-[15px] sm:h-[25px] md:h-[35px] -mb-[1px] text-brand-purple-dark fill-current drop-shadow-[0_-10px_20px_rgba(223,175,55,0.1)]" 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,70 C360,15 720,110 1080,85 C1260,72 1380,78 1440,65 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Contact Details Section — clean flat layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-16 gap-y-10 sm:gap-y-14">
          
          {/* Address */}
          <div className="flex gap-4 sm:gap-5 items-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0 text-brand-gold">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-1.5 sm:space-y-2 min-w-0">
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-brand-cream">Corporate Headquarters</h3>
              <p className="text-sm text-brand-cream/70 leading-relaxed break-words">
                CL-0635-9738, Oguaakrom,<br/>Winneba Road, Ghana.
              </p>
              <p className="text-xs text-brand-gold font-medium">Pickup available at: Accra, Makola</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4 sm:gap-5 items-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0 text-brand-gold">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-1.5 sm:space-y-2 min-w-0">
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-brand-cream">Phone & WhatsApp</h3>
              <p className="text-sm text-brand-cream/70 leading-relaxed">
                +233 (0) 59 578 0477
              </p>
              <p className="text-xs text-brand-cream/50">Available Monday to Saturday for direct orders.</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 sm:gap-5 items-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0 text-brand-gold">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-1.5 sm:space-y-2 min-w-0">
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-brand-cream">Email Us</h3>
              <p className="text-sm text-brand-cream/70 leading-relaxed break-all sm:break-words">
                viceshcompanyltd@gmail.com
              </p>
              <p className="text-xs text-brand-cream/50">For sales inquiries, collaborations, or order queries.</p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex gap-4 sm:gap-5 items-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center shrink-0 text-brand-gold">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-1.5 sm:space-y-2 min-w-0">
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-brand-cream">Support Desk Hours</h3>
              <p className="text-sm text-brand-cream/70 leading-relaxed">
                Mon – Fri: 8:00 AM – 6:00 PM<br/>
                Saturday: 9:00 AM – 4:00 PM
              </p>
              <p className="text-xs text-brand-gold italic font-medium">Closed Sundays & Ghana Public Holidays</p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-brand-cream/10 my-16"></div>

        {/* WhatsApp CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
          <div className="flex gap-5 items-start flex-1">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <WhatsAppIcon className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-xl font-bold text-brand-cream">Instant WhatsApp Support</h3>
              <p className="text-sm text-brand-cream/70 leading-relaxed max-w-md">
                Chat instantly with a Vicesh consultant for real-time delivery tracking, order inquiries, or wholesale salon packages.
              </p>
            </div>
          </div>
          <a 
            href="https://wa.me/233595780477" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex px-8 py-3.5 bg-brand-gold hover:bg-brand-white text-brand-purple text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-md items-center justify-center hover:-translate-y-0.5 shrink-0"
          >
            Start Chat
          </a>
        </div>

      </div>
    </div>
  );
};

