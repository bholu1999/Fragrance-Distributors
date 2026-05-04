'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { products } from '../../../data/products';
import { FileSpreadsheet } from 'lucide-react';

export default function CatalogDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen bg-white">
        <h1 className="text-3xl font-sans font-bold tracking-tight text-dark mb-4 ">Product Not Found</h1>
        <Link href="/catalog" className="text-primary uppercase tracking-widest text-[10px] font-bold hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        
        <div className="mb-8">
          <Link href="/catalog" className="text-slate-500 hover:text-primary text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
            &larr; Back to Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-white border border-slate-200 p-8 md:p-16 flex items-center justify-center relative overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover shadow-2xl" 
            />
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-slate-200"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-slate-200"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-slate-200"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-slate-200"></div>
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4 block">
              {product.brand}
            </span>
            <h1 className="font-sans font-bold tracking-tight text-4xl md:text-5xl text-dark mb-2 ">
              {product.name}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-10">
              SKU: {product.sku}
            </p>

            <p className="font-light text-slate-600 leading-relaxed text-sm mb-12">
              {product.description}
            </p>

            {/* Product Metadata */}
            <div className="mb-12">
              <h3 className="font-sans font-bold tracking-tight text-2xl mb-6 border-b border-slate-200 pb-2 text-primary">Technical Data</h3>
              <div className="space-y-4">
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{detail.label}</span>
                    <span className="text-sm font-medium text-dark">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/download" 
                className="flex-1 flex items-center justify-center gap-2 border border-primary bg-primary text-black px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-transparent hover:text-primary transition-colors shadow-lg shadow-primary/20"
              >
                <FileSpreadsheet size={16} />
                Download Excel Spec
              </Link>
              <Link 
                href="/contact" 
                className="flex-1 text-center border border-slate-200 bg-white text-dark px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-slate-50 transition-colors"
              >
                Request Quote
              </Link>
            </div>

            <p className="mt-8 text-[10px] text-slate-400 font-medium italic">
              * Real-time stock status is updated every 15 minutes via our global distribution network.
            </p>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
