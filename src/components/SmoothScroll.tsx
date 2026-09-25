'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface DeviceProfile {
  isTouch: boolean;
  isLowEnd: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Analyzes device capabilities (CPU cores, RAM, touch vs mouse, viewport)
 * to tailor the smoothest possible scroll experience without frame drops.
 */
function getDeviceProfile(): DeviceProfile {
  if (typeof window === 'undefined') {
    return {
      isTouch: false,
      isLowEnd: false,
      isMobile: false,
      prefersReducedMotion: false,
    };
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 1024;
  const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

  // Modern device capability heuristics (hardware concurrency and RAM)
  const nav = navigator as unknown as { hardwareConcurrency?: number; deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  // Low-end classification: budget CPUs (<= 4 cores) or constrained memory (< 4GB)
  const isLowEnd = cores <= 4 || memory < 4;

  return {
    isTouch,
    isLowEnd,
    isMobile,
    prefersReducedMotion,
  };
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const initLenis = () => {
      const profile = getDeviceProfile();

      // If user explicitly configured reduced motion in their OS, disable smoothing
      if (profile.prefersReducedMotion) {
        if (lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
          document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling');
        }
        return;
      }

      // Responsive navbar clearance
      const navOffset = profile.isMobile ? -78 : -90;

      // Clean up any existing instance before re-configuring
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // ────────────────────────────────────────────────────────────────────────
      // Hardware-Adaptive Configuration
      // ────────────────────────────────────────────────────────────────────────
      if (!profile.isTouch) {
        // ── Desktop / Laptop (Mouse & Precision Trackpad) ──
        // Exponential decay easing for silky, luxurious momentum glide
        lenisRef.current = new Lenis({
          duration: profile.isLowEnd ? 0.9 : 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.0,
          syncTouch: false,
          autoResize: true,
          autoRaf: true,
          anchors: {
            offset: navOffset,
          },
          respectReducedMotion: true,
        });
      } else if (!profile.isLowEnd) {
        // ── High-End Mobile / Tablet (e.g. iPhone Pro, iPad, flagship Android) ──
        // Synchronized touch momentum with gentle inertia
        lenisRef.current = new Lenis({
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          syncTouch: true,
          syncTouchLerp: 0.08,
          touchInertiaExponent: 1.5,
          touchMultiplier: 1.0,
          autoResize: true,
          autoRaf: true,
          anchors: {
            offset: navOffset,
          },
          respectReducedMotion: true,
        });
      } else {
        // ── Low-End / Budget Mobile Device ──
        // Keep direct-touch 100% native (zero lag behind finger),
        // but provide butter-smooth programmatic anchor jumps and wheel smoothing
        lenisRef.current = new Lenis({
          duration: 0.8,
          lerp: 0.14, // Snappier lerp to minimize frame overhead on budget CPUs
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          syncTouch: false, // Prevents touch lag/stutter on weak MediaTek/Snapdragon budget chips
          touchMultiplier: 1.0,
          autoResize: true,
          autoRaf: true,
          anchors: {
            offset: navOffset,
          },
          respectReducedMotion: true,
        });
      }

      // Expose to window for debugging or external triggers
      if (typeof window !== 'undefined' && lenisRef.current) {
        (window as unknown as { lenis?: Lenis }).lenis = lenisRef.current;
      }
    };

    initLenis();

    // Listen for orientation or media query changes
    const desktopMql = window.matchMedia('(min-width: 1024px)');
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMqlChange = () => initLenis();
    desktopMql.addEventListener('change', handleMqlChange);
    motionMql.addEventListener('change', handleMqlChange);

    // Re-evaluate on window resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initLenis, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      desktopMql.removeEventListener('change', handleMqlChange);
      motionMql.removeEventListener('change', handleMqlChange);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        if (typeof window !== 'undefined') {
          delete (window as unknown as { lenis?: Lenis }).lenis;
          document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling');
        }
      }
    };
  }, []);

  // Handle route changes smoothly in Next.js App Router
  useEffect(() => {
    if (!lenisRef.current) return;

    // If navigating to a URL without a hash, reset scroll to top immediately
    if (typeof window !== 'undefined' && !window.location.hash) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Recalculate dimensions for the new page layout
    const timer = setTimeout(() => {
      lenisRef.current?.resize();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
