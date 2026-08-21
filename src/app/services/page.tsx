'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import {
  Video,
  Fingerprint,
  ShieldCheck,
  Flame,
  Scan,
  Network,
  Building2,
  Wrench,
  Zap,
  CheckCircle2,
  ArrowRight,
  Camera,
  ImageIcon,
} from 'lucide-react';

/* ─── Service Data ──────────────────────────────────────────────── */

const services = [
  {
    id: 1,
    slug: 'cctv-surveillance',
    title: 'CCTV Surveillance',
    icon: Video,
    contactParam: 'cctv-surveillance',
    description:
      'Comprehensive camera solutions for every environment — from a single shop entrance to a multi-acre industrial site. We supply and install IP and analog systems matched to your actual risk and budget, not oversold hardware.',
    includes: [
      'IP & Analog Cameras',
      'PTZ (Pan-Tilt-Zoom) Cameras',
      'ANPR (Automatic Number Plate Recognition) Cameras',
      'Explosion-Proof Cameras',
      'Thermal Cameras',
      'Bullet & Dome Cameras',
      'Video Management Software (VMS) setup & remote viewing',
    ],
    imageAlt: 'CCTV surveillance camera installation',
    imagePath: '/Service-img/sec1.png',
  },
  {
    id: 2,
    slug: 'access-control-biometric',
    title: 'Access Control & Biometric',
    icon: Fingerprint,
    contactParam: 'access-control-biometric',
    description:
      'Control exactly who enters, when, and where. Our biometric and access management systems replace manual registers and shared keys with a verifiable, auditable entry log.',
    includes: [
      'Biometric Devices (fingerprint, face recognition)',
      'RFID Card Readers',
      'Face Recognition Access Terminals',
      'Visitor Management Integration',
      'Time & Attendance Systems',
    ],
    imageAlt: 'Biometric access control device',
    imagePath: '/Service-img/sec2.png',
  },
  {
    id: 3,
    slug: 'entrance-security',
    title: 'Entrance Security',
    icon: ShieldCheck,
    contactParam: 'entrance-security',
    description:
      'Manage vehicle and pedestrian flow at gates, parking entries, and restricted zones — automated, so you\'re not relying on a guard alone to control access.',
    includes: [
      'Boom Barriers (manual & automatic)',
      'Turnstile Gates',
      'Flap Barriers',
      'Vehicle Access Control / ANPR-linked entry',
    ],
    imageAlt: 'Boom barrier at commercial entrance',
    imagePath: '/Service-img/sec3.png',
  },
  {
    id: 4,
    slug: 'fire-alarm-fire-fighting',
    title: 'Fire Alarm & Fire Fighting',
    icon: Flame,
    contactParam: 'fire-alarm-fire-fighting',
    description:
      'Fire detection and suppression equipment supply, installation, and commissioning — engineered so an early warning actually gives people time to act.',
    includes: [
      'Fire Alarm & Detection Panels',
      'Fire Hydrant Systems',
      'Fire Extinguishers (Gas, Gel, ABC)',
      'Gas Suppression Systems',
      'Smoke & Heat Detectors',
      'Public Address / Voice Evacuation Integration',
    ],
    imageAlt: 'Fire alarm panel and safety equipment',
    imagePath: '/Service-img/sec4.png',
  },
  {
    id: 5,
    slug: 'security-screening',
    title: 'Security Screening Equipment',
    icon: Scan,
    contactParam: 'security-screening',
    description:
      'For sites needing an added layer of screening — offices, institutions, and public-facing buildings — we supply and install detection equipment that fits your entry-point volume.',
    includes: [
      'DFMD (Door Frame Metal Detectors)',
      'HHMD (Hand-Held Metal Detectors)',
      'Baggage / X-ray Scanners',
      'Under Vehicle Scanning Systems (for larger sites)',
    ],
    imageAlt: 'Door frame metal detector at building entrance',
    imagePath: '/Service-img/sec5.png',
  },
  {
    id: 6,
    slug: 'networking',
    title: 'Networking',
    icon: Network,
    contactParam: 'networking',
    description:
      'The structured cabling and network infrastructure that everything else — cameras, access control, alarms — actually depends on to function reliably.',
    includes: [
      'Structured Cabling (Cat6 / Cat6A, fiber optic)',
      'Network Switches & Routers Setup',
      'Wi-Fi Infrastructure',
      'Server Room / Rack Setup',
      'IP Network Design for Security Systems',
    ],
    imageAlt: 'Structured network cabling in server rack',
    imagePath: '/Service-img/sec6.png',
  },
  {
    id: 7,
    slug: 'elv-bms',
    title: 'ELV & BMS',
    icon: Building2,
    contactParam: 'elv-bms',
    description:
      'Beyond security — the building-wide systems that tie communication, monitoring, and automation together under one integrated setup.',
    includes: [
      'EPABX (telephone / intercom systems)',
      'Audio-Visual Solutions',
      'Public Address Systems',
      'Building Management System (BMS) integration',
      'Intercom & Video Door Phone Systems',
    ],
    imageAlt: 'Building management system panel',
    imagePath: '/Service-img/sec7.png',
  },
  {
    id: 8,
    slug: 'installation-amc',
    title: 'Installation & AMC',
    icon: Wrench,
    contactParam: 'installation-amc',
    description:
      'Every system we design is backed by proper commissioning and ongoing support — because a security system that isn\'t maintained stops being a security system.',
    includes: [
      'Site Survey & System Design',
      'Supply, Installation & Commissioning',
      'Annual Maintenance Contracts (AMC)',
      'Remote & On-Site Technical Support',
    ],
    imageAlt: 'Technician installing security equipment',
    imagePath: '/Service-img/sec8.png',
  },
  {
    id: 9,
    slug: 'industrial-electrical',
    title: 'Industrial Electrical Solutions',
    icon: Zap,
    contactParam: 'industrial-electrical',
    description:
      'Supply and installation of industrial electrical infrastructure — power distribution, backup, and outdoor lighting — for facilities that need reliable power as much as they need security.',
    includes: [
      'Power Distribution Board (PDB) Panel Installation',
      'High Mast Pole Supply & Installation',
      'Industrial Lighting Pole Installation',
      'Solar Lighting Systems',
      'DG (Diesel Generator) Installation',
      'AMF / ATS Panel Setup (auto power backup switching)',
      'Industrial & Area Lighting (high-bay, flood, street, emergency, explosion-proof)',
    ],
    imageAlt: 'Industrial high mast lighting pole',
    imagePath: '/Service-img/sec9.1.png',
    // Secondary thumbnails for the broadest category
    thumbnails: [
      { label: 'PDB Panel', alt: 'Power distribution board panel', imagePath: '/Service-img/sec9.2.png' },
      { label: 'High Mast Pole', alt: 'Industrial high mast pole', imagePath: '/Service-img/sec9.3.png' },
      { label: 'DG Unit', alt: 'Diesel generator installation', imagePath: '/Service-img/sec9.4.png' },
    ],
  },
];

/* ─── Animation Variants ───────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const checklistItem = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Image Placeholder Component ──────────────────────────────── */

function ImagePlaceholder({
  alt,
  className = '',
  small = false,
}: {
  alt: string;
  className?: string;
  small?: boolean;
}) {
  return (
    <div
      className={`relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-2xl overflow-hidden flex items-center justify-center group ${className}`}
      title={alt}
    >
      {/* Subtle animated shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ph-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#095DA8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ph-grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2 text-gray-300">
        {small ? (
          <ImageIcon className="w-8 h-8" strokeWidth={1.2} />
        ) : (
          <>
            <Camera className="w-12 h-12" strokeWidth={1} />
            <span className="text-xs font-medium tracking-wide uppercase text-gray-400">
              Image Coming Soon
            </span>
          </>
        )}
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-gray-200/60 pointer-events-none" />
    </div>
  );
}

/* ─── Single Service Section ───────────────────────────────────── */

function ServiceSection({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const isEven = index % 2 === 1; // 0-indexed: even index = odd service number = text-left/image-right
  const Icon = service.icon;

  const textContent = (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="flex flex-col justify-center py-4 lg:py-0"
    >
      {/* Eyebrow */}
      <motion.div variants={checklistItem} className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#095DA8]/10 flex items-center justify-center text-[#095DA8]">
          <Icon className="w-5 h-5" strokeWidth={1.8} />
        </div>
        <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase text-[#095DA8]">
          Service {String(service.id).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={checklistItem}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4 lg:mb-5"
      >
        {service.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={checklistItem}
        className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6 lg:mb-8"
      >
        {service.description}
      </motion.p>

      {/* Includes label */}
      <motion.p
        variants={checklistItem}
        className="text-xs font-bold tracking-[0.12em] uppercase text-gray-400 mb-3"
      >
        What&apos;s Included
      </motion.p>

      {/* Checklist */}
      <motion.ul variants={staggerContainer} className="space-y-2.5 mb-8">
        {service.includes.map((item, idx) => (
          <motion.li
            key={idx}
            variants={checklistItem}
            className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-gray-700"
          >
            <CheckCircle2
              className="w-[18px] h-[18px] text-[#095DA8] mt-0.5 shrink-0"
              strokeWidth={2}
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>

      {/* CTA */}
      <motion.div variants={checklistItem}>
        <a
          href={`/contact?service=${service.contactParam}`}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#095DA8] hover:bg-[#074883] text-white rounded-full font-semibold text-[14px] sm:text-[15px] transition-all duration-300 shadow-lg shadow-[#095DA8]/15 hover:shadow-xl hover:shadow-[#095DA8]/25 hover:-translate-y-0.5 group"
        >
          Request a quote for {service.title}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </motion.div>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={imageReveal}
      className="w-full"
    >
      {service.imagePath ? (
        <div className="relative w-full aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
          <Image
            src={service.imagePath}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <ImagePlaceholder
          alt={service.imageAlt}
          className="w-full aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5]"
        />
      )}

      {/* Thumbnail strip for Industrial Electrical (service #9) */}
      {service.thumbnails && (
        <div className="grid grid-cols-3 gap-3 mt-3">
          {service.thumbnails.map((thumb, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              {(thumb as any).imagePath ? (
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <Image
                    src={(thumb as any).imagePath}
                    alt={thumb.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 15vw"
                  />
                </div>
              ) : (
                <ImagePlaceholder alt={thumb.alt} className="w-full aspect-square rounded-xl" small />
              )}
              <span className="text-[11px] font-medium text-gray-500 text-center">
                {thumb.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      id={service.slug}
      className="scroll-mt-36 lg:scroll-mt-40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* On mobile, image always first. On desktop, alternate */}
          <div className={isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}>
            {imageContent}
          </div>
          <div className={isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}>
            {textContent}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Quick Nav ────────────────────────────────────────────────── */

function QuickNav({ activeSlug }: { activeSlug: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active pill into view on mobile
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeEl = scrollContainerRef.current.querySelector(`[data-slug="${activeSlug}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSlug]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-[72px] lg:top-[84px] z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200/60 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1 py-2.5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = activeSlug === service.slug;

            return (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                data-slug={service.slug}
                className={`
                  relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] sm:text-[13px] font-semibold whitespace-nowrap snap-center transition-all duration-300
                  ${isActive
                    ? 'text-[#095DA8] bg-[#095DA8]/5'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={isActive ? 2.2 : 1.6} />
                <span className="hidden min-[480px]:inline">{service.title}</span>
                <span className="min-[480px]:hidden">
                  {service.title.length > 12
                    ? service.title.split(' ')[0]
                    : service.title}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeServiceNav"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#095DA8] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Services Page ───────────────────────────────────────── */

export default function ServicesPage() {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-50px' });

  // IntersectionObserver to update active slug on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    services.forEach((service) => {
      const el = document.getElementById(service.slug);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSlug(service.slug);
            }
          });
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <Navbar />
      <main className="w-full bg-white min-h-screen">
        {/* ─── Hero Banner ───────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative w-full h-[40vh] min-h-[360px] sm:min-h-[400px] flex flex-col justify-center bg-[#09152e] overflow-hidden"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/service-top.png"
              alt="Live View Infotech Services"
              fill
              className="object-cover opacity-50"
              priority
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#09152e]/90 via-[#09152e]/70 to-[#09152e]/20 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09152e]/90 via-[#09152e]/40 to-transparent" />

            {/* Decorative orbs */}
            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#095DA8]/20 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-[#095DA8]/20 blur-[80px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pb-8">
            <motion.div
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-blue-300 text-xs font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  What We Do
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5"
              >
                Security Solutions,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5ea8e8] to-[#8ec5f0]">
                  End to End
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl font-light"
              >
                From CCTV and access control to fire safety, networking, and industrial electrical
                — everything your site needs, designed and delivered by one team.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── Sticky Quick-Nav ──────────────────────────────────── */}
        <QuickNav activeSlug={activeSlug} />

        {/* ─── Service Sections ─────────────────────────────────── */}
        <div className="py-16 sm:py-20 lg:py-24 space-y-20 sm:space-y-28 lg:space-y-32">
          {services.map((service, idx) => (
            <ServiceSection key={service.id} service={service} index={idx} />
          ))}
        </div>

        {/* ─── Bottom CTA ───────────────────────────────────────── */}
        <section className="relative bg-[#09152e] py-20 sm:py-24 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full bg-[#095DA8]/8 blur-[120px]" />
            <div className="absolute bottom-0 right-[10%] w-[300px] h-[300px] rounded-full bg-[#095DA8]/5 blur-[80px]" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
                Ready to secure your site?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto">
                Tell us what you need — we&apos;ll come back with a free site survey and a solution
                that fits your budget.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#09152e] rounded-full font-semibold text-[15px] hover:bg-blue-50 transition-all duration-300 shadow-xl shadow-black/20 hover:-translate-y-0.5 group"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="tel:+918789090210"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white rounded-full font-semibold text-[15px] hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                >
                  Call +91 87890 90210
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
