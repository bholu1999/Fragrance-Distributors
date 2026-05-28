import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <Image
              src="/logo.png"
              alt="Fragrance Distributors EU Logo"
              width={48}
              height={48}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-sans font-bold tracking-tight uppercase text-primary">Fragrance</span>
              <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-dark">Distributors EU</span>
            </div>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed font-normal">
            The premier wholesale distribution partner.
            Providing global access to exclusive and authentic fragrances.
          </p>
        </div>

        <div>
          <h4 className="font-sans font-bold tracking-tight text-dark mb-6">Platform</h4>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-slate-500 hover:text-primary text-sm transition-colors">About Us</Link></li>
            <li><Link href="/catalog" className="text-slate-500 hover:text-primary text-sm transition-colors">EU Stock Catalog</Link></li>
            <li><Link href="/catalog-us" className="text-slate-500 hover:text-primary text-sm transition-colors">US Stock Catalog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-bold tracking-tight text-dark mb-6">Company</h4>
          <ul className="space-y-3">
            <li><Link href="/privacy-policy" className="text-slate-500 hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
            <li><Link href="/faq" className="text-slate-500 hover:text-primary text-sm transition-colors">FAQ</Link></li>
            <li><Link href="/shipping-carriers" className="text-slate-500 hover:text-primary text-sm transition-colors">Shipping Carriers</Link></li>
            <li><Link href="/terms-and-conditions" className="text-slate-500 hover:text-primary text-sm transition-colors">Terms and Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-bold tracking-tight text-dark mb-6">Contact</h4>
          <address className="not-italic text-slate-500 text-sm space-y-2 leading-relaxed">
            <p>Calle Rellotge, 33 Santa Coloma De Gramenet
              08923 Barcelona, Spain.</p>
            <p className="pt-2 text-primary">sales@fragrancedistributors.eu</p>
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Fragrance Distributors. All rights reserved.</p>
      </div>
    </footer>
  );
}

