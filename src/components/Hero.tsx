import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { hero, heroScenes, PLATFORMS } from "@/content";
import { Button } from "./ui/button";
import { Container } from "./Section";
import { MicrodramaScreen, PhoneFrame } from "./PhoneFrame";

function HeroPhone() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? 2 : 0);

  useEffect(() => {
    if (reduce) {
      setI(2); // Static frame with the A/B overlay.
      return;
    }
    const t = window.setTimeout(() => setI((n) => (n + 1) % heroScenes.length), heroScenes[i].duration);
    return () => window.clearTimeout(t);
  }, [i, reduce]);

  const scene = heroScenes[i];
  return (
    <div className="relative">
      {/* glow behind phone */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.35),rgb(217_70_239/0.12)_55%,transparent)]"
      />
      <div className={reduce ? "" : "animate-float"}>
        <PhoneFrame label={hero.phoneLabel} className="max-w-[270px] sm:max-w-[310px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <MicrodramaScreen
                kind={scene.kind}
                caption={scene.caption}
                timecode={scene.timecode}
                overlay={scene.kind === "choice" ? "choice" : undefined}
                animate={!reduce}
                progress={(i + 1) / heroScenes.length}
              />
            </m.div>
          </AnimatePresence>
        </PhoneFrame>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pb-28 sm:pt-16 lg:pt-20">
      {/* ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_58_237/0.28),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/3 h-[480px] w-[480px] bg-[radial-gradient(closest-side,rgb(217_70_239/0.16),transparent)]"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-accent-soft"
          >
            <span className="size-1.5 rounded-full bg-fuchsia-400 animate-pulse-glow" />
            {hero.eyebrow}
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-[clamp(2.9rem,8vw,5.6rem)] font-bold leading-[1.02]"
          >
            <span className="text-gradient">{hero.headline}</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {hero.subline}
          </m.p>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button asChild size="lg">
              <Link to={{ pathname: hero.primary.to, hash: `#${hero.primary.hash}` }}>
                {hero.primary.label} <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={{ pathname: hero.secondary.to, hash: `#${hero.secondary.hash}` }}>
                <Play /> {hero.secondary.label}
              </Link>
            </Button>
          </m.div>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col items-center gap-3 lg:items-start"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {hero.platformsLabel}
            </p>
            <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {PLATFORMS.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-foreground/90"
                >
                  {p}
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <HeroPhone />
        </m.div>
      </Container>
    </section>
  );
}
