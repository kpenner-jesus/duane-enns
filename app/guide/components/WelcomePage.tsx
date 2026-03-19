"use client";

export default function WelcomePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 py-16 bg-navy overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        {/* Gold accent line */}
        <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />

        <p className="text-xs font-medium tracking-label uppercase text-gold mb-3"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          Coldwell Banker Preferred Real Estate
        </p>

        <h1 className="font-funnel text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white mb-4">
          The $10,000 Secret Most Sellers Never Hear
        </h1>

        <p className="text-base sm:text-lg text-white/50 mb-8"
           style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
          The simple things smart sellers do before listing that add real money to their home sale.
        </p>

        <div className="w-12 h-px bg-gold/30 mx-auto mb-8" />

        {/* Welcome letter */}
        <div className="text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-4"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            Hey there — thanks for grabbing this guide!
          </p>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-4"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            My name is Duane Enns. I sell homes in southern Manitoba. But before that, I built them. For 12 years, my wife Jacquie and I built custom homes from the ground up. I know every beam, every pipe, every wall.
          </p>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-4"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            And Jacquie? She has a gift for making a house feel like a home. She has done decor and design for over 20 years.
          </p>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-4"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            This guide is going to show you the simple things that add real money to your home sale. Not big, scary renos. Not $50,000 kitchen gut-jobs. Just the smart, easy stuff that makes buyers say &ldquo;I want this one.&rdquo;
          </p>
          <p className="text-lg sm:text-xl text-gold leading-relaxed mb-6"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            Most of these things cost under $500. Some cost nothing at all. But together, they can add $10,000 or more to your sale price.
          </p>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            So grab a coffee and let&apos;s get into it.
          </p>
          <p className="text-lg sm:text-xl text-gold font-semibold mt-4"
             style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
            — Duane
          </p>
        </div>
      </div>
    </section>
  );
}
