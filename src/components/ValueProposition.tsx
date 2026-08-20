"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface WordProps {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  isLead?: boolean;
}

const Word: React.FC<WordProps> = ({ children, range, progress, isLead }) => {
  // Smoothly interpolate opacity from ghost state (0.15) to full active illumination (1)
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.28em] last:mr-0 ${
        isLead ? 'font-extrabold text-[#09152e]' : 'font-normal text-[#4b5563]'
      }`}
    >
      {children}
    </motion.span>
  );
};

export default function ValueProposition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.9", "end 0.4"]
  });

  const leadText = "More than a camera installer.";
  const bodyText = "Built to secure everything from commercial buildings and hospitality spaces to industrial plants, railways, airports, and government infrastructure. One team, every layer of protection.";

  const leadWords = leadText.split(" ");
  const bodyWords = bodyText.split(" ");

  const totalWords = leadWords.length + bodyWords.length;
  const step = 1 / totalWords;

  return (
    <section 
      id="services"
      ref={containerRef}
      className="scroll-mt-20 lg:scroll-mt-24 w-full bg-white text-[#111827] py-28 sm:py-36 md:py-48 px-6 sm:px-10 lg:px-16 border-b border-gray-100 flex justify-center relative overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Subtle Brand Accent Tag */}
        <div className="flex items-center gap-3 mb-8 md:mb-12">
          <span className="w-8 h-[2px] bg-primary rounded-full" />
          <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.15em] uppercase text-primary">
            Integrated Security Ecosystems
          </span>
        </div>

        {/* ── Main Typography Statement with Apple-Style Scroll Fill ── */}
        <h2 
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-[-0.03em] leading-[1.28] sm:leading-[1.22] md:leading-[1.16] text-left select-none"
        >
          
          {/* Bold Lead-in */}
          <span className="inline mr-2">
            {leadWords.map((word, idx) => {
              const start = idx * step;
              // Wider overlap for smoother transition
              const end = Math.min(1, start + step * 3);
              return (
                <Word 
                  key={`lead-${idx}`} 
                  progress={scrollYProgress} 
                  range={[start, end]} 
                  isLead={true}
                >
                  {word}
                </Word>
              );
            })}
          </span>

          {/* Gray Continuation */}
          <span className="inline">
            {bodyWords.map((word, idx) => {
              const overallIdx = leadWords.length + idx;
              const start = overallIdx * step;
              // Wider overlap for smoother transition
              const end = Math.min(1, start + step * 3);
              return (
                <Word 
                  key={`body-${idx}`} 
                  progress={scrollYProgress} 
                  range={[start, end]} 
                  isLead={false}
                >
                  {word}
                </Word>
              );
            })}
          </span>

        </h2>

      </div>
    </section>
  );
}
