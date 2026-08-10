"use client";

import { ArrowUpRight, Check } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/motion/button/base";
import { EASE_OUT, SPRING_PRESS, SPRING_SWAP } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";
import { IntegrationConnectDialog } from "./integration-connect-dialog";
import { DEFAULT_INTEGRATIONS, type IntegrationItem } from "./integration-data";
import { IntegrationMark } from "./integration-mark";

const ORBIT_POINTS = [
  { x: 50, y: 8 },
  { x: 82.84, y: 23.81 },
  { x: 90.94, y: 59.35 },
  { x: 68.22, y: 87.84 },
  { x: 31.78, y: 87.84 },
  { x: 9.06, y: 59.35 },
  { x: 17.16, y: 23.81 },
] as const;

export type IntegrationsOrbitProps = {
  title?: string;
  description?: string;
  integrations?: readonly IntegrationItem[];
  togetherHighlight?: "background" | "underline" | "none";
  className?: string;
};

export function IntegrationsOrbit({
  title = "Everything works better together.",
  description = "Connect the tools your team already trusts and keep every handoff moving from one shared workspace.",
  integrations = DEFAULT_INTEGRATIONS,
  togetherHighlight = "underline",
  className,
}: IntegrationsOrbitProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const [dialogOpen, setDialogOpen] = useState(false);
  const orbitHovering = useRef(false);
  const orbitFocused = useRef(false);
  const orbitRotation = useMotionValue(0);
  const counterRotation = useTransform(orbitRotation, (value) => -value);
  const innerRotation = useTransform(orbitRotation, (value) => value * -0.65);
  const visibleIntegrations = useMemo(
    () => integrations.slice(0, ORBIT_POINTS.length),
    [integrations],
  );
  const [selectedId, setSelectedId] = useState(
    visibleIntegrations[0]?.id ?? "",
  );
  const selected =
    visibleIntegrations.find((integration) => integration.id === selectedId) ??
    visibleIntegrations[0];
  useAnimationFrame((_time, delta) => {
    if (reduce || dialogOpen || orbitHovering.current || orbitFocused.current)
      return;
    orbitRotation.set((orbitRotation.get() + delta * 0.006) % 360);
  });

  if (!selected) return null;

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-background px-4 py-20 sm:px-8 sm:py-24",
        className,
      )}
    >
      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduce ? 0 : 0.08 },
          },
        }}
        className="mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="font-medium text-muted-foreground text-xs uppercase tracking-[0.18em]"
          >
            Connected workspace
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mt-4 text-balance font-semibold text-4xl text-foreground tracking-[-0.045em] sm:text-5xl"
          >
            <TogetherHighlight title={title} style={togetherHighlight} />
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground leading-7"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.97 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="relative mx-auto mt-14 aspect-square w-full max-w-[660px]"
        >
          <div className="absolute inset-[8%] rounded-full border border-border/70" />
          <motion.div
            style={{ rotate: reduce ? 0 : innerRotation }}
            className="absolute inset-[24%] rounded-full border border-border/60 border-dashed"
          />
          <div className="absolute inset-[28%] rounded-full bg-muted/50" />

          <motion.div
            style={{ rotate: reduce ? 0 : orbitRotation }}
            onPointerEnter={() => {
              if (canHover) orbitHovering.current = true;
            }}
            onPointerLeave={() => {
              orbitHovering.current = false;
            }}
            onFocusCapture={() => {
              orbitFocused.current = true;
            }}
            onBlurCapture={() => {
              orbitFocused.current = false;
            }}
            className="absolute inset-0 z-10"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full overflow-visible"
            >
              {visibleIntegrations.map((integration, index) => {
                const point = ORBIT_POINTS[index];
                const active = integration.id === selected.id;

                return (
                  <motion.line
                    key={integration.id}
                    x1="50"
                    y1="50"
                    x2={point.x}
                    y2={point.y}
                    vectorEffect="non-scaling-stroke"
                    className={cn(
                      active ? "stroke-foreground" : "stroke-border",
                    )}
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: active ? 0.8 : 0.55,
                    }}
                    transition={{
                      duration: reduce ? 0 : active ? 0.55 : 0.8,
                      delay: reduce ? 0 : index * 0.04,
                      ease: EASE_OUT,
                    }}
                  />
                );
              })}
            </svg>

            {visibleIntegrations.map((integration, index) => {
              const point = ORBIT_POINTS[index];
              const active = integration.id === selected.id;
              const hoverX = ((point.x - 50) / 42) * 4;
              const hoverY = ((point.y - 50) / 42) * 4;

              return (
                <motion.div
                  key={integration.id}
                  initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    ...SPRING_PRESS,
                    delay: reduce ? 0 : 0.18 + index * 0.06,
                  }}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.button
                    type="button"
                    aria-label={`Show ${integration.name}`}
                    aria-pressed={active}
                    onClick={() => setSelectedId(integration.id)}
                    style={{ rotate: reduce ? 0 : counterRotation }}
                    whileHover={
                      reduce || !canHover
                        ? undefined
                        : {
                            x: hoverX,
                            y: hoverY,
                            scale: active ? 1.04 : 1.08,
                          }
                    }
                    whileTap={reduce ? undefined : { scale: 0.94 }}
                    transition={SPRING_PRESS}
                    className="group relative rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <IntegrationMark
                      integration={integration}
                      className={cn(
                        "size-11 rounded-xl bg-background transition-colors sm:size-14 sm:rounded-2xl",
                        active && "border-foreground",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute top-full left-1/2 mt-2 hidden -translate-x-1/2 whitespace-nowrap font-medium text-[11px] transition-colors sm:block",
                        active ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {integration.name}
                    </span>
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            key={selected.id}
            initial={
              reduce
                ? false
                : { opacity: 0, y: 8, filter: "blur(5px)", scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={reduce ? { duration: 0 } : SPRING_SWAP}
            className="absolute top-1/2 left-1/2 z-20 flex w-[42%] max-w-[17rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
          >
            <IntegrationMark
              integration={selected}
              className="size-10 rounded-full bg-background sm:size-14"
            />
            <p className="mt-1.5 font-semibold text-base text-foreground tracking-[-0.025em] sm:mt-3 sm:text-xl">
              {selected.name}
            </p>
            <p className="mt-1 hidden max-w-48 text-muted-foreground text-xs leading-5 min-[420px]:block sm:text-sm">
              {selected.description}
            </p>
            <Button
              size="sm"
              variant={selected.installed ? "secondary" : "primary"}
              onClick={() => setDialogOpen(true)}
              className="mt-2 sm:mt-3"
            >
              {selected.installed ? (
                <>
                  <Check className="size-3.5" />
                  Connected
                </>
              ) : (
                <>
                  Connect
                  <ArrowUpRight className="size-3.5" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>

        <IntegrationConnectDialog
          integration={selected}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </motion.div>
    </section>
  );
}

function TogetherHighlight({
  title,
  style,
}: {
  title: string;
  style: NonNullable<IntegrationsOrbitProps["togetherHighlight"]>;
}) {
  const match = title.match(/\btogether\b/i);
  if (!match || match.index === undefined || style === "none") return title;

  const start = match.index;
  const end = start + match[0].length;

  return (
    <>
      {title.slice(0, start)}
      <span
        className={cn(
          "relative inline-block whitespace-nowrap",
          style === "background" &&
            "rounded-[0.18em] bg-muted px-[0.14em] py-[0.02em]",
        )}
      >
        {match[0]}
        {style === "underline" ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 120 12"
            preserveAspectRatio="none"
            className="absolute -bottom-[0.13em] left-0 h-[0.2em] w-full overflow-visible text-foreground/35"
          >
            <path
              d="M2 8C30 2 88 2 118 7"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
        ) : null}
      </span>
      {title.slice(end)}
    </>
  );
}
