import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Circle, Cpu, Globe, Mail, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { aws } from "@/content";
import { BRAND_NAME } from "@/config";
import { usePageMeta } from "@/lib/usePageMeta";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeader } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const whyIcons: Record<string, LucideIcon> = { gpu: Cpu, sparkles: Sparkles, workflow: Workflow, globe: Globe };
const usd = (n: number) => `USD ${n.toLocaleString("en-US")}`;

export default function AwsPage() {
  usePageMeta(aws.metaTitle, aws.metaDescription);
  const { credits } = aws;

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pb-6 pt-14 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_58_237/0.25),transparent)]"
        />
        <Container className="relative max-w-4xl text-center">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> {aws.contact.back}
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">{aws.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.6rem,7vw,4.8rem)] font-bold leading-[1.05]">
            <span className="text-gradient">{aws.title}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{aws.intro}</p>
        </Container>
      </section>

      {/* A. Architecture */}
      <Section id="architecture">
        <SectionHeader title={aws.architecture.title} intro={aws.architecture.intro} />
        <Reveal>
          <ArchitectureDiagram />
          <p className="mt-3 text-center text-xs text-muted-foreground lg:hidden">{aws.architecture.scrollHint}</p>
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <h3 className="mb-4 font-display text-lg font-semibold">{aws.architecture.flowTitle}</h3>
          <ol className="space-y-3">
            {aws.architecture.flow.map((step, i) => (
              <li key={step} className="flex gap-4 text-[15px] leading-relaxed text-muted-foreground">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* B. Credits */}
      <Section id="credits" className="bg-gradient-to-b from-transparent via-violet-950/[0.12] to-transparent">
        <SectionHeader title={credits.title} />
        <Reveal className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">{credits.title}</caption>
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <th scope="col" className="px-5 py-4 font-semibold">{credits.columns.service}</th>
                  <th scope="col" className="px-5 py-4 font-semibold">{credits.columns.share}</th>
                  <th scope="col" className="px-5 py-4 text-right font-semibold">{credits.columns.amount}</th>
                </tr>
              </thead>
              <tbody>
                {credits.rows.map((r) => (
                  <tr key={r.area} className="border-b border-white/[0.06] last:border-0">
                    <th scope="row" className="px-5 py-4 font-medium text-foreground">{r.area}</th>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="w-10 tabular-nums text-foreground">{r.share}%</span>
                        <span className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-white/10 sm:block" aria-hidden>
                          <span className="block h-full rounded-full bg-brand-gradient" style={{ width: `${r.share * 2.4}%` }} />
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-muted-foreground">
                      {usd((r.share / 100) * credits.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/15 bg-white/[0.03] font-semibold">
                  <th scope="row" className="px-5 py-4">{credits.totalLabel}</th>
                  <td className="px-5 py-4 tabular-nums">{credits.rows.reduce((a, r) => a + r.share, 0)}%</td>
                  <td className="px-5 py-4 text-right tabular-nums">{usd(credits.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">{credits.note}</p>
        </Reveal>
      </Section>

      {/* C. Why AWS */}
      <Section id="why-aws">
        <SectionHeader title={aws.why.title} />
        <ul className="grid gap-5 sm:grid-cols-2">
          {aws.why.items.map((it, i) => {
            const Icon = whyIcons[it.icon];
            return (
              <Reveal as="li" key={it.title} delay={i * 0.08}>
                <Card className="h-full p-7">
                  <span className="mb-5 flex size-11 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 text-accent-soft">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mb-2 font-display text-xl font-semibold">{it.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{it.body}</p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* D. First 90 days */}
      <Section id="first-90-days" className="bg-gradient-to-b from-transparent via-fuchsia-950/[0.10] to-transparent">
        <SectionHeader title={aws.roadmap90.title} />
        <ul className="mx-auto max-w-3xl space-y-3">
          {aws.roadmap90.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.07}>
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-surface p-5">
                <Circle className="mt-0.5 size-5 shrink-0 text-violet-400" aria-hidden />
                <div>
                  <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                  <p className="mt-1 text-[15px] text-muted-foreground">{it.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* E. Contact */}
      <Section id="contact">
        <Reveal>
          <div className="border-gradient relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-950/60 to-surface p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">{aws.contact.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{aws.contact.body}</p>
            {/* TODO: Replace the placeholder contact person in src/content.ts (aws.contact.person). */}
            <p className="mt-6 text-sm text-foreground">{aws.contact.person}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {aws.contact.emailLabel}: {aws.contact.email}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={`mailto:${aws.contact.email}?subject=${encodeURIComponent(`${BRAND_NAME} and AWS Activate`)}`}>
                  <Mail /> {aws.contact.cta}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/">
                  {aws.contact.back} <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
