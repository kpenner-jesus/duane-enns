"use client";

import { useState } from "react";

type Feature = {
  id: string;
  label: string;
  emoji: string;
  active: boolean;
  isGood: boolean;
  impact: number;
};

const INITIAL_FEATURES: Feature[] = [
  { id: "lights", label: "Open Blinds & Lights", emoji: "💡", active: false, isGood: true, impact: 15 },
  { id: "candles", label: "Scented Candles", emoji: "🕯️", active: false, isGood: true, impact: 20 },
  { id: "art", label: "Nice Artwork", emoji: "🖼️", active: false, isGood: true, impact: 10 },
  { id: "declutter", label: "Declutter & Space", emoji: "✨", active: false, isGood: true, impact: 20 },
  { id: "colors", label: "Flowing Colors", emoji: "🎨", active: false, isGood: true, impact: 15 },
  { id: "photos", label: "Personal Photos", emoji: "👨‍👩‍👧", active: true, isGood: false, impact: 15 },
  { id: "clutter", label: "Clutter & Stuff", emoji: "📦", active: true, isGood: false, impact: 20 },
  { id: "petsmell", label: "Pet Odor", emoji: "🐕", active: true, isGood: false, impact: 20 },
];

export default function Chapter2() {
  const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);

  const loveScore = features.reduce((score, f) => {
    if (f.isGood && f.active) return score + f.impact;
    if (!f.isGood && f.active) return score - f.impact;
    return score;
  }, 45); // base 45%

  const clampedScore = Math.max(0, Math.min(100, loveScore));
  const jackieApproved = clampedScore >= 80;

  const toggle = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  };

  const meterColor =
    clampedScore >= 70 ? "bg-green-500" : clampedScore >= 40 ? "bg-yellow-400" : "bg-red-400";

  return (
    <section className="px-5 py-16 bg-cream">
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-medium tracking-label uppercase text-gold mb-3"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          Chapter 2
        </p>
        <h2 className="font-funnel text-3xl sm:text-4xl font-bold text-navy mb-6">
          Making Buyers Fall in Love
        </h2>

        <div className="space-y-4 mb-10" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            This chapter comes straight from my wife Jackie. She&apos;s been doing decor and staging for over 20 years. She helped design every custom home we built together.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">1. Colors That Flow</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            The colors in every room should feel like they belong together. They don&apos;t have to match exactly, but they should all be in the same family. It just has to feel good.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">2. What You Smell at the Door</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            The very first thing a buyer notices is the smell. Fresh candles? That&apos;s a win. Pet odor? That&apos;s a problem. A light scented candle or fresh flowers make a big difference.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">3. Lighting</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            Open the blinds. Turn on the lights. Nobody falls in love with a dark house. Buyers want to see the place — and you don&apos;t want them feeling like you&apos;re hiding anything.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">4. Artwork and Photos</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            Nice artwork on the walls? Great. But take down the personal photos. You want buyers to imagine themselves living there — not your family.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">5. Declutter</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            Take stuff out. If your furniture is too big for the room, it makes everything feel cramped. Pack away the knick-knacks. You&apos;re moving anyway — start packing now.
          </p>

          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-5 mt-4">
            <p className="text-lg sm:text-xl text-navy font-bold mb-2">Jackie&apos;s Tip:</p>
            <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
              Walk through your house like you&apos;ve never been there before. What catches your attention? What feels off? That&apos;s exactly what a buyer will notice too.
            </p>
          </div>
        </div>

        {/* ═══ GAME: Staging Showdown ═══ */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-navy/5 shadow-card">
          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy mb-2 text-center">
            🏡 Staging Showdown
          </h3>
          <p className="text-base text-navy/60 mb-6 text-center"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            Toggle features to stage the room. Watch the Buyer Love Meter rise!
          </p>

          {/* Love Meter */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-navy/60" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                Buyer Love Meter
              </span>
              <span className="text-sm font-bold text-navy" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                {clampedScore}%
                {clampedScore >= 80 && " ❤️"}
              </span>
            </div>
            <div className="w-full h-5 bg-navy/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${meterColor}`}
                style={{ width: `${clampedScore}%` }}
              />
            </div>
          </div>

          {/* Jackie approved banner */}
          {jackieApproved && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center ebook-reveal">
              <p className="text-lg font-bold text-green-700" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                <span className="ebook-heart inline-block text-2xl mr-2">❤️</span>
                Jackie-Approved! Buyers will love this home!
              </p>
            </div>
          )}

          {/* Feature toggles */}
          <div className="space-y-3">
            {/* Good features */}
            <p className="text-xs font-medium tracking-label uppercase text-green-600 mt-2"
               style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
              Add These ↓
            </p>
            {features
              .filter((f) => f.isGood)
              .map((f) => (
                <button
                  key={f.id}
                  onClick={() => toggle(f.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    f.active
                      ? "bg-green-50 border-2 border-green-400 text-green-800"
                      : "bg-navy/5 border-2 border-transparent text-navy/60"
                  }`}
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", minHeight: "52px" }}
                >
                  <span className="text-xl flex-shrink-0">{f.emoji}</span>
                  <span className="text-base sm:text-lg font-medium flex-grow">{f.label}</span>
                  <span className="text-sm font-bold flex-shrink-0">
                    {f.active ? "✓ ON" : "OFF"}
                  </span>
                </button>
              ))}

            {/* Bad features */}
            <p className="text-xs font-medium tracking-label uppercase text-red-500 mt-4"
               style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
              Remove These ↓
            </p>
            {features
              .filter((f) => !f.isGood)
              .map((f) => (
                <button
                  key={f.id}
                  onClick={() => toggle(f.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    f.active
                      ? "bg-red-50 border-2 border-red-300 text-red-700"
                      : "bg-green-50 border-2 border-green-300 text-green-700"
                  }`}
                  style={{ fontFamily: "'Outfit', system-ui, sans-serif", minHeight: "52px" }}
                >
                  <span className="text-xl flex-shrink-0">{f.emoji}</span>
                  <span className="text-base sm:text-lg font-medium flex-grow">{f.label}</span>
                  <span className="text-sm font-bold flex-shrink-0">
                    {f.active ? "⚠️ STILL HERE" : "✓ REMOVED"}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
