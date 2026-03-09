import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const links = [
  { label: 'Hành trình kháng chiến', href: '#map-section' },
  { label: 'Bài học lịch sử',        href: '#lessons' },
]

const facts = [
  { value: '9',     label: 'Năm kháng chiến trường kỳ' },
  { value: '56',    label: 'Ngày đêm Điện Biên Phủ' },
  { value: '1954',  label: 'Năm toàn thắng' },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0A0500, #05020 0%)' }}
      role="contentinfo"
    >
      {/* Top gradient separator */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)'
      }} />

      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(139,0,0,0.12), transparent 60%)`
        }}
      />

      {/* Stats strip */}
      <motion.div
        className="relative border-b"
        style={{ borderColor: 'rgba(201,168,76,0.08)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-4">
          {facts.map((f, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
            >
              <p className="font-display font-black text-3xl md:text-4xl leading-none mb-1"
                style={{
                  background: 'linear-gradient(135deg, #E8C97A, #C9A84C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                {f.value}
              </p>
              <p className="font-ui text-[10px] tracking-widest uppercase text-stone-500">{f.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main footer body */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">

        {/* Star */}
        <motion.div
          className="text-yellow-500 text-3xl mb-6"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ textShadow: '0 0 20px rgba(201,168,76,0.6)' }}
        >
          ★
        </motion.div>

        {/* Logo / title */}
        <motion.h2
          className="font-display text-xl font-bold mb-1"
          style={{
            background: 'linear-gradient(135deg, #E8C97A, #C9A84C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Dự án Lịch sử Việt Nam
        </motion.h2>
        <p className="font-ui text-xs text-stone-600 tracking-[0.3em] uppercase mb-8">2026</p>

        {/* Nav links */}
        <div className="flex items-center justify-center gap-8 mb-8">
          {links.map((l, i) => (
            <motion.a
              key={i}
              href={l.href}
              className="font-ui text-xs text-stone-500 hover:text-yellow-400 tracking-widest uppercase transition-colors duration-200"
              whileHover={{ y: -2 }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
          marginBottom: '24px',
        }} />

        {/* Quote */}
        <p className="font-body text-sm text-stone-500 italic leading-relaxed max-w-sm mx-auto mb-2">
          "Dân tộc ta có một lòng nồng nàn yêu nước.
          Đó là một truyền thống quý báu của ta."
        </p>
        <p className="font-ui text-xs text-stone-600 mb-8">— Hồ Chí Minh</p>

        {/* Copyright */}
        <p className="font-ui text-[11px] text-stone-700 tracking-wider">
          Kháng chiến chống thực dân Pháp · 1945 – 1954
        </p>
      </div>
    </footer>
  )
}
