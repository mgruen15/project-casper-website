import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { CONTACT_EMAIL, BRAND_NAME } from "@/config";
import { footer } from "@/content";
import { Wordmark } from "./Logo";
import { Container } from "./Section";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background py-14">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <Link to="/" aria-label={`${BRAND_NAME} home`} className="inline-block rounded-md">
            <Wordmark />
          </Link>
          <p className="text-[15px] leading-relaxed text-muted-foreground">{footer.blurb}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          <nav aria-label="Footer">
            <ul className="space-y-3 text-sm">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 text-sm">
            <p className="font-medium text-foreground">{footer.contactLabel}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 break-all text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4 shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </Container>
      <Container className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-relaxed text-muted-foreground">
        <p>{footer.rights}</p>
      </Container>
    </footer>
  );
}
