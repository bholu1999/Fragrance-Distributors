import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PaymentInfo from '../components/layout/PaymentInfo';

export const metadata = {
  title: 'Fragrance Distributor',
  description: 'Global Fragrance Distribution Authority',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans selection:bg-primary selection:text-white relative min-h-screen flex flex-col bg-slate-50 text-gray-900">
        <div className="noise-overlay" />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <PaymentInfo />
        <Footer />
      </body>
    </html>
  );
}
