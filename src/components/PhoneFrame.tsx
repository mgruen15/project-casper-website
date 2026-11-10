import { m } from "framer-motion";
import { Heart, MessageCircle, Share2, Rewind, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_NAME, phoneChoice, type SceneKind } from "@/content";

/** CSS drawn phone. No images. Content inside scales with the screen width via container query units. */
export function PhoneFrame({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative mx-auto aspect-[9/19] w-full max-w-[300px] rounded-[2.4rem] bg-gradient-to-b from-[#2b2b3c] via-[#15151f] to-[#1e1e2c] p-[7px] shadow-[0_40px_90px_-30px_rgb(124_58_237/0.55),0_0_0_1px_rgb(255_255_255/0.07)_inset]",
        className,
      )}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-[18%] h-8 w-[3px] rounded-l bg-[#2a2a3a]" />
      <span aria-hidden className="absolute -left-[3px] top-[27%] h-12 w-[3px] rounded-l bg-[#2a2a3a]" />
      <span aria-hidden className="absolute -right-[3px] top-[24%] h-16 w-[3px] rounded-r bg-[#2a2a3a]" />
      <div className="@container relative h-full w-full overflow-hidden rounded-[1.9rem] bg-black">
        {children}
        {/* dynamic island */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[1.6%] z-30 h-[2.6%] w-[26%] -translate-x-1/2 rounded-full bg-black"
        />
        <span aria-hidden className="phone-vignette pointer-events-none absolute inset-0 z-20" />
      </div>
    </div>
  );
}

/* ---------------------------- Scene art ---------------------------- */

const ROWS = [1, 0.72, 0.52, 0.38, 0.28, 0.2];

function CabinArt() {
  return (
    <svg viewBox="0 0 100 190" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <linearGradient id="cabin-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d1240" />
          <stop offset="0.55" stopColor="#0f0a24" />
          <stop offset="1" stopColor="#07060d" />
        </linearGradient>
        <radialGradient id="cabin-glow" cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor="#d946ef" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d946ef" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="seat-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#241b4a" />
          <stop offset="1" stopColor="#120d26" />
        </linearGradient>
      </defs>
      <rect width="100" height="190" fill="url(#cabin-bg)" />
      <ellipse cx="50" cy="86" rx="46" ry="36" fill="url(#cabin-glow)" />
      {/* aisle lines */}
      <path d="M44 84 L22 190 M56 84 L78 190" stroke="#8b5cf6" strokeOpacity="0.18" strokeWidth="0.5" />
      {ROWS.map((s, i) => {
        const y = 76 + 100 * s;
        const dx = 30 * s + 4;
        const w = 24 * s;
        const h = 34 * s;
        const empty = i === 2;
        return (
          <g key={i}>
            {[50 - dx, 50 + dx].map((cx, k) => (
              <g key={k}>
                <rect
                  x={cx - w / 2}
                  y={y - h}
                  width={w}
                  height={h}
                  rx={5 * s}
                  fill={empty ? "#2a1450" : "url(#seat-fill)"}
                  stroke={empty ? "#e879f9" : "#7c3aed"}
                  strokeOpacity={empty ? 0.9 : 0.28}
                  strokeWidth={empty ? 0.7 : 0.4}
                />
                {/* window light */}
                <rect
                  x={k === 0 ? 1.5 : 98.5 - 5 * s}
                  y={y - h - 9 * s}
                  width={5 * s}
                  height={8 * s}
                  rx={2 * s}
                  fill="#8b5cf6"
                  opacity={0.4}
                />
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function SeatArt() {
  return (
    <svg viewBox="0 0 100 190" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <radialGradient id="seat-bg" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#3b1457" />
          <stop offset="0.6" stopColor="#120a24" />
          <stop offset="1" stopColor="#050408" />
        </radialGradient>
        <linearGradient id="ghost-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0abfc" stopOpacity="0.5" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="seat-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f1640" />
          <stop offset="1" stopColor="#0c081b" />
        </linearGradient>
      </defs>
      <rect width="100" height="190" fill="url(#seat-bg)" />
      <rect x="20" y="52" width="60" height="110" rx="16" fill="url(#seat-back)" stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="0.6" />
      {/* a figure that should not be there */}
      <path
        d="M50 70 c-8 0-13 6-13 14 s5 14 13 14 s13-6 13-14 s-5-14-13-14 Z M32 128 c0-16 8-26 18-26 s18 10 18 26 v20 h-36 Z"
        fill="url(#ghost-fill)"
        className="animate-pulse-glow"
      />
      <circle cx="50" cy="86" r="22" fill="none" stroke="#e879f9" strokeOpacity="0.25" strokeWidth="0.5" className="animate-pulse-glow" />
    </svg>
  );
}

function RewindArt() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#4c1d95] via-[#86198f] to-[#0a0a0f]">
      {[12, 28, 41, 57, 69, 83].map((top, i) => (
        <m.span
          key={top}
          className="absolute left-0 h-[3%] w-full bg-white/15"
          style={{ top: `${top}%` }}
          initial={{ x: i % 2 ? "-60%" : "60%", opacity: 0 }}
          animate={{ x: ["-60%", "60%", "-20%"], opacity: [0, 0.8, 0.2] }}
          transition={{ duration: 1.4, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <Rewind className="text-white/80" style={{ width: "26cqw", height: "26cqw" }} strokeWidth={1.4} />
      </div>
    </div>
  );
}

/* ---------------------------- Captions ---------------------------- */

function Caption({ text, animate }: { text: string; animate: boolean }) {
  const words = text.split(" ");
  return (
    <p
      className="font-display font-bold leading-[1.15] text-white [text-shadow:0_2px_12px_rgb(0_0_0/0.9),0_0_2px_rgb(0_0_0)]"
      style={{ fontSize: "8cqw" }}
    >
      {words.map((w, i) => (
        <m.span
          key={`${w}-${i}`}
          className={cn("mr-[0.28em] inline-block", i === words.length - 1 && "text-gradient [text-shadow:none]")}
          initial={animate ? { opacity: 0, y: 8, scale: 0.9 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: animate ? 0.12 + i * 0.13 : 0, duration: 0.25 }}
        >
          {w}
        </m.span>
      ))}
    </p>
  );
}

/* ---------------------------- Overlays ---------------------------- */

export function ChoiceOverlay({ animate = true }: { animate?: boolean }) {
  return (
    <m.div
      className="absolute inset-x-0 bottom-[22%] z-10 flex flex-col gap-[2.5cqw] pl-[6cqw] pr-[14cqw]"
      initial={animate ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {[phoneChoice.a, phoneChoice.b].map((c, i) => (
        <m.div
          key={c.key}
          className={cn(
            "flex items-center gap-[3cqw] rounded-[4cqw] border border-white/20 bg-black/55 px-[3.5cqw] py-[3cqw] backdrop-blur-md",
            i === 0 ? "shadow-[0_0_24px_-6px_rgb(167_139_250/0.9)]" : "shadow-[0_0_24px_-6px_rgb(232_121_249/0.9)]",
          )}
          initial={animate ? { opacity: 0, scale: 0.92 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: animate ? 0.2 + i * 0.15 : 0 }}
        >
          <span
            className="flex shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-white"
            style={{ width: "9cqw", height: "9cqw", fontSize: "5cqw" }}
          >
            {c.key}
          </span>
          <span className="font-semibold text-white" style={{ fontSize: "5.2cqw" }}>
            {c.label}
          </span>
        </m.div>
      ))}
      <p className="text-center text-white/75" style={{ fontSize: "3.4cqw" }}>
        {phoneChoice.hint}
      </p>
    </m.div>
  );
}

function CliffhangerOverlay() {
  return (
    <div className="absolute inset-x-0 bottom-[20%] z-10 flex justify-center px-[6cqw]">
      <span
        className="inline-flex items-center gap-[1.5cqw] rounded-full border border-white/25 bg-black/55 px-[4cqw] py-[2cqw] font-semibold text-white backdrop-blur-md"
        style={{ fontSize: "4cqw" }}
      >
        Next episode <ChevronRight style={{ width: "5cqw", height: "5cqw" }} />
      </span>
    </div>
  );
}

/* ---------------------------- Screen ---------------------------- */

export function MicrodramaScreen({
  kind,
  caption,
  timecode = "0:00",
  overlay,
  animate = true,
  progress = 0.4,
}: {
  kind: SceneKind;
  caption: string;
  timecode?: string;
  overlay?: "choice" | "cliffhanger" | "hook";
  animate?: boolean;
  progress?: number;
}) {
  const art = kind === "cabin" ? <CabinArt /> : kind === "rewind" ? <RewindArt /> : <SeatArt />;
  return (
    <div className="absolute inset-0 select-none">
      {art}

      {/* top chrome */}
      <div className="absolute inset-x-0 top-0 z-20 px-[4cqw] pt-[9cqw]">
        <div className="flex gap-[1.5cqw]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[0.9cqw] flex-1 overflow-hidden rounded-full bg-white/25">
              <span
                className="block h-full rounded-full bg-white"
                style={{ width: `${Math.max(0, Math.min(1, progress * 3 - i)) * 100}%` }}
              />
            </span>
          ))}
        </div>
        <div className="mt-[3cqw] flex items-center justify-between">
          <span
            className="rounded-full border border-white/20 bg-black/40 px-[2.5cqw] py-[0.8cqw] font-medium text-white/85 backdrop-blur"
            style={{ fontSize: "3cqw" }}
          >
            AI generated
          </span>
          <span className="font-mono text-white/70" style={{ fontSize: "3cqw" }}>
            {overlay === "hook" ? "HOOK 0:01" : timecode}
          </span>
        </div>
      </div>

      {/* right rail */}
      <div className="absolute bottom-[26%] right-[3.5cqw] z-20 flex flex-col items-center gap-[4cqw] text-white/90">
        <Heart style={{ width: "6.5cqw", height: "6.5cqw" }} />
        <MessageCircle
          style={{ width: "6.5cqw", height: "6.5cqw" }}
          className={overlay === "choice" ? "text-fuchsia-300" : undefined}
        />
        <Share2 style={{ width: "6.5cqw", height: "6.5cqw" }} />
      </div>

      {/* overlay and caption */}
      {overlay === "choice" && <ChoiceOverlay animate={animate} />}
      {overlay === "cliffhanger" && <CliffhangerOverlay />}
      <div
        className={cn(
          "absolute inset-x-0 z-10 px-[6cqw]",
          overlay === "choice" || overlay === "cliffhanger" ? "bottom-[52%]" : "bottom-[24%]",
        )}
        style={{ paddingRight: "14cqw" }}
      >
        <Caption key={caption} text={caption} animate={animate} />
      </div>

      {/* bottom chrome */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 to-transparent px-[5cqw] pb-[7cqw] pt-[10cqw]">
        <p className="font-semibold text-white" style={{ fontSize: "3.6cqw" }}>
          @{BRAND_NAME.toLowerCase()}.series
        </p>
        <p className="text-white/70" style={{ fontSize: "3.1cqw" }}>
          Episode 1 · Part 1
        </p>
      </div>
    </div>
  );
}
