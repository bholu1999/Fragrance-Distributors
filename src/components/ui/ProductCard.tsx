import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, brand, image, category }: ProductCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group block cursor-pointer"
    >
      <Link to={`/catalog/${id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-white border border-slate-200 mb-4 p-8">
          <img 
            src={image} 
            alt={name} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 mix-blend-luminosity hover:mix-blend-normal"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">{category}</span>
          <h3 className="font-sans font-bold tracking-tight text-xl mb-1 text-dark ">{brand}</h3>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{name}</p>
        </div>
      </Link>
    </motion.div>
  );
}
