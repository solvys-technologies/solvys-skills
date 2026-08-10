"use client";

import { ArrowLeftRight, Check, Search } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { AnimatedBadge } from "@/components/motion/animated-badge";
import { Button } from "@/components/motion/button/base";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { Switch } from "@/components/premium/switch";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { IntegrationConnectDialog } from "./integration-connect-dialog";
import {
  DEFAULT_INTEGRATIONS,
  type IntegrationCategory,
  type IntegrationItem,
} from "./integration-data";
import { IntegrationMark } from "./integration-mark";

const FILTERS = [
  "All",
  "Developer",
  "Communication",
  "Design",
  "Data",
  "Payments",
] as const;

type Filter = "All" | IntegrationCategory;

export type IntegrationsEditorialProps = {
  title?: string;
  description?: string;
  integrations?: readonly IntegrationItem[];
  className?: string;
};

export function IntegrationsEditorial({
  title = "Connect the tools behind your work.",
  description = "Browse integrations, find the right fit, and manage every connection in one place.",
  integrations = DEFAULT_INTEGRATIONS,
  className,
}: IntegrationsEditorialProps) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [connectedIds, setConnectedIds] = useState(
    () =>
      new Set(
        integrations
          .filter((integration) => integration.installed)
          .map((integration) => integration.id),
      ),
  );
  const [dialogIntegration, setDialogIntegration] =
    useState<IntegrationItem | null>(null);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return integrations.filter((integration) => {
      const matchesFilter = filter === "All" || integration.category === filter;
      const matchesQuery =
        !normalized ||
        integration.name.toLowerCase().includes(normalized) ||
        integration.description.toLowerCase().includes(normalized);

      return matchesFilter && matchesQuery;
    });
  }, [filter, integrations, query]);

  const toggleConnection = (id: string) => {
    setConnectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      className={cn(
        "w-full bg-background px-4 py-16 text-foreground sm:px-8 sm:py-20",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-medium text-muted-foreground text-sm">
            Integrations
          </p>
          <h2 className="mt-3 text-balance font-semibold text-3xl leading-tight tracking-[-0.045em] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-muted-foreground leading-7">
            {description}
          </p>
        </div>

        <div className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Tabs
            value={filter}
            onValueChange={(value) => setFilter(value as Filter)}
            variant="pill"
            className="overflow-x-auto"
          >
            <TabsList
              className="min-w-max"
              aria-label="Filter integrations by category"
            >
              {FILTERS.map((item) => (
                <TabsTrigger key={item} value={item} className="min-h-9">
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <label className="relative block w-full lg:max-w-xs">
            <span className="sr-only">Search integrations</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search integrations"
              className="h-11 w-full rounded-full border border-border bg-background pr-5 pl-11 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus-visible:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring/15"
            />
          </label>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {visible.length ? (
            <motion.div
              key={filter}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT }
              }
              className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((integration) => {
                const connected = connectedIds.has(integration.id);

                return (
                  <article
                    key={integration.id}
                    className="flex min-h-60 flex-col rounded-2xl bg-muted p-2"
                  >
                    <div className="flex min-h-10 items-center gap-2 px-2 pb-2">
                      <h3 className="truncate font-medium text-lg tracking-[-0.025em]">
                        {integration.name}
                      </h3>
                      {connected ? (
                        <AnimatedBadge
                          status="success"
                          size="sm"
                          icon={<Check className="size-3" />}
                          className="ml-auto"
                        >
                          Connected
                        </AnimatedBadge>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col rounded-2xl bg-background p-3">
                      <IntegrationMark
                        integration={integration}
                        className="size-12 rounded-xl"
                      />
                      <p className="mt-4 text-pretty text-muted-foreground text-sm leading-6">
                        {integration.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            setDialogIntegration({
                              ...integration,
                              installed: connected,
                            })
                          }
                        >
                          <ArrowLeftRight className="size-3.5" />
                          Configure
                        </Button>

                        <Switch
                          checked={connected}
                          onCheckedChange={() =>
                            toggleConnection(integration.id)
                          }
                          size="sm"
                          tone="primary"
                          label={`${connected ? "Disconnect" : "Connect"} ${integration.name}`}
                          className="[&_label]:sr-only"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {visible.length === 0 ? (
          <div className="mt-7 grid min-h-52 place-items-center rounded-2xl bg-muted p-6 text-center">
            <div>
              <p className="font-medium">No integrations found</p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                }}
                className="mt-2 rounded-full px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {dialogIntegration ? (
        <IntegrationConnectDialog
          integration={dialogIntegration}
          open
          onOpenChange={(open) => {
            if (!open) setDialogIntegration(null);
          }}
        />
      ) : null}
    </section>
  );
}
