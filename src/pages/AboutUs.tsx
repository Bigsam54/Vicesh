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
    <div className="w-full bg-brand-ivory text-brand-charcoal selection:bg-brand-gold selection:text-white pb-20">
      
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000" 
            alt="Vicesh Sourcing Heritage" 
            className="w-full h-full object-cover filter brightness-90 contrast-105 object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/30 to-transparent z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 md:pb-24">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-sans font-medium flex items-center gap-2">
              <BrandDroplet size={12} color="#C5A059" />
              Our Story
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-7xl font-medium text-white tracking-tight leading-[1.1]">
              Nature’s Best.<br />
              <span className="text-brand-gold">Crafted in Ghana.</span>
            </h1>
            <p className="text-sm md:text-base text-brand-cream/90 max-w-xl leading-relaxed font-sans font-light">
              Vicesh Cosmetics was born from a desire to offer beauty products that are both effective and gentle. We believe that modern consumers deserve formulations that deliver profound results without compromising the deep health of their hair and skin.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR JOURNEY & PHILOSOPHY (SPLIT SCREEN) */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden shadow-luxury">
              <img 
                src="https://images.unsplash.com/photo-1615397323175-6e0b457e5b7f?auto=format&fit=crop&q=80&w=1000" 
                alt="Botanical formulation process"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-purple/10" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-8 rounded-md border border-brand-beige/40 shadow-sm">
                <p className="font-editorial text-xl font-medium text-brand-charcoal text-center tracking-wide leading-relaxed">
                  "Every ingredient must serve a profound purpose."
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold flex items-center gap-2">
                  <Leaf className="w-3.5 h-3.5" />
                  Our Philosophy
                </span>
                <h2 className="font-editorial text-3xl md:text-5xl font-medium text-brand-charcoal leading-tight tracking-tight">
                  Where Nature & Science Complement.
                </h2>
              </div>
              
              <div className="space-y-6 text-brand-gray text-sm md:text-base leading-relaxed font-sans font-light">
                <p>
                  Healthy beauty begins with healthy ingredients. At Vicesh Cosmetics, our journey started with a simple observation: the market was saturated with products that sacrificed long-term wellness for short-term illusions. We knew that true beauty is not only about appearance, but also about confidence, wellness, and daily self-care.
                </p>
                <p>
                  We develop authentic, local eco-friendly haircare, skincare, and nail care formulated with raw botanical elements and carefully selected essential oils. Every formulation is developed with intention rather than simply following fleeting trends. 
                </p>
                <p>
                  Located proudly at CL-0635-9738, Oguaakrom, Winneba Road, Ghana, we serve both individual connoisseurs of self-care and elite wholesale partners who demand the very best for their clientele. Customers deserve products they can trust deeply.
                </p>
              </div>

              <button 
                onClick={() => handleNavigate('shop')}
                className="group flex items-center gap-4 text-xs uppercase tracking-widest font-sans font-semibold text-brand-charcoal hover:text-brand-purple transition-colors cursor-pointer"
              >
                Explore Our Formulations 
                <span className="w-10 h-10 rounded-full border border-brand-beige flex items-center justify-center group-hover:border-brand-purple group-hover:bg-brand-purple/5 transition-all">
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (BOLD TYPOGRAPHY) */}
      <section className="py-24 bg-brand-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center">
          <BrandDroplet size="120vw" color="#C5A059" className="transform -translate-y-1/4" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Mission */}
            <div className="space-y-6">
              <div className="inline-block border border-brand-gold/40 px-4 py-2 rounded-full">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">Our Mission</span>
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl font-medium leading-relaxed">
                Vicesh Cosmetics exists to create authentic beauty products that <span className="text-brand-gold italic">nourish, protect, and restore</span> hair and skin using nature-inspired ingredients and carefully researched formulations.
              </h3>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="inline-block border border-brand-gold/40 px-4 py-2 rounded-full">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">Our Vision</span>
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl font-medium leading-relaxed">
                To become one of Africa's most trusted beauty and wellness brands while maintaining an uncompromising commitment to <span className="text-brand-gold italic">quality, innovation, sustainability,</span> and customer satisfaction.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE INGREDIENT STORY */}
      <section className="py-24 bg-brand-ivory border-b border-brand-beige/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold">The Ingredient Story</span>
            <h2 className="font-editorial text-4xl md:text-5xl font-medium text-brand-charcoal tracking-tight">
              Raw Botanical Potency
            </h2>
            <p className="text-sm text-brand-gray leading-relaxed font-sans font-light">
              We source raw, uncompromising active ingredients. By rejecting synthetic fillers, we allow the intrinsic power of natural essential oils to transform your daily routines into luxurious self-care rituals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Rosemary", role: "Stimulation & Clarity", img: "https://images.unsplash.com/photo-1594031636965-41604a1b023f?auto=format&fit=crop&q=80&w=400", desc: "Used traditionally to invigorate the scalp and encourage an optimal environment for healthy hair routines." },
              { name: "Avocado", role: "Deep Hydration", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400", desc: "Rich in essential fatty acids, it penetrates deeply to soften, moisturize, and protect against environmental stress." },
              { name: "Sweet Almond", role: "Nourishing Shield", img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d96?auto=format&fit=crop&q=80&w=400", desc: "A lightweight, vitamin-dense oil that conditions the skin barrier and strengthens the foundation of nail beds." },
              { name: "Jojoba Oil", role: "Balancing Matrix", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400", desc: "Mimicking the body's natural sebum, it provides non-greasy, soothing comfort to sensitive scalps and cuticles." }
            ].map((ing, i) => (
              <div key={i} className="group relative bg-white border border-brand-beige/40 p-5 rounded-md hover:shadow-luxury transition-all duration-400">
                <div className="aspect-square overflow-hidden rounded-md relative mb-6">
                  <img src={ing.img} alt={ing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-sm text-[10px] uppercase font-sans font-semibold tracking-widest text-brand-charcoal shadow-sm">
                    {ing.role}
                  </div>
                </div>
                <h4 className="font-editorial text-xl font-medium text-brand-charcoal">{ing.name}</h4>
                <p className="text-xs text-brand-gray mt-3 font-sans font-light leading-relaxed">
                  {ing.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR COLLECTIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-sans font-semibold">Professional Regimens</span>
              <h2 className="font-editorial text-4xl md:text-5xl font-medium text-brand-charcoal tracking-tight">
                Our Collections
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div onClick={() => handleNavigate('haircare')} className="group cursor-pointer block relative aspect-[4/5] overflow-hidden rounded-lg shadow-sm hover:shadow-luxury transition-all duration-500 bg-black">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" alt="Hair Care" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="font-editorial text-3xl font-medium mb-3">Hair Care</h3>
                <p className="text-sm font-sans font-light text-white/90 mb-6 max-w-xs leading-relaxed">Cleanse, strengthen, moisturize, repair, and stimulate healthy growth using our signature botanical blends.</p>
                <span className="text-xs font-sans font-semibold uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                  Explore Rituals <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </span>
              </div>
            </div>

            <div onClick={() => handleNavigate('pedicure')} className="group cursor-pointer block relative aspect-[4/5] overflow-hidden rounded-lg shadow-sm hover:shadow-luxury transition-all duration-500 bg-black">
              <img src="https://images.unsplash.com/photo-1519415510236-8a5169043d56?auto=format&fit=crop&q=80&w=800" alt="Pedicure Collection" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="font-editorial text-3xl font-medium mb-3">Pedicure</h3>
                <p className="text-sm font-sans font-light text-white/90 mb-6 max-w-xs leading-relaxed">Professional-quality foot care products that help you enjoy restorative, salon-quality treatments from the comfort of home.</p>
                <span className="text-xs font-sans font-semibold uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                  Explore Rituals <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </span>
              </div>
            </div>

            <div onClick={() => handleNavigate('manicure')} className="group cursor-pointer block relative aspect-[4/5] overflow-hidden rounded-lg shadow-sm hover:shadow-luxury transition-all duration-500 bg-black">
              <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800" alt="Manicure Collection" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="font-editorial text-3xl font-medium mb-3">Manicure</h3>
                <p className="text-sm font-sans font-light text-white/90 mb-6 max-w-xs leading-relaxed">Experience the importance of healthy hand care, intensive hydration, and professional nail care routines daily.</p>
                <span className="text-xs font-sans font-semibold uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                  Explore Rituals <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE VICESH (6 PILLARS) */}
      <section className="py-24 bg-brand-ivory border-y border-brand-beige/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold">The Vicesh Standard</span>
            <h2 className="font-editorial text-3xl md:text-5xl font-medium text-brand-charcoal tracking-tight">Why Choose Vicesh</h2>
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
              <div key={i} className="text-center group bg-white p-8 rounded-lg border border-brand-beige/40 shadow-sm hover:shadow-luxury transition-all duration-400">
                <div className="w-16 h-16 mx-auto bg-brand-ivory border border-brand-beige rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-purple group-hover:border-brand-purple transition-colors duration-400">
                  <pillar.icon className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-editorial text-lg font-medium text-brand-charcoal mb-3">{pillar.title}</h4>
                <p className="text-xs text-brand-gray font-sans font-light leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR PROMISE & WHOLESALE (DUAL LAYOUT) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Our Promise */}
            <div className="bg-brand-purple text-white p-10 md:p-14 lg:p-16 rounded-lg relative overflow-hidden flex flex-col justify-center shadow-md">
              <div className="absolute -right-16 -top-16 text-white/5 pointer-events-none">
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
            <div className="bg-brand-ivory border border-brand-beige/60 text-brand-charcoal p-10 md:p-14 lg:p-16 rounded-lg flex flex-col justify-between space-y-12 shadow-sm">
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold">Professional Partners</span>
                <h2 className="font-editorial text-3xl font-medium leading-tight">Join the Vicesh Wholesale Network</h2>
                <p className="text-sm text-brand-gray font-sans font-light leading-relaxed">
                  We welcome salons, spas, beauty professionals, retailers, and distributors to partner with Vicesh Cosmetics. Elevate your client offerings with our professional-grade, botanical collections.
                </p>
                <div className="pt-4">
                  <a href="#footer-contact" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="inline-flex items-center gap-2 text-xs uppercase font-sans font-semibold tracking-widest text-brand-purple hover:text-brand-gold transition-colors">
                    <Mail className="w-4 h-4 stroke-[1.5]" /> Enquire for Wholesale
                  </a>
                </div>
              </div>

              <div className="space-y-4 border-t border-brand-beige/60 pt-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold">Our Community</span>
                <h2 className="font-editorial text-2xl font-medium">Building Confidence Together</h2>
                <p className="text-sm text-brand-gray font-sans font-light leading-relaxed">
                  Vicesh Cosmetics believes beauty is about building confidence, encouraging profound self-care, and supporting customers throughout their wellness journey. We invite you to become part of the growing Vicesh family today.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. ENDING STATEMENT */}
      <section className="py-24 md:py-32 bg-brand-charcoal text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=2000" 
            alt="Vicesh Brand Lifestyle" 
            className="w-full h-full object-cover opacity-30 filter grayscale blur-[2px]"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          <BrandDroplet size={48} color="#C5A059" className="mx-auto drop-shadow-lg" />
          <p className="font-editorial text-2xl md:text-4xl font-medium leading-relaxed px-4 md:px-12 italic text-brand-cream drop-shadow-md">
            "Vicesh Cosmetics is more than a cosmetics company—it is a brand dedicated to helping people care for themselves with authentic products inspired by nature, backed by thoughtful formulation, and created with a genuine commitment to quality and wellbeing."
          </p>
          <div className="pt-8">
            <button 
              onClick={() => handleNavigate('shop')}
              className="btn-primary bg-brand-gold text-brand-charcoal hover:bg-brand-cream shadow-xl"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
