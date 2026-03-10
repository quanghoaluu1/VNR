const factors = [
  {
    id: 1,
    icon: '🧭',
    title: 'Lãnh đạo đúng đắn, sáng tạo',
    description:
      'Đảng đề ra đường lối kháng chiến và kiến quốc phù hợp thực tiễn, biết chớp thời cơ và hóa giải các nguy cơ hiểm nghèo.',
  },
  {
    id: 2,
    icon: '✊',
    title: 'Sức mạnh đại đoàn kết dân tộc',
    description:
      'Thông qua Mặt trận Việt Minh và Liên Việt, Đảng quy tụ mọi tầng lớp nhân dân, tạo nên sức mạnh "vô địch" cho chiến tranh nhân dân.',
  },
  {
    id: 3,
    icon: '⚔️',
    title: 'Ba thứ quân vũ trang',
    description:
      'Bộ đội chủ lực, bộ đội địa phương và dân quân du kích phát triển mạnh mẽ, trở thành nòng cốt cho toàn dân đánh giặc.',
  },
  {
    id: 4,
    icon: '🌾',
    title: 'Kháng chiến gắn kiến quốc',
    description:
      'Đảng không chỉ đánh giặc mà chăm lo xây dựng chế độ mới, cải cách ruộng đất để huy động tối đa nguồn lực từ nhân dân.',
  },
  {
    id: 5,
    icon: '🌐',
    title: 'Đoàn kết quốc tế',
    description:
      'Sự ủng hộ của Liên Xô, Trung Quốc và các lực lượng tiến bộ trên thế giới là nhân tố quan trọng giúp Việt Nam tăng cường thực lực.',
  },
]

function FactorCard({ factor, index }) {
  return (
    <div className="h-full relative bg-stone-900/40 border border-stone-700/30 rounded-xl p-6 flex flex-col gap-3 hover:border-yellow-700/40 transition-colors duration-300">
      {/* Top row: icon + number */}
      <div className="flex items-start justify-between">
        <span className="text-2xl">{factor.icon}</span>
        <span className="font-display text-stone-600 font-bold text-lg leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-base md:text-lg font-bold text-yellow-100 leading-snug">
        {factor.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-stone-400 leading-relaxed">
        {factor.description}
      </p>
    </div>
  )
}

export default function VictoryFactorsSection() {
  return (
    <section className="paper-bg relative py-20 md:py-28 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-red-800 opacity-20" />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="rule-red max-w-xs mx-auto mb-4">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-red-800 opacity-70 px-3">
              Phân tích
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-100 mb-4">
            5 Yếu Tố Quyết Định Thắng Lợi
          </h2>

          <p className="font-body text-stone-500 italic max-w-xl mx-auto leading-relaxed">
            Sức mạnh tổng hợp đã làm nên kỳ tích lịch sử
          </p>
        </div>

        {/* Cấu trúc Grid 12 cột mới */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {factors.map((factor, i) => (
            <div 
              key={factor.id} 
              className={`md:col-span-4 ${i === 3 ? 'md:col-start-3' : ''}`}
            >
              <FactorCard factor={factor} index={i} />
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-red-800 opacity-20" />
    </section>
  )
}
