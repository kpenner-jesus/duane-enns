"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ConfettiEffect from "./ConfettiEffect";

type CheckItem = {
  id: number;
  text: string;
  value: number;
};

const CHECKLIST: CheckItem[] = [
  { id: 1, text: "Clean up the yard and curb appeal", value: 1200 },
  { id: 2, text: "Fix holes, dings, and peeling paint", value: 800 },
  { id: 3, text: "Clean carpets and flooring", value: 600 },
  { id: 4, text: "Declutter every room — less is more", value: 1500 },
  { id: 5, text: "Take down personal photos", value: 400 },
  { id: 6, text: "Light candles, open blinds, turn on lights", value: 700 },
  { id: 7, text: "Get the smell right (clean, fresh, inviting)", value: 500 },
  { id: 8, text: "Ask your agent for sold comparables", value: 1000 },
  { id: 9, text: "Price it based on what actually sold", value: 2000 },
  { id: 10, text: "Stage it — even a simple staging helps", value: 800 },
  { id: 11, text: "Choose an agent who knows homes and works hard", value: 1500 },
];

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevRef.current = end;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <>${display.toLocaleString()}</>;
}

export default function Chapter4() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const [bouncing, setBouncing] = useState<number | null>(null);

  const totalValue = CHECKLIST.filter((item) => checked.has(item.id)).reduce((s, item) => s + item.value, 0);
  const allDone = checked.size === CHECKLIST.length;

  const handleCheck = useCallback(
    (item: CheckItem) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(item.id)) {
          next.delete(item.id);
        } else {
          next.add(item.id);
          setBouncing(item.id);
          setTimeout(() => setBouncing(null), 300);
        }
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (allDone && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  }, [allDone, showConfetti]);

  return (
    <section className="px-5 py-16 bg-cream">
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-medium tracking-label uppercase text-gold mb-3"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          Chapter 4
        </p>
        <h2 className="font-funnel text-3xl sm:text-4xl font-bold text-navy mb-6">
          The $10,000 Secret
        </h2>

        <div className="space-y-4 mb-10" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            Okay, here it is. The secret. And it&apos;s not one big trick. It&apos;s what happens when you put it all together.
          </p>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            Every chapter in this guide is a piece of the puzzle:
          </p>

          <ul className="space-y-2 text-lg sm:text-xl text-navy/80 leading-relaxed pl-1">
            <li><strong className="text-navy">Fix what catches the eye</strong> — but don&apos;t overspend. Patch, paint, clean.</li>
            <li><strong className="text-navy">Make them fall in love</strong> — colors, scent, light, and space. These cost almost nothing but change everything.</li>
            <li><strong className="text-navy">Price it right</strong> — use real sold comparables. Not what you wish. What the market says.</li>
            <li><strong className="text-navy">Present it like a pro</strong> — stage it, clean it, show it off.</li>
            <li><strong className="text-navy">Pick the right agent</strong> — someone who knows homes, has a real plan, and will actually do the work.</li>
          </ul>

          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            When you do all five, something amazing happens. Buyers don&apos;t just look at your home. They <em>want</em> it. They compete for it. And that&apos;s where the extra $10,000 — sometimes more — comes from.
          </p>

          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-5 mt-4">
            <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
              It&apos;s not magic. It&apos;s not a gimmick. It&apos;s just doing the right things, in the right order, with the right help.
            </p>
          </div>
        </div>

        {/* ═══ GAME: The $10,000 Checklist ═══ */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-navy/5 shadow-card">
          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy mb-2 text-center">
            ✅ The $10,000 Checklist
          </h3>
          <p className="text-base text-navy/60 mb-6 text-center"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            Check off each item and watch the value add up!
          </p>

          {/* Animated counter */}
          <div className="text-center mb-6">
            <p className="text-xs font-medium tracking-label uppercase text-navy/50 mb-1"
               style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
              Potential Value Added
            </p>
            <p className="font-display text-5xl sm:text-6xl font-bold text-gold">
              <AnimatedCounter value={totalValue} />
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-navy/5 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(checked.size / CHECKLIST.length) * 100}%` }}
            />
          </div>

          {/* Checklist items */}
          <div className="space-y-2">
            {CHECKLIST.map((item) => {
              const isChecked = checked.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleCheck(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
                    isChecked
                      ? "bg-gold/10 border-2 border-gold/40"
                      : "bg-cream border-2 border-transparent hover:border-navy/10"
                  }`}
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", minHeight: "52px" }}
                >
                  {/* Checkbox */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      isChecked
                        ? "bg-gold border-gold text-white"
                        : "border-navy/20 bg-white"
                    } ${bouncing === item.id ? "ebook-check-bounce" : ""}`}
                  >
                    {isChecked && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Text */}
                  <span className={`text-base sm:text-lg flex-grow transition-colors duration-300 ${
                    isChecked ? "text-navy line-through opacity-70" : "text-navy"
                  }`}>
                    {item.text}
                  </span>

                  {/* Value */}
                  <span className={`text-sm font-bold flex-shrink-0 transition-colors duration-300 ${
                    isChecked ? "text-green-600" : "text-navy/30"
                  }`}>
                    +${item.value.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Completion reveal */}
          {allDone && (
            <div className="mt-6 text-center ebook-reveal">
              <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6">
                <p className="text-3xl mb-3">🎉</p>
                <p className="font-funnel text-2xl font-bold text-navy mb-2">
                  Total Potential Added: $10,000+
                </p>
                <p className="text-lg text-navy/70 leading-relaxed">
                  Small things, done right, with the right help. That&apos;s the secret.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Confetti */}
        {showConfetti && <ConfettiEffect />}
      </div>
    </section>
  );
}
