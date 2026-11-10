import { m } from "framer-motion";
import { Clapperboard, Film, GitBranch, Mic, PenLine, Send, type LucideIcon } from "lucide-react";
import { pipeline, type PipelineStep } from "@/content";
import { Section, SectionHeader } from "./Section";
import { Reveal } from "./Reveal";

const icons: Record<PipelineStep["icon"], LucideIcon> = {
  prompt: PenLine,
  script: GitBranch,
  visuals: Clapperboard,
  voice: Mic,
  render: Film,
  publish: Send,
};

export function PipelineSteps() {
  const last = pipeline.steps.length - 1;
  return (
    <Section id={pipeline.id} className="bg-gradient-to-b from-transparent via-violet-950/[0.12] to-transparent">
      <SectionHeader eyebrow={pipeline.eyebrow} title={pipeline.title} intro={pipeline.intro} />

      <div className="relative">
        {/* Horizontal beam, desktop only */}
        <div aria-hidden className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-7 hidden h-px bg-white/10 lg:block">
          <m.div
            className="h-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        <ol className="grid gap-0 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-6 lg:gap-x-4">
          {pipeline.steps.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.n} className="relative flex gap-5 pb-10 last:pb-0 md:block md:pb-0 md:text-center">
                {/* Vertical connector, mobile only */}
                {i !== last && (
                  <span
                    aria-hidden
                    className="absolute left-7 top-14 h-[calc(100%-3.5rem)] w-px bg-gradient-to-b from-violet-500/60 to-white/5 md:hidden"
                  />
                )}
                <Reveal delay={i * 0.12} className="shrink-0 md:mx-auto md:w-fit">
                  <div className="relative flex size-14 items-center justify-center rounded-2xl border-gradient bg-surface-2 glow-violet">
                    <Icon className="size-6 text-accent-soft" />
                    <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-brand-gradient font-display text-xs font-bold text-white">
                      {s.n}
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.1 + i * 0.12} className="md:mt-6">
                  <h3 className="font-display text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
