import { Link } from "react-router-dom";
import { legal } from "@/content";
import { BRAND_NAME } from "@/config";
import { Container } from "@/components/Section";
import { usePageMeta } from "@/lib/usePageMeta";

export default function LegalPage({ kind }: { kind: "impressum" | "datenschutz" }) {
  const page = legal[kind];
  usePageMeta(`${page.title} | ${BRAND_NAME}`);
  return (
    <Container className="max-w-3xl py-20 sm:py-28">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <p className="mt-4 rounded-lg border border-dashed border-white/20 px-4 py-3 text-sm text-muted-foreground">
        {legal.placeholderNote}
      </p>
      {/* TODO: Replace the placeholder lines in src/content.ts (legal) with the real text. */}
      <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-foreground/90">
        {page.body.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <Link to="/" className="mt-10 inline-block text-accent-soft underline underline-offset-4">
        {legal.back}
      </Link>
    </Container>
  );
}
