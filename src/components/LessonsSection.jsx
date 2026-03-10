import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const lessons = [
  {
    id: 1,
    num: '01',
    title: 'Đường lối đúng đắn',
    subtitle: 'Vũ khí sắc bén nhất',
    icon: '⚔',
    color: '#C9A84C',
    glow: 'rgba(201,168,76,0.3)',
    description:
      'Đường lối kháng chiến "toàn dân, toàn diện, trường kỳ, tự lực cánh sinh" của Đảng và Chủ tịch Hồ Chí Minh là kim chỉ nam xuyên suốt, dẫn dắt toàn dân tộc vượt qua muôn vàn khó khăn, thử thách để đi đến chiến thắng.',
    quote: '"Kháng chiến nhất định thắng lợi"',
    stats: [
      { value: '9', label: 'Năm kháng chiến' },
      { value: '4', label: 'Phương châm chiến lược' },
    ],
  },
  {
    id: 2,
    num: '02',
    title: 'Sức mạnh đại đoàn kết',
    subtitle: 'Nguồn sức mạnh vô tận',
    icon: '✊',
    color: '#CC1111',
    glow: 'rgba(204,17,17,0.3)',
    description:
      'Cuộc kháng chiến thể hiện sức mạnh vô địch của khối đại đoàn kết toàn dân tộc. Từ chiến sĩ ngoài mặt trận đến đồng bào hậu phương, tất cả cùng chung một lòng "quyết tử cho Tổ quốc quyết sinh".',
    quote: '"Dân là gốc, dân là sức mạnh"',
    stats: [
      { value: '30M+', label: 'Đồng bào kháng chiến' },
      { value: '6', label: 'Dân tộc thiểu số tham gia' },
    ],
  },
  {
    id: 3,
    num: '03',
    title: 'Sức mạnh thời đại',
    subtitle: 'Kết hợp dân tộc và quốc tế',
    icon: '🌐',
    color: '#4A9ECC',
    glow: 'rgba(74,158,204,0.3)',
    description:
      'Cuộc kháng chiến của Việt Nam nhận được sự đồng tình, ủng hộ rộng rãi của phong trào giải phóng dân tộc và các lực lượng hòa bình trên toàn thế giới, kết hợp sức mạnh dân tộc với sức mạnh thời đại.',
    quote: '"Việt Nam không cô đơn"',
    stats: [
      { value: '54', label: 'Quốc gia ủng hộ' },
      { value: '1954', label: 'Hiệp định Genève' },
    ],
  },
]

function LessonCard({ lesson, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: lesson.glow }}
      />

      <div
        className="relative glass rounded-2xl p-7 h-full overflow-hidden flex flex-col transition-transform duration-300 group-hover:-translate-y-1"
        style={{ border: `1px solid rgba(${lesson.id === 1 ? '201,168,76' : lesson.id === 2 ? '204,17,17' : '74,158,204'},0.15)` }}
      >
        {/* Decorative large number */}
        <div
          className="absolute -top-2 -right-2 font-display text-8xl font-black leading-none select-none pointer-events-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: `1px ${lesson.color}20`,
          }}
        >
          {lesson.num}
        </div>

        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${lesson.color}, transparent)` }}
        />

        {/* Icon */}
        <div
          className="text-3xl mb-5 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `rgba(${lesson.id === 1 ? '201,168,76' : lesson.id === 2 ? '204,17,17' : '74,158,204'},0.12)`,
            border: `1px solid ${lesson.color}30`,
            boxShadow: `0 0 20px ${lesson.glow}`,
          }}
        >
          {lesson.icon}
        </div>

        {/* Subtitle */}
        <p className="font-ui text-[10px] tracking-[0.3em] uppercase font-semibold mb-2"
          style={{ color: lesson.color }}>
          {lesson.subtitle}
        </p>

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl font-bold text-stone-100 mb-4 leading-tight">
          {lesson.title}
        </h3>

        {/* Divider */}
        <div className="w-10 h-px mb-4" style={{ background: `linear-gradient(to right, ${lesson.color}, transparent)` }} />

        {/* Description */}
        <p className="font-body flex-grow text-base text-stone-400 leading-relaxed mb-5">
          {lesson.description}
        </p>
<div className='mt-auto'>
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {lesson.stats.map((stat, i) => (
            <div key={i} className="rounded-lg p-3 text-center"
              style={{ background: `${lesson.color}08`, border: `1px solid ${lesson.color}15` }}>
              <p className="font-display font-bold text-2xl leading-none mb-1" style={{ color: lesson.color }}>
                {stat.value}
              </p>
              <p className="font-ui text-xs text-stone-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="border-l-2 pl-4 italic"
          style={{ borderColor: lesson.color }}>
          <p className="font-body text-sm font-semibold" style={{ color: lesson.color }}>
            {lesson.quote}
          </p>
        </blockquote>
        </div>
        {/* Bottom scan line animation */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(to right, ${lesson.color}, transparent)` }}
        />
      </div>
    </motion.div>
  )
}

export default function LessonsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0A0500 0%, #0D0700 50%, #0A0500 100%)' }}
    >
      {/* Moving background grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </motion.div>

      {/* Top border */}
      <div className="section-divider mb-20 max-w-6xl mx-auto" />

      <div ref={headerRef} className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            className="rule-gold max-w-xs mx-auto mb-5"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-ui text-[11px] tracking-[0.4em] uppercase px-4 font-semibold"
              style={{ color: '#C9A84C' }}>
              Giá trị lâu bền
            </span>
          </motion.div>

          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #fff 0%, #E8DCC8 40%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Bài Học Lịch Sử
            </span>
          </motion.h2>

          <motion.p
            className="font-body text-stone-500 italic max-w-xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Những bài học từ cuộc kháng chiến chống Pháp{' '}
            <span className="text-yellow-500/80 not-italic">(1945–1954)</span>{' '}
            còn nguyên giá trị trong sự nghiệp xây dựng và bảo vệ Tổ quốc hôm nay.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {lessons.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="font-display text-xl italic text-stone-500 max-w-2xl mx-auto leading-relaxed">
            "Dân tộc ta có một lòng nồng nàn yêu nước.{' '}
            <span className="text-yellow-400/80">Đó là một truyền thống quý báu của ta.</span>"
          </p>
          <p className="font-ui text-sm text-stone-600 mt-3 tracking-wider">— Hồ Chí Minh</p>
        </motion.div>
      </div>
    </section>
  )
}
