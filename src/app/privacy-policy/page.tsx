import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white pt-24 overflow-x-hidden min-h-screen pb-24">
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto relative bg-white border border-slate-200 rounded-2xl shadow-sm mt-8">
        <h1 className="text-4xl font-sans font-bold tracking-tighter text-dark mb-10 leading-[0.95] text-center">
          Privacy Policy
        </h1>
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>
            This Privacy Policy outlines how Perfumedistri collects, uses, discloses, and protects your personal information when you engage in wholesale transactions with us. Protecting your privacy and ensuring the security of your personal data is of utmost importance to us. By using Perfumedistri's services and providing your information, you agree to the practices described in this Privacy Policy.
          </p>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Information We Collect</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Personal Information:</strong> When you engage in wholesale transactions with Perfumedistri, we may collect personal information such as your name, business name, contact information (email address, phone number, address), and payment details.</li>
            <li><strong>Order Information:</strong> We collect information related to your wholesale orders, including order details, product selections, and order history.</li>
          </ol>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">How We Use Your Information</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Order Processing:</strong> We use your personal information to process and fulfill your wholesale orders, including order confirmation, invoicing, and delivery.</li>
            <li><strong>Customer Support:</strong> Your contact information may be used to provide customer support and address any inquiries or issues you may have.</li>
            <li><strong>Communication:</strong> We may use your email address to communicate important information about your orders, updates on our services, and promotional offers if you have opted in to receive such communications.</li>
          </ol>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Sharing Your Information</h3>
          <p>
            We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted third-party service providers who assist us in conducting our business operations, such as payment processing and shipping. These service providers are bound by confidentiality agreements and are only authorized to use your information to provide services on our behalf.
          </p>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Data Retention</h3>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations.
          </p>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Your Rights</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access the personal information we hold about you.</li>
            <li>Correct inaccuracies in your personal information.</li>
            <li>Withdraw your consent for marketing communications.</li>
            <li>Request the deletion of your personal information, subject to legal obligations.</li>
          </ul>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Cookies</h3>
          <p>
            Our website may use cookies to enhance your browsing experience. You can manage or disable cookies through your browser settings.
          </p>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Changes to this Privacy Policy</h3>
          <p>
            We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on our website, and we encourage you to review this policy periodically.
          </p>

          <h3 className="text-xl font-bold text-dark mt-8 mb-4">Contact Us</h3>
          <p>
            If you have any questions, concerns, or requests regarding your personal information or this Privacy Policy, please contact Perfumedistri's Data Privacy Officer at <strong>hello@perfumedistri.com</strong>.
          </p>
          <p className="mt-4">
            By engaging in wholesale transactions with Perfumedistri, you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy. If you do not agree with any part of this policy, please refrain from using Perfumedistri's services.
          </p>
        </div>
      </section>
    </div>
  );
}
