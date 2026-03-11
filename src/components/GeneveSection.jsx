import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const keyFacts = [
  {
    date: '26/4/1954',
    title: 'Khai mạc Hội nghị',
    desc: 'Hội nghị Genève về Đông Dương chính thức khai mạc với sự tham gia của 9 bên, bàn về lập lại hòa bình tại Đông Dương.',
    icon: '🏛',
  },
  {
    date: '7/5/1954',
    title: 'Chiến thắng Điện Biên Phủ',
    desc: 'Chiến thắng lịch sử "lừng lẫy năm châu, chấn động địa cầu" tạo thế mạnh quyết định cho phái đoàn Việt Nam trên bàn đàm phán.',
    icon: '⚔',
  },
  {
    date: '21/7/1954',
    title: 'Ký kết Hiệp định',
    desc: 'Hiệp định Genève được ký kết, công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, Lào, Campuchia.',
    icon: '📜',
  },
]

const participants = [
  { name: 'Việt Nam DCCH', flag: '🇻🇳' },
  { name: 'Pháp', flag: '🇫🇷' },
  { name: 'Liên Xô', flag: '☭' },
  { name: 'Trung Quốc', flag: '🇨🇳' },
  { name: 'Anh', flag: '🇬🇧' },
  { name: 'Hoa Kỳ', flag: '🇺🇸' },
  { name: 'Quốc gia VN', flag: '⚜' },
  { name: 'Lào', flag: '🇱🇦' },
  { name: 'Campuchia', flag: '🇰🇭' },
]

function FactCard({ fact, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: 'rgba(201,168,76,0.12)' }}
      />

      <div
        className="relative rounded-xl p-6 h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02))',
          border: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <div
          className="absolute top-0 left-4 right-4 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
        />

        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.2)',
              boxShadow: '0 0 20px rgba(201,168,76,0.15)',
            }}
          >
            {fact.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="font-ui text-xs tracking-[0.3em] uppercase font-semibold mb-1"
              style={{ color: '#C9A84C' }}
            >
              {fact.date}
            </p>
            <h4 className="font-display text-lg font-bold text-stone-100 mb-2 leading-snug">
              {fact.title}
            </h4>
            <p className="font-body text-sm text-stone-400 leading-relaxed">
              {fact.desc}
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }}
        />
      </div>
    </motion.div>
  )
}

export default function GeneveSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const videoRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const videoInView = useInView(videoRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #060402 0%, #0A0704 30%, #0C0906 50%, #0A0704 70%, #060402 100%)',
      }}
    >
      {/* Background pattern */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      {/* Ambient radial glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.06), transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(139,0,0,0.06), transparent 60%)',
        }}
      />

      {/* Top separator */}
      <div className="section-divider max-w-6xl mx-auto mb-24" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <motion.div
            className="rule-gold max-w-xs mx-auto mb-5"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-ui text-[11px] tracking-[0.4em] uppercase px-4 font-semibold text-yellow-600">
              Ngoại giao &amp; Hòa bình
            </span>
          </motion.div>

          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
            initial={{ opacity: 0, y: 25 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #E8DCC8 40%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hội Nghị Genève 1954
          </motion.h2>

          <motion.p
            className="font-body text-stone-500 italic max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Thắng lợi trên bàn đàm phán —{' '}
            <span className="text-yellow-500/80 not-italic">kết thúc 9 năm</span>{' '}
            kháng chiến trường kỳ, buộc thực dân Pháp{' '}
            <span className="text-red-400/80 not-italic">
              công nhận độc lập, chủ quyền
            </span>{' '}
            của ba nước Đông Dương.
          </motion.p>
        </div>

        {/* Video Section */}
        <motion.div
          ref={videoRef}
          className="relative mb-20"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={videoInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative frame glow */}
          <div
            className="absolute -inset-3 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15), transparent 40%, transparent 60%, rgba(139,0,0,0.1))',
              filter: 'blur(20px)',
            }}
          />

          {/* Video container */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(201,168,76,0.2)',
              boxShadow: '0 0 60px rgba(201,168,76,0.08), 0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Corner ornaments */}
            {[
              'top-3 left-3 border-t border-l',
              'top-3 right-3 border-t border-r',
              'bottom-3 left-3 border-b border-l',
              'bottom-3 right-3 border-b border-r',
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-6 h-6 border-yellow-600/40 ${cls} z-10 pointer-events-none`}
              />
            ))}

            {/* Top decorative bar */}
            <div
              className="absolute top-0 left-0 right-0 h-px z-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
            />

            {/* 16:9 aspect ratio container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/2Qis0c3H5j4?rel=0&modestbranding=1&color=white"
                title="Hội nghị Genève 1954"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>

            {/* Bottom decorative bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px z-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
            />
          </div>

          {/* Caption */}
          <motion.p
            className="text-center mt-5 font-ui text-xs tracking-widest uppercase text-stone-600"
            initial={{ opacity: 0 }}
            animate={videoInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-px bg-yellow-700/50" />
              Tư liệu lịch sử — Hội nghị Genève 1954
              <span className="w-4 h-px bg-yellow-700/50" />
            </span>
          </motion.p>
        </motion.div>

        {/* Participants strip */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-center font-ui text-[10px] tracking-[0.4em] uppercase text-stone-600 mb-5">
            Các bên tham dự
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {participants.map((p, i) => (
              <motion.div
                key={p.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(201,168,76,0.04)',
                  border: '1px solid rgba(201,168,76,0.1)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{
                  borderColor: 'rgba(201,168,76,0.3)',
                  background: 'rgba(201,168,76,0.08)',
                }}
              >
                <span className="text-base">{p.flag}</span>
                <span className="font-ui text-xs text-stone-400 font-medium">{p.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Facts Timeline */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="rule-gold max-w-xs mx-auto mb-4">
              <span className="font-ui text-[10px] tracking-[0.4em] uppercase px-4 font-semibold text-yellow-600/70">
                Diễn biến
              </span>
            </div>
            <h3
              className="font-display text-3xl md:text-4xl font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #fff, #E8DCC8 50%, #C9A84C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Những Mốc Quan Trọng
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {keyFacts.map((fact, i) => (
              <FactCard key={i} fact={fact} index={i} />
            ))}
          </div>
        </div>

        {/* Significance quote block */}
        <motion.div
          className="relative max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.05), rgba(139,0,0,0.03))',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            <div
              className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
            />

            {/* Large decorative quote mark */}
            <div className="absolute -top-2 left-6 font-display text-6xl italic text-yellow-500/10 leading-none select-none pointer-events-none">
              "
            </div>

            <div className="relative">
              <p className="font-ui text-[10px] tracking-[0.4em] uppercase font-semibold mb-4" style={{ color: '#C9A84C' }}>
                Ý nghĩa lịch sử
              </p>
              <p className="font-display text-xl md:text-2xl italic text-stone-300 leading-relaxed mb-6">
                Hiệp định Genève đánh dấu{' '}
                <span className="text-yellow-300/80 not-italic font-semibold">thắng lợi to lớn</span>{' '}
                của nhân dân Việt Nam, buộc Pháp phải chấm dứt chiến tranh,{' '}
                <span className="text-red-400/80 not-italic font-semibold">rút quân khỏi Đông Dương</span>,
                mở ra một trang mới trong lịch sử dân tộc.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />
                <div className="flex gap-6">
                  {[
                    { value: '75', label: 'Ngày đàm phán' },
                    { value: '9', label: 'Bên tham dự' },
                    { value: '3', label: 'Nước Đông Dương' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="font-display text-2xl font-bold leading-none mb-1" style={{ color: '#C9A84C' }}>
                        {stat.value}
                      </p>
                      <p className="font-ui text-[9px] tracking-wider uppercase text-stone-600">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(201,168,76,0.3), transparent)' }} />
              </div>
            </div>

            <div className="absolute -bottom-6 right-6 font-display text-6xl italic text-yellow-500/10 leading-none select-none pointer-events-none">
              "
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
