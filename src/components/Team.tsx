import { team } from "@/content";
import { Card } from "./ui/card";
import { LogoMark } from "./Logo";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";

export function Team() {
  return (
    <Section id={team.id}>
      <SectionHeader eyebrow={team.eyebrow} title={team.title} />
      {/* TODO: Replace placeholder members in src/content.ts (team.members) with the real team. */}
      <ul className="grid gap-5 md:grid-cols-3">
        {team.members.map((mbr, i) => (
          <Reveal as="li" key={mbr.role} delay={i * 0.1}>
            <Card className="h-full p-7">
              <div
                aria-hidden
                className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/40 via-fuchsia-600/25 to-transparent ring-1 ring-white/10"
              >
                <LogoMark className="size-8 opacity-80" />
              </div>
              <h3 className="font-display text-xl font-semibold">{mbr.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent-soft">{mbr.role}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{mbr.bio}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
