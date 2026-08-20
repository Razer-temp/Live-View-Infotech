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
    <section className="w-full py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div 
            className="flex flex-col max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#095DA8] rounded-full" />
              <span className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#095DA8]">
                About Company
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-normal text-gray-900 leading-[1.15] tracking-tight mb-6"
            >
              Technology That Protects
            </motion.h2>

            {/* Paragraph */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-10 leading-relaxed"
            >
              Live View Infotech is a technology partner for organizations that need reliable, integrated security — CCTV, access control, fire safety, and the networking infrastructure behind it all, delivered by one team from design through installation and ongoing support.
            </motion.p>

            {/* 2x2 Icon Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12"
            >
              {checkListItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#095DA8]/5 flex items-center justify-center border border-[#095DA8]/10 text-[#095DA8]">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-[16px] leading-snug">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div variants={itemVariants}>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#09152e] hover:bg-[#0a1c3d] text-white rounded-full font-medium transition-all duration-300 group"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-[450px] sm:h-[550px] lg:h-[650px] rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(9,93,168,0.1)] border border-[#095DA8]/20 group"
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
