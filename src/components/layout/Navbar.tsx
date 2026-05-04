'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isTransparent ? 'bg-transparent py-6' : 'bg-dark/95 backdrop-blur-md shadow-lg py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-sans font-bold tracking-tight uppercase flex items-center gap-1.5 transition-colors duration-300 text-white">
          <span className="text-primary">Fragrance</span> Distributors
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
          <div className="flex items-center gap-4">
             <Link
               href="/login"
               className="text-[11px] uppercase tracking-widest font-bold transition-colors duration-300 text-white hover:text-primary"
             >
               Login
             </Link>
             <Link
               href="/register"
               className="px-6 py-2 rounded-sm bg-primary text-white text-[11px] uppercase tracking-widest font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
             >
               Join Us
             </Link>
          </div>
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
            <div className="flex flex-col gap-4 pt-4">
               <Link
                 href="/login"
                 onClick={() => setIsOpen(false)}
                 className="text-xs uppercase tracking-widest font-bold text-slate-300 hover:text-white transition-colors"
               >
                 Login
               </Link>
               <Link
                 href="/register"
                 onClick={() => setIsOpen(false)}
                 className="px-6 py-4 rounded-sm bg-primary text-white text-center text-xs uppercase tracking-widest font-bold hover:bg-primary-hover transition-all"
               >
                 Register
               </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}


