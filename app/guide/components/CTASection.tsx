"use client";

export default function CTASection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 py-16 bg-navy overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div className="w-16 h-0.5 bg-gold/50 mx-auto mb-8" />

        <p className="text-xs font-medium tracking-label uppercase text-gold mb-4"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          Your Next Step
        </p>

        <h2 className="font-funnel text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Put This Guide to Work?
        </h2>

        <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-4"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          You&apos;ve got the playbook. Now you need the team.
        </p>
        <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-4"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          With Duane, you get someone who has built homes, fixed homes, and sold homes — and who genuinely cares about your outcome.
        </p>
        <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-4"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          With Jackie, you get 20+ years of decorating and staging experience that makes buyers say &ldquo;I want this one.&rdquo;
        </p>
        <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-8"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          And with Coldwell Banker Preferred Real Estate, you get one of the top brokerages in North America behind you.
        </p>

        {/* Text CTA */}
        <a
          href="sms:+12043462111"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-navy font-bold text-lg rounded-full shadow-btn-gold hover:shadow-btn-gold-hover transition-all duration-300 hover:-translate-y-0.5 mb-6"
          style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Text Duane: (204) 346-2111
          <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <div className="flex flex-col items-center gap-2 text-sm text-white/50"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          <a href="tel:+12043462111" className="hover:text-gold transition-colors py-1">
            Call: (204) 346-2111
          </a>
          <a href="mailto:duane@coldwellbanker.ca" className="hover:text-gold transition-colors py-1">
            Email: duane@coldwellbanker.ca
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-white/30" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            Serving Landmark &middot; Linden &middot; Royalwood &middot; Steinbach &middot; Mitchell &middot; Niverville &middot; Kleefeld &middot; New Bothwell &middot; Rural Southern Manitoba
          </p>
        </div>
      </div>
    </section>
  );
}
