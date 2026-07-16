import React from 'react';
import { ArrowRight, Leaf, Shield, Sparkles, CheckCircle2, Mail, Heart, Globe, Award } from 'lucide-react';
import { BrandDroplet } from '../components/BrandDroplet';

interface AboutUsProps {
  setCurrentPage: (page: string) => void;
  setSelectedProductId?: (id: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ setCurrentPage }) => {
  
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-brand-purple text-brand-cream selection:bg-brand-gold selection:text-brand-purple">
      
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            src="https://res.cloudinary.com/dja3u7oha/video/upload/v1784036252/Beauty_influencer_applying_condi__1080p_202607141242_wwgxas.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover filter brightness-90 contrast-105 object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/30 to-transparent z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 md:pb-32">
          <div className="max-w-3xl text-left">
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-7xl font-medium italic text-brand-cream tracking-tight leading-[1.1]">
              Nature's Best.<br />
              <span className="text-brand-gold">Crafted in Ghana.</span>
            </h1>
          </div>
        </div>

        {/* Bottom wave overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end pointer-events-none">
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

      {/* 2. OUR JOURNEY & PHILOSOPHY (SPLIT SCREEN) */}
      <section className="py-20 md:py-32 bg-brand-purple-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden shadow-luxury order-2 lg:order-1">
              <img 
                src="https://res.cloudinary.com/dja3u7oha/image/upload/v1784036241/Woman_holding_conditioner_bottle_2K_202607141242_hgkl7p.jpg" 
                alt="Botanical formulation process"
                className="w-full h-full object-cover object-[20%_center] opacity-100 drop-shadow-sm transform hover:scale-105 transition-transform duration-700 relative z-10"
              />
              <div className="absolute inset-0 bg-brand-gold/10 z-0" />
              <div className="absolute bottom-8 left-8 right-8 bg-brand-purple-dark/95 backdrop-blur-md p-8 rounded-md border border-brand-cream/20 shadow-sm">
                <p className="font-editorial text-xl font-medium text-brand-cream text-center tracking-wide leading-relaxed">
                  "Every ingredient must serve a profound purpose."
                </p>
              </div>
            </div>

            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold flex items-center gap-2">
                  <Leaf className="w-3.5 h-3.5" />
                  Our Philosophy
                </span>
                <h2 className="font-editorial text-3xl md:text-5xl font-medium italic text-brand-cream leading-tight tracking-tight">
                  Where Nature & Science Complement.
                </h2>
              </div>
              
              <div className="space-y-6 text-brand-cream/80 text-sm md:text-base leading-relaxed font-sans font-light">
                <p>
                  Healthy beauty begins with healthy ingredients. At Vicesh Cosmetics, our journey started with a simple observation: the market was saturated with products that sacrificed long-term wellness for short-term illusions. We understood that true beauty shouldn't only focus on appearance, but also wellness, confidence, and daily self-care.
                </p>
                <p>
                  We develop nature-first, eco-friendly haircare, skincare, and nail care formulated with raw botanical ingredients and carefully selected essential oils. Every formulation is developed with intention rather than simply following fleeting trends.
                </p>
                <p>
                  Located proudly at CL-0635-9738, Oguaakrom, Winneba Road, Ghana, we serve both individual connoisseurs of self-care and elite wholesale partners who demand the very best for their clientele. Customers deserve products they can trust deeply.
                </p>
              </div>

              <button 
                onClick={() => handleNavigate('shop')}
                className="group flex items-center gap-4 text-xs uppercase tracking-widest font-sans font-semibold text-brand-cream hover:text-brand-gold transition-colors cursor-pointer"
              >
                Explore Our Formulations 
                <span className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/5 transition-all">
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (BOLD TYPOGRAPHY) */}
      <section className="py-24 bg-brand-gold text-brand-purple relative overflow-hidden">

        <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center z-0">
          <BrandDroplet size="120vw" color="#C5A059" className="transform -translate-y-1/4" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Mission */}
            <div className="space-y-6">
              <div className="inline-block border border-brand-purple/30 px-4 py-2 rounded-full">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold">Our Mission</span>
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl font-medium leading-relaxed text-brand-purple">
                Vicesh Cosmetics exists to create authentic beauty products that <span className="text-brand-purple-dark italic">nourish, protect, and restore</span> hair and skin using nature-inspired ingredients and carefully researched formulations.
              </h3>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="inline-block border border-brand-purple/30 px-4 py-2 rounded-full">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold">Our Vision</span>
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl font-medium leading-relaxed text-brand-purple">
                To become one of Africa's most trusted beauty and wellness brands while maintaining an uncompromising commitment to <span className="text-brand-purple-dark italic">quality, innovation, sustainability,</span> and customer satisfaction.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE INGREDIENT STORY */}
      <section className="py-24 bg-brand-purple border-b border-brand-cream/20 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">The Ingredient Story</span>
            <h2 className="font-editorial text-4xl md:text-5xl font-medium text-brand-cream tracking-tight">
              Raw Botanical Potency
            </h2>
            <p className="text-sm text-brand-cream/80 leading-relaxed font-sans font-light">
              We source raw, uncompromising active ingredients. By rejecting synthetic fillers, we allow the intrinsic power of natural essential oils to transform your daily routines into luxurious self-care rituals.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { name: "Rosemary", role: "Stimulation & Clarity", img: "/images/rosemary_botanical_1783774271424.png", desc: "Used traditionally to invigorate the scalp and encourage an optimal environment for healthy hair routines." },
              { name: "Avocado", role: "Deep Hydration", img: "/images/avocado_botanical_1783774281240.png", desc: "Rich in essential fatty acids, it penetrates deeply to soften, moisturize, and protect against environmental stress." },
              { name: "Sweet Almond", role: "Nourishing Shield", img: "/images/sweet_almond_botanical_1783774290568.png", desc: "A lightweight, vitamin-dense oil that conditions the skin barrier and strengthens the foundation of nail beds." },
              { name: "Jojoba Oil", role: "Balancing Matrix", img: "/images/jojoba_oil_botanical_1783774298757.png", desc: "Mimicking the body's natural sebum, it provides non-greasy, soothing comfort to sensitive scalps and cuticles." }
            ].map((ing, i) => (
              <div key={i} className="group relative bg-brand-purple-dark border border-brand-cream/20 p-3 sm:p-5 rounded-md hover:shadow-luxury transition-all duration-400">
                <div className="aspect-square overflow-hidden rounded-md relative mb-3 sm:mb-6">
                  <img src={ing.img} alt={ing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="font-editorial text-base sm:text-xl font-medium text-brand-cream">{ing.name}</h4>
                <p className="text-[10px] sm:text-xs text-brand-cream/80 mt-2 sm:mt-3 font-sans font-light leading-relaxed">
                  {ing.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR COLLECTIONS */}
      <section className="py-24 bg-brand-purple-dark relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">Professional Regimens</span>
              <h2 className="font-editorial text-4xl md:text-5xl font-medium text-brand-cream tracking-tight">
                Our Collections
              </h2>
            </div>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-8 pb-4 sm:pb-8 hide-scrollbar">
            <div onClick={() => handleNavigate('haircare')} className="group cursor-pointer block relative shrink-0 w-[75vw] sm:w-[60vw] md:w-auto snap-center aspect-[4/5] overflow-hidden rounded-lg shadow-sm hover:shadow-luxury transition-all duration-500 bg-black">
              <img src="/images/haircare_collection.png" alt="Hair Care" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-brand-cream bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="font-editorial text-2xl md:text-3xl font-medium mb-2 md:mb-3">Hair Care</h3>
                <p className="text-xs md:text-sm font-sans font-light text-brand-cream/90 mb-4 md:mb-6 max-w-xs leading-relaxed">Cleanse, strengthen, moisturize, repair, and stimulate healthy growth using our signature botanical blends.</p>
                <span className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                  Explore Rituals <ArrowRight className="w-3 h-3 md:w-4 md:h-4 stroke-[1.5]" />
                </span>
              </div>
            </div>

            <div onClick={() => handleNavigate('pedicure')} className="group cursor-pointer block relative shrink-0 w-[75vw] sm:w-[60vw] md:w-auto snap-center aspect-[4/5] overflow-hidden rounded-lg shadow-sm hover:shadow-luxury transition-all duration-500 bg-black">
              <img src="https://res.cloudinary.com/dja3u7oha/image/upload/v1784036242/Feminine_hands_holding_condition__2K_202607141242_jacl1b.jpg" alt="Pedicure Collection" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-brand-cream bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="font-editorial text-2xl md:text-3xl font-medium mb-2 md:mb-3">Pedicure</h3>
                <p className="text-xs md:text-sm font-sans font-light text-brand-cream/90 mb-4 md:mb-6 max-w-xs leading-relaxed">Professional-quality foot care products that help you enjoy restorative, salon-quality treatments from the comfort of home.</p>
                <span className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                  Explore Rituals <ArrowRight className="w-3 h-3 md:w-4 md:h-4 stroke-[1.5]" />
                </span>
              </div>
            </div>

            <div onClick={() => handleNavigate('manicure')} className="group cursor-pointer block relative shrink-0 w-[75vw] sm:w-[60vw] md:w-auto snap-center aspect-[4/5] overflow-hidden rounded-lg shadow-sm hover:shadow-luxury transition-all duration-500 bg-black">
              <img src="/images/manicure_collection.png" alt="Manicure Collection" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-brand-cream bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="font-editorial text-2xl md:text-3xl font-medium mb-2 md:mb-3">Manicure</h3>
                <p className="text-xs md:text-sm font-sans font-light text-brand-cream/90 mb-4 md:mb-6 max-w-xs leading-relaxed">Experience the importance of healthy hand care, intensive hydration, and professional nail care routines daily.</p>
                <span className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                  Explore Rituals <ArrowRight className="w-3 h-3 md:w-4 md:h-4 stroke-[1.5]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE VICESH (6 PILLARS) */}
      <section className="py-24 bg-brand-purple border-y border-brand-cream/20 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">The Vicesh Standard</span>
            <h2 className="font-editorial text-3xl md:text-5xl font-medium text-brand-cream tracking-tight">Why Choose Vicesh</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { icon: Sparkles, title: "Authentic Formulations", desc: "Rich textures crafted for profound efficacy." },
              { icon: Leaf, title: "Botanical Ingredients", desc: "Harnessing the raw, concentrated power of natural plants and essential oils." },
              { icon: Globe, title: "Eco-Conscious Beauty", desc: "Mindful development practices that respect our planet and communities." },
              { icon: Award, title: "Professional Quality", desc: "Rigorous standards that exceed traditional salon and spa requirements." },
              { icon: Heart, title: "Made with Care", desc: "Consciously developed in Ghana with deep respect for authentic beauty rituals." },
              { icon: Shield, title: "Trusted by Professionals", desc: "The preferred choice of elite beauty professionals, salons, and spas." }
            ].map((pillar, i) => (
              <div key={i} className="text-center group bg-brand-purple-dark p-8 rounded-lg border border-brand-cream/20 shadow-sm hover:shadow-luxury transition-all duration-400">
                <div className="w-16 h-16 mx-auto bg-brand-purple border border-brand-cream/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors duration-400">
                  <pillar.icon className="w-6 h-6 text-brand-gold group-hover:text-brand-purple transition-colors" />
                </div>
                <h4 className="font-editorial text-lg font-medium text-brand-cream mb-3">{pillar.title}</h4>
                <p className="text-xs text-brand-cream/80 font-sans font-light leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR PROMISE & WHOLESALE (DUAL LAYOUT) */}
      <section className="py-24 bg-brand-purple-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Our Promise */}
            <div className="bg-brand-gold text-brand-purple p-10 md:p-14 lg:p-16 rounded-lg relative overflow-hidden flex flex-col justify-center shadow-md">
              <div className="absolute -right-16 -top-16 text-brand-purple/5 pointer-events-none">
                <Shield className="w-64 h-64" />
              </div>
              <div className="relative z-10 space-y-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold mb-3 block">Commitment to Excellence</span>
                  <h2 className="font-editorial text-4xl font-medium">Our Promise</h2>
                </div>
                <ul className="space-y-4">
                  {[
                    "Authentic Quality Standards",
                    "Thoughtfully Selected Ingredients",
                    "Absolute Customer Satisfaction",
                    "Continuous Innovation",
                    "Responsible Beauty Practices",
                    "Strictly Safe Formulations",
                    "Professional Care Standards",
                    "Sustainability Where Possible"
                  ].map((promise, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 stroke-[1.5]" />
                      <span className="text-sm font-sans font-light tracking-wide">{promise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Wholesale & Community */}
            <div className="bg-brand-purple border border-brand-cream/20 text-brand-cream p-10 md:p-14 lg:p-16 rounded-lg flex flex-col justify-between space-y-12 shadow-sm">
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">Professional Partners</span>
                <h2 className="font-editorial text-3xl font-medium leading-tight">Join the Vicesh Wholesale Network</h2>
                <p className="text-sm text-brand-cream/80 font-sans font-light leading-relaxed">
                  We welcome salons, spas, beauty professionals, retailers, and distributors to partner with Vicesh Cosmetics. Elevate your client offerings with our professional-grade, botanical collections.
                </p>
                <div className="pt-4">
                  <a href="#footer-contact" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="inline-flex items-center gap-2 text-xs uppercase font-sans font-semibold tracking-widest text-brand-gold hover:text-brand-gold transition-colors">
                    <Mail className="w-4 h-4 stroke-[1.5]" /> Enquire for Wholesale
                  </a>
                </div>
              </div>

              <div className="space-y-4 border-t border-brand-cream/20 pt-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">Our Community</span>
                <h2 className="font-editorial text-2xl font-medium">Building Confidence Together</h2>
                <p className="text-sm text-brand-cream/80 font-sans font-light leading-relaxed">
                  Vicesh Cosmetics believes beauty is about building confidence, encouraging profound self-care, and supporting customers throughout their wellness journey. We invite you to become part of the growing Vicesh family today.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. ENDING STATEMENT */}
      <section className="py-24 md:py-32 bg-brand-gold text-brand-purple text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          <BrandDroplet size={48} color="#C5A059" className="mx-auto drop-shadow-lg" />
          <p className="font-editorial text-2xl md:text-4xl font-medium leading-relaxed px-4 md:px-12 italic text-brand-cream drop-shadow-md">
            "Vicesh Cosmetics is more than a cosmetics company—it is a brand dedicated to helping people care for themselves with authentic products inspired by nature, backed by thoughtful formulation, and created with a genuine commitment to quality and wellbeing."
          </p>
          <div className="pt-8">
            <button 
              onClick={() => handleNavigate('shop')}
              className="btn-primary bg-brand-gold text-brand-cream hover:bg-brand-purple-dark shadow-xl"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
