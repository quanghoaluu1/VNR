import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const phases = [
  {
    id: 1,
    period: "1945 – 1946",
    label: "Giai đoạn I",
    title: 'Vượt qua thế\n"Ngàn cân treo sợi tóc"',
    color: "#C9A84C",
    glow: "rgba(201,168,76,0.25)",
    icon: "⚖",
    items: [
      {
        heading: "Xây dựng thực lực và niềm tin",
        body: 'Đảng xác định nhiệm vụ cấp bách "diệt giặc đói, diệt giặc dốt và diệt giặc ngoại xâm". Tổ chức Tổng tuyển cử (6/1/1946) và thông qua Hiến pháp 1946, khẳng định địa vị pháp lý của Nhà nước mới, củng cố khối đại đoàn kết toàn dân tộc quanh Chủ tịch Hồ Chí Minh.',
      },
      {
        heading: 'Sách lược ngoại giao "dĩ bất biến, ứng vạn biến"',
        body: "Hòa hoãn với quân Tưởng ở miền Bắc để tập trung đánh Pháp ở miền Nam; ký Hiệp định Sơ bộ (6/3/1946) và Tạm ước (14/9/1946) để đẩy 20 vạn quân Tưởng về nước, kéo dài thời gian hòa bình chuẩn bị thực lực cho kháng chiến lâu dài.",
      },
    ],
  },
  {
    id: 2,
    period: "1946 – 1950",
    label: "Giai đoạn II",
    title: "Bảo toàn lực lượng &\nxây dựng căn cứ địa",
    color: "#CC4444",
    glow: "rgba(204,68,68,0.25)",
    icon: "🔥",
    items: [
      {
        heading: "Đường lối kháng chiến toàn dân, toàn diện, trường kỳ",
        body: "Đảng đề ra đường lối kháng chiến toàn dân, toàn diện, trường kỳ và tự lực cánh sinh. Mục tiêu vừa đánh tiêu hao địch, vừa xây dựng lực lượng ta, lấy thời gian chuyển hóa thế trận từ yếu thành mạnh.",
      },
      {
        heading: "Chiến thắng Việt Bắc Thu Đông 1947",
        body: 'Ta đánh bại kế hoạch "đánh nhanh thắng nhanh" của Pháp, bảo vệ an toàn cơ quan đầu não và căn cứ địa kháng chiến. Pháp buộc phải chuyển sang đánh lâu dài, thực hiện âm mưu "lấy chiến tranh nuôi chiến tranh, dùng người Việt đánh người Việt".',
      },
    ],
  },
  {
    id: 3,
    period: "1950 – 1953",
    label: "Giai đoạn III",
    title: "Từ bị động sang\nchủ động tiến công",
    color: "#4A9ECC",
    glow: "rgba(74,158,204,0.25)",
    icon: "⚡",
    items: [
      {
        heading: "Chiến dịch Biên giới Thu Đông 1950",
        body: "Dấu mốc quyết định giúp ta giành quyền chủ động chiến lược trên chiến trường chính Bắc Bộ. Khai thông đường liên lạc với các nước xã hội chủ nghĩa, kết thúc thời kỳ chiến đấu trong vòng vây.",
      },
      {
        heading: "Đại hội II (1951) & Đảng Lao động Việt Nam",
        body: "Đảng ra hoạt động công khai, xác định rõ nhiệm vụ giải phóng dân tộc là ưu tiên hàng đầu, thực hiện các chính sách kinh tế – văn hóa để củng cố hậu phương vững chắc.",
      },
      {
        heading: "Cải cách ruộng đất (1953)",
        body: "Đảng đẩy mạnh giảm tô, giảm tức và cải cách ruộng đất, bồi dưỡng sức dân – đặc biệt là giai cấp nông dân – tạo động lực mạnh mẽ cho tiền tuyến.",
      },
    ],
  },
  {
    id: 4,
    period: "1953 – 1954",
    label: "Giai đoạn IV",
    title: "Đỉnh cao chiến thắng\nĐiện Biên Phủ",
    color: "#E8B84B",
    glow: "rgba(232,184,75,0.3)",
    icon: "★",
    items: [
      {
        heading: "Chiến thắng Điện Biên Phủ (7/5/1954)",
        body: 'Đảng huy động sức mạnh tổng hợp toàn dân, toàn quân với quyết tâm "tất cả cho tiền tuyến". Thắng lợi đập tan kế hoạch Nava và ý chí xâm lược của thực dân Pháp, tạo thế mạnh trên bàn đàm phán tại Hội nghị Giơ-ne-vơ.',
      },
      {
        heading: "Hiệp định Giơ-ne-vơ (21/7/1954)",
        body: "Buộc Pháp và các nước tham dự công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, Lào, Campuchia. Kết thúc 9 năm kháng chiến trường kỳ.",
      },
    ],
  },
];

const factors = [
  {
    n: "01",
    title: "Lãnh đạo đúng đắn, sáng tạo",
    desc: "Đảng đề ra đường lối kháng chiến và kiến quốc phù hợp thực tiễn, biết chớp thời cơ và hóa giải các nguy cơ hiểm nghèo.",
    icon: "🧭",
    color: "#C9A84C",
  },
  {
    n: "02",
    title: "Sức mạnh đại đoàn kết dân tộc",
    desc: 'Thông qua Mặt trận Việt Minh và Liên Việt, Đảng quy tụ mọi tầng lớp nhân dân, tạo nên sức mạnh "vô địch" cho chiến tranh nhân dân.',
    icon: "✊",
    color: "#CC4444",
  },
  {
    n: "03",
    title: "Ba thứ quân vũ trang",
    desc: "Bộ đội chủ lực, bộ đội địa phương và dân quân du kích phát triển mạnh mẽ, trở thành nòng cốt cho toàn dân đánh giặc.",
    icon: "⚔",
    color: "#4A9ECC",
  },
  {
    n: "04",
    title: "Kháng chiến gắn kiến quốc",
    desc: "Đảng không chỉ đánh giặc mà chăm lo xây dựng chế độ mới, cải cách ruộng đất để huy động tối đa nguồn lực từ nhân dân.",
    icon: "🌾",
    color: "#4A9050",
  },
  {
    n: "05",
    title: "Đoàn kết quốc tế",
    desc: "Sự ủng hộ của Liên Xô, Trung Quốc và các lực lượng tiến bộ trên thế giới là nhân tố quan trọng giúp Việt Nam tăng cường thực lực.",
    icon: "🌐",
    color: "#9B60CC",
  },
];

// ─── Phase Card ───────────────────────────────────────────────────────────────
function PhaseCard({ phase, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col lg:flex-row items-start gap-0 ${isEven ? "" : "lg:flex-row-reverse"}`}
    >
      {/* ── Center spine dot ─────────────────────────────────── */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 flex-col items-center">
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2"
          style={{
            background: `${phase.color}18`,
            borderColor: `${phase.color}50`,
            boxShadow: `0 0 24px ${phase.glow}`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: "spring",
            stiffness: 200,
          }}
        >
          <span>{phase.icon}</span>
        </motion.div>
      </div>

      {/* ── Period label side ─────────────────────────────────── */}
      <motion.div
        className={`w-full lg:w-[45%] pt-6 ${isEven ? "lg:text-right lg:pr-16" : "lg:pl-16"}`}
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {/* Mobile icon */}
        <div
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-xl mb-3 border"
          style={{
            background: `${phase.color}18`,
            borderColor: `${phase.color}40`,
          }}
        >
          {phase.icon}
        </div>

        <p
          className="font-ui text-xs tracking-[0.35em] uppercase font-semibold mb-1"
          style={{ color: phase.color }}
        >
          {phase.label} &nbsp;·&nbsp; {phase.period}
        </p>
        <h3 className="font-display text-3xl md:text-4xl font-bold text-stone-100 leading-tight whitespace-pre-line mb-3">
          {phase.title}
        </h3>
        <div
          className={`h-px w-16 mb-0 ${isEven ? "lg:ml-auto" : ""}`}
          style={{
            background: `linear-gradient(${isEven ? "to left" : "to right"}, ${phase.color}, transparent)`,
          }}
        />
      </motion.div>

      {/* Spacer for center spine */}
      <div className="hidden lg:block w-[10%] flex-shrink-0" />

      {/* ── Content card ─────────────────────────────────────── */}
      <motion.div
        className="w-full lg:w-[45%] mt-4 lg:mt-0"
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <div
          className="rounded-2xl p-6 group relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${phase.color}08, ${phase.color}03)`,
            border: `1px solid ${phase.color}18`,
          }}
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-6 right-6 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${phase.color}40, transparent)`,
            }}
          />

          <div className="space-y-5">
            {phase.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                  style={{
                    background: phase.color,
                    boxShadow: `0 0 6px ${phase.color}`,
                  }}
                />
                <div>
                  <p className="font-ui text-lg font-semibold text-stone-200 mb-2">
                    {item.heading}
                  </p>
                  <p className="font-body text-base text-stone-400 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom scan on hover */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            style={{
              background: `linear-gradient(to right, ${phase.color}, transparent)`,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Factor Card ─────────────────────────────────────────────────────────────
function FactorCard({ factor, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"
        style={{ background: `${factor.color}18` }}
      />

      <div
        className="relative rounded-xl p-5 h-full overflow-hidden"
        style={{
          background: `${factor.color}07`,
          border: `1px solid ${factor.color}18`,
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-4 right-4 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${factor.color}50, transparent)`,
          }}
        />

        {/* Number */}
        <p
          className="absolute top-4 right-5 font-display text-4xl font-black leading-none"
          style={{
            color: "transparent",
            WebkitTextStroke: `1px ${factor.color}15`,
          }}
        >
          {factor.n}
        </p>

        {/* Icon */}
        <div
          className="text-2xl mb-3 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: `${factor.color}12`,
            border: `1px solid ${factor.color}25`,
          }}
        >
          {factor.icon}
        </div>

        <h4 className="font-ui text-lg font-semibold text-stone-200 mb-2 leading-snug pr-8">
          {factor.title}
        </h4>
        <p className="font-body text-base text-stone-500 leading-relaxed">
          {factor.desc}
        </p>

        {/* Bottom hover bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{
            background: `linear-gradient(to right, ${factor.color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProgressSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #060402 0%, #0A0805 50%, #060402 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
          linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)
        `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,0,0,0.10), transparent 70%)",
        }}
      />

      {/* Top separator */}
      <div className="section-divider max-w-5xl mx-auto mb-24" />

      <div className="max-w-5xl mx-auto">
        {/* ── Header ──────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            className="rule-gold max-w-xs mx-auto mb-5"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="font-ui text-[11px] tracking-[0.4em] uppercase px-4 font-semibold text-yellow-600">
              Tiến trình lãnh đạo
            </span>
          </motion.div>

          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
            initial={{ opacity: 0, y: 25 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              background:
                "linear-gradient(135deg, #fff 0%, #E8DCC8 40%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Bốn Giai Đoạn Kỳ Diệu
          </motion.h2>

          <motion.p
            className="font-body text-stone-500 italic max-w-2xl mx-auto text-base leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Bước chuyển từ thế{" "}
            <span className="text-yellow-500/80 not-italic">
              "ngàn cân treo sợi tóc"
            </span>{" "}
            đến chiến thắng{" "}
            <span className="text-red-400/80 not-italic">
              "lừng lẫy năm châu, chấn động địa cầu"
            </span>{" "}
            — kết quả của tiến trình lãnh đạo tài tình và sáng tạo của Đảng Cộng
            sản Việt Nam.
          </motion.p>
        </div>

        {/* ── Timeline phases ──────────────────────────────────── */}
        <div className="relative">
          {/* Vertical spine line (desktop) */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.25) 10%, rgba(201,168,76,0.25) 90%, transparent 100%)",
            }}
          />

          <div className="space-y-16 lg:space-y-20">
            {phases.map((phase, i) => (
              <PhaseCard key={phase.id} phase={phase} index={i} />
            ))}
          </div>
        </div>

        {/* ── Closing quote ────────────────────────────────────── */}
        <motion.div
          className="text-center mt-24 mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block relative">
            <div className="text-5xl font-display italic text-yellow-300/20 absolute -top-6 -left-4 leading-none select-none">
              "
            </div>
            <p className="font-display text-2xl md:text-3xl italic text-stone-400 max-w-2xl leading-relaxed px-8">
              Từ một chính quyền non trẻ phải đối phó với muôn vàn thách thức,
              Đảng đã lãnh đạo dân tộc{" "}
              <span className="text-yellow-300/80">tự lực cánh sinh</span>, từng
              bước chuyển từ{" "}
              <span className="text-stone-300">bị động, phòng ngự</span> sang{" "}
              <span className="text-red-400/80">chủ động tiến công</span>, đi
              đến thắng lợi hoàn toàn.
            </p>
            <div className="text-5xl font-display italic text-yellow-300/20 absolute -bottom-10 -right-4 leading-none select-none">
              "
            </div>
          </div>
        </motion.div>

        {/* ── Factors Section ─────────────────────────────────── */}
        <div>
          {/* Sub-header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="rule-gold max-w-xs mx-auto mb-4">
              <span className="font-ui text-[10px] tracking-[0.4em] uppercase px-4 font-semibold text-yellow-600/70">
                Phân tích
              </span>
            </div>
            <h3
              className="font-display text-3xl md:text-4xl font-bold mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #fff, #E8DCC8 50%, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              5 Yếu Tố Quyết Định Thắng Lợi
            </h3>
            <p className="font-body text-stone-500 text-sm italic">
              Sức mạnh tổng hợp đã làm nên kỳ tích lịch sử
            </p>
          </motion.div>

          {/* Factors grid */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
            {factors.map((f, i) => (
              <div
                key={f.n}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.875rem)]"
              >
                <FactorCard factor={f} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
