const factors = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        {/* Star/compass leadership icon */}
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.25" />
        <path d="M24 6 L26.5 20 L24 18 L21.5 20 Z" fill="currentColor" />
        <path d="M24 42 L21.5 28 L24 30 L26.5 28 Z" fill="currentColor" fillOpacity="0.4" />
        <path d="M6 24 L20 21.5 L18 24 L20 26.5 Z" fill="currentColor" fillOpacity="0.4" />
        <path d="M42 24 L28 26.5 L30 24 L28 21.5 Z" fill="currentColor" fillOpacity="0.4" />
        <circle cx="24" cy="24" r="3.5" fill="currentColor" />
      </svg>
    ),
    title: 'Sự lãnh đạo đúng đắn, sáng tạo của Đảng',
    description:
      'Đảng đã đề ra đường lối kháng chiến và kiến quốc phù hợp với thực tiễn, biết chớp thời cơ và hóa giải các nguy cơ hiểm nghèo.',
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        {/* Unity / people holding hands */}
        <circle cx="12" cy="13" r="5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="24" cy="11" r="5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="36" cy="13" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 38 C2 28 7 24 12 24 L24 24 L36 24 C41 24 46 28 46 38"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 24 L24 20 L36 24" stroke="currentColor" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Sức mạnh đại đoàn kết dân tộc',
    description:
      'Thông qua Mặt trận Việt Minh và Liên Việt, Đảng đã quy tụ được mọi tầng lớp nhân dân, tạo nên sức mạnh "vô địch" cho cuộc chiến tranh nhân dân.',
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        {/* Three-tier military shield */}
        <path d="M24 4 L40 10 L40 26 C40 35 33 42 24 44 C15 42 8 35 8 26 L8 10 Z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M24 12 L33 16 L33 26 C33 31 29 35 24 37 C19 35 15 31 15 26 L15 16 Z"
          fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M19 24 L22.5 27.5 L29 21" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Xây dựng lực lượng vũ trang ba thứ quân',
    description:
      'Bộ đội chủ lực, bộ đội địa phương và dân quân du kích phát triển mạnh mẽ, trở thành nòng cốt cho toàn dân đánh giặc.',
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        {/* Balance / dual combination icon */}
        <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.4" />
        <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8"  cy="18" r="5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="40" cy="18" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 23 L8 32 C8 35 10 37 13 37 L35 37 C38 37 40 35 40 32 L40 23"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
        <circle cx="24" cy="7"  r="2.5" fill="currentColor" />
      </svg>
    ),
    title: 'Sự kết hợp giữa kháng chiến và kiến quốc',
    description:
      'Đảng không chỉ đánh giặc mà còn chăm lo xây dựng chế độ mới, thực hiện cải cách ruộng đất để huy động tối đa nguồn lực của nhân dân.',
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" aria-hidden="true">
        {/* Globe / international solidarity */}
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="24" cy="24" rx="9" ry="18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        <line x1="6"  y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        <path d="M8 15 C14 17 20 18 24 18 C28 18 34 17 40 15"
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        <path d="M8 33 C14 31 20 30 24 30 C28 30 34 31 40 33"
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        {/* Small handshake / link dots */}
        <circle cx="16" cy="24" r="2" fill="currentColor" fillOpacity="0.7" />
        <circle cx="32" cy="24" r="2" fill="currentColor" fillOpacity="0.7" />
        <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      </svg>
    ),
    title: 'Đoàn kết quốc tế',
    description:
      'Sự ủng hộ, giúp đỡ của Liên Xô, Trung Quốc và các lực lượng tiến bộ trên thế giới là nhân tố quan trọng để Việt Nam tăng cường thực lực.',
  },
]

export default function VictoryFactorsSection() {
  return (
    <section className="paper-bg relative py-20 md:py-28 px-6">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-red-800 opacity-20" />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="rule-red max-w-xs mx-auto mb-4">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-red-800 opacity-70 px-3">
              Nhìn lại lịch sử
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-red-900 mb-4">
            Các yếu tố quyết định thắng lợi
          </h2>

          <p className="font-body text-stone-500 italic max-w-xl mx-auto leading-relaxed">
            Cuộc kháng chiến chống Pháp (1945–1954) thắng lợi nhờ sự hội tụ của nhiều nhân tố
            cơ bản, tạo thành sức mạnh tổng hợp không gì có thể ngăn cản.
          </p>
        </div>

        {/* Factors list */}
        <div className="space-y-5">
          {factors.map((factor, i) => (
            <div
              key={factor.id}
              className="group flex items-start gap-5 bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 px-7 py-6"
              style={{ borderLeft: '3px solid #991b1b' }}
            >
              {/* Index number */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
                <span className="font-display text-3xl font-black text-stone-100 leading-none select-none group-hover:text-red-100 transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Icon */}
              <div className="flex-shrink-0 text-red-800 opacity-80 group-hover:opacity-100 transition-opacity pt-1">
                {factor.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg md:text-xl font-bold text-red-900 leading-tight mb-2">
                  {factor.title}
                </h3>
                <div className="w-8 h-0.5 bg-red-800 opacity-30 mb-3" />
                <p className="font-body text-sm text-stone-600 leading-relaxed">
                  {factor.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <blockquote className="mt-12 mx-auto max-w-3xl border-l-4 border-red-800/50 pl-6 py-1">
          <p className="font-body text-base md:text-lg text-stone-700 italic leading-relaxed">
            "Từ một chính quyền non trẻ phải đối phó với muôn vàn thách thức, Đảng đã lãnh đạo dân tộc tự lực cánh sinh, từng bước thay đổi so sánh lực lượng để chuyển từ thế bị động, phòng ngự sang chủ động tiến công, đi đến thắng lợi hoàn toàn."
          </p>
        </blockquote>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-red-800 opacity-20" />
    </section>
  )
}
