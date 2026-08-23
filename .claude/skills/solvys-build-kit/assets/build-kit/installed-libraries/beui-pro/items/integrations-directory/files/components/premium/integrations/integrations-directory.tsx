"use client";

import { ChevronRight, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Marquee } from "@/components/motion/marquee";
import { SPRING_LAYOUT, SPRING_SWAP } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { Grainient } from "../feature-sections/grainient";
import { IntegrationConnectDialog } from "./integration-connect-dialog";
import { DEFAULT_INTEGRATIONS, type IntegrationItem } from "./integration-data";
import { IntegrationMark } from "./integration-mark";

type IntegrationView = "browse" | "installed";

export type IntegrationsDirectoryProps = {
  title?: string;
  description?: string;
  integrations?: readonly IntegrationItem[];
  className?: string;
};

export function IntegrationsDirectory({
  title = "Integrations",
  description = "Plug in the tools your team already uses.",
  integrations = DEFAULT_INTEGRATIONS,
  className,
}: IntegrationsDirectoryProps) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<IntegrationView>("browse");
  const [selectedIntegration, setSelectedIntegration] =
    useState<IntegrationItem | null>(null);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return integrations.filter((integration) => {
      const matchesView = view === "browse" || integration.installed;
      const matchesQuery =
        !normalized ||
        integration.name.toLowerCase().includes(normalized) ||
        integration.description.toLowerCase().includes(normalized);
      return matchesView && matchesQuery;
    });
  }, [integrations, query, view]);

  return (
    <section
      className={cn("w-full bg-background px-4 py-16 sm:px-8", className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-foreground tracking-[-0.04em] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-1.5 text-muted-foreground">{description}</p>
          </div>

          <label className="relative block w-full sm:max-w-sm">
            <span className="sr-only">Search integrations</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search integrations"
              className="h-11 w-full rounded-full border border-border bg-muted/55 pr-5 pl-11 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/20"
            />
          </label>
        </div>

        <div className="mt-6 inline-flex rounded-full bg-muted p-1">
          {(["browse", "installed"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setView(item)}
              className={cn(
                "relative min-h-9 rounded-full px-4 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                item === view
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item === view ? (
                <motion.span
                  layoutId="integration-view"
                  transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                  className="absolute inset-0 rounded-full bg-background"
                />
              ) : null}
              <span className="relative">{item}</span>
            </button>
          ))}
        </div>

        <IntegrationMarqueeBanner integrations={integrations} />

        {visible.length ? (
          <motion.div
            layout
            className="mt-5 grid min-w-0 gap-x-8 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((integration) => (
                <motion.button
                  layout
                  key={integration.id}
                  type="button"
                  onClick={() => setSelectedIntegration(integration)}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={reduce ? { duration: 0 } : SPRING_SWAP}
                  className={cn(
                    "group flex min-h-20 min-w-0 w-full items-center gap-3 rounded-2xl px-2.5 text-left transition-colors hover:bg-muted/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  <IntegrationMark
                    integration={integration}
                    className="size-10 rounded-xl"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate font-semibold text-foreground">
                        {integration.name}
                      </span>
                      {integration.installed ? (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-700 uppercase tracking-[0.08em] dark:text-emerald-300">
                          Installed
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block truncate text-muted-foreground text-sm">
                      {integration.description}
                    </span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-5">
            <EmptyIntegrations onReset={() => setQuery("")} />
          </div>
        )}
      </div>

      {selectedIntegration ? (
        <IntegrationConnectDialog
          integration={selectedIntegration}
          open
          onOpenChange={(open) => {
            if (!open) setSelectedIntegration(null);
          }}
        />
      ) : null}
    </section>
  );
}

function IntegrationMarqueeBanner({
  integrations,
}: {
  integrations: readonly IntegrationItem[];
}) {
  const repeated = [...integrations, ...integrations];
  const offset = Math.max(1, Math.floor(integrations.length / 2));
  const secondRow = [...repeated.slice(offset), ...repeated.slice(0, offset)];

  return (
    <div
      aria-hidden="true"
      className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-border/60 bg-muted py-6 sm:py-8"
    >
      <Grainient
        className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-55"
        color1="#d9ebff"
        color2="#8fc5ff"
        color3="#4b8ee8"
        grainAmount={0.06}
        contrast={1.05}
        saturation={0.9}
        zoom={0.82}
      />
      <div className="relative space-y-5">
        <Marquee speed={34} gap="1.5rem">
          {repeated.map((integration, index) => (
            <IntegrationMark
              key={`${integration.id}-first-${index}`}
              integration={integration}
              className="size-12 rounded-xl border-border/45 bg-background/15 backdrop-blur-md sm:size-14"
            />
          ))}
        </Marquee>
        <Marquee direction="right" speed={38} gap="1.5rem">
          {secondRow.map((integration, index) => (
            <IntegrationMark
              key={`${integration.id}-second-${index}`}
              integration={integration}
              className="size-12 rounded-xl border-border/45 bg-background/15 backdrop-blur-md sm:size-14"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

function EmptyIntegrations({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid min-h-64 place-items-center rounded-[2rem] border border-border bg-muted/30 px-6 text-center">
      <div>
        <Sparkles className="mx-auto size-5 text-muted-foreground" />
        <p className="mt-3 font-medium text-foreground">
          No integrations found
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 text-muted-foreground text-sm underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Clear search
        </button>
      </div>
    </div>
  );
}
