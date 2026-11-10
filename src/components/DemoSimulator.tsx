import { useEffect, useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, Loader2, RotateCcw, Sparkles, ShieldCheck } from "lucide-react";
import { demo, PLATFORMS } from "@/content";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Section, SectionHeader } from "./Section";

const STAGE_MS = 1100;
const frameGradients = [
  "from-indigo-900 via-violet-950 to-black",
  "from-violet-900 via-purple-950 to-black",
  "from-fuchsia-900 via-purple-950 to-black",
  "from-pink-900 via-fuchsia-950 to-black",
];

type Format = "choice" | "cliffhanger";

function Storyboard({ premise, format }: { premise: string; format: Format }) {
  const s = demo.storyboard;
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-surface-2/80 p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">{s.heading}</p>
          <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
          <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{s.logline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{s.mockLabel}</Badge>
          <Badge>{s.runtime}</Badge>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{demo.inputLabel}:</span> {premise}
      </p>

      <ol className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {s.frames.map((f, i) => (
          <m.li
            key={f.time}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className={cn(
              "relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b p-3",
              frameGradients[i],
            )}
          >
            <div className="flex items-center justify-between text-[11px] font-medium">
              <span className="rounded-full bg-black/40 px-2 py-0.5 text-white/90">{f.tag}</span>
              <span className="font-mono text-white/70">{f.time}</span>
            </div>
            <p className="font-display text-[15px] font-bold leading-tight text-white [text-shadow:0_2px_10px_rgb(0_0_0/0.8)]">
              {f.caption}
            </p>
          </m.li>
        ))}
      </ol>

      {format === "choice" ? (
        <div className="mt-5 rounded-xl border border-violet-400/25 bg-violet-500/[0.07] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-soft">{s.choice.heading}</p>
          <p className="mt-2 font-display text-lg font-semibold">{s.choice.prompt}</p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {[
              { k: "A", t: s.choice.a },
              { k: "B", t: s.choice.b },
            ].map((c) => (
              <div key={c.k} className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/30 px-4 py-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white">
                  {c.k}
                </span>
                <span className="font-medium">{c.t}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.choice.note}</p>
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/[0.07] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200">{s.cliffhanger.heading}</p>
          <p className="mt-2 font-display text-lg font-semibold">{s.cliffhanger.line}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.cliffhanger.note}</p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.publishLabel}</span>
          {PLATFORMS.map((p) => (
            <span key={p} className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-xs">
              {p}
            </span>
          ))}
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-accent-soft" /> {s.reviewNote}
        </p>
      </div>
    </m.div>
  );
}

export function DemoSimulator() {
  const inputId = useId();
  const [premise, setPremise] = useState("");
  const [format, setFormat] = useState<Format>("choice");
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [usedPremise, setUsedPremise] = useState(demo.placeholder);

  const total = demo.stages.length;
  const done = started && elapsed >= total * STAGE_MS;
  const running = started && !done;
  const activeStage = Math.min(Math.floor(elapsed / STAGE_MS), total - 1);

  useEffect(() => {
    if (!running) return;
    const start = performance.now() - elapsed;
    const id = window.setInterval(() => {
      setElapsed(Math.min(performance.now() - start, total * STAGE_MS));
    }, 50);
    return () => window.clearInterval(id);
    // elapsed is intentionally excluded: the interval owns the clock once started.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, total]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (running) return;
    setUsedPremise(premise.trim() || demo.placeholder);
    setElapsed(0);
    setStarted(true);
  };

  const reset = () => {
    setStarted(false);
    setElapsed(0);
    setPremise("");
  };

  const stageProgress = (i: number) => {
    const start = i * STAGE_MS;
    return Math.max(0, Math.min(1, (elapsed - start) / STAGE_MS));
  };

  return (
    <Section id={demo.id}>
      <SectionHeader eyebrow={demo.eyebrow} title={demo.title} intro={demo.intro} />

      <div className="relative mx-auto max-w-4xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgb(124_58_237/0.18),transparent)]"
        />
        <div className="border-gradient rounded-3xl bg-surface/90 p-5 backdrop-blur sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <Badge variant="accent">
              <Sparkles className="size-3.5" /> {demo.badge}
            </Badge>
            <p className="text-right text-xs text-muted-foreground">{demo.disclaimer}</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={inputId}>{demo.inputLabel}</Label>
              <Input
                id={inputId}
                value={premise}
                onChange={(e) => setPremise(e.target.value)}
                placeholder={demo.placeholder}
                disabled={running}
                maxLength={160}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <fieldset className="space-y-2" disabled={running}>
                <legend className="mb-2 text-sm font-medium">{demo.formatLabel}</legend>
                <div className="inline-flex rounded-full border border-white/12 bg-black/30 p-1">
                  {demo.formats.map((f) => (
                    <label
                      key={f.value}
                      className={cn(
                        "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
                        format === f.value ? "bg-white/12 text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <input
                        type="radio"
                        name="demo-format"
                        value={f.value}
                        checked={format === f.value}
                        onChange={() => setFormat(f.value as Format)}
                        className="sr-only"
                      />
                      {f.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Button type="submit" size="lg" disabled={running} className="w-full sm:w-auto">
                {running ? (
                  <>
                    <Loader2 className="animate-spin" /> {demo.running}
                  </>
                ) : (
                  <>
                    <Sparkles /> {demo.submit}
                  </>
                )}
              </Button>
            </div>
          </form>

          <AnimatePresence initial={false}>
            {started && (
              <m.div
                key="out"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="pt-8">
                  <p className="sr-only" aria-live="polite">
                    {done ? demo.storyboard.heading : `${demo.stages[activeStage].label}`}
                  </p>
                  <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {demo.stages.map((s, i) => {
                      const p = stageProgress(i);
                      const complete = p >= 1;
                      const active = running && i === activeStage;
                      return (
                        <li
                          key={s.label}
                          className={cn(
                            "rounded-xl border p-4 transition-colors",
                            active ? "border-violet-400/50 bg-violet-500/[0.08]" : "border-white/10 bg-black/20",
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-2 text-sm font-medium">
                              <span
                                className={cn(
                                  "flex size-5 items-center justify-center rounded-full text-[11px] font-bold",
                                  complete ? "bg-brand-gradient text-white" : "bg-white/10 text-muted-foreground",
                                )}
                              >
                                {complete ? <Check className="size-3" strokeWidth={3} /> : i + 1}
                              </span>
                              {s.label}
                            </span>
                            <span className="font-mono text-xs tabular-nums text-muted-foreground">
                              {Math.round(p * 100)}%
                            </span>
                          </div>
                          <div
                            role="progressbar"
                            aria-label={s.label}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(p * 100)}
                            className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
                          >
                            <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${p * 100}%` }} />
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  {done && (
                    <div className="mt-6">
                      <Storyboard premise={usedPremise} format={format} />
                      <div className="mt-5 flex justify-center">
                        <Button variant="ghost" onClick={reset}>
                          <RotateCcw /> {demo.reset}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
