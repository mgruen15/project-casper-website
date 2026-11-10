import { useReducedMotion } from "framer-motion";
import { loop } from "@/content";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";

const CX = 210;
const CY = 210;
const R = 138;
// Clockwise from the top.
const nodes = [
  { angle: 0, label: loop.steps[0].title },
  { angle: 90, label: loop.steps[1].title },
  { angle: 180, label: loop.steps[2].title },
  { angle: 270, label: loop.steps[3].title },
];
const pt = (deg: number, r = R) => {
  const a = (deg * Math.PI) / 180;
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
};

function LoopDiagram() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 420 420"
      className="mx-auto w-full max-w-[420px]"
      role="img"
      aria-label="Loop diagram: Post, Measure, Learn, Rewrite, and back to Post."
    >
      <defs>
        <linearGradient id="loop-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
        <radialGradient id="loop-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7c3aed" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r={R + 40} fill="url(#loop-core)" />
      <circle
        id="loop-path"
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="url(#loop-stroke)"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeDasharray="6 6"
        className={reduce ? "" : "animate-flow"}
      />
      {/* direction chevrons */}
      {[45, 135, 225, 315].map((a) => {
        const p = pt(a);
        return (
          <path
            key={a}
            d="M-6 -7 L3 0 L-6 7"
            transform={`translate(${p.x} ${p.y}) rotate(${a})`}
            fill="none"
            stroke="#e879f9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
      {/* travelling dot */}
      {!reduce && (
        <circle r="5" fill="#fff">
          <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" path={`M ${CX} ${CY - R} A ${R} ${R} 0 1 1 ${CX - 0.01} ${CY - R}`} />
        </circle>
      )}
      {nodes.map((n) => {
        const p = pt(n.angle);
        return (
          <g key={n.label}>
            <circle cx={p.x} cy={p.y} r="46" fill="#0f0f18" stroke="url(#loop-stroke)" strokeWidth="1.5" />
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fill="#f4f3f8"
              fontSize="17"
              fontWeight="700"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {n.label}
            </text>
          </g>
        );
      })}
      <text x={CX} y={CY - 2} textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="600" letterSpacing="2">
        {loop.centerLabel.toUpperCase()}
      </text>
      <text x={CX} y={CY + 16} textAnchor="middle" fill="#a09eb3" fontSize="12">
        Next episode, smarter
      </text>
    </svg>
  );
}

export function PerformanceLoop() {
  return (
    <Section id={loop.id} className="bg-gradient-to-b from-transparent via-fuchsia-950/[0.10] to-transparent">
      <SectionHeader eyebrow={loop.eyebrow} title={loop.title} intro={loop.intro} />
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <LoopDiagram />
        </Reveal>
        <div>
          <ol className="space-y-5">
            {loop.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.3} className="mt-9">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">
              {loop.signalsLabel}
            </p>
            <ul className="flex flex-wrap gap-2">
              {loop.signals.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
