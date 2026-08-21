'use client';

import { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, 
  Video, 
  Fingerprint, 
  ShieldCheck, 
  Flame, 
  Scan, 
  Network, 
  Building2, 
  Wrench,
  ArrowRight,
  X,
  Menu
} from 'lucide-react';

const servicesList = [
  {
    title: 'CCTV Surveillance',
    desc: 'IP, PTZ, thermal, and ANPR camera systems for any environment',
    icon: Video,
    href: '/services#cctv-surveillance',
  },
  {
    title: 'Access Control & Biometric',
    desc: 'Biometric readers, RFID, and complete entry management',
    icon: Fingerprint,
    href: '/services#access-control-biometric',
  },
  {
    title: 'Entrance Security',
    desc: 'Boom barriers, turnstiles, and vehicle access systems',
    icon: ShieldCheck,
    href: '/services#entrance-security',
  },
  {
    title: 'Fire Alarm & Fire Fighting',
    desc: 'Detection, alarm, and suppression systems',
    icon: Flame,
    href: '/services#fire-alarm-fire-fighting',
  },
  {
    title: 'Security Screening Equipment',
    desc: 'Baggage scanners, DFMD, HHMD, and inspection systems',
    icon: Scan,
    href: '/services#security-screening',
  },
  {
    title: 'Networking',
    desc: 'Structured cabling and network infrastructure',
    icon: Network,
    href: '/services#networking',
  },
  {
    title: 'ELV & BMS',
    desc: 'Building management, EPABX, and AV systems',
    icon: Building2,
    href: '/services#elv-bms',
  },
  {
    title: 'Installation & AMC',
    desc: 'Setup, commissioning, and ongoing maintenance support',
    icon: Wrench,
    href: '/services#installation-amc',
  },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle click outside and Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleKeyDownOnTrigger = (e: ReactKeyboardEvent, menu: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu(menu);
    }
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const dropdownVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.2, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -8,
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.15, 
        ease: "easeIn" 
      }
    }
  };

  // Mobile overlay variants
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.18, ease: "easeIn" }
    }
  };

  // Fast cubic-bezier tween — avoids spring overshoot on mobile GPUs
  const mobileMenuVariants: Variants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        duration: 0.28,
        ease: [0.25, 0.46, 0.45, 0.94] // ease-out-quart
      }
    },
    exit: { 
      x: '100%',
      transition: { duration: 0.22, ease: [0.4, 0, 0.6, 1] }
    }
  };

  // Opacity-only stagger — GPU-composited, no layout recalc
  const mobileNavItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: 0.08 + i * 0.04, duration: 0.2, ease: "easeOut" }
    }),
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  return (
    <>
      <div 
        ref={navRef}
        className={`fixed top-0 left-0 z-[100] w-full flex justify-center bg-white border-b border-black/[0.04] transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`} 
        onMouseLeave={handleMouseLeave}
      >
      {/* Header Container */}
      <header className="max-w-[1140px] w-full mx-auto flex items-center justify-between h-[72px] lg:h-[84px] px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center justify-start shrink-0">
          <a href="/" className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md">
            <Image
              src="/Logo.png"
              alt="Live View Infotech"
              width={260}
              height={76}
              priority
              className="h-[52px] sm:h-[58px] lg:h-[72px] w-auto object-contain"
            />
          </a>
        </div>

        {/* Desktop Navigation — hidden below lg */}
        <nav className="hidden lg:flex items-center justify-center gap-2 lg:gap-4 shrink-0">
          <Link 
            href="/" 
            className="group relative px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-black transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Home
            <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-blue-600 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          
          {/* Services Dropdown Trigger */}
          <div 
            className="relative flex items-center h-full"
            onMouseEnter={() => handleMouseEnter('services')}
          >
            <button 
              onClick={(e) => {
                e.preventDefault();
                // Instead of toggling, we just ensure it's open.
                // This prevents the "open then immediately close" bug on touch devices 
                // where a tap triggers both mouseenter (open) and click (toggle to close).
                setActiveMenu('services');
              }}
              onKeyDown={(e) => handleKeyDownOnTrigger(e, 'services')}
              aria-expanded={activeMenu === 'services'}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors duration-300 font-medium text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
                ${activeMenu === 'services' ? 'text-blue-600' : 'text-gray-700 hover:text-black'}
              `}
            >
              Services
              <motion.div
                animate={{ rotate: activeMenu === 'services' ? 180 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeInOut" }}
              >
                <ChevronDown className={`w-4 h-4 transition-colors ${activeMenu === 'services' ? 'text-blue-600' : 'text-gray-500'}`} />
              </motion.div>
            </button>

            {/* Services Dropdown Overlay */}
            <AnimatePresence>
              {activeMenu === 'services' && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[480px] z-50"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                  role="menu"
                >
                  <div className="pointer-events-auto bg-white border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl flex flex-col overflow-hidden max-h-[calc(100vh-120px)]">
                    <div className="p-3 flex flex-col overflow-y-auto">
                    {servicesList.map((service, idx) => (
                      <Link 
                        href={service.href} 
                        key={idx}
                        onClick={closeMenu}
                        role="menuitem"
                        className="group flex items-start gap-4 p-3 rounded-xl hover:bg-blue-50/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-blue-50/50"
                      >
                        <div className="bg-gray-100 p-2.5 rounded-lg text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-200 shrink-0">
                          <service.icon className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 mt-0.5">
                          <h4 className="text-[15px] font-semibold text-gray-900 mb-0.5 group-hover:text-blue-700 transition-colors duration-200">{service.title}</h4>
                          <p className="text-[13px] text-gray-500 leading-snug pr-4">{service.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Bottom Link */}
                  <div className="bg-[#f8f9fa] p-4 border-t border-gray-100">
                    <Link 
                      href="/services" 
                      onClick={closeMenu}
                      role="menuitem"
                      className="group flex items-center justify-center gap-2 text-[14px] font-semibold text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md p-1"
                    >
                      View All Services
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/#industries" 
            className="group relative px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-black transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 whitespace-nowrap"
          >
            Industries We Serve
            <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-blue-600 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link 
            href="/about" 
            className="group relative px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-black transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 whitespace-nowrap"
          >
            About Us
            <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-blue-600 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link 
            href="/contact" 
            className="group relative px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-black transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Contact
            <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-blue-600 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        </nav>

        {/* Desktop CTA — hidden below lg */}
        <div className="hidden lg:flex items-center justify-end shrink-0">
          <Link 
            href="/contact" 
            className="px-6 py-2.5 bg-blue-600 text-white text-[15px] font-semibold rounded-full hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile Hamburger Button — visible below lg */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative z-[110] flex items-center justify-center w-11 h-11 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </header>
    </div>

    {/* ─── Mobile Menu Overlay ────────────────────────────────────── */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={closeMobileMenu}
          />

          {/* Slide-in Panel */}
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ willChange: 'transform' }}
            className="fixed top-0 right-0 z-[99] w-[min(85vw,380px)] h-full bg-white shadow-2xl lg:hidden flex flex-col overflow-hidden"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between h-[72px] px-5 border-b border-gray-100 shrink-0">
              <span className="text-[13px] font-bold tracking-[0.1em] uppercase text-gray-400">
                Menu
              </span>
              <button
                onClick={closeMobileMenu}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto overscroll-contain px-5 pt-6 pb-8">
              <div className="flex flex-col gap-1">
                {/* Home */}
                <motion.div custom={0} variants={mobileNavItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3.5 text-[16px] font-medium text-gray-800 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Home
                  </Link>
                </motion.div>

                {/* Services Accordion */}
                <motion.div custom={1} variants={mobileNavItemVariants} initial="hidden" animate="visible" exit="exit">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between w-full px-4 py-3.5 text-[16px] font-medium text-gray-800 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    aria-expanded={mobileServicesOpen}
                  >
                    <span>Services</span>
                    <motion.div
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  {/* Services Sub-items — clipPath is GPU-composited, no reflow */}
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
                        animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, transition: { clipPath: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }, opacity: { duration: 0.18 } } }}
                        exit={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0, transition: { clipPath: { duration: 0.2, ease: [0.4, 0, 0.6, 1] }, opacity: { duration: 0.12 } } }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pr-1 py-2 flex flex-col gap-0.5">
                          {servicesList.map((service, idx) => (
                            <Link
                              href={service.href}
                              key={idx}
                              onClick={closeMobileMenu}
                              className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50/60 active:bg-blue-50 transition-colors"
                            >
                              <div className="bg-gray-100 p-2 rounded-lg text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                                <service.icon className="w-4 h-4" strokeWidth={1.75} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[14px] font-semibold text-gray-800 group-hover:text-blue-700 transition-colors block truncate">
                                  {service.title}
                                </span>
                                <span className="text-[12px] text-gray-500 leading-tight block truncate">
                                  {service.desc}
                                </span>
                              </div>
                            </Link>
                          ))}
                          
                          {/* View All Services */}
                          <Link
                            href="/services"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 px-3 py-2.5 mt-1 text-[13px] font-semibold text-blue-600 rounded-lg hover:bg-blue-50/60 transition-colors"
                          >
                            View All Services
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Industries We Serve */}
                <motion.div custom={2} variants={mobileNavItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link
                    href="/#industries"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3.5 text-[16px] font-medium text-gray-800 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Industries We Serve
                  </Link>
                </motion.div>

                {/* About Us */}
                <motion.div custom={3} variants={mobileNavItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3.5 text-[16px] font-medium text-gray-800 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    About Us
                  </Link>
                </motion.div>

                {/* Contact */}
                <motion.div custom={4} variants={mobileNavItemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3.5 text-[16px] font-medium text-gray-800 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-100" />

              {/* Contact Info */}
              <motion.div custom={5} variants={mobileNavItemVariants} initial="hidden" animate="visible" exit="exit">
                <div className="px-4 space-y-3">
                  <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-gray-400 mb-3">
                    Get in Touch
                  </p>
                  <a 
                    href="tel:+918789090210" 
                    className="block text-[14px] text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    +91 87890 90210
                  </a>
                  <a 
                    href="mailto:liveviewinfotech@gmail.com" 
                    className="block text-[14px] text-gray-600 hover:text-blue-600 transition-colors break-all"
                  >
                    liveviewinfotech@gmail.com
                  </a>
                </div>
              </motion.div>
            </nav>

            {/* Bottom CTA */}
            <motion.div
              custom={6}
              variants={mobileNavItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="px-5 py-5 border-t border-gray-100 shrink-0"
            >
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 text-white text-[15px] font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/20"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* Spacer to prevent content from going under fixed nav */}
    <div className="h-[72px] lg:h-[84px] w-full shrink-0" aria-hidden="true" />
    </>
  );
}
