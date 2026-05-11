'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Import JSON catalog files directly for downloading
import clarinsData from '../../data/Clarins (Skincare GiftSets).json';
import isseyData from '../../data/Issey Miyake Narciso Rodriguez Zadig Voltaire.json';
import mixedData from '../../data/Mixed Selection.json';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    { name: 'Our Platform', path: '/about' },
    { name: 'Digital Catalog', path: '/catalog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isTransparent = isHome && !scrolled;

  // Trigger sequential CSV downloads for all 3 datasets
  const downloadAllCatalogs = () => {
    const datasets = [
      { name: 'Clarins_Skincare_GiftSets.csv', data: clarinsData },
      { name: 'Issey_Miyake_Narciso_Rodriguez_Zadig_Voltaire.csv', data: isseyData },
      { name: 'Mixed_Selection.csv', data: mixedData }
    ];

    datasets.forEach((dataset, idx) => {
      // Delay downloads slightly to avoid browser pop-up blocking
      setTimeout(() => {
        const headers = ['EAN', 'BRAND', 'STATUS', 'DESCRIPTION', 'READY QTYS', 'PRICE EUR', 'PRICE USD', 'PRICE GBP'];
        const csvRows = [
          headers.join(','),
          ...dataset.data.map((row: any) =>
            [
              row.EAN,
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
      }, idx * 350); // 350ms delay
    });
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
            id="btn-download-all-desktop"
            onClick={downloadAllCatalogs}
            className="px-6 py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] uppercase tracking-widest font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <Download size={13} />
            Catalog Download
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
            <div className="pt-4">
              <button
                id="btn-download-all-mobile"
                onClick={() => {
                  downloadAllCatalogs();
                  setIsOpen(false);
                }}
                className="w-full px-6 py-4 rounded-sm bg-emerald-600 text-white text-center text-xs uppercase tracking-widest font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
              >
                <Download size={15} />
                Catalog Download
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
