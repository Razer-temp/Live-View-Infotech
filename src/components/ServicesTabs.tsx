"use client";

import React, { useState } from 'react';
import {
  Building2,
  Landmark,
  Factory,
  TrainFront,
  Hotel,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const solutions = [
  {
    id: 1,
    icon: Building2,
    title: "Commercial Buildings",
    subtitle: "Offices · Retail · Business Complexes",
    description:
      "Offices, retail spaces, and business complexes need reliable entry control and round-the-clock camera coverage that doesn't get in the way of daily operations.",
    details:
      "We design systems that blend into your workspace — discreet dome cameras, seamless card or biometric access, and centralized monitoring dashboards that give facility managers full visibility without cluttering lobbies or disrupting workflow.",
    features: [
      "IP CCTV with remote monitoring & playback",
      "Biometric & card-based access control",
      "Visitor management systems",
      "Centralized security operations centre",
    ],
    top: "26.9%",
    left: "64.5%",
  },
  {
    id: 2,
    icon: Landmark,
    title: "Government & PSU",
    subtitle: "Government Offices · Public Sector · Compliance-Ready",
    description:
      "Government offices and public sector organizations need secure, well-documented installations built to a higher compliance standard.",
    details:
      "From CPWD-spec installations to tamper-proof recording with audit trails, we deliver projects that meet regulatory expectations — backed by proper documentation, tested hardware, and certified execution.",
    features: [
      "CPWD & government-spec compliant installations",
      "Tamper-proof NVRs with encrypted storage",
      "PA & emergency notification systems",
      "Complete project documentation & AMC support",
    ],
    top: "49.9%",
    left: "46.6%",
  },
  {
    id: 3,
    icon: Factory,
    title: "Industrial & Power Plants",
    subtitle: "Factories · Energy Sites · Perimeter Security",
    description:
      "Large facilities and energy sites need rugged, wide-area coverage — perimeter cameras, access control at every gate, and fire detection built for industrial conditions.",
    details:
      "Our industrial-grade solutions are engineered for harsh environments: dust, heat, vibration. Thermal cameras monitor hotspots before they become hazards, while integrated fire alarm systems provide early detection and automated response.",
    features: [
      "Rugged PTZ & thermal perimeter cameras",
      "Multi-gate access control with anti-passback",
      "Industrial fire alarm & suppression integration",
      "Explosion-proof & weather-rated enclosures",
    ],
    top: "32%",
    left: "85%",
  },
  {
    id: 4,
    icon: TrainFront,
    title: "Railways & Metro",
    subtitle: "Stations · Platforms · Transit Corridors",
    description:
      "High-footfall transit spaces depend on dependable surveillance and public address systems that keep platforms and stations covered at all hours.",
    details:
      "We deploy wide-angle, low-light cameras across platforms, entry/exit points, and parking areas — connected to centralized command centres. PA systems ensure clear announcements reach every corner, even in noisy environments.",
    features: [
      "Platform-wide HD surveillance with analytics",
      "Public address & voice alarm systems",
      "Real-time video feeds to control rooms",
      "Vandal-proof & weather-resistant hardware",
    ],
    top: "46%",
    left: "23%",
  },

  {
    id: 6,
    icon: Hotel,
    title: "Hospitality",
    subtitle: "Hotels · Resorts · Guest-Facing Properties",
    description:
      "Hotels and guest-facing properties need discreet, reliable security that protects guests and staff without disrupting the experience.",
    details:
      "We install aesthetically matched cameras in lobbies, corridors, and back-of-house areas. Smart door locks, elevator access control, and panic alert systems are designed to protect — while staying invisible to the guest experience.",
    features: [
      "Discreet dome cameras in public areas",
      "Smart lock & elevator access integration",
      "Staff panic alert & duress systems",
      "Lobby & car park ANPR monitoring",
    ],
    top: "76.5%",
    left: "69.5%",
  },
];

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState(solutions[0]);

  return (
    <section id="industries" className="w-full flex flex-col md:flex-row min-h-[650px] overflow-hidden">
      {/* Left side: Image and Interactive Icons */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-[#09152e] overflow-hidden touch-manipulation select-none">
        {/* Inner wrapper that maintains the exact aspect ratio of the image AND scales to cover the parent */}
        <div 
          className="relative shrink-0 min-w-full min-h-full"
          style={{ aspectRatio: "1335 / 1178" }}
        >
          <Image
            src="/section-secter-img.png"
            alt="Aerial city view with security monitoring points"
            fill
            className="object-cover pointer-events-none"
            priority
          />
          {/* Darken overlay for better icon contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/15 to-black/25 pointer-events-none"></div>

        {/* Interactive Hotspots */}
        {solutions.map((solution) => {
          const Icon = solution.icon;
          const isActive = activeTab.id === solution.id;

          return (
            <button
              type="button"
              key={solution.id}
              onClick={() => setActiveTab(solution)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group outline-none cursor-pointer touch-manipulation"
              style={{ top: solution.top, left: solution.left }}
              aria-label={`View ${solution.title}`}
            >
              <div className="relative flex items-center justify-center">
                {/* Outer pulse ring for active state */}
                {isActive && (
                  <>
                    <span className="absolute inline-flex h-[72px] w-[72px] animate-ping rounded-full bg-white/30 duration-1000"></span>
                    <span className="absolute inline-flex h-[64px] w-[64px] rounded-full bg-white/10 animate-pulse"></span>
                  </>
                )}

                {/* Icon Circle */}
                <div
                  className={`
                    relative flex items-center justify-center rounded-full transition-all duration-300 shadow-lg
                    ${isActive
                      ? 'w-[56px] h-[56px] bg-white border-[3px] border-primary shadow-[0_0_24px_rgba(9,93,168,0.6)] scale-110'
                      : 'w-[44px] h-[44px] bg-white/90 border-2 border-white/60 hover:bg-white hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] backdrop-blur-sm'
                    }
                  `}
                >
                  <Icon
                    size={isActive ? 26 : 20}
                    className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-primary/80 group-hover:text-primary'}`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </div>

                {/* Floating label on hover / active */}
                <div
                  className={`
                    absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                    px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide
                    transition-all duration-300 pointer-events-none
                    ${isActive
                      ? 'opacity-100 translate-y-0 bg-white text-primary shadow-lg'
                      : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 bg-white/90 text-gray-800 shadow-md'
                    }
                  `}
                >
                  {solution.title}
                </div>
              </div>
            </button>
          );
        })}
        </div>
      </div>

      {/* Right side: Content */}
      <div className="w-full md:w-1/2 bg-primary p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center min-h-[550px]">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Subtitle tag */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="w-6 h-[2px] bg-white/50 rounded-full" />
                <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase text-blue-200">
                  {activeTab.subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
                {activeTab.title}
              </h2>

              {/* Description paragraphs */}
              <div className="space-y-4 text-blue-50/90 text-[15px] sm:text-base leading-relaxed mb-6">
                <p>{activeTab.description}</p>
                <p>{activeTab.details}</p>
              </div>

              {/* Features list */}
              <ul className="space-y-2.5 mb-2">
                {activeTab.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.06 }}
                    className="flex items-start gap-2.5 text-white/90 text-[14px] sm:text-[15px]"
                  >
                    <CheckCircle2 className="w-[18px] h-[18px] text-blue-300 mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Static bottom content */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="font-medium text-white/80 mb-5 text-[14px] sm:text-[15px]">
              Click an icon to explore the industries we serve.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="px-7 py-3 rounded-full bg-white text-primary font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center gap-2 text-[14px] sm:text-[15px] shadow-lg shadow-black/10">
                All Solutions
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
              <button className="px-7 py-3 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-[14px] sm:text-[15px]">
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
