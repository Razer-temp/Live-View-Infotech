"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Industries We Serve", href: "/industries" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <footer className="bg-text-dark text-white relative flex flex-col pt-12 sm:pt-20 overflow-hidden min-h-[auto] sm:min-h-screen justify-end">
      {/* Top / Middle Section Wrapper */}
      <div className="container mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20 lg:mb-32 mt-8 sm:mt-12">

          {/* Left Column - CTA */}
          <div className="flex flex-col items-start justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                Have a site to protect?
                <br />
                <span className="text-gray-400">Let's secure it.</span>
              </h2>
            </div>

            <a
              href="mailto:liveviewinfotech@gmail.com"
              className="group relative inline-flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-24 text-lg sm:text-2xl lg:text-4xl font-medium break-all sm:break-normal"
            >
              liveviewinfotech@gmail.com
              <span className="p-3 lg:p-4 bg-primary text-white rounded-full group-hover:bg-primary-hover transition-colors duration-300 flex-shrink-0">
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 group-hover:rotate-45 transition-transform duration-300" />
              </span>
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Right Column - Navigation & Info */}
          <div className="flex flex-col md:items-end justify-between">

            {/* Quick Links */}
            <div className="flex flex-col md:items-end gap-3 sm:gap-4 text-base sm:text-lg lg:text-xl font-medium mb-8 sm:mb-12">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group overflow-hidden"
                >
                  <span className="inline-block group-hover:-translate-y-full transition-transform duration-300 ease-in-out">
                    {link.name}
                  </span>
                  <span className="absolute left-0 top-0 inline-block translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-primary">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Address */}
            <div className="flex flex-col md:items-end gap-6 text-gray-400">
              <div className="text-left md:text-right mt-4 max-w-sm text-sm lg:text-base space-y-4">
                <div>
                  <p className="font-semibold text-gray-300">Registered Office:</p>
                  <p>Office No. 198, Ara More, Near Matkuria Flyover</p>
                  <p>Dhanbad, Jharkhand 826001</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-300">Branch Office:</p>
                  <p>Shri Ram Plaza, Near Shanti Bhawan, Ground Floor</p>
                  <p>Bank More, Dhanbad, Jharkhand</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-300">Contact:</p>
                  <p>+91 87890 90210</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Static Section */}
      <div className="bg-primary pt-8 relative overflow-hidden flex flex-col justify-end">
        {/* Copyright & Legal */}
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-sm md:text-base text-white/90 font-medium mb-8 lg:mb-12 z-10 relative">
          <p>© 2026 Live View Infotech. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Animated Cut-off Text */}
        <div
          className="relative w-full flex justify-center mt-4 px-[20px] -mb-[2.5vw]"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <h1 className={`text-[14vw] sm:text-[11.5vw] flex justify-center leading-[0.8] select-none whitespace-nowrap text-center w-full uppercase ${anton.className}`}>
            {"LET'S WORK TOGETHER".split("").map((char, index) => {
              const isHovered = hoveredIndex !== null;
              const distance = isHovered ? Math.abs(hoveredIndex - index) : Infinity;

              // Use a bell curve (Gaussian) for perfectly smooth, continuous expansion
              const intensity = isHovered ? Math.exp(-0.25 * distance * distance) : 0;

              const scale = 1 + (0.45 * intensity);
              const y = -25 * intensity;

              return (
                <motion.span
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  animate={{
                    scale: scale,
                    y: y,
                    color: isHovered && distance === 0 ? "#ffffff" : isHovered && distance < 3 ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.4
                  }}
                  className="inline-block origin-bottom cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </h1>
        </div>
      </div>
    </footer>
  );
}
