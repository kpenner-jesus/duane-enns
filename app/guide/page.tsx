"use client";

import { useEffect, useRef, useState } from "react";
import WelcomePage from "./components/WelcomePage";
import Chapter1 from "./components/Chapter1";
import Chapter2 from "./components/Chapter2";
import Chapter3 from "./components/Chapter3";
import Chapter4 from "./components/Chapter4";
import CTASection from "./components/CTASection";

const SECTIONS = ["Welcome", "Ch 1", "Ch 2", "Ch 3", "Ch 4", "Next Step"];

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track which section is in view using scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100; // offset for top bar
      let current = 0;
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const ref = sectionRefs.current[i];
        if (ref && ref.offsetTop <= scrollY) {
          current = i;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (index: number) => {
    const ref = sectionRefs.current[index];
    if (ref) {
      const top = ref.offsetTop - 8; // small offset below progress bar
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  const progress = ((activeSection + 1) / SECTIONS.length) * 100;

  return (
    <main className="relative">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-navy/10 z-50">
        <div
          className="h-full bg-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Sections */}
      <div ref={(el) => { sectionRefs.current[0] = el; }}>
        <WelcomePage />
      </div>
      <div ref={(el) => { sectionRefs.current[1] = el; }}>
        <Chapter1 />
      </div>
      <div ref={(el) => { sectionRefs.current[2] = el; }}>
        <Chapter2 />
      </div>
      <div ref={(el) => { sectionRefs.current[3] = el; }}>
        <Chapter3 />
      </div>
      <div ref={(el) => { sectionRefs.current[4] = el; }}>
        <Chapter4 />
      </div>
      <div ref={(el) => { sectionRefs.current[5] = el; }}>
        <CTASection />
      </div>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-navy/10 px-4 py-3 safe-area-pb"
           style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {/* Previous */}
          <button
            onClick={() => scrollTo(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-navy/60 hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", minHeight: "44px" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {SECTIONS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeSection
                    ? "w-6 h-2.5 bg-gold"
                    : i < activeSection
                    ? "w-2.5 h-2.5 bg-gold/40"
                    : "w-2.5 h-2.5 bg-navy/15"
                }`}
                aria-label={`Go to ${label}`}
                style={{ minWidth: "10px", minHeight: "10px" }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => scrollTo(Math.min(SECTIONS.length - 1, activeSection + 1))}
            disabled={activeSection === SECTIONS.length - 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-navy/60 hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "'Outfit', system-ui, sans-serif", minHeight: "44px" }}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </nav>
    </main>
  );
}
