import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, Package, Unlock, type LucideIcon } from "lucide-react";
import { business } from "@/content";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";

const icons: Record<string, LucideIcon> = { megaphone: Megaphone, unlock: Unlock, package: Package };

export function BusinessModel() {
  return (
    <Section id={business.id}>
      <SectionHeader eyebrow={business.eyebrow} title={business.title} />
      <ul className="grid gap-5 md:grid-cols-3">
        {business.cards.map((c, i) => {
          const Icon = icons[c.icon];
          return (
            <Reveal as="li" key={c.title} delay={i * 0.1}>
              <Card className="h-full p-7">
                <span className="mb-5 flex size-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-accent-soft">
                  <Icon className="size-5" />
                </span>
                <h3 className="mb-2 font-display text-xl font-semibold">{c.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
              </Card>
            </Reveal>
          );
        })}
      </ul>
      <Reveal delay={0.2} className="mt-5">
        <div className="border-gradient relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-950/60 to-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <Badge variant="accent">{business.b2b.badge}</Badge>
            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{business.b2b.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{business.b2b.body}</p>
          </div>
          <Button asChild size="lg" variant="outline" className="shrink-0 self-start sm:self-center">
            <Link to={{ pathname: business.b2b.cta.to, hash: `#${business.b2b.cta.hash}` }}>
              {business.b2b.cta.label} <ArrowRight />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
