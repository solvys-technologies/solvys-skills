"use client";

import { motion, useReducedMotion } from "motion/react";
import { type FormEvent, type SVGProps, useId, useRef, useState } from "react";
import {
  type ButtonState,
  StatefulButton,
} from "@/components/motion/button/stateful";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterSocial = {
  label: string;
  href: string;
  icon: "github" | "twitter" | "linkedin" | "youtube";
};

export type FooterMegaProps = {
  brand?: string;
  tagline?: string;
  /** Small live-status note next to the pulsing dot. */
  status?: string;
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  newsletterTitle?: string;
  newsletterNote?: string;
  /** Called with the submitted email. Resolve to drive the success state. */
  onSubscribe?: (email: string) => void | Promise<void>;
  legal?: string;
  /** Override the brand wordmark type — defaults to the pixel display face. */
  wordmarkClassName?: string;
  className?: string;
};

// Brand glyphs as inline SVG so the footer stays self-contained and accurate
// (lucide no longer ships brand icons). All paths use currentColor.
function BrandIcon({
  icon,
  ...props
}: { icon: FooterSocial["icon"] } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <title>{icon}</title>
      <path d={BRAND_PATH[icon]} />
    </svg>
  );
}

const BRAND_PATH = {
  github:
    "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z",
  twitter:
    "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z",
  youtube:
    "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z",
} as const;

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "#" },
      { label: "Blocks", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Registry", href: "#" },
      { label: "CLI", href: "#" },
      { label: "Examples", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const DEFAULT_SOCIALS: FooterSocial[] = [
  { label: "GitHub", href: "#", icon: "github" },
  { label: "Twitter", href: "#", icon: "twitter" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "YouTube", href: "#", icon: "youtube" },
];

export function FooterMega({
  brand = "beUI Pro",
  tagline = "Premium motion components and blocks for modern React apps.",
  status = "All systems operational",
  columns = DEFAULT_COLUMNS,
  socials = DEFAULT_SOCIALS,
  newsletterTitle = "Ship with the drops",
  newsletterNote = "New premium components in your inbox. No spam.",
  onSubscribe,
  legal = "© 2026 beUI Pro. All rights reserved.",
  wordmarkClassName = "font-sans text-xl",
  className,
}: FooterMegaProps) {
  const reduce = useReducedMotion();
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ButtonState>("idle");
  const resetRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading" || !email.trim()) return;
    clearTimeout(resetRef.current);
    setState("loading");
    try {
      await onSubscribe?.(email);
      setState("success");
      setEmail("");
    } catch {
      setState("error");
    }
    resetRef.current = setTimeout(() => setState("idle"), 2600);
  }

  const rise = (delay: number) =>
    reduce
      ? undefined
      : {
          initial: { opacity: 0, y: 20, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  return (
    <footer
      className={cn("relative w-full overflow-hidden bg-background", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-16 pb-8 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + newsletter. */}
          <motion.div {...rise(0)} className="flex flex-col">
            <span className={cn("text-foreground", wordmarkClassName)}>
              {brand}
            </span>
            <p className="mt-3 max-w-xs text-muted-foreground text-sm leading-6">
              {tagline}
            </p>

            {status ? (
              <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground text-xs">
                <span className="relative flex size-2">
                  {reduce ? null : (
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
                  )}
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                {status}
              </span>
            ) : null}

            <div className="mt-8">
              <p className="font-medium text-foreground text-sm">
                {newsletterTitle}
              </p>
              <p className="mt-1 text-muted-foreground text-sm">
                {newsletterNote}
              </p>
              <form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col gap-2.5 sm:flex-row"
              >
                <label htmlFor={emailId} className="sr-only">
                  Email address
                </label>
                <input
                  id={emailId}
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="h-12 flex-1 rounded-full border border-border bg-card px-5 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring"
                />
                <StatefulButton
                  type="submit"
                  size="lg"
                  state={state}
                  loadingText="Joining"
                  successText="Subscribed"
                  errorText="Try again"
                  className="shrink-0"
                >
                  Subscribe
                </StatefulButton>
              </form>
            </div>
          </motion.div>

          {/* Link columns. */}
          <motion.div
            {...rise(0.08)}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col">
                <p className="font-medium text-foreground text-sm">
                  {column.title}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="inline-flex w-fit items-center text-foreground text-sm opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:underline focus-visible:underline-offset-4 focus-visible:opacity-100"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar. */}
        <div className="mt-14 flex flex-col-reverse items-center gap-6 border-border border-t pt-8 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-xs">{legal}</p>
          <div className="flex items-center gap-1.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-10 place-items-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-card hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <BrandIcon icon={social.icon} className="size-[1.05rem]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
