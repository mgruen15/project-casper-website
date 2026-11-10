import { Link } from "react-router-dom";
import { BRAND_NAME } from "@/config";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="4" y1="3" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#E879F9" />
        </linearGradient>
      </defs>
      <path
        fill="url(#logo-g)"
        d="M16 4c-5.2 0-8.8 3.9-8.8 8.9v13.1l3.2-2.7 2.9 2.7 2.7-2.7 2.7 2.7 2.9-2.7 3.2 2.7V12.9C24.8 7.9 21.2 4 16 4Z"
      />
      <circle cx="12.7" cy="12.9" r="1.7" fill="#0A0A0F" />
      <circle cx="19.3" cy="12.9" r="1.7" fill="#0A0A0F" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight", className)}>
      <LogoMark />
      {BRAND_NAME}
    </span>
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label={`${BRAND_NAME} home`} className={cn("rounded-md", className)}>
      <Wordmark />
    </Link>
  );
}
