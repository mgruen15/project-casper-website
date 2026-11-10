import { m } from "framer-motion";
import { roadmap } from "@/content";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";

export function Roadmap() {
  return (
    <Section id={roadmap.id} className="bg-gradient-to-b from-transparent via-violet-950/[0.12] to-transparent">
      <SectionHeader eyebrow={roadmap.eyebrow} title={roadmap.title} intro={roadmap.note} />
      <div className="relative">
        {/* Horizontal line (lg) */}
        <div aria-hidden className="absolute left-0 right-0 top-[11px] hidden h-px bg-white/10 lg:block">
          <m.div
            className="h-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
        {/* Vertical line (below lg) */}
        <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-violet-500/70 via-fuchsia-500/40 to-white/5 lg:hidden" />

        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
          {roadmap.phases.map((p, i) => (
            <Reveal as="li" key={p.phase} delay={i * 0.12} className="relative pl-10 lg:pl-0 lg:pt-10">
              <span
                aria-hidden
                className="absolute left-0 top-1 flex size-[23px] items-center justify-center rounded-full border border-violet-400/60 bg-background lg:top-0"
              >
                <span className="size-2.5 rounded-full bg-brand-gradient" />
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">{p.phase}</span>
                <span className="rounded-full border border-dashed border-white/25 px-2.5 py-0.5 text-xs text-muted-foreground">
                  {roadmap.targetLabel}: {p.target}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
