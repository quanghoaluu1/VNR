import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ─── Particle Canvas ──────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // create particles
    const N = 90
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.08,
      o: Math.random() * 0.6 + 0.1,
      gold: Math.random() < 0.25,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.gold
          ? `rgba(201,168,76,${p.o})`
          : `rgba(255,255,255,${p.o * 0.5})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

/* ─── Floating Orb ─────────────────────────────────────────────────── */
function FloatingOrb({ size, color, x, y, delay, blur }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        background: color,
        left: x, top: y,
        filter: `blur(${blur})`,
        opacity: 0.35,
      }}
      animate={{ y: [0, -30, 0], scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

/* ─── Animated Text Lines ───────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const line = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

/* ─── HeroSection ───────────────────────────────────────────────────── */
export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0A0500' }}
    >
      {/* ─── BG VIDEO ─────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: bgScale, transformOrigin: 'center' }}
      >
        <video
          autoPlay loop muted playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover"
          style={{ opacity: videoLoaded ? 0.28 : 0, transition: 'opacity 1.5s ease' }}
          src="/vietnam-flag-loop.mp4"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(10,5,0,0.5) 60%, rgba(10,5,0,0.95) 100%),
            linear-gradient(to bottom, rgba(10,5,0,0.7) 0%, rgba(10,5,0,0.2) 40%, rgba(10,5,0,0.6) 80%, rgba(10,5,0,0.98) 100%)
          `
        }} />
      </motion.div>

      {/* ─── PARTICLES ─────────────────────────────────────────── */}
      <ParticleCanvas />

      {/* ─── AMBIENT ORBS ─────────────────────────────────────── */}
      <FloatingOrb size="600px" color="radial-gradient(circle, #8B0000, transparent)" x="-10%" y="5%" delay={0} blur="80px" />
      <FloatingOrb size="500px" color="radial-gradient(circle, #C9A84C, transparent)" x="65%" y="50%" delay={2.5} blur="90px" />
      <FloatingOrb size="400px" color="radial-gradient(circle, #5A1010, transparent)" x="30%" y="60%" delay={1.2} blur="70px" />

      {/* ─── CORNER ORNAMENTS ─────────────────────────────────── */}
      {[
        'top-6 left-6 border-t-2 border-l-2',
        'top-6 right-6 border-t-2 border-r-2',
        'bottom-6 left-6 border-b-2 border-l-2',
        'bottom-6 right-6 border-b-2 border-r-2',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-12 h-12 border-yellow-500 ${cls}`}
          style={{ zIndex: 5 }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
        />
      ))}

      {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center px-6"
        style={{ y: contentY }}
      >
        {/* Year pill */}
        <motion.div
          className="inline-flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-500 opacity-60" />
          <span className="font-ui text-sm tracking-[0.4em] uppercase text-yellow-400 font-semibold"
            style={{ textShadow: '0 0 20px rgba(250,204,21,0.5)' }}>
            1945 &nbsp;—&nbsp; 1954
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-500 opacity-60" />
        </motion.div>

        {/* Animated title block */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Subtitle line */}
          <motion.p
            variants={line}
            className="font-body text-stone-400 text-xl md:text-2xl italic mb-4"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            Từ{' '}
            <span className="text-yellow-300 not-italic font-semibold"
              style={{ textShadow: '0 0 20px rgba(253,224,71,0.4)' }}>
              "Ngàn cân treo sợi tóc"
            </span>
          </motion.p>

          {/* Small connector */}
          <motion.p variants={line} className="font-body text-stone-500 text-lg md:text-xl italic mb-4">
            đến chiến thắng
          </motion.p>

          {/* Main headline */}
          <motion.h1 variants={line}>
            <span
              className="font-display block text-6xl p-3 sm:text-7xl md:text-8xl lg:text-8xl font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F5E6C8 40%, #CC1111 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 40px rgba(204,17,17,0.4))',
              }}
            >
              "Chấn Động
            </span>
            <span
              className="font-display block pb-4   text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mt-1"
              style={{
                background: 'linear-gradient(135deg, #CC1111 0%, #F5E6C8 60%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(204,17,17,0.4))',
              }}
            >
              Địa Cầu"
            </span>
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            variants={line}
            className="flex items-center justify-center gap-5 my-8"
          >
            <span className="h-px w-20 opacity-30" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
            <span className="text-yellow-400 text-2xl" style={{ textShadow: '0 0 16px rgba(201,168,76,0.8)' }}>★</span>
            <span className="h-px w-20 opacity-30" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
          </motion.div>

          {/* Subtitle paragraph */}
          <motion.p
            variants={line}
            className="font-body text-stone-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto italic"
          >
            Hành trình lãnh đạo của Đảng Cộng sản Việt Nam trong cuộc kháng chiến trường kỳ
            {' '}<span className="text-yellow-200/80 not-italic font-semibold">chống thực dân Pháp (1945–1954)</span>,
            từ những ngày gian khó nhất đến chiến thắng Điện Biên Phủ lừng lẫy năm châu.
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <a href="#map-section" className="btn-gold rounded-full px-10 py-4 font-ui text-base tracking-widest uppercase font-medium">
            Khám phá hành trình
          </a>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="scroll-indicator" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ─── BOTTOM GRADIENT FADE ───────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
        zIndex: 8,
        background: 'linear-gradient(to bottom, transparent, #0A0500)'
      }} />
    </section>
  )
}
