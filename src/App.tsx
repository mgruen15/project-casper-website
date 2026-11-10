import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollManager } from "@/components/ScrollManager";
import HomePage from "@/pages/HomePage";

const LegalPage = lazy(() => import("@/pages/LegalPage"));

// Vite injects the configured base path, for example /project-casper-website/ on GitHub Pages.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation}>
          <ScrollManager />
          <a
            href="#main"
            className="sr-only z-[70] rounded-full bg-white px-4 py-2 text-sm font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="overflow-x-clip">
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/impressum" element={<LegalPage kind="impressum" />} />
                <Route path="/datenschutz" element={<LegalPage kind="datenschutz" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <div aria-hidden className="film-grain" />
        </LazyMotion>
      </MotionConfig>
    </BrowserRouter>
  );
}
