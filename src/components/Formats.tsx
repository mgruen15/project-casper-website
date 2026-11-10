import { Check } from "lucide-react";
import { formats } from "@/content";
import { Badge } from "./ui/badge";
import { Reveal } from "./Reveal";
import { Section, SectionHeader } from "./Section";
import { MicrodramaScreen, PhoneFrame } from "./PhoneFrame";

export function Formats() {
  return (
    <Section id={formats.id}>
      <SectionHeader eyebrow={formats.eyebrow} title={formats.title} intro={formats.intro} />
      <div className="grid gap-6 lg:grid-cols-2">
        {formats.cards.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.12} className="h-full">
            <article className="border-gradient relative flex h-full flex-col gap-8 overflow-hidden rounded-3xl bg-surface p-7 sm:flex-row sm:p-9">
              <div
                aria-hidden
                className={
                  c.key === "choice"
                    ? "pointer-events-none absolute -right-20 -top-20 size-72 bg-[radial-gradient(closest-side,rgb(217_70_239/0.18),transparent)]"
                    : "pointer-events-none absolute -right-20 -top-20 size-72 bg-[radial-gradient(closest-side,rgb(124_58_237/0.22),transparent)]"
                }
              />
              <div className="relative flex flex-1 flex-col">
                <Badge variant="accent" className="self-start">
                  {c.badge}
                </Badge>
                <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
                <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">
                  {formats.driversLabel}
                </p>
                <ul className="space-y-2.5">
                  {c.drives.map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] leading-snug text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-fuchsia-300" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mx-auto w-full max-w-[170px] shrink-0 self-center sm:mx-0 sm:w-[170px]">
                <PhoneFrame
                  label={c.key === "choice" ? "Phone mockup with an A or B choice overlay" : "Phone mockup with a cliffhanger ending"}
                  className="rounded-[1.9rem] p-[5px]"
                >
                  {c.key === "choice" ? (
                    <MicrodramaScreen kind="seat" caption="What do you do?" timecode="0:44" overlay="choice" animate={false} progress={0.85} />
                  ) : (
                    <MicrodramaScreen kind="cabin" caption="Row 14 is not empty anymore." timecode="0:58" overlay="cliffhanger" animate={false} progress={0.95} />
                  )}
                </PhoneFrame>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
