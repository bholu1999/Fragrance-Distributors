'use client';
import Link from 'next/link';
import { motion } from 'motion/react';

interface CategoryCardProps {
  name: string;
  image: string;
  link: string;
}

export default function CategoryCard({ name, image, link }: CategoryCardProps) {
  return (
    <Link href={link} className="block relative group overflow-hidden aspect-square md:aspect-[3/4]">
      <motion.div 
        className="w-full h-full"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full p-8 text-center sm:text-left z-10 transition-transform duration-500 group-hover:translate-y-[-8px]">
        <h3 className="font-sans font-bold tracking-tight text-3xl text-white mb-2 ">{name}</h3>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 group-hover:text-primary transition-colors">
          Explore Collection &rarr;
        </span>
      </div>
    </Link>
  );
}


