'use client';
import { motion } from 'motion/react';
import { DownloadCloud, FileSpreadsheet, Lock } from 'lucide-react';
import { useState } from 'react';

export default function Download() {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'complete'>('idle');

  const handleDownload = () => {
    setDownloadState('downloading');
    
    // Simulate generation/download
    setTimeout(() => {
      setDownloadState('complete');
      
      // Reset state after a while
      setTimeout(() => setDownloadState('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white pt-24 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 py-16 w-full">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-10 md:p-16 text-center border border-slate-200 shadow-xl relative overflow-hidden"
        >
          {/* Decorative faint background icon */}
          <FileSpreadsheet className="absolute -top-10 -right-10 w-64 h-64 text-white/5 -rotate-12 pointer-events-none" />
          
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-200 relative z-10">
            <Lock className="text-primary" size={32} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-dark mb-6 relative z-10 ">Wholesale Line Sheet</h1>
          <p className="text-slate-600 font-light max-w-lg mx-auto mb-10 text-sm relative z-10">
            Access our complete catalog pricing in Excel format. Includes MOQ requirements, tier discounts, and EAN/SKU matrices.
          </p>

          <div className="bg-white rounded-sm p-6 flex flex-col md:flex-row items-center justify-between mb-10 text-left border border-slate-200 relative z-10">
             <div className="flex items-center gap-4 mb-4 md:mb-0">
               <div className="bg-white border border-slate-200 p-3 rounded-sm shadow-sm">
                 <FileSpreadsheet className="text-primary" size={24} strokeWidth={1.5} />
               </div>
               <div>
                 <p className="font-medium text-dark text-sm">fragrance_distributors_b2b_catalog_Q3.xlsx</p>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Excel Document • 2.4 MB</p>
               </div>
             </div>
             <div>
               <p className="text-xs font-sans font-bold tracking-tight  text-slate-500">Updated: Oct 2023</p>
             </div>
          </div>

          <button 
            onClick={handleDownload}
            disabled={downloadState !== 'idle'}
            className="w-full md:w-auto relative z-10 border border-primary bg-primary text-black px-12 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-transparent hover:text-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-3"
          >
            {downloadState === 'idle' && (
              <>
                <DownloadCloud size={18} />
                Download Catalog
              </>
            )}
            {downloadState === 'downloading' && (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing Secure Link...
              </>
            )}
            {downloadState === 'complete' && (
              <>
                Download Initiated!
              </>
            )}
          </button>
          
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-8 relative z-10">
            Requires active trading account. Password protected.
          </p>

        </motion.div>
      </div>
    </div>
  );
}

