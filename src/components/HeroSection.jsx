export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-t from-black/40 via-black/60 to-black/90"
    >
      {/* ── Framed Video with Yellow Outer Glow ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="relative w-[88%] sm:w-[80%] h-[55%] sm:h-[62%] overflow-hidden"
          style={{
            boxShadow: `
              0 0 0 1px rgba(250,204,21,0.35),
              0 0 30px 6px  rgba(250,204,21,0.45),
              0 0 70px 18px rgba(250,204,21,0.22),
              0 0 130px 40px rgba(250,204,21,0.10)
            `,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full"
            style={{ objectFit: 'cover' }}
            src="/src/public/vietnam-flag-loop.mp4"
          />
          {/* Soft overlay only inside the video frame */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.40) 100%),
                linear-gradient(to bottom, rgba(40,0,0,0.50) 0%, rgba(0,0,0,0.45) 100%)
              `,
            }}
          />
        </div>
      </div>

      {/* ── Corner ornaments ── */}
      <div className="absolute top-6 left-6 w-14 h-14 border-t-2 border-l-2 border-yellow-400 opacity-40 z-10" />
      <div className="absolute top-6 right-6 w-14 h-14 border-t-2 border-r-2 border-yellow-400 opacity-40 z-10" />
      <div className="absolute bottom-6 left-6 w-14 h-14 border-b-2 border-l-6 border-yellow-400 opacity-40 z-10" />
      <div className="absolute bottom-6 right-6 w-14 h-14 border-b-2 border-r-2 border-yellow-400 opacity-40 z-10" />

      {/* ── Text Content ── */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        {/* Year badge */}
        <div className="inline-flex items-center gap-3 mb-10 animate-fade-up delay-100">
          <span className="h-px w-10 bg-yellow-400 opacity-70" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-yellow-400 font-semibold drop-shadow-md">
            1945 &nbsp;—&nbsp; 1954
          </span>
          <span className="h-px w-10 bg-yellow-400 opacity-70" />
        </div>

        {/* Star motif */}
        <div
          className="text-yellow-400 text-4xl mb-6 animate-fade-up delay-200 leading-none"
          style={{ textShadow: '0 0 20px rgba(250,204,21,0.6), 0 0 40px rgba(250,204,21,0.3)' }}
        >
          ★
        </div>

        {/* Main title */}
        <h1 className="font-display leading-tight mb-2">
          <span
            className="block text-3xl sm:text-4xl md:text-5xl text-stone-200 italic font-normal animate-fade-up delay-300"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
          >
            Từ{' '}
            <span
              className="text-yellow-300 not-italic font-bold"
              style={{ textShadow: '0 0 24px rgba(253,224,71,0.5), 0 2px 8px rgba(0,0,0,0.8)' }}
            >
              "Ngàn cân treo sợi tóc"
            </span>
          </span>

          <span
            className="block text-2xl sm:text-3xl md:text-4xl text-stone-300 font-normal mt-3 animate-fade-up delay-500"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
          >
            đến chiến thắng
          </span>

          <span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-2 animate-fade-up delay-700"
            style={{
              lineHeight: 1.1,
              color: '#fff',
              textShadow: '0 0 32px rgba(220,38,38,0.7), 0 0 80px rgba(220,38,38,0.35), 0 4px 16px rgba(0,0,0,0.9)',
            }}
          >
            "Chấn động địa cầu"
          </span>
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 my-8 animate-fade-in delay-900">
          <span className="h-px flex-1 max-w-[80px] bg-yellow-400 opacity-40" />
          <span className="text-yellow-400 opacity-70 text-lg" style={{ textShadow: '0 0 10px rgba(250,204,21,0.5)' }}>
            ✦
          </span>
          <span className="h-px flex-1 max-w-[80px] bg-yellow-400 opacity-40" />
        </div>

        {/* Subtitle */}
        <p
          className="font-body text-base sm:text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl mx-auto animate-fade-up delay-900 italic"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
        >
          Hành trình Đảng lãnh đạo bảo vệ chính quyền và kháng chiến
          <br className="hidden sm:block" />
          <span className="font-semibold not-italic text-yellow-200">
            {' '}(1945 – 1954)
          </span>
        </p>

        {/* Scroll-down CTA */}
        <div className="mt-16 animate-fade-in delay-1100">
          <a
            href="#map-section"
            className="inline-flex flex-col items-center gap-3 group"
          >
            {/* Glowing pill button */}
            <span
              className="px-6 py-2 rounded-full border border-yellow-400/60 text-yellow-300 font-body text-xs tracking-widest uppercase transition-all duration-300 group-hover:bg-yellow-400/10 group-hover:border-yellow-300 group-hover:text-yellow-200"
              style={{ boxShadow: '0 0 16px rgba(250,204,21,0.15), inset 0 0 12px rgba(250,204,21,0.05)' }}
            >
              Khám phá
            </span>
            {/* Animated chevron */}
            <span
              className="text-yellow-400 text-xl animate-bounce"
              style={{ textShadow: '0 0 12px rgba(250,204,21,0.6)' }}
              aria-hidden="true"
            >
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
