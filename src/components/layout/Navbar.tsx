'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Download, Info, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import OrderingInformationModal from '../ui/OrderingInformationModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOrderingModalOpen, setIsOrderingModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Platform', path: '/about' },
    { name: 'EU Catalog', path: '/catalog' },
    { name: 'US Catalog', path: '/catalog-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const isTransparent = isHome && !scrolled;

  // Dynamic async lazy-loading macro for bulk catalog downloads
  const downloadAllCatalogs = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      // Chunk-split imports to preserve zero-latency loading
      const eu1 = (await import('../../data/eu_1.json')).default;
      const eu2 = (await import('../../data/eu_2.json')).default;
      const eu3 = (await import('../../data/eu_3.json')).default;
      const eu4 = (await import('../../data/eu_4.json')).default;
      const us1 = (await import('../../data/us_1.json')).default;
      const us2 = (await import('../../data/us_2.json')).default;

      const datasets = [
        { name: 'EU_Distribution_Hub_Alpha.csv', data: eu1 },
        { name: 'EU_Boutique_Select_Lines.csv', data: eu2 },
        { name: 'EU_Main_Megastore_Inventory.csv', data: eu3 },
        { name: 'EU_Premium_Designer_Reserve.csv', data: eu4 },
        { name: 'US_Domestic_Main_Stock.csv', data: us1 },
        { name: 'US_Select_Designer_Strains.csv', data: us2 },
      ];

      datasets.forEach((dataset, idx) => {
        // Delay execution linearly to inhibit browser pop-up intervention
        setTimeout(() => {
          const headers = ['EAN', 'BRAND', 'STATUS', 'DESCRIPTION', 'READY QTYS', 'PRICE EUR', 'PRICE USD', 'PRICE GBP'];
          const csvRows = [
            headers.join(','),
            ...dataset.data.map((row: any) =>
              [
                `"${String(row.EAN).replace(/"/g, '""')}"`,
                `"${row.BRAND.replace(/"/g, '""')}"`,
                `"${row.STATUS.replace(/"/g, '""')}"`,
                `"${row.DESCRIPTION.replace(/"/g, '""')}"`,
                row['READY QTYS'],
                row['PRICE EUR'],
                row['PRICE USD'],
                typeof row['PRICE GBP'] === 'string' ? `"${row['PRICE GBP'].replace(/"/g, '""')}"` : row['PRICE GBP']
              ].join(',')
            )
          ];

          const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
          const encodedUri = encodeURI(csvContent);
          const link = document.createElement('a');
          link.setAttribute('href', encodedUri);
          link.setAttribute('download', dataset.name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Final record hook
          if (idx === datasets.length - 1) {
            setIsDownloading(false);
          }
        }, idx * 450);
      });
    } catch (error) {
      console.error('Execution stack failure on dynamic JSON deserialization', error);
      setIsDownloading(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isTransparent ? 'bg-transparent py-6' : 'bg-dark/95 backdrop-blur-md shadow-lg py-4 border-b border-white/10'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 transition-colors duration-300 group">
          <Image
            src="/logo.png"
            alt="Fragrance Distributors EU Logo"
            width={60}
            height={60}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-sans font-bold tracking-tight uppercase text-primary">Fragrance</span>
            <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-white">Distributors EU</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 text-slate-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <button
            id="btn-ordering-info-desktop"
            onClick={() => setIsOrderingModalOpen(true)}
            className="text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer border-none bg-transparent"
          >
            <Info size={13} className="text-primary" />
            Ordering Info
          </button>
          <button
            id="btn-download-all-desktop"
            onClick={downloadAllCatalogs}
            disabled={isDownloading}
            className="px-6 py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] uppercase tracking-widest font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
            {isDownloading ? 'Processing...' : 'Catalog Download'}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-dark border-b border-white/10 py-8 px-4 flex flex-col space-y-4 md:hidden shadow-xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-widest font-bold text-slate-300 hover:text-white transition-colors border-b border-white/5 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <button
                id="btn-ordering-info-mobile"
                onClick={() => {
                  setIsOrderingModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full px-6 py-3 rounded-sm bg-dark/80 text-slate-300 hover:text-white text-center text-xs uppercase tracking-widest font-bold hover:bg-dark/90 transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Info size={15} className="text-primary" />
                Ordering Info
              </button>
              <button
                id="btn-download-all-mobile"
                onClick={() => {
                  downloadAllCatalogs();
                  setIsOpen(false);
                }}
                disabled={isDownloading}
                className="w-full px-6 py-4 rounded-sm bg-emerald-600 text-white text-center text-xs uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isDownloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
                {isDownloading ? 'Processing Batch...' : 'Catalog Download'}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <OrderingInformationModal 
        isOpen={isOrderingModalOpen} 
        onClose={() => setIsOrderingModalOpen(false)} 
      />
    </header>
  );
}
