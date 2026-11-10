import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props} />;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-2xl flex-col gap-4 sm:mb-16",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">{eyebrow}</p>
      )}
      <h2 className="text-balance text-3xl font-bold leading-[1.1] sm:text-5xl">{title}</h2>
      {intro && <p className="text-lg leading-relaxed text-muted-foreground">{intro}</p>}
    </Reveal>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}
