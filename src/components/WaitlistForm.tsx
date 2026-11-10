import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { waitlist } from "@/content";
import { submitWaitlist } from "@/lib/waitlist";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

type Errors = Partial<Record<"name" | "email" | "interest" | "form", string>>;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistForm() {
  const uid = useId();
  const [values, setValues] = useState({ name: "", email: "", company: "", interest: "" });
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const f = waitlist.fields;

  const set = (k: keyof typeof values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = waitlist.errors.name;
    if (!emailRe.test(values.email.trim())) next.email = waitlist.errors.email;
    if (!values.interest) next.interest = waitlist.errors.interest;
    setErrors(next);
    if (Object.keys(next).length) return;
    if (trap) {
      setStatus("done"); // Bots fill the hidden field. Pretend it worked.
      return;
    }
    setStatus("sending");
    try {
      await submitWaitlist({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        interest: values.interest,
      });
      setStatus("done");
    } catch {
      setStatus("idle");
      setErrors({ form: waitlist.errors.generic });
    }
  };

  return (
    <Section id={waitlist.id}>
      <div className="relative mx-auto max-w-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-16 -z-10 bg-[radial-gradient(closest-side,rgb(124_58_237/0.25),rgb(217_70_239/0.08)_60%,transparent)]"
        />
        <Reveal className="border-gradient rounded-3xl bg-surface/90 p-7 backdrop-blur sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">{waitlist.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{waitlist.title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{waitlist.intro}</p>

          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <m.div
                key="ok"
                role="status"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-violet-400/25 bg-violet-500/[0.07] px-6 py-10 text-center"
              >
                <CheckCircle2 className="size-10 text-fuchsia-300" />
                <p className="font-display text-2xl font-bold">{waitlist.success.title}</p>
                <p className="text-muted-foreground">{waitlist.success.body}</p>
              </m.div>
            ) : (
              <m.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id={`${uid}-name`} label={f.name.label} error={errors.name}>
                    <Input
                      id={`${uid}-name`}
                      name="name"
                      autoComplete="name"
                      placeholder={f.name.placeholder}
                      value={values.name}
                      onChange={(e) => set("name")(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                      maxLength={200}
                    />
                  </Field>
                  <Field id={`${uid}-email`} label={f.email.label} error={errors.email}>
                    <Input
                      id={`${uid}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={f.email.placeholder}
                      value={values.email}
                      onChange={(e) => set("email")(e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                      maxLength={320}
                    />
                  </Field>
                </div>
                <Field id={`${uid}-company`} label={f.company.label}>
                  <Input
                    id={`${uid}-company`}
                    name="company"
                    autoComplete="organization"
                    placeholder={f.company.placeholder}
                    value={values.company}
                    onChange={(e) => set("company")(e.target.value)}
                    maxLength={200}
                  />
                </Field>
                <Field id={`${uid}-interest`} label={f.interest.label} error={errors.interest}>
                  <Select name="interest" value={values.interest} onValueChange={set("interest")}>
                    <SelectTrigger
                      id={`${uid}-interest`}
                      aria-invalid={!!errors.interest}
                      aria-describedby={errors.interest ? `${uid}-interest-err` : undefined}
                    >
                      <SelectValue placeholder={f.interest.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {f.interest.options.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Honeypot. Hidden from people and assistive tech. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                  </label>
                </div>

                {errors.form && (
                  <p role="alert" className="text-sm text-red-300">
                    {errors.form}
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" /> {waitlist.sending}
                    </>
                  ) : (
                    <>
                      <Send /> {waitlist.submit}
                    </>
                  )}
                </Button>
                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                  {waitlist.privacy}{" "}
                  <Link to="/datenschutz" className="text-accent-soft underline underline-offset-4">
                    {waitlist.privacyLink}
                  </Link>
                  .
                </p>
              </m.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
