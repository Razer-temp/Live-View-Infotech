'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import {
  Send,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronDown,
  Check,
  Sparkles,
  Building2,
  Home,
  Factory,
  Landmark,
  TrainFront,
  MoreHorizontal,
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────── */

const reasonOptions = [
  'Request a Free Site Survey',
  'Get a Quote — Supply Only',
  'Get a Quote — Installation Only',
  'Get a Quote — Full Work (Supply + Installation)',
  'Annual Maintenance Contract (AMC) Inquiry',
  'Vendor Registration / Tender Inquiry',
  'General Inquiry',
];

const serviceOptions = [
  'CCTV Surveillance',
  'Access Control & Biometric',
  'Fire Alarm & Fire Fighting',
  'Networking & ELV Systems',
  'Not Sure / Need Consultation',
];

const sectorOptions = [
  { label: 'Residential / Home', icon: Home },
  { label: 'Commercial (Shop, Office, School, Hospital)', icon: Building2 },
  { label: 'Industrial', icon: Factory },
  { label: 'Government / PSU', icon: Landmark },
  { label: 'Railways / Metro', icon: TrainFront },
  { label: 'Other', icon: MoreHorizontal },
];

const WHATSAPP_NUMBER = '918789090210';
const EMAIL_ADDRESS = 'liveviewinfotech@gmail.com';

/* ─── Animation Variants ───────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Custom Dropdown Component ────────────────────────────────── */

function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  id,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-300 bg-white
          ${isOpen ? 'border-[#095DA8] ring-4 ring-[#095DA8]/10' : 'border-gray-200 hover:border-gray-300'}
          ${value ? 'text-gray-900' : 'text-gray-400'}
        `}
      >
        <span className="truncate pr-2">{value || placeholder}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden max-h-72 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center gap-3
                  ${value === option ? 'bg-[#095DA8]/5 text-[#095DA8] font-medium' : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                {value === option && <Check className="w-4 h-4 text-[#095DA8] flex-shrink-0" />}
                <span className={value === option ? '' : 'pl-7'}>{option}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Contact Page ────────────────────────────────────────── */

export default function ContactPage() {
  // Form state
  const [reason, setReason] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [sector, setSector] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-50px' });
  const formInView = useInView(formRef, { once: true, margin: '-80px' });
  const contactInView = useInView(contactRef, { once: true, margin: '-80px' });

  // Toggle service checkbox
  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  // Build WhatsApp message
  const buildWhatsAppMessage = () => {
    let msg = `Hi Live View Infotech,`;
    if (reason) msg += `\nI'd like to request: ${reason}`;
    if (services.length) msg += `\nService(s): ${services.join(', ')}`;
    if (sector) msg += `\nSector: ${sector}`;
    if (city) msg += `\nLocation: ${city}`;
    if (fullName) msg += `\nName: ${fullName}`;
    if (phone) msg += `\nPhone: ${phone}`;
    if (message) msg += `\n\n${message}`;
    return msg;
  };

  // Build WhatsApp URL
  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(buildWhatsAppMessage());
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  // Build mailto URL
  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`New Inquiry — ${reason || 'General'}`);
    const body = encodeURIComponent(
      [
        `Name: ${fullName}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : '',
        `Location: ${city}`,
        `Reason: ${reason}`,
        `Service(s): ${services.join(', ')}`,
        `Sector: ${sector}`,
        message ? `\nMessage: ${message}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    );
    return `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
  };

  // Handle form submission (mailto-based)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!fullName.trim() || !phone.trim() || !city.trim()) return;

    // Open mailto link
    window.location.href = getMailtoUrl();
    setSubmitted(true);

    // Reset after a delay
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Navbar />
      <main className="w-full bg-white min-h-screen">
        {/* ─── Hero Banner ─────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative w-full bg-[#09152e] overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Contact-img.png"
              alt="Contact Live View Infotech"
              fill
              className="object-cover opacity-60"
              priority
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#09152e]/95 via-[#09152e]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36">
            <motion.div
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#095DA8]/20 text-[#5ea8e8] text-xs font-bold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Free Consultation
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
              >
                Have a site to protect?{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5ea8e8] to-[#095DA8]">
                  Let&apos;s secure it.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl font-light"
              >
                Tell us what you need — CCTV, fire safety, access control, or networking — and
                we&apos;ll get back to you within 24 hours with a free site survey or quote.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── Form + Contact Info Section ──────────────────────────── */}
        <section
          className="relative z-20 bg-white"
          style={{
            clipPath: 'polygon(0 0, 100% 5vw, 100% 100%, 0 100%)',
            marginTop: '-5vw',
            paddingTop: '12vw',
            paddingBottom: '6rem'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ─── Form (3 columns) ─────────────────────────────────── */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formInView ? 'visible' : 'hidden'}
              variants={scaleIn}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="relative">
                {/* Form card */}
                <div className="bg-white rounded-3xl border border-gray-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-10">
                  {/* Success overlay */}
                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-center p-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                        >
                          <Check className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                        <p className="text-gray-600">
                          Your email client should have opened. We&apos;ll respond within 24 hours.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-8">
                    {/* 1. Reason for Contact */}
                    <CustomSelect
                      id="contact-reason"
                      label="Reason for Contact"
                      options={reasonOptions}
                      value={reason}
                      onChange={setReason}
                      placeholder="Select a reason..."
                    />

                    {/* 2. Services Needed (multi-select checkboxes) */}
                    <fieldset>
                      <legend className="block text-sm font-semibold text-gray-700 mb-3">
                        Service(s) Needed
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceOptions.map((service) => {
                          const isSelected = services.includes(service);
                          return (
                            <motion.button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              whileTap={{ scale: 0.97 }}
                              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all duration-300
                                ${
                                  isSelected
                                    ? 'border-[#095DA8] bg-[#095DA8]/5 text-[#095DA8]'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                }
                              `}
                            >
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                                  ${isSelected ? 'border-[#095DA8] bg-[#095DA8]' : 'border-gray-300'}
                                `}
                              >
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                      transition={{ duration: 0.15 }}
                                    >
                                      <Check className="w-3 h-3 text-white" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                              {service}
                            </motion.button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* 3. Sector */}
                    <fieldset>
                      <legend className="block text-sm font-semibold text-gray-700 mb-3">
                        Sector
                      </legend>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {sectorOptions.map(({ label, icon: Icon }) => {
                          const isSelected = sector === label;
                          return (
                            <motion.button
                              key={label}
                              type="button"
                              onClick={() => setSector(label)}
                              whileTap={{ scale: 0.96 }}
                              className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 text-center text-xs sm:text-sm font-medium transition-all duration-300
                                ${
                                  isSelected
                                    ? 'border-[#095DA8] bg-[#095DA8]/5 text-[#095DA8] shadow-md shadow-[#095DA8]/10'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                }
                              `}
                            >
                              <Icon
                                className={`w-5 h-5 transition-colors duration-300 ${
                                  isSelected ? 'text-[#095DA8]' : 'text-gray-400'
                                }`}
                              />
                              <span className="leading-tight">{label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* 4. Basic Details */}
                    <div className="space-y-5">
                      <h3 className="text-sm font-semibold text-gray-700">Your Details</h3>

                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#095DA8] focus:ring-4 focus:ring-[#095DA8]/10 outline-none transition-all duration-300"
                        />
                      </div>

                      {/* Phone + Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#095DA8] focus:ring-4 focus:ring-[#095DA8]/10 outline-none transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">
                            Email <span className="text-gray-400 text-xs">(optional)</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#095DA8] focus:ring-4 focus:ring-[#095DA8]/10 outline-none transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-600 mb-1.5">
                          City / Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Dhanbad, Ranchi, Kolkata"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#095DA8] focus:ring-4 focus:ring-[#095DA8]/10 outline-none transition-all duration-300"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1.5">
                          Message / Additional Details{' '}
                          <span className="text-gray-400 text-xs">(optional)</span>
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your site, number of cameras/points needed, or any specific requirement"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#095DA8] focus:ring-4 focus:ring-[#095DA8]/10 outline-none transition-all duration-300 resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#095DA8] text-white text-base font-semibold rounded-xl hover:bg-[#074883] transition-all duration-300 shadow-lg shadow-[#095DA8]/20 hover:shadow-xl hover:shadow-[#095DA8]/30 group"
                    >
                      <Send className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      Send My Request
                    </motion.button>

                    {/* WhatsApp Alternative */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-4 bg-white text-sm text-gray-400">or</span>
                      </div>
                    </div>

                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white text-base font-semibold rounded-xl hover:bg-[#1fb955] transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:shadow-[#25D366]/25 group"
                    >
                      <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      Prefer WhatsApp? Chat with us instantly →
                    </a>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* ─── Contact Info Sidebar (2 columns) ──────────────────── */}
            <motion.div
              ref={contactRef}
              initial="hidden"
              animate={contactInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="lg:col-span-2 space-y-8"
            >
              {/* Main Contact Card */}
              <motion.div
                variants={fadeUp}
                custom={0}
                className="bg-[#09152e] rounded-3xl p-8 text-white relative overflow-hidden"
              >
                {/* Decorative orb */}
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#095DA8]/20 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#095DA8]/10 blur-2xl" />

                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Get in Touch</h3>
                    <p className="text-gray-400 text-sm">Reach us through any channel</p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#095DA8]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#5ea8e8]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Phone</p>
                      <a href="tel:+918789090210" className="block text-white hover:text-[#5ea8e8] transition-colors font-medium">
                        +91 87890 90210
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#095DA8]/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#5ea8e8]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Email</p>
                      <a
                        href="mailto:liveviewinfotech@gmail.com"
                        className="text-white hover:text-[#5ea8e8] transition-colors font-medium break-all text-sm"
                      >
                        liveviewinfotech@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10" />

                  {/* Response time */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#095DA8]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#5ea8e8]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        We typically respond within <span className="text-white font-semibold">24 hours</span>, and can schedule a free site visit for local clients in Dhanbad and nearby areas.
                      </p>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <ShieldCheck className="w-5 h-5 text-[#5ea8e8] flex-shrink-0" />
                    <p className="text-xs text-gray-300">
                      <span className="font-semibold text-white">MSME Registered</span>{' '}
                      · UDYAM-JH-04-0055124
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Registered Office */}
              <motion.div
                variants={fadeUp}
                custom={1}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#095DA8]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#095DA8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Registered Office</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Office No. 198, Ara More, Near Matkuria Flyover,
                      <br />
                      Dhanbad, Jharkhand – 826001
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Branch Office */}
              <motion.div
                variants={fadeUp}
                custom={2}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#095DA8]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#095DA8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Branch Office</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Shri Ram Plaza, Near Shanti Bhawan, Ground Floor,
                      <br />
                      Bank More, Dhanbad, Jharkhand
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick WhatsApp CTA (sidebar) */}
              <motion.a
                variants={fadeUp}
                custom={3}
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl p-6 text-white group hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold mb-0.5">Quick WhatsApp</p>
                  <p className="text-sm text-white/80">Chat with us instantly</p>
                </div>
              </motion.a>
            </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
