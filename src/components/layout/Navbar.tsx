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
    { name: 'About Us', path: '/about' },
    { name: 'EU Catalog', path: '/catalog' },
    { name: 'US Catalog', path: '/catalog-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const isTransparent = isHome && !scrolled;

  // Dynamic downloader for bulk catalog downloads
  const downloadAllCatalogs = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const staticFiles = [
        { name: 'Belgium Inventory List.xlsx', url: '/api/download-file?filename=Belgium%20Inventory%20List.xlsx' },
        { name: 'Netherland Inventory List.xlsx', url: '/api/download-file?filename=Netherland%20Inventory%20List.xlsx' },
        { name: 'Romania Inventory LIst.xlsx', url: '/api/download-file?filename=Romania%20Inventory%20LIst.xlsx' },
        { name: 'Spain Inventory List.xlsx', url: '/api/download-file?filename=Spain%20Inventory%20List.xlsx' },
        { name: 'USA Inventory List California.xlsx', url: '/api/download-file?filename=USA%20Inventory%20List%20California.xlsx' },
        { name: 'USA Inventory List (New Jersy).xlsx', url: '/api/download-file?filename=USA%20Inventory%20List%20(New%20Jersy).xlsx' },
        { name: 'USA Inventory (New York).xls', url: '/api/download-file?filename=USA%20Inventory%20(New%20York).xls' }
      ];

      // Download static files with linear delay
      staticFiles.forEach((file, idx) => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.setAttribute('href', file.url);
          link.setAttribute('download', file.name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, idx * 450);
      });

      // Download dynamic wholesale stock list
      setTimeout(async () => {
        try {
          const response = await fetch('/api/stock');
          if (response.ok) {
            const data = await response.json();
            const XLSX = await import('xlsx');
            
            // Generate worksheet from JSON data
            const ws = XLSX.utils.json_to_sheet(data);
            
            // Set custom column widths to make columns wider and easier to read
            ws['!cols'] = [
              { wch: 18 }, // EAN
              { wch: 25 }, // BRAND
              { wch: 15 }, // STATUS
              { wch: 55 }, // DESCRIPTION
              { wch: 15 }, // READY QTYS
              { wch: 15 }, // PRICE EUR
              { wch: 15 }, // PRICE USD
              { wch: 15 }  // PRICE GBP
            ];
            
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Wholesale Stock List');
            
            // Write out the file and trigger download
            XLSX.writeFile(wb, 'wholesale_stock_list.xlsx');
          }
        } catch (error) {
          console.error('Failed to download wholesale stock list', error);
        } finally {
          setIsDownloading(false);
        }
      }, staticFiles.length * 450);

    } catch (error) {
      console.error('Execution stack failure on catalog downloads', error);
      setIsDownloading(false);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm"
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
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-dark">Distributors EU</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 text-slate-600 hover:text-dark"
              >
                {link.name}
              </Link>
            ))}
            <button
              id="btn-ordering-info-desktop"
              onClick={() => setIsOrderingModalOpen(true)}
              className="text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 text-slate-600 hover:text-dark flex items-center gap-1.5 cursor-pointer border-none bg-transparent"
            >
              <Info size={13} className="text-primary" />
              Ordering Info
            </button>
            <button
              id="btn-download-all-desktop"
              onClick={downloadAllCatalogs}
              disabled={isDownloading}
              className="px-6 py-2.5 rounded-sm bg-secondary hover:bg-secondary-hover text-white text-[11px] uppercase tracking-widest font-bold shadow-lg shadow-secondary/20 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isDownloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
              {isDownloading ? 'Processing...' : 'Catalog Download'}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-dark" onClick={() => setIsOpen(!isOpen)}>
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
              className="absolute top-full left-0 w-full bg-white border-b border-slate-200 py-8 px-4 flex flex-col space-y-4 md:hidden shadow-xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-xs uppercase tracking-widest font-bold text-slate-600 hover:text-dark transition-colors border-b border-white/5 pb-4"
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
                  className="w-full px-6 py-3 rounded-sm bg-slate-100 text-slate-600 hover:text-dark text-center text-xs uppercase tracking-widest font-bold hover:bg-white/90 transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
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
                  className="w-full px-6 py-4 rounded-sm bg-secondary text-white text-center text-xs uppercase tracking-widest font-bold hover:bg-secondary-hover transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isDownloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
                  {isDownloading ? 'Processing Batch...' : 'Catalog Download'}
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <OrderingInformationModal
        isOpen={isOrderingModalOpen}
        onClose={() => setIsOrderingModalOpen(false)}
      />
    </>
  );
}
