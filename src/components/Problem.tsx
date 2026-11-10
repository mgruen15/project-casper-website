import { Clock, Layers, LineChart } from "lucide-react";
import { problem } from "@/content";
import { Card } from "./ui/card";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";

const icons = { clock: Clock, layers: Layers, chart: LineChart };

export function Problem() {
  return (
    <Section id={problem.id}>
      <SectionHeader eyebrow={problem.eyebrow} title={problem.title} />
      <ul className="grid gap-5 md:grid-cols-3">
        {problem.cards.map((c, i) => {
          const Icon = icons[c.icon as keyof typeof icons];
          return (
            <Reveal as="li" key={c.title} delay={i * 0.1}>
              <Card className="h-full p-7">
                <span className="mb-6 flex size-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-accent-soft">
                  <Icon className="size-5" />
                </span>
                <h3 className="mb-3 font-display text-xl font-semibold">{c.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
