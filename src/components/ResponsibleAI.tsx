import { Eye, ShieldCheck, Tag, UserX, type LucideIcon } from "lucide-react";
import { responsible } from "@/content";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";

const icons: Record<string, LucideIcon> = { tag: Tag, shield: ShieldCheck, eye: Eye, user: UserX };

export function ResponsibleAI() {
  return (
    <Section id={responsible.id}>
      <SectionHeader eyebrow={responsible.eyebrow} title={responsible.title} intro={responsible.intro} />
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {responsible.items.map((it, i) => {
          const Icon = icons[it.icon];
          return (
            <Reveal as="li" key={it.title} delay={i * 0.08} className="flex gap-5 border-t border-white/10 pt-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-accent-soft">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{it.body}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
