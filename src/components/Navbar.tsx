'use client';

import { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  ArrowRight
} from 'lucide-react';

const servicesList = [
  {
    title: 'CCTV Surveillance',
    desc: 'IP, PTZ, thermal, and ANPR camera systems for any environment',
    icon: Video,
  },
  {
    title: 'Access Control & Biometric',
    desc: 'Biometric readers, RFID, and complete entry management',
    icon: Fingerprint,
  },
  {
    title: 'Entrance Security',
    desc: 'Boom barriers, turnstiles, and vehicle access systems',
    icon: ShieldCheck,
  },
  {
    title: 'Fire Alarm & Fire Fighting',
    desc: 'Detection, alarm, and suppression systems',
    icon: Flame,
  },
  {
    title: 'Security Screening Equipment',
    desc: 'Baggage scanners, DFMD, HHMD, and inspection systems',
    icon: Scan,
  },
  {
    title: 'Networking',
    desc: 'Structured cabling and network infrastructure',
    icon: Network,
  },
  {
    title: 'ELV & BMS',
    desc: 'Building management, EPABX, and AV systems',
    icon: Building2,
  },
  {
    title: 'Installation & AMC',
    desc: 'Setup, commissioning, and ongoing maintenance support',
    icon: Wrench,
  },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
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
        // Optionally return focus to trigger if needed
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

  const dropdownVariants = {
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
      <header className="max-w-[1140px] w-full mx-auto flex items-center justify-between h-[84px] px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex-1 flex items-center justify-start shrink-0">
          <Link href="/" className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md">
            <Image
              src="/Logo.png"
              alt="Live View Infotech"
              width={260}
              height={76}
              priority
              className="h-[64px] lg:h-[72px] w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-2 lg:gap-4 shrink-0">
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
              onClick={() => toggleMenu('services')}
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
                  className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 pointer-events-auto bg-white border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl w-[480px] overflow-hidden flex flex-col"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                  role="menu"
                >
                  <div className="p-3 flex flex-col">
                    {servicesList.map((service, idx) => (
                      <Link 
                        href="#" 
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
                      href="#" 
                      onClick={closeMenu}
                      role="menuitem"
                      className="group flex items-center justify-center gap-2 text-[14px] font-semibold text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md p-1"
                    >
                      View All Services
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="#" 
            className="group relative px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-black transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 whitespace-nowrap"
          >
            Industries We Serve
            <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-blue-600 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link 
            href="#" 
            className="group relative px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-black transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 whitespace-nowrap"
          >
            About Us
            <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-blue-600 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
          <Link 
            href="#" 
            className="group relative px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-black transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Contact
            <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-blue-600 origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Link>
        </nav>

        {/* Right Action */}
        <div className="flex-1 flex items-center justify-end shrink-0">
          <Link 
            href="#" 
            className="px-6 py-2.5 bg-blue-600 text-white text-[15px] font-semibold rounded-full hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
          >
            Get a Free Quote
          </Link>
        </div>
      </header>
    </div>
    <div className="h-[84px] w-full shrink-0" aria-hidden="true" />
    </>
  );
}
