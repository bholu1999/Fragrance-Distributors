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
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600'
  },
  {
    title: 'Customer Acquisition',
    description: 'Collect and manage orders from Businesses.',
    icon: ShoppingCart,
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-600'
  },
  {
    title: 'Seamless Ordering',
    description: 'Submit your complete order directly to us.',
    icon: Zap,
    iconBg: 'bg-rose-50',
    iconText: 'text-primary'
  },
  {
    title: 'Direct Fulfillment',
    description: 'We prepare and handle delivery straight to you.',
    icon: Package,
    iconBg: 'bg-indigo-50',
    iconText: 'text-indigo-600'
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
    <div className="bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark text-white pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=2000&auto=format&fit=crop"
            alt="Fragrances"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40" />
          {/* Moving gradient glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15],
              x: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px]"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/60 border border-slate-700/50 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-300 mb-10 shadow-2xl backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Premium B2B Supply Network
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-sans font-bold tracking-tighter text-white mb-8 leading-[0.9] lg:leading-[0.85]"
          >
            Global Fragrance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Distribution</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-14 font-light leading-relaxed"
          >
            Providing the world's most discerning retailers with immediate access to authentic niche, designer, and artisan fragrances at wholesale volume.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/catalog" className="group relative px-10 py-5 rounded-sm bg-primary text-white text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(247,27,99,0.2)] hover:shadow-[0_0_30px_rgba(247,27,99,0.4)] transition-all overflow-hidden border border-primary">
              <span className="relative z-10">Browse Catalog</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
            <Link href="/contact" className="px-10 py-5 rounded-sm bg-transparent text-white text-[11px] uppercase tracking-[0.2em] font-bold border border-slate-600 hover:bg-white hover:text-dark transition-all backdrop-blur-sm">
              Ordering Information
            </Link>
          </motion.div>

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
      <section className="py-32 px-4 bg-slate-50">
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
            <motion.div variants={itemVariants} className="group p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <FileSpreadsheet size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">XLSX Catalog Generation</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Instantly export localized, media-rich product lists with real-time stock levels for your storefront or marketing ops.</p>
              {/* <Link href="/download" className="text-[10px] uppercase tracking-[0.2em] font-black text-dark flex items-center gap-2 group-hover:text-primary transition-colors">
                Learn More <ArrowRight size={12} />
              </Link> */}
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="group p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 bg-rose-50 text-primary rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <RefreshCw size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Inventory Synchronization</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Connect your backend directly to our warehouse stack. Prevent stockouts with high-frequency availability polling.</p>
              {/* <Link href="/about" className="text-[10px] uppercase tracking-[0.2em] font-black text-dark flex items-center gap-2 group-hover:text-primary transition-colors">
                System Architecture <ArrowRight size={12} />
              </Link> */}
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="group p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">Selective Distribution</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">Access exclusive luxury brands through a strictly vetted B2B ecosystem designed for high-end retailers.</p>
              {/* <Link href="/register" className="text-[10px] uppercase tracking-[0.2em] font-black text-dark flex items-center gap-2 group-hover:text-primary transition-colors">
                Join Network <ArrowRight size={12} />
              </Link> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technical Workflow Section */}
      <section className="py-32 px-4 bg-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
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
                  <div className="text-2xl font-black text-white/20 italic mt-1">{item.step}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                      <item.icon size={20} className="text-secondary" strokeWidth={3} />
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
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
              className="relative z-10 border border-white/10 bg-slate-900 overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest ml-4 font-bold">Catalog Export Interface</div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="h-6 w-3/4 bg-white/5 rounded"></div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-white/5 rounded border border-white/5"></div>)}
                  </div>
                  <div className="h-4 w-1/2 bg-white/5 rounded"></div>
                  <div className="h-32 bg-secondary/5 rounded border border-secondary/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] animate-pulse">Generating XLSX Report...</span>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/5 rounded-2xl -rotate-12 pointer-events-none"></div>
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
            <Link href="/catalog" className="px-8 py-3 bg-slate-100 text-dark text-[11px] uppercase tracking-widest font-black rounded-sm hover:bg-dark hover:text-white transition-all">
              Full Catalog &rarr;
            </Link>
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
      <section className="py-40 px-4 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="p-16 md:p-24 bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden relative"
          >
            {/* Tech bg accent */}
            <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] rotate-12">
              <BarChart3 size={200} />
            </div>

            <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tighter text-dark mb-10 leading-[0.95]">Ready to automate <br />your retail strategy?</h2>
            <p className="text-slate-500 text-lg mb-14 max-w-xl mx-auto">Access the high-velocity supply chain engine for international niche, designer, and artisan fragrances.</p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/register" className="w-full sm:w-auto px-12 py-5 bg-primary text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                See Catalog
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-12 py-5 bg-dark text-white text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-slate-800 transition-all">
                Talk to Sourcing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


