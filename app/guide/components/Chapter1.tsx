"use client";

import { useState, useCallback } from "react";

type Problem = {
  id: string;
  label: string;
  emoji: string;
  fixCost: number;
  valueAdded: number;
  top: string;
  left: string;
};

const PROBLEMS: Problem[] = [
  { id: "window", label: "Cracked Window", emoji: "🪟", fixCost: 75, valueAdded: 1500, top: "18%", left: "22%" },
  { id: "yard", label: "Messy Yard", emoji: "🌿", fixCost: 0, valueAdded: 2000, top: "78%", left: "18%" },
  { id: "downspout", label: "Broken Downspout", emoji: "🔧", fixCost: 25, valueAdded: 500, top: "35%", left: "78%" },
  { id: "paint", label: "Peeling Paint", emoji: "🎨", fixCost: 200, valueAdded: 2500, top: "48%", left: "68%" },
  { id: "drywall", label: "Drywall Dings", emoji: "🔨", fixCost: 175, valueAdded: 1500, top: "50%", left: "35%" },
];

export default function Chapter1() {
  const [fixed, setFixed] = useState<Set<string>>(new Set());
  const [floaters, setFloaters] = useState<{ id: string; value: number; key: number }[]>([]);
  const [floatKey, setFloatKey] = useState(0);

  const totalCost = PROBLEMS.filter((p) => fixed.has(p.id)).reduce((s, p) => s + p.fixCost, 0);
  const totalValue = PROBLEMS.filter((p) => fixed.has(p.id)).reduce((s, p) => s + p.valueAdded, 0);
  const allDone = fixed.size === PROBLEMS.length;

  const handleFix = useCallback(
    (problem: Problem) => {
      if (fixed.has(problem.id)) return;
      setFixed((prev) => new Set(prev).add(problem.id));
      const k = floatKey + 1;
      setFloatKey(k);
      setFloaters((prev) => [...prev, { id: problem.id, value: problem.valueAdded, key: k }]);
      setTimeout(() => {
        setFloaters((prev) => prev.filter((f) => f.key !== k));
      }, 1300);
    },
    [fixed, floatKey]
  );

  return (
    <section className="px-5 py-16 bg-white">
      <div className="max-w-xl mx-auto">
        {/* Chapter heading */}
        <p className="text-xs font-medium tracking-label uppercase text-gold mb-3"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          Chapter 1
        </p>
        <h2 className="font-funnel text-3xl sm:text-4xl font-bold text-navy mb-6">
          What to Fix (and What to Leave Alone)
        </h2>

        {/* Chapter text */}
        <div className="space-y-4 mb-10" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            This is the number one question I get: &ldquo;What should I fix before I list?&rdquo;
          </p>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            And the answer is simpler than you think. You don&apos;t need to tear your house apart. You just need to fix the things that catch the eye.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">Start Outside</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            When a buyer drives up, they see your home in about 3 seconds. That first look matters more than you think.
          </p>
          <ul className="space-y-2 text-lg sm:text-xl text-navy/80 leading-relaxed pl-1">
            <li><strong className="text-navy">The yard</strong> — Pick up the clutter. Bikes, toys, hoses. This one is free.</li>
            <li><strong className="text-navy">Shingles</strong> — If they&apos;re in bad shape, talk to your agent. Sometimes you fix them, sometimes you just price for it.</li>
            <li><strong className="text-navy">Siding and paint</strong> — Is it cracked or peeling? A little touch-up goes a long way.</li>
            <li><strong className="text-navy">Windows</strong> — Can you see cracks or fogged seals from outside? Buyers notice.</li>
            <li><strong className="text-navy">Downspouts</strong> — If they&apos;re bent or busted, just take them off. New ones cost almost nothing.</li>
          </ul>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">Then Walk Inside</h3>
          <ul className="space-y-2 text-lg sm:text-xl text-navy/80 leading-relaxed pl-1">
            <li><strong className="text-navy">Drywall holes and dings</strong> — Patch them. A tub of filler and some matching paint is all you need.</li>
            <li><strong className="text-navy">Paint</strong> — If there are a lot of patches, it might be worth painting. But don&apos;t spend a fortune on a color the buyer might change anyway.</li>
            <li><strong className="text-navy">Flooring</strong> — Badly worn carpet? Get it professionally cleaned first. Only replace if cleaning won&apos;t fix it.</li>
            <li><strong className="text-navy">Cabinets</strong> — Dated cabinets from the 1970s? Don&apos;t rip them out. A fresh coat of paint can make old cabinets look great again.</li>
            <li><strong className="text-navy">Appliances and furniture</strong> — They are what they are. Don&apos;t spend money here.</li>
          </ul>

          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-5 mt-4">
            <p className="text-lg sm:text-xl text-navy font-bold mb-2" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
              Duane&apos;s Rule:
            </p>
            <p className="text-lg sm:text-xl text-navy/80 leading-relaxed" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
              Fix what catches the eye. Leave what doesn&apos;t. Most buyers want to move in and live — not renovate.
            </p>
          </div>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">What NOT to Spend Money On</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            I&apos;ve seen sellers pour $50,000 into a renovation that nobody noticed. Big renos before selling are almost never worth it. Don&apos;t add a sun room. Don&apos;t tear out walls. Don&apos;t buy all new appliances.
          </p>
        </div>

        {/* ═══ GAME: Tap to Fix ═══ */}
        <div className="bg-cream rounded-3xl p-5 sm:p-8 border border-navy/5 shadow-card">
          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy mb-2 text-center">
            🏠 Tap to Fix!
          </h3>
          <p className="text-base text-navy/60 mb-6 text-center"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            Tap each problem spot to fix it and see how the value adds up.
          </p>

          {/* House illustration */}
          <div className="relative mx-auto bg-white rounded-2xl border border-navy/10 overflow-hidden"
               style={{ maxWidth: "340px", aspectRatio: "4 / 5" }}>
            {/* Sky */}
            <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-blue-100 to-blue-50" />
            {/* Grass */}
            <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-green-300 to-green-200" />
            {/* House walls */}
            <div className="absolute bg-amber-100 border-2 border-amber-200"
                 style={{ top: "28%", left: "15%", right: "15%", bottom: "25%", borderRadius: "4px" }} />
            {/* Roof */}
            <div className="absolute"
                 style={{ top: "12%", left: "10%", right: "10%", height: "18%", background: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            {/* Door */}
            <div className="absolute bg-amber-700 rounded-t-lg"
                 style={{ bottom: "25%", left: "42%", width: "16%", height: "20%" }}>
              <div className="absolute right-2 top-1/2 w-2 h-2 rounded-full bg-gold" />
            </div>
            {/* Windows */}
            <div className="absolute bg-sky-200 border-2 border-amber-300"
                 style={{ top: "38%", left: "20%", width: "18%", height: "12%" }} />
            <div className="absolute bg-sky-200 border-2 border-amber-300"
                 style={{ top: "38%", right: "20%", width: "18%", height: "12%" }} />

            {/* Problem spots */}
            {PROBLEMS.map((problem) => (
              <button
                key={problem.id}
                onClick={() => handleFix(problem)}
                disabled={fixed.has(problem.id)}
                className={`absolute flex items-center justify-center rounded-full transition-all duration-300 ${
                  fixed.has(problem.id)
                    ? "bg-green-500 text-white ebook-fix-pop"
                    : "bg-red-500/90 text-white ebook-pulse cursor-pointer"
                }`}
                style={{
                  top: problem.top,
                  left: problem.left,
                  width: "48px",
                  height: "48px",
                  transform: "translate(-50%, -50%)",
                  fontSize: fixed.has(problem.id) ? "20px" : "18px",
                  zIndex: 10,
                }}
                aria-label={`Fix: ${problem.label}`}
              >
                {fixed.has(problem.id) ? "✓" : problem.emoji}
              </button>
            ))}

            {/* Floating value indicators */}
            {floaters.map((f) => {
              const prob = PROBLEMS.find((p) => p.id === f.id);
              if (!prob) return null;
              return (
                <div
                  key={f.key}
                  className="absolute ebook-float-value pointer-events-none"
                  style={{
                    top: prob.top,
                    left: prob.left,
                    transform: "translate(-50%, -100%)",
                    zIndex: 20,
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#16a34a",
                  }}
                >
                  +${f.value.toLocaleString()}
                </div>
              );
            })}
          </div>

          {/* Problem legend */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {PROBLEMS.map((p) => (
              <span
                key={p.id}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                  fixed.has(p.id)
                    ? "bg-green-100 text-green-700 line-through"
                    : "bg-red-50 text-red-600"
                }`}
                style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
              >
                {p.emoji} {p.label} {fixed.has(p.id) ? `✓ $${p.fixCost}` : ""}
              </span>
            ))}
          </div>

          {/* Running totals */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="bg-white rounded-xl p-4 border border-navy/5">
              <p className="text-xs text-navy/50 uppercase tracking-wide mb-1"
                 style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                Cost to Fix
              </p>
              <p className="font-funnel text-2xl sm:text-3xl font-bold text-navy">
                ${totalCost.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-navy/5">
              <p className="text-xs text-navy/50 uppercase tracking-wide mb-1"
                 style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                Value Added
              </p>
              <p className="font-funnel text-2xl sm:text-3xl font-bold text-green-600">
                +${totalValue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Completion comparison */}
          {allDone && (
            <div className="mt-6 ebook-reveal">
              <div className="grid grid-cols-2 gap-4">
                {/* Duane side */}
                <div className="bg-white rounded-xl p-4 border-2 border-gold text-center">
                  <p className="text-2xl mb-2">🏆</p>
                  <p className="font-bold text-navy text-sm mb-1" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                    Duane&apos;s Advice
                  </p>
                  <p className="text-xs text-navy/60 mb-2" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                    Spent: <strong className="text-navy">${totalCost}</strong>
                  </p>
                  <p className="text-lg font-bold text-green-600" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                    +$8,000 value
                  </p>
                </div>
                {/* Bad agent side */}
                <div className="bg-white rounded-xl p-4 border-2 border-red-300 text-center">
                  <p className="text-2xl mb-2">😤</p>
                  <p className="font-bold text-navy text-sm mb-1" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                    Generic Agent
                  </p>
                  <p className="text-xs text-navy/60 mb-2" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                    Spent: <strong className="text-red-600">$45,000</strong>
                  </p>
                  <p className="text-lg font-bold text-red-500" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                    +$5,000 value
                  </p>
                </div>
              </div>
              <p className="text-center text-sm text-navy/60 mt-3" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                Smart fixes beat big renos every time. 💪
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
