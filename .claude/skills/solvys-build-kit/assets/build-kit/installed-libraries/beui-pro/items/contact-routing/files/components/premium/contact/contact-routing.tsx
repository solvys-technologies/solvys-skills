"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Handshake,
  Headphones,
  Send,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useState } from "react";
import type { ButtonState } from "@/components/motion/button/stateful";
import { StatefulButton } from "@/components/motion/button/stateful";
import { EASE_OUT, SPRING_BOUNCE, SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type ContactRoutingProps = {
  eyebrow?: string;
  title?: string;
  className?: string;
};

const ROUTES = [
  {
    id: "sales",
    label: "Sales & demos",
    description: "Plans, security, and procurement",
    response: "Replies within 2 hours",
    Icon: BriefcaseBusiness,
    active: "text-[#c65d13]",
    wash: "bg-[#c65d13]/[0.07]",
  },
  {
    id: "support",
    label: "Product support",
    description: "Implementation and account help",
    response: "Replies within 30 minutes",
    Icon: Headphones,
    active: "text-[#087f8c]",
    wash: "bg-[#087f8c]/[0.07]",
  },
  {
    id: "partners",
    label: "Partnerships",
    description: "Agencies, affiliates, and integrations",
    response: "Replies within 1 business day",
    Icon: Handshake,
    active: "text-[#c2415d]",
    wash: "bg-[#c2415d]/[0.07]",
  },
] as const;

export function ContactRouting({
  eyebrow = "Routing desk",
  title = "Send your message to the right room.",
  className,
}: ContactRoutingProps) {
  const reduce = useReducedMotion();
  const [routeId, setRouteId] =
    useState<(typeof ROUTES)[number]["id"]>("sales");
  const [state, setState] = useState<ButtonState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const route = ROUTES.find((item) => item.id === routeId) ?? ROUTES[0];

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.includes("@") || message.trim().length < 4) {
      setState("error");
      return;
    }
    setState("loading");
    setTimeout(() => setState("success"), 950);
  };

  const clearError = () => state === "error" && setState("idle");

  return (
    <section className={cn("w-full px-4 py-20 sm:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl border border-border/60 bg-background">
        <header className="grid gap-5 border-border/60 border-b p-6 sm:p-8 lg:grid-cols-[0.72fr_1.28fr]">
          <p className="font-mono text-[10px] text-[#c65d13] uppercase tracking-[0.17em]">
            {eyebrow} / 03 lanes
          </p>
          <h2 className="max-w-2xl text-balance font-semibold text-3xl text-foreground leading-[1.02] tracking-[-0.035em] sm:text-5xl">
            {title}
          </h2>
        </header>

        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <nav
            aria-label="Contact route"
            className="border-border/60 border-b lg:border-r lg:border-b-0"
          >
            {ROUTES.map((item, index) => {
              const active = item.id === route.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setRouteId(item.id);
                    setState("idle");
                  }}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    ease: EASE_OUT,
                    delay: reduce ? 0 : index * 0.07,
                  }}
                  className="group relative flex min-h-32 w-full items-start gap-4 border-border/60 border-b p-5 text-left outline-none last:border-b-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
                >
                  {active ? (
                    <motion.span
                      layoutId="contact-route"
                      transition={SPRING_LAYOUT}
                      className={cn("absolute inset-0", item.wash)}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative grid size-9 shrink-0 place-items-center border border-current",
                      active ? item.active : "text-muted-foreground",
                    )}
                  >
                    <item.Icon className="size-4" />
                  </span>
                  <span className="relative flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "font-medium",
                          active ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      <ArrowRight
                        className={cn(
                          "size-4 transition-transform group-hover:translate-x-1",
                          active ? item.active : "text-muted-foreground",
                        )}
                      />
                    </span>
                    <span className="mt-2 block text-muted-foreground text-sm leading-6">
                      {item.description}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </nav>

          <div className="min-h-[34rem] p-6 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : SPRING_BOUNCE}
                  className="flex min-h-[28rem] items-center justify-center"
                >
                  <div
                    className={cn(
                      "w-full max-w-md border border-border/70 p-6",
                      route.wash,
                    )}
                  >
                    <div className="flex items-center justify-between gap-4 border-border/60 border-b pb-4">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
                        Ticket routed
                      </span>
                      <span
                        className={cn(
                          "grid size-9 place-items-center border border-current",
                          route.active,
                        )}
                      >
                        <Send className="size-4" />
                      </span>
                    </div>
                    <p className="mt-7 font-semibold text-2xl text-foreground tracking-tight">
                      It is in the right queue.
                    </p>
                    <p className="mt-3 text-muted-foreground leading-7">
                      The {route.label.toLowerCase()} team will reply to{" "}
                      <span className="text-foreground">{email}</span>.{" "}
                      {route.response}.
                    </p>
                    <p className="mt-8 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
                      REF / {route.id.toUpperCase()}-2048
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key={route.id}
                  onSubmit={submit}
                  initial={reduce ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <div className="flex flex-col justify-between gap-4 border-border/60 border-b pb-5 sm:flex-row sm:items-end">
                    <div>
                      <p
                        className={cn(
                          "font-mono text-[10px] uppercase tracking-[0.15em]",
                          route.active,
                        )}
                      >
                        Now routing to
                      </p>
                      <h3 className="mt-2 font-semibold text-2xl text-foreground tracking-tight">
                        {route.label}
                      </h3>
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.1em]">
                      {route.response}
                    </p>
                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <RoutingField id="routing-name" label="Name">
                      <input
                        id="routing-name"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          clearError();
                        }}
                        placeholder="Ada Lovelace"
                        className="h-11 w-full border border-border bg-transparent px-3 text-foreground text-sm outline-none focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-foreground/10"
                      />
                    </RoutingField>
                    <RoutingField id="routing-email" label="Work email">
                      <input
                        id="routing-email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          clearError();
                        }}
                        placeholder="ada@analytical.engine"
                        className="h-11 w-full border border-border bg-transparent px-3 text-foreground text-sm outline-none focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-foreground/10"
                      />
                    </RoutingField>
                  </div>
                  <div className="mt-5">
                    <RoutingField
                      id="routing-message"
                      label={
                        route.id === "sales"
                          ? "What are you evaluating?"
                          : route.id === "support"
                            ? "What needs attention?"
                            : "What should we build together?"
                      }
                    >
                      <textarea
                        id="routing-message"
                        value={message}
                        onChange={(event) => {
                          setMessage(event.target.value);
                          clearError();
                        }}
                        rows={5}
                        placeholder="Give us the useful context…"
                        className="w-full resize-none border border-border bg-transparent p-3 text-foreground text-sm outline-none focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-foreground/10"
                      />
                    </RoutingField>
                  </div>
                  <div className="mt-5 flex flex-col justify-between gap-3 border-border/60 border-t pt-5 sm:flex-row sm:items-center">
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.1em]">
                      No bots / no ticket maze
                    </p>
                    <StatefulButton
                      type="submit"
                      state={state === "error" ? "idle" : state}
                      loadingText="Routing"
                      successText="Sent"
                      className="h-11 rounded-none bg-foreground px-5 text-background hover:bg-foreground/90"
                    >
                      Route message <ArrowRight className="size-4" />
                    </StatefulButton>
                  </div>
                  {state === "error" ? (
                    <p className="mt-3 text-rose-600 text-xs">
                      Complete each field so the desk can route your message.
                    </p>
                  ) : null}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutingField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
        {label}
      </span>
      {children}
    </label>
  );
}
