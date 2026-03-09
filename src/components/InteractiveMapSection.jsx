import { useState, useCallback, useRef, useEffect } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'

const VIETNAM_ID = '704'

/**
 * DEFAULT_CENTER / DEFAULT_ZOOM — the "overview" view showing all of Vietnam.
 * When a milestone is selected, ZoomableGroup smoothly pans + zooms
 * to location.coordinates / location.zoom.  Setting activeId back to null
 * animates it back to this overview.
 */
const DEFAULT_CENTER = [106, 16]
const DEFAULT_ZOOM   = 1

// ─── Data ──────────────────────────────────────────────────────────────────
const locations = [
  {
    id: 1,
    title: 'Hà Nội',
    year: '1945',
    badge: 'Khai sinh',
    coordinates: [105.85, 21.02],
    /**
     * zoom=4 → effective scale 7 200 px/rad; at this level the map is zoomed
     * to show roughly the northern delta region around Hà Nội.
     * All SVG marker sizes are divided by mapZoom so they stay visually
     * consistent at any zoom level (see MapView).
     */
    zoom: 4,
    image_placeholder_url:
      'https://placehold.co/320x200/7A1921/FAF9F6?text=Ba+Dinh+Square+1945',
    image_label: 'Quảng trường Ba Đình, Hà Nội',
    short_description:
      'Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    long_description:
      'Ngày 2 tháng 9 năm 1945, trước hàng chục vạn đồng bào tề tựu về Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh thay mặt Chính phủ Lâm thời đọc bản Tuyên ngôn Độc lập — văn kiện lịch sử khẳng định quyền độc lập, tự do của dân tộc Việt Nam, chấm dứt hơn 80 năm đô hộ của thực dân Pháp.\n\nTuy nhiên, chính quyền non trẻ ngay lập tức phải đối mặt với "ngàn cân treo sợi tóc": nạn đói khủng khiếp hoành hành miền Bắc; hơn 20 vạn quân Tưởng kéo vào với danh nghĩa giải giáp quân Nhật; quân Pháp trở lại miền Nam. Với sách lược "dĩ bất biến, ứng vạn biến", Đảng vừa hòa hoãn có nguyên tắc vừa khẩn trương chuẩn bị lực lượng cho cuộc kháng chiến lâu dài.',
  },
  {
    id: 2,
    title: 'Hải Phòng',
    year: '1946',
    badge: 'Toàn quốc kháng chiến',
    coordinates: [106.68, 20.86],
    zoom: 4,
    image_placeholder_url:
      'https://placehold.co/320x200/5C2D0E/FAF9F6?text=Hai+Phong+Port+1946',
    image_label: 'Cảng Hải Phòng, 1946',
    short_description:
      'Tháng 11/1946, Pháp gây thảm sát tại Hải Phòng, châm ngòi cho Lời kêu gọi Toàn quốc Kháng chiến ngày 19/12/1946.',
    long_description:
      'Mặc dù Hiệp định Sơ bộ (6/3/1946) và Tạm ước (14/9/1946) đã được ký kết, thực dân Pháp không từ bỏ dã tâm tái chiếm Việt Nam. Ngày 20/11/1946, chúng gây xung đột vũ trang nghiêm trọng tại Hải Phòng, sử dụng pháo hạm bắn phá khu dân cư, tàn sát hàng nghìn thường dân vô tội.\n\nTrước tình hình đó, ngày 19/12/1946, Chủ tịch Hồ Chí Minh ra "Lời kêu gọi toàn quốc kháng chiến" lịch sử: "Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ." Tiếng súng kháng chiến đồng loạt nổ ra khắp cả nước trong đêm 19/12/1946, mở đầu cuộc trường kỳ kháng chiến 9 năm của dân tộc.',
  },
  {
    id: 3,
    title: 'Việt Bắc',
    year: '1947 – 1950',
    badge: 'Căn cứ địa vững chắc',
    coordinates: [105.84, 21.59],
    zoom: 4,
    image_placeholder_url:
      'https://placehold.co/320x200/2D4A1E/FAF9F6?text=Viet+Bac+Jungle+1947',
    image_label: 'Chiến khu Việt Bắc, 1947',
    short_description:
      'Chiến khu Việt Bắc là trung tâm đầu não kháng chiến. Quân dân ta đã đập tan cuộc tấn công Thu-Đông 1947 của Pháp.',
    long_description:
      'Căn cứ địa Việt Bắc — trải dài trên 6 tỉnh Cao Bằng, Bắc Kạn, Lạng Sơn, Thái Nguyên, Tuyên Quang, Hà Giang — là trung tâm đầu não và hậu phương vững chắc của cuộc kháng chiến. Mùa Thu 1947, Pháp huy động hơn 12.000 quân tinh nhuệ mở cuộc hành quân quy mô lớn nhằm tiêu diệt cơ quan lãnh đạo kháng chiến.\n\nDưới sự lãnh đạo sáng suốt của Đảng, quân và dân ta chặn đánh địch từ nhiều hướng, tiêu diệt hơn 7.200 tên, đập tan hoàn toàn cuộc tấn công. Đến 1950, chiến dịch Biên giới Thu-Đông giành thắng lợi vang dội: giải phóng dải biên giới hơn 750 km, khai thông đường liên lạc quốc tế, tạo bước ngoặt chiến lược quan trọng.',
  },
  {
    id: 4,
    title: 'Điện Biên Phủ',
    year: '1954',
    badge: 'Chiến thắng lịch sử',
    coordinates: [103.01, 21.39],
    zoom: 4,
    image_placeholder_url:
      'https://placehold.co/320x200/1A1A4A/FAF9F6?text=Dien+Bien+Phu+1954',
    image_label: 'Tập đoàn cứ điểm Điện Biên Phủ, 1954',
    short_description:
      'Sau 56 ngày đêm chiến đấu (13/3–7/5/1954), quân ta toàn thắng tại Điện Biên Phủ, buộc Pháp ký Hiệp định Genève.',
    long_description:
      'Đầu năm 1954, Pháp xây dựng Điện Biên Phủ thành tập đoàn cứ điểm kiên cố nhất Đông Dương với 49 cứ điểm, 16.000 quân — mệnh danh "pháo đài bất khả xâm phạm". Đại tướng Võ Nguyên Giáp đã có quyết định lịch sử: thay đổi phương châm từ "đánh nhanh, thắng nhanh" sang "đánh chắc, tiến chắc".\n\nSau 56 ngày đêm chiến đấu kiên cường (13/3 – 7/5/1954), quân và dân ta tiêu diệt và bắt sống toàn bộ tập đoàn cứ điểm, bắt sống tướng De Castries cùng ban chỉ huy. Chiến thắng "lừng lẫy năm châu, chấn động địa cầu" buộc Pháp ký Hiệp định Genève (21/7/1954), chấm dứt 9 năm kháng chiến trường kỳ.',
  },
]

const BADGE_COLORS = {
  'Khai sinh':              'bg-yellow-100 text-yellow-800 border border-yellow-300',
  'Toàn quốc kháng chiến': 'bg-red-100 text-red-800 border border-red-300',
  'Căn cứ địa vững chắc':  'bg-stone-100 text-stone-700 border border-stone-300',
  'Chiến thắng lịch sử':   'bg-red-800 text-yellow-50 border border-red-700',
}

// ─── Timeline Card (left column) ───────────────────────────────────────────
function TimelineCard({ location, isActive, onClick }) {
  const badgeClass =
    BADGE_COLORS[location.badge] ??
    'bg-stone-100 text-stone-700 border border-stone-300'

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="group relative flex gap-3.5 cursor-pointer focus:outline-none"
      aria-pressed={isActive}
    >
      {/* ── Timeline dot ─────────────────────────────────── */}
      <div className="relative z-10 flex-shrink-0 pt-[1.1rem]">
        <div
          className="w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
          style={{
            backgroundColor: isActive ? '#991b1b' : 'white',
            borderColor:     isActive ? '#991b1b' : '#fca5a5',
            boxShadow:       isActive
              ? '0 0 0 4px rgba(153,27,27,0.13)'
              : 'none',
          }}
        />
      </div>

      {/* ── Card body ────────────────────────────────────── */}
      <div
        className={`flex-1 rounded-sm p-4 border-l-[3px] transition-all duration-250 ${
          isActive
            ? 'bg-amber-50 border-red-800 shadow-md'
            : 'bg-white border-transparent hover:border-red-200 hover:shadow-sm group-hover:translate-x-0.5'
        }`}
        style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease' }}
      >
        {/* Year + Badge */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <p className="font-body text-xs text-yellow-700 font-semibold tracking-wider">
            {location.year}
          </p>
          <span
            className={`font-body text-[10px] font-semibold px-1.5 py-0.5 rounded-sm flex-shrink-0 ${badgeClass}`}
          >
            {location.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-bold text-red-900 leading-tight mb-2">
          {location.title}
        </h3>

        {/* Short description */}
        <p
          className={`font-body text-xs leading-relaxed ${
            isActive ? 'text-stone-700' : 'text-stone-500'
          }`}
        >
          {location.short_description}
        </p>

        {/* Status line */}
        <p
          className={`font-body text-[11px] mt-2 font-medium ${
            isActive ? 'text-red-800' : 'text-stone-400'
          }`}
        >
          {isActive ? '★ Đang hiển thị trên bản đồ' : 'Nhấp để khám phá →'}
        </p>
      </div>
    </div>
  )
}

// ─── Detail Panel (overlays bottom of the map column) ──────────────────────
/**
 * POSITIONING: absolute bottom-0 within the right column (position:relative).
 * Slides up via the `.detail-slide-up` CSS animation (defined in index.css).
 * Contains a fixed-width image pane on the left and a scrollable text pane.
 */
function DetailPanel({ location, onClose }) {
  const badgeClass =
    BADGE_COLORS[location.badge] ??
    'bg-stone-100 text-stone-700 border border-stone-300'

  return (
    <div
      key={location.id}                /* re-mounts + re-animates on location change */
      className="detail-slide-up absolute bottom-0 left-0 right-0 z-20 flex bg-stone-50 border-t-2 border-red-800"
      style={{
        maxHeight: '45%',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.22)',
      }}
    >
      {/* ── Historical image ──────────────────────────────── */}
      <div className="relative w-28 sm:w-36 md:w-44 flex-shrink-0 overflow-hidden bg-stone-800">
        <img
          src={location.image_placeholder_url}
          alt={`${location.title} — ${location.year}`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            /* Graceful fallback: hide broken img, let gradient show */
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.style.background =
              'linear-gradient(160deg, #7A1921 0%, #2C1810 100%)'
          }}
        />
        {/* Right-side vignette blends image into the text area */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-stone-50/25 pointer-events-none" />
        {/* Year badge */}
        <span className="absolute bottom-2 left-2 font-body text-[11px] font-bold text-yellow-100 bg-red-900/80 px-1.5 py-0.5 rounded leading-none">
          {location.year}
        </span>
      </div>

      {/* ── Text content ──────────────────────────────────── */}
      <div className="relative flex-1 overflow-y-auto scroll-col px-4 py-4 sm:px-5 sm:py-5">
        {/* Close / deselect button */}
        <button
          onClick={onClose}
          aria-label="Đóng chi tiết"
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-red-900/10 hover:bg-red-900/20 text-red-900 text-sm font-bold leading-none transition-colors focus:outline-none focus:ring-1 focus:ring-red-600"
        >
          ×
        </button>

        {/* Title + meta */}
        <div className="pr-8 mb-2">
          <h3 className="font-display text-lg font-bold text-red-900 leading-tight">
            {location.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <p className="font-body text-xs text-yellow-700 font-semibold">
              {location.year}
            </p>
            <span
              className={`font-body text-[10px] font-semibold px-1.5 py-0.5 rounded-sm ${badgeClass}`}
            >
              {location.badge}
            </span>
          </div>
        </div>

        {/* Decorative rule */}
        <div className="w-8 h-px bg-red-800/30 mb-3" />

        {/* Long description — \n\n renders as paragraph break via pre-line */}
        <p className="font-body text-xs text-stone-700 leading-relaxed whitespace-pre-line">
          {location.long_description}
        </p>

        {/* Image caption */}
        <p className="font-body text-[10px] text-stone-400 italic mt-3">
          {location.image_label}
        </p>
      </div>
    </div>
  )
}

// ─── Map View ───────────────────────────────────────────────────────────────
/**
 * Marker size compensation
 * ────────────────────────
 * ZoomableGroup applies transform: scale(mapZoom) to its <g> element.
 * Everything inside — circles, text — scales with it.
 * Dividing each SVG size attribute by mapZoom keeps the visual pixel
 * size constant regardless of zoom level:
 *
 *   visual_px = svgUnits × mapZoom = (desired_px / mapZoom) × mapZoom = desired_px ✓
 *
 * Note: during the 800 ms pan animation mapZoom has already jumped to its
 * new value while the CSS transform is still interpolating, so markers
 * appear briefly smaller/larger. This is a minor artefact of the
 * programmatic-zoom approach and is imperceptible at normal animation speeds.
 */

// ─── Spring animation hook ─────────────────────────────────────────────────
/**
 * Drives a rAF-based spring towards (targetCenter, targetZoom).
 *
 * Why not use ZoomableGroup's built-in `transitionDuration`?
 * ──────────────────────────────────────────────────────────
 * The built-in transition only fires when React passes a NEW discrete value.
 * Clicking a different location mid-animation causes a jarring direction-
 * change because d3-zoom re-starts from the LAST committed value, not from
 * where the animation currently is.
 *
 * Our approach instead:
 *   • Track the live animated position in a ref (mutated each rAF frame).
 *   • Pass intermediate values to ZoomableGroup every frame via setState.
 *   • ZoomableGroup has transitionDuration=0 (snaps instantly to whatever
 *     it receives), so the spring IS the only animation.
 *   • Interrupting mid-animation is seamless: the new effect picks up from
 *     wherever animRef currently is.
 *   • Marker-size compensation (size/zoom) stays pixel-stable throughout
 *     the entire animation because displayZoom is a live intermediate value.
 *
 * k (stiffness) = 5.5  →  ~95 % settled in 550 ms, feels snappy but smooth.
 */
const SPRING_K = 5.5

function useMapSpring(targetCenter, targetZoom) {
  const animRef = useRef({
    cx:    targetCenter[0],
    cy:    targetCenter[1],
    z:     targetZoom,
    rafId: null,
  })

  const [display, setDisplay] = useState({
    center: targetCenter,
    zoom:   targetZoom,
  })

  useEffect(() => {
    const anim        = animRef.current
    const [tcx, tcy]  = targetCenter
    const tz          = targetZoom

    // Cancel any running frame before starting the new spring
    if (anim.rafId) cancelAnimationFrame(anim.rafId)

    let lastTime = performance.now()

    function step(time) {
      // Cap dt so a hidden tab waking up doesn't cause a huge jump
      const dt     = Math.min(time - lastTime, 50)
      lastTime     = time
      const factor = 1 - Math.exp(-SPRING_K * dt / 1000)

      anim.cx += (tcx - anim.cx) * factor
      anim.cy += (tcy - anim.cy) * factor
      anim.z  += (tz  - anim.z)  * factor

      // Snap to exact target once within floating-point noise
      const done =
        Math.abs(anim.cx - tcx) < 0.0001 &&
        Math.abs(anim.cy - tcy) < 0.0001 &&
        Math.abs(anim.z  - tz)  < 0.001

      if (done) {
        anim.cx = tcx; anim.cy = tcy; anim.z = tz
        setDisplay({ center: [tcx, tcy], zoom: tz })
        return // stop loop
      }

      setDisplay({ center: [anim.cx, anim.cy], zoom: anim.z })
      anim.rafId = requestAnimationFrame(step)
    }

    anim.rafId = requestAnimationFrame(step)
    return () => { if (anim.rafId) cancelAnimationFrame(anim.rafId) }
  }, [targetCenter[0], targetCenter[1], targetZoom]) // eslint-disable-line react-hooks/exhaustive-deps

  return display
}

function MapView({ activeId, mapCenter, mapZoom, onMarkerClick }) {
  // Spring-animated center + zoom — drives the map instead of ZoomableGroup's
  // internal CSS transition so we get smooth interruption-safe animation.
  const { center: displayCenter, zoom: displayZoom } = useMapSpring(mapCenter, mapZoom)

  return (
    <div className="w-full h-full" style={{ background: '#EDE3C8' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [106, 17], scale: 1800 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/*
         * filterZoomEvent={() => false} disables all user-driven pan/zoom so
         * only the programmatic center/zoom props control the view.
         * transitionDuration (ms) drives the smooth animation.
         */}
        {/*
         * transitionDuration={0}: ZoomableGroup snaps instantly to whatever
         * center/zoom it receives. The spring hook above supplies a new value
         * every rAF frame, so the smoothness comes from the hook, not d3-zoom.
         */}
        <ZoomableGroup
          center={displayCenter}
          zoom={displayZoom}
          filterZoomEvent={() => false}
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
                    fill={isVietnam ? '#C8B880' : '#DDD3B0'}
                    stroke="#8B5E3C"
                    strokeWidth={isVietnam ? 0.8 : 0.3}
                    strokeOpacity={isVietnam ? 0.7 : 0.4}
                    style={{
                      default: { outline: 'none' },
                      hover:   { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {locations.map((loc) => {
            const isActive = loc.id === activeId

            // Compensated SVG units — divided by the LIVE animated zoom so
            // markers stay pixel-stable throughout the spring animation.
            const dotR    = (isActive ? 6   : 4)   / displayZoom
            const glowR   = (isActive ? 9   : 5)   / displayZoom
            const pulseR  = 10                      / displayZoom
            const strokeW = 1.5                     / displayZoom
            const textSz  = (isActive ? 8   : 6.5) / displayZoom
            const labelY  = -14                     / displayZoom

            return (
              <Marker key={loc.id} coordinates={loc.coordinates}>
                {/* Gold pulse ring — active marker only */}
                {isActive && (
                  <circle
                    r={pulseR}
                    fill="none"
                    stroke="#B8860B"
                    strokeWidth={strokeW}
                    className="pulse-ring"
                  />
                )}

                {/* Soft glow halo */}
                <circle
                  r={glowR}
                  fill="#991b1b"
                  fillOpacity={isActive ? 0.13 : 0}
                  style={{ transition: 'fill-opacity 0.4s ease' }}
                />

                {/*
                 * Clickable dot — e.stopPropagation() prevents ZoomableGroup
                 * from treating the click as the start of a drag.
                 */}
                <circle
                  r={dotR}
                  fill={isActive ? '#7F1D1D' : '#991b1b'}
                  stroke="#FAF9F6"
                  strokeWidth={strokeW}
                  style={{ cursor: 'pointer', transition: 'fill 0.35s ease' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onMarkerClick(loc.id)
                  }}
                />

                {/* Location label */}
                <text
                  textAnchor="middle"
                  y={labelY}
                  style={{
                    fontFamily:    'Lora, Georgia, serif',
                    fontSize:      textSz,
                    fill:          isActive ? '#7F1D1D' : '#5C3A1E',
                    fontWeight:    isActive ? '600' : '400',
                    pointerEvents: 'none',
                  }}
                >
                  {loc.title}
                </text>
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

// ─── Main Section ───────────────────────────────────────────────────────────
export default function InteractiveMapSection() {
  /**
   * activeId = null  → overview mode (DEFAULT_CENTER, DEFAULT_ZOOM=1)
   * activeId = 1–4   → that location is highlighted; map pans+zooms to it
   *                     and the DetailPanel slides up from the map bottom
   */
  const [activeId, setActiveId] = useState(null)

  /** Clicking the same location a second time deselects (returns to overview). */
  const handleSelect = useCallback((id) => {
    setActiveId((prev) => (prev === id ? null : id))
  }, [])

  const activeLocation = locations.find((l) => l.id === activeId) ?? null
  const mapCenter      = activeLocation?.coordinates ?? DEFAULT_CENTER
  const mapZoom        = activeLocation?.zoom        ?? DEFAULT_ZOOM

  return (
    <section id="map-section" className="paper-bg relative">
      {/* ── Section header ────────────────────────────────── */}
      <div className="relative z-10 px-6 py-12 text-center border-b border-red-800/20">
        <div className="rule-red max-w-xs mx-auto mb-4">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-red-800/70 px-3">
            Bản đồ kháng chiến
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-red-900 mb-3">
          Hành Trình Kháng Chiến
        </h2>
        <p className="font-body text-stone-500 text-sm italic">
          Chọn một mốc lịch sử — bản đồ sẽ phóng to vào địa điểm và hiển thị chi tiết sự kiện
        </p>
      </div>

      {/* ── Two-column layout ─────────────────────────────── */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '100vh' }}>

        {/* ══ LEFT: Milestone Timeline ══════════════════════ */}
        <div className="w-full lg:w-[42%] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto scroll-col border-r border-red-800/10">
          <div className="px-6 py-8 md:px-8">

            {/* Timeline column header */}
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px flex-1 bg-red-800/20" />
              <p className="font-body text-xs tracking-[0.25em] uppercase text-red-800/60 whitespace-nowrap">
                Các mốc sự kiện
              </p>
              <span className="h-px flex-1 bg-red-800/20" />
            </div>

            {/* Timeline */}
            <div className="relative">
              {/*
               * Vertical connecting line — sits behind the dots (z-0).
               * Positioned so it runs through the centre of each dot (left-[0.8125rem]).
               */}
              <div
                className="absolute left-[0.8125rem] top-5 bottom-5 w-px bg-red-800/20"
                aria-hidden="true"
              />

              <div className="space-y-4">
                {locations.map((loc) => (
                  <TimelineCard
                    key={loc.id}
                    location={loc}
                    isActive={loc.id === activeId}
                    onClick={() => handleSelect(loc.id)}
                  />
                ))}
              </div>
            </div>

            {/* Idle prompt */}
            {!activeId && (
              <p className="font-body text-xs text-stone-400 text-center mt-8 italic">
                Nhấp vào một mốc để bắt đầu khám phá
              </p>
            )}
          </div>
        </div>

        {/* ══ RIGHT: Map + Detail Panel ═════════════════════ */}
        {/*
         * overflow-hidden clips the DetailPanel's slide-up animation.
         * position:relative makes the absolutely-positioned DetailPanel
         * and the hint badge anchor to this column.
         */}
        <div
          className="relative w-full lg:w-[58%] lg:sticky lg:top-0 lg:h-screen overflow-hidden"
          style={{ minHeight: '60vh' }}
        >
          {/* Map fills the entire right column */}
          <MapView
            activeId={activeId}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            onMarkerClick={handleSelect}
          />

          {/*
           * Detail panel: slides up from the bottom of the map column.
           * Keyed on location.id so React unmounts+remounts (and re-runs the
           * CSS animation) whenever the selected location changes.
           */}
          {activeLocation && (
            <DetailPanel
              key={activeLocation.id}
              location={activeLocation}
              onClose={() => setActiveId(null)}
            />
          )}

          {/* Overview hint — visible only when no location is selected */}
          {!activeLocation && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="font-body text-[11px] text-stone-500 bg-stone-100/88 px-3 py-1.5 rounded-full border border-stone-200 whitespace-nowrap shadow-sm">
                ← Chọn mốc lịch sử để phóng to bản đồ
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
