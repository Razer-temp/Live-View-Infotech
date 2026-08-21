'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

/* ─── Slide data ─────────────────────────────────────────────── */
const heroSlides = [
  {
    src: '/hero-img/hero-img1.png',
    alt: 'Railway platform with CCTV camera on support beam — critical infrastructure surveillance',
    eyebrow: 'Critical Infrastructure',
    subline: 'Eyes on every platform, every hour.',
    // Camera is right-of-center; on mobile crop toward the right
    mobileObjectPosition: '70% center',
    needsStrongGradient: true, // more centered framing
  },
  {
    src: '/hero-img/hero-img2.png',
    alt: 'Office entrance with CCTV dome camera and biometric access reader',
    eyebrow: 'Smart Access Control',
    subline: 'Every entry, verified.',
    // Camera & reader are right-of-center; on mobile keep right side
    mobileObjectPosition: '65% center',
    needsStrongGradient: true, // more centered framing
  },
  {
    src: '/hero-img/hero-img3.png',
    alt: 'High mast lighting pole with DG set and electrical panel at industrial site',
    eyebrow: 'Power & Infrastructure',
    subline: 'Reliable power, engineered to last.',
    // Pole centered, DG/panel on right; open left sky
    mobileObjectPosition: '55% center',
    needsStrongGradient: false,
  },
  {
    src: '/hero-img/hero-img4.png',
    alt: 'Boom barrier with surveillance camera at controlled access gate',
    eyebrow: 'Controlled Access',
    subline: 'Know who enters, every time.',
    // Barrier is centered; hedge/sky on the left is open space
    mobileObjectPosition: '45% center',
    needsStrongGradient: false,
  },
  {
    src: '/hero-img/Hero-img5.png',
    alt: 'Fire suppression piping, panel and extinguisher in commercial facility',
    eyebrow: 'Fire Safety',
    subline: 'Early warning. Real protection.',
    // Fire equipment on the right wall; open space on left
    mobileObjectPosition: '60% center',
    needsStrongGradient: false,
  },
  {
    src: '/hero-img/hero-img6.png',
    alt: 'Solar-powered street light at industrial area',
    eyebrow: 'Sustainable Infrastructure',
    subline: 'Power where the grid doesn\u2019t reach.',
    // Solar pole is right-of-center
    mobileObjectPosition: '60% center',
    needsStrongGradient: false,
  },
];

const SLIDE_DURATION = 5500; // ms — 6 slides × 5.5s ≈ 33s full loop
const CROSSFADE_DURATION = 1.2; // seconds for image cross-fade
const TEXT_FADE_DURATION = 0.4; // seconds for text fade in/out

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const currentIndexRef = useRef(0);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedSlide, setDisplayedSlide] = useState(heroSlides[0]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  /* ─── Detect reduced-motion preference ─────────────────────── */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  /* ─── Initial entrance animation (runs once on mount) ──────── */
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate static elements with stagger
        gsap.to('.hero-static-element', {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });

        // Animate the first rotating text container
        gsap.to('.hero-rotating-text', {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.2,
        });

        // Animate the text inside staggeringly
        gsap.to(['.hero-rotating-eyebrow', '.hero-rotating-subline'], {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.4,
        });

        // Animate the dot indicators up
        gsap.to('.hero-dot-indicator', {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.8,
        });
      }, containerRef);

      setHasLoaded(true);

      // Ken Burns on the first image
      if (!prefersReducedMotion) {
        const firstImage = imageRefs.current[0];
        if (firstImage) {
          gsap.fromTo(
            firstImage.querySelector('img'),
            { scale: 1 },
            { scale: 1.08, duration: SLIDE_DURATION / 1000, ease: 'none' }
          );
        }
      }

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Transition to a specific slide ───────────────────────── */
  const transitionToSlide = useCallback(
    (nextIndex: number) => {
      if (isTransitioning.current) return;
      const currentIdx = currentIndexRef.current;
      if (nextIndex === currentIdx) return;

      isTransitioning.current = true;

      const prevImageEl = imageRefs.current[currentIdx];
      const nextImageEl = imageRefs.current[nextIndex];
      const textEl = textRef.current;

      if (!prevImageEl || !nextImageEl || !textEl) {
        isTransitioning.current = false;
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioning.current = false;
        },
      });

      // 1. Fade out the rotating sub-headline text (staggered)
      tl.to(['.hero-rotating-eyebrow', '.hero-rotating-subline'], {
        opacity: 0,
        y: -10,
        duration: TEXT_FADE_DURATION,
        stagger: 0.05,
        ease: 'power2.in',
      });

      // 2. Update the displayed text + active dot (happens mid-timeline via callback)
      tl.call(() => {
        setDisplayedSlide(heroSlides[nextIndex]);
        currentIndexRef.current = nextIndex;
        setCurrentIndex(nextIndex);

        // Reset position for next entry to ensure it comes from the bottom again
        gsap.set(['.hero-rotating-eyebrow', '.hero-rotating-subline'], { y: 15 });
      });

      // 3. Cross-fade images
      tl.to(
        prevImageEl,
        {
          opacity: 0,
          duration: CROSSFADE_DURATION,
          ease: 'power2.inOut',
        },
        `-=${TEXT_FADE_DURATION * 0.15}`
      );
      tl.to(
        nextImageEl,
        {
          opacity: 1,
          duration: CROSSFADE_DURATION,
          ease: 'power2.inOut',
        },
        '<' // same start time as prev fade-out
      );

      // 4. Fade in the new sub-headline text (staggered)
      tl.to(
        ['.hero-rotating-eyebrow', '.hero-rotating-subline'],
        {
          opacity: 1,
          y: 0,
          duration: TEXT_FADE_DURATION + 0.2,
          stagger: 0.1,
          ease: 'power3.out',
        },
        `-=${CROSSFADE_DURATION * 0.3}`
      );

      // 5. Ken Burns zoom on the new image
      if (!prefersReducedMotion) {
        tl.fromTo(
          nextImageEl.querySelector('img'),
          { scale: 1 },
          {
            scale: 1.08,
            duration: SLIDE_DURATION / 1000,
            ease: 'none',
          },
          `-=${TEXT_FADE_DURATION + 0.1}`
        );
      }
    },
    [prefersReducedMotion]
  );

  /* ─── Autoplay management ──────────────────────────────────── */
  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      const next = (currentIndexRef.current + 1) % heroSlides.length;
      transitionToSlide(next);
    }, SLIDE_DURATION);
  }, [transitionToSlide]);

  const resetAutoplay = useCallback(() => {
    // Clear existing timer and restart — ensures a full SLIDE_DURATION before next auto-advance
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    if (prefersReducedMotion || !hasLoaded) return;
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [prefersReducedMotion, hasLoaded, startAutoplay]);

  /* ─── Handle dot click ─────────────────────────────────────── */
  const handleDotClick = useCallback(
    (index: number) => {
      transitionToSlide(index);
      resetAutoplay(); // restart timer so it doesn't fire mid-transition
    },
    [transitionToSlide, resetAutoplay]
  );

  return (
    <section
      ref={containerRef}
      className="hero-section relative w-full h-[75vh] sm:h-[80vh] md:h-[calc(100vh-72px)] lg:h-[calc(100vh-84px)] min-h-[480px] sm:min-h-[550px] flex items-end md:items-center overflow-hidden bg-[#0e1015]"
      aria-label="Hero banner"
    >
      {/* ── Background Images ──────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 hero-slide-image"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="hero-carousel-img object-cover"
              sizes="100vw"
              style={{
                objectPosition: slide.mobileObjectPosition,
              }}
            />
          </div>
        ))}

        {/* Left-heavy gradient for text readability — stronger for centered images */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              displayedSlide.needsStrongGradient
                ? 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 45%, transparent 65%)'
                : 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.1) 100%)',
            transition: 'background 0.8s ease',
          }}
        />

        {/* Mobile: stronger bottom gradient so text over image is readable */}
        <div
          className="absolute inset-0 z-10 md:hidden"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)',
          }}
        />

        {/* Bottom vignette */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 45%)',
          }}
        />
      </div>

      {/* ── Foreground Content ─────────────────────────────── */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 pb-14 md:pb-0">
        <div className="max-w-[650px] text-left">
          {/* Rotating eyebrow + sub-line */}
          <div
            ref={textRef}
            className="hero-rotating-text mb-4 sm:mb-8 p-3.5 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] inline-block relative overflow-hidden group"
            style={{ opacity: 0 }}
          >
            {/* Subtle animated gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 hero-rotating-eyebrow" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              <span className="block w-[4px] h-[18px] bg-primary rounded-full shrink-0 shadow-[0_0_12px_rgba(9,93,168,0.8)]" />
              <span className="text-[11px] sm:text-[13px] md:text-[14px] font-bold tracking-[0.1em] sm:tracking-[0.12em] uppercase text-white drop-shadow-md">
                {displayedSlide.eyebrow}
              </span>
            </div>
            <p className="relative z-10 text-[14px] sm:text-[18px] md:text-[22px] font-medium text-white leading-snug drop-shadow-lg hero-rotating-subline" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              {displayedSlide.subline}
            </p>
          </div>

          {/* Static headline */}
          <h1
            className="hero-static-element text-[26px] sm:text-[36px] md:text-[52px] lg:text-[58px] font-bold text-white leading-[1.1] tracking-tight mb-4 sm:mb-6 drop-shadow-lg"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Securing Today,
            <br />
            Safeguarding Tomorrow
          </h1>

          {/* Static CTA button */}
          <Link
            href="/contact"
            className="hero-static-element inline-flex items-center justify-center gap-2 bg-primary text-white px-6 sm:px-8 py-3 sm:py-3.5 text-[14px] sm:text-[15px] md:text-[16px] font-semibold rounded-full hover:bg-primary-hover active:bg-primary-hover hover:-translate-y-[1px] hover:shadow-lg transition-all duration-200"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Get a Free Quote
            <ArrowRight size={18} strokeWidth={2} className="ml-1" />
          </Link>
        </div>
      </div>

      {/* ── Slide Indicator Dots (clickable) ────────────────── */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDotClick(index)}
            className={`hero-dot-indicator block rounded-full transition-all duration-500 ease-in-out cursor-pointer ${
              index === currentIndex
                ? 'w-7 h-[5px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                : 'w-[5px] h-[5px] bg-white/40 hover:bg-white/70'
            }`}
            style={{ opacity: 0, transform: 'translateY(10px)' }}
            aria-label={`Go to slide ${index + 1}${index === currentIndex ? ' (active)' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
