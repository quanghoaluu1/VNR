import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'
const VIETNAM_ID = '704'
const DEFAULT_CENTER = [106, 16]
const DEFAULT_ZOOM   = 1

// ─── Locations ──────────────────────────────────────────────────────────────
const locations = [
  {
    id: 1,
    title: 'Hà Nội',
    year: '1945',
    badge: 'Khai sinh',
    badgeColor: '#C9A84C',
    coordinates: [105.85, 21.02],
    zoom: 4,
    image_placeholder_url: '/ba_dinh.jpg',
    image_label: 'Quảng trường Ba Đình, Hà Nội',
    short_description:
      'Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    long_description:
      'Ngày 2 tháng 9 năm 1945, trước hàng chục vạn đồng bào tề tựu về Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh thay mặt Chính phủ Lâm thời đọc bản Tuyên ngôn Độc lập — văn kiện lịch sử khẳng định quyền độc lập, tự do của dân tộc Việt Nam, chấm dứt hơn 80 năm đô hộ của thực dân Pháp.\n\nTuy nhiên, chính quyền non trẻ ngay lập tức phải đối mặt với "ngàn cân treo sợi tóc": nạn đói khủng khiếp hoành hành miền Bắc; hơn 20 vạn quân Tưởng kéo vào với danh nghĩa giải giáp quân Nhật; quân Pháp trở lại miền Nam. Với sách lược "dĩ bất biến, ứng vạn biến", Đảng vừa hòa hoãn có nguyên tắc vừa khẩn trương chuẩn bị lực lượng cho cuộc kháng chiến lâu dài.',
    stats: [
      { v: '2/9', l: 'Ngày Độc lập' },
      { v: '80+', l: 'Năm đô hộ kết thúc' },
    ],
  },
  {
    id: 2,
    title: 'Hải Phòng',
    year: '1946',
    badge: 'Toàn quốc kháng chiến',
    badgeColor: '#CC1111',
    coordinates: [106.68, 20.86],
    zoom: 4,
    image_placeholder_url: '/loi_keu_goi.jpg',
    image_label: 'Cảng Hải Phòng, 1946',
    short_description:
      'Tháng 11/1946, Pháp gây thảm sát tại Hải Phòng, châm ngòi cho Lời kêu gọi Toàn quốc Kháng chiến ngày 19/12/1946.',
    long_description:
      'Mặc dù Hiệp định Sơ bộ (6/3/1946) và Tạm ước (14/9/1946) đã được ký kết, thực dân Pháp không từ bỏ dã tâm tái chiếm Việt Nam. Ngày 20/11/1946, chúng gây xung đột vũ trang nghiêm trọng tại Hải Phòng, sử dụng pháo hạm bắn phá khu dân cư, tàn sát hàng nghìn thường dân vô tội.\n\nTrước tình hình đó, ngày 19/12/1946, Chủ tịch Hồ Chí Minh ra "Lời kêu gọi toàn quốc kháng chiến" lịch sử: "Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ." Tiếng súng kháng chiến đồng loạt nổ ra khắp cả nước trong đêm 19/12/1946, mở đầu cuộc trường kỳ kháng chiến 9 năm.',
    stats: [
      { v: '19/12', l: 'Ngày kháng chiến' },
      { v: '9 năm', l: 'Trường kỳ kháng chiến' },
    ],
  },
  {
    id: 3,
    title: 'Việt Bắc',
    year: '1947–1950',
    badge: 'Căn cứ địa',
    badgeColor: '#4A9050',
    coordinates: [105.84, 21.59],
    zoom: 4,
    image_placeholder_url: 'viet_bac.jpg',
    image_label: 'Chiến khu Việt Bắc, 1947',
    short_description:
      'Chiến khu Việt Bắc là trung tâm đầu não kháng chiến. Quân dân ta đã đập tan cuộc tấn công Thu-Đông 1947 của Pháp.',
    long_description:
      'Căn cứ địa Việt Bắc — trải dài trên 6 tỉnh Cao Bằng, Bắc Kạn, Lạng Sơn, Thái Nguyên, Tuyên Quang, Hà Giang — là trung tâm đầu não và hậu phương vững chắc của cuộc kháng chiến. Mùa Thu 1947, Pháp huy động hơn 12.000 quân tinh nhuệ mở cuộc hành quân quy mô lớn nhằm tiêu diệt cơ quan lãnh đạo kháng chiến.\n\nDưới sự lãnh đạo sáng suốt của Đảng, quân và dân ta chặn đánh địch từ nhiều hướng, tiêu diệt hơn 7.200 tên, đập tan hoàn toàn cuộc tấn công. Đến 1950, chiến dịch Biên giới Thu-Đông giành thắng lợi vang dội: giải phóng dải biên giới hơn 750 km, khai thông đường liên lạc quốc tế.',
    stats: [
      { v: '7.200+', l: 'Địch bị tiêu diệt' },
      { v: '750km', l: 'Biên giới giải phóng' },
    ],
  },
  {
    id: 4,
    title: 'Điện Biên Phủ',
    year: '1954',
    badge: 'Chiến thắng lịch sử',
    badgeColor: '#CC1111',
    coordinates: [103.01, 21.39],
    zoom: 4,
    image_placeholder_url: '/dien_bien_phu.jpg',
    image_label: 'Tập đoàn cứ điểm Điện Biên Phủ, 1954',
    short_description:
      'Sau 56 ngày đêm chiến đấu (13/3–7/5/1954), quân ta toàn thắng tại Điện Biên Phủ, buộc Pháp ký Hiệp định Genève.',
    long_description:
      'Đầu năm 1954, Pháp xây dựng Điện Biên Phủ thành tập đoàn cứ điểm kiên cố nhất Đông Dương với 49 cứ điểm, 16.000 quân — mệnh danh "pháo đài bất khả xâm phạm". Đại tướng Võ Nguyên Giáp đã có quyết định lịch sử: thay đổi phương châm từ "đánh nhanh, thắng nhanh" sang "đánh chắc, tiến chắc".\n\nSau 56 ngày đêm chiến đấu kiên cường (13/3 – 7/5/1954), quân và dân ta tiêu diệt và bắt sống toàn bộ tập đoàn cứ điểm, bắt sống tướng De Castries cùng ban chỉ huy. Chiến thắng "lừng lẫy năm châu, chấn động địa cầu" buộc Pháp ký Hiệp định Genève (21/7/1954), chấm dứt 9 năm kháng chiến trường kỳ.',
    stats: [
      { v: '56', l: 'Ngày đêm chiến đấu' },
      { v: '49', l: 'Cứ điểm bị phá hủy' },
    ],
  },
]

// ─── Spring hook ─────────────────────────────────────────────────────────────
const SPRING_K = 5.5

function useMapSpring(targetCenter, targetZoom) {
  const animRef = useRef({ cx: targetCenter[0], cy: targetCenter[1], z: targetZoom, rafId: null })
  const [display, setDisplay] = useState({ center: targetCenter, zoom: targetZoom })

  useEffect(() => {
    const anim        = animRef.current
    const [tcx, tcy]  = targetCenter
    const tz          = targetZoom
    if (anim.rafId) cancelAnimationFrame(anim.rafId)
    let lastTime = performance.now()
    function step(time) {
      const dt     = Math.min(time - lastTime, 50)
      lastTime     = time
      const factor = 1 - Math.exp(-SPRING_K * dt / 1000)
      anim.cx += (tcx - anim.cx) * factor
      anim.cy += (tcy - anim.cy) * factor
      anim.z  += (tz  - anim.z)  * factor
      const done =
        Math.abs(anim.cx - tcx) < 0.0001 &&
        Math.abs(anim.cy - tcy) < 0.0001 &&
        Math.abs(anim.z  - tz)  < 0.001
      if (done) {
        anim.cx = tcx; anim.cy = tcy; anim.z = tz
        setDisplay({ center: [tcx, tcy], zoom: tz })
        return
      }
      setDisplay({ center: [anim.cx, anim.cy], zoom: anim.z })
      anim.rafId = requestAnimationFrame(step)
    }
    anim.rafId = requestAnimationFrame(step)
    return () => { if (anim.rafId) cancelAnimationFrame(anim.rafId) }
  }, [targetCenter[0], targetCenter[1], targetZoom]) // eslint-disable-line

  const snapTo = useCallback((cx, cy, z) => {
    const anim = animRef.current
    anim.cx = cx; anim.cy = cy; anim.z = z
    setDisplay({ center: [cx, cy], zoom: z })
  }, [])

  return { display, snapTo }
}

// ─── Timeline Card ────────────────────────────────────────────────────────────
function TimelineCard({ location, isActive, onClick, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        className={`group relative flex gap-4 cursor-pointer focus:outline-none event-card ${isActive ? 'active' : ''}`}
        aria-pressed={isActive}
      >
        {/* Timeline dot */}
        <div className="relative z-10 flex-shrink-0 pt-[1.1rem]">
          <motion.div
            className="w-3.5 h-3.5 rounded-full border-2 timeline-dot"
            animate={{
              backgroundColor: isActive ? '#C9A84C' : 'transparent',
              borderColor: isActive ? '#C9A84C' : 'rgba(201,168,76,0.3)',
              boxShadow: isActive ? '0 0 12px rgba(201,168,76,0.5)' : 'none',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Card body */}
        <div
          className={`flex-1 rounded-xl p-4 border transition-all duration-300 ${
            isActive
              ? 'border-yellow-500/30 bg-yellow-500/5'
              : 'border-yellow-500/5 bg-white/3 hover:border-yellow-500/15 hover:bg-white/5'
          }`}
          style={{
            boxShadow: isActive ? '0 0 20px rgba(201,168,76,0.08), inset 0 0 20px rgba(201,168,76,0.03)' : 'none',
          }}
        >
          {/* Year + Badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="font-ui text-sm text-yellow-500 font-semibold tracking-widest">
              {location.year}
            </p>
            <span
              className="badge"
              style={{
                background: `${location.badgeColor}18`,
                color: location.badgeColor,
                border: `1px solid ${location.badgeColor}30`,
              }}
            >
              {location.badge}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-display text-lg font-bold leading-tight mb-2 transition-colors ${
            isActive ? 'text-yellow-300' : 'text-stone-200'
          }`}>
            {location.title}
          </h3>

          {/* Short desc */}
          <p className={`font-body text-base leading-relaxed transition-colors ${
            isActive ? 'text-stone-300' : 'text-stone-500'
          }`}>
            {location.short_description}
          </p>

          {/* Status */}
          <p className={`font-ui text-sm mt-2.5 font-semibold tracking-wider transition-colors ${
            isActive ? 'text-yellow-400' : 'text-stone-600'
          }`}>
            {isActive ? '◆ Đang hiển thị' : 'Nhấp để khám phá →'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ location, onClose }) {
  return (
    <motion.div
      key={location.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-full"
      style={{ background: 'linear-gradient(to bottom, #0D0800, #0A0500)' }}
    >
      {/* Image */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: '36%', minHeight: 180 }}>
        <img
          src={location.image_placeholder_url}
          alt={`${location.title} — ${location.year}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #3A0808 0%, #1A0A04 100%)'
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(10,5,0,0.6) 100%)'
        }} />
        {/* Year badge */}
        <span className="absolute bottom-3 left-3 font-ui text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded"
          style={{ background: `${location.badgeColor}cc`, color: '#fff', letterSpacing: '0.1em' }}>
          {location.year}
        </span>
        {/* Close */}
        <motion.button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white font-bold text-lg transition-colors"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ×
        </motion.button>
      </div>

      {/* Text content */}
      <div className="flex-1 overflow-y-auto scroll-col px-5 py-5">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-display text-2xl font-bold text-stone-100 leading-tight mb-1.5">
            {location.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-ui text-sm text-yellow-500 font-semibold">{location.year}</span>
            <span className="badge" style={{
              background: `${location.badgeColor}18`,
              color: location.badgeColor,
              border: `1px solid ${location.badgeColor}30`,
            }}>
              {location.badge}
            </span>
          </div>
        </div>

        {/* Accent line */}
        <div className="w-12 h-px mb-4" style={{
          background: `linear-gradient(to right, ${location.badgeColor}, transparent)`
        }} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {location.stats.map((s, i) => (
            <div key={i} className="rounded-lg p-2.5 text-center"
              style={{ background: `${location.badgeColor}0D`, border: `1px solid ${location.badgeColor}20` }}>
              <p className="font-display font-bold text-xl leading-none mb-1" style={{ color: location.badgeColor }}>
                {s.v}
              </p>
              <p className="font-ui text-[9px] text-stone-500 uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Long description */}
        <p className="font-body text-base text-stone-400 leading-relaxed whitespace-pre-line">
          {location.long_description}
        </p>

        {/* Caption */}
        <p className="font-body text-[10px] text-stone-600 italic mt-4 pb-2">
          {location.image_label}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Map View ─────────────────────────────────────────────────────────────────
function MapView({ activeId, mapCenter, mapZoom, onMarkerClick, onZoomIn, onZoomOut, onZoomReset, onUserMove }) {
  const { display: { center: displayCenter, zoom: displayZoom }, snapTo } = useMapSpring(mapCenter, mapZoom)

  const handleMoveEnd = useCallback(({ coordinates, zoom }) => {
    snapTo(coordinates[0], coordinates[1], zoom)
    onUserMove(coordinates, zoom)
  }, [snapTo, onUserMove])

  return (
    <div className="relative w-full h-full" style={{
      background: 'linear-gradient(135deg, #0D1520 0%, #0A1018 50%, #0D1520 100%)'
    }}>
      {/* Map container */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [106, 17], scale: 1800 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup
          center={displayCenter}
          zoom={displayZoom}
          onMoveEnd={handleMoveEnd}
          filterZoomEvent={(e) => e.type !== 'wheel'}
          transitionDuration={0}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isVietnam = String(geo.id) === VIETNAM_ID
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isVietnam ? '#1E2D3D' : '#141D29'}
                    stroke={isVietnam ? '#3A5A7A' : '#1E2A38'}
                    strokeWidth={isVietnam ? 0.8 : 0.3}
                    style={{
                      default: { outline: 'none' },
                      hover:   { outline: 'none', fill: isVietnam ? '#253D52' : '#141D29' },
                      pressed: { outline: 'none' },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {locations.map((loc) => {
            const isActive = loc.id === activeId
            const dotR    = (isActive ? 6 : 4) / displayZoom
            const glowR   = (isActive ? 10 : 6) / displayZoom
            const pulseR  = 12 / displayZoom
            const strokeW = 1.5 / displayZoom
            const textSz  = (isActive ? 16 : 13) / displayZoom
            const labelY  = -15 / displayZoom

            return (
              <Marker key={loc.id} coordinates={loc.coordinates}>
                {/* Double pulse ring for active */}
                {isActive && (
                  <>
                    <circle r={pulseR} fill="none" stroke={loc.badgeColor} strokeWidth={strokeW} className="pulse-ring" />
                    <circle r={pulseR * 0.7} fill="none" stroke={loc.badgeColor} strokeWidth={strokeW * 0.7} className="pulse-ring-2" />
                  </>
                )}

                {/* Glow halo */}
                <circle
                  r={glowR}
                  fill={loc.badgeColor}
                  fillOpacity={isActive ? 0.15 : 0.05}
                  style={{ transition: 'fill-opacity 0.4s ease' }}
                />

                {/* Dot */}
                <circle
                  r={dotR}
                  fill={isActive ? loc.badgeColor : '#AA3333'}
                  stroke={isActive ? '#fff' : '#88AABB'}
                  strokeWidth={strokeW}
                  style={{ cursor: 'pointer', transition: 'fill 0.35s ease, r 0.35s ease' }}
                  onClick={(e) => { e.stopPropagation(); onMarkerClick(loc.id) }}
                />

                {/* Label */}
                <text
                  textAnchor="middle"
                  y={labelY}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: textSz,
                    fill: isActive ? '#E8C97A' : '#7A9AB0',
                    fontWeight: isActive ? '700' : '400',
                    pointerEvents: 'none',
                    letterSpacing: isActive ? '0.05em' : '0',
                  }}
                >
                  {loc.title}
                </text>
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-1.5 z-10">
        {[
          { label: '+', title: 'Phóng to', action: onZoomIn },
          { label: '−', title: 'Thu nhỏ',  action: onZoomOut },
          { label: '⟳', title: 'Đặt lại',  action: onZoomReset },
        ].map(({ label, title, action }) => (
          <motion.button
            key={label}
            onClick={action}
            title={title}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm transition-all"
            style={{
              background: 'rgba(13,20,30,0.9)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: '#C9A84C',
              backdropFilter: 'blur(8px)',
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Overview hint */}
      <AnimatePresence>
        {!activeId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <span className="font-ui text-[11px] tracking-widest whitespace-nowrap px-4 py-2 rounded-full"
              style={{
                background: 'rgba(13,20,30,0.85)',
                border: '1px solid rgba(201,168,76,0.15)',
                color: 'rgba(201,168,76,0.7)',
                backdropFilter: 'blur(8px)',
              }}>
              ← Chọn một mốc lịch sử để phóng to bản đồ
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function InteractiveMapSection() {
  const [activeId,  setActiveId]  = useState(null)
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER)
  const [mapZoom,   setMapZoom]   = useState(DEFAULT_ZOOM)

  const sectionRef = useRef(null)
  const headerInView = useInView(sectionRef, { once: true, margin: '-60px' })

  const handleSelect = useCallback((id) => {
    setActiveId((prev) => {
      const newId = prev === id ? null : id
      const loc   = locations.find((l) => l.id === newId)
      setMapCenter(loc?.coordinates ?? DEFAULT_CENTER)
      setMapZoom(loc?.zoom          ?? DEFAULT_ZOOM)
      return newId
    })
  }, [])

  const activeLocation = locations.find((l) => l.id === activeId) ?? null

  const handleZoomIn    = () => setMapZoom((z) => Math.min(10, z * 1.5))
  const handleZoomOut   = () => setMapZoom((z) => Math.max(0.5, z / 1.5))
  const handleZoomReset = () => {
    const loc = locations.find((l) => l.id === activeId)
    setMapCenter(loc?.coordinates ?? DEFAULT_CENTER)
    setMapZoom(loc?.zoom          ?? DEFAULT_ZOOM)
  }
  const handleUserMove = useCallback((center, zoom) => {
    setMapCenter(center)
    setMapZoom(zoom)
  }, [])

  return (
    <section
      id="map-section"
      className="relative"
      style={{ background: 'linear-gradient(to bottom, #0A0500 0%, #080D14 30%, #0A0500 100%)' }}
    >
      {/* Top gradient from hero */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />

      {/* ─── Section header ──────────────────────────────────── */}
      <div ref={sectionRef} className="relative z-10 px-6 py-16 text-center">
        <motion.div
          className="rule-gold max-w-xs mx-auto mb-5"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-ui text-[11px] tracking-[0.4em] uppercase px-4 font-semibold text-yellow-600">
            Bản đồ kháng chiến
          </span>
        </motion.div>

        <motion.h2
          className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background: 'linear-gradient(135deg, #fff 0%, #E8DCC8 40%, #C9A84C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Hành Trình Kháng Chiến
        </motion.h2>

        <motion.p
          className="font-body text-stone-500 text-base italic"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Chọn một mốc lịch sử — bản đồ sẽ phóng to vào địa điểm và hiển thị chi tiết sự kiện
        </motion.p>
      </div>

      {/* ─── 3-column layout ─────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '100vh' }}>

        {/* LEFT: Timeline */}
        <div
          className="w-full lg:w-[32%] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto scroll-col"
          style={{ borderRight: '1px solid rgba(201,168,76,0.06)' }}
        >
          <div className="px-5 py-8 md:px-6">
            {/* Column header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3))' }} />
              <p className="font-ui text-[10px] tracking-[0.3em] uppercase text-yellow-600/60 whitespace-nowrap font-semibold">
                Các mốc sự kiện
              </p>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.3))' }} />
            </div>

            {/* Timeline items */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[0.8125rem] top-5 bottom-5 w-px timeline-line"
                aria-hidden="true"
              />

              <div className="space-y-4">
                {locations.map((loc, i) => (
                  <TimelineCard
                    key={loc.id}
                    location={loc}
                    isActive={loc.id === activeId}
                    onClick={() => handleSelect(loc.id)}
                    index={i}
                  />
                ))}
              </div>
            </div>

            {/* Idle prompt */}
            <AnimatePresence>
              {!activeId && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-body text-xs text-stone-600 text-center mt-8 italic"
                >
                  Nhấp vào một mốc để bắt đầu khám phá
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MIDDLE: Map */}
        <div
          className="relative w-full lg:sticky lg:top-0 lg:h-screen overflow-hidden transition-all duration-500"
          style={{
            minHeight: '60vh',
            flex: activeLocation ? '0 0 40%' : '1 1 0%',
          }}
        >
          <MapView
            activeId={activeId}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            onMarkerClick={handleSelect}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onZoomReset={handleZoomReset}
            onUserMove={handleUserMove}
          />
        </div>

        {/* RIGHT: Detail Panel */}
        <AnimatePresence>
          {activeLocation && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-0 lg:h-screen overflow-hidden"
              style={{
                maxWidth: '28%',
                borderLeft: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              <DetailPanel
                key={activeLocation.id}
                location={activeLocation}
                onClose={() => setActiveId(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom gradient */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)', marginTop: 40 }} />
    </section>
  )
}
