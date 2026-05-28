'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Globe,
  BarChart3,
  ArrowRight,
  Zap,
  Layers,
  Search,
  Package,
  ShoppingCart
} from 'lucide-react';

const processSteps = [
  {
    title: 'Marketplace Integration',
    description: 'List our stock on your website or european marketplaces.',
    icon: Globe,
    iconBg: 'bg-amber-500/10',
    iconText: 'text-secondary'
  },
  {
    title: 'Customer Acquisition',
    description: 'Collect and manage orders from Businesses.',
    icon: ShoppingCart,
    iconBg: 'bg-amber-500/10',
    iconText: 'text-secondary'
  },
  {
    title: 'Seamless Ordering',
    description: 'Submit your complete order directly to us.',
    icon: Zap,
    iconBg: 'bg-amber-500/10',
    iconText: 'text-secondary'
  },
  {
    title: 'Direct Fulfillment',
    description: 'We prepare and handle delivery straight to you.',
    icon: Package,
    iconBg: 'bg-amber-500/10',
    iconText: 'text-secondary'
  }
];

const partners = [
  'Tom Ford', 'Creed', 'Le Labo', 'Byredo', 'Maison Francis Kurkdjian', 'Jo Malone', 'Gucci', 'Prada'
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-dark pt-28 pb-20 border-b border-slate-100">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content Column */}
            <div className="text-left flex flex-col items-start max-w-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-8 shadow-sm backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                Premium B2B Supply Network
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-dark mb-6 leading-[1.0]"
              >
                Global Fragrance <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-hover">Distribution</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-slate-500 text-base md:text-lg mb-10 font-light leading-relaxed text-left"
              >
                Providing the world's most discerning retailers with immediate access to authentic niche, designer, and artisan fragrances at wholesale volume.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
              >
                <Link href="/catalog" className="group relative px-8 py-4 rounded-sm bg-primary text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md hover:bg-primary-hover transition-all text-center border border-primary">
                  <span className="relative z-10">EU Stock Catalog</span>
                </Link>
                <Link href="/catalog-us" className="group relative px-8 py-4 rounded-sm bg-white hover:bg-slate-50 text-primary text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm transition-all text-center border border-slate-200">
                  <span className="relative z-10">US Stock Catalog</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Images Column (Logo Display) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full aspect-[4/3] lg:aspect-square flex items-center justify-center"
            >
              {/* Back ambient gold glow */}
              <div className="absolute w-[320px] h-[320px] bg-secondary/15 rounded-full blur-[100px] pointer-events-none z-0" />

              {/* Floating Luxury logo badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 rounded-[2.5rem] bg-white border border-slate-200/80 shadow-2xl flex flex-col items-center justify-center max-w-sm w-full mx-auto"
              >
                <div className="relative w-100 h-100 md:w-100 md:h-100 drop-shadow-md">
                  <img
                    src="/logo.png"
                    alt="Fragrance Distributors Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold font-sans tracking-tight text-dark uppercase">Fragrance</h3>
                  <p className="text-xs text-secondary font-bold tracking-[0.3em] uppercase mb-4">Distributors EU</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-20 py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
            <span className="block text-4xl font-sans font-bold tracking-tighter text-dark mb-2">1,5000+</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Fragrance SKUs</span>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
            <span className="block text-4xl font-sans font-bold tracking-tighter text-dark mb-2">45</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Authentic Brands</span>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
            <span className="block text-4xl font-sans font-bold tracking-tighter text-dark mb-2">99.8%</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Stock Accuracy</span>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
            <span className="block text-4xl font-sans font-bold tracking-tighter text-dark mb-2">35+</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Countries Served</span>
          </motion.div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-black mb-4 block">Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-dark">Built for Scale. <br />Designed for Efficiency.</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="group p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1">
              <div className="w-14 h-14 bg-amber-500/10 text-secondary rounded-xl flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
                <FileSpreadsheet size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">XLSX Catalog Generation</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Instantly export localized, media-rich product lists with real-time stock levels for your storefront or marketing ops.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="group p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1">
              <div className="w-14 h-14 bg-amber-500/10 text-secondary rounded-xl flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
                <RefreshCw size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Inventory Synchronization</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Connect your backend directly to our warehouse stack. Prevent stockouts with high-frequency availability polling.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="group p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1">
              <div className="w-14 h-14 bg-amber-500/10 text-secondary rounded-xl flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Selective Distribution</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Access exclusive luxury brands through a strictly vetted B2B ecosystem designed for high-end retailers.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Luxury Stock Spotlights Section */}
      <section className="py-32 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-secondary text-[10px] uppercase tracking-[0.4em] font-black mb-4 block">Luxury Spotlights</span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-dark">Premium Stock Availability</h2>
            <p className="text-slate-500 font-light max-w-2xl mx-auto text-sm mt-4">Immediate access to authentic highly sought-after brand portfolios, ready for worldwide B2B distribution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                brand: 'Creed',
                name: 'Aventus Eau de Parfum',
                image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop',
                size: '100ml',
                qty: '',
                price: ''
              },
              {
                brand: 'Tom Ford',
                name: 'Oud Wood Eau de Parfum',
                image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop',
                size: '50ml',
                qty: '',
                price: ''
              },
              {
                brand: 'Byredo',
                name: 'Bal d\'Afrique Eau de Parfum',
                image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop',
                size: '100ml',
                qty: '',
                price: ''
              },
              {
                brand: 'MFK',
                name: 'Baccarat Rouge 540',
                image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600&auto=format&fit=crop',
                size: '70ml',
                qty: '',
                price: ''
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-dark/80 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.brand}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-dark mb-1 group-hover:text-secondary transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-4 font-mono">
                      <span>Size: {item.size}</span>
                      <span className="text-slate-300">|</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Workflow Section */}
      <section className="py-32 px-4 bg-slate-50 text-dark overflow-hidden relative border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-secondary mb-4 block">The Workflow</span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter mb-10 leading-tight">Fastest path from <br />catalog to customer.</h2>

            <div className="space-y-10">
              {[
                { step: '01', title: 'Authenticate', desc: 'Secure your B2B credentials and access the portal.', icon: ShieldCheck },
                { step: '02', title: 'Sync Catalog', desc: 'Configure CSV/XLSX exports or automated platform sync.', icon: RefreshCw },
                { step: '03', title: 'Route Orders', desc: 'Orders are automatically fulfilled from our global hubs.', icon: Zap }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="text-2xl font-black text-slate-350 italic mt-1">{item.step}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                      <item.icon size={20} className="text-secondary" strokeWidth={2} />
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10 border border-slate-200 border-t-2 border-t-secondary bg-white overflow-hidden rounded-2xl shadow-xl"
            >
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest ml-4 font-bold">Catalog Export Interface</div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="h-6 w-3/4 bg-slate-100 rounded"></div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-slate-50 rounded border border-slate-200"></div>)}
                  </div>
                  <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                  <div className="h-32 bg-slate-50 rounded border border-slate-200 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] animate-pulse">Generating XLSX Report...</span>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-slate-200 rounded-2xl -rotate-12 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Partnership Process Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
            <div>
              <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-black mb-4 block">How it Works</span>
              <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-dark ">Seamless B2B Partnership</h2>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/catalog" className="px-6 py-3 bg-slate-100 text-dark text-[10px] uppercase tracking-widest font-black rounded-sm hover:bg-dark hover:text-white transition-all">
                EU STOCK &rarr;
              </Link>
              <Link href="/catalog-us" className="px-6 py-3 bg-slate-100 text-dark text-[10px] uppercase tracking-widest font-black rounded-sm hover:bg-dark hover:text-white transition-all">
                US STOCK &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${step.iconBg} ${step.iconText}`}>
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Tech CTA */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="p-16 md:p-24 bg-white border border-slate-200 rounded-[40px] shadow-lg overflow-hidden relative"
          >
            {/* Tech bg accent */}
            <div className="absolute bottom-0 right-0 p-8 opacity-[0.02] rotate-12">
              <BarChart3 size={200} />
            </div>

            <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tighter text-dark mb-10 leading-[0.95]">Ready to automate <br />your retail strategy?</h2>
            <p className="text-slate-500 text-lg mb-14 max-w-xl mx-auto">Access the high-velocity supply chain engine for international niche, designer, and artisan fragrances.</p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
              <Link href="/catalog" className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-md hover:bg-primary-hover transition-all">
                EU Catalog
              </Link>
              <Link href="/catalog-us" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-primary text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-sm border border-slate-200 transition-all">
                US Catalog
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-slate-100 text-dark text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-slate-200 transition-all">
                Talk Sourcing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


