import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata = {
  title: 'Daaju Platform',
  description: 'Fragrance distributor',
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
        <Footer />
      </body>
    </html>
  );
}
