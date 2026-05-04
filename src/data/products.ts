export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  price?: string;
  details: {
    label: string;
    value: string;
  }[];
  sku: string;
}

export const products: Product[] = [
  { 
    id: '1', 
    name: 'Oud Wood Intense 100ml', 
    brand: 'Tom Ford', 
    category: 'Niche', 
    image: 'https://images.unsplash.com/photo-1594035910387-fea477242610?q=80&w=600&auto=format&fit=crop',
    description: 'A deeply textural, intense interpretation of original Oud Wood. Unrestrained and deeply satisfying.',
    details: [
      { label: 'EAN', value: '8806339103874' },
      { label: 'Availability', value: 'In Stock' },
      { label: 'Warehouse', value: 'EU-North' }
    ],
    sku: 'TF-OWI-100'
  },
  { 
    id: '2', 
    name: 'Baccarat Rouge 540 70ml', 
    brand: 'Maison Francis Kurkdjian', 
    category: 'Niche', 
    image: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?q=80&w=600&auto=format&fit=crop',
    description: 'Luminous and sophisticated. A poetic alchemy where the aerial notes of jasmine and the radiance of saffron carry mineral facets of ambergris.',
    details: [
      { label: 'EAN', value: '3700559603116' },
      { label: 'Availability', value: 'Low Stock' },
      { label: 'Warehouse', value: 'EU-Central' }
    ],
    sku: 'MFK-BR5-070'
  },
  { 
    id: '3', 
    name: 'Bleu de Chanel 150ml', 
    brand: 'Chanel', 
    category: 'Designer', 
    image: 'https://images.unsplash.com/photo-1523293111003-8515786ed045?q=80&w=600&auto=format&fit=crop',
    description: 'A woody, aromatic fragrance for the man who defies convention. A provocative blend of citrus and woods.',
    details: [
      { label: 'Reference', value: '3145891073801' },
      { label: 'Availability', value: 'In Stock' },
      { label: 'Warehouse', value: 'FR-Paris' }
    ],
    sku: 'CH-BLEU-150'
  },
  { 
    id: '4', 
    name: 'Aventus 100ml', 
    brand: 'Creed', 
    category: 'Artisan', 
    image: 'https://images.unsplash.com/photo-1594824419992-ea9b699e19d7?q=80&w=600&auto=format&fit=crop',
    description: 'Celebrating strength, vision and success. The finest ingredients hand-selected for the discerning individual.',
    details: [
      { label: 'Model', value: '3508441001114' },
      { label: 'Availability', value: 'In Stock' },
      { label: 'Warehouse', value: 'UK-Main' }
    ],
    sku: 'CR-AVN-100'
  },
  { 
    id: '5', 
    name: 'Santal 33 100ml', 
    brand: 'Le Labo', 
    category: 'Niche', 
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop',
    description: 'An icon of modern perfumery. Smokey, leathery, and rich.',
    details: [
      { label: 'EAN', value: '842400112128' },
      { label: 'Availability', value: 'In Stock' },
      { label: 'Warehouse', value: 'FR-South' }
    ],
    sku: 'LL-S33-100'
  },
  { 
    id: '6', 
    name: 'Sauvage Elixir 60ml', 
    brand: 'Dior', 
    category: 'Designer', 
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop',
    description: 'An extraordinarily concentrated fragrance steeped in the emblematic freshness of Sauvage with an intoxicating heart of spices.',
    details: [
      { label: 'EAN', value: '3348901567341' },
      { label: 'Availability', value: 'In Stock' },
      { label: 'Warehouse', value: 'US-East' }
    ],
    sku: 'DR-SVG-E60'
  }
];
