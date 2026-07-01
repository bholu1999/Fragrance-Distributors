'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    enquiryType: 'Wholesale Application',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form except enquiryType
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          enquiryType: 'Wholesale Application',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to connect to the mail server. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">

        <div className="text-center mb-20">
          <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Get in Touch</span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-dark mb-6 ">Partnership Enquiries</h1>
          <p className="text-slate-600  max-w-2xl mx-auto text-sm leading-relaxed">
            We are always looking to expand our network of distinguished retailers. Connect with our dedicated account management team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form / Success Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-sm"
          >
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center py-12"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Check className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold font-sans text-dark mb-4">Enquiry Received</h3>
                <p className="text-slate-600 text-sm max-w-sm mb-8 leading-relaxed">
                  Thank you for reaching out. Your partnership enquiry has been successfully sent to our sales team. We will review your details and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="border border-primary bg-primary text-black px-8 py-3.5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-transparent hover:text-primary transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-sm">
                    <p className="text-[10px] text-red-700 font-bold uppercase tracking-wider mb-1">Submission Failed</p>
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#F71B63] focus:border-primary  text-sm text-dark placeholder-zinc-600 transition-colors"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#F71B63] focus:border-primary  text-sm text-dark placeholder-zinc-600 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">Company / Retailer Name</label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#F71B63] focus:border-primary  text-sm text-dark placeholder-zinc-600 transition-colors"
                    placeholder="Maison des Parfums"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">Business Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#F71B63] focus:border-primary  text-sm text-dark placeholder-zinc-600 transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="enquiryType" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">Enquiry Type</label>
                  <select
                    id="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#F71B63] focus:border-primary  text-sm text-dark appearance-none rounded-none transition-colors"
                  >
                    <option>Wholesale Application</option>
                    <option>Brand Representation</option>
                    <option>General Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#F71B63] focus:border-primary  text-sm text-dark resize-none placeholder-zinc-600 transition-colors"
                    placeholder="Tell us about your retail channels..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border border-primary bg-primary text-black px-8 py-3.5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-transparent hover:text-primary transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Enquiry'
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="font-sans font-bold tracking-tight text-3xl mb-10 text-dark  pt-12 md:pt-0">Global Headquarters</h2>

              <div className="space-y-8  text-slate-600 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-primary">Address</h3>
                    <p> Calle Rellotge, 33 Santa Coloma De Gramenet<br />08923 Barcelona, Spain.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-primary">Email</h3>
                    <p>sales@fragrancedistributors.eu<br />purchase@fragrancedistributors.eu</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-primary">
                        Phone
                      </h3>
                      <p>+34 (SPAIN)</p>
                      <p>+91 40 27500429 (INDIA)</p>
                      <p>+01 212 461 0981 (USA)</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <MessageCircle className="text-green-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-primary">
                        WhatsApp
                      </h3>
                      <p>+356 9992 5903 (EU)</p>
                      <p>+91 800 837 9102 (INDIA)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 md:mt-0 aspect-video bg-white border border-slate-200 relative overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop" alt="Paris" className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_0_8px_rgba(15,23,42,0.15)] animate-pulse"></div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
