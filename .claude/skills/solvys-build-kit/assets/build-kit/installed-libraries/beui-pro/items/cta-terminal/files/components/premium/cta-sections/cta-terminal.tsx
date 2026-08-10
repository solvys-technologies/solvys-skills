"use client";

import { ArrowRight, Check, Copy } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/motion/button/base";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type CtaTerminalLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CtaTerminalProps = {
  eyebrow?: string;
  headline?: string[];
  subtext?: string;
  /** The install command typed out in the terminal. */
  command?: string;
  /** Faux install-log lines that stream in after the command runs. */
  output?: string[];
  primaryCta?: CtaTerminalLink;
  secondaryCta?: CtaTerminalLink;
  className?: string;
};

const DEFAULT_OUTPUT = [
  "Resolving items from the beUI registry…",
  "Added chat-input · message-stream · tool-call",
  "Installed 3 components in 1.2s",
];

export function CtaTerminal({
  eyebrow = "Ship in seconds",
  headline = ["One command.", "Production-ready UI."],
  subtext = "Pull premium, animated components straight into your app from the beUI registry — no boilerplate, no config.",
  command = "npx shadcn@latest add @beui/agent-kit",
  output = DEFAULT_OUTPUT,
  primaryCta = { label: "Get your license", href: "#" },
  secondaryCta = { label: "Browse components", href: "#" },
  className,
}: CtaTerminalProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px" });
  const still = !!reduce || !inView;

  const [typed, setTyped] = useState(reduce ? command.length : 0);
  const [shown, setShown] = useState(reduce ? output.length : 0);
  const [copied, setCopied] = useState(false);

  // Scripted loop: type the command, run it, stream the log, hold, repeat.
  useEffect(() => {
    if (still) {
      setTyped(command.length);
      setShown(output.length);
      return;
    }
    let alive = true;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(window.setTimeout(res, ms));
      });
    (async () => {
      while (alive) {
        setTyped(0);
        setShown(0);
        for (let i = 1; i <= command.length && alive; i++) {
          setTyped(i);
          await wait(32);
        }
        await wait(450);
        for (let i = 1; i <= output.length && alive; i++) {
          setShown(i);
          await wait(300);
        }
        await wait(2800);
      }
    })();
    return () => {
      alive = false;
      for (const t of timers) {
        window.clearTimeout(t);
      }
    };
  }, [still, command, output.length]);

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  const copy = () => {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };

  const typing = typed < command.length;

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {eyebrow ? (
          <motion.span
            {...rise(0)}
            className="inline-flex items-center rounded-full border border-border bg-card/70 px-3 py-1 font-medium text-muted-foreground text-xs backdrop-blur"
          >
            {eyebrow}
          </motion.span>
        ) : null}

        <TextReveal
          as="h2"
          text={headline}
          split="word"
          blur={10}
          className="mt-5 max-w-2xl font-medium text-balance font-sans text-4xl text-foreground leading-[1.05] sm:text-5xl"
        />

        <motion.p
          {...rise(0.12)}
          className="mt-5 max-w-xl text-pretty text-muted-foreground text-sm leading-7 sm:text-base"
        >
          {subtext}
        </motion.p>

        {/* Terminal. */}
        <motion.div
          ref={ref}
          {...rise(0.2)}
          className="mt-9 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-foreground text-left text-background shadow-2xl ring-1 ring-background/10"
        >
          {/* Window chrome. */}
          <div className="flex items-center gap-2 border-background/10 border-b bg-background/5 px-4 py-3">
            <span className="size-3 rounded-full bg-background/35" />
            <span className="size-3 rounded-full bg-background/35" />
            <span className="size-3 rounded-full bg-background/35" />
            <span className="ml-2 font-mono text-[11px] text-background/55">
              ~/app
            </span>
            <button
              type="button"
              onClick={copy}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-background/10 bg-background/5 px-2 py-1 font-medium text-[11px] text-background/70 transition-colors hover:bg-background/10"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="ok"
                    initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="inline-flex items-center gap-1.5 text-success"
                  >
                    <Check className="size-3" />
                    Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Copy className="size-3" />
                    Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Body. */}
          <div className="space-y-2 px-4 py-5 font-mono text-[13px] leading-relaxed sm:px-5">
            <div className="flex items-start gap-2">
              <span className="select-none text-accent">$</span>
              <span className="text-background/90">
                {command.slice(0, typed)}
                {typing ? (
                  <motion.span
                    aria-hidden
                    animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
                    transition={
                      reduce
                        ? undefined
                        : {
                            duration: 0.9,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }
                    }
                    className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-accent align-middle"
                  />
                ) : null}
              </span>
            </div>

            {output.map((line, i) => (
              <motion.div
                key={line}
                initial={false}
                animate={
                  i < shown
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: reduce ? 0 : 6 }
                }
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="flex items-start gap-2 text-background/55"
              >
                <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                <span>{line}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTAs. */}
        <motion.div
          {...rise(0.28)}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <ButtonLink
            href={primaryCta.href}
            size="lg"
            className="px-7"
            {...(primaryCta.external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            {primaryCta.label}
            <ArrowRight className="size-4" />
          </ButtonLink>
          {secondaryCta ? (
            <ButtonLink
              href={secondaryCta.href}
              size="lg"
              variant="secondary"
              className="px-6"
              {...(secondaryCta.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              {secondaryCta.label}
            </ButtonLink>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
