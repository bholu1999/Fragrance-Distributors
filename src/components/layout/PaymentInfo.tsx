'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Copy, Check, Info, MapPin, Globe } from 'lucide-react';

export default function PaymentInfo() {
  const pathname = usePathname();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Exclude rendering on the catalog download page
  if (pathname === '/download') {
    return null;
  }

  const bankDetails = {
    bankName: 'N26 Bank SE, Spanish Branch',
    swift: 'NTSBESM1XXX',
    iban: 'ES78 1563 2626 3532 6778 6384',
    address: 'Calle de Don Ramon de la Cruz, 84, 28006 Madrid, Spain',
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <section className="bg-slate-50 text-slate-800 border-t border-slate-200 relative overflow-hidden py-16">
      {/* Decorative Premium Subtle Radial Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-slate-200/50 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[10px] uppercase tracking-widest font-bold text-secondary mb-3">
              <Globe size={11} className="animate-spin-[duration:12s]" />
              Global Settlement Accounts
            </div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-dark">
              Official Wholesale Payment Directory
            </h2>
            <p className="text-slate-500 text-xs  mt-1 max-w-xl">
              Execute wire transfers directly to our primary European depository. Select any card credential to copy instantly.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white px-3 py-1.5 border border-slate-200 rounded shadow-sm">
              Settlement Currency: EUR / USD
            </span>
          </div>
        </div>

        {/* 3-Column Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Card 1: Bank & Swift */}
          <div
            onClick={() => copyToClipboard(bankDetails.swift, 'swift')}
            className="group relative bg-white border border-slate-200 hover:border-secondary p-6 rounded-lg transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm text-secondary group-hover:bg-secondary/10 transition-colors duration-300">
                  <Building2 size={20} strokeWidth={1.5} />
                </div>
                <button className="text-slate-400 group-hover:text-secondary transition-colors">
                  {copiedField === 'swift' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                Depository Institution & BIC
              </span>
              <h3 className="text-base font-bold text-dark mb-2 leading-tight group-hover:text-secondary transition-colors">
                {bankDetails.bankName}
              </h3>
              <p className="text-slate-500 text-xs">
                Spanish Branch Operations & International Swifts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Swift Code</span>
              <span className="text-xs font-mono font-bold text-dark tracking-wider group-hover:underline">
                {bankDetails.swift}
              </span>
            </div>
            {/* Copy Toast overlay inside the card */}
            <AnimatePresence>
              {copiedField === 'swift' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-x-0 bottom-4 mx-auto w-32 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-bold uppercase tracking-widest text-center py-1.5 rounded shadow-sm"
                >
                  Swift Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card 2: IBAN Account */}
          <div
            onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
            className="group relative bg-white border border-slate-200 hover:border-secondary p-6 rounded-lg transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm text-secondary group-hover:bg-secondary/10 transition-colors duration-300">
                  <Globe size={20} strokeWidth={1.5} />
                </div>
                <button className="text-slate-400 group-hover:text-secondary transition-colors">
                  {copiedField === 'iban' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                IBAN Account Identifier
              </span>
              <h3 className="text-base font-bold text-dark mb-2 leading-tight group-hover:text-secondary transition-colors">
                Primary SEPA Wire Account
              </h3>
              <p className="text-slate-500 text-xs ">
                Direct bank transfers are secure and processed within 24 hours.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">IBAN Number</span>
              <span className="text-xs font-mono font-bold text-secondary tracking-wider group-hover:underline">
                {bankDetails.iban}
              </span>
            </div>
            <AnimatePresence>
              {copiedField === 'iban' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-x-0 bottom-4 mx-auto w-32 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-bold uppercase tracking-widest text-center py-1.5 rounded shadow-sm"
                >
                  IBAN Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card 3: Address Details */}
          <div
            onClick={() => copyToClipboard(bankDetails.address, 'address')}
            className="group relative bg-white border border-slate-200 hover:border-secondary p-6 rounded-lg transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm text-secondary group-hover:bg-secondary/10 transition-colors duration-300">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <button className="text-slate-400 group-hover:text-secondary transition-colors">
                  {copiedField === 'address' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                Branch Location Address
              </span>
              <h3 className="text-base font-bold text-dark mb-2 leading-tight group-hover:text-secondary transition-colors">
                N26 Madrid HQ Branch
              </h3>
              <p className="text-slate-500 text-xs  truncate">
                {bankDetails.address}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Country</span>
              <span className="text-xs font-mono font-bold text-dark tracking-wider group-hover:underline">
                Spain
              </span>
            </div>
            <AnimatePresence>
              {copiedField === 'address' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-x-0 bottom-4 mx-auto w-32 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-bold uppercase tracking-widest text-center py-1.5 rounded shadow-sm"
                >
                  Address Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Premium Note Panel: Shipping Conditions */}
        <div className="bg-amber-500/5 border border-amber-500/15 p-5 rounded-lg flex flex-col md:flex-row items-start gap-4">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/10 rounded-md text-secondary shrink-0">
            <Info size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-1">Important Logistics Advisory</h4>
            <p className="text-slate-600 text-xs  leading-relaxed">
              Our bank account must be fully credited with the matching settlement amount before shipping orders. Please ensure wire receipts specify your registered distribution corporate account name for prompt verification and zero-latency clearance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
