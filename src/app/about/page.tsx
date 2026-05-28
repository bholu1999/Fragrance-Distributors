'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  Search,
  RefreshCw,
  Zap,
  Truck,
  CheckCircle2,
  CreditCard,
  Tag,
  Users,
  Globe,
  ArrowRight
} from 'lucide-react';

export default function About() {
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

  const processSteps = [
    {
      number: '01',
      title: 'Browse & Select',
      description: 'Access over 20,000 SKUs from 600+ leading brands.',
      icon: Search,
      color: 'blue'
    },
    {
      number: '02',
      title: 'Automate Orders',
      description: 'Place orders directly by phone, email, online or whatsapp.',
      icon: RefreshCw,
      color: 'emerald'
    },
    {
      number: '03',
      title: 'Fast Fulfillment',
      description: 'Same-day order processing with €8M+ in-stock inventory.',
      icon: Zap,
      color: 'rose'
    },
    {
      number: '04',
      title: 'Reliable Delivery',
      description: 'Affordable, high-quality transportation across Europe and beyond.',
      icon: Truck,
      color: 'indigo'
    }
  ];

  const benefits = [
    {
      title: '100% Original Products',
      description: 'Stock sourced directly from official suppliers.',
      icon: CheckCircle2
    },
    {
      title: 'Top Transportation',
      description: 'Products arrive quickly and in perfect condition.',
      icon: Truck
    },
    {
      title: 'No Hidden Fees',
      description: 'No subscription, full transparency.',
      icon: CreditCard
    },
    {
      title: 'Competitive Prices',
      description: 'Constant market analysis ensures the best deals.',
      icon: Tag
    },
    {
      title: 'Dedicated Team',
      description: 'Wholesale experts providing 24/7 support.',
      icon: Users
    },
    {
      title: 'Real-Time Stock & Pricing',
      description: 'Instant updates on stock and prices.',
      icon: RefreshCw
    }
  ];

  return (
    <div className="bg-white pt-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-24 px-4 md:px-8 text-center max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Who We Are
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-dark mb-10 leading-[0.95]"
        >
          Digital Distribution <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">Perfected.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 leading-relaxed text-lg md:text-xl font-light max-w-3xl mx-auto"
        >
          Fragrance Distributors EU is a dedicated digital distribution platform that connects suppliers and retailers, bringing innovation and transparency to cross-border e-commerce.
        </motion.p>
      </section>

      {/* Full width image / Mission */}
      <section className="relative w-full py-32 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=2000&auto=format&fit=crop"
            alt="Logistics"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-secondary text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Our Mission</span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-white mb-8 leading-tight">
              Empowering SMBs with <br />Global Reach.
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed mb-12">
              We support small and medium-sized businesses with original products, competitive pricing, and efficient logistics helping them stay ahead in a demanding market.
            </p>
            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
              <div>
                <span className="block text-4xl font-sans font-bold text-white mb-2">20k+</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Active SKUs</span>
              </div>
              <div>
                <span className="block text-4xl font-sans font-bold text-white mb-2">€8M+</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Ready Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-black mb-4 block">The Workflow</span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-dark">Our 4-Step Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="relative"
              >
                <div className="text-7xl font-black text-slate-50 absolute -top-10 -left-4 z-0">{step.number}</div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 shadow-sm bg-${step.color}-50 text-${step.color === 'emerald' ? 'emerald' : step.color === 'rose' ? 'primary' : step.color === 'indigo' ? 'indigo' : 'blue'}-600`}>
                    <step.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-32 px-4 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary text-[10px] uppercase tracking-[0.4em] font-black mb-4 block">Advantages</span>
              <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-dark">Why Work With Us</h2>
              <p className="text-slate-500 mt-6 text-lg">Beyond distribution, we provide a foundation for your business growth.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="p-10 bg-white border border-slate-200 rounded-2xl hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <benefit.icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-dark mb-3">{benefit.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Tech CTA */}
      <section className="py-40 px-4 text-center relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-sans font-bold tracking-tight text-slate-50 whitespace-nowrap pointer-events-none uppercase opacity-10">SYMPHONYA</div>
        <div className="max-w-3xl mx-auto relative z-10 border border-slate-200 p-12 md:p-24 bg-white shadow-2xl rounded-[40px]">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-6 block">Get Started</span>
          <h2 className="font-sans font-bold tracking-tighter text-4xl md:text-5xl mb-10 text-dark leading-tight">Ready to transform your distribution?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-primary text-white text-[11px] uppercase tracking-widest font-bold rounded-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              Join B2B Network
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-dark text-white text-[11px] uppercase tracking-widest font-bold rounded-sm hover:bg-slate-800 transition-all">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
