const lessons = [
  {
    id: 1,
    title: 'Đường lối đúng đắn',
    subtitle: 'Vũ khí sắc bén nhất',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
        <path d="M24 4 L24 44 M4 24 L44 24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <path d="M24 8 L26 18 L24 16 L22 18 Z" fill="currentColor" />
      </svg>
    ),
    description:
      'Đường lối kháng chiến "toàn dân, toàn diện, trường kỳ, tự lực cánh sinh" của Đảng và Chủ tịch Hồ Chí Minh là kim chỉ nam xuyên suốt, dẫn dắt toàn dân tộc vượt qua muôn vàn khó khăn, thử thách để đi đến chiến thắng cuối cùng.',
    quote: '"Kháng chiến nhất định thắng lợi"',
  },
  {
    id: 2,
    title: 'Sức mạnh đại đoàn kết',
    subtitle: 'Nguồn sức mạnh vô tận',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="16" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="32" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 38 C4 28 10 24 16 24 L32 24 C38 24 44 28 44 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 24 L24 20 L28 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description:
      'Cuộc kháng chiến thể hiện sức mạnh vô địch của khối đại đoàn kết toàn dân tộc. Từ chiến sĩ ngoài mặt trận đến đồng bào hậu phương, từ miền xuôi đến miền ngược, tất cả cùng chung một lòng "quyết tử cho Tổ quốc quyết sinh".',
    quote: '"Dân là gốc, dân là sức mạnh"',
  },
  {
    id: 3,
    title: 'Sức mạnh thời đại',
    subtitle: 'Kết hợp dân tộc và quốc tế',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="24" cy="24" rx="10" ry="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M6 24 L42 24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M8 15 C14 17 20 18 24 18 C28 18 34 17 40 15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M8 33 C14 31 20 30 24 30 C28 30 34 31 40 33" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      </svg>
    ),
    description:
      'Cuộc kháng chiến của Việt Nam nhận được sự đồng tình, ủng hộ rộng rãi của phong trào giải phóng dân tộc và các lực lượng hòa bình, dân chủ trên toàn thế giới, kết hợp sức mạnh dân tộc với sức mạnh thời đại thành một sức mạnh tổng hợp to lớn.',
    quote: '"Việt Nam không cô đơn"',
  },
]

export default function LessonsSection() {
  return (
    <section className="paper-bg relative py-20 md:py-28 px-6">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-red-800 opacity-20" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="rule-red max-w-xs mx-auto mb-4">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-red-800 opacity-70 px-3">
              Giá trị lâu bền
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-red-900 mb-4">
            Bài học Lịch sử
          </h2>

          <p className="font-body text-stone-500 italic max-w-xl mx-auto leading-relaxed">
            Những bài học từ cuộc kháng chiến chống Pháp (1945–1954) còn nguyên giá trị
            trong sự nghiệp xây dựng và bảo vệ Tổ quốc hôm nay.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {lessons.map((lesson, i) => (
            <div
              key={lesson.id}
              className="group relative bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              style={{
                borderTop: '3px solid #991b1b',
              }}
            >
              {/* Card inner */}
              <div className="p-7">
                {/* Icon */}
                <div
                  className="text-red-800 mb-5 opacity-80 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  {lesson.icon}
                </div>

                {/* Number */}
                <p className="font-display text-5xl font-black text-stone-100 absolute top-5 right-6 leading-none select-none">
                  0{i + 1}
                </p>

                {/* Subtitle */}
                <p className="font-body text-xs tracking-[0.2em] uppercase text-yellow-700 font-semibold mb-2">
                  {lesson.subtitle}
                </p>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl font-bold text-red-900 mb-4 leading-tight">
                  {lesson.title}
                </h3>

                {/* Divider */}
                <div className="w-10 h-0.5 bg-red-800 opacity-40 mb-4" />

                {/* Description */}
                <p className="font-body text-sm text-stone-600 leading-relaxed">
                  {lesson.description}
                </p>

                {/* Quote */}
                <blockquote className="mt-5 border-l-2 border-yellow-600 pl-3">
                  <p className="font-body text-xs italic text-yellow-700 font-semibold">
                    {lesson.quote}
                  </p>
                </blockquote>
              </div>

              {/* Hover bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-800 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
