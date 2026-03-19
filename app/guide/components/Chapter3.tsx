"use client";

import { useState, useCallback } from "react";
import VillainPopup from "./VillainPopup";

type Bucket = "price" | "presentation" | "person";

type Scenario = {
  id: number;
  text: string;
  correct: Bucket;
  explanation: string;
};

const SCENARIOS: Scenario[] = [
  { id: 1, text: "Your home is listed $40K above comparable sales", correct: "price", explanation: "That's a Price problem! Check sold comparables to get the right number." },
  { id: 2, text: "The house smells like wet dog during showings", correct: "presentation", explanation: "That's Presentation! Scent is one of the first things buyers notice." },
  { id: 3, text: "Your agent just posts on MLS and hopes for the best", correct: "person", explanation: "That's a Person problem! Your agent needs a real marketing plan." },
  { id: 4, text: "Cluttered rooms make the house feel tiny", correct: "presentation", explanation: "That's Presentation! Decluttering makes rooms feel bigger." },
  { id: 5, text: "You priced based on memories, not sold comparables", correct: "price", explanation: "That's Price! You keep the memories — just sell the house at market value." },
  { id: 6, text: "Your agent never follows up with interested buyers", correct: "person", explanation: "That's a Person problem! A good agent follows up on every lead." },
  { id: 7, text: "Dark rooms with all the blinds closed", correct: "presentation", explanation: "That's Presentation! Open those blinds and turn on the lights!" },
  { id: 8, text: "Your agent has no social media or marketing plan", correct: "person", explanation: "That's a Person problem! Marketing matters in today's market." },
];

const BUCKET_STYLES: Record<Bucket, { label: string; emoji: string; color: string; bg: string; border: string }> = {
  price: { label: "Price", emoji: "💰", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-300" },
  presentation: { label: "Presentation", emoji: "🏠", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-300" },
  person: { label: "Person", emoji: "👤", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-300" },
};

export default function Chapter3() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [villain, setVillain] = useState<string | null>(null);
  const [flash, setFlash] = useState<Bucket | null>(null);
  const [results, setResults] = useState<("correct" | "wrong")[]>([]);
  const done = current >= SCENARIOS.length;

  const handleGuess = useCallback(
    (guess: Bucket) => {
      if (done || shaking) return;
      const scenario = SCENARIOS[current];

      if (guess === scenario.correct) {
        setScore((s) => s + 1);
        setResults((r) => [...r, "correct"]);
        setFlash(guess);
        setTimeout(() => {
          setFlash(null);
          setCurrent((c) => c + 1);
        }, 500);
      } else {
        setShaking(true);
        setResults((r) => [...r, "wrong"]);
        setTimeout(() => {
          setShaking(false);
          setVillain(scenario.explanation);
        }, 400);
      }
    },
    [current, done, shaking]
  );

  const dismissVillain = useCallback(() => {
    setVillain(null);
    setCurrent((c) => c + 1);
  }, []);

  return (
    <section className="px-5 py-16 bg-white">
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-medium tracking-label uppercase text-gold mb-3"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          Chapter 3
        </p>
        <h2 className="font-funnel text-3xl sm:text-4xl font-bold text-navy mb-6">
          Why Homes Don&apos;t Sell
        </h2>

        <div className="space-y-4 mb-10" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            I call these the <strong className="text-navy">Three P&apos;s</strong>. If your home isn&apos;t selling, one of these three things is almost always the reason.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">P #1: Price</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            You raised your family there. You have a million memories. But you&apos;re not selling your memories — you get to keep those. You&apos;re selling the house. Use <strong className="text-navy">sold comparables</strong> — what someone actually paid, not what someone is asking.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">P #2: Presentation</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            Think of your home like a product on a shelf. Show off the best parts. Clean, declutter, stage it. Keep it fresh for every showing. Make sure your agent has a marketing plan — social media, great photos, the works.
          </p>

          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy pt-4">P #3: Person (Your Agent)</h3>
          <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
            Not all agents are the same. You want someone you click with, who has a real marketing plan, works hard, and backs up what they say by actually doing it.
          </p>

          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-5 mt-4">
            <p className="text-lg sm:text-xl text-navy font-bold mb-2">Real talk:</p>
            <p className="text-lg sm:text-xl text-navy/80 leading-relaxed">
              If your home has been sitting on the market, it&apos;s almost always one of these three things. The good news? All three can be fixed.
            </p>
          </div>
        </div>

        {/* ═══ GAME: Three P's Challenge ═══ */}
        <div className="bg-cream rounded-3xl p-5 sm:p-8 border border-navy/5 shadow-card">
          <h3 className="font-funnel text-xl sm:text-2xl font-bold text-navy mb-2 text-center">
            🎯 The Three P&apos;s Challenge
          </h3>
          <p className="text-base text-navy/60 mb-4 text-center"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            Sort each scenario into the right bucket!
          </p>

          {/* Score */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {SCENARIOS.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i < results.length
                    ? results[i] === "correct"
                      ? "bg-green-500"
                      : "bg-red-400"
                    : i === current
                    ? "bg-navy"
                    : "bg-navy/20"
                }`}
              />
            ))}
          </div>

          {!done ? (
            <>
              {/* Current card */}
              <div
                className={`bg-white rounded-2xl p-5 sm:p-6 mb-6 border border-navy/10 shadow-sm ${
                  shaking ? "ebook-shake" : "ebook-card-in"
                }`}
                key={current}
              >
                <p className="text-xs text-navy/40 mb-2" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                  Scenario {current + 1} of {SCENARIOS.length}
                </p>
                <p className="text-lg sm:text-xl font-medium text-navy leading-snug"
                   style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                  {SCENARIOS[current].text}
                </p>
              </div>

              {/* Bucket buttons */}
              <div className="grid grid-cols-3 gap-3">
                {(["price", "presentation", "person"] as Bucket[]).map((bucket) => {
                  const s = BUCKET_STYLES[bucket];
                  return (
                    <button
                      key={bucket}
                      onClick={() => handleGuess(bucket)}
                      disabled={shaking}
                      className={`flex flex-col items-center gap-1 py-4 px-2 rounded-xl border-2 transition-all duration-300 active:scale-95 ${
                        flash === bucket
                          ? "bg-green-100 border-green-500 ebook-correct"
                          : `${s.bg} ${s.border} hover:shadow-md`
                      }`}
                      style={{ minHeight: "80px" }}
                    >
                      <span className="text-2xl">{s.emoji}</span>
                      <span className={`text-sm font-bold ${s.color}`}
                            style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Results */
            <div className="text-center ebook-reveal">
              <p className="text-5xl mb-4">{score >= 6 ? "🎉" : "👍"}</p>
              <p className="font-funnel text-2xl font-bold text-navy mb-2">
                {score} / {SCENARIOS.length} Correct!
              </p>
              <p className="text-lg text-navy/60" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                {score >= 7
                  ? "Amazing! You really know the Three P's!"
                  : score >= 5
                  ? "Nice work! Now you know what to watch for."
                  : "Don't worry — now you know the Three P's!"}
              </p>
            </div>
          )}
        </div>

        {/* Villain popup */}
        {villain && <VillainPopup message={villain} onDone={dismissVillain} />}
      </div>
    </section>
  );
}
