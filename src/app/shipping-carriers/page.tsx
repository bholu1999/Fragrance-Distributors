import React from 'react';

export default function ShippingCarriers() {
  return (
    <div className="bg-white pt-24 overflow-x-hidden min-h-screen pb-24">
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto relative bg-white border border-slate-200 rounded-2xl shadow-sm mt-8">
        <h1 className="text-4xl font-sans font-bold tracking-tighter text-dark mb-10 leading-[0.95] text-center">
          Shipping Carriers
        </h1>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p className="text-lg">
            Fast, Reliable Shipping with Trusted Carriers Worldwide. With our extensive global transport network, we collaborate with leading carriers to meet every need and expectation. We provide a reliable, fast, and secure shipping experience, ensuring that your orders are delivered efficiently and punctually, no matter where you are in the world.
          </p>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Collaborating Carriers</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>UPS:</strong> Efficient, dependable shipping with global reach.</li>
            <li><strong>DHL:</strong> Fast, global shipping with trusted delivery solutions.</li>
            <li><strong>FedEx:</strong> Secure and timely international shipping services worldwide.</li>
            <li><strong>DPD:</strong> Reliable delivery service with flexible shipping options.</li>
            <li><strong>PostNL:</strong> Trusted postal service with nationwide and international delivery.</li>
          </ul>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Key Shipping Details</h3>
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <strong>Efficient Order Processing:</strong> Orders are processed within 4-7 working days, ensuring quick turnaround times and minimal delays.
            </li>
            <li>
              <strong>Reliable Shipping Partners:</strong> DHL, UPS, PostNL, DPD, and FedEx are our trusted carriers, guaranteeing secure, timely, and efficient deliveries worldwide.
            </li>
            <li>
              <strong>Global Shipping:</strong> We ship worldwide with no location restrictions, making sure your orders reach you or your customers, no matter the destination.
            </li>
            <li>
              <strong>Fast and Accurate Service:</strong> Whether your order is large or small, we handle it with care and precision, ensuring every detail is right.
            </li>
            <li>
              <strong>Seamless Experience:</strong> From order placement to delivery, we manage every step of the process, ensuring you receive your products with ease and confidence.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
