"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin, Phone, FileText, ArrowRight } from "lucide-react";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const servicesList = [
  { name: "CCTV Surveillance", href: "/services#cctv-surveillance" },
  { name: "Access Control & Biometric", href: "/services#access-control-biometric" },
  { name: "Fire Alarm & Fire Fighting", href: "/services#fire-alarm-fire-fighting" },
  { name: "Networking & ELV Systems", href: "/services#networking" },
  { name: "Industrial Electrical Solutions", href: "/services#industrial-electrical" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Industries We Serve", href: "/industries" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const workTogetherRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: workTogetherRef,
    offset: ["start end", "end end"]
  });

  // Scroll-linked parallax effect: 
  // Moves the text down relative to its container as the page scrolls up, 
  // creating the illusion that the text is fixed in place and being revealed.
  const textY = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  return (
    <footer className="bg-text-dark text-white relative flex flex-col pt-12 sm:pt-20 min-h-[auto] sm:min-h-screen justify-end">
      {/* Section 1 - CTA Banner */}
      <div className="container mx-auto px-6 lg:px-12 flex-1 flex flex-col max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16 sm:mb-24 mt-6 sm:mt-10">

          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300 font-medium mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Fast Turnaround · Certified Technical Team
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-5 leading-[1.15]">
                Have a site to protect? <br />
                <span className="text-gray-400">Let's secure it.</span>
              </h2>

              <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed">
                Connect with our experts for turnkey CCTV surveillance, biometric access control, fire safety, and electrical solutions tailored to your site.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 group shadow-lg shadow-primary/20 hover:scale-[1.02] text-sm sm:text-base"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="mailto:liveviewinfotech@gmail.com"
                className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white transition-all duration-300 text-sm sm:text-base font-medium backdrop-blur-sm"
              >
                <span className="relative">
                  liveviewinfotech@gmail.com
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
                <span className="p-1 rounded-full bg-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Full-Height Glassmorphic Location Card */}
          <div className="lg:col-span-5 w-full flex flex-col">
            <div className="w-full h-full flex flex-col justify-between bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl transition-all duration-300 min-h-[300px] lg:min-h-[340px]">

              {/* Card Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-200">Registered HQ · Dhanbad</span>
                </div>

                <a
                  href="https://maps.app.goo.gl/9R684JqF2xZ6283R7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:text-white inline-flex items-center gap-1 transition-colors group px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary"
                >
                  <span>Open Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Map View Frame - Flexible & Generous Height */}
              <div className="flex-1 w-full min-h-[220px] sm:min-h-[240px] rounded-2xl overflow-hidden relative border border-white/10 bg-gray-900 shadow-inner my-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6583839316563!2d86.40495197593665!3d23.795176278639925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6bd6e4a1b9d91%3A0x3cd4ba0af1c78a7f!2sLIVE%20VIEW%20INFOTECH!5e0!3m2!1sen!2sin!4v1787293632446!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>

              {/* Card Footer info */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400 px-1">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">Office No. 198, Ara More, Near Matkuria Flyover</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Section 2 - 4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 pt-12 border-t border-white/10">

          {/* Column 1 - Company */}
          <div className="flex flex-col items-start">
            <div className="relative w-56 sm:w-64 h-16 sm:h-20 mb-6">
              <Image src="/Logo.png" alt="Live View Infotech" fill className="object-contain object-left brightness-0 invert opacity-90" />
            </div>
            <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed font-medium">
              Complete security, fire safety, and electrical solutions — end to end.
            </p>
            <div className="inline-block px-3 py-1.5 border border-white/20 rounded-md bg-white/5 text-xs text-gray-300 mb-6 font-medium">
              MSME Registered · UDYAM-JH-04-0055124
            </div>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/918789090210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2.5 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors duration-300 text-gray-300 group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.029 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2.5 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors duration-300 text-gray-300 group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Services */}
          <div className="flex flex-col items-start lg:pl-8">
            <h3 className="text-lg font-semibold mb-6 text-white uppercase tracking-wider text-sm">Services</h3>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {servicesList.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base relative group inline-block w-fit">
                    <span className="inline-block group-hover:-translate-y-0.5 transition-transform">{link.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div className="flex flex-col items-start lg:pl-4">
            <h3 className="text-lg font-semibold mb-6 text-white uppercase tracking-wider text-sm">Company</h3>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base relative group inline-flex items-center gap-2 w-fit">
                    <span className="inline-block group-hover:-translate-y-0.5 transition-transform">{link.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Get in Touch */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-6 text-white uppercase tracking-wider text-sm">Get in Touch</h3>
            <div className="flex flex-col gap-6 text-sm sm:text-base text-gray-400">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-300 mb-1">Registered Office:</p>
                  <p>Office No. 198, Ara More, Near Matkuria Flyover</p>
                  <p>Dhanbad, Jharkhand 826001</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-300 mb-1">Branch Office:</p>
                  <p>Shri Ram Plaza, Near Shanti Bhawan, Ground Floor</p>
                  <p>Bank More, Dhanbad, Jharkhand</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-1 group">
                <Phone className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                <div>
                  <p>+91 87890 90210</p>
                  <a href="mailto:liveviewinfotech@gmail.com" className="hover:text-white transition-colors inline-block mt-1">liveviewinfotech@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Animated Let's Work Together Strip */}
      <div ref={workTogetherRef} className="bg-primary pt-20 sm:pt-28 lg:pt-32 relative overflow-hidden flex flex-col justify-end">
        {/* Rounded overlay for smooth transition from dark section */}
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-text-dark rounded-b-[40px] z-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" />

        {/* Scroll-linked parallax reveal wrapper */}
        <motion.div
          style={{ y: textY }}
          initial={{ zIndex: 0 }}
          animate={{ zIndex: hoveredIndex !== null ? 30 : 0 }}
          transition={{ zIndex: { delay: hoveredIndex !== null ? 0 : 0.5 } }}
          className="relative w-full flex justify-center px-[20px] -mb-[2.5vw]"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <h1 className={`text-[14vw] sm:text-[11.5vw] flex justify-center leading-[0.8] select-none whitespace-nowrap text-center w-full uppercase ${anton.className}`}>
            {"LET'S WORK TOGETHER".split("").map((char, index) => {
              const isHovered = hoveredIndex !== null;
              const distance = isHovered ? Math.abs(hoveredIndex - index) : Infinity;

              // Gaussian curve for smooth wave
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
                  transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.4 }}
                  className="inline-block origin-bottom cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </h1>
        </motion.div>
      </div>

      {/* Section 4 - Bottom Bar */}
      <div className="bg-text-dark py-4 lg:py-5 z-20 relative shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400 font-medium">
          <p>© 2026 Live View Infotech. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
