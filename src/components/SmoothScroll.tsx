'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Detects if the current device is ANY type of touch device or mobile/tablet screen.
 * Covers:
 * - Mobile phones (iOS & Android)
 * - Tablets & iPads
 * - Touchscreens and hybrid convertible laptops
 * - Any device with coarse pointer or hover: none
 */
function isTouchOrMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Touch event support
  if ('ontouchstart' in window) return true;

  // 2. Hardware touch points (iPads, Androids, touchscreens)
  if (navigator.maxTouchPoints > 0) return true;
  if ((navigator as unknown as { msMaxTouchPoints?: number }).msMaxTouchPoints && (navigator as unknown as { msMaxTouchPoints: number }).msMaxTouchPoints > 0) return true;

  // 3. Media queries: coarse pointer (finger touch) or no hover
  if (window.matchMedia('(pointer: coarse)').matches) return true;
  if (window.matchMedia('(hover: none)').matches) return true;

  // 4. Viewport size (all phones and portrait/handheld tablets)
  if (window.innerWidth < 1024) return true;

  // 5. User-Agent mobile/tablet pattern check
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(
    navigator.userAgent
  );
  if (isMobileUA) return true;

  return false;
}

/**
 * Validates that the device is strictly a non-touch desktop or laptop
 * with a precision mouse or trackpad.
 */
function shouldEnableSmoothScroll(): boolean {
  if (typeof window === 'undefined') return false;

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  // Strictly exclude ALL touch and mobile devices
  if (isTouchOrMobileDevice()) {
    return false;
  }

  // Must have fine pointer (mouse / precision trackpad) and hover capability
  if (!window.matchMedia('(pointer: fine) and (hover: hover)').matches) {
    return false;
  }

  return true;
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const cleanupLenis = () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (typeof window !== 'undefined') {
        delete (window as unknown as { lenis?: Lenis }).lenis;
        document.documentElement.classList.remove(
          'lenis',
          'lenis-smooth',
          'lenis-stopped',
          'lenis-scrolling'
        );
      }
    };

    const initLenis = () => {
      // If device is touch or mobile, completely ensure Lenis is destroyed
      if (!shouldEnableSmoothScroll()) {
        cleanupLenis();
        return;
      }

      // If already initialized on desktop, keep it running
      if (lenisRef.current) return;

      // Initialize Lenis exclusively for non-touch desktop/laptop
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false, // Absolutely no touch interception
        autoResize: true,
        autoRaf: true,
        anchors: {
          offset: -90, // Clearance for 84px desktop fixed header + spacing
        },
        respectReducedMotion: true,
      });

      lenisRef.current = lenis;

      // Expose to window for external integration or debugging
      if (typeof window !== 'undefined') {
        (window as unknown as { lenis?: Lenis }).lenis = lenis;
      }
    };

    initLenis();

    // Listen to media query changes (e.g., resizing across 1024px or pointer capability changes)
    const desktopMql = window.matchMedia('(min-width: 1024px)');
    const pointerMql = window.matchMedia('(pointer: fine) and (hover: hover)');
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleQueryChange = () => initLenis();
    desktopMql.addEventListener('change', handleQueryChange);
    pointerMql.addEventListener('change', handleQueryChange);
    motionMql.addEventListener('change', handleQueryChange);

    // Debounced resize listener
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initLenis, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      desktopMql.removeEventListener('change', handleQueryChange);
      pointerMql.removeEventListener('change', handleQueryChange);
      motionMql.removeEventListener('change', handleQueryChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      cleanupLenis();
    };
  }, []);

  // Handle route changes smoothly in Next.js App Router
  useEffect(() => {
    if (!lenisRef.current) return;

    // Reset scroll to top on navigation if there is no hash
    if (typeof window !== 'undefined' && !window.location.hash) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Recalculate dimensions for new page layout
    const timer = setTimeout(() => {
      lenisRef.current?.resize();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
