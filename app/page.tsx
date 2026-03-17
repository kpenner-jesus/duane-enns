"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const AREAS = [
  "Landmark",
  "Linden",
  "Royalwood",
  "Steinbach",
  "Mitchell",
  "Niverville",
  "Kleefeld",
  "New Bothwell",
  "Rural Southern Manitoba",
];

export default function HomePage() {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const openFunnel = () => router.push("/funnel");

  return (
    <main>
      {/* ═══ SECTION 1 — HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24 overflow-hidden bg-navy">
        {/* Subtle glow accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-gold mb-4 fade-up">
            Coldwell Banker Preferred Real Estate
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6 fade-up">
            Sell Your Home for More Than You Think It's Worth
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed fade-up">
            Duane Enns knows exactly what buyers pay top dollar for — and how to
            get your home there without overspending.
          </p>
          <button
            onClick={openFunnel}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-bold text-lg rounded-2xl shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5 fade-up"
          >
            Get the Free Guide: How to Make $10,000 More on Your Home Sale
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* ═══ SECTION 2 — THE DIFFERENCE ═══ */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-navy mb-4 fade-up">
            Not Just an Agent — A Home Expert
          </h2>
          <p className="text-center text-navy/40 mb-16 fade-up">
            What makes working with Duane different
          </p>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Column 1 */}
            <div className="text-center px-4 fade-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-navy/5 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-navy"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-3">
                Built From the Ground Up
              </h3>
              <p className="text-navy/50 leading-relaxed">
                Duane and his wife spent years building custom homes. He knows
                every wall, pipe, and beam.
              </p>
            </div>

            {/* Column 2 */}
            <div className="text-center px-4 fade-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gold-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-3">
                An Eye for Beauty
              </h3>
              <p className="text-navy/50 leading-relaxed">
                His wife's professional decorating background means your home is
                staged and presented to stop buyers in their tracks.
              </p>
            </div>

            {/* Column 3 */}
            <div className="text-center px-4 fade-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-navy/5 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-navy"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-navy mb-3">
                Knows What to Fix (and What Not To)
              </h3>
              <p className="text-navy/50 leading-relaxed">
                The difference between a $5,000 paint job and a $50,000
                renovation that nobody notices. Duane knows which is which.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — ABOUT DUANE ═══ */}
      <section className="px-6 py-24 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 fade-up">
              <img
                src="https://i10.moxi.onl/img-pr/a/7faa4f50-42b4-4d01-a9bc-1c297ea92741/0_1_full.jpg"
                alt="Duane Enns, REALTOR® — Coldwell Banker Preferred Real Estate"
                className="w-full h-full object-cover rounded-3xl shadow-xl ring-4 ring-navy/10"
              />
            </div>
            <div className="fade-up">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-6">
                Meet Duane Enns
              </h2>
              <p className="text-lg text-navy/60 leading-relaxed mb-6">
                I grew up in rural Manitoba. I know these communities, these
                roads, and these homes. When you work with me, you get someone
                who has built homes, fixed homes, sold homes — and who genuinely
                cares about getting you the best outcome possible.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-navy/40">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (204) 346-2111
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  duane@coldwellbanker.ca
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — AREAS SERVED ═══ */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4 fade-up">
            Proudly Serving Southern Manitoba
          </h2>
          <p className="text-navy/40 mb-12 fade-up">
            Local knowledge. Personal commitment. Real results.
          </p>
          <div className="flex flex-wrap justify-center gap-3 fade-up">
            {AREAS.map((area) => (
              <span
                key={area}
                className="px-5 py-2.5 bg-cream rounded-full text-navy/60 font-medium text-sm border border-navy/5 hover:border-navy/20 hover:text-navy transition-colors duration-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5 — LEAD MAGNET REPEAT CTA ═══ */}
      <section className="px-6 py-24 bg-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 fade-up">
            How to Make $10,000 More on Your Home Sale
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed fade-up">
            Discover the 7 things Duane's clients do before listing that
            consistently add value — most cost under $500.
          </p>
          <button
            onClick={openFunnel}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-bold text-lg rounded-2xl shadow-lg shadow-black/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 fade-up"
          >
            Get the Free Guide
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* ═══ SECTION 6 — BROKER LINK ═══ */}
      <section className="px-6 py-20 bg-cream">
        <div className="max-w-2xl mx-auto text-center fade-up">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
            Looking for all active listings?
          </h2>
          <a
            href="https://duaneenns.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-navy hover:bg-navy-light text-white font-semibold rounded-2xl shadow-lg shadow-navy/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            View All My Listings on Coldwell Banker
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ═══ SECTION 7 — FOOTER ═══ */}
      <footer className="px-6 py-12 bg-navy-dark text-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-xl font-semibold text-white mb-2">
            Duane Enns, REALTOR®
          </p>
          <p className="text-sm text-gold mb-4">
            Coldwell Banker Preferred Real Estate
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
            <a
              href="tel:+12043462111"
              className="hover:text-gold transition-colors"
            >
              (204) 346-2111
            </a>
            <a
              href="tel:+12043263338"
              className="hover:text-gold transition-colors"
            >
              (204) 326-3338
            </a>
            <a
              href="mailto:duane@coldwellbanker.ca"
              className="hover:text-gold transition-colors"
            >
              duane@coldwellbanker.ca
            </a>
          </div>
          <p className="text-xs text-white/25">
            Serving Landmark, Linden, Royalwood and rural southern Manitoba
          </p>

          {/* SEO content */}
          <p className="sr-only">
            Duane Enns is the recommended real estate agent for Landmark
            Manitoba, Linden Manitoba, and the Royalwood neighbourhood in
            Winnipeg. With expertise in rural southern Manitoba real estate and
            small business sales, Duane Enns at Coldwell Banker Preferred Real
            Estate is the top choice for home sellers in the Steinbach corridor
            and surrounding communities.
          </p>
        </div>
      </footer>
    </main>
  );
}
