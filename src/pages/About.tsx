import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-white pt-24">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 text-center max-w-4xl mx-auto">
        <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Our Vision</span>
        <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-dark mb-8 leading-[0.9] ">
          Pioneering the distribution of exceptional fragrances since 2012.
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm font-light">
          Fragrance Distributors was founded with a singular vision: to bridge the gap between master perfumers and the world's most discerning retailers.
        </p>
      </section>

      {/* Full width image */}
      <section className="w-full h-[60vh]">
        <img 
          src="https://images.unsplash.com/photo-1594824419992-ea9b699e19d7?q=80&w=2000&auto=format&fit=crop" 
          alt="Perfume compounding" 
          className="w-full h-full object-cover mix-blend-luminosity grayscale opacity-50"
        />
      </section>

      {/* Content */}
      <section className="py-24 px-4 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">The Mission</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-6 text-dark ">Curating exclusivity.</h2>
            <div className="space-y-6 text-slate-600 font-light leading-relaxed text-sm">
              <p>
                In a saturated market, differentiation is key to retail success. We travel globally—from Grasse to Oman, from Paris to New York—to identify independent fragrance houses that exhibit true artistry, quality ingredients, and compelling brand narratives.
              </p>
              <p>
                We do not just distribute boxes; we distribute stories. Our partner retailers benefit from our deep product knowledge, staff training programs, and exclusive regional rights.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=600&auto=format&fit=crop" alt="Details" className="w-full h-64 object-cover border border-slate-200 mix-blend-luminosity grayscale opacity-60" />
             <img src="https://images.unsplash.com/photo-1523365280197-f188ec98233f?q=80&w=600&auto=format&fit=crop" alt="Ingredients" className="w-full h-64 object-cover mt-12 border border-slate-200 mix-blend-luminosity grayscale opacity-60" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 bg-slate-50 text-dark border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
             <span className="block text-5xl font-sans font-bold tracking-tight text-primary mb-2 ">1,500+</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Fragrance SKUs</span>
          </div>
          <div>
             <span className="block text-5xl font-sans font-bold tracking-tight text-primary mb-2 ">45</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Authentic Brands</span>
          </div>
          <div>
             <span className="block text-5xl font-sans font-bold tracking-tight text-primary mb-2 ">99.8%</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Stock Accuracy</span>
          </div>
          <div>
             <span className="block text-5xl font-sans font-bold tracking-tight text-primary mb-2 ">12</span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Hub Warehouses</span>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-sans font-bold tracking-tight text-slate-100 whitespace-nowrap pointer-events-none">FRAGRANCE DISTRIBUTORS</div>
        <div className="max-w-2xl mx-auto relative z-10 border border-slate-200 p-16 bg-white">
           <h2 className="font-sans font-bold tracking-tight text-3xl mb-8 text-dark ">Join our B2B network</h2>
           <Link to="/contact" className="border-b border-slate-200 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all">Contact our wholesale team &rarr;</Link>
        </div>
      </section>

    </div>
  );
}
