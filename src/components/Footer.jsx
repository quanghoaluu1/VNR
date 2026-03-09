export default function Footer() {
  return (
    <footer
      className="relative bg-red-900 text-stone-200 py-12 px-6 overflow-hidden"
      role="contentinfo"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-yellow-600 opacity-40" />

      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.3) 24px, rgba(255,255,255,0.3) 25px)',
        }}
        aria-hidden="true"
      />

      {/* Corner ornaments */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-yellow-600 opacity-30" aria-hidden="true" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-yellow-600 opacity-30" aria-hidden="true" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-yellow-600 opacity-30" aria-hidden="true" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-yellow-600 opacity-30" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Star */}
        <div className="text-yellow-500 text-2xl mb-4 opacity-80" aria-hidden="true">★</div>

        {/* Title */}
        <h2 className="font-display text-xl font-bold text-yellow-100 tracking-wide mb-1">
          Dự án Lịch sử
        </h2>

        {/* Year */}
        <p className="font-body text-sm text-stone-400 tracking-[0.3em] uppercase mb-6">
          2026
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-16 bg-yellow-600 opacity-30" />
          <span className="text-yellow-600 opacity-50 text-xs">✦</span>
          <span className="h-px w-16 bg-yellow-600 opacity-30" />
        </div>

        {/* Subtitle */}
        <p className="font-body text-xs text-stone-500 italic leading-relaxed max-w-sm mx-auto">
          "Dân tộc ta có một lòng nồng nàn yêu nước.
          Đó là một truyền thống quý báu của ta."
        </p>
        <p className="font-body text-xs text-stone-600 mt-1">— Hồ Chí Minh</p>

        {/* Bottom rule */}
        <div className="mt-8 h-px bg-red-800 opacity-50" />
        <p className="font-body text-xs text-stone-600 mt-4">
          Kháng chiến chống thực dân Pháp · 1945 – 1954
        </p>
      </div>
    </footer>
  )
}
