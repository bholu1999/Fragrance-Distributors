'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Info, Globe, Truck, FileText, Phone, Mail, Clock, CheckCircle2, Download } from 'lucide-react';
import { useEffect } from 'react';

interface OrderingInformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderingInformationModal({ isOpen, onClose }: OrderingInformationModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-white text-slate-900 w-full max-w-6xl h-[90vh] flex flex-col rounded-xl shadow-2xl overflow-hidden border border-slate-200"
          >
            {/* Modal Header */}
            <header className="sticky top-0 z-10 bg-white text-dark border-slate-200 p-5 md:p-6 flex justify-between items-center border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 text-primary border border-primary/20">
                  <Info size={24} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight uppercase font-sans">Ordering Information</h2>
                  <p className="text-xs text-slate-400 tracking-widest uppercase">Información de Pedidos</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-dark"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </header>

            {/* Modal Content - Scrollable Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
              {/* Top Notification Banner */}
              <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 text-emerald-800 text-sm font-medium">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={18} />
                  <span>Orders can be placed by Phone, Email or WhatsApp.</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-800 text-sm font-medium md:border-l md:border-emerald-200 md:pl-6">
                  <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={18} />
                  <span>Los pedidos se pueden realizar por Teléfono, Correo Electrónico o WhatsApp.</span>
                </div>
              </div>

              {/* Two-Column Side-by-Side Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

                {/* --- ENGLISH SECTION --- */}
                <div className="p-6 md:p-8 space-y-8">
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                    <span className="text-xl" role="img" aria-label="UK flag">🇬🇧</span>
                    <h3 className="text-lg font-bold tracking-wide text-dark uppercase">English Version</h3>
                  </div>

                  {/* Info Section */}
                  <section className="space-y-4">
                    <h4 className="font-bold text-dark flex items-center gap-2 border-l-4 border-primary pl-3 py-0.5">
                      General Guidelines
                    </h4>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3 pl-4">
                      <p>
                        Orders can be placed by downloading our pricelist in excel format and putting your desired qty next to the items and emailing the file back to us.
                      </p>
                      <p>
                        Please include, your billing and shipping address and telephone numbers when ordering for the first time.
                      </p>
                      <p className="bg-amber-50 text-amber-800 p-3 rounded-md text-xs border border-amber-200 font-medium">
                        Pricing is negotiable for buyers interested in quantities of 24pcs or more per item.
                      </p>
                      <p className="italic text-slate-500 text-xs">
                        * Please note export and other restrictions apply on certain brands or products. We reserve the right to limit any order accordingly.
                      </p>
                    </div>
                  </section>

                  {/* International Orders */}
                  <section className="space-y-4">
                    <h4 className="font-bold text-dark flex items-center gap-2 border-l-4 border-blue-600 pl-3 py-0.5">
                      <Globe size={16} className="text-blue-600" />
                      International Orders
                    </h4>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 pl-4">Europe, USA, UK & Asia</p>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3 pl-4">
                      <div className="bg-slate-100 p-3 rounded-md border border-slate-200 grid grid-cols-2 gap-4 text-xs mb-3">
                        <div>
                          <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">Minimum Order</span>
                          <span className="text-dark font-bold text-base">€500 Euros</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">Processing Time</span>
                          <span className="text-dark font-bold text-base">24-48 Hours</span>
                        </div>
                      </div>
                      <p>
                        <strong>Payment Terms:</strong> All international shipments are limited to payment in full via bank/wire transfer prior to the release of any shipments.
                      </p>
                      <p className="text-xs text-red-600 font-medium">
                        Note: We do not accept Credit Cards or PayPal for international orders.
                      </p>
                      <p>
                        <strong>Shipping:</strong> We ship to almost every part of the world including all major cities and ports.
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li><strong>Orders €10,000+:</strong> Shipped via our trusted freight forwarders or client&apos;s own arrangements.</li>
                        <li><strong>Orders &lt; €10,000:</strong> Generally shipped via UPS International.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Domestic Orders */}
                  <section className="space-y-4">
                    <h4 className="font-bold text-dark flex items-center gap-2 border-l-4 border-red-600 pl-3 py-0.5">
                      <Truck size={16} className="text-red-600" />
                      Domestic Orders
                    </h4>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 pl-4">Spain</p>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3 pl-4">
                      <div className="bg-slate-100 p-3 rounded-md border border-slate-200 grid grid-cols-2 gap-4 text-xs mb-3">
                        <div>
                          <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">Minimum Order</span>
                          <span className="text-dark font-bold text-base">€99 Euros</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">Processing Time</span>
                          <span className="text-dark font-bold text-base">24-48 Hours</span>
                        </div>
                      </div>
                      <p>
                        <strong>Payment Terms:</strong> All new and unverified accounts are limited to payment in full via bank/wire transfer prior to release. PayPal is not accepted.
                      </p>
                      <p>
                        <strong>Shipping:</strong> Costs vary depending on size. Options include UPS, DHL, Gold Coast, Watkins, Daylight, and Dot line.
                      </p>
                    </div>
                  </section>

                  {/* Actions */}
                  <section className="space-y-4 pt-4">
                    <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <FileText className="text-primary flex-shrink-0" size={24} />
                        <div>
                          <p className="font-bold text-sm text-dark">New Account Application</p>
                          <p className="text-xs text-slate-500">Register with Fragrance Distributors EU</p>
                        </div>
                      </div>
                      <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold tracking-widest uppercase rounded transition-all shadow-sm">
                        <Download size={14} />
                        Download Form
                      </button>
                    </div>
                  </section>
                </div>

                {/* --- SPANISH SECTION --- */}
                <div className="p-6 md:p-8 space-y-8 bg-white">
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                    <span className="text-xl" role="img" aria-label="Spain flag">🇪🇸</span>
                    <h3 className="text-lg font-bold tracking-wide text-dark uppercase">Versión en Español</h3>
                  </div>

                  {/* Info Section */}
                  <section className="space-y-4">
                    <h4 className="font-bold text-dark flex items-center gap-2 border-l-4 border-primary pl-3 py-0.5">
                      Pautas Generales
                    </h4>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3 pl-4">
                      <p>
                        Los pedidos se pueden realizar descargando nuestra lista de precios en formato Excel, indicando la cantidad deseada al lado de los artículos y enviándonos el archivo de vuelta por correo electrónico.
                      </p>
                      <p>
                        Por favor, incluya su dirección de facturación, envío y sus números de teléfono al realizar un pedido por primera vez.
                      </p>
                      <p className="bg-amber-50 text-amber-800 p-3 rounded-md text-xs border border-amber-200 font-medium">
                        El precio es negociable para compradores interesados en cantidades de 24 unidades o más por artículo.
                      </p>
                      <p className="italic text-slate-500 text-xs">
                        * Tenga en cuenta que se aplican restricciones de exportación y otras en ciertas marcas o productos. Nos reservamos el derecho de limitar cualquier pedido en consecuencia.
                      </p>
                    </div>
                  </section>

                  {/* International Orders */}
                  <section className="space-y-4">
                    <h4 className="font-bold text-dark flex items-center gap-2 border-l-4 border-blue-600 pl-3 py-0.5">
                      <Globe size={16} className="text-blue-600" />
                      Pedidos Internacionales
                    </h4>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 pl-4">Europa, EE. UU., Reino Unido y Asia</p>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3 pl-4">
                      <div className="bg-slate-100 p-3 rounded-md border border-slate-200 grid grid-cols-2 gap-4 text-xs mb-3">
                        <div>
                          <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">Pedido Mínimo</span>
                          <span className="text-dark font-bold text-base">€500 Euros</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">Tiempo de Proceso</span>
                          <span className="text-dark font-bold text-base">24-48 Horas</span>
                        </div>
                      </div>
                      <p>
                        <strong>Condiciones de Pago:</strong> Todos los envíos internacionales se limitan al pago total mediante transferencia bancaria/cable gráfica antes del despacho.
                      </p>
                      <p className="text-xs text-red-600 font-medium">
                        Nota: Lamentamos informarle que no aceptamos tarjetas de crédito ni PayPal para pedidos internacionales.
                      </p>
                      <p>
                        <strong>Envíos:</strong> Hacemos envíos a casi cualquier parte del mundo, incluyendo las principales ciudades y puertos.
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li><strong>Pedidos €10.000+:</strong> A través de nuestros transitarios de confianza o arreglos del propio cliente.</li>
                        <li><strong>Pedidos &lt; €10.000:</strong> Generalmente enviados a través de UPS Internacional.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Domestic Orders */}
                  <section className="space-y-4">
                    <h4 className="font-bold text-dark flex items-center gap-2 border-l-4 border-red-600 pl-3 py-0.5">
                      <Truck size={16} className="text-red-600" />
                      Pedidos Nacionales
                    </h4>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 pl-4">España</p>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3 pl-4">
                      <div className="bg-slate-100 p-3 rounded-md border border-slate-200 grid grid-cols-2 gap-4 text-xs mb-3">
                        <div>
                          <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">Pedido Mínimo</span>
                          <span className="text-dark font-bold text-base">€99 Euros</span>
                        </div>
                        <div>
                          <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">Tiempo de Proceso</span>
                          <span className="text-dark font-bold text-base">24-48 Horas</span>
                        </div>
                      </div>
                      <p>
                        <strong>Condiciones de Pago:</strong> Para todas las cuentas nuevas y no verificadas, el pago debe ser por transferencia total antes de liberar la mercancía. No aceptamos PayPal.
                      </p>
                      <p>
                        <strong>Envíos:</strong> El costo varía según el volumen. Opciones populares incluyen UPS, DHL, Gold Coast, Watkins, Daylight y Dot line.
                      </p>
                    </div>
                  </section>

                  {/* Actions */}
                  <section className="space-y-4 pt-4">
                    <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <FileText className="text-primary flex-shrink-0" size={24} />
                        <div>
                          <p className="font-bold text-sm text-dark">Solicitud de Cuenta Nueva</p>
                          <p className="text-xs text-slate-500">Regístrese en Fragrance Distributors EU</p>
                        </div>
                      </div>
                      <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold tracking-widest uppercase rounded transition-all shadow-sm">
                        <Download size={14} />
                        Descargar Formulario
                      </button>
                    </div>
                  </section>
                </div>
              </div>

              {/* Contact Information Shared Footer */}
              <div className="bg-slate-900 text-white p-6 md:p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h4 className="text-xl font-bold tracking-tight text-white mb-2 uppercase">Contact Us / Contáctenos</h4>
                    <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                      If you have any questions, or would like to place an order, please contact us. / Si tiene alguna pregunta o desea realizar un pedido, contáctenos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col items-center text-center">
                      <div className="p-3 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
                        <Phone size={20} />
                      </div>
                      <h5 className="font-bold text-sm uppercase tracking-widest text-slate-200 mb-2">Phone / Teléfono</h5>
                      <a href="tel:+918008379102" className="text-white hover:text-primary transition-colors font-semibold text-sm">
                        +91 800 837 9102
                      </a>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col items-center text-center">
                      <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/20">
                        <Mail size={20} />
                      </div>
                      <h5 className="font-bold text-sm uppercase tracking-widest text-slate-200 mb-2">Email / Correo</h5>
                      <a href="mailto:fragrancedist@gmail.com" className="text-white hover:text-emerald-400 transition-colors font-semibold text-sm truncate max-w-full">
                        fragrancedist@gmail.com
                      </a>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col items-center text-center">
                      <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
                        <Clock size={20} />
                      </div>
                      <h5 className="font-bold text-sm uppercase tracking-widest text-slate-200 mb-2">Hours / Horario</h5>
                      <div className="text-slate-300 text-xs space-y-1">
                        <p><span className="font-semibold">Mon - Fri:</span> 10:00am - 7:00pm</p>
                        <p><span className="font-semibold">Sat:</span> 10:00am - 5:00pm</p>
                        <p><span className="font-semibold text-red-400">Sun:</span> Closed</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
                    Thank you for your continued support and we look forward to serving you! / ¡Gracias por su continuo apoyo y esperamos poder servirle!
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
