import { lazy, Suspense, useEffect } from "react";
import { Hero } from "@/components/Hero";

const loadBelowFold = () => import("./BelowFold");
const BelowFold = lazy(loadBelowFold);

export default function HomePage() {
  // Start fetching the rest of the page as soon as the browser is idle.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => void loadBelowFold());
    else setTimeout(() => void loadBelowFold(), 300);
  }, []);

  return (
    <>
      <Hero />
      <Suspense fallback={<div aria-hidden style={{ minHeight: "200vh" }} />}>
        <BelowFold />
      </Suspense>
    </>
  );
}
