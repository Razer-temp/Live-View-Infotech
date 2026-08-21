"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Wrench, PhoneCall, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const checkListItems = [
  {
    id: 1,
    title: "Professional Project Execution",
    icon: <ShieldCheck className="w-6 h-6 text-[#095DA8]" />,
  },
  {
    id: 2,
    title: "Genuine, Certified Brands",
    icon: <BadgeCheck className="w-6 h-6 text-[#095DA8]" />,
  },
  {
    id: 3,
    title: "Supply, Installation & Commissioning",
    icon: <Wrench className="w-6 h-6 text-[#095DA8]" />,
  },
  {
    id: 4,
    title: "Technical Support & AMC",
    icon: <PhoneCall className="w-6 h-6 text-[#095DA8]" />,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7 }
  }
};

export default function AboutSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-24 items-start lg:items-center">
          
          {/* Left Column - Text Content */}
          <motion.div 
            className="flex flex-col max-w-2xl w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="w-6 sm:w-8 h-[2px] bg-[#095DA8] rounded-full" />
              <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.15em] uppercase text-[#095DA8]">
                About Company
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 leading-[1.2] lg:leading-[1.15] tracking-tight mb-6 lg:mb-8"
            >
              Technology That Protects
            </motion.h2>

            {/* MOBILE IMAGE - Visible only on mobile/tablet (< 1024px) */}
            <motion.div 
              variants={itemVariants}
              className="lg:hidden w-full relative aspect-[4/5] sm:aspect-square rounded-[1.5rem] overflow-hidden mb-6 sm:mb-8 shadow-[0_0_30px_rgba(9,93,168,0.15)] border border-[#095DA8]/15 group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#095DA8]/10 to-transparent z-10 pointer-events-none mix-blend-overlay" />
              <Image 
                src="/img-about-sec.png" 
                alt="Security Infrastructure and Technology" 
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Paragraph */}
            <motion.p 
              variants={itemVariants}
              className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 leading-[1.6] lg:leading-relaxed"
            >
              Live View Infotech is a proudly Indian, MSME-registered technology partner for organizations that need reliable, integrated security — CCTV, access control, fire safety, and the networking infrastructure behind it all. Delivered by one team, from design through installation and ongoing support, with the capability to serve clients across India.
            </motion.p>

            {/* Trust Badge */}
            <motion.div variants={itemVariants} className="mb-8 lg:mb-10 w-full flex">
              <div className="relative inline-flex items-center justify-center w-full sm:w-auto px-5 py-3.5 sm:py-2.5 bg-slate-50 border border-slate-200 shadow-sm rounded-xl sm:rounded-full overflow-hidden">
                {/* Bottom Tricolor Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                   <div className="flex-1 bg-[#FF9933]" />
                   <div className="flex-1 bg-white" />
                   <div className="flex-1 bg-[#138808]" />
                </div>
                
                <div className="text-[13px] sm:text-[14px] font-medium text-slate-700 text-center flex flex-wrap justify-center items-center gap-x-1.5 gap-y-1">
                  <span>🇮🇳 Proudly Indian-Owned</span>
                  <span className="hidden sm:inline text-slate-300">&bull;</span>
                  <span>MSME Registered</span>
                  <span className="hidden sm:inline text-slate-300">&bull;</span>
                  <span>UDYAM-JH-04-0055124</span>
                </div>
              </div>
            </motion.div>

            {/* 2x2 Icon Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12"
            >
              {checkListItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants} className="flex flex-col gap-2.5 sm:gap-3 items-center min-[480px]:items-start text-center min-[480px]:text-left">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#095DA8]/5 flex items-center justify-center border border-[#095DA8]/10 text-[#095DA8]">
                    <div className="scale-75 sm:scale-100 flex items-center justify-center">{item.icon}</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-[14px] sm:text-[16px] leading-snug">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div variants={itemVariants} className="w-full sm:w-auto flex justify-center sm:justify-start">
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 sm:py-4 min-h-[44px] bg-[#09152e] hover:bg-[#0a1c3d] text-white rounded-full font-medium transition-all duration-300 group"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - DESKTOP Image */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative w-full h-[550px] lg:h-[650px] rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(9,93,168,0.1)] border border-[#095DA8]/20 group"
          >
            {/* Subtle blue glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#095DA8]/10 to-transparent z-10 pointer-events-none mix-blend-overlay" />
            
            {/* Image */}
            <Image 
              src="/img-about-sec.png" 
              alt="Security Infrastructure and Technology" 
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
