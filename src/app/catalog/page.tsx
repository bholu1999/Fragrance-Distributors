'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import ProductCard from '../../components/ui/ProductCard';
import { products } from '../../data/products';

export default function Catalog() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="bg-white pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-dark mb-4 ">Digital Portfolio</h1>
          <p className="text-slate-600 font-light max-w-xl mx-auto">Explore our global inventory of niche and designer fragrances available for programmatic B2B sourcing and dropshipping.</p>
        </div>

        {/* Filters (UI Only logic) */}
        <div className="flex flex-wrap justify-center mb-16 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                filter === cat 
                  ? 'bg-primary text-black border-primary' 
                  : 'bg-transparent text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={product.id}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center text-slate-500 py-20 font-light text-sm tracking-widest uppercase">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

