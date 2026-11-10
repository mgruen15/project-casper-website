import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { nav, type NavLink } from "@/content";
import { LogoLink } from "./Logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const toObj = (l: NavLink) => ({ pathname: l.to, hash: l.hash ? `#${l.hash}` : "" });

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-white/10 bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <LogoLink />

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.links.map((l) => {
            const active = !l.hash && pathname === l.to;
            return (
              <li key={l.label}>
                <Link
                  to={toObj(l)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.06] hover:text-foreground",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to={toObj(nav.cta)}>{nav.cta.label}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="!size-5" /> : <Menu className="!size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {nav.links.map((l) => (
              <li key={l.label}>
                <Link
                  to={toObj(l)}
                  className="block rounded-lg px-2 py-3 text-lg font-medium text-foreground hover:bg-white/[0.05]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-4 w-full" size="lg">
            <Link to={toObj(nav.cta)}>{nav.cta.label}</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
